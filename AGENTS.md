# Repository agent guide

This repository contains the Accessible Learning Sites Codex plugin. Keep changes
small, evidence-based, and consistent with the public Build Week submission.

## Read before changing code

1. Read `DEVPOST_SUBMISSION.md`; it is the public product contract.
2. Read `CONTEXT.md`; it expands that contract into implementation decisions,
   boundaries, evidence status, and open questions.
3. Read `README.md` and
   `plugins/accessible-learning-sites/skills/create-accessible-learning-site/SKILL.md`.
4. For accessibility behavior, also read the skill's
   `references/accessibility-baseline.md` and the relevant tests and fixtures.

If these sources conflict, preserve the Devpost contract and update `CONTEXT.md`
and the plugin together. Ask one focused clarification before planning a code
change when the intended behavior is genuinely ambiguous.

## Product boundaries

- Build one accessibility-first Site for one lesson.
- Preserve the teacher-approved objective, academic level, meaning, difficulty,
  success criteria, and answer expectations across every pathway.
- Never diagnose students or add disability profiles, accounts, authentication,
  analytics, grading, progress tracking, networking, or cross-day persistence
  unless the user explicitly changes the product contract.
- Run fast build, project-boundary, and rendered-document checks before Site
  creation. Surface only actionable warnings and never report an unobserved
  check as passed.
- Create the Site after a successful build, iterate on that same Site, and leave
  class or public sharing decisions to the teacher.
- Target WCAG 2.2 AA without claiming certification or universal coverage.
- Use GPT-5.6 Sol at Ultra reasoning effort for project development and
  demonstrations when model and reasoning controls are available. Do not make
  that a runtime requirement for plugin users.

## Implementation rules

- For this competition hackathon, work, commit, and push directly on `main`.
- Sync with `origin/main` before starting work and immediately before every
  push. During longer tasks, check upstream regularly because multiple
  contributors may be working concurrently. Integrate their changes; never
  overwrite them.
- Keep commits focused and preserve unrelated changes in dirty worktrees.
- Reuse the bundled lesson-site kit, templates, scripts, and native web
  semantics before adding code or dependencies.
- Prefer the smallest root-cause change. Do not add speculative abstractions,
  compatibility paths, or dependencies.
- Keep the five files in `assets/lesson-site-kit/` reusable and framework-light.
  Update their fixtures and deterministic checks when behavior changes.
- Keep validation ledgers and QA evidence outside deployable lesson projects.
- Do not hand-edit `.agents/plugins/marketplace.json`. Use the plugin-creator
  update flow when preparing a local reinstall; do not bump the cachebuster for
  unrelated documentation changes.
- Use subagents only when independent research or verification will materially
  speed up a non-trivial task. Verify their output before using it.

## Validation

Run the smallest relevant check while iterating. Before committing a plugin
behavior change, run the full local suite from the repository root:

```sh
python3 ~/.codex/skills/.system/plugin-creator/scripts/validate_plugin.py plugins/accessible-learning-sites
python3 ~/.codex/skills/.system/skill-creator/scripts/quick_validate.py plugins/accessible-learning-sites/skills/create-accessible-learning-site
node --test plugins/accessible-learning-sites/skills/create-accessible-learning-site/tests/plugin-assets.test.mjs
```

If a check cannot run, report that fact and its reason. Browser,
assistive-technology, academic-equivalence, and teacher review require observed
evidence; source inspection alone is not a pass.

## Completion

Review `git diff` and `git status`, then commit only the requested files with a
focused message. Do not commit code that still requires the user to test and
confirm.
