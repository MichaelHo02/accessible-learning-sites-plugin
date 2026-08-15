#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readdir, readFile, readlink, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const TEXT_EXTENSIONS = new Set([
  ".css",
  ".html",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".mdx",
  ".md",
  ".markdown",
  ".json",
  ".svg",
  ".toml",
  ".ts",
  ".tsx",
  ".txt",
  ".xml",
  ".yaml",
  ".yml",
]);
const TEXT_FILENAMES = new Set([
  ".gitignore",
  ".npmrc",
  "Dockerfile",
  "Makefile",
  "Procfile",
  "yarn.lock",
]);

function lineNumber(source, index) {
  return source.slice(0, index).split("\n").length;
}
const LESSON_ASSET_EXTENSIONS = new Set([
  ".avif",
  ".bmp",
  ".csv",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".m4a",
  ".mov",
  ".mp3",
  ".mp4",
  ".ogg",
  ".otf",
  ".pdf",
  ".png",
  ".svg",
  ".ttf",
  ".wav",
  ".webm",
  ".webp",
  ".woff",
  ".woff2",
]);
const IGNORED_DIRECTORIES = new Set([
  ".git",
  ".next",
  ".wrangler",
  "coverage",
  "dist",
  "node_modules",
]);
const IGNORED_ROOT_DIRECTORIES = new Set([
  ".vercel",
  ".vinext",
  "out",
  "outputs",
  "work",
]);
const REQUIRED_KIT_FILES = new Map([
  [
    "app/components/accessible-learning.tsx",
    "include the bundled accessibility component",
  ],
  [
    "app/components/accessible-learning.css",
    "include the bundled accessibility styles",
  ],
  ["app/components/mathml-jsx.d.ts", "include the bundled MathML JSX types"],
  [
    "app/components/accessible-interactions.tsx",
    "include the bundled accessible interactions",
  ],
  [
    "app/components/accessible-interactions.css",
    "include the bundled accessible interaction styles",
  ],
]);
const BROWSER_STORAGE_PATTERN =
  /\b(?:localStorage|sessionStorage|indexedDB|CacheStorage)\b|\bcaches\s*\.|\bnavigator\.serviceWorker\b/;
const CANONICAL_PREFERENCES_PATH = fileURLToPath(
  new URL("../assets/lesson-site-kit/accessible-learning.tsx", import.meta.url),
);
const INTERACTION_COMPONENT_NAMES = [
  "RepresentationGroup",
  "Representation",
  "StepByStep",
  "VocabularyList",
  "AudioTranscript",
  "LecturePointHeading",
  "SlideTranscriptViewer",
  "AuslanSupport",
  "DescribedFigure",
  "DataTableRegion",
  "RelationshipExplorer",
  "PhysicalActivity",
  "ChoiceActivity",
  "TypedResponseActivity",
];
const CORE_COMPONENT_NAMES = ["AccessibleLessonShell", "AccessibleMathRegion"];
const INTERACTION_COMPONENT_PATTERN = new RegExp(
  `<(?:${INTERACTION_COMPONENT_NAMES.join("|")})\\b`,
);
const CORE_COMPONENT_PATTERN = new RegExp(
  `<(?:${CORE_COMPONENT_NAMES.join("|")})\\b`,
);
const FORBIDDEN_DISCLOSURE_COMPONENT_PATTERN =
  /<(?:RepresentationGroup|Representation|StepByStep)\b/;

function usedNamedComponents(source, componentNames) {
  const pattern = new RegExp(`<(${componentNames.join("|")})\\b`, "g");
  return new Set([...source.matchAll(pattern)].map((match) => match[1]));
}

function canonicalNamedImports(source, modulePath, componentNames) {
  const imports = new Set();
  const escapedModulePath = modulePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `import\\s*\\{([^}]*)\\}\\s*from\\s*["']${escapedModulePath}["']`,
    "g",
  );
  for (const match of source.matchAll(pattern)) {
    for (const entry of match[1].split(",")) {
      const name = entry.trim();
      if (componentNames.includes(name)) imports.add(name);
    }
  }
  return imports;
}

function usedInteractionComponents(source) {
  return usedNamedComponents(source, INTERACTION_COMPONENT_NAMES);
}

function usedCoreComponents(source) {
  return usedNamedComponents(source, CORE_COMPONENT_NAMES);
}

function canonicalCoreImports(source) {
  return canonicalNamedImports(
    source,
    "./components/accessible-learning",
    CORE_COMPONENT_NAMES,
  );
}

function canonicalInteractionImports(source) {
  return canonicalNamedImports(
    source,
    "./components/accessible-interactions",
    INTERACTION_COMPONENT_NAMES,
  );
}

function findExternalRuntime(source, relativePath) {
  const directFetch = /\bfetch\s*\(/g;
  for (const match of source.matchAll(directFetch)) {
    const prefix = source.slice(0, match.index);
    if (/\basync\s*$/.test(prefix)) continue;
    if (/\b(?:ASSETS|handler|worker)\.$/.test(prefix)) continue;
    return match;
  }

  const runtimeMatch = /\b(?:globalThis|window|self)\s*\.\s*fetch\b|\b(?:const|let|var)\s+[$\w]+\s*=\s*fetch\b|\b(?:XMLHttpRequest|WebSocket|EventSource)\s*\(|\bnavigator\.sendBeacon\s*\(|\baxios(?:\s*\(|\.)|<script\b|<iframe\b|<(?:img|Image|audio|video|source|track|link|object)\b[^>]*(?:src|srcSet|href|poster|data)\s*=\s*["'`](?:https?:)?\/\/|@import\s+(?:url\(\s*)?["']?(?:https?:)?\/\/|(?:@import\s+)?url\(\s*["']?(?:https?:)?\/\/|(?:import|require)\s*\(\s*["'`](?:https?:)?\/\//i.exec(
    source,
  );
  if (runtimeMatch) return runtimeMatch;

  if (/(?:^|\/)(?:package-lock\.json|pnpm-lock\.yaml|yarn\.lock)$/.test(relativePath)) {
    return null;
  }
  return /["'](?:axios|node-fetch|cross-fetch|undici|ky|got)["']/i.exec(source);
}

function findHardToReadTextStyle(source, relativePath) {
  const direct = /\bfont-style\s*:\s*(?:italic|oblique)\b|\bfontStyle\s*:\s*["'](?:italic|oblique)["']|<(?:em|i|u)\b|\btextDecoration(?:Line)?\s*:\s*["']underline["']/i.exec(
    source,
  );
  if (direct || path.extname(relativePath).toLowerCase() !== ".css") {
    return direct;
  }

  for (const match of source.matchAll(
    /\btext-decoration(?:-line)?\s*:\s*[^;{}]*\bunderline\b/gi,
  )) {
    const ruleStart = source.lastIndexOf("{", match.index);
    const selectorStart = source.lastIndexOf("}", ruleStart - 1) + 1;
    const selector = source.slice(selectorStart, ruleStart);
    if (
      selector
        .split(",")
        .some((part) => !/\ba(?=[\s.#:\[>+~]|$)/.test(part))
    ) {
      return match;
    }
  }
  return null;
}

const CONTENT_RULES = [
  {
    id: "student-identity",
    pattern:
      /\b(?:student|learner)(?:Name|Id|ID|Email|Diagnosis)\b|\b(?:student|learner)_(?:name|id|email|diagnosis)\b|\b(?:firstName|lastName|fullName|userId|userID|userEmail|first_name|last_name|full_name|user_id|user_email|email|diagnosis)\s*:|["'](?:student_name|student_id|first_name|last_name|full_name|user_id|user_email|email|diagnosis)["']\s*:|<input\b[^>]*(?:\btype\s*=\s*["']email["']|\b(?:name|id)\s*=\s*["'](?:student(?:Name|Id|Email)|learner(?:Name|Id|Email)|firstName|lastName|fullName|userId|userEmail|email)["'])/i,
    message: "review student identity fields with the teacher before sharing",
  },
  {
    id: "auth",
    pattern:
      /\b(?:currentUser|getUserInfo|signIn|signOut|useSession|userEmail)\b|["'](?:next-auth|better-auth|@auth\/[^"']+|@clerk\/[^"']+)["']/,
    message: "review authentication or user-profile code with the teacher before sharing",
  },
  {
    id: "preset-or-query-profile",
    pattern:
      /\b(?:const|let|var)\s+\w*preset\w*|\bpreset(?:s|Id|ID|_id)?\s*:|["']preset["']\s*[,)]|\?preset=|(?:useSearchParams|URLSearchParams|searchParams|location\.search)[\s\S]{0,160}\b(?:student|learner|profile|token)\b|\b(?:student|learner|profile|token)\b[\s\S]{0,160}(?:useSearchParams|URLSearchParams|searchParams|location\.search)/i,
    message: "review student presets and query-based profiles before sharing",
  },
  {
    id: "analytics",
    pattern:
      /\b(?:gtag|mixpanel|posthog|amplitude|hotjar)\s*\(|google-analytics|analytics\.js|segment\.com|["'](?:posthog-js|mixpanel-browser|@vercel\/analytics|@segment\/analytics-next)["']/i,
    message: "review third-party analytics and their data collection before sharing",
  },
  {
    id: "external-runtime",
    find: findExternalRuntime,
    message: "review runtime networking, external assets, scripts, and embeds before sharing",
  },
  {
    id: "persistent-backend",
    pattern:
      /(?:from\s+)?["'](?:drizzle-orm(?:\/[^"']*)?|@supabase\/[^"']+|firebase(?:\/[^"']*)?|@prisma\/[^"']+|@upstash\/redis|@vercel\/kv|ioredis|redis|mongodb|mongoose)["']|\b(?:D1Database|KVNamespace)\b|\benv\s*\.\s*(?:DB|KV)\b|\b(?:DB|KV)\.(?:prepare|get|put|delete)\b/,
    message: "review database-backed persistence and stored student data before sharing",
  },
  {
    id: "dynamic-resource",
    pattern:
      /<(?:img|Image|audio|video|source|track|script|iframe|link)\b[^>]*(?:src|srcSet|href|poster)\s*=\s*\{/i,
    message: "review dynamic resource URLs and their external data flow before sharing",
  },
  {
    id: "image-alt",
    pattern: /<(?:img|Image)\b(?![^>]*\balt\s*=)[^>]*>/i,
    message: "every image needs an alt attribute; use alt=\"\" only for decoration",
  },
  {
    id: "server-action",
    pattern: /["']use server["']/,
    message: "review server actions that may transmit lesson responses before sharing",
  },
  {
    id: "server-module",
    pattern: /(?:import\s+|require\s*\()["']server-only["']/,
    message: "server-only modules are outside this static lesson Site",
  },
  {
    id: "server-runtime",
    pattern:
      /(?:from\s+|import\s*(?:\(\s*)?|require\s*\(\s*)["'](?:next\/(?:headers|server)|node:fs(?:\/promises)?|fs(?:\/promises)?)["']|\bprocess\s*(?:\.\s*env|\[\s*["']env["']\s*\])/,
    message:
      "server request state, environment variables, and filesystem reads are outside this static lesson Site",
  },
  {
    id: "form-submission",
    pattern:
      /<form\b|<(?:button|input)\b[^>]*(?:\bformAction\s*=|\btype\s*=\s*(?:\{\s*)?["']?submit\b)/i,
    message:
      "review lesson forms and submit controls that may expose responses before sharing",
  },
  {
    id: "unsafe-html",
    pattern: /\bdangerouslySetInnerHTML\b|\bdocument\.cookie\b/,
    message: "unsafe HTML injection and cookies are not allowed",
  },
  {
    id: "interaction-component-alias",
    pattern:
      /\b(?:RepresentationGroup|Representation|StepByStep|VocabularyList|DescribedFigure|DataTableRegion|RelationshipExplorer|PhysicalActivity|ChoiceActivity|TypedResponseActivity)\s+as\s+[$\w]+/,
    message:
      "use bundled interaction component names without aliases so applicability checks remain reliable",
  },
  {
    id: "core-component-alias",
    pattern:
      /\b(?:AccessibleLessonShell|AccessibleMathRegion)\s+as\s+[$\w]+/,
    message:
      "use bundled core component names without aliases so canonical binding remains reliable",
  },
  {
    id: "non-native-click",
    pattern: /<(?:div|span)\b[^>]*\bonClick\s*=/i,
    message: "use a native button or link instead of a clickable div or span",
  },
  {
    id: "generic-span-name",
    pattern: /<span\b[^>]*\baria-label\s*=/i,
    message: "do not name generic spans; use semantic content or MathML",
  },
  {
    id: "focus-removal",
    pattern: /\boutline\s*:\s*(?:none|0)\b/i,
    message: "focus outlines must not be removed",
  },
  {
    id: "text-style",
    find: findHardToReadTextStyle,
    message:
      "use upright normal or bold text and reserve underlining for links",
  },
  {
    id: "positive-tabindex",
    pattern: /\btabindex\s*=\s*(?:\{\s*)?["']?[1-9]/i,
    message: "positive tabindex values create an unreliable focus order",
  },
  {
    id: "autoplay",
    pattern: /\bautoplay(?:\s|=|>)/i,
    message: "media must not autoplay",
  },
  {
    id: "zoom-disabled",
    pattern:
      /user-scalable\s*=\s*(?:no|0)|maximum-scale\s*=\s*["']?1(?:\.0)?\b/i,
    message: "browser zoom must not be disabled",
  },
];

async function collectProjectFiles(directory, root = directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (
      IGNORED_DIRECTORIES.has(entry.name) ||
      (directory === root && IGNORED_ROOT_DIRECTORIES.has(entry.name))
    ) {
      continue;
    }
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectProjectFiles(absolute, root)));
    } else if (entry.isFile() || entry.isSymbolicLink()) {
      files.push({
        absolute,
        isSymlink: entry.isSymbolicLink(),
        isText:
          TEXT_EXTENSIONS.has(path.extname(entry.name)) ||
          TEXT_FILENAMES.has(entry.name) ||
          entry.name.startsWith(".env"),
        relative: path.relative(root, absolute),
      });
    }
  }
  return files;
}

function lineAt(text, index) {
  return text.slice(0, index).split("\n").length;
}

function updateFramed(digest, value) {
  const contents = Buffer.isBuffer(value) ? value : Buffer.from(value);
  const length = Buffer.allocUnsafe(8);
  length.writeBigUInt64BE(BigInt(contents.length));
  digest.update(length);
  digest.update(contents);
}

export async function checkProject(projectDirectory) {
  const root = path.resolve(projectDirectory);
  const rootStat = await stat(root);
  if (!rootStat.isDirectory()) throw new Error(`${root} is not a directory`);

  const files = (await collectProjectFiles(root)).sort((a, b) =>
    a.relative.localeCompare(b.relative),
  );
  const projectPaths = new Set(
    files.map((file) => file.relative.split(path.sep).join("/")),
  );
  const assetPaths = files
    .map((file) => file.relative.split(path.sep).join("/"))
    .filter((relativePath) => relativePath.startsWith("public/"));
  const projectDigest = createHash("sha256");
  const canonicalPreferences = await readFile(CANONICAL_PREFERENCES_PATH);
  const findings = [];
  const anchors = new Set();
  let textFilesChecked = 0;
  let hasEnglishDocumentLanguage = false;
  let hasDocumentTitle = false;
  let rendersLessonShell = false;
  let contentSpecificAlternativesRequired = false;
  let equivalentPathwaysRequired = false;
  let representationSwitchingRequired = false;

  for (const file of files) {
    const contents = file.isSymlink
      ? Buffer.from(`symlink:${await readlink(file.absolute)}`)
      : await readFile(file.absolute);
    updateFramed(projectDigest, file.relative);
    updateFramed(projectDigest, contents);

    if (file.isSymlink) {
      findings.push({
        file: file.relative,
        line: 1,
        rule: "symlink",
        message: "copy approved lesson files into the project instead of using symlinks",
      });
      continue;
    }
    const normalizedPath = file.relative.split(path.sep).join("/");
    const isCanonicalPreferences =
      normalizedPath === "app/components/accessible-learning.tsx" &&
      contents.equals(canonicalPreferences);
    if (
      LESSON_ASSET_EXTENSIONS.has(path.extname(normalizedPath).toLowerCase()) &&
      !normalizedPath.startsWith("public/")
    ) {
      findings.push({
        file: file.relative,
        line: 1,
        rule: "asset-location",
        message: "store lesson assets under public/ so provenance coverage can be checked",
      });
    }
    if (!file.isText) continue;

    const source = contents.toString("utf8");
    textFilesChecked += 1;
    if (normalizedPath === "app/page.tsx") {
      for (const match of source.matchAll(/\bid\s*=\s*["']([A-Za-z][\w:.-]*)["']/g)) {
        anchors.add(match[1]);
      }
      const forbiddenDisclosure = FORBIDDEN_DISCLOSURE_COMPONENT_PATTERN.exec(source);
      if (forbiddenDisclosure) {
        findings.push({
          file: file.relative,
          line: lineNumber(source, forbiddenDisclosure.index),
          rule: "required-content-disclosure",
          message: "render required representations and steps visibly; do not use RepresentationGroup, Representation, or StepByStep",
        });
      }
      const audioIndex = source.search(/<audio\b/);
      if (audioIndex >= 0) {
        const firstSectionIndex = source.search(/<section\b/);
        if (firstSectionIndex >= 0 && audioIndex > firstSectionIndex) {
          findings.push({
            file: file.relative,
            line: lineNumber(source, audioIndex),
            rule: "lecture-audio-placement",
            message: "place the long-lecture player before the first lesson section",
          });
        }
        if (!/<(?:AudioTranscript|LecturePointHeading|SlideTranscriptViewer)\b/.test(source)) {
          findings.push({
            file: file.relative,
            line: lineNumber(source, audioIndex),
            rule: "media-transcript-layout",
            message: "pair media with AudioTranscript or concept-adjacent LecturePointHeading or SlideTranscriptViewer content",
          });
        }
      }
    }

    if (
      /^app\/layout\.[cm]?[jt]sx?$/.test(normalizedPath) &&
      /<html\b[^>]*\blang\s*=\s*["']en(?:-[a-z0-9]+)*["']/i.test(source)
    ) {
      hasEnglishDocumentLanguage = true;
    }
    if (
      /^app\/layout\.[cm]?[jt]sx?$/.test(normalizedPath) &&
      (/<title\b[^>]*>\s*[^<]{3,}\s*<\/title>/i.test(source) ||
        /\bexport\s+const\s+metadata(?:\s*:\s*[^=;\n]+)?\s*=\s*\{[^}]{0,2000}\btitle\s*:\s*(?:"[^"\n]{3,}"|'[^'\n]{3,}'|`[^`\n]{3,}`)/.test(source))
    ) {
      hasDocumentTitle = true;
    }
    if (
      /^pages\//.test(normalizedPath)
    ) {
      findings.push({
        file: file.relative,
        line: 1,
        rule: "unsupported-router",
        message: "use the Sites App Router starter for this lesson Site",
      });
    }
    if (
      /(?:^|\/)app\/.+\/page\.(?:[cm]?[jt]sx?|mdx)$/.test(normalizedPath) ||
      /^public\/.*\.html?$/i.test(normalizedPath)
    ) {
      findings.push({
        file: file.relative,
        line: 1,
        rule: "extra-route",
        message: "the product supports one student-facing route",
      });
    }
    if (/^app\/page\.mdx$/i.test(normalizedPath)) {
      findings.push({
        file: file.relative,
        line: 1,
        rule: "unsupported-route-file",
        message: "compose the root lesson route in app/page.tsx, not MDX",
      });
    }
    if (
      !/(?:^|\/)tests?\//.test(normalizedPath) &&
      normalizedPath !== "app/components/accessible-learning.tsx" &&
      CORE_COMPONENT_PATTERN.test(source)
    ) {
      if (normalizedPath !== "app/page.tsx") {
        findings.push({
          file: file.relative,
          line: 1,
          rule: "core-component-location",
          message: "compose bundled core lesson components in app/page.tsx",
        });
      } else {
        const canonicalImports = canonicalCoreImports(source);
        const usedComponents = usedCoreComponents(source);
        for (const component of usedComponents) {
          if (canonicalImports.has(component)) continue;
          findings.push({
            file: file.relative,
            line: 1,
            rule: "core-component-import",
            message: `import ${component} from ./components/accessible-learning`,
          });
        }
        if (
          usedComponents.has("AccessibleLessonShell") &&
          canonicalImports.has("AccessibleLessonShell")
        ) {
          rendersLessonShell = true;
        }
      }
    }
    if (
      !/(?:^|\/)tests?\//.test(normalizedPath) &&
      ![
        "app/components/accessible-learning.tsx",
        "app/components/accessible-interactions.tsx",
      ].includes(normalizedPath) &&
      /<(?:img|picture|audio|video|track|math|table|svg|canvas|figure|Image|AccessibleMathRegion|DescribedFigure|DataTableRegion)\b|\b(?:onDrag|onDrop|onPointer|onMouseMove)\s*=/i.test(
        source,
      )
    ) {
      contentSpecificAlternativesRequired = true;
      equivalentPathwaysRequired = true;
    }
    if (
      !/(?:^|\/)tests?\//.test(normalizedPath) &&
      normalizedPath !== "app/components/accessible-interactions.tsx" &&
      INTERACTION_COMPONENT_PATTERN.test(source)
    ) {
      equivalentPathwaysRequired = true;
      if (normalizedPath !== "app/page.tsx") {
        findings.push({
          file: file.relative,
          line: 1,
          rule: "interaction-location",
          message: "compose bundled lesson interactions in app/page.tsx",
        });
      } else {
        const canonicalImports = canonicalInteractionImports(source);
        for (const component of usedInteractionComponents(source)) {
          if (canonicalImports.has(component)) continue;
          findings.push({
            file: file.relative,
            line: 1,
            rule: "interaction-import",
            message: `import ${component} from ./components/accessible-interactions`,
          });
        }
      }
    }
    if (
      !/(?:^|\/)tests?\//.test(normalizedPath) &&
      normalizedPath !== "app/components/accessible-interactions.tsx" &&
      /<RepresentationGroup\b/.test(source)
    ) {
      representationSwitchingRequired = true;
    }

    const basename = path.basename(file.relative, path.extname(file.relative));
    if (/^(?:middleware|proxy|instrumentation)$/i.test(basename)) {
      findings.push({
        file: file.relative,
        line: 1,
        rule: "server-surface",
        message: "middleware, proxy, and instrumentation code is outside this Site",
      });
    }
    if (path.basename(file.relative).startsWith(".env")) {
      findings.push({
        file: file.relative,
        line: 1,
        rule: "environment-file",
        message: "lesson Sites use no runtime secrets; remove environment files",
      });
    }
    if (
      /(?:source[-_ ]?ledger|validation[-_ ]?record|agent[-_ ]?review(?:er)?[-_ ]?report|accessibility[-_ ]?report|axe[-_ ]?report|playwright[-_ ]?report)/i.test(
        normalizedPath,
      )
    ) {
      findings.push({
        file: file.relative,
        line: 1,
        rule: "teacher-only-artifact",
        message: "keep teacher-only source ledgers and QA reports outside the Site",
      });
    }
    if (/(?:^|[-_.])(?:auth|authentication)(?:[-_.]|$)/i.test(basename)) {
      findings.push({
        file: file.relative,
        line: 1,
        rule: "auth-file",
        message: "review starter authentication and user-profile files before sharing",
      });
    }

    if (
      /(?:^|\/)(?:app\/api|pages\/api|api)\//.test(normalizedPath) ||
      /(?:^|\/)app(?:\/[^/]+)*\/route\.[cm]?[jt]s$/.test(normalizedPath)
    ) {
      findings.push({
        file: file.relative,
        line: 1,
        rule: "server-route",
        message: "server API routes are outside this static lesson Site",
      });
    }

    if (
      BROWSER_STORAGE_PATTERN.test(source) &&
      !(
        isCanonicalPreferences
      )
    ) {
      const match = BROWSER_STORAGE_PATTERN.exec(source);
      findings.push({
        file: file.relative,
        line: lineAt(source, match?.index ?? 0),
        rule: "browser-storage",
        message:
          "review browser storage outside the bundled accessibility preferences component before sharing",
      });
    }

    for (const rule of CONTENT_RULES) {
      const match = rule.find
        ? rule.find(source, file.relative)
        : rule.pattern.exec(source);
      if (!match) continue;
      findings.push({
        file: file.relative,
        line: lineAt(source, match.index),
        rule: rule.id,
        message: rule.message,
      });
    }
  }

  for (const [present, message] of [
    ...[...REQUIRED_KIT_FILES].map(([file, message]) => [
      projectPaths.has(file),
      message,
    ]),
    [
      hasEnglishDocumentLanguage,
      'the root HTML element must declare literal English, such as lang="en"',
    ],
    [hasDocumentTitle, "the root document must declare a meaningful title"],
    [rendersLessonShell, "render AccessibleLessonShell from the single lesson route"],
  ]) {
    if (!present) {
      findings.push({ file: ".", line: 1, rule: "required", message });
    }
  }

  return {
    filesChecked: textFilesChecked,
    filesHashed: files.length,
    anchors: [...anchors].sort(),
    assetPaths,
    findings,
    contentSpecificAlternativesRequired,
    equivalentPathwaysRequired,
    representationSwitchingRequired,
    sourceRevision: `sha256:${projectDigest.digest("hex")}`,
  };
}

async function main() {
  const projectDirectory = process.argv[2];
  if (!projectDirectory || process.argv.length !== 3) {
    console.error("Usage: node check-project-boundaries.mjs <lesson-project>");
    process.exitCode = 2;
    return;
  }

  try {
    const result = await checkProject(projectDirectory);
    if (result.findings.length) {
      for (const finding of result.findings) {
        console.warn(
          `Warning: ${finding.file}:${finding.line} [${finding.rule}] ${finding.message}`,
        );
      }
    }
    console.log(
      `Project review completed with ${result.findings.length} warning(s) (${result.filesChecked} text files checked; ${result.filesHashed} project files hashed).`,
    );
    console.log(`Source revision: ${result.sourceRevision}`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 2;
  }
}

if (path.resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  await main();
}
