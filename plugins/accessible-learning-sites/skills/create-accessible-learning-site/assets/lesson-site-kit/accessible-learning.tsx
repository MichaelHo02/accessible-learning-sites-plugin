"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import "./accessible-learning.css";

const STORAGE_KEY = "accessible-learning-site.preferences.v1";
const CHANGE_EVENT = "accessible-learning-site-preferences";

type Preferences = {
  textSize: "100" | "125" | "150" | "200";
  spacing: "standard" | "extra";
  readingWidth: "standard" | "narrow";
  colourSupport:
    | "standard"
    | "stronger"
    | "minimal"
    | "red-green"
    | "blue-yellow";
  readingFlow: "full" | "section";
  focusMode: "all" | "reduced";
};

export type LessonLanguage = "en-AU" | "vi";

const interfaceCopy = {
  "en-AU": {
    language: "Language / Ngôn ngữ",
    english: "English",
    vietnamese: "Tiếng Việt",
    settings: "Accessibility settings",
    reading: "Reading",
    textSize: "Text size",
    spacing: "Text spacing",
    readingWidth: "Reading width",
    standard: "Standard",
    extra: "Extra",
    narrow: "Narrow",
    colourSupport: "Colour support",
    colourDifferences: "Colour differences",
    stronger: "Stronger differences",
    minimal: "Minimal colour",
    redGreen: "Distinguish red and green",
    blueYellow: "Distinguish blue and yellow",
    colourHelp: "Standard uses the lesson palette. Other options change the interface and interactive diagrams, not the original lesson images. Every option keeps labels, patterns, and line styles so meaning does not depend on colour.",
    preview: "Preview",
    solid: "Solid",
    striped: "Striped",
    dotted: "Dotted",
    attention: "Attention",
    readingFlow: "Reading flow",
    fullLesson: "Full lesson",
    sectionBySection: "Section by section",
    readingFlowHelp: "Section by section shows one required lesson section at a time. Use the lesson navigation or Previous and Next links to move.",
    optionalExtras: "Optional extras",
    showExtras: "Show optional extras",
    hideExtras: "Hide optional extras",
    extrasHelp: "Hides only content explicitly marked as optional, such as the lecture audio. The simulator, transcripts, activities, feedback, and navigation remain available.",
    reset: "Reset to device defaults",
    privacy: "This panel saves only presentation choices on this device for this lesson.",
    resetStatus: "Accessibility settings reset to device defaults.",
    skip: "Skip to the lesson",
    objective: "Learning objective",
    accessibility: "Accessibility",
    sections: "Lesson sections",
    readingControls: "Section reading controls",
    section: "Section",
    of: "of",
    previous: "Previous",
    next: "Next",
    first: "First section",
    final: "Final section",
  },
  vi: {
    language: "Ngôn ngữ / Language",
    english: "English",
    vietnamese: "Tiếng Việt",
    settings: "Cài đặt hỗ trợ tiếp cận",
    reading: "Đọc",
    textSize: "Cỡ chữ",
    spacing: "Khoảng cách văn bản",
    readingWidth: "Độ rộng vùng đọc",
    standard: "Tiêu chuẩn",
    extra: "Tăng thêm",
    narrow: "Hẹp",
    colourSupport: "Hỗ trợ màu sắc",
    colourDifferences: "Mức phân biệt màu",
    stronger: "Tăng độ phân biệt",
    minimal: "Giảm sử dụng màu",
    redGreen: "Phân biệt đỏ và xanh lá",
    blueYellow: "Phân biệt xanh dương và vàng",
    colourHelp: "Chế độ Tiêu chuẩn dùng bảng màu của bài học. Các lựa chọn khác chỉ thay đổi giao diện và sơ đồ tương tác, không thay đổi hình ảnh gốc. Mọi lựa chọn đều giữ nhãn, hoa văn và kiểu đường để ý nghĩa không chỉ phụ thuộc vào màu sắc.",
    preview: "Xem trước",
    solid: "Liền",
    striped: "Sọc",
    dotted: "Chấm",
    attention: "Tập trung",
    readingFlow: "Cách trình bày bài học",
    fullLesson: "Toàn bộ bài học",
    sectionBySection: "Từng phần",
    readingFlowHelp: "Chế độ Từng phần chỉ hiển thị một phần bắt buộc tại một thời điểm. Dùng mục lục bài học hoặc liên kết Trước và Tiếp theo để di chuyển.",
    optionalExtras: "Nội dung bổ sung",
    showExtras: "Hiện nội dung bổ sung",
    hideExtras: "Ẩn nội dung bổ sung",
    extrasHelp: "Chỉ ẩn nội dung được đánh dấu là không bắt buộc, chẳng hạn bản ghi âm bài giảng. Trình mô phỏng, bản chép lời, hoạt động, phản hồi và điều hướng vẫn luôn có sẵn.",
    reset: "Đặt lại theo mặc định của thiết bị",
    privacy: "Bảng này chỉ lưu các lựa chọn trình bày trên thiết bị này cho bài học này.",
    resetStatus: "Đã đặt lại cài đặt hỗ trợ tiếp cận theo mặc định của thiết bị.",
    skip: "Chuyển đến nội dung bài học",
    objective: "Mục tiêu học tập",
    accessibility: "Hỗ trợ tiếp cận",
    sections: "Các phần của bài học",
    readingControls: "Điều hướng từng phần",
    section: "Phần",
    of: "trên",
    previous: "Trước",
    next: "Tiếp theo",
    first: "Phần đầu tiên",
    final: "Phần cuối cùng",
  },
} as const;

const defaults: Preferences = {
  textSize: "100",
  spacing: "standard",
  readingWidth: "standard",
  colourSupport: "standard",
  readingFlow: "full",
  focusMode: "all",
};

let volatileSnapshot: string | null = null;

function allowed<T extends string>(
  value: unknown,
  choices: readonly T[],
  fallback: T,
): T {
  return typeof value === "string" && choices.includes(value as T)
    ? (value as T)
    : fallback;
}

function parsePreferences(snapshot: string | null): Preferences {
  if (!snapshot) return defaults;

  try {
    const value = JSON.parse(snapshot) as Record<string, unknown>;
    return {
      textSize: allowed(value.textSize, ["100", "125", "150", "200"], "100"),
      spacing: allowed(value.spacing, ["standard", "extra"], "standard"),
      readingWidth: allowed(
        value.readingWidth,
        ["standard", "narrow"],
        "standard",
      ),
      colourSupport: allowed(
        value.colourSupport,
        ["standard", "stronger", "minimal", "red-green", "blue-yellow"],
        "standard",
      ),
      readingFlow: allowed(value.readingFlow, ["full", "section"], "full"),
      focusMode: allowed(value.focusMode, ["all", "reduced"], "all"),
    };
  } catch {
    return defaults;
  }
}

function readSnapshot(): string | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? volatileSnapshot;
  } catch {
    return volatileSnapshot;
  }
}

function readServerSnapshot(): null {
  return null;
}

function subscribe(onChange: () => void): () => void {
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    volatileSnapshot = event.newValue;
    onChange();
  };
  const handleLocalChange = () => onChange();

  window.addEventListener("storage", handleStorage);
  window.addEventListener(CHANGE_EVENT, handleLocalChange);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CHANGE_EVENT, handleLocalChange);
  };
}

function writeSnapshot(snapshot: string | null): void {
  volatileSnapshot = snapshot;
  try {
    if (snapshot) window.localStorage.setItem(STORAGE_KEY, snapshot);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Preferences still work for this visit when storage is unavailable.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function usePreferences(): Preferences {
  return parsePreferences(
    useSyncExternalStore(subscribe, readSnapshot, readServerSnapshot),
  );
}

export function useColourSupport(): Preferences["colourSupport"] {
  return usePreferences().colourSupport;
}

export function AccessibilitySettings({
  language = "en-AU",
  onLanguageChange,
}: Readonly<{
  language?: LessonLanguage;
  onLanguageChange?: (language: LessonLanguage) => void;
}>) {
  const preferences = usePreferences();
  const [status, setStatus] = useState("");
  const copy = interfaceCopy[language];

  function update(next: Preferences, message: string) {
    writeSnapshot(JSON.stringify(next));
    setStatus(message);
  }

  function reset() {
    writeSnapshot(null);
    setStatus(copy.resetStatus);
  }

  return (
    <section className="als-settings" aria-labelledby="als-settings-title">
      <h2 id="als-settings-title">{copy.settings}</h2>
      <div className="als-settings-content">
        {onLanguageChange ? (
          <fieldset>
            <legend>{copy.language}</legend>
            <label htmlFor="als-language">
              {copy.language}
              <select
                id="als-language"
                value={language}
                onChange={(event) =>
                  onLanguageChange(event.target.value as LessonLanguage)
                }
              >
                <option value="en-AU">{copy.english}</option>
                <option value="vi">{copy.vietnamese}</option>
              </select>
            </label>
          </fieldset>
        ) : null}
        <fieldset>
          <legend>{copy.reading}</legend>
          <label htmlFor="als-text-size">
            {copy.textSize}
            <select
              id="als-text-size"
              value={preferences.textSize}
              onChange={(event) => {
                const textSize = event.target.value as Preferences["textSize"];
                update(
                  { ...preferences, textSize },
                  language === "vi" ? `Đã đặt cỡ chữ thành ${textSize} phần trăm.` : `Text size set to ${textSize} percent.`,
                );
              }}
            >
              <option value="100">100%</option>
              <option value="125">125%</option>
              <option value="150">150%</option>
              <option value="200">200%</option>
            </select>
          </label>

          <label htmlFor="als-spacing">
            {copy.spacing}
            <select
              id="als-spacing"
              value={preferences.spacing}
              onChange={(event) => {
                const spacing = event.target.value as Preferences["spacing"];
                update(
                  { ...preferences, spacing },
                  language === "vi" ? `Đã đặt khoảng cách văn bản thành ${spacing === "extra" ? "tăng thêm" : "tiêu chuẩn"}.` : `Text spacing set to ${spacing}.`,
                );
              }}
            >
              <option value="standard">{copy.standard}</option>
              <option value="extra">{copy.extra}</option>
            </select>
          </label>

          <label htmlFor="als-reading-width">
            {copy.readingWidth}
            <select
              id="als-reading-width"
              value={preferences.readingWidth}
              onChange={(event) => {
                const readingWidth = event.target
                  .value as Preferences["readingWidth"];
                update(
                  { ...preferences, readingWidth },
                  language === "vi" ? `Đã đặt độ rộng vùng đọc thành ${readingWidth === "narrow" ? "hẹp" : "tiêu chuẩn"}.` : `Reading width set to ${readingWidth}.`,
                );
              }}
            >
              <option value="standard">{copy.standard}</option>
              <option value="narrow">{copy.narrow}</option>
            </select>
          </label>
        </fieldset>

        <fieldset>
          <legend>{copy.colourSupport}</legend>
          <label htmlFor="als-colour-support">
            {copy.colourDifferences}
            <select
              id="als-colour-support"
              aria-describedby="als-colour-help"
              value={preferences.colourSupport}
              onChange={(event) => {
                const colourSupport = event.target
                  .value as Preferences["colourSupport"];
                update(
                  { ...preferences, colourSupport },
                  language === "vi" ? `Đã đặt hỗ trợ màu sắc thành ${event.target.selectedOptions[0].text.toLowerCase()}.` : `Colour support set to ${event.target.selectedOptions[0].text.toLowerCase()}.`,
                );
              }}
            >
              <option value="standard">{copy.standard}</option>
              <option value="stronger">{copy.stronger}</option>
              <option value="minimal">{copy.minimal}</option>
              <option value="red-green">{copy.redGreen}</option>
              <option value="blue-yellow">{copy.blueYellow}</option>
            </select>
          </label>
          <p id="als-colour-help" className="als-privacy-note">
            {copy.colourHelp}
          </p>
          <div
            className="als-colour-preview"
            role="group"
            aria-labelledby="als-colour-preview-title"
          >
            <span id="als-colour-preview-title" className="als-preview-title">
              {copy.preview}
            </span>
            <span>
              <span
                className="als-preview-swatch als-preview-one"
                aria-hidden="true"
              />
              {copy.solid}
            </span>
            <span>
              <span
                className="als-preview-swatch als-preview-two"
                aria-hidden="true"
              />
              {copy.striped}
            </span>
            <span>
              <span
                className="als-preview-swatch als-preview-three"
                aria-hidden="true"
              />
              {copy.dotted}
            </span>
          </div>
        </fieldset>

        <fieldset>
          <legend>{copy.attention}</legend>
          <label htmlFor="als-reading-flow">
            {copy.readingFlow}
            <select
              id="als-reading-flow"
              aria-describedby="als-reading-flow-help"
              value={preferences.readingFlow}
              onChange={(event) => {
                const readingFlow = event.target
                  .value as Preferences["readingFlow"];
                update(
                  { ...preferences, readingFlow },
                  readingFlow === "section"
                    ? language === "vi" ? "Đã chọn trình bày từng phần. Mỗi lần hiển thị một phần của bài học." : "Reading flow set to section by section. One lesson section is shown at a time."
                    : language === "vi" ? "Đã chọn hiển thị toàn bộ bài học." : "Reading flow set to the full lesson.",
                );
              }}
            >
              <option value="full">{copy.fullLesson}</option>
              <option value="section">{copy.sectionBySection}</option>
            </select>
          </label>
          <p id="als-reading-flow-help" className="als-privacy-note">
            {copy.readingFlowHelp}
          </p>

          <label htmlFor="als-focus-mode">
            {copy.optionalExtras}
            <select
              id="als-focus-mode"
              aria-describedby="als-focus-help"
              value={preferences.focusMode}
              onChange={(event) => {
                const focusMode = event.target.value as Preferences["focusMode"];
                update(
                  { ...preferences, focusMode },
                  focusMode === "reduced"
                    ? language === "vi" ? "Đã ẩn nội dung bổ sung. Nội dung bắt buộc vẫn có sẵn." : "Optional extras hidden. Required lesson content remains available."
                    : language === "vi" ? "Đã hiện nội dung bổ sung." : "Optional extras shown.",
                );
              }}
            >
              <option value="all">{copy.showExtras}</option>
              <option value="reduced">{copy.hideExtras}</option>
            </select>
          </label>
          <p id="als-focus-help" className="als-privacy-note">
            {copy.extrasHelp}
          </p>
        </fieldset>

        <button className="als-reset" type="button" onClick={reset}>
          {copy.reset}
        </button>
        <p className="als-privacy-note">
          {copy.privacy}
        </p>
        <p className="als-visually-hidden" role="status" aria-live="polite">
          {status}
        </p>
      </div>
    </section>
  );
}

export type LessonSection = Readonly<{
  id: string;
  label: string;
}>;

type AccessibleMathRegionProps = Readonly<{
  labelledBy: string;
  children: ReactNode;
}>;

export function AccessibleMathRegion({
  labelledBy,
  children,
}: AccessibleMathRegionProps) {
  return (
    <div
      className="als-math-scroll"
      role="region"
      aria-labelledby={labelledBy}
      tabIndex={0}
    >
      {children}
    </div>
  );
}

type AccessibleLessonShellProps = Readonly<{
  title: string;
  context?: string;
  objective: string;
  sections: readonly LessonSection[];
  children: ReactNode;
  footer?: ReactNode;
  language?: LessonLanguage;
  onLanguageChange?: (language: LessonLanguage) => void;
}>;

type ReadingSectionProps = Readonly<{
  id?: string;
  "data-reading-section"?: "true";
  "data-reading-active"?: "true" | "false";
}>;

export function AccessibleLessonShell({
  title,
  context,
  objective,
  sections,
  children,
  footer,
  language = "en-AU",
  onLanguageChange,
}: AccessibleLessonShellProps) {
  const preferences = usePreferences();
  const copy = interfaceCopy[language];
  const [activeSectionId, setActiveSectionId] = useState(
    sections[0]?.id ?? "",
  );
  const activeSectionIndex = Math.max(
    0,
    sections.findIndex((section) => section.id === activeSectionId),
  );
  const activeSection = sections[activeSectionIndex];
  const previousSection = sections[activeSectionIndex - 1];
  const nextSection = sections[activeSectionIndex + 1];

  useEffect(() => {
    function syncHashSection() {
      const hashSectionId = window.location.hash.slice(1);
      if (sections.some((section) => section.id === hashSectionId)) {
        setActiveSectionId(hashSectionId);
      }
    }

    syncHashSection();
    window.addEventListener("hashchange", syncHashSection);
    return () => window.removeEventListener("hashchange", syncHashSection);
  }, [sections]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = title;
  }, [language, title]);

  const readingContent = Children.map(children, (child) => {
    if (!isValidElement<ReadingSectionProps>(child)) return child;
    if (!sections.some((section) => section.id === child.props.id)) return child;

    return cloneElement(child, {
      "data-reading-section": "true",
      "data-reading-active":
        child.props.id === activeSectionId ? "true" : "false",
    });
  });

  return (
    <div
      className="als-shell"
      data-text-size={preferences.textSize}
      data-spacing={preferences.spacing}
      data-reading-width={preferences.readingWidth}
      data-colour-support={preferences.colourSupport}
      data-reading-flow={preferences.readingFlow}
      data-focus-mode={preferences.focusMode}
      lang={language}
    >
      <a className="als-skip-link" href="#lesson-main">
        {copy.skip}
      </a>

      <header className="als-header">
        <div className="als-header-inner">
          {context ? <p className="als-context">{context}</p> : null}
          <h1>{title}</h1>
          <section
            className="als-objective"
            aria-labelledby="als-objective-title"
          >
            <h2 id="als-objective-title">{copy.objective}</h2>
            <p>{objective}</p>
          </section>
        </div>
      </header>

      <div className="als-layout">
        <aside className="als-settings-column" aria-label={copy.accessibility}>
          <AccessibilitySettings language={language} onLanguageChange={onLanguageChange} />
        </aside>

        <main id="lesson-main" className="als-main">
          {sections.length ? (
            <nav className="als-section-nav" aria-label={copy.sections}>
              <ol>
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      aria-current={
                        preferences.readingFlow === "section" &&
                        section.id === activeSectionId
                          ? "location"
                          : undefined
                      }
                      onClick={() => setActiveSectionId(section.id)}
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
          <div className="als-reading">{readingContent}</div>
          {preferences.readingFlow === "section" && activeSection ? (
            <nav className="als-reading-flow" aria-label={copy.readingControls}>
              <p>
                {copy.section} {activeSectionIndex + 1} {copy.of} {sections.length}: {activeSection.label}
              </p>
              <div>
                {previousSection ? (
                  <a
                    href={`#${previousSection.id}`}
                    onClick={() => setActiveSectionId(previousSection.id)}
                  >
                    {copy.previous}: {previousSection.label}
                  </a>
                ) : (
                  <span>{copy.first}</span>
                )}
                {nextSection ? (
                  <a
                    href={`#${nextSection.id}`}
                    onClick={() => setActiveSectionId(nextSection.id)}
                  >
                    {copy.next}: {nextSection.label}
                  </a>
                ) : (
                  <span>{copy.final}</span>
                )}
              </div>
            </nav>
          ) : null}
        </main>
      </div>

      {footer ? <footer className="als-footer">{footer}</footer> : null}
    </div>
  );
}
