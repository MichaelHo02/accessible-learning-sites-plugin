# Reference lesson: Kinematics fundamentals

Checked-in implementation:
`../../tests/trials/kinematics-fundamentals/`. The fixture is a source snapshot
of the real lesson published at
<https://kinematics-fundamentals.thach-holeminh.chatgpt.site/>. It replaces the
synthetic probability, Bayes, and Newton's-law lesson fixtures.

The source is a first-year Engineering Science Week 2 lecture. The teacher
confirmed authorship and reuse rights. The fixture includes the original
recording, complete AI-assisted transcript, native MathML, semantic tables,
source-grounded interactive visualisations, and the bundled presentation
settings. The complete Vietnamese pathway was translated with AI assistance
and reviewed by the bilingual teacher for this demonstration. It remains a
working demonstration, not independently linguistically certified,
accessibility-verified, or student-ready.

Generated illustration and simulator-asset provenance, prompts, hashes,
purposes, and text equivalents are recorded in
`kinematics-fundamentals-generated-assets.json` beside this reference.

## Academic invariants

- Objective: apply kinematic equations to solve and explain
  constant-acceleration, free-fall, projectile, and relative-motion problems.
- Required terminology: displacement, average and instantaneous velocity,
  acceleration, free fall, projectile motion, reference frame, and Galilean
  velocity transformation.
- Required reasoning: choose a sign convention, identify known and unknown
  quantities, select a compatible equation, resolve two-dimensional components,
  transform between reference frames, and interpret units, sign, and physical
  meaning.
- Difficulty: introductory first-year engineering mechanics using algebra,
  derivatives, vectors, and constant-acceleration models.
- Expected response: select and apply an equation, show substitutions with
  units, calculate a result, and explain its physical meaning.

## Fixture coverage

- `LecturePointHeading` pairs 19 lesson concepts with the complete timestamped
  transcript and the optional 1:29:33 native audio recording.
- `AccessibleMathRegion` presents the source equations in MathML.
- `DataTableRegion` exposes acceleration cases, equation selection, graph
  relationships, and interactive values semantically.
- `RelationshipExplorer` connects position, velocity, and acceleration with a
  complete ordered-list alternative.
- The constant-acceleration, secant/tangent, projectile, and relative-frame
  studios expose the same calculations through labelled native controls, live
  text, canvas graphics, and data tables.
- The required studios remain available when optional extras are hidden.
  Constant acceleration offers Point or Car, projectile motion offers Point or
  Ball, and relative velocity offers Point or Car without changing any
  calculation, label, result, or data table.
- Three generated instructional illustrations supplement the constant-
  acceleration, free-fall, and projectile explanations without replacing the
  interactive studios or their semantic equivalents. The generated car and
  tennis-ball sprites remain visual markers with point fallbacks.
- Key points, plain explanations, and the persistent problem-solving checklist
  provide whole-class comprehension support. Full-lesson and section-by-section
  reading are reversible presentation choices; only the original lecture audio
  is marked as an optional extra.
- The source-derived navy, yellow, and red visual language is expressed through
  semantic CSS tokens and visible non-colour cues. Its observed slide grammar
  is carried across the opening header, accessibility-settings heading,
  navigation frame, section title bands, content supports, and interactive
  studios. This is a fidelity-process example, not a house style for unrelated
  source material.
- English and Vietnamese cover the same seven sections, shared settings,
  navigation, explanations, terminology, interaction controls, tables,
  feedback, and all 220 transcript cues. Switching language updates document
  language while preserving source cue IDs, timestamps, calculations, and
  section anchors.

## Evidence boundary

The live URL and checked-in fixture establish a real, inspectable lesson and a
deterministic regression surface. They do not establish transcript accuracy,
factual or academic equivalence, complete source coverage, real assistive-
technology behaviour, WCAG conformance, or student readiness. Preserve the
transcript's uncertainty notes and do not claim unperformed checks.
