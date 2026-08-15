"use client";

import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
import "./accessible-interactions.css";

type LabelledGroupProps = Readonly<{
  labelledBy: string;
  introduction?: ReactNode;
  children: ReactNode;
}>;

export function RepresentationGroup({
  labelledBy,
  introduction,
  children,
}: LabelledGroupProps) {
  return (
    <section className="ali-representations" aria-labelledby={labelledBy}>
      {introduction ? (
        <div className="ali-representations-intro">{introduction}</div>
      ) : null}
      <div className="ali-representation-list">{children}</div>
    </section>
  );
}

type RepresentationProps = Readonly<{
  label: string;
  summary?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}>;

export function Representation({
  label,
  summary,
  defaultOpen = false,
  children,
}: RepresentationProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <details
      className="ali-representation"
      open={isOpen}
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
    >
      <summary>
        <span className="ali-representation-label">{label}</span>
        {summary ? (
          <span className="ali-representation-summary">{summary}</span>
        ) : null}
      </summary>
      <div className="ali-representation-content">{children}</div>
    </details>
  );
}

export type ExplanationStep = Readonly<{
  id: string;
  title: string;
  content: ReactNode;
}>;

type StepByStepProps = Readonly<{
  labelledBy: string;
  steps: readonly ExplanationStep[];
}>;

export function StepByStep({ labelledBy, steps }: StepByStepProps) {
  return (
    <ol className="ali-steps" aria-labelledby={labelledBy}>
      {steps.map((step, index) => (
        <li key={step.id}>
          <ExplanationStepItem step={step} number={index + 1} />
        </li>
      ))}
    </ol>
  );
}

function ExplanationStepItem({
  step,
  number,
}: Readonly<{ step: ExplanationStep; number: number }>) {
  const [isOpen, setIsOpen] = useState(number === 1);

  return (
    <details
      open={isOpen}
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
    >
      <summary>
        <span className="ali-step-number">Step {number}:</span> {step.title}
      </summary>
      <div className="ali-step-content">{step.content}</div>
    </details>
  );
}

export type VocabularyTerm = Readonly<{
  term: string;
  definition: ReactNode;
  example?: ReactNode;
}>;

type VocabularyListProps = Readonly<{
  labelledBy: string;
  terms: readonly VocabularyTerm[];
  language?: "en-AU" | "vi";
}>;

export function VocabularyList({ labelledBy, terms, language = "en-AU" }: VocabularyListProps) {
  return (
    <dl className="ali-vocabulary" aria-labelledby={labelledBy}>
      {terms.map((item) => (
        <div key={item.term}>
          <dt>{item.term}</dt>
          <dd>
            {item.definition}
            {item.example ? (
              <span className="ali-vocabulary-example">
                <strong>{language === "vi" ? "Ví dụ:" : "Example:"}</strong> {item.example}
              </span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export type TranscriptCue = Readonly<{
  id: string;
  startSeconds: number;
  timestamp: string;
  speaker?: string;
  text: ReactNode;
  note?: ReactNode;
}>;

export type TranscriptChapter = Readonly<{
  id: string;
  startSeconds: number;
  timestamp: string;
  title: string;
}>;

type AudioTranscriptProps = Readonly<{
  labelledBy: string;
  audioId: string;
  audioDescriptionId: string;
  transcriptId: string;
  /**
   * Supply a native audio element with the matching id, controls,
   * preload="metadata", and aria-describedby set to audioDescriptionId.
   */
  audio: ReactNode;
  cues: readonly TranscriptCue[];
  chapters?: readonly TranscriptChapter[];
}>;

type AudioPlayerContentProps = Readonly<{
  audioId: string;
  audioDescriptionId: string;
  audio: ReactNode;
  chapters?: readonly TranscriptChapter[];
  helpText: ReactNode;
}>;

export type LecturePoint = Readonly<{
  id: string;
  title: string;
  startSeconds: number;
  endSeconds: number;
  cues: readonly TranscriptCue[];
}>;

type LecturePointHeadingProps = Readonly<{
  level: 2 | 3;
  headingId: string;
  audioId: string;
  points: readonly LecturePoint[];
  language?: "en-AU" | "vi";
  children: ReactNode;
}>;

function seekAudio(audioId: string, startSeconds: number) {
  const audio = document.getElementById(audioId);
  if (!(audio instanceof HTMLAudioElement)) return;
  audio.currentTime = startSeconds;
  void audio.play().catch(() => undefined);
}

function formatMediaTime(totalSeconds: number) {
  const roundedSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(roundedSeconds / 3600);
  const minutes = Math.floor((roundedSeconds % 3600) / 60);
  const seconds = roundedSeconds % 60;
  return hours
    ? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    : `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function AudioPlayerContent({
  audioId,
  audioDescriptionId,
  audio,
  chapters = [],
  helpText,
}: AudioPlayerContentProps) {
  return (
    <>
      <p id={audioDescriptionId} className="ali-audio-help">
        {helpText}
      </p>
      <div className="ali-audio-player">{audio}</div>
      {chapters.length ? (
        <nav className="ali-audio-chapters" aria-label="Lecture sections">
          <ol>
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <button
                  type="button"
                  onClick={() => seekAudio(audioId, chapter.startSeconds)}
                >
                  <span className="ali-timestamp">{chapter.timestamp}</span>{" "}
                  {chapter.title}
                </button>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
    </>
  );
}

function useActiveCueId(
  audioId: string,
  cues: readonly TranscriptCue[],
  startSeconds = 0,
  endSeconds = Number.POSITIVE_INFINITY,
) {
  const [activeCueId, setActiveCueId] = useState<string | null>(null);

  useEffect(() => {
    const element = document.getElementById(audioId);
    if (!(element instanceof HTMLAudioElement)) return;

    const updateActiveCue = () => {
      if (element.currentTime < startSeconds || element.currentTime >= endSeconds) {
        setActiveCueId(null);
        return;
      }

      let activeCue: TranscriptCue | undefined;
      for (let index = cues.length - 1; index >= 0; index -= 1) {
        if (cues[index].startSeconds <= element.currentTime) {
          activeCue = cues[index];
          break;
        }
      }
      setActiveCueId(activeCue?.id ?? null);
    };
    element.addEventListener("timeupdate", updateActiveCue);
    element.addEventListener("seeked", updateActiveCue);
    updateActiveCue();
    return () => {
      element.removeEventListener("timeupdate", updateActiveCue);
      element.removeEventListener("seeked", updateActiveCue);
    };
  }, [audioId, cues, endSeconds, startSeconds]);

  return activeCueId;
}

function TranscriptCueList({
  audioId,
  transcriptId,
  cues,
  activeCueId,
  heading,
  language = "en-AU",
}: Readonly<{
  audioId: string;
  transcriptId: string;
  cues: readonly TranscriptCue[];
  activeCueId: string | null;
  heading?: string;
  language?: "en-AU" | "vi";
}>) {
  const isVietnamese = language === "vi";

  return (
    <div id={transcriptId} className="ali-transcript">
      {heading ? <h3>{heading}</h3> : null}
      <ol>
        {cues.map((cue) => (
          <li
            id={cue.id}
            key={cue.id}
            className={
              activeCueId === cue.id ? "ali-transcript-active" : undefined
            }
          >
            <button
              type="button"
              aria-label={`${isVietnamese ? "Phát từ" : "Play from"} ${cue.timestamp}`}
              aria-current={activeCueId === cue.id ? "true" : undefined}
              onClick={() => seekAudio(audioId, cue.startSeconds)}
            >
              {cue.timestamp}
            </button>
            <div>
              {cue.speaker ? <strong>{cue.speaker}: </strong> : null}
              {cue.text}
              {cue.note ? (
                <p className="ali-transcript-note">
                  <strong>{isVietnamese ? "Ghi chú cần xem lại:" : "Review note:"}</strong>{" "}
                  {cue.note}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function AudioTranscript({
  labelledBy,
  audioId,
  audioDescriptionId,
  transcriptId,
  audio,
  cues,
  chapters = [],
}: AudioTranscriptProps) {
  const activeCueId = useActiveCueId(audioId, cues);

  return (
    <section className="ali-audio-transcript" aria-labelledby={labelledBy}>
      <AudioPlayerContent
        audioId={audioId}
        audioDescriptionId={audioDescriptionId}
        audio={audio}
        chapters={chapters}
        helpText="Use the optional player or read the complete interactive transcript that follows it. Timestamp buttons start playback from the labelled cue."
      />
      <TranscriptCueList
        audioId={audioId}
        transcriptId={transcriptId}
        cues={cues}
        activeCueId={activeCueId}
        heading="Interactive transcript"
      />
    </section>
  );
}

function LecturePointPanel({
  point,
  audioId,
  open,
  language,
}: Readonly<{
  point: LecturePoint;
  audioId: string;
  open: boolean;
  language: "en-AU" | "vi";
}>) {
  const isVietnamese = language === "vi";
  const activeCueId = useActiveCueId(
    audioId,
    point.cues,
    point.startSeconds,
    point.endSeconds,
  );
  const panelId = `${point.id}-transcript-panel`;

  return (
    <div
      id={panelId}
      className="ali-point-transcript-panel"
      role="region"
      aria-label={`${isVietnamese ? "Bản chép lời bài giảng cho" : "Lecture transcript for"} ${point.title}`}
      hidden={!open}
    >
      <div className="ali-point-transcript-intro">
        <p>
          <strong>{isVietnamese ? "Bản chép lời bài giảng:" : "Lecture transcript:"}</strong>{" "}
          {point.title}{" "}
          <span>
            ({formatMediaTime(point.startSeconds)}–{formatMediaTime(point.endSeconds)},{" "}
            {point.cues.length}{" "}
            {isVietnamese
              ? "đoạn"
              : point.cues.length === 1
                ? "passage"
                : "passages"})
          </span>
        </p>
        <button
          className="ali-point-transcript-play"
          type="button"
          onClick={() => seekAudio(audioId, point.startSeconds)}
        >
          {isVietnamese ? "Phát từ" : "Play from"}{" "}
          {formatMediaTime(point.startSeconds)}
        </button>
      </div>
      <TranscriptCueList
        audioId={audioId}
        transcriptId={`${point.id}-transcript`}
        cues={point.cues}
        activeCueId={activeCueId}
        language={language}
      />
    </div>
  );
}

export function LecturePointHeading({
  level,
  headingId,
  audioId,
  points,
  language = "en-AU",
  children,
}: LecturePointHeadingProps) {
  const isVietnamese = language === "vi";
  const [openPointIds, setOpenPointIds] = useState<readonly string[]>([]);
  const Heading = level === 2 ? "h2" : "h3";

  function togglePoint(pointId: string) {
    setOpenPointIds((current) =>
      current.includes(pointId)
        ? current.filter((id) => id !== pointId)
        : [...current, pointId],
    );
  }

  return (
    <div className={`ali-point-heading ali-point-heading-level-${level}`}>
      <div className="ali-point-heading-row">
        <Heading id={headingId}>{children}</Heading>
        <div
          className="ali-point-heading-actions"
          aria-label={`${isVietnamese ? "Nội dung bài giảng cho" : "Lecture material for"} ${String(children)}`}
        >
          {points.map((point) => {
            const open = openPointIds.includes(point.id);
            const panelId = `${point.id}-transcript-panel`;
            return (
              <button
                key={point.id}
                className="ali-point-heading-toggle"
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                aria-label={`${isVietnamese ? (open ? "Ẩn" : "Hiện") : open ? "Hide" : "Show"} ${isVietnamese ? "bản chép lời bài giảng cho" : "lecture transcript for"} ${point.title}, ${isVietnamese ? "bắt đầu tại" : "starting at"} ${formatMediaTime(point.startSeconds)}`}
                onClick={() => togglePoint(point.id)}
              >
                {isVietnamese ? "Bản chép lời" : "Transcript"} ·{" "}
                {formatMediaTime(point.startSeconds)}
              </button>
            );
          })}
        </div>
      </div>
      {points.map((point) => (
        <LecturePointPanel
          key={point.id}
          point={point}
          audioId={audioId}
          open={openPointIds.includes(point.id)}
          language={language}
        />
      ))}
    </div>
  );
}

export type SlideTranscriptItem = Readonly<{
  id: string;
  label: string;
  /** Use null when the slide has no reviewed spoken alignment. */
  startSeconds: number | null;
  /** Use null when the aligned range continues to the end of the recording. */
  endSeconds: number | null;
  /** Redundant, rights-cleared source visual. This subtree is hidden and inert. */
  visual: ReactNode;
  /** Complete visible semantic equivalent of the source visual. */
  textEquivalent: ReactNode;
  alignmentNote?: ReactNode;
}>;

type SlideTranscriptViewerProps = Readonly<{
  labelledBy: string;
  audioId: string;
  slides: readonly SlideTranscriptItem[];
  cues: readonly TranscriptCue[];
  initialSlideId?: string;
}>;

export function SlideTranscriptViewer({
  labelledBy,
  audioId,
  slides,
  cues,
  initialSlideId,
}: SlideTranscriptViewerProps) {
  const selectLabelId = useId();
  const initialIndex = Math.max(
    0,
    initialSlideId
      ? slides.findIndex((slide) => slide.id === initialSlideId)
      : 0,
  );
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const selectedSlide = slides[selectedIndex] ?? slides[0];

  useEffect(() => {
    const element = document.getElementById(audioId);
    if (!(element instanceof HTMLAudioElement)) return;

    const updateSelectedSlide = () => {
      const matchingIndex = slides.findIndex(
        (slide) =>
          slide.startSeconds !== null &&
          slide.startSeconds <= element.currentTime &&
          (slide.endSeconds === null || element.currentTime < slide.endSeconds),
      );
      if (matchingIndex >= 0) setSelectedIndex(matchingIndex);
    };
    element.addEventListener("timeupdate", updateSelectedSlide);
    element.addEventListener("seeked", updateSelectedSlide);
    updateSelectedSlide();
    return () => {
      element.removeEventListener("timeupdate", updateSelectedSlide);
      element.removeEventListener("seeked", updateSelectedSlide);
    };
  }, [audioId, slides]);

  const matchingCues = useMemo(() => {
    if (!selectedSlide || selectedSlide.startSeconds === null) return [];
    return cues.filter((cue, index) => {
      const nextCueStart =
        cues[index + 1]?.startSeconds ?? Number.POSITIVE_INFINITY;
      return (
        nextCueStart > selectedSlide.startSeconds! &&
        (selectedSlide.endSeconds === null ||
          cue.startSeconds < selectedSlide.endSeconds)
      );
    });
  }, [cues, selectedSlide]);

  if (!selectedSlide) {
    return <p role="status">No reviewed slide and transcript pairs are available.</p>;
  }

  const timingLabel =
    selectedSlide.startSeconds === null
      ? "No exact spoken match is available for this slide."
      : selectedSlide.endSeconds === null
        ? `From ${formatMediaTime(selectedSlide.startSeconds)} to the end of the recording.`
        : `${formatMediaTime(selectedSlide.startSeconds)}–${formatMediaTime(selectedSlide.endSeconds)} in the recording.`;

  return (
    <section className="ali-slide-transcript" aria-labelledby={labelledBy}>
      <p className="ali-slide-help">
        Choose a source slide or play the recording. Reviewed timestamp
        boundaries update the displayed slide without moving keyboard focus.
      </p>
      <div className="ali-slide-picker">
        <label id={selectLabelId} htmlFor={`${selectLabelId}-select`}>
          Choose slide
        </label>
        <select
          id={`${selectLabelId}-select`}
          value={selectedSlide.id}
          onChange={(event) => {
            const nextIndex = slides.findIndex(
              (slide) => slide.id === event.currentTarget.value,
            );
            if (nextIndex >= 0) setSelectedIndex(nextIndex);
          }}
        >
          {slides.map((slide) => (
            <option key={slide.id} value={slide.id}>
              {slide.label}
            </option>
          ))}
        </select>
      </div>
      <div className="ali-slide-controls" aria-label="Slide controls">
        <button
          type="button"
          disabled={selectedIndex <= 0}
          onClick={() => setSelectedIndex((index) => Math.max(0, index - 1))}
        >
          Previous slide
        </button>
        <button
          type="button"
          disabled={selectedIndex >= slides.length - 1}
          onClick={() =>
            setSelectedIndex((index) => Math.min(slides.length - 1, index + 1))
          }
        >
          Next slide
        </button>
        {selectedSlide.startSeconds !== null ? (
          <button
            type="button"
            onClick={() => seekAudio(audioId, selectedSlide.startSeconds!)}
          >
            Play from {formatMediaTime(selectedSlide.startSeconds)}
          </button>
        ) : null}
      </div>
      <p className="ali-slide-current" aria-live="polite">
        <strong>{selectedSlide.label}.</strong> {timingLabel}
      </p>
      {selectedSlide.alignmentNote ? (
        <p className="ali-slide-note">
          <strong>Alignment note:</strong> {selectedSlide.alignmentNote}
        </p>
      ) : null}
      <div className="ali-slide-pair">
        <figure className="ali-slide-figure">
          <div className="ali-slide-visual" aria-hidden="true" inert>
            {selectedSlide.visual}
          </div>
          <figcaption>{selectedSlide.label}</figcaption>
          <details className="ali-slide-text" open>
            <summary>Slide text and visual meaning</summary>
            <div>{selectedSlide.textEquivalent}</div>
          </details>
        </figure>
        <section
          className="ali-slide-cues"
          aria-label={`Transcript for ${selectedSlide.label}`}
          tabIndex={0}
        >
          <h3>Transcript for this slide</h3>
          {matchingCues.length ? (
            <ol>
              {matchingCues.map((cue) => (
                <li key={cue.id}>
                  <button
                    type="button"
                    aria-label={`Play from ${cue.timestamp}`}
                    onClick={() => seekAudio(audioId, cue.startSeconds)}
                  >
                    {cue.timestamp}
                  </button>
                  <div>
                    {cue.speaker ? <strong>{cue.speaker}: </strong> : null}
                    {cue.text}
                    {cue.note ? (
                      <p className="ali-transcript-note">
                        <strong>Review note:</strong> {cue.note}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p>No transcript cues are aligned with this slide.</p>
          )}
        </section>
      </div>
    </section>
  );
}

type AuslanSupportProps = Readonly<{
  labelledBy: string;
  reviewNote: ReactNode;
  video: ReactNode;
  children?: ReactNode;
}>;

export function AuslanSupport({
  labelledBy,
  reviewNote,
  video,
  children,
}: AuslanSupportProps) {
  return (
    <section className="ali-auslan" aria-labelledby={labelledBy}>
      <p className="ali-auslan-status">
        <strong>Auslan status:</strong> AI-generated sign-language draft — not a
        verified interpretation
      </p>
      <p>{reviewNote}</p>
      <div className="ali-auslan-video">{video}</div>
      {children}
    </section>
  );
}

type DescribedFigureProps = Readonly<{
  caption: ReactNode;
  /** Redundant visual only. This subtree is hidden and inert by design. */
  visual: ReactNode;
  description: ReactNode;
  dataAlternative?: ReactNode;
}>;

export function DescribedFigure({
  caption,
  visual,
  description,
  dataAlternative,
}: DescribedFigureProps) {
  const captionId = useId();
  const descriptionId = useId();

  return (
    <figure
      className="ali-figure"
      aria-labelledby={captionId}
      aria-describedby={descriptionId}
    >
      <div
        className="ali-figure-visual-scroll"
        role="region"
        aria-labelledby={captionId}
        aria-describedby={descriptionId}
        tabIndex={0}
      >
        <div className="ali-figure-visual" aria-hidden="true" inert>
          {visual}
        </div>
      </div>
      <figcaption id={captionId}>{caption}</figcaption>
      <div id={descriptionId} className="ali-figure-description">
        {description}
      </div>
      {dataAlternative ? (
        <details className="ali-data-alternative">
          <summary>View data alternative</summary>
          <div>{dataAlternative}</div>
        </details>
      ) : null}
    </figure>
  );
}

type DataTableRegionProps = Readonly<{
  labelledBy: string;
  children: ReactNode;
}>;

export function DataTableRegion({
  labelledBy,
  children,
}: DataTableRegionProps) {
  return (
    <div
      className="ali-table-scroll"
      role="region"
      aria-labelledby={labelledBy}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

export type LessonRelationship = Readonly<{
  from: ReactNode;
  relation: ReactNode;
  to: ReactNode;
  explanation: ReactNode;
  conclusion: ReactNode;
  sourceAnchor: string;
}>;

type RelationshipExplorerProps = Readonly<{
  labelledBy: string;
  relationships: readonly LessonRelationship[];
  language?: "en-AU" | "vi";
}>;

export function RelationshipExplorer({
  labelledBy,
  relationships,
  language = "en-AU",
}: RelationshipExplorerProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listTitleId = useId();
  const vi = language === "vi";

  if (!relationships.length) {
    return (
      <section
        className="ali-relationship-explorer"
        aria-labelledby={labelledBy}
      >
        <p role="status" aria-live="polite" aria-atomic="true">
          {vi ? "Không có mối quan hệ nào." : "No relationships are available."}
        </p>
      </section>
    );
  }

  const index = Math.min(selectedIndex, relationships.length - 1);
  const current = relationships[index];

  return (
    <section
      className="ali-relationship-explorer"
      aria-labelledby={labelledBy}
    >
      <div
        className="ali-relationship-current"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="ali-relationship-progress">
          {vi ? "Mối quan hệ" : "Relationship"} {index + 1} {vi ? "trên" : "of"} {relationships.length}
        </p>
        <p className="ali-relationship-statement">
          <strong>{current.from}</strong>
          <span aria-hidden="true"> → </span>
          <span>{current.relation}</span>
          <span aria-hidden="true"> → </span>
          <strong>{current.to}</strong>
        </p>
        <p>
          <strong>{vi ? "Giải thích:" : "Explanation:"}</strong> {current.explanation}
        </p>
        <p>
          <strong>{vi ? "Kết luận:" : "Conclusion:"}</strong> {current.conclusion}
        </p>
        <p>
          <a href={`#${current.sourceAnchor}`}>
            {vi ? "Nguồn của mối quan hệ" : "Source for relationship"} {index + 1}
          </a>
        </p>
      </div>

      <div
        className="ali-relationship-controls"
        aria-label={vi ? "Điều khiển mối quan hệ" : "Relationship controls"}
      >
        <button
          type="button"
          disabled={index === 0}
          onClick={() => setSelectedIndex(Math.max(0, index - 1))}
        >
          {vi ? "Mối quan hệ trước" : "Previous relationship"}
        </button>
        <button
          type="button"
          disabled={index === relationships.length - 1}
          onClick={() =>
            setSelectedIndex(Math.min(relationships.length - 1, index + 1))
          }
        >
          {vi ? "Mối quan hệ tiếp theo" : "Next relationship"}
        </button>
      </div>

      <p id={listTitleId} className="ali-relationship-list-title">
        <strong>{vi ? "Tất cả mối quan hệ" : "All relationships"}</strong>
      </p>
      <ol className="ali-relationship-list" aria-labelledby={listTitleId}>
        {relationships.map((relationship, relationshipIndex) => (
          <li key={relationshipIndex}>
            <strong>{relationship.from}</strong> {relationship.relation}{" "}
            <strong>{relationship.to}</strong>.{" "}
            <strong>{vi ? "Giải thích:" : "Explanation:"}</strong> {relationship.explanation}{" "}
            <strong>{vi ? "Kết luận:" : "Conclusion:"}</strong> {relationship.conclusion}{" "}
            <a href={`#${relationship.sourceAnchor}`}>
              {vi ? "Nguồn của mối quan hệ" : "Source for relationship"} {relationshipIndex + 1}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

type PhysicalActivityProps = Readonly<{
  labelledBy: string;
  materials: readonly string[];
  steps: readonly ReactNode[];
  digitalAlternative: ReactNode;
}>;

export function PhysicalActivity({
  labelledBy,
  materials,
  steps,
  digitalAlternative,
}: PhysicalActivityProps) {
  return (
    <div className="ali-physical" role="group" aria-labelledby={labelledBy}>
      <h3>Materials</h3>
      <ul>
        {materials.map((material) => (
          <li key={material}>{material}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <ol>
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <div className="ali-digital-alternative">
        <h3>Equivalent digital option</h3>
        {digitalAlternative}
      </div>
    </div>
  );
}

export type ChoiceOption = Readonly<{
  id: string;
  label: ReactNode;
  feedback: ReactNode;
}>;

type ChoiceActivityProps = Readonly<{
  prompt: ReactNode;
  instructions?: ReactNode;
  options: readonly ChoiceOption[];
}>;

export function ChoiceActivity({
  prompt,
  instructions,
  options,
}: ChoiceActivityProps) {
  const instanceId = useId();
  const instructionsId = useId();
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<ReactNode>(null);

  const selectedOption = options.find((option) => option.id === selected);

  return (
    <fieldset
      className="ali-choice"
      aria-describedby={instructions ? instructionsId : undefined}
    >
      <legend>{prompt}</legend>
      {instructions ? <p id={instructionsId}>{instructions}</p> : null}
      <div className="ali-choice-options">
        {options.map((option, index) => {
          const optionId = `${instanceId}-option-${index}`;
          return (
            <label key={option.id} htmlFor={optionId}>
              <input
                id={optionId}
                name={`${instanceId}-choice`}
                type="radio"
                value={option.id}
                checked={selected === option.id}
                onChange={() => {
                  setSelected(option.id);
                  setFeedback(null);
                }}
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
      <button
        type="button"
        disabled={!selectedOption}
        onClick={() => setFeedback(selectedOption?.feedback ?? null)}
      >
        Check response
      </button>
      <button
        type="button"
        onClick={() => {
          setSelected(null);
          setFeedback(null);
        }}
      >
        Reset response
      </button>
      <div className="ali-feedback" role="status" aria-live="polite" aria-atomic="true">
        {feedback}
      </div>
      <p className="ali-ephemeral-note">
        Your choice is not saved or sent anywhere.
      </p>
    </fieldset>
  );
}

type TypedResponseActivityProps = Readonly<{
  prompt: ReactNode;
  responseLabel?: string;
  hint?: ReactNode;
  selfCheck: ReactNode;
}>;

export function TypedResponseActivity({
  prompt,
  responseLabel = "Your response",
  hint,
  selfCheck,
}: TypedResponseActivityProps) {
  const responseId = useId();
  const promptId = useId();
  const noteId = useId();

  return (
    <div className="ali-typed" role="group" aria-labelledby={promptId}>
      <p id={promptId} className="ali-typed-prompt">
        {prompt}
      </p>
      <label htmlFor={responseId}>{responseLabel}</label>
      <textarea
        id={responseId}
        aria-describedby={noteId}
        autoComplete="off"
        rows={5}
      />
      <p id={noteId} className="ali-ephemeral-note">
        This response stays only in this field and is not saved or sent.
      </p>
      {hint ? (
        <details>
          <summary>Show hint</summary>
          <div>{hint}</div>
        </details>
      ) : null}
      <details>
        <summary>Show self-check guidance</summary>
        <div>{selfCheck}</div>
      </details>
    </div>
  );
}
