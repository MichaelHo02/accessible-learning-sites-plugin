#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const NAMED_CHARACTER_REFERENCES = new Map([
  ["amp", "&"],
  ["apos", "'"],
  ["comma", ","],
  ["equals", "="],
  ["gt", ">"],
  ["lt", "<"],
  ["NewLine", "\n"],
  ["quot", '"'],
  ["semi", ";"],
  ["Tab", "\t"],
]);

function decodeCharacterReferences(value) {
  const numeric = value.replace(
    /&#(?:x([0-9a-f]+)|([0-9]+));?/gi,
    (_match, hexadecimal, decimal) => {
      const codePoint = Number.parseInt(hexadecimal ?? decimal, hexadecimal ? 16 : 10);
      return Number.isInteger(codePoint) &&
        codePoint > 0 &&
        codePoint <= 0x10ffff &&
        !(codePoint >= 0xd800 && codePoint <= 0xdfff)
        ? String.fromCodePoint(codePoint)
        : "\ufffd";
    },
  );
  return numeric.replace(
    /&([A-Za-z][A-Za-z0-9]+);/g,
    (match, name) => NAMED_CHARACTER_REFERENCES.get(name) ?? match,
  );
}

function attribute(attributes, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = new RegExp(
    `(?:^|\\s)${escaped}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s"'=<>]+))`,
    "i",
  ).exec(attributes);
  return match
    ? decodeCharacterReferences(match[1] ?? match[2] ?? match[3] ?? "")
    : null;
}

function hasAttribute(attributes, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^|\\s)${escaped}(?:\\s*=|\\s|$)`, "i").test(
    attributes,
  );
}

function visibleText(contents) {
  return contents
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:#\d+|#x[0-9a-f]+|[a-z][a-z0-9]+);/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function viewportValues(contents, name) {
  const values = [];
  const pattern = new RegExp(
    `(?:^|[\\s,;])${name}\\s*=\\s*([^\\s,;]*)`,
    "gi",
  );
  for (const content of contents) {
    for (const match of content.matchAll(pattern)) {
      values.push(match[1].toLowerCase());
    }
  }
  return values;
}

function named(attributes, contents, ids) {
  const ariaLabel = attribute(attributes, "aria-label");
  if (ariaLabel?.trim()) return true;
  const labelledBy = attribute(attributes, "aria-labelledby");
  if (labelledBy?.trim().split(/\s+/).every((id) => ids.has(id))) return true;
  if (visibleText(contents)) return true;
  return [...contents.matchAll(/<img\b([^>]*)>/gi)].some((match) =>
    Boolean(attribute(match[1], "alt")?.trim()),
  );
}

function add(findings, rule, message) {
  findings.push({ rule, message });
}

export function checkRenderedHtml(html, ledger = {}) {
  const findings = [];
  const structuralHtml = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, "");
  const openingTags = [
    ...structuralHtml.matchAll(/<([a-z][\w:-]*)\b([^>]*)>/gi),
  ];
  const ids = new Set();
  for (const [, , attributes] of openingTags) {
    const id = attribute(attributes, "id");
    if (id === null) continue;
    if (ids.has(id)) add(findings, "duplicate-id", `Duplicate id: ${id}`);
    ids.add(id);
  }

  const htmlTag = openingTags.find(
    ([, name]) => name.toLowerCase() === "html",
  );
  if (!htmlTag || !attribute(htmlTag[2], "lang")?.trim()) {
    add(findings, "document-language", "The rendered html element needs a language.");
  }
  const title = /<title\b[^>]*>([\s\S]*?)<\/title\s*>/i.exec(
    structuralHtml,
  );
  if (!title || !visibleText(title[1])) {
    add(findings, "document-title", "The rendered document needs a meaningful title.");
  }
  const viewports = openingTags.filter(
    ([, name, attributes]) =>
      name.toLowerCase() === "meta" &&
      attribute(attributes, "name")?.toLowerCase() === "viewport",
  );
  const viewportContents = viewports.map(
    (viewport) => attribute(viewport[2], "content") ?? "",
  );
  const widthValues = viewportValues(viewportContents, "width");
  const userScalableValues = viewportValues(
    viewportContents,
    "user-scalable",
  );
  const maximumScaleValues = viewportValues(
    viewportContents,
    "maximum-scale",
  ).map(Number);
  if (
    viewports.length !== 1 ||
    widthValues.length !== 1 ||
    widthValues[0] !== "device-width" ||
    userScalableValues.some(
      (value) => value === "no" || Number(value) === 0,
    ) ||
    maximumScaleValues.some(
      (value) => !Number.isFinite(value) || value < 2,
    )
  ) {
    add(
      findings,
      "viewport",
      "The rendered document needs a width=device-width viewport that permits at least 200% zoom.",
    );
  }

  const mainCount = openingTags.filter(
    ([, name]) => name.toLowerCase() === "main",
  ).length;
  if (mainCount !== 1) {
    add(findings, "main-landmark", `Expected one main element; found ${mainCount}.`);
  }
  const hasSkipLink = openingTags.some(
    ([, name, attributes]) =>
      name.toLowerCase() === "a" &&
      attribute(attributes, "href") === "#lesson-main",
  );
  if (!hasSkipLink || !ids.has("lesson-main")) {
    add(
      findings,
      "skip-link",
      "The rendered lesson needs a link to #lesson-main.",
    );
  }
  const h1Count = openingTags.filter(
    ([, name]) => name.toLowerCase() === "h1",
  ).length;
  if (h1Count !== 1) {
    add(findings, "primary-heading", `Expected one h1; found ${h1Count}.`);
  }

  const headingLevels = openingTags
    .map(([, name]) => /^h([1-6])$/i.exec(name)?.[1])
    .filter(Boolean)
    .map(Number);
  if (
    headingLevels[0] !== 1 ||
    headingLevels.some(
      (level, index) => index > 0 && level > headingLevels[index - 1] + 1,
    )
  ) {
    add(findings, "heading-order", "Rendered headings skip a structural level.");
  }

  for (const [, name, attributes] of openingTags) {
    for (const referenceName of ["aria-labelledby", "aria-describedby"]) {
      const references = attribute(attributes, referenceName);
      if (!references) continue;
      for (const id of references.trim().split(/\s+/)) {
        if (!ids.has(id)) {
          add(
            findings,
            "aria-reference",
            `<${name}> ${referenceName} references missing id: ${id}`,
          );
        }
      }
    }
    if (name.toLowerCase() === "img" && attribute(attributes, "alt") === null) {
      add(findings, "image-alt", "Every rendered image needs an alt attribute.");
    }
    if (["audio", "video"].includes(name.toLowerCase())) {
      if (hasAttribute(attributes, "autoplay")) {
        add(findings, "media-autoplay", `<${name}> must not autoplay.`);
      }
      if (!hasAttribute(attributes, "controls")) {
        add(
          findings,
          "media-controls",
          `<${name}> needs native playback controls.`,
        );
      }
    }
    if (
      name.toLowerCase() === "audio" &&
      !attribute(attributes, "aria-describedby")?.trim()
    ) {
      add(
        findings,
        "audio-transcript",
        "Every audio element needs aria-describedby pointing to short media help that identifies the complete visible transcript.",
      );
    }
    const href = attribute(attributes, "href");
    if (href?.startsWith("#") && href.length > 1) {
      let target = href.slice(1);
      try {
        target = decodeURIComponent(target);
      } catch {
        add(findings, "fragment-target", `Invalid fragment link: ${href}`);
        continue;
      }
      if (!ids.has(target)) {
        add(findings, "fragment-target", `Fragment link has no target: ${href}`);
      }
    }
  }

  for (const tagName of ["a", "button"]) {
    const pattern = new RegExp(
      `<${tagName}\\b([^>]*)>([\\s\\S]*?)<\\/${tagName}\\s*>`,
      "gi",
    );
    for (const match of structuralHtml.matchAll(pattern)) {
      if (!named(match[1], match[2], ids)) {
        add(findings, "control-name", `<${tagName}> has no accessible name.`);
      }
    }
  }

  for (const item of [...(ledger.sources ?? []), ...(ledger.adaptations ?? [])]) {
    if (item?.siteAnchor && !ids.has(item.siteAnchor)) {
      add(
        findings,
        "ledger-anchor",
        `${item.id ?? "ledger item"} references missing rendered anchor: ${item.siteAnchor}`,
      );
    }
  }
  return findings;
}

async function main() {
  const [siteUrl, ledgerPath] = process.argv.slice(2);
  if (!siteUrl || process.argv.length > 4) {
    console.error(
      "Usage: node check-rendered-site.mjs <rendered-site-url> [source-ledger.json]",
    );
    process.exitCode = 2;
    return;
  }

  try {
    const url = new URL(siteUrl);
    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("rendered Site URL must use http or https");
    }
    const response = await fetch(url, { redirect: "follow" });
    const html = await response.text();
    const ledger = ledgerPath
      ? JSON.parse(await readFile(path.resolve(ledgerPath), "utf8"))
      : {};
    const findings = checkRenderedHtml(html, ledger);
    if (!response.ok) {
      add(findings, "http-status", `Rendered Site returned HTTP ${response.status}.`);
    }
    if (!/\btext\/html\b/i.test(response.headers.get("content-type") ?? "")) {
      add(findings, "content-type", "Rendered Site did not return text/html.");
    }
    for (const finding of findings) {
      console.warn(`Warning: [${finding.rule}] ${finding.message}`);
    }
    const reportedUrl = `${url.origin}${url.pathname}`;
    console.log(
      `environment: ${reportedUrl}; result: ${findings.length ? "failed" : "passed"}; findings: ${findings.length}`,
    );
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 2;
  }
}

if (path.resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  await main();
}
