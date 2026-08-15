# Audio-grounded lessons for Deaf and hard-of-hearing students

Use this contract when a teacher supplies prerecorded lecture audio, with or
without slides. The goal is not to make the audio louder. It is to ensure that
no learning meaning, instruction, activity, or feedback remains sound-only.

## Current tool boundary

- Codex and GPT-5.6 Sol can plan the conversion, reason across extracted source
  material, build the Site, and run fast checks. Do not
  claim that the reasoning model itself listened to an audio file unless the
  active environment actually provided an observed audio or transcription
  capability.
- OpenAI's [Audio Transcriptions
  API](https://developers.openai.com/api/docs/guides/speech-to-text) can create
  transcripts and, depending on the selected model and response format,
  diarized segments or timestamps. It is a separate, networked authoring step,
  not a student-facing Site feature. Obtain explicit teacher authorization
  before sending a recording, disclose the service and data flow, and record
  the model, source digest, output, uncertainty, and command result.
- [ChatGPT Record](https://help.openai.com/en/articles/11487532-chatgpt-record)
  can transcribe recordings in supported ChatGPT environments, but it is not a
  portable plugin runtime dependency and its transcript can contain mistakes.
- If no observed transcription route is available or authorized, ask the
  teacher for a transcript. Never infer speech from a filename, slide deck,
  waveform, or topic or claim that the audio has a complete alternative.

## Required lesson result

For an audio-grounded lesson, provide all of the following:

1. The rights-cleared original recording with native controls,
   `preload="metadata"`, and no autoplay. Playback is optional; it is not the
   only complete route through the lesson.
2. A complete transcript on the same page. For short media, keep it beside the
   player. For a long lecture rebuilt as lesson content, divide every cue
   exactly once between button-controlled transcript panels beside the matching
   headings. Use stable cue IDs, timestamps, speaker labels when known,
   meaningful non-speech sounds, and visible review notes for uncertain names
   or terms.
3. An interactive listen-and-follow route. Timestamp buttons may seek and play
   the native audio after a user action, but must not move focus. The entire
   transcript remains readable without playing audio. Treat the heading-panel
   controls and playback synchronization as JavaScript enhancements, and keep
   the rebuilt lesson itself complete when those enhancements are unavailable.
4. Chapters, key moments, and a glossary when they improve navigation. A
   summary, chapter list, or glossary never substitutes for the transcript.
5. A slide/audio crosswalk. When source slides or pages exist, pair each visual
   with its source-mapped transcript range so students can choose a slide or follow
   playback without a focus change. Resolve phrases such as “this diagram”,
   “over here”, or “as you can see” to the exact transcript cue and slide/page.
   Add a complete semantic description, data table, relationship, or other text
   equivalent that preserves the lecturer's point. Keep a visible no-match
   status when an exact spoken alignment is unavailable.
6. The same objective, terminology, reasoning, difficulty, expected response,
   success criteria, and feedback in the transcript-first and audio-supported
   routes. Do not simplify the Deaf student's assessed work.

Copy the audio components from the lesson kit and compose them in
`app/page.tsx`. Use `AudioTranscript` for short media. For a long lecture, add
one compact literal native audio element immediately after the lesson shell
introduction and before the first lesson section, then use `LecturePointHeading` beside
the lesson concepts instead of creating a separate transcript chapter. Its
labelled button exposes `aria-expanded` and `aria-controls` for the adjacent
panel and opens it without moving focus; both that control and timestamp
playback are JavaScript enhancements. Supply the matching `audioId`, `controls`,
`preload="metadata"`, and a short `aria-describedby` help text. Do not make a
university-size transcript the player's accessible description. Record the
media file and its transcript as distinct source-ledger items or clearly
distinguished locators. Keep the teacher-only source ledger outside the
deployable lesson.

Do not use `RepresentationGroup`, `Representation`, `StepByStep`, or generic
`details`/`summary` containers to hide required lesson or transcript content.
Keep equations, explanations, examples, tables, activities, and ordered steps
visible. The concept-adjacent `LecturePointHeading` transcript panel is the
purpose-built disclosure exception for a long lecture.

Use `SlideTranscriptViewer` when the crosswalk benefits from showing the
rights-cleared source slide beside its transcript range. Each
`SlideTranscriptItem` requires a literal local `visual`, a complete visible
`textEquivalent`, observed start/end boundaries or null timing, and an
`alignmentNote` when precision or source meaning needs explanation. The visual
subtree is intentionally redundant, hidden from the accessibility tree, and
inert; never place the only copy of slide meaning or an interactive control
inside it. Keep timed items in source order with non-overlapping boundaries.
Playback synchronization may change the selected slide and live
status, but must not move focus. A selected slide with no aligned cues remains
available with its text equivalent and an honest no-match message.

For the recording's source-ledger entry, replace `mediaEvidence: null` with:

```json
{
  "kind": "audio",
  "language": "en-AU",
  "durationSeconds": 0,
  "sourceSha256": "sha256:replace-with-recording-digest",
  "transcription": {
    "status": "provided-or-generated-or-not_run",
    "method": "record-the-observed-method-and-model-or-why-not-run",
    "consent": {
      "status": "approved-or-not_required-or-not_authorized",
      "evidence": "record-the-teacher-decision-and-data-flow"
    },
    "transcriptLocator": "replace-with-cue-range-or-null-when-not_run",
    "uncertainty": null
  }
}
```

Use the actual positive duration; the zero above is only a template placeholder.

## Australian English and Auslan

The first supported audio workflow is an English university lesson in an
Australian context. Use `lang="en-AU"` for the page when appropriate and keep
Australian spelling and teacher-approved disciplinary terminology.

Auslan is a language, not word-for-word English displayed with hand gestures.
Signed interpretation carries grammar, spatial meaning, facial expression,
body movement, discourse, and cultural context. Follow the
[W3C sign-language guidance](https://www.w3.org/WAI/WCAG21/Understanding/sign-language-prerecorded.html)
and [W3C accessible-media
guidance](https://www.w3.org/WAI/media/av/). Consistent with the
[WFD/WASLI position on signing
avatars](https://wfdeaf.org/wp-content/uploads/WFD-and-WASLI-Statement-on-Avatar-FINAL-14032018-Updated-14042018.pdf),
do not present an automatically generated avatar or sign video as equivalent to
a qualified human interpretation.

- Auslan is optional enhancement; transcript/caption and visual-reference
  repair remain required.
- Generate an Auslan draft only when an actual sign-language generation
  capability is available. Do not draw or fabricate gestures with general
  image or video generation.
- Render every unreviewed draft with `AuslanSupport`. The
  visible label **AI-generated sign-language draft — not a verified
  interpretation** must remain attached to the video.
- The plugin does not validate Auslan language quality and never emits a
  `human_reviewed` label.
- If generation is unavailable, omit the student-facing Auslan video; do not
  use a placeholder.

## Fast audio checks

Fast checks can verify player controls, no autoplay, transcript references,
anchors, and project boundaries. They cannot prove transcript accuracy, timing,
semantic slide repair, academic equivalence, or Auslan language quality. Keep
uncertainty visible in the lesson and source ledger.

If recording publication rights or hosting consent is uncertain, omit that
audio asset from the deployable project. A text/transcript-only Site may proceed
with the unresolved rights warning; private access is not permission to copy or
host the recording.
