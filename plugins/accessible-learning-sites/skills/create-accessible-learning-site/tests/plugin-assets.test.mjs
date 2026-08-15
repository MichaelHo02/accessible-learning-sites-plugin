import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  cp,
  copyFile,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

import { checkProject } from "../scripts/check-project-boundaries.mjs";
import { checkRenderedHtml } from "../scripts/check-rendered-site.mjs";

const skillRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pluginRoot = path.resolve(skillRoot, "..", "..");
const kitRoot = path.join(skillRoot, "assets", "lesson-site-kit");
const trialRoot = path.join(skillRoot, "tests", "trials");
const kitFiles = [
  "accessible-learning.tsx",
  "accessible-learning.css",
  "mathml-jsx.d.ts",
  "accessible-interactions.tsx",
  "accessible-interactions.css",
];

async function makeLessonProject() {
  const root = await mkdtemp(path.join(os.tmpdir(), "accessible-lesson-check-"));
  await mkdir(path.join(root, "app"), { recursive: true });
  await mkdir(path.join(root, "app", "components"), { recursive: true });
  await mkdir(path.join(root, "tests"), { recursive: true });
  await copyFile(
    path.join(kitRoot, "accessible-learning.tsx"),
    path.join(root, "app", "components", "accessible-learning.tsx"),
  );
  await copyFile(
    path.join(kitRoot, "accessible-learning.css"),
    path.join(root, "app", "components", "accessible-learning.css"),
  );
  await copyFile(
    path.join(kitRoot, "mathml-jsx.d.ts"),
    path.join(root, "app", "components", "mathml-jsx.d.ts"),
  );
  await copyFile(
    path.join(kitRoot, "accessible-interactions.tsx"),
    path.join(root, "app", "components", "accessible-interactions.tsx"),
  );
  await copyFile(
    path.join(kitRoot, "accessible-interactions.css"),
    path.join(root, "app", "components", "accessible-interactions.css"),
  );
  await writeFile(
    path.join(root, "app", "layout.tsx"),
    'export const metadata = { title: "Chance lesson" };\nexport default function Layout({ children }) { return <html lang="en"><body>{children}</body></html>; }\n',
  );
  await writeFile(
    path.join(root, "app", "page.tsx"),
    `import { AccessibleLessonShell } from "./components/accessible-learning";
export default function Page() {
  return (
    <AccessibleLessonShell
      title="Chance"
      objective="Describe probability."
      sections={[{ id: "learn", label: "Learn" }]}
    >
      <section id="learn"><h2>Learn</h2><p>Lesson content.</p></section>
    </AccessibleLessonShell>
  );
}
`,
  );
  await writeFile(
    path.join(root, "tests", "rendered-html.test.mjs"),
    `const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", "cache-buster");
const worker = { async fetch(request) { return env.ASSETS.fetch(request); } };
worker.fetch(request);
`,
  );
  return root;
}

async function makeTrialProject(trialName) {
  const root = await mkdtemp(path.join(os.tmpdir(), "accessible-lesson-trial-"));
  const components = path.join(root, "app", "components");
  await mkdir(components, { recursive: true });

  for (const file of kitFiles) {
    await copyFile(path.join(kitRoot, file), path.join(components, file));
  }
  await cp(path.join(trialRoot, trialName, "app"), path.join(root, "app"), {
    recursive: true,
  });
  const trialPublic = path.join(trialRoot, trialName, "public");
  const projectPublic = path.join(root, "public");
  await mkdir(projectPublic, { recursive: true });
  await cp(trialPublic, projectPublic, { recursive: true });
  return root;
}

test("plugin development validates the shared five-file kit inventory once", async () => {
  assert.deepEqual((await readdir(kitRoot)).sort(), [...kitFiles].sort());
});

test("complex lessons route through packaged specialist profiles", async () => {
  const instructions = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const workflow = await readFile(
    path.join(skillRoot, "references", "workflow.md"),
    "utf8",
  );
  const expectedProfiles = [
    [
      "source-analyst.md",
      /read-only source analyst/i,
      /Do not claim\s+source completeness/i,
    ],
    [
      "lesson-builder.md",
      /sole lesson-code writer/i,
      /Edit only the assigned lesson-project path and files/i,
    ],
    [
      "quality-verifier.md",
      /read-only quality verifier/i,
      /Never convert source inspection/i,
    ],
  ];

  assert.match(instructions, /### Automatic specialist delegation/);
  assert.match(instructions, /do not ask the teacher to opt in/i);
  assert.match(instructions, /Allow only one code writer at a time/);
  assert.match(instructions, /Specialist\s+output is work product, not proof/);
  assert.match(workflow, /Delegate complex work automatically/);

  for (const [file, role, boundary] of expectedProfiles) {
    const profile = await readFile(path.join(pluginRoot, "agents", file), "utf8");
    assert.match(profile, /^---\nname: [a-z-]+\ndescription: .+\n---/);
    assert.match(profile, role);
    assert.match(profile, boundary);
  }
});

test("continuing goal support is explicit and bounded", async () => {
  const instructions = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const workflow = await readFile(
    path.join(skillRoot, "references", "workflow.md"),
    "utf8",
  );

  assert.match(instructions, /### Optional continuing goal/);
  assert.match(instructions, /when the teacher explicitly asks for one/i);
  assert.match(instructions, /Do not add a token budget unless/i);
  assert.match(
    instructions,
    /Do not complete the goal after planning, source analysis, a specialist[\s\S]{0,100}local build/i,
  );
  assert.match(
    instructions,
    /Complete it only after the created or\s+updated Site/i,
  );
  assert.match(instructions, /handed back for teacher review/i);
  assert.match(workflow, /first complete teacher handoff/i);
  assert.match(workflow, /explicitly requested local-only work/i);
});

test(
  "the workflow infers strong briefs and rebuilds source content instead of copying documents",
  async () => {
    const instructions = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
    const workflow = await readFile(
      path.join(skillRoot, "references", "workflow.md"),
      "utf8",
    );
    const audioGuidance = await readFile(
      path.join(skillRoot, "references", "audio-accessibility.md"),
      "utf8",
    );

    assert.match(
      instructions,
      /Infer each\s+missing title, level, or objective independently/,
    );
    assert.match(
      instructions,
      /Ask before building only for a field whose confidence is too low/,
    );
    assert.match(instructions, /mark them provisional/);
    assert.match(
      instructions,
      /Do not\s+silently summarize, condense, reorder, or omit content/,
    );
    assert.match(
      instructions,
      /Do not make an\s+embedded PDF, whole-page screenshots, or a sequence of slide images the lesson\s+itself/,
    );
    assert.match(
      workflow,
      /Extract and inventory the complete readable source in order/,
    );
    assert.match(
      workflow,
      /Do not use an embedded PDF,\s+whole-document viewer, page screenshots, or a slide-image sequence as the\s+primary lesson/,
    );
    assert.match(instructions, /Do not create a social sharing card, Open Graph image, link-unfurl artwork/);
    assert.match(instructions, /overrides any\s+general Sites-builder default/);
    assert.match(audioGuidance, /divide every cue\s+exactly once/);
    assert.match(instructions, /Do not copy that metadata\s+into the student lesson, a global warning, or the lesson footer/);
    assert.match(instructions, /An unresolved answer boundary is not an interaction/);
    assert.match(instructions, /do not create an\s+`Attempt and reveal`, disclosure, or dropdown/);
    assert.match(instructions, /authorized\s+native player only when it can be hosted/);
    assert.match(audioGuidance, /native controls,\s+`preload="metadata"`, and no autoplay/);
  },
);

test("local Office lesson files use workspace readers without cloud connectors", async () => {
  const instructions = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const manifest = JSON.parse(
    await readFile(path.join(pluginRoot, ".codex-plugin", "plugin.json"), "utf8"),
  );

  assert.match(
    instructions,
    /local-file PDF, document, presentation, and\s+spreadsheet capabilities/,
  );
  assert.match(instructions, /\.pdf.*\.docx.*\.pptx.*\.xlsx.*\.csv/s);
  assert.match(instructions, /Do not add a cloud connector/);
  assert.ok(
    manifest.interface.defaultPrompt.some((prompt) =>
      /local PDF, Word, PowerPoint, or spreadsheet file/.test(prompt),
    ),
  );
  assert.match(manifest.interface.longDescription, /Create Accessible Learning Site/);
  assert.match(manifest.interface.longDescription, /Schedule Accessible Lesson Intake/);
});

test("the kit supports an optional complete-language pathway", async () => {
  const shell = await readFile(
    path.join(kitRoot, "accessible-learning.tsx"),
    "utf8",
  );
  const interactions = await readFile(
    path.join(kitRoot, "accessible-interactions.tsx"),
    "utf8",
  );
  const instructions = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const baseline = await readFile(
    path.join(skillRoot, "references", "accessibility-baseline.md"),
    "utf8",
  );
  const translation = await readFile(
    path.join(
      trialRoot,
      "kinematics-fundamentals",
      "app",
      "projectile-vietnamese.ts",
    ),
    "utf8",
  );

  assert.match(shell, /export type LessonLanguage = "en-AU" \| "vi"/);
  assert.match(shell, /language\?: LessonLanguage/);
  assert.match(shell, /onLanguageChange\?: \(language: LessonLanguage\) => void/);
  assert.match(shell, /\{onLanguageChange \? \(/);
  assert.match(shell, /document\.documentElement\.lang = language/);
  assert.match(shell, /<option value="vi">\{copy\.vietnamese\}<\/option>/);
  assert.match(interactions, /language\?: "en-AU" \| "vi"/);
  assert.match(instructions, /translate\s+the complete student pathway/i);
  assert.match(instructions, /preserve stable source anchors, cue IDs, timestamps/i);
  assert.match(baseline, /## Alternative-language pathway/);
  assert.match(baseline, /Do not show an inactive language selector/);
  assert.equal((translation.match(/"lecture-cue-\d{4}":/g) ?? []).length, 220);
});

test("the reusable kit passes project-boundary checks", async (context) => {
  const root = await makeLessonProject();
  context.after(() => rm(root, { recursive: true, force: true }));
  const result = await checkProject(root);
  assert.deepEqual(result.findings, []);
  assert.ok(result.anchors.includes("learn"));
  assert.match(result.sourceRevision, /^sha256:[0-9a-f]{64}$/);
});

test("the kinematics fixture passes the multimodal boundary contract", async (context) => {
  const root = await makeTrialProject("kinematics-fundamentals");
  context.after(() => rm(root, { recursive: true, force: true }));

  const result = await checkProject(root);
  const page = await readFile(path.join(root, "app", "page.tsx"), "utf8");
  const visuals = await readFile(
    path.join(root, "app", "kinematics-visuals.tsx"),
    "utf8",
  );

  assert.deepEqual(result.findings, []);
  assert.equal(result.contentSpecificAlternativesRequired, true);
  assert.equal(result.equivalentPathwaysRequired, true);
  assert.equal(result.representationSwitchingRequired, false);
  for (const pattern of [
    /Kinematics: describing motion/,
    /<LecturePointHeading\b/,
    /<AccessibleMathRegion\b/,
    /<DataTableRegion\b/,
    /<RelationshipExplorer\b/,
    /<ConstantAccelerationExplorer\b/,
    /lesson-problem-reference/,
    /lesson-key-points/,
    /Plain explanation/,
    /kinematics-week-2-lecture\.m4a/,
    /√305 = 17\.5 metres per second/,
    /Bill therefore\s+moves at \+15 metres per second relative to Amy/,
  ]) {
    assert.match(page, pattern);
  }
  assert.equal((page.match(/data-focus-optional="true"/g) ?? []).length, 2);
  assert.equal((page.match(/<OptionalContextIllustration\b/g) ?? []).length, 3);
  assert.match(page, /vietnameseKinematicsTranscriptPoints/);
  assert.match(page, /language=\{language\}/);
  assert.match(page, /\/illustrations\/constant-acceleration-context\.webp/);
  assert.match(page, /\/illustrations\/free-fall-context\.webp/);
  assert.match(page, /\/illustrations\/projectile-motion-context\.webp/);
  assert.match(visuals, /alternative="ball"/);
  assert.match(visuals, /\/simulator\/tennis-ball-sprite\.png/);
  assert.match(visuals, /\/simulator\/car-sprite\.png/);
  assert.match(visuals, /appearance does not change the calculation/);
  assert.match(visuals, /does not represent position/);
  assert.deepEqual(
    (await readdir(path.join(root, "public", "illustrations"))).sort(),
    [
      "constant-acceleration-context.webp",
      "constant-acceleration.webp",
      "everyday-motion-context.webp",
      "free-fall-context.webp",
      "free-fall.webp",
      "projectile-motion-context.webp",
      "projectile-motion.webp",
    ],
  );
  assert.deepEqual(
    (await readdir(path.join(root, "public", "simulator"))).sort(),
    ["car-sprite.png", "tennis-ball-sprite.png"],
  );

  const assetLedger = JSON.parse(
    await readFile(
      path.join(
        skillRoot,
        "references",
        "trials",
        "kinematics-fundamentals-generated-assets.json",
      ),
      "utf8",
    ),
  );
  assert.equal(assetLedger.generator, "OpenAI built-in image generation");
  assert.equal(assetLedger.sources.length, 9);
  for (const source of assetLedger.sources) {
    const asset = await readFile(
      path.join(trialRoot, "kinematics-fundamentals", source.path),
    );
    assert.equal(createHash("sha256").update(asset).digest("hex"), source.sha256);
    assert.ok(source.prompt);
    assert.ok(source.purpose);
    assert.ok(source.textEquivalent);
    assert.ok(source.rightsEvidence);
  }
});

test("the kinematics fixture keeps its source calculations", () => {
  const modelUrl = pathToFileURL(
    path.join(
      trialRoot,
      "kinematics-fundamentals",
      "app",
      "kinematics-model.ts",
    ),
  ).href;
  const result = spawnSync(
    process.execPath,
    [
      "--experimental-strip-types",
      "--input-type=module",
      "--eval",
      `const model = await import(${JSON.stringify(modelUrl)});
if (JSON.stringify(model.motionAt(3, 2, 4)) !== JSON.stringify({ acceleration: 2, velocity: 11, displacement: 28 })) process.exit(1);
if (model.billVelocityRelativeToAmy(5, -10) !== 15) process.exit(1);
if (Math.abs(model.projectileAt(1.43).horizontalDistance - 28.6) >= 1e-9) process.exit(1);`,
    ],
    { encoding: "utf8" },
  );

  assert.equal(result.status, 0, result.stderr);
});

test("the kinematics fixture keeps extreme arrow geometry finite and bounded", () => {
  const geometryUrl = pathToFileURL(
    path.join(
      trialRoot,
      "kinematics-fundamentals",
      "app",
      "arrow-geometry.ts",
    ),
  ).href;
  const result = spawnSync(
    process.execPath,
    [
      "--experimental-strip-types",
      "--input-type=module",
      "--eval",
      `const { boundedArrowGeometry } = await import(${JSON.stringify(geometryUrl)});
const bounds = { minX: 10, maxX: 110, minY: 20, maxY: 120 };
if (boundedArrowGeometry(60, 70, 60, 70, bounds) !== null) process.exit(1);
for (const arrow of [boundedArrowGeometry(60, 70, 1000, 70, bounds), boundedArrowGeometry(60, 70, -1000, 70, bounds)]) {
  if (!arrow || arrow.start.x !== 60 || arrow.start.y !== 70 || [arrow.start, arrow.end, ...arrow.head].some(({ x, y }) => !Number.isFinite(x) || !Number.isFinite(y) || x < 10 || x > 110 || y < 20 || y > 120)) process.exit(1);
}
if (boundedArrowGeometry(110, 70, 120, 70, bounds) !== null) process.exit(1);`,
    ],
    { encoding: "utf8" },
  );

  assert.equal(result.status, 0, result.stderr);
});

test("the boundary review reports identity, auth, preset, and unsafe interaction findings", async (context) => {
  const root = await makeLessonProject();
  context.after(() => rm(root, { recursive: true, force: true }));
  await writeFile(
    path.join(root, "app", "chatgpt-auth.ts"),
    `const studentName = "Example";
localStorage.setItem("studentName", studentName);
indexedDB.open("answers");
const query = new URLSearchParams(location.search).get("preset");
fetch("https://tracker.example/collect");
`,
  );
  await writeFile(
    path.join(root, "app", "bad-control.tsx"),
    `export const Bad = ({ url }) => <>
  <span aria-label="one half" tabindex="2">1/2</span>
  <Image src={url} alt="" />
  <video autoplay />
  <form><input type="email" name="answer" /><button>Send</button></form>
  <button type="submit">Submit</button>
</>;
`,
  );
  await writeFile(
    path.join(root, "app", "bad-runtime.ts"),
    `import request from "axios";
const aliasedFetch = globalThis.fetch;
env.DB.prepare("select 1");
request("/collect");
aliasedFetch("/collect");
`,
  );
  await writeFile(
    path.join(root, "app", "server-action.ts"),
    `"use server";
import "server-only";
export async function submitAnswer() {}
`,
  );
  await writeFile(
    path.join(root, "app", "bad-italic.css"),
    ".lesson-note { font-style: italic; }\n",
  );
  await writeFile(
    path.join(root, "app", "bad-underline.css"),
    ".lesson-note { text-decoration: underline; }\n",
  );
  await writeFile(
    path.join(root, "middleware.ts"),
    "export function middleware() {}\n",
  );
  await writeFile(path.join(root, ".env"), "LESSON_FAKE_SECRET=example\n");
  await writeFile(path.join(root, "source-ledger.json"), "{}\n");
  await writeFile(path.join(root, "agent-review-report.json"), "{}\n");
  await mkdir(path.join(root, "public"), { recursive: true });
  await writeFile(
    path.join(root, "public", "answer-key.html"),
    "<h1>Teacher answer key</h1>\n",
  );
  await mkdir(path.join(root, "app", "collect"), { recursive: true });
  await writeFile(
    path.join(root, "app", "collect", "route.ts"),
    "export function POST() { return new Response(null); }\n",
  );

  const result = await checkProject(root);
  const rules = new Set(result.findings.map((finding) => finding.rule));
  for (const expected of [
    "auth-file",
    "browser-storage",
    "student-identity",
    "preset-or-query-profile",
    "external-runtime",
    "persistent-backend",
    "dynamic-resource",
    "form-submission",
    "generic-span-name",
    "positive-tabindex",
    "autoplay",
    "text-style",
    "server-action",
    "server-module",
    "server-route",
    "server-surface",
    "environment-file",
    "teacher-only-artifact",
    "extra-route",
  ]) {
    assert.ok(rules.has(expected), `missing ${expected}`);
  }
  for (const file of ["app/bad-italic.css", "app/bad-underline.css"]) {
    assert.ok(
      result.findings.some(
        (finding) => finding.file === file && finding.rule === "text-style",
      ),
      `missing text-style for ${file}`,
    );
  }
  assert.ok(
    result.findings.some(
      (finding) =>
        finding.rule === "teacher-only-artifact" &&
        finding.file === "agent-review-report.json",
    ),
  );
});

test("the boundary review reports server reads and external resource attributes", async (context) => {
  const root = await makeLessonProject();
  context.after(() => rm(root, { recursive: true, force: true }));
  const fixtures = [
    [
      "server-context.ts",
      'import { cookies, headers } from "next/headers"; export const readers = [cookies, headers];',
      "server-runtime",
    ],
    [
      "runtime-env.ts",
      "export const secret = process.env.LESSON_SECRET;",
      "server-runtime",
    ],
    [
      "server-file.ts",
      'import { readFile } from "node:fs/promises"; export const reader = readFile;',
      "server-runtime",
    ],
    [
      "external-srcset.tsx",
      'export const Image = () => <img src="/tree.png" srcSet="https://example.invalid/tree@2x.png 2x" alt="Probability tree" />;',
      "external-runtime",
    ],
    [
      "external-poster.tsx",
      'export const Video = () => <video controls poster="https://example.invalid/poster.png" />;',
      "external-runtime",
    ],
    [
      "external-object.tsx",
      'export const Diagram = () => <object data="https://example.invalid/tree.svg" type="image/svg+xml">Diagram unavailable.</object>;',
      "external-runtime",
    ],
    [
      "external-import.css",
      '@import "https://example.invalid/lesson.css";',
      "external-runtime",
    ],
    [
      "missing-alt.tsx",
      'export const Diagram = () => <img src="/lesson-image.png" />;',
      "image-alt",
    ],
  ];

  for (const [file, source] of fixtures) {
    await writeFile(path.join(root, "app", file), source);
  }
  const result = await checkProject(root);
  for (const [file, , rule] of fixtures) {
    assert.ok(
      result.findings.some(
        (finding) => finding.file === `app/${file}` && finding.rule === rule,
      ),
      `missing ${rule} for ${file}`,
    );
  }
});

test("binary lesson assets are part of the validated source revision", async (context) => {
  const root = await makeLessonProject();
  context.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, "public"), { recursive: true });
  const imagePath = path.join(root, "public", "lesson-image.png");
  await writeFile(imagePath, Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x01]));
  const first = await checkProject(root);

  await writeFile(imagePath, Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x02]));
  const second = await checkProject(root);

  assert.deepEqual(first.findings, []);
  assert.deepEqual(second.findings, []);
  assert.deepEqual(first.assetPaths, ["public/lesson-image.png"]);
  assert.notEqual(first.sourceRevision, second.sourceRevision);
  assert.ok(first.filesHashed > first.filesChecked);

  const misplacedAssetPath = path.join(root, "app", "misplaced-image.png");
  await writeFile(misplacedAssetPath, Buffer.from([0x89, 0x50, 0x4e, 0x47]));
  const misplaced = await checkProject(root);
  assert.ok(
    misplaced.findings.some(
      (finding) =>
        finding.file === "app/misplaced-image.png" &&
        finding.rule === "asset-location",
    ),
  );
});

test("source revisions use unambiguous length framing", async (context) => {
  const firstRoot = await makeLessonProject();
  const secondRoot = await makeLessonProject();
  context.after(() => rm(firstRoot, { recursive: true, force: true }));
  context.after(() => rm(secondRoot, { recursive: true, force: true }));

  await writeFile(path.join(firstRoot, "a.txt"), "x\0b.txt\0y");
  await writeFile(path.join(secondRoot, "a.txt"), "x");
  await writeFile(path.join(secondRoot, "b.txt"), "y");

  const first = await checkProject(firstRoot);
  const second = await checkProject(secondRoot);
  assert.notEqual(first.sourceRevision, second.sourceRevision);
});

test("root generated output is excluded without hiding nested lesson source", async (context) => {
  const root = await makeLessonProject();
  context.after(() => rm(root, { recursive: true, force: true }));
  const original = await checkProject(root);

  for (const directory of [".vinext", ".vercel", "out", "outputs", "work"]) {
    await mkdir(path.join(root, directory), { recursive: true });
    await writeFile(path.join(root, directory, "generated.txt"), directory);
  }
  const withGeneratedOutput = await checkProject(root);
  assert.equal(withGeneratedOutput.sourceRevision, original.sourceRevision);

  await mkdir(path.join(root, "app", "work"), { recursive: true });
  await writeFile(
    path.join(root, "app", "work", "source.tsx"),
    "export const lessonSource = 'included';\n",
  );
  const withNestedSource = await checkProject(root);
  assert.notEqual(withNestedSource.sourceRevision, original.sourceRevision);
});

test("the storage exception applies only to the unchanged bundled component", async (context) => {
  const root = await makeLessonProject();
  context.after(() => rm(root, { recursive: true, force: true }));
  const componentPath = path.join(
    root,
    "app",
    "components",
    "accessible-learning.tsx",
  );
  const component = await readFile(componentPath, "utf8");
  await writeFile(
    componentPath,
    `${component}\nlocalStorage.setItem("student-answer", "yes");\n`,
  );

  const result = await checkProject(root);
  assert.ok(
    result.findings.some((finding) => finding.rule === "browser-storage"),
  );
});

test("copied interaction changes are revision-bound without revalidating kit internals", async (context) => {
  const root = await makeLessonProject();
  context.after(() => rm(root, { recursive: true, force: true }));
  const original = await checkProject(root);
  const componentPath = path.join(
    root,
    "app",
    "components",
    "accessible-interactions.tsx",
  );
  const component = await readFile(componentPath, "utf8");
  await writeFile(componentPath, `${component}\n// changed copy\n`);

  const changed = await checkProject(root);
  assert.deepEqual(changed.findings, []);
  assert.notEqual(original.sourceRevision, changed.sourceRevision);
});

test("decoy kit copies do not satisfy the fixed component contract", async (context) => {
  const root = await makeLessonProject();
  context.after(() => rm(root, { recursive: true, force: true }));
  const componentRoot = path.join(root, "app", "components");
  const decoyRoot = path.join(root, "decoy-kit");
  await rm(componentRoot, { recursive: true, force: true });
  await mkdir(componentRoot, { recursive: true });
  await mkdir(decoyRoot, { recursive: true });
  for (const file of kitFiles) {
    await copyFile(path.join(kitRoot, file), path.join(decoyRoot, file));
  }

  const result = await checkProject(root);
  assert.ok(
    result.findings.some(
      (finding) =>
        finding.rule === "required" &&
        finding.message.includes("bundled accessibility component"),
    ),
  );
  assert.ok(
    result.findings.some(
      (finding) =>
        finding.rule === "required" &&
        finding.message.includes("bundled accessible interactions"),
    ),
  );
});

test("lesson interactions must import the canonical kit", async (context) => {
  const root = await makeLessonProject();
  context.after(() => rm(root, { recursive: true, force: true }));
  await writeFile(
    path.join(root, "app", "fake-interactions.tsx"),
    "export function RepresentationGroup({ children }) { return <div>{children}</div>; }\n",
  );
  await writeFile(
    path.join(root, "app", "page.tsx"),
    `import { AccessibleLessonShell } from "./components/accessible-learning";
import { RepresentationGroup } from "./fake-interactions";
export default function Page() {
  return <AccessibleLessonShell title="Chance" objective="Explain chance." sections={[{ id: "learn", label: "Learn" }]}><section id="learn"><h2>Learn</h2><RepresentationGroup>Fake</RepresentationGroup></section></AccessibleLessonShell>;
}
`,
  );

  const result = await checkProject(root);
  assert.ok(
    result.findings.some((finding) => finding.rule === "interaction-import"),
  );
});

test("required content stays visible and long-lecture media starts before lesson sections", async (context) => {
  const root = await makeLessonProject();
  context.after(() => rm(root, { recursive: true, force: true }));
  await writeFile(
    path.join(root, "app", "page.tsx"),
    `import { AccessibleLessonShell } from "./components/accessible-learning";
import { Representation, StepByStep } from "./components/accessible-interactions";
export default function Page() {
  return <AccessibleLessonShell title="Chance" objective="Explain chance." sections={[{ id: "learn", label: "Learn" }]}><section id="learn"><h2>Learn</h2><Representation label="Rule">Hidden</Representation><StepByStep labelledBy="learn" steps={[]} /><audio controls aria-describedby="help" /><p id="help">Transcript below.</p></section></AccessibleLessonShell>;
}
`,
  );

  const result = await checkProject(root);
  for (const rule of [
    "required-content-disclosure",
    "lecture-audio-placement",
    "media-transcript-layout",
  ]) {
    assert.ok(result.findings.some((finding) => finding.rule === rule), rule);
  }
});

test("every used interaction must be imported from the canonical kit", async (context) => {
  const root = await makeLessonProject();
  context.after(() => rm(root, { recursive: true, force: true }));
  await writeFile(
    path.join(root, "app", "page.tsx"),
    `import { AccessibleLessonShell } from "./components/accessible-learning";
import { RepresentationGroup } from "./components/accessible-interactions";
function ChoiceActivity({ children }) { return <div>{children}</div>; }
function RelationshipExplorer({ children }) { return <div>{children}</div>; }
function LecturePointHeading({ children }) { return <h3>{children}</h3>; }
export default function Page() {
  return <AccessibleLessonShell title="Chance" objective="Explain chance." sections={[{ id: "learn", label: "Learn" }]}><section id="learn"><h2>Learn</h2><RepresentationGroup label="Ways"><ChoiceActivity>Fake</ChoiceActivity><RelationshipExplorer>Fake</RelationshipExplorer><LecturePointHeading>Fake</LecturePointHeading></RepresentationGroup></section></AccessibleLessonShell>;
}
`,
  );

  const result = await checkProject(root);
  for (const component of [
    "ChoiceActivity",
    "RelationshipExplorer",
    "LecturePointHeading",
  ]) {
    assert.ok(
      result.findings.some(
        (finding) =>
          finding.rule === "interaction-import" &&
          finding.message.includes(component),
      ),
      `missing canonical import finding for ${component}`,
    );
  }
});

test("core lesson components must bind to the canonical kit", async (context) => {
  const root = await makeLessonProject();
  context.after(() => rm(root, { recursive: true, force: true }));
  await writeFile(
    path.join(root, "app", "page.tsx"),
    `import { AccessibleLessonShell as BundledShell } from "./components/accessible-learning";
function AccessibleLessonShell({ children }) { return <main>{children}</main>; }
function AccessibleMathRegion({ children }) { return <div>{children}</div>; }
export default function Page() {
  return <AccessibleLessonShell><AccessibleMathRegion>Fake math</AccessibleMathRegion></AccessibleLessonShell>;
}
`,
  );

  const result = await checkProject(root);
  const rules = new Set(result.findings.map((finding) => finding.rule));
  assert.ok(rules.has("core-component-alias"));
  assert.ok(rules.has("core-component-import"));
  assert.ok(
    result.findings.some(
      (finding) =>
        finding.rule === "required" &&
        finding.message.includes("render AccessibleLessonShell"),
    ),
  );
});

test("the checker scans package metadata and non-code text files", async (context) => {
  const root = await makeLessonProject();
  context.after(() => rm(root, { recursive: true, force: true }));
  await writeFile(
    path.join(root, "package.json"),
    JSON.stringify({
      dependencies: {
        "@vercel/analytics": "latest",
        "drizzle-orm": "latest",
        "next-auth": "latest",
      },
    }),
  );
  await writeFile(
    path.join(root, "lesson-data.json"),
    JSON.stringify({ student_id: "example" }),
  );

  const result = await checkProject(root);
  const rules = new Set(result.findings.map((finding) => finding.rule));
  for (const expected of [
    "analytics",
    "auth",
    "persistent-backend",
    "student-identity",
  ]) {
    assert.ok(rules.has(expected), `missing ${expected}`);
  }
});

test("the checker enforces the titled English root route", async (context) => {
  const root = await makeLessonProject();
  context.after(() => rm(root, { recursive: true, force: true }));
  await writeFile(
    path.join(root, "app", "layout.tsx"),
    'const card = { title: "Not a document title" };\nexport default function Layout({ children }) { return <html lang="vi"><body>{children}</body></html>; }\n',
  );
  await mkdir(path.join(root, "app", "second"), { recursive: true });
  await writeFile(
    path.join(root, "app", "second", "page.tsx"),
    "export default function Second() { return <p>Second route</p>; }\n",
  );

  const result = await checkProject(root);
  const messages = result.findings.map((finding) => finding.message);
  assert.ok(messages.some((message) => message.includes("literal English")));
  assert.ok(messages.some((message) => message.includes("meaningful title")));
  assert.ok(result.findings.some((finding) => finding.rule === "extra-route"));
});

test("the boundary review reports nested MDX routes", async (context) => {
  const root = await makeLessonProject();
  context.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, "app", "hidden"), { recursive: true });
  await writeFile(
    path.join(root, "app", "hidden", "page.mdx"),
    "# Hidden student route\n",
  );

  const result = await checkProject(root);
  assert.ok(
    result.findings.some(
      (finding) =>
        finding.rule === "extra-route" && finding.file === "app/hidden/page.mdx",
    ),
  );
});

test("content-specific kit components trigger alternative evidence", async (context) => {
  const root = await makeLessonProject();
  context.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, "public"), { recursive: true });
  await writeFile(
    path.join(root, "public", "outcomes.png"),
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x01]),
  );
  await writeFile(
    path.join(root, "app", "page.tsx"),
    `import { AccessibleLessonShell } from "./components/accessible-learning";
import { DescribedFigure } from "./components/accessible-interactions";
export default function Page() {
  return <AccessibleLessonShell title="Chance" objective="Explain probability." sections={[{ id: "learn", label: "Learn" }]}>
    <section id="learn"><h2>Learn</h2><DescribedFigure caption="Two outcomes" visual={<img src="/outcomes.png" alt="" width={600} height={400} />} description={<p>Heads and tails are equally likely.</p>} /></section>
  </AccessibleLessonShell>;
}
`,
  );

  const result = await checkProject(root);
  assert.deepEqual(result.findings, []);
  assert.equal(result.contentSpecificAlternativesRequired, true);
  assert.equal(result.equivalentPathwaysRequired, true);
  assert.deepEqual(result.assetPaths, ["public/outcomes.png"]);
});

test("the rendered Site check verifies document structure and ledger anchors", () => {
  const ledger = {
    sources: [{ id: "source-objective", siteAnchor: "learn" }],
    adaptations: [{ id: "adaptation-table", siteAnchor: "practice" }],
  };
  const validHtml = `<!doctype html>
<html lang="en"><head><title>Chance lesson</title><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>
<a href="#lesson-main">Skip to lesson</a>
<main id="lesson-main">
  <h1>Chance</h1>
  <section id="learn" aria-labelledby="learn-title">
    <h2 id="learn-title">Learn</h2>
    <img src="/coin.png" alt="Heads and tails">
  </section>
  <section id="practice"><h2>Practice</h2><button>Check answer</button></section>
</main></body></html>`;
  assert.deepEqual(checkRenderedHtml(validHtml, ledger), []);
  assert.ok(
    checkRenderedHtml(
      validHtml.replace(
        "initial-scale=1",
        "initial-scale=1, maximum-scale=1, user-scalable=no",
      ),
      ledger,
    ).some((finding) => finding.rule === "viewport"),
  );
  assert.ok(
    checkRenderedHtml(
      validHtml.replace(
        "</head>",
        '<meta name="viewport" content="width=device-width, maximum-scale=1"></head>',
      ),
      ledger,
    ).some((finding) => finding.rule === "viewport"),
  );
  assert.ok(
    checkRenderedHtml(
      validHtml.replace(
        "initial-scale=1",
        "initial-scale=1, maximum-scale=3, maximum-scale=1",
      ),
      ledger,
    ).some((finding) => finding.rule === "viewport"),
  );
  for (const restrictiveViewport of [
    "initial-scale=1; maximum-scale=1",
    "initial-scale=1 maximum-scale=1",
    "initial-scale=1, maximum-scale&#x3D;1",
    "initial-scale=1, user&#45;scalable=no",
    "initial-scale=1, maximum&#45;scale=1",
    "initial-scale=1, user&#45scalable&equals;no",
  ]) {
    assert.ok(
      checkRenderedHtml(
        validHtml.replace("initial-scale=1", restrictiveViewport),
        ledger,
      ).some((finding) => finding.rule === "viewport"),
    );
  }
  assert.ok(
    checkRenderedHtml(
      validHtml.replace(
        "</head>",
        '<meta name="view&#x70;ort" content="width=device-width"></head>',
      ),
      ledger,
    ).some((finding) => finding.rule === "viewport"),
  );
  assert.ok(
    checkRenderedHtml(
      validHtml.replace(
        "</head>",
        '<meta name="view&#112ort" content="width=device-width"></head>',
      ),
      ledger,
    ).some((finding) => finding.rule === "viewport"),
  );

  const invalidHtml = `<!doctype html>
<html><head><title> </title></head><body>
<main id="lesson-main"><h1>Chance</h1><h3 id="duplicate">Skipped heading</h3>
<section id="duplicate" aria-labelledby="missing-title">
  <a href="#missing-section"></a><img src="/coin.png"><button></button>
</section></main><main></main></body></html>`;
  const rules = new Set(checkRenderedHtml(invalidHtml, ledger).map((item) => item.rule));
  for (const rule of [
    "document-language",
    "document-title",
    "viewport",
    "main-landmark",
    "skip-link",
    "duplicate-id",
    "fragment-target",
    "aria-reference",
    "ledger-anchor",
    "image-alt",
    "control-name",
    "heading-order",
  ]) {
    assert.ok(rules.has(rule), `missing rendered rule: ${rule}`);
  }
});

test("the rendered Site check requires controlled audio with a visible transcript reference", () => {
  const validAudioHtml = `<!doctype html>
<html lang="en-AU"><head><title>Audio lesson</title><meta name="viewport" content="width=device-width"></head><body>
<a href="#lesson-main">Skip to lesson</a><main id="lesson-main"><h1>Newton's laws</h1>
<p id="audio-help">A complete transcript follows the player.</p>
<audio controls preload="metadata" aria-describedby="audio-help"><source src="/lecture.m4a" type="audio/mp4"></audio>
<section id="lecture-transcript"><h2>Transcript</h2><p>Lecturer: A force changes motion.</p></section>
</main></body></html>`;
  assert.deepEqual(checkRenderedHtml(validAudioHtml), []);

  const invalidRules = new Set(
    checkRenderedHtml(
      validAudioHtml.replace(
        'controls preload="metadata" aria-describedby="audio-help"',
        "autoplay",
      ),
    ).map((finding) => finding.rule),
  );
  for (const rule of ["media-autoplay", "media-controls", "audio-transcript"]) {
    assert.ok(invalidRules.has(rule), `missing rendered audio rule: ${rule}`);
  }
});

function cssVariables(source, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const block = new RegExp(`${escaped}\\s*\\{([\\s\\S]*?)\\}`).exec(source)?.[1];
  assert.ok(block, `missing ${selector}`);
  return Object.fromEntries(
    [
      ...block.matchAll(
        /--als-([a-z-]+):\s*(?:var\([^,]+,\s*)?(#[0-9a-f]{6})\)?;/gi,
      ),
    ].map(
      ([, name, value]) => [name, value],
    ),
  );
}

function luminance(hex) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    .map((value) => Number.parseInt(value, 16) / 255)
    .map((value) =>
      value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4,
    );
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrast(first, second) {
  const [lighter, darker] = [luminance(first), luminance(second)].sort(
    (a, b) => b - a,
  );
  return (lighter + 0.05) / (darker + 0.05);
}

test("source-derived and colour-support palettes preserve contrast without theme or font controls", async () => {
  const css = await readFile(path.join(kitRoot, "accessible-learning.css"), "utf8");
  const interactionCss = await readFile(
    path.join(kitRoot, "accessible-interactions.css"),
    "utf8",
  );
  const component = await readFile(
    path.join(kitRoot, "accessible-learning.tsx"),
    "utf8",
  );
  const instructions = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const baseline = await readFile(
    path.join(skillRoot, "references", "accessibility-baseline.md"),
    "utf8",
  );
  const darkMedia = css.slice(css.indexOf("@media (prefers-color-scheme: dark)"));
  const paletteSelectors = {
    standard: ".als-shell",
    stronger: '.als-shell[data-colour-support="stronger"]',
    redGreen: '.als-shell[data-colour-support="red-green"]',
    blueYellow: '.als-shell[data-colour-support="blue-yellow"]',
    minimal: '.als-shell[data-colour-support="minimal"]',
  };
  const palettes = Object.fromEntries(
    Object.entries(paletteSelectors).flatMap(([name, selector]) => [
      [`${name} light`, cssVariables(css, selector)],
      [`${name} dark`, cssVariables(darkMedia, selector)],
    ]),
  );

  for (const [name, palette] of Object.entries(palettes)) {
    for (const [foreground, background, minimum] of [
      ["text", "background", 4.5],
      ["text", "surface", 4.5],
      ["muted", "background", 4.5],
      ["muted", "surface", 4.5],
      ["accent", "background", 4.5],
      ["accent", "surface", 4.5],
      ["on-accent", "accent", 4.5],
      ["text", "accent-soft", 4.5],
      ["border", "surface", 3],
      ["category-one", "surface", 3],
      ["category-two", "surface", 3],
      ["category-three", "surface", 3],
    ]) {
      const ratio = contrast(palette[foreground], palette[background]);
      assert.ok(
        ratio >= minimum,
        `${name} ${foreground}/${background} is ${ratio.toFixed(2)}:1`,
      );
    }
  }

  assert.match(css, /outline:\s*3px solid #ffffff/);
  assert.match(css, /box-shadow:\s*0 0 0 6px #000000/);
  assert.match(css, /@media \(forced-colors: active\)/);
  assert.match(
    css,
    /@media \(forced-colors: active\)[\s\S]*?\.als-preview-swatch[\s\S]*?border-color:\s*CanvasText/,
  );
  assert.match(css, /\.als-shell \.als-skip-link/);
  assert.match(
    css,
    /\.als-shell a[\s\S]*?text-decoration-line:\s*underline/,
  );
  assert.doesNotMatch(`${css}\n${interactionCss}`, /font-style:\s*(?:italic|oblique)/i);
  assert.match(
    baseline,
    /Do not use italics or underline non-link\s+text; keep link underlines/,
  );
  assert.match(css, /color-scheme:\s*light dark/);
  assert.doesNotMatch(css, /data-(?:font|theme)|ui-serif|high contrast/i);
  assert.doesNotMatch(
    css,
    /\.als-shell\[data-colour-support="standard"\]\s*\{/,
  );
  for (const token of [
    "background",
    "surface",
    "text",
    "muted",
    "accent",
    "on-accent",
    "accent-soft",
    "border",
    "category-one",
    "category-two",
    "category-three",
  ]) {
    assert.match(
      css,
      new RegExp(
        `--als-${token}:\\s*var\\(--als-source-${token},\\s*#[0-9a-f]{6}\\)`,
        "i",
      ),
    );
    assert.match(
      darkMedia,
      new RegExp(
        `--als-${token}:\\s*var\\(--als-source-dark-${token},\\s*#[0-9a-f]{6}\\)`,
        "i",
      ),
    );
  }
  assert.doesNotMatch(
    `${css}\n${interactionCss}`,
    /(?:img|video)[^{]*\{[^}]*\bfilter\s*:/,
  );
  assert.doesNotMatch(
    component,
    /als-(?:font|theme)|data-(?:font|theme)|Font style|<legend>Appearance<\/legend>/,
  );
  assert.match(component, /colourSupport:[\s\S]*?"red-green"[\s\S]*?"blue-yellow"/);
  assert.match(component, /colourSupport: "standard"/);
  assert.match(
    component,
    /allowed\(\s*value\.colourSupport,\s*\["standard", "stronger", "minimal", "red-green", "blue-yellow"\]/,
  );
  assert.match(component, /data-colour-support=\{preferences\.colourSupport\}/);
  assert.match(component, /<legend>\{copy\.colourSupport\}<\/legend>/);
  assert.match(component, /<option value="standard">\{copy\.standard\}<\/option>/);
  assert.match(component, /<option value="stronger">\{copy\.stronger\}<\/option>/);
  assert.match(component, /<option value="red-green">\{copy\.redGreen\}<\/option>/);
  assert.match(component, /<option value="blue-yellow">\{copy\.blueYellow\}<\/option>/);
  assert.match(component, /<option value="minimal">\{copy\.minimal\}<\/option>/);
  assert.match(component, /Standard uses the lesson palette/);
  assert.match(component, /not the original lesson images/);
  assert.match(component, /\{copy\.solid\}/);
  assert.match(component, /\{copy\.striped\}/);
  assert.match(component, /\{copy\.dotted\}/);
  assert.match(css, /\.als-preview-one[\s\S]*?border-style:\s*solid/);
  assert.match(css, /\.als-preview-two[\s\S]*?repeating-linear-gradient/);
  assert.match(css, /\.als-preview-two[\s\S]*?border-style:\s*dashed/);
  assert.match(css, /\.als-preview-three[\s\S]*?radial-gradient/);
  assert.match(css, /\.als-preview-three[\s\S]*?border-style:\s*dotted/);
  assert.match(
    css,
    /data-colour-support="stronger"[\s\S]*?--als-control-border-width:\s*3px/,
  );
  assert.match(
    instructions,
    /source-derived light and dark treatment is the student's\s+`Standard` colour-support setting/,
  );
  assert.match(instructions, /populate its `--als-source-\*` and `--als-source-dark-\*`/);
  assert.match(
    instructions,
    /never\s+filter\s+or\s+recolour\s+original teacher images, video, or\s+documents/i,
  );
  assert.match(
    instructions,
    /do not add a separate static generated diagram unless it\s+contributes distinct source meaning/i,
  );
  assert.match(
    baseline,
    /Do not retain a static\s+generated diagram that duplicates an equivalent contextual illustration and\s+simulator/,
  );
  assert.match(
    baseline,
    /\| Colour support \| Colour differences \| Standard, stronger differences, distinguish red and green, distinguish blue and yellow, minimal colour \|/,
  );
  assert.match(
    baseline,
    /Reset returns colour support to Standard/,
  );
  assert.match(component, /<legend>\{copy\.attention\}<\/legend>/);
  assert.match(component, /export function useColourSupport\(\)/);
  assert.match(component, /<option value="full">\{copy\.fullLesson\}<\/option>/);
  assert.match(component, /<option value="section">\{copy\.sectionBySection\}<\/option>/);
  assert.match(component, /<option value="all">\{copy\.showExtras\}<\/option>/);
  assert.match(component, /<option value="reduced">\{copy\.hideExtras\}<\/option>/);
  assert.match(component, /The simulator, transcripts, activities, feedback/);
  assert.doesNotMatch(component, /<summary>Accessibility settings<\/summary>/);
  assert.doesNotMatch(
    component,
    /als-motion|data-motion|Follow device|Motion reduced|Focus and motion/,
  );
  assert.match(
    css,
    /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.als-shell \*/,
  );
  assert.doesNotMatch(css, /data-motion/);
  assert.doesNotMatch(baseline, /\| Focus and motion \| Motion \|/);
  assert.match(
    baseline,
    /Follow the device's `prefers-reduced-motion` setting automatically/,
  );
  assert.match(
    baseline,
    /Section-by-section flow may show one required section at a time/,
  );
  assert.match(
    css,
    /data-reading-flow="section"[\s\S]*data-reading-section="true"[\s\S]*data-reading-active="true"/,
  );
  assert.match(
    component,
    /Children\.map\(children[\s\S]*data-reading-section[\s\S]*data-reading-active/,
  );
  assert.match(
    component,
    /<div className="als-reading">\{readingContent\}<\/div>[\s\S]*<nav className="als-reading-flow"/,
  );
  assert.match(
    css,
    /data-spacing="extra"\] :where\(\.als-header, \.als-main, \.als-footer\)/,
  );
  assert.match(css, /--als-title-size:\s*clamp\(2rem, 7vw, 4\.5rem\)/);
  assert.match(css, /--als-title-size:\s*clamp\(4rem, 14vw, 9rem\)/);
  assert.match(css, /font-size:\s*var\(--als-title-size\)/);
  assert.match(css, /\.als-objective h2[\s\S]*?font-size:\s*1em/);
  assert.match(
    css,
    /\.als-reading > section > h2[\s\S]*?font-size:\s*2em/,
  );
  assert.match(
    css,
    /\.als-reading h3[\s\S]*?font-size:\s*1\.5em/,
  );
});

test("the shell keeps reading utilities in one measured column", async () => {
  const component = await readFile(
    path.join(kitRoot, "accessible-learning.tsx"),
    "utf8",
  );
  const css = await readFile(
    path.join(kitRoot, "accessible-learning.css"),
    "utf8",
  );
  const layout = /\.als-layout\s*\{([^}]*)\}/.exec(css)?.[1] ?? "";
  const settings = /\.als-settings-column\s*\{([^}]*)\}/.exec(css)?.[1] ?? "";
  const settingsPanel = /\.als-settings\s*\{([^}]*)\}/.exec(css)?.[1] ?? "";
  const navigation = /\.als-section-nav\s*\{([^}]*)\}/.exec(css)?.[1] ?? "";
  const navigationList = /\.als-section-nav ol\s*\{([^}]*)\}/.exec(css)?.[1] ?? "";

  assert.match(css, /--als-reading-width:\s*84ch/);
  assert.match(
    css,
    /data-reading-width="narrow"\]\s*\{[^}]*--als-reading-width:\s*60ch/,
  );
  assert.ok(
    component.indexOf('<aside className="als-settings-column"') <
      component.indexOf('<main id="lesson-main"'),
  );
  assert.match(layout, /grid-template-columns:\s*minmax\(0, 1fr\)/);
  assert.match(settings, /position:\s*static/);
  assert.match(settingsPanel, /width:\s*min\(100%, var\(--als-reading-width\)\)/);
  assert.match(settingsPanel, /margin-inline:\s*auto/);
  assert.match(navigation, /width:\s*min\(100%, var\(--als-reading-width\)\)/);
  assert.match(navigation, /margin-inline:\s*auto/);
  assert.match(navigationList, /display:\s*grid/);
  assert.match(
    css,
    /\.als-header-inner,\s*\.als-footer\s*\{[^}]*width:\s*min\(var\(--als-reading-width\), calc\(100% - 2rem\)\)/,
  );
  assert.match(
    css,
    /\.als-reading\s*\{[^}]*width:\s*min\(100%, var\(--als-reading-width\)\)[^}]*margin-inline:\s*auto/,
  );
  assert.doesNotMatch(css, /\.als-settings-content\s*\{[^}]*grid-template-columns/);
  assert.doesNotMatch(css, /minmax\(14rem, 18rem\)|position:\s*sticky/);
});

test("the kit provides a labelled keyboard-scrollable math region", async () => {
  const component = await readFile(
    path.join(kitRoot, "accessible-learning.tsx"),
    "utf8",
  );
  const css = await readFile(
    path.join(kitRoot, "accessible-learning.css"),
    "utf8",
  );
  const types = await readFile(path.join(kitRoot, "mathml-jsx.d.ts"), "utf8");

  assert.match(component, /export function AccessibleMathRegion/);
  assert.match(component, /role="region"/);
  assert.match(component, /aria-labelledby=\{labelledBy\}/);
  assert.match(component, /tabIndex=\{0\}/);
  assert.match(css, /\.als-math-scroll[\s\S]*?overflow-x:\s*auto/);
  assert.match(types, /keyof MathMLElementTagNameMap/);
});

test("the interaction kit uses native pathways and ephemeral responses", async () => {
  const component = await readFile(
    path.join(kitRoot, "accessible-interactions.tsx"),
    "utf8",
  );
  const css = await readFile(
    path.join(kitRoot, "accessible-interactions.css"),
    "utf8",
  );

  for (const exportedComponent of [
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
  ]) {
    assert.match(component, new RegExp(`export function ${exportedComponent}`));
  }
  assert.match(component, /<details/);
  assert.match(component, /<fieldset/);
  assert.match(component, /role="status"/);
  assert.match(component, /not saved or sent/);
  assert.match(
    component,
    /className="ali-figure-visual" aria-hidden="true" inert/,
  );
  assert.match(
    component,
    /className="ali-figure-visual-scroll"\s+role="region"\s+aria-labelledby=\{captionId\}\s+aria-describedby=\{descriptionId\}\s+tabIndex=\{0\}/,
  );
  assert.doesNotMatch(component, /localStorage|sessionStorage|fetch\s*\(/);
  assert.match(css, /\.ali-figure-visual-scroll[\s\S]*?overflow-x:\s*auto/);
  assert.match(css, /\.ali-table-scroll[\s\S]*?overflow-x:\s*auto/);
});

test("the audio lesson kit keeps playback optional and the transcript operable", async () => {
  const [component, css] = await Promise.all([
    readFile(path.join(kitRoot, "accessible-interactions.tsx"), "utf8"),
    readFile(path.join(kitRoot, "accessible-interactions.css"), "utf8"),
  ]);
  const audioTranscript = component.slice(
    component.indexOf("export type TranscriptCue"),
    component.indexOf("type AuslanSupportProps"),
  );
  const lecturePoints = component.slice(
    component.indexOf("export type LecturePoint"),
    component.indexOf("export type SlideTranscriptItem"),
  );
  const auslan = component.slice(component.indexOf("type AuslanSupportProps"));

  assert.match(audioTranscript, /startSeconds: number/);
  assert.match(audioTranscript, /audioDescriptionId: string/);
  assert.match(audioTranscript, /speaker\?: string/);
  assert.match(audioTranscript, /note\?: ReactNode/);
  assert.match(audioTranscript, /Interactive transcript/);
  assert.match(audioTranscript, /isVietnamese \? "Phát từ" : "Play from"/);
  assert.match(audioTranscript, /element\.addEventListener\("timeupdate"/);
  assert.doesNotMatch(audioTranscript, /autoplay|autoPlay|\.focus\s*\(/);
  assert.match(lecturePoints, /export function LecturePointHeading/);
  assert.match(lecturePoints, /className="ali-point-heading-toggle"/);
  assert.match(lecturePoints, /aria-expanded=\{open\}/);
  assert.match(lecturePoints, /aria-controls=\{panelId\}/);
  assert.match(lecturePoints, /role="region"/);
  assert.match(lecturePoints, /points\.map\(\(point\) =>/);
  assert.doesNotMatch(lecturePoints, /\.focus\s*\(/);
  assert.match(
    css,
    /\.ali-point-heading-row\s*\{[^}]*display:\s*flex;[^}]*justify-content:\s*space-between;/,
  );
  assert.match(
    css,
    /\.ali-point-heading-actions\s*\{[^}]*flex-wrap:\s*wrap;/,
  );
  assert.match(
    css,
    /\.ali-point-transcript-panel\s*\{[^}]*padding:\s*0\.85rem 1rem 1rem;[^}]*border-block-end:/,
  );
  assert.match(
    css,
    /@media \(forced-colors: active\)[\s\S]*?\.ali-point-heading-toggle,[\s\S]*?\.ali-point-transcript-panel,/,
  );
  assert.match(
    css,
    /@media \(max-width: 42rem\)[\s\S]*?\.ali-point-heading-row,[\s\S]*?\.ali-point-transcript-intro\s*\{[^}]*flex-direction:\s*column;/,
  );
  assert.doesNotMatch(css, /\.ali-point-transcript-disclosure/);
  assert.match(
    auslan,
    /AI-generated sign-language draft — not a\s+verified interpretation/,
  );
  assert.doesNotMatch(auslan, /human_reviewed|Human-reviewed interpretation/);
});

test("the slide transcript viewer pairs reviewed source visuals with complete text", async () => {
  const component = await readFile(
    path.join(kitRoot, "accessible-interactions.tsx"),
    "utf8",
  );
  const css = await readFile(
    path.join(kitRoot, "accessible-interactions.css"),
    "utf8",
  );
  const viewer = component.slice(
    component.indexOf("export type SlideTranscriptItem"),
    component.indexOf("type AuslanSupportProps"),
  );

  assert.match(viewer, /startSeconds: number \| null/);
  assert.match(viewer, /endSeconds: number \| null/);
  assert.match(viewer, /visual: ReactNode/);
  assert.match(viewer, /textEquivalent: ReactNode/);
  assert.match(viewer, />\s*Choose slide\s*</);
  assert.match(viewer, /Previous slide/);
  assert.match(viewer, /Next slide/);
  assert.match(viewer, /No exact spoken match is available for this slide/);
  assert.match(viewer, /aria-live="polite"/);
  assert.match(viewer, /aria-hidden="true" inert/);
  assert.match(viewer, /element\.addEventListener\("timeupdate"/);
  assert.match(viewer, /element\.addEventListener\("seeked"/);
  assert.doesNotMatch(viewer, /\.focus\s*\(|localStorage|sessionStorage|fetch\s*\(/);
  assert.match(
    css,
    /\.ali-slide-pair[\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\) minmax\(18rem, 1fr\)/,
  );
  assert.match(css, /\.ali-slide-cues[\s\S]*?overflow-y:\s*auto/);
  assert.match(
    css,
    /@media \(max-width: 56rem\)[\s\S]*?\.ali-slide-pair[\s\S]*?grid-template-columns:\s*minmax\(0, 1fr\)/,
  );
  assert.match(
    css,
    /@media \(forced-colors: active\)[\s\S]*?\.ali-slide-current/,
  );
});

test("the relationship explorer keeps complete meaning available for every data size", async () => {
  const component = await readFile(
    path.join(kitRoot, "accessible-interactions.tsx"),
    "utf8",
  );
  const css = await readFile(
    path.join(kitRoot, "accessible-interactions.css"),
    "utf8",
  );
  const explorer = component.slice(
    component.indexOf("export type LessonRelationship"),
    component.indexOf("type PhysicalActivityProps"),
  );

  for (const field of [
    "from",
    "relation",
    "to",
    "explanation",
    "conclusion",
  ]) {
    assert.match(explorer, new RegExp(`${field}: ReactNode`));
  }
  assert.match(explorer, /sourceAnchor: string/);
  assert.match(explorer, /if \(!relationships\.length\)/);
  assert.match(explorer, /No relationships are available\./);
  assert.match(
    explorer,
    /Math\.min\(selectedIndex, relationships\.length - 1\)/,
  );
  assert.match(
    explorer,
    /\{vi \? "Mối quan hệ" : "Relationship"\} \{index \+ 1\} \{vi \? "trên" : "of"\} \{relationships\.length\}/,
  );
  assert.match(explorer, /role="status"/);
  assert.match(explorer, /aria-live="polite"/);
  assert.match(explorer, /aria-atomic="true"/);
  assert.match(explorer, /Previous relationship/);
  assert.match(explorer, /Next relationship/);
  assert.match(explorer, /disabled=\{index === 0\}/);
  assert.match(explorer, /disabled=\{index === relationships\.length - 1\}/);
  assert.match(explorer, /<ol className="ali-relationship-list"/);
  assert.match(explorer, /href=\{`#\$\{relationship\.sourceAnchor\}`\}/);
  assert.doesNotMatch(explorer, /onDrag|draggable|\.focus\s*\(/);
  assert.match(
    css,
    /\.ali-relationship-controls[\s\S]*?display:\s*flex/,
  );
});

test("choice responses have a visible native reset without persistence or focus movement", async () => {
  const component = await readFile(
    path.join(kitRoot, "accessible-interactions.tsx"),
    "utf8",
  );
  const choice = component.slice(
    component.indexOf("export function ChoiceActivity"),
    component.indexOf("type TypedResponseActivityProps"),
  );

  assert.match(choice, /checked=\{selected === option\.id\}/);
  assert.match(
    choice,
    /<button\s+type="button"\s+onClick=\{\(\) => \{\s*setSelected\(null\);\s*setFeedback\(null\);\s*\}\}\s*>\s*Reset response\s*<\/button>/,
  );
  assert.match(
    choice,
    />\s*Check response\s*<\/button>\s*<button[\s\S]*?>\s*Reset response\s*<\/button>\s*<div className="ali-feedback"/,
  );
  assert.doesNotMatch(
    choice,
    /localStorage|sessionStorage|fetch\s*\(|type="reset"|autoFocus|\.focus\s*\(/,
  );
});

test("native code traces get a labelled keyboard-scrollable contract", async () => {
  const css = await readFile(
    path.join(kitRoot, "accessible-learning.css"),
    "utf8",
  );
  const instructions = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");

  assert.match(css, /\.als-reading pre[\s\S]*?overflow-x:\s*auto/);
  assert.match(instructions, /labelled native `pre`\/`code`/);
  assert.match(instructions, /`StepByStep`[\s\S]*?`DataTableRegion`/);
  assert.match(instructions, /without a syntax-highlighting dependency/);
});


test("every lesson follows the source-grounded visual quality and imagery decision contract", async () => {
  const instructions = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const baseline = await readFile(
    path.join(skillRoot, "references", "accessibility-baseline.md"),
    "utf8",
  );
  const workflow = await readFile(
    path.join(skillRoot, "references", "workflow.md"),
    "utf8",
  );
  const quality = await readFile(
    path.join(skillRoot, "references", "visual-quality-standard.md"),
    "utf8",
  );
  const audioGuidance = await readFile(
    path.join(skillRoot, "references", "audio-accessibility.md"),
    "utf8",
  );
  const kitCss = await readFile(
    path.join(kitRoot, "accessible-learning.css"),
    "utf8",
  );
  const interactionCss = await readFile(
    path.join(kitRoot, "accessible-interactions.css"),
    "utf8",
  );

  assert.match(instructions, /visual-quality-standard\.md/);
  assert.match(instructions, /first viewport a clear lesson identity, objective, and next action/);
  assert.match(instructions, /preserve a rights-cleared asset, rebuild it\s+semantically, generate one purpose-specific asset, or use no visual/i);
  assert.match(instructions, /same resolved semantic tokens and motif rules for every lesson-\s+specific interaction and generated visualization/);
  assert.match(instructions, /read their resolved values from\s+the interaction root instead of hard-coding a second visual language/);
  assert.match(instructions, /Theme fidelity is compositional, not palette-only/);
  assert.match(instructions, /dominant composition pattern[\s\S]*first viewport and recurring section\s+framing/);
  assert.match(instructions, /visual-style extraction checkpoint before writing lesson CSS/);
  assert.match(instructions, /materialStyle\.representativeViews/);
  assert.match(instructions, /materialStyle\.surfaceMapping/);
  assert.match(instructions, /Kinematics trial as a process and quality benchmark, not as a design\s+template/);
  assert.match(instructions, /Read only the source and reference sections relevant to this lesson/);
  assert.match(instructions, /document\.documentElement\.scrollWidth <= document\.documentElement\.clientWidth/);
  assert.match(instructions, /Do not set\s+bare MathML to `min-width: max-content`/);
  assert.match(instructions, /Do not create a separate root\s+`index\.html` and stylesheet or a fake build/);
  assert.match(instructions, /extra route, missing required kit file,\s+or shell\/component location or import as implementation failures/);
  assert.match(instructions, /only for matching kinematics or audio\/transcript work/);
  assert.match(instructions, /Source pagination is provenance, not the default student interface/);
  assert.match(instructions, /do\s+not plan one\s+rendered card, tile, thumbnail, or mini-slide per source page/);
  assert.match(instructions, /Organize the student-facing lesson by concept, relationship, example, and\s+learner task/);
  assert.match(instructions, /shared source-page dimensions are not sufficient reason/);
  assert.match(baseline, /Visual composition and finish/);
  assert.match(quality, /comparable craft across\s+lessons, not a single house style/i);
  assert.match(quality, /Matching colors or isolated motifs[\s\S]*generic card layout is not sufficient/);
  assert.match(quality, /compare the source and Site side by side[\s\S]*recognize\s+the supplied material's visual language/);
  assert.match(quality, /Text extraction\s+and palette sampling alone cannot establish visual direction/);
  assert.match(quality, /verify every `materialStyle\.surfaceMapping` entry/);
  assert.match(quality, /source pages and slides as provenance units, not automatic UI\s+components/);
  assert.match(quality, /concept-led learning sequence without requiring the\s+learner to interpret source pagination/);
  assert.match(quality, /There is no minimum or maximum image count/);
  assert.match(quality, /preserve a rights-cleared source asset/);
  assert.match(quality, /rebuild the relationship with native HTML, MathML/);
  assert.match(quality, /create one purpose-specific asset with built-in image generation/);
  assert.match(quality, /use no visual because it adds no unique learning relationship/);
  assert.match(quality, /A static illustration[\s\S]*does not replace an interactive model/);
  assert.match(quality, /Use a ball for a projectile/);
  assert.match(quality, /A circular object must still read as circular/);
  assert.match(instructions, /A core simulator is required content/);
  assert.match(instructions, /Do not use\s+`RepresentationGroup`, `Representation`, or `StepByStep`/);
  assert.match(audioGuidance, /instead of creating a separate transcript chapter/);
  assert.match(audioGuidance, /pair each visual\s+with its source-mapped transcript range/);
  assert.match(instructions, /abstract marker and a familiar object/);
  assert.match(quality, /starter copy, placeholder assets/);
  assert.match(workflow, /Run the smallest automatic checks that protect the generated result/);
  assert.match(workflow, /After a successful build[^.]*create the Site/);
  assert.match(kitCss, /\.als-reading ul[\s\S]*?list-style:\s*disc/);
  assert.match(kitCss, /\.als-reading ol[\s\S]*?list-style:\s*decimal/);
  assert.match(interactionCss, /\.ali-transcript ol[\s\S]*?list-style:\s*none/);
  assert.doesNotMatch(
    interactionCss,
    /\.ali-relationship-list\s*\{[^}]*list-style:\s*none/,
  );
});

test("the source ledger template keeps deterministic lesson provenance", async () => {
  const template = JSON.parse(
    await readFile(
      path.join(skillRoot, "references", "source-ledger-template.json"),
      "utf8",
    ),
  );
  const serialized = JSON.stringify(template);

  assert.equal(template.schemaVersion, 7);
  assert.ok(template.lesson.academicInvariants);
  assert.ok(template.lesson.materialStyle);
  assert.ok("composition" in template.lesson.materialStyle);
  assert.ok(Array.isArray(template.lesson.materialStyle.representativeViews));
  assert.deepEqual(
    Object.keys(template.lesson.materialStyle.surfaceMapping),
    ["firstViewport", "settings", "navigation", "sectionFrames", "contentBlocks", "interactions"],
  );
  assert.ok("instructionalVisuals" in template.lesson.materialStyle);
  assert.ok("mediaEvidence" in template.sources[0]);
  assert.ok("assetRole" in template.sources[0]);
  assert.ok("lessonPurpose" in template.sources[0]);
  assert.ok("generationPrompt" in template.sources[0]);
  assert.ok("assetFallback" in template.sources[0]);
  assert.ok("essentialLimitation" in template.adaptations[0]);
  assert.ok(!("teacherDecision" in template.sources[0]));
  assert.ok(!("teacherDecision" in template.adaptations[0]));
  assert.ok(!("academicEquivalence" in template.adaptations[0]));
  assert.doesNotMatch(serialized, /validation-record|review queue|owner_only/);
});

test("the plugin exposes create-first and bounded scheduled-intake workflows", async () => {
  const skillNames = (await readdir(path.resolve(skillRoot, ".."), {
    withFileTypes: true,
  }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
  const instructions = await readFile(path.join(skillRoot, "SKILL.md"), "utf8");
  const workflow = await readFile(
    path.join(skillRoot, "references", "workflow.md"),
    "utf8",
  );
  const referenceNames = await readdir(path.join(skillRoot, "references"));
  const scriptNames = await readdir(path.join(skillRoot, "scripts"));
  const scheduledInstructions = await readFile(
    path.join(
      path.resolve(skillRoot, ".."),
      "schedule-accessible-lesson-intake",
      "SKILL.md",
    ),
    "utf8",
  );

  assert.deepEqual(skillNames, [
    "create-accessible-learning-site",
    "schedule-accessible-lesson-intake",
  ]);
  assert.match(instructions, /teacher decides whether to share the Site/);
  assert.match(workflow, /After a successful build[^.]*create the Site/);
  assert.match(workflow, /deploy a new version of the same Site/);
  assert.match(workflow, /Keep lesson assets under `public\/` with literal local references/);
  assert.match(instructions, /Do not add[^.]*persisted student responses/i);
  assert.match(instructions, /fast (?:build|local)[\s\S]{0,80}checks/i);
  assert.match(instructions, /## Product boundaries/);
  assert.match(instructions, /one best-effort smoke pass/);
  assert.match(instructions, /Do not retry, investigate deeply, block completion/);
  assert.match(scheduledInstructions, /daily or weekly/);
  assert.match(scheduledInstructions, /at most one per run/);
  assert.match(scheduledInstructions, /\$create-accessible-learning-site/);
  assert.match(scheduledInstructions, /owner-only draft Site/);
  assert.match(
    scheduledInstructions,
    /scheduled task's memory only after Site creation/,
  );
  assert.match(
    scheduledInstructions,
    /Do not[\s>]+write tracking files into the teacher's source folder/,
  );
  assert.match(
    scheduledInstructions,
    /browser smoke check is unavailable or fails[\s\S]*?warn once and finish the run successfully/,
  );
  assert.doesNotMatch(`${instructions}\n${workflow}`, /owner-only|User-test|Final-review/i);
  for (const removed of [
    "staged-workflow.md",
    "validation-record-template.json",
  ]) {
    assert.ok(!referenceNames.includes(removed));
  }
  for (const removed of [
    "check-validation-record.mjs",
    "review-queue.mjs",
  ]) {
    assert.ok(!scriptNames.includes(removed));
  }
  assert.doesNotMatch(instructions, /skip[^\n;]*image generation/);
  assert.doesNotMatch(
    instructions,
    /GPT-5\.6 Sol|selected-model|model indicator|skip design pickers|secondary agents|imagegen|social-preview|untrusted data|version 0\.1\.0/,
  );
  assert.doesNotMatch(instructions, /publish-accessible-learning-site|update_site_access/);
});
