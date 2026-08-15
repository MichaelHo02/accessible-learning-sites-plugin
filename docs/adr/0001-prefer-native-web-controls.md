# ADR 0001: Prefer native web controls

- Status: Accepted
- Date: 2026-07-20

## Context

Accessible Learning Sites generates small, single-lesson Sites that must remain
straightforward to inspect and test across keyboard, browser, and assistive-
technology workflows. The bundled lesson kit already covers the current
interaction needs with semantic HTML, React, and CSS.

Adding a UI library would introduce another integration and upgrade surface.
Its own accessibility tests would not replace checks of our labels, content,
styles, focus treatment, rendered markup, or lesson-specific behavior.

## Decision

Prefer native HTML controls, platform behavior, CSS, and the existing lesson
kit. Do not add Base UI or another UI component library by default.

Add a UI library component only when all of the following are true:

1. The lesson requires a complex interaction that native HTML and the existing
   kit cannot implement reliably.
2. Reusing the library component is simpler than implementing and maintaining
   the required keyboard, focus, and state behavior ourselves.
3. The generated Site's build, rendered structure, keyboard operation, focus,
   styling, and relevant assistive-technology behavior can be tested.

Use only the required component; adopting one component does not make the
library the default for the rest of the Site.

## Consequences

- Generated Sites keep fewer dependencies and a smaller testing surface.
- Native semantics remain visible in source and rendered output.
- Lesson styling can still adapt to its audience and material through CSS
  without changing the interaction foundation.
- Complex widgets may require a deliberate exception and additional integration
  tests.
- This decision does not prohibit Base UI; it requires evidence that a specific
  component reduces more complexity than it adds.
