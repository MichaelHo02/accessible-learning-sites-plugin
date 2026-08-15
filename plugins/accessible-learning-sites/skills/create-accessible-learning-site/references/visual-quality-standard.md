# Visual quality standard

Use this contract for every lesson Site. The goal is comparable craft across
lessons, not a single house style copied onto every subject. Source fidelity,
instructional clarity, accessibility, and responsive behavior control the
design.

## Source-grounded visual direction

- Visually inspect the complete source, including sparse, handwritten, image-
  heavy, and otherwise exceptional pages. Text extraction alone is not enough
  evidence for visual direction.
- Record the source's palette, typography character, hierarchy, density,
  composition, motifs, and imagery in `materialStyle`. Separate what is
  observed from what the Site will adapt.
- Render PDFs or slides and inspect the full sequence. Record representative
  opening, recurring-content, divider, and exceptional views by literal locator,
  then map their observed composition to the Site's first viewport, settings,
  navigation, section frames, content blocks, and interactions. Text extraction
  and palette sampling alone cannot establish visual direction.
- Translate that evidence into a coherent web composition. Preserve
  recognizable relationships without reproducing slide pixels or inventing
  institution-wide branding.
- Treat theme fidelity as compositional, not palette-only. Carry the dominant
  source pattern into the first viewport and recurring section framing, such as
  title bands, framed content fields, geometric corners, section markers,
  hierarchy, and characteristic density. Matching colors or isolated motifs
  while retaining a generic card layout is not sufficient.
- Treat `Standard` as the finished source-derived design, not the unstyled kit
  fallback. Stronger-difference, minimal-colour, dark-scheme, and forced-colour
  behavior remain complete alternatives to that design.

## Composition and finish

Every Site must look intentionally composed at first load and throughout the
lesson:

- give the title, context, objective, settings, navigation, lesson sections,
  activities, and footer distinct but related visual roles;
- establish a readable measure, consistent spacing scale, predictable section
  rhythm, and clear heading hierarchy;
- group related source pages into meaningful lesson sections without changing
  their order or silently removing content; avoid a long wall of visually
  identical cards when source relationships support stronger grouping;
- treat source pages and slides as provenance units, not automatic UI
  components. Repeated containers must represent meaningful concepts, examples,
  tasks, or comparable items rather than page boundaries;
- keep source traceability quiet and useful. Prefer section-level ranges and
  ledger mappings; show an individual page label only when it helps the learner
  locate referenced material or the page identity carries meaning;
- style native tables, code, math, figures, media, forms, feedback, and status
  messages as parts of one visual system while preserving their semantics;
- use responsive layouts only where reading and focus order remain logical;
- keep the standardized settings and section navigation inline in the normal
  reading flow; do not turn them into a desktop sidebar or a two-column shell;
- remove starter copy, placeholder assets, generic dashboard chrome, broken or
  empty regions, clipped content, accidental horizontal page scrolling, and
  unfinished default styling before Site creation.

Polish never licenses smaller text, weaker contrast, hidden instructions,
decorative motion, or a denser cognitive load than the lesson needs.

## Instructional visual decision

For every source image, diagram, chart, spatial relation, state change, or
process that carries meaning, record one of these decisions in
`materialStyle.instructionalVisuals` and map the result in `sources` or
`adaptations`:

1. preserve a rights-cleared source asset with a complete visible semantic
   equivalent;
2. rebuild the relationship with native HTML, MathML, a semantic table, or a
   kit interaction, with the complete nonvisual relationship beside it;
3. create one purpose-specific asset with built-in image generation when an
   original visual materially improves understanding, then record its prompt,
   rights evidence, purpose, and equivalent; or
4. use no visual because it adds no unique learning relationship, rights are
   unresolved, or an accurate accessible representation cannot be produced.
   Record the exact reason and preserve the meaning another way.

There is no minimum or maximum image count. A high-quality lesson may use no
images, one excellent instructional figure, several rights-cleared source
figures, or native interactive visualizations. Decoration, generic subject
art, promotional graphics, CSS box art, agent-drawn SVG, and placeholder
images do not satisfy this decision.

## Purposeful visual interaction

When the source teaches a variable relationship, transformation, spatial
model, process, or state trace, prefer an interaction that exposes that exact
relationship over a decorative click target. Keep these elements together:

- the initial state and adjustable or selectable input;
- the relation or change;
- the resulting state;
- a visible explanation and conclusion;
- the literal source anchor; and
- a complete ordered-list, table, text, or MathML alternative.

When a diagram is the primary explanation of that changing relationship, the
diagram itself must be the live view or sit directly with its controls and
changing result. Do not separate a static explanatory diagram from the matching
interaction elsewhere in the section.

Do not force a bespoke visualization when the lesson's purposeful interaction
is better expressed by a native choice, typed response, transcript control, or
step-by-step trace.

## Illustrations and simulator objects

Keep the role of each visual explicit. A static illustration may orient the
learner, preview a relationship, or provide a second way to perceive it; it
does not replace an interactive model whose purpose is to expose how variables
change a result. Keep a required simulator available when optional extras are
hidden and pair it with the complete text, table, or MathML equivalent.

When a simulator's abstraction is itself a barrier, it may offer both a simple
marker and one familiar, concept-appropriate object. The choice changes only
appearance: calculations, coordinates, arrows, labels, controls, conclusions,
feedback, and semantic data remain identical. Keep the marker as the fallback
if the image cannot load. Use a ball for a projectile, for example, rather than
reusing a car merely because a car asset already exists.

Inspect generated assets at their actual rendered size and in every place they
are reused. Preserve aspect ratio and a recognizable silhouette; prevent
clipping, stretching, embedded text, unrelated branding, or a sprite obscuring
labels and vectors. A circular object must still read as circular after canvas
scaling and masking.

## Rendered quality check

Before creating or updating the Site, inspect the rendered lesson in `Standard`
at a normal desktop viewport and at 320 CSS pixels when a preview is reachable:

- source-derived visual direction is visible rather than fallback styling;
- compare the source and Site side by side: a reasonable reviewer can recognize
  the supplied material's visual language from the first viewport and recurring
  section framing without relying on an institution name, logo, or copied slide;
- verify every `materialStyle.surfaceMapping` entry against the rendered Site;
  a source pattern that is recorded but absent from its mapped surface must be
  fixed or its adaptation record corrected before Site creation or update;
- the first viewport communicates lesson identity, objective, and next action;
- section hierarchy, spacing, density, and reading measure remain coherent;
- the lesson reads as a concept-led learning sequence without requiring the
  learner to interpret source pagination, and adjacent explanations, equations,
  examples, and prompts remain together;
- native controls and content-specific elements share a finished visual system;
- every rendered instructional asset is sharp, relevant, correctly framed,
  and paired with its required visible equivalent;
- supporting illustrations remain supplemental to required interactive models,
  and concrete or symbolic appearance choices preserve identical results;
- generated or source assets contain no broken text, misleading relationships,
  clipping, stretching, placeholders, or unrelated branding; and
- no lesson meaning depends on decoration or colour alone.

This is a quick product-quality check, not proof of factual accuracy, academic
equivalence, source coverage, or accessibility conformance. Fix visible defects
that would ship in the Site; do not create a separate evidence or approval
stage.
