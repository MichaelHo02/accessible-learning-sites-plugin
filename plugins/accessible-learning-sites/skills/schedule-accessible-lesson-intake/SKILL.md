---
name: schedule-accessible-lesson-intake
description: Set up an optional daily or weekly Codex scheduled task that watches a teacher-chosen workspace folder for new or changed lesson materials and creates owner-only Accessible Learning Site drafts. Use when a teacher asks to monitor a lesson folder, automate lesson intake, or create lesson Sites without manually invoking the plugin each time.
---

# Schedule Accessible Lesson Intake

Create the schedule only when scheduled tasks are available. Ask only for a
readable source folder and the missing cadence details: daily or weekly, local
run time, and timezone. Explain that each run may automatically create or
update an owner-only Site draft, but never widen its access.

Use the active environment's scheduled-task tool. Do not imitate scheduling
with repository files, shell loops, or a long-running process. Create a
standalone recurring task for the workspace that contains the source folder.

Use this run prompt, replacing the placeholders:

> Watch `<source-folder>` for new or changed readable lesson material. Treat a
> top-level lesson file or one immediate child folder as one lesson packet.
> Ignore hidden files, temporary downloads, generated Site projects, and
> unchanged packets already recorded in this scheduled task's memory. Process
> the oldest unprocessed packet, at most one per run, with
> `$create-accessible-learning-site`. Preserve that skill's source, academic,
> accessibility, rights, privacy, and teacher-review boundaries. Create an
> owner-only draft Site, or update the same Site when this task's memory already
> maps the changed packet to one. Never share it with a class or the public.
> Record the packet path, content digest, and Site identifier or URL in the
> scheduled task's memory only after Site creation or update succeeds. Do not
> write tracking files into the teacher's source folder. If no packet is ready,
> report that briefly. If source reading, build, or Sites remains blocked,
> report one short actionable warning and do not mark the packet complete. If
> the best-effort browser smoke check is unavailable or fails after successful
> Site creation, warn once and finish the run successfully; do not retry or
> investigate the browser failure.

After creation, confirm the saved folder, cadence, timezone, and owner-only,
one-lesson-per-run boundary. Do not claim that the schedule itself validates
lesson accuracy, academic equivalence, or accessibility.
