# Create and iterate workflow

Create the Site in the first run, then let the teacher improve the real result.

## Optional continuing goal

Use a continuing Codex goal only when the teacher explicitly requests one. The
goal carries one supplied lesson through source analysis, build, verification,
Site creation or update, and the first complete teacher handoff. Do not add a
token budget unless the teacher specifies it, and do not treat a plan,
specialist response, or local build as completion. Complete the goal when the
working Site URL and actionable warnings are handed back, or after the verified
local handoff when the teacher explicitly requested local-only work. Later
teacher changes update the same Site outside that completed goal unless a named
revision or acceptance condition was part of the requested goal.

## Delegate complex work automatically

The main agent routes complex work through the plugin's packaged specialists
without asking the teacher to opt in:

1. send complex or multimodal sources to the read-only `source-analyst`;
2. send substantive lesson implementation to the `lesson-builder`, with no
   competing writer; and
3. send the built revision to the read-only `quality-verifier` when specialist
   changes or complex rendered behavior need observed checks.

Use the source ledger as the handoff contract. The main agent resolves conflicts,
accepts or rejects returned work, owns all final claims, and creates or updates
the Site. Keep short text-only lessons in the main agent when none of the
specialist triggers apply. If subagents are unavailable, continue in the main
agent instead of blocking creation. A specialist response is never accessibility
certification, academic verification, or a substitute for teacher or human
review.

## Build the lesson

- Extract and inventory the complete readable source in order before building.
  Preserve its student-facing text, equations, derivations, examples,
  annotations, visual relationships, prompts, and conclusions; record any
  unavoidable omission instead of silently condensing it.
- Build a native web lesson from that information. Do not use an embedded PDF,
  whole-document viewer, page screenshots, or a slide-image sequence as the
  primary lesson.
- Copy the five files from `assets/lesson-site-kit/` into `app/components/` and
  compose `app/page.tsx` with direct, unaliased imports.
- Keep lesson assets under `public/` with literal local references. Record
  provenance, rights, purpose, and the intended text or data alternative in the
  external source ledger.
- Keep the settings panel visible, use section-by-section flow only as a
  reversible presentation choice, and mark only confirmed nonessential content
  as an optional extra. Static illustrations may support but never replace a
  required source-grounded interaction.
- Remove unused starter authentication, profiles, databases, analytics,
  networking, examples, and persistence code. Refresh the existing lockfile;
  do not add a dependency when the kit or platform already covers the need.

## Run fast checks

Run the smallest automatic checks that protect the generated result:

- lint;
- production build;
- `scripts/check-project-boundaries.mjs`; and
- `scripts/check-rendered-site.mjs` when a rendered preview is reachable.

Fix failures that prevent the Site from building. Surface actionable warnings
about source rights, answer boundaries, student data, prohibited runtime
features, or missing alternatives.

## Create and hand off the Site

After a successful build, follow `sites-hosting` and create the Site unless the
teacher explicitly requested local-only work. If Sites is unavailable or
authorization is missing, preserve the completed local build, state the single
blocker, and resume Site creation when it is resolved.

Return the deployed URL, provisional inferred title, level, or objective, and
only questions or warnings that need teacher action. Do not describe the Site
as accessibility certified, fact-checked, academically verified, or
student-ready.

## Iterate and share

When the teacher requests a change, update the existing lesson project, rerun
the affected fast checks, and deploy a new version of the same Site. The teacher
decides whether to share it with the class or publicly in the Sites UI. The
plugin never changes sharing access.
