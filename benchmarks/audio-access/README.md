# Audio-access materials benchmark

This benchmark inventories every audio recording currently under `materials/`
and selects Engineering Science Week 3, Newton's laws of motion, as the bounded
Australian university lesson pilot.

It proves the new plugin behaviour without inventing human evidence:

- all recordings are fingerprinted and duration-probed locally;
- every untranscribed recording remains `not_run`, with publication rights and
  teacher review pending;
- the reusable kit includes native audio controls, a timestamp-seekable visible
  transcript, cue highlighting without focus movement, and explicit Auslan
  review status;
- rendered checks reject autoplay, missing native controls, and an audio player
  without a transcript reference;
- source-ledger validation can bind media duration, digest, language,
  transcription method, network consent, transcript locator, and uncertainty.

## Selected one-lesson pilot

- Context: first-year university Engineering Science, Australia.
- Source: `materials/Engineering Science/W3 - Lecture - Newton laws of motion/`.
- Recording: `Recordings/Recording 1.m4a`.
- Candidate objective: construct and interpret a free-body diagram and apply
  Newton's laws without changing the source course level or expected reasoning.
- Current status: **benchmark evidence only—not an accessibility-verified or
  student-ready Site**.

The recording has not been sent to an external service. No API key or explicit
teacher authorization was available in this run, so a transcript was not
generated. A slide deck is not treated as a substitute for what the lecturer
said. The one-lesson Site cannot honestly be regenerated as accessible until a
teacher supplies a transcript or authorizes an observed transcription method.

Auslan generation and review are also `not_run`. General image/video generation
must not fabricate signs. If a real Auslan draft is later produced, the Site
must label it **AI-generated sign-language draft — not a verified
interpretation** until a fluent Deaf Auslan signer or suitably qualified
interpreter records revision-bound review.

## Reproduce the inventory

From the repository root, with `ffprobe` available:

```sh
node plugins/accessible-learning-sites/skills/create-accessible-learning-site/scripts/inventory-audio-materials.mjs \
  materials benchmarks/audio-access/materials-audio-inventory.json
```

The inventory is a local source audit, not transcript, browser,
assistive-technology, teacher, or Auslan evidence.

## Teacher-review evidence still required

Before wider sharing, the teacher must compare the complete transcript against
the recording; confirm speakers, Australian English technical terms,
uncertainty, chapters, and every timestamp-to-slide repair; approve rights and
any network transcription consent; and compare all academic invariants across
the audio-supported and transcript-first pathways. Those checks stay pending
until actually observed.
