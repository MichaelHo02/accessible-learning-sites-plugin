# Accessibility baseline

Use this as the minimum build and review contract for every generated lesson Site. Target [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/) and apply the additional cognitive practices below. This is not certification or a promise that every user, device, browser, or assistive-technology combination is covered.

The bundled settings and status messages are English by default. A requested
alternative language is optional, but once offered it must cover the complete
student pathway, including the shared controls. Keep page and part language
metadata accurate and never claim linguistic review that did not occur.

## Always-on compatibility

### Structure and assistive technology

- Set the page title and page language; mark language changes when present.
- Use one `h1`, ordered headings, and native `header`, `nav`, `main`, `aside`, and `footer` landmarks where applicable.
- Keep DOM, reading, visual, and focus order aligned. Provide a skip link and visible section navigation.
- Prefer native HTML controls. Expose correct name, role, value, state, instructions, errors, and status changes.
- Give meaningful images useful alternatives and hide decoration from assistive technology.
- Replace avoidable images of text with real, visible, customizable HTML text. When an image of text is essential or user-customizable, provide an equivalent that preserves its learning meaning.
- Never require sight, hearing, color perception, speech, a pointer, or a gesture to understand instructions or complete an action.

### Keyboard, voice, switch, and pointer input

- Make every action operable by keyboard with no trap or unexpected focus movement.
- Keep focus visible and unobscured. Use the kit's two-color focus indicator so it remains distinguishable on light and dark surfaces.
- Make visible control text part of the accessible name so speech-input users can say the displayed label.
- Provide a simple activation alternative to dragging, multipoint gestures, hover-only, or motion actuation.
- Make pointer targets at least 24 by 24 CSS pixels or satisfy the WCAG spacing exception; prefer the kit's larger control size.
- Do not add custom keyboard shortcuts that conflict with browser or assistive-technology commands.

### Text, color, layout, and motion

- Carry the supplied lesson's observable palette, typographic character,
  hierarchy, density, and visual motifs into the Site when they remain
  accessible. Treat this as material fidelity, not automatic institutional
  branding; never invent a style system from an institution name.
- Maintain at least 4.5:1 contrast for normal text, 3:1 for large text, and 3:1 for meaningful non-text UI boundaries and states.
- Never convey meaning through color alone. Give meaningful categories and
  states visible labels plus a shape, border, line style, icon, or pattern.
  Keep links visibly identifiable without relying only on hue.
- Use upright normal or bold text. Do not use italics or underline non-link
  text; keep link underlines so links remain identifiable without colour alone.
- Support 200% text resizing without loss of content or function.
- Reflow at 320 CSS pixels without two-dimensional scrolling, except content such as a data table that genuinely requires two dimensions.
- Ensure the rendered document has one unambiguous `width=device-width`
  viewport and preserves browser zoom to at least 200%. Framework-generated
  safe metadata is acceptable. Do not emit `user-scalable=no`, a restrictive
  maximum scale, or conflicting duplicate viewport metadata.
- Tolerate user overrides of 1.5 line height, 2 times paragraph spacing, 0.12 em letter spacing, and 0.16 em word spacing without clipping or overlap.
- Never disable browser zoom. Avoid fixed heights for text containers.
- Respect `prefers-reduced-motion`; provide pause or stop controls for moving content; prohibit hazardous flashing and autoplay.
- Respect forced colors and device color-scheme preferences.

### Visual composition and finish

- Follow [visual-quality-standard.md](visual-quality-standard.md). Comparable
  quality means deliberate, source-grounded craft rather than cloning one
  reference Site or forcing one visual style across subjects.
- Make the first viewport identify the lesson, state its objective, and expose
  a clear next action. Keep settings and navigation visually integrated with
  the lesson instead of leaving them as unrelated default controls.
- Use a consistent spacing scale, readable line length, section rhythm, and
  responsive grouping. Avoid both an undifferentiated wall of cards and dense
  slide-like layouts that sacrifice reflow or comprehension.
- Style tables, code, math, figures, media, activities, feedback, and status
  messages as one coherent system without replacing their native semantics.
- Remove starter remnants, placeholders, broken or empty regions, clipped or
  stretched assets, accidental page overflow, and unfinished default styling.
- For each meaningful source visual or relationship, preserve, semantically
  rebuild, purposefully generate, or explicitly decline the visual with a
  source-grounded reason. Never force imagery where it adds no learning value.

### Clear learning content

- State the learning objective, instructions, expected response, and completion state plainly.
- Use concise sentences, short predictable sections, literal wording, and enough whitespace.
- Explain required vocabulary, symbols, abbreviations, and implied steps without removing necessary academic terminology.
- Avoid unnecessary timers, interruptions, memory-dependent steps, and irreversible errors.
- Provide useful hints and recoverable feedback. Keep all adaptations aligned with the same academic expectation.
- Use multiple representations when they improve access, following [W3C cognitive guidance](https://www.w3.org/WAI/cognitive/) and [CAST UDL Guidelines](https://udlguidelines.cast.org/), without replacing the teacher's source meaning.

## Standard student settings

Use the bundled settings component unchanged unless the lesson genuinely requires a tested modification. Provide every control on every Site:

| Group | Control | Values |
| --- | --- | --- |
| Reading | Text size | 100%, 125%, 150%, 200% |
| Reading | Text spacing | Standard, extra |
| Reading | Reading width | Standard, narrow |
| Colour support | Colour differences | Standard, stronger differences, distinguish red and green, distinguish blue and yellow, minimal colour |
| Attention | Reading flow | Full lesson, section by section |
| Attention | Optional extras | Show optional extras, hide optional extras |
| Reset | Device defaults | Clear only this Site's presentation preferences |

When a complete reviewed alternative language exists, add one Language
control before Reading. Do not show an inactive language selector on a
single-language lesson.

Requirements:

- Use need-based labels, never disability or diagnosis labels.
- Apply changes immediately and announce the changed setting without moving focus.
- Preserve objective, instructions, answers, feedback, navigation, and controls in every mode. Section-by-section flow may show one required section at a time only when every section remains reachable through labelled navigation. Optional-extras mode may hide only content explicitly marked decorative or optional.
- Keep the baseline usable if JavaScript or browser storage fails. Store only allowlisted presentation values on this Site's origin.
- Follow the device's `prefers-reduced-motion` setting automatically. Do not duplicate it as a student setting.
- Keep core explanations, media alternatives, activities, feedback, and interactive models out of `data-focus-optional="true"`. A supporting illustration does not make the related simulator optional.
- In Standard, use the accessible light and dark semantic tokens derived from
  the source material. Populate the kit's `--als-source-*` and
  `--als-source-dark-*` inputs after copying it; the bundled fallback palette is
  not a substitute when the material has observable visual styling. Stronger
  differences increases luminance separation and boundary weight; minimal
  colour uses neutral tones while retaining visible labels and patterns.
- Apply colour-support modes only to semantic kit UI tokens and kit-created
  visualizations. Never filter or recolour original teacher images, video, or
  documents. Reset returns colour support to Standard.
- Do not add a VoiceOver, screen-reader, keyboard, voice-control, or switch-control toggle. Those are device capabilities that the Site supports automatically.
- Follow the device light or dark color scheme automatically and preserve
  forced-colors behavior. Colour support is a scoped differentiation
  preference, not a lesson-specific theme selector.
- Do not add custom read-aloud to the shared kit. It is optional lesson media, not assistive-technology compatibility.

## Alternative-language pathway

- Keep the source language available and use neutral language names rather
  than a disability or learner profile.
- Translate the whole student experience: shell, navigation, settings,
  instructions, explanations, vocabulary, equation and symbol descriptions,
  interaction labels, table headings, feedback, transcript cues, uncertainty
  notes, and status messages.
- Preserve the same objective, terminology, reasoning, difficulty, success
  criteria, expected response, calculations, stable anchors, cue IDs, and
  timestamps. Preserve ambiguity explicitly instead of inventing certainty.
- Update the document language and mark language changes. Do not infer a
  student's language or translate through a runtime network request.
- Mark AI-assisted wording as awaiting review until a bilingual teacher or
  qualified reviewer approves that exact draft. A translated transcript does
  not turn original-language audio into translated or synchronized audio.

## Equivalent learning pathways

Analyze the barrier in each lesson step, never a presumed student profile. An equivalent pathway must preserve the same objective, required reasoning, terminology, difficulty, success criteria, expected response, and feedback.

Cover the full learning loop where applicable: perceive the content, navigate it, understand the relationship, respond, and receive recoverable feedback. When a step depends on one sense or action that is not itself the objective, provide another route. Offer all routes to everyone with neutral labels; never use disability modes or “learning style” labels.

Choose interaction for a source-grounded learning action, not decoration. Preserve the teacher's prompt or action and, when applicable, let the student predict or attempt, reveal a relationship or trace, explain it, reset and retry, and then apply a nearby transfer case. Keep the initial state, change, resulting state, and conclusion available in an alternative semantic form. Record generated scenarios, distractors, traces, worked feedback, and nearby cases in `generatedContent`; mark uncertainty when one may cross an answer-key boundary or change an academic invariant. The ledger records design intent, not proof of academic equivalence.

Use the bundled native-first interaction components:

- `RepresentationGroup` with independent `Representation` details for text, described visual, structured data, worked example, or teacher-approved audio/transcript routes;
- `StepByStep` and `VocabularyList` for visible instructions, terms, examples, and hints without removing required reasoning;
- `AudioTranscript` for short optional media beside a complete timestamped
  transcript, `LecturePointHeading` when a long lecture transcript belongs
  beside its matching lesson concepts, and `SlideTranscriptViewer` when
  reviewed source slides need to remain visibly paired with their transcript
  ranges and complete text equivalents;
- `DescribedFigure` for a redundant visual paired with a visible learning description and optional data equivalent;
- `DataTableRegion` and `AccessibleMathRegion` for labelled keyboard-scrollable data and equations;
- `RelationshipExplorer` when a spatial, causal, object, or system relationship carries the lesson meaning. Supply every item's `from`, `relation`, `to`, `explanation`, `conclusion`, and `sourceAnchor`; the source anchor must be a literal lesson `id`. Keep its complete ordered-list alternative beside the Previous/Next view;
- `PhysicalActivity` only with an equally prominent digital option using the same success criteria;
- `ChoiceActivity` for native radio choices, announced explanatory feedback, and a visible response reset. Put explanation that must survive a retry outside its clearable feedback region;
- `TypedResponseActivity` for an unsubmitted response, hint, and self-check guidance.

For code and state traces, use a labelled native `pre`/`code` block for exact code, `StepByStep` for ordered execution, and `DataTableRegion` for the complete state, change, and conclusion. Give an overflowing `pre` `tabIndex={0}` and a visible label through `aria-labelledby`. Do not add syntax-highlighting dependencies.

Keep each representation in the DOM so opening or closing another route does not reset its controls. Never move focus automatically when a representation changes. Responses may exist ephemerally in native inputs but must never be transmitted, scored, or persisted. Do not generate narration, haptics, profiles, or disability detection in this version.

## Content-specific alternatives

Apply only the relevant sections. Record missing required alternatives as failed observable checks.

### Math, charts, diagrams, and data

- Use native MathML for equations and explain variables, operators, grouping, units, and important reasoning in nearby text.
- Put any equation that may overflow inside the kit's `AccessibleMathRegion`, label it from a visible heading or description, and verify keyboard scrolling at 320 CSS pixels.
- Do not use image-only formulas or rely on `aria-label` on generic text elements as a substitute for semantic math.
- Give data tables a caption and associated row and column headers.
- Pair charts and diagrams with the learning meaning, important values or
  pattern, and an equivalent text or data representation. Directly label
  categories and distinguish them with line styles or patterns before color.
- Use a rights-cleared source asset or built-in image generation when a visual
  materially improves understanding. Do not use an image quota, CSS or generic
  `div` box art, SVG drawn by the agent, placeholder graphics, or promotional
  sharing artwork as a substitute for an instructional visual. Do not add
  decoration merely to make a lesson appear richer.
- Keep static illustrations and interactive models as complementary pathways
  only when each contributes distinct learning value. Do not retain a static
  generated diagram that duplicates an equivalent contextual illustration and
  simulator.
  If a model offers an abstract marker and a familiar object, both must use the
  same calculation, controls, labels, feedback, and semantic text or data.
  Verify generated assets at their rendered size for correct aspect ratio,
  recognizable silhouette, clipping, and stretching; keep a non-image fallback.

### Audio and video

- Provide accurate synchronized captions for prerecorded speech and meaningful non-speech audio.
- Put an accurate transcript on the same page or directly beside the media.
- For an audio-grounded lesson, use the complete contract in
  [audio-accessibility.md](audio-accessibility.md): stable timestamp cues,
  speaker labels, uncertainty notes, optional chapters, and a semantic
  audio/slide crosswalk. When source slides are shown, use rights-cleared local
  visuals, complete visible text equivalents, reviewed timing boundaries, and
  honest no-match states. Playback must be optional; a summary is not a
  transcript.
- For prerecorded synchronized video, provide audio description unless the main audio already conveys all essential visual information. A visible descriptive transcript remains useful but does not replace required audio description.
- Use keyboard-operable native playback controls and never autoplay.
- Mark uncertain generated captions, transcripts, or descriptions as unverified.
- Treat Auslan as a distinct language. Keep any AI-generated sign-language
  draft visibly unverified. The plugin does not validate its language accuracy;
  omit it when the unverified draft would be misleading.

### Activities and feedback

- Never require dragging, speaking, drawing, or precise pointer movement without an equivalent simple input.
- Give form fields visible labels and specific instructions. Identify errors in text and explain recovery.
- Announce feedback and completion status without stealing focus.
- Store no answers, scores, attempts, names, or learning records.

## Fast checks before Site creation

Run lint, the production build, `scripts/check-project-boundaries.mjs`, and
`scripts/check-rendered-site.mjs` when a preview is reachable. Fix failures that
prevent the lesson from building. Surface actionable warnings about student
data, authentication, analytics, networking, persistence, answer boundaries,
source rights, or missing alternatives without creating another approval
stage.

These checks can inspect project structure, rendered HTML, names, anchors,
media controls, and visible transcript references. They do not establish
factual accuracy, academic equivalence, source coverage, accessibility
conformance, transcript or sign-language accuracy, or real screen-reader,
voice-input, or switch-input behavior. Never claim that unperformed work
passed.

After the successful build and fast checks, create the Site and let the teacher
iterate on the deployed result. The plugin never changes class or public access;
the teacher controls sharing through Sites.
