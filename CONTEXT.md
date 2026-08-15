# Accessible Learning Sites — Context

## Document purpose

`DEVPOST_SUBMISSION.md` is the source of truth for the public product contract.
This document expands that contract into implementation decisions, boundaries,
evidence status, and unresolved questions. When they conflict, update this
document and the plugin to match the Devpost contract.

## Competition context

- Product name: Accessible Learning Sites.
- Public tagline: Turn one teacher's lesson into an accessibility-first Site for
  the whole class.
- Target: OpenAI Build Week, Education category.
- Product form: Codex plugin.
- Required product outcome: a working project built with Codex and GPT-5.6 Sol.
- Publishing surface: Sites.

## Project conventions

- Git workflow: work, commit, and push directly on `main`; no feature branches are required for this hackathon project.
- Development and demo policy: use GPT-5.6 Sol at Ultra reasoning effort when
  those controls are available for reasoning and text work while building and
  demonstrating this hackathon project.
- This project convention is not a runtime requirement imposed on teachers using the plugin.
- Submission, demo, and README should clearly show where GPT-5.6 Sol was used.

## Submission delivery constraints

- The submission freezes after Tuesday, July 21, 2026 at 5:00 PM PT
  (Wednesday, July 22 at 10:00 AM AEST). The description, video, README, demo,
  and working plugin must agree before then.
- Judges need a free working link or test path without rebuilding the plugin.
  Test it without an existing sign-in session. Keep access working through at
  least the August 12 winner announcement.
- Because the repository is private, share it with `testing@devpost.com` and
  `build-week-event@openai.com` before the deadline.
- The README must include installation, supported platforms, running and testing
  guidance, and concrete Codex/GPT-5.6 contributions. The Devpost entry must
  include the primary `/feedback` Session ID.
- The demonstration video must be shorter than three minutes, explain Codex and
  GPT-5.6 use, and be viewable without signing in.
- Publish only original or properly licensed code, data, lesson media, music,
  and other assets. Submission material must be in English or include an English
  translation.
- The tracked `materials/COSC3054-COSC3055-Week8-Recap.pdf` is not
  submission-ready until its publication permission is documented or the file
  is excluded from the submitted repository and demo.
- Report only checks and outcomes actually observed; do not imply unperformed
  accessibility or academic review.

## Origin and evidence framing

The project originated from the creator's experience while studying for a
Bachelor of Software Engineering at RMIT Vietnam from 2020 to 2024. The creator
often saw ELS supporters—including a friend—listen to lectures, take notes, and
share them with students who needed support. That support was valuable, but it
also showed that receiving information through another person's notes is not
the same as directly following, questioning, and interacting with a live
lesson.

An RMIT accessibility competition later introduced the creator to Braille and
to how differently people can experience learning. Together, these experiences
prompted the product question: can more access be built into lesson materials
before class begins?

The public story must not infer any student's disability, imply that note-taking
is the only ELS service, claim that most RMIT or university material was
inaccessible, or suggest RMIT endorsement. RMIT's published accessibility work
documents accessible templates, redrawn graphs and tables, alternative text,
and student-aid support. The product should be presented as extending that kind
of upstream work, not as criticism of RMIT or a replacement for its Equitable
Learning and Accessibility service.

Evidence used in the public problem story:

- WHO estimates that 1.3 billion people, or 16% of the global population,
  experience significant disability:
  <https://www.who.int/news-room/fact-sheets/detail/disability-and-health>.
- Viet Nam's 2023 National Survey on People with Disabilities covered 73,125
  households across all 63 provinces. It found a 6.11% disability rate among
  people aged two and over, at least one student with a disability in 79.6% of
  surveyed primary and lower secondary schools, and an upper-secondary net
  enrolment rate of 30.8% for children with disabilities, 45.8 percentage
  points below children without disabilities:
  <https://www.nso.gov.vn/tin-tuc-thong-ke/2024/11/thong-cao-bao-chi-ve-ket-qua-dieu-tra-nguoi-khuyet-tat-nam-2023/>.
- RMIT's account of its accessibility initiative and student-aid support:
  <https://www.rmit.edu.vn/news/all-news/2020/jan/equitable-learning-for-all-students>.
- RMIT Vietnam's current Equitable Learning and Accessibility service:
  <https://www.rmit.edu.vn/student-life/support-services/wellbeing>.

These figures establish scale and context, not the product's reachable market
or measured impact. The school statistics do not describe RMIT or universities,
and the enrolment gap has many causes beyond learning materials. Product impact
must be supported separately through observed product evidence such as
teacher preparation time, barriers identified, equivalent pathways produced,
review corrections, and fast-check results.

The current demonstration shows pathway coverage and structural safeguards. It
does not yet establish improved learning outcomes or measured teacher time
saved.

## Problem statement

Accessibility is often treated as a retrofit. Teachers commonly begin with one
lesson format, while essential meaning may depend on speech, slides, visual
diagrams, dense instructions, or one precise way of responding. Producing and
checking equivalent alternatives repeatedly requires time and accessibility
expertise.

Generative AI reduces the cost of producing content, but generated content is
not automatically accessible or academically equivalent. The product problem
is how to help a teacher begin with a stronger shared accessibility baseline
without diagnosing students, lowering expectations, or replacing specialist
support.

The Codex plugin helps a teacher turn one existing lesson into one
accessibility-first student Site. It runs fast automatic checks, creates the
Site, and lets the teacher iterate on the real result before deciding whether
to share it with the class.

## Core product principle

**Teacher configures learning; student controls presentation.**

- Teacher owns source content, learning objective, academic level, approved adaptations, and publication.
- Plugin may provisionally infer a missing level or objective from strong source
  evidence; the teacher confirms or corrects it while reviewing the Site.
- Plugin applies a strong universal-accessibility baseline without requiring disability labels or diagnoses.
- Every Site provides the same standardized accessibility controls.
- Student may adjust the controls within the current Site, with preferences stored only on that device.
- Accessibility changes presentation and interaction, not academic expectations.

“Universal accessibility” means a testable compatibility baseline, not a guarantee that every individual accommodation, browser, device, or assistive-technology combination is covered. Generated Sites target WCAG 2.2 AA and add cognitive-accessibility and Universal Design for Learning support without claiming certification.

## Users

### Primary user: teacher

The teacher uses Codex during lesson preparation. The teacher:

1. Provides material for one lesson.
2. Provides an academic level and learning objective when they want to set
   them explicitly, or reviews the plugin's source-backed provisional inference.
3. Reviews the created Site and requests changes directly against that result.
4. Manages class access in the Sites UI when satisfied.

### Beneficiary and secondary user: student

The student opens the published Site. The student:

1. Receives the same lesson and learning objective as the class.
2. Uses assistive technology already configured on their device when needed.
3. Uses the Site’s standardized presentation and focus controls.
4. Keeps those preferences only within the current Site and device.

### Supporting stakeholders

Accessibility specialists and support staff remain essential for individual
needs beyond a whole-class baseline. The plugin reduces repeated preparation;
it does not automate accommodations or replace specialist judgment.

## Current workflow

```text
Teacher gathers existing lesson materials
→ provides materials directly or places them in an optionally watched folder
→ teacher invokes the plugin, or a daily or weekly scheduled task invokes it
  for one new or changed lesson packet
→ plugin infers only strongly supported missing brief fields
→ main agent automatically delegates complex source analysis when relevant
→ one lesson writer rebuilds substantive lessons without competing edits
→ a read-only verifier checks the built revision when complexity warrants it
→ main agent integrates the work and runs fast local checks
→ plugin creates the Site through Sites
→ teacher reviews the real Site and requests changes
→ plugin updates the same Site until the teacher is satisfied
→ teacher decides whether to share it in the Sites UI
→ students use one lesson Site and adjust controls as needed
```

Fast checks catch build, project-boundary, and rendered-document problems
without adding an approval stage. Sites handles creation and deployment.
Wider class or public access is a teacher action in the Sites UI, outside the
plugin workflow. The Site must never be described as certified, fully
accessible, fact-checked, academically verified, or student-ready. Student-data,
authentication, analytics, networking, answer-key, and publication-rights
findings remain visible when the teacher needs to act on them.

The packaged `source-analyst`, `lesson-builder`, and `quality-verifier` profiles
divide non-trivial work automatically. Short text-only lessons remain with the
main agent. The source analyst and verifier are read-only, only one agent writes
lesson code at a time, and the main agent retains teacher communication, final
integration, evidence claims, Site creation, and handoff. Subagent work is not
accessibility certification, academic verification, or human review.

## Input model

The current input contract accepts pasted material and readable workspace files.
If Codex cannot read a source, the teacher must provide an accessible export,
transcript, or pasted text. Documents, PDFs, slides, images, media, quizzes, and
webpages are supported only when the active Codex environment can read them;
protected LMS content and format-specific guarantees remain outside the current
claim.

Local `.pdf`, `.docx`, `.pptx`, `.xlsx`, and `.csv` lesson sources route through
the active environment's PDF, document, presentation, and spreadsheet
capabilities. This is workspace-file intake, not a cloud connector or a promise
of offline processing. The plugin does not add an external conversion service;
unreadable content still requires an accessible export or pasted material.

The teacher may omit the title, level, or objective when readable source content
or reliable metadata strongly supports one choice. The plugin infers each field
independently, proceeds to creation, and presents the value and evidence as
provisional with the Site handoff. It asks only for a field with insufficient,
conflicting, or materially ambiguous evidence. An inferred objective frames the
lesson but never authorizes source condensation.

For a prerecorded English university lecture in Australia, audio is a
first-class source only when the workflow has an observed transcript. The
teacher may supply it or explicitly authorize an available transcription
service; sending a recording over a network is never implicit. The authoring
record keeps the source digest, transcription method/model, consent, output,
and uncertainty. If transcription is unavailable or unauthorized, the plugin
asks for a transcript and reports the missing audio alternative instead of
inferring speech from slides or filenames.

## Output model

- One Site per lesson.
- One Site shared by the whole class.
- The Site inventories and preserves the complete readable student-facing
  source in order. It uses native HTML, MathML, tables, descriptions, and
  interactions rather than making an embedded PDF, whole-page screenshots, or
  slide images the lesson itself. Rights-cleared source visuals remain optional
  supplements with complete visible semantic equivalents.
- The Site translates the supplied lesson's observable visual language into an
  accessible web treatment. It does not infer institution-wide branding from a
  name or reproduce inaccessible source styling unchanged.
- No course-wide or cross-day platform.
- Teacher may regenerate and redeploy after changing source content or adaptations.
- Student settings apply only to the current Site.
- A teacher may explicitly request a continuing Codex goal that ends when the
  Site is created and handed back for iteration; ordinary invocations do not
  create goals.
- Fast checks run in the background and surface only actionable warnings.
- When browser support is available after Site creation, one best-effort smoke
  pass checks that the URL opens and renders. Failure warns once and never
  blocks handoff or counts as accessibility evidence.

## Universal accessibility baseline

Accessibility is standardized in four layers: always-on compatibility, standard
student controls, equivalent learning pathways, and content-specific
alternatives.

The bundled settings and announcements are English by default. A teacher may
request a complete alternative-language pathway. Once offered, it includes the
shared controls and full lesson, preserves the source-language pathway and
academic invariants, keeps page and part language metadata accurate, and stays
visibly awaiting review until a bilingual teacher or qualified reviewer checks
the current draft.

## Barrier-to-learning matrix

Analyze barriers in the lesson content and required action, never as fixed traits or disability profiles. Do not infer a student diagnosis or claim a preferred “learning style.”

| Barrier in the lesson | Common dependency | Equivalent pathways to consider | Minimum review method |
| --- | --- | --- | --- |
| Vision | Color, position, animation, image-only diagrams, or visual notation | Semantic text and headings, MathML, described figures, structured data tables, color-independent labels, optional approved audio, zoom and contrast support | Screen-reader reading order, text/data equivalence, 200% resize, 320 CSS-pixel reflow, forced colors |
| Hearing | Speech, music, sound effects, audio/slide references, or audio-only feedback | Complete timestamped transcript, speaker and uncertainty cues, synchronized captions, chapters, semantic slide-reference repair, visible status and feedback, text explanation of meaningful sound | Compare transcript with the recording; check terms, speakers, timestamps and crosswalk; no sound-only instruction or completion state |
| Motor | Dragging, drawing, precise pointing, multipoint gestures, short time limits | Native buttons, choices, typed response, single-pointer alternatives, keyboard, touch, voice-input and switch-compatible controls | Complete keyboard path, switch/voice-input trial, target size, no required drag or precision |
| Speech | Spoken answer or microphone input | Typed response, choice, selection, or a teacher-facilitated equivalent that uses the same success criteria | Complete the task without speech or microphone access |
| Cognitive load | Dense instructions, hidden steps, unexplained vocabulary, or memory-dependent work | Step-by-step explanation, vocabulary support, worked example, hints, persistent visible instructions | Teacher checks that scaffolding clarifies without reducing difficulty or supplying the assessed answer |
| Attention | Competing motion, long unbroken tasks, interruptions, or unclear progress | Predictable sections, section-by-section flow, optional-extras control, pausable media, short steps, clear current task and completion state | Verify every required section remains reachable, only confirmed optional content can be hidden, and the task can resume without lost meaning |
| Language | Idiom, ambiguous wording, undefined academic terms, unexplained symbols, or a lesson language the student cannot use comfortably | Literal instructions, glossary, examples, symbol explanation, and a complete reviewed alternative-language pathway with correctly marked language changes | Bilingual teacher or qualified reviewer checks the exact terminology and meaning; page and part languages are correct; original ambiguity remains explicit |
| Sensory load | Flashing, sudden sound, continuous motion, crowded presentation, or autoplay | Static equivalent, reduced motion, user-controlled playback, uncluttered representation, no hazardous flashing | Reduced-motion and no-autoplay checks; verify the static path teaches the same concept |

Physical or tactile pathways may use real objects or printable manipulatives—for example, a coin, dice, fraction tiles, or a raised diagram. The Site can provide accessible instructions and an equivalent digital route, but it must not claim to create haptics or specialist tactile material.

## Equivalent-learning-pathway contract

1. Keep one teacher-approved learning objective, academic difficulty, success criteria, and answer expectation across every pathway.
2. Identify where the original lesson depends on one sense, action, format, memory demand, or input method.
3. Add an equivalent route whenever that dependency is not essential to the learning objective. If it is essential, explain the limitation to the teacher instead of pretending it has been removed.
4. Offer pathway choices to the whole class with neutral labels such as “Read,” “View diagram,” “Use data table,” “Work step by step,” or “Use physical objects.” Never label a route by diagnosis or learner type.
5. Each representation must preserve the important facts, relationships, uncertainty, instructions, and expected response. A decorative alternative does not count.
6. Activities must work without requiring sight, hearing, speech, dragging, or precise pointer movement unless that action is itself the approved objective. Native keyboard, touch, voice-input, and switch behavior comes from semantic controls, not custom assistive technology.
7. Opening, closing, or switching representations must not erase an in-progress response, move focus unexpectedly, disclose an answer, or change the task. The bundled response components are ephemeral and do not persist or transmit answers; warn when teacher material adds a different data flow.
8. Add every decision to the teacher-only adaptation ledger: source locator,
   barrier found, original dependency, whether it is essential, added pathway or
   essential limitation, available support, equivalence reason, generated
   content, and uncertainty. The equivalence reason records design intent; it is
   not proof of academic equivalence.

The product implements this contract with a small native-first component set and
a checked-in real-content Kinematics fundamentals lesson fixture. Deterministic
tests currently cover the reusable kit, privacy and project boundaries, source
ledger structure, and rendered-document checks. Real assistive-technology
behavior, factual accuracy, source coverage, and academic equivalence must not
be claimed without direct evidence.

### Always-on compatibility

Every generated Site targets WCAG 2.2 AA without requiring a student to select a disability profile:

- Semantic HTML, page language, landmarks, headings, lists, tables, and logical reading order.
- Useful alternative text, accessible names, state, instructions, errors, and status announcements.
- Complete keyboard operation, visible and unobscured focus, no traps, and no hover- or drag-only action.
- Compatibility with screen readers, refreshable braille, voice input, switch input, browser zoom, and device preferences.
- Minimum contrast, no color-only meaning, visible labels plus shapes, borders,
  line styles, or patterns for meaningful categories and states, 200% text
  resizing, 320 CSS-pixel reflow, and text-spacing overrides without loss.
- Adequate target size, no hazardous flashing, no autoplay, and respect for reduced-motion preferences.
- Clear objectives, predictable sections, concise instructions, explained vocabulary, recoverable errors, and no unnecessary time pressure.

VoiceOver, Narrator, TalkBack, keyboard access, voice control, and switch control are device or operating-system capabilities. The Site cannot enable them; it must expose correct semantics and interaction behavior so they work when the student enables them.

### Standard student controls

Every Site provides the same need-based controls, never diagnosis-labelled modes:

- text size: 100%, 125%, 150%, or 200%;
- text spacing: standard or extra;
- reading width: standard or narrow;
- colour support: standard source-derived styling, stronger differences,
  distinguish red and green, distinguish blue and yellow, or minimal colour;
- language: shown only when a complete alternative-language pathway exists;
- reading flow: full lesson or one reachable section at a time;
- optional extras: show or hide only confirmed decorative and nonessential
  material;
- reset to device defaults.

Motion reduction follows the device's `prefers-reduced-motion` setting
automatically and is not duplicated in the student settings panel.

Standard colour support preserves the accessible semantic tokens derived from
the teacher's source material. Stronger differences increases luminance
separation and boundary weight; minimal colour uses neutral tones with visible
labels and patterns. These preferences affect only kit UI and kit-created
visualizations, never filter or recolour original lesson images, video, or
documents. The Site still follows the device light or dark color scheme and
forced-colors mode without duplicating those platform preferences in a theme
selector. Every mode must preserve the full lesson objective, instructions,
controls, navigation, and academic expectation. Controls are conveniences; the
baseline must remain accessible when custom settings or browser storage are
unavailable.

### Content-specific alternatives

Add these only when the lesson contains the relevant material:

- accurate captions, visible transcripts, and descriptions of essential visual information for media;
- for audio-grounded lessons, native user-controlled playback plus a complete
  transcript with stable cue IDs, timestamps, speaker labels, uncertainty
  notes, useful chapters, and semantic repairs for every meaningful reference
  to a slide, diagram, gesture, or location; when reviewed source slides exist,
  a responsive slide/transcript viewer keeps the rights-cleared source visual,
  complete visible text equivalent, and matching transcript range together;
- optional Auslan may be generated only as a visibly unverified draft. It does
  not replace the transcript, and the plugin does not validate its language
  accuracy or call it a reviewed interpretation;
- native MathML plus understandable surrounding explanations for equations;
- semantic tables and text or data equivalents for charts and diagrams;
- non-drag and non-speech alternatives for interactive exercises.

Use rights-cleared source assets or built-in image generation when a visual
materially improves learning. There is no image quota. CSS or generic `div` box
art, SVG drawn by the agent, placeholders, and promotional sharing artwork do
not count as instructional visuals; meaningful visuals need source provenance
and a visible semantic text or data equivalent.

Static illustrations support rather than replace source-grounded simulators.
When a simulator benefits from a symbolic marker and a familiar object, both
views keep identical calculations, controls, labels, feedback, and semantic
data; the object must fit the phenomenon and remain recognizable at its actual
rendered size. Core simulators and their alternatives remain available when
optional extras are hidden.

All generated lessons follow `references/visual-quality-standard.md`. The
shared quality bar covers source-grounded composition, typography, spacing,
section rhythm, native content treatment, responsive behavior, and an explicit
preserve/rebuild/generate/no-visual decision for each meaningful source visual
or relationship. This aims for comparable craft across subjects without
copying the Kinematics demo's visual language or forcing imagery where it adds
no learning value.

Custom read-aloud is not part of the shared component set. Device screen readers remain supported by default; lesson narration can be considered later only when pronunciation, language, mathematics, playback controls, and synchronized text can be tested.

## Fast checks and Site creation

The runtime workflow runs four small checks before creating or updating the
Site:

- lint;
- production build;
- `project_boundaries`; and
- `rendered_document` when a preview is reachable.

Build failures are fixed before creation. Project-boundary, source-rights,
answer-key, student-data, and missing-alternative findings are shown only when
the teacher can act on them. These are practical guardrails, not accessibility
certification. The plugin never changes class or public access; the teacher
controls sharing through Sites.

## Concrete example

### Working demonstration: Kinematics fundamentals

- Product relationship: the real-content demonstration, not a separate product.
- Demo URL: <https://kinematics-fundamentals.thach-holeminh.chatgpt.site/>.
- Audience: first-year university Engineering Science.
- Topic: one- and two-dimensional kinematics.
- Learning focus: apply and explain constant-acceleration, free-fall,
  projectile-motion, and relative-motion models.
- Source: the complete supplied Week 2 lecture PDF plus the original recording
  and a complete AI-assisted transcript.
- Demonstrated pathways: native explanations and MathML, semantic tables,
  contextual transcript disclosures, key points and plain explanations,
  persistent problem-solving support, generated instructional illustrations,
  and interactive visualisations with equivalent live text and data plus
  Point/Car/Ball appearance choices that do not change the calculations.
- Complete-language pathway: English and teacher-reviewed Vietnamese cover the
  same seven sections, controls, interactions, tables, and all 220 transcript
  cues while preserving source anchors, timestamps, calculations, and academic
  expectations.
- Evidence boundary: this is a working demonstration, not an accessibility
  certification.

## Product scope

### In scope

- Teacher-first Codex plugin workflow.
- Optional scheduled folder intake that processes at most one new or changed
  lesson packet per run into an owner-only draft without changing wider access.
- One lesson per generated Site.
- Flexible source-material concept.
- Standardized WCAG 2.2 AA generation target with cognitive and UDL support.
- Native-first equivalent representation, explanation, figure,
  audio/transcript, slide/transcript, physical/digital activity, choice,
  typed-response, MathML, and table patterns.
- Site creation immediately after a successful build and fast checks.
- Teacher iteration on the created Site, followed by teacher-controlled class
  or public access.
- Student-controlled adjustments within the current Site.
- Sites generation and publishing.
- One real-content Kinematics demonstration.

### Explicitly out of scope

- Cross-day preference persistence.
- Course or class management platform.
- Plugin-created student accounts.
- Student names in URLs.
- Student-specific URLs, tokens, or presets.
- Diagnosis or inference of disability.
- Teacher admin dashboard.
- Plugin-managed live profile database.
- Plugin-managed progress tracking or longitudinal analytics.
- Separate Sites for different disabilities.
- Custom screen-reader, voice-control, or switch-control implementations.
- Generated narration, haptics, disability detection, and learning-style profiles.
- New student-facing MCP servers or external services. An optional
  authoring-time transcription call is permitted only after explicit teacher
  authorization and remains outside the deployable lesson Site.
- Plugin-managed class or public access changes.

## Accessibility and safety boundaries

- Never diagnose a student or infer disability from behavior or schoolwork.
- Avoid requiring students to disclose disability.
- The reusable kit does not add identity collection, authentication, analytics,
  networking, or persisted student responses. Warn when teacher material adds
  any of them; do not claim every teacher-created Site stores no data.
- Preserve source meaning, mathematical correctness, and learning objectives.
- Label uncertain AI-generated captions, descriptions, or adaptations as
  unverified.
- Record asset provenance or generation prompts and publication-rights status in
  the source ledger, and warn when rights are unclear. The teacher decides how
  to resolve the warning before wider sharing.
- Avoid segregating students into visible “special” experiences.
- Generated Site must itself be accessible; accessibility cannot exist only in generated content.

## Technical feasibility notes

- Codex plugin can guide material extraction, Site generation, fast automatic
  checks, creation, and iteration.
- GPT-5.6 Sol is used for project reasoning and orchestration, not claimed as a
  direct audio decoder. When available and explicitly authorized, OpenAI's
  [Audio Transcriptions API](https://developers.openai.com/api/docs/guides/speech-to-text)
  can supply timestamped or diarized transcript evidence. [ChatGPT
  Record](https://help.openai.com/en/articles/11487532-chatgpt-record) is a
  supported-environment convenience, not a portable plugin dependency; its
  transcript still requires review.
- Sites can publish the generated lesson.
- A simple Site may keep current-site UI preferences on the student device.
- Persistent user profiles or live teacher edits would require storage and identity, but both are intentionally outside current scope.
- Publishing depends on Sites being available and authorized in the teacher’s Codex environment.
- Reusable native-first lesson components and deterministic checks should be bundled with the plugin rather than regenerated from prose for every lesson.
- The product uses one skill, three conditional specialist profiles, bundled
  assets, and scripts. After a successful build and fast checks, the main agent
  creates the Site through Sites and updates that same Site as the teacher
  iterates. Sites owns deployment and access-control success, and the teacher
  manages wider access in the Sites UI. A custom MCP server, app, or lifecycle
  hook would duplicate those Sites capabilities.
- Consider an MCP server or app only if the product later adds a real external integration such as an LMS, managed accessibility-testing service, or media-processing service.

## Unresolved product questions

1. Which readable source formats can be claimed as consistently supported?
2. Which Sites access mode will give judges and later students an appropriate
   no-rebuild path without adding identity handling to the generated app?
3. Which outcome or preparation-time measures can demonstrate impact without
   overstating what one reference lesson proves?

## Current working statement

> A Codex plugin that turns one existing lesson into an accessibility-first Site
> for the whole class, creates it after fast automatic checks, and lets the
> teacher iterate before deciding whether to share it.
