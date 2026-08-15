"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { boundedArrowGeometry, type ArrowBounds } from "./arrow-geometry";
import { useColourSupport } from "./components/accessible-learning";
import {
  billVelocityRelativeToAmy,
  projectileAt,
  secantAt,
} from "./kinematics-model";

const cliffFallTime = 1.43;

const projectileCopy = {
  "en-AU": {
    title: "Horizontal launch from a 10.0 m cliff",
    objectLegend: "Object appearance",
    point: "Point",
    ball: "Ball",
    horizontalSpeed: "horizontal launch speed",
    elapsedTime: "elapsed time",
    reset: "Reset to lecture values",
    description:
      "The solid curve is the path of the selected point or ball. The appearance does not change the calculation. The horizontal arrow stays constant because horizontal acceleration is zero. The downward arrow grows because gravity changes vertical velocity. Both components use the same elapsed time.",
    caption: "Current horizontal-cliff calculation",
    currentValuesRegion: "Horizontal-cliff current values",
    time: "Time (s)",
    horizontalSpeedColumn: "Horizontal speed (m/s)",
    horizontalDistance: "Horizontal distance (m)",
    height: "Height (m)",
    verticalVelocity: "Vertical velocity (m/s)",
    ground: "ground",
    landing: "landing",
  },
  vi: {
    title: "Phóng ngang từ mép vực cao 10,0 m",
    objectLegend: "Cách hiển thị vật",
    point: "Điểm",
    ball: "Quả bóng",
    horizontalSpeed: "tốc độ ban đầu theo phương ngang",
    elapsedTime: "thời gian chuyển động",
    reset: "Đặt lại theo giá trị bài giảng",
    description:
      "Đường cong liền là quỹ đạo của điểm hoặc quả bóng đã chọn. Cách hiển thị không làm thay đổi phép tính. Mũi tên ngang giữ nguyên vì gia tốc ngang bằng không. Mũi tên hướng xuống dài dần vì trọng lực làm thay đổi vận tốc theo phương thẳng đứng. Hai thành phần dùng cùng một thời gian đã trôi qua.",
    caption: "Phép tính hiện tại cho chuyển động phóng ngang từ mép vực",
    currentValuesRegion: "Các giá trị hiện tại của chuyển động phóng ngang từ mép vực",
    time: "Thời gian (s)",
    horizontalSpeedColumn: "Tốc độ ngang (m/s)",
    horizontalDistance: "Khoảng cách ngang (m)",
    height: "Độ cao (m)",
    verticalVelocity: "Vận tốc thẳng đứng (m/s)",
    ground: "mặt đất",
    landing: "điểm chạm đất",
  },
} as const;

type StudioPalette = Readonly<{
  background: string;
  surface: string;
  text: string;
  muted: string;
  guide: string;
  primary: string;
  secondary: string;
  tertiary: string;
}>;

export function readStudioPalette(element: HTMLElement): StudioPalette {
  const styles = getComputedStyle(element);
  const read = (name: string, fallback: string) =>
    styles.getPropertyValue(name).trim() || fallback;

  return {
    background: styles.backgroundColor,
    surface: read("--studio-canvas-surface", styles.backgroundColor),
    text: styles.color,
    muted: read("--studio-canvas-muted", styles.color),
    guide: read("--studio-canvas-guide", styles.color),
    primary: read("--studio-category-one", styles.color),
    secondary: read("--studio-category-two", styles.color),
    tertiary: read("--studio-category-three", styles.color),
  };
}

export function useCanvasImage(src: string) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      imageRef.current = image;
      setReady(true);
    };
    return () => {
      image.onload = null;
    };
  }, [src]);

  return { imageRef, ready };
}

export type ObjectAppearance = "point" | "car" | "ball";

export function ObjectAppearanceControl({
  legend = "Object appearance",
  name,
  value,
  alternative = "car",
  pointLabel = "Point",
  alternativeLabel,
  onChange,
}: Readonly<{
  legend?: string;
  name: string;
  value: ObjectAppearance;
  alternative?: Exclude<ObjectAppearance, "point">;
  pointLabel?: string;
  alternativeLabel?: string;
  onChange: (value: ObjectAppearance) => void;
}>) {
  const resolvedAlternativeLabel = alternativeLabel ?? (alternative === "ball" ? "Ball" : "Car");
  return (
    <fieldset className="studio-object-choice">
      <legend>{legend}</legend>
      <label>
        <input type="radio" name={name} value="point" checked={value === "point"} onChange={() => onChange("point")} />
        {pointLabel}
      </label>
      <label>
        <input type="radio" name={name} value={alternative} checked={value === alternative} onChange={() => onChange(alternative)} />
        {resolvedAlternativeLabel}
      </label>
    </fieldset>
  );
}

function format(value: number) {
  const normalized = Math.abs(value) < 0.005 ? 0 : value;
  return Number.isInteger(normalized) ? String(normalized) : normalized.toFixed(2);
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function drawArrow(
  context: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  color: string,
  bounds: ArrowBounds,
  width = 4,
) {
  const arrow = boundedArrowGeometry(startX, startY, endX, endY, bounds);
  if (!arrow) return null;

  context.strokeStyle = color;
  context.fillStyle = color;
  context.lineWidth = width;
  context.beginPath();
  context.moveTo(arrow.start.x, arrow.start.y);
  context.lineTo(arrow.end.x, arrow.end.y);
  context.stroke();
  context.beginPath();
  context.moveTo(arrow.head[0].x, arrow.head[0].y);
  context.lineTo(arrow.head[1].x, arrow.head[1].y);
  context.lineTo(arrow.head[2].x, arrow.head[2].y);
  context.closePath();
  context.fill();
  return arrow;
}

type VariableControlProps = Readonly<{
  id: string;
  symbol: string;
  name: string;
  unit: string;
  value: number;
  minimum: number;
  maximum: number;
  step: number;
  onChange: (value: number) => void;
}>;

export function VariableControl({
  id,
  symbol,
  name,
  unit,
  value,
  minimum,
  maximum,
  step,
  onChange,
}: VariableControlProps) {
  const labelId = `${id}-label`;
  const update = (nextValue: number) =>
    onChange(clamp(nextValue, minimum, maximum));

  return (
    <div className="studio-variable">
      <div className="studio-variable-meta">
        <label id={labelId} htmlFor={`${id}-range`}>
          <var>{symbol}</var>
          <span>{name}</span>
        </label>
        <span className="studio-number-wrap">
          <input
            id={`${id}-number`}
            type="number"
            min={minimum}
            max={maximum}
            step={step}
            value={value}
            aria-labelledby={labelId}
            onChange={(event) => update(Number(event.currentTarget.value))}
          />
          <span>{unit}</span>
        </span>
      </div>
      <input
        id={`${id}-range`}
        type="range"
        min={minimum}
        max={maximum}
        step={step}
        value={value}
        aria-labelledby={labelId}
        onChange={(event) => update(Number(event.currentTarget.value))}
      />
    </div>
  );
}

type ConceptStudioProps = Readonly<{
  titleId: string;
  title: string;
  summary: ReactNode;
  formula: ReactNode;
  controls: ReactNode;
  result: ReactNode;
  visual: ReactNode;
  description: ReactNode;
  table: ReactNode;
  actions?: ReactNode;
  tableRegionLabel?: string;
}>;

export function ConceptStudio({
  titleId,
  title,
  summary,
  formula,
  controls,
  result,
  visual,
  description,
  table,
  actions,
  tableRegionLabel,
}: ConceptStudioProps) {
  return (
    <figure className="concept-studio" aria-labelledby={titleId}>
      <div className="concept-studio-frame">
        <div className="concept-studio-controls">
          <div className="studio-formula">{formula}</div>
          <div className="studio-variables">{controls}</div>
          <div
            className="studio-result"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {result}
          </div>
          {actions ? <div className="studio-actions">{actions}</div> : null}
        </div>
        <div className="concept-studio-visual">
          <h4 id={titleId}>{title}</h4>
          <p>{summary}</p>
          {visual}
        </div>
      </div>
      <figcaption className="concept-studio-equivalent">
        <div>{description}</div>
        <div
          className="ali-table-scroll"
          role="region"
          aria-label={tableRegionLabel ?? `${title} current values`}
          tabIndex={0}
        >
          {table}
        </div>
      </figcaption>
    </figure>
  );
}

export function SecantTangentFigure({ language = "en-AU" }: Readonly<{ language?: "en-AU" | "vi" }>) {
  const vi = language === "vi";
  const t = (english: string, vietnamese: string) => vi ? vietnamese : english;
  const [firstTime, setFirstTime] = useState(2);
  const [secondTime, setSecondTime] = useState(3.5);
  const colourSupport = useColourSupport();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const current = secantAt(firstTime, secondTime);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const palette = readStudioPalette(canvas);

    const width = canvas.width;
    const height = canvas.height;
    const left = 76;
    const right = width - 34;
    const top = 38;
    const bottom = height - 58;
    const toX = (time: number) => left + (time / 4) * (right - left);
    const toY = (position: number) =>
      bottom - (position / 16) * (bottom - top);

    context.clearRect(0, 0, width, height);
    context.fillStyle = palette.background;
    context.fillRect(0, 0, width, height);
    context.font = "15px system-ui";
    context.lineCap = "round";

    context.strokeStyle = palette.guide;
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(left, top);
    context.lineTo(left, bottom);
    context.lineTo(right, bottom);
    context.stroke();

    context.fillStyle = palette.muted;
    context.textAlign = "center";
    for (let tick = 0; tick <= 4; tick += 1) {
      const x = toX(tick);
      context.fillText(String(tick), x, bottom + 25);
      context.beginPath();
      context.moveTo(x, bottom - 5);
      context.lineTo(x, bottom + 5);
      context.stroke();
    }
    context.textAlign = "right";
    for (let tick = 0; tick <= 16; tick += 4) {
      const y = toY(tick);
      context.fillText(String(tick), left - 12, y + 5);
    }
    context.textAlign = "right";
    context.fillText(vi ? "thời gian t (s)" : "time t (s)", right, height - 12);
    context.save();
    context.translate(20, top);
    context.rotate(-Math.PI / 2);
    context.textAlign = "right";
    context.fillText(vi ? "vị trí x" : "position x", 0, 0);
    context.restore();

    context.strokeStyle = palette.primary;
    context.lineWidth = 4;
    context.beginPath();
    for (let index = 0; index <= 80; index += 1) {
      const time = (index / 80) * 4;
      const position = time * time;
      if (index === 0) context.moveTo(toX(time), toY(position));
      else context.lineTo(toX(time), toY(position));
    }
    context.stroke();

    context.strokeStyle = palette.tertiary;
    context.lineWidth = 3;
    context.beginPath();
    context.moveTo(toX(firstTime), toY(current.firstPosition));
    context.lineTo(toX(secondTime), toY(current.secondPosition));
    context.stroke();

    const tangentSpan = 0.65;
    context.strokeStyle = palette.secondary;
    context.setLineDash([9, 7]);
    context.beginPath();
    context.moveTo(
      toX(firstTime - tangentSpan),
      toY(current.firstPosition - current.instantaneousVelocity * tangentSpan),
    );
    context.lineTo(
      toX(firstTime + tangentSpan),
      toY(current.firstPosition + current.instantaneousVelocity * tangentSpan),
    );
    context.stroke();
    context.setLineDash([]);

    for (const [time, position, label] of [
      [firstTime, current.firstPosition, "A"],
      [secondTime, current.secondPosition, "B"],
    ] as const) {
      context.fillStyle = palette.primary;
      context.strokeStyle = palette.tertiary;
      context.lineWidth = 2;
      context.beginPath();
      context.arc(toX(time), toY(position), 8, 0, Math.PI * 2);
      context.fill();
      context.stroke();
      context.fillStyle = palette.text;
      context.textAlign = "center";
      context.fillText(label, toX(time), toY(position) - 14);
    }
  }, [colourSupport, current, firstTime, secondTime, vi]);

  const reset = () => {
    setFirstTime(2);
    setSecondTime(3.5);
  };

  return (
    <ConceptStudio
      titleId="secant-studio-title"
      title={t("Secant approaching a tangent", "Cát tuyến tiến gần tiếp tuyến")}
      summary={
        <>
          {t("Average slope", "Độ dốc trung bình")} {format(current.averageVelocity)} · {t("tangent slope", "độ dốc tiếp tuyến")} {format(current.instantaneousVelocity)}
        </>
      }
      formula={
        <math display="block">
          <mtable rowspacing="0.8em">
            <mtr>
              <mtd><msub><mi>v</mi><mtext>avg</mtext></msub></mtd>
              <mtd><mo>=</mo></mtd>
              <mtd><mfrac><mi>Δx</mi><mi>Δt</mi></mfrac></mtd>
            </mtr>
            <mtr>
              <mtd><mi>v</mi></mtd>
              <mtd><mo>=</mo></mtd>
              <mtd><mfrac><mrow><mi>d</mi><mi>x</mi></mrow><mrow><mi>d</mi><mi>t</mi></mrow></mfrac></mtd>
            </mtr>
          </mtable>
        </math>
      }
      controls={
        <>
          <VariableControl id="secant-first-time" symbol="t₁" name={t("first time", "thời điểm thứ nhất")} unit="s" value={firstTime} minimum={0.5} maximum={2} step={0.25} onChange={setFirstTime} />
          <VariableControl id="secant-second-time" symbol="t₂" name={t("second time", "thời điểm thứ hai")} unit="s" value={secondTime} minimum={2.25} maximum={4} step={0.25} onChange={setSecondTime} />
        </>
      }
      result={
        <p>
          v<sub>avg</sub> = {format(current.averageVelocity)} {t("position units/s", "đơn vị vị trí/s")}; v {t("at", "tại")} t₁ = {format(current.instantaneousVelocity)} {t("position units/s", "đơn vị vị trí/s")}.
        </p>
      }
      actions={<button className="studio-reset" type="button" onClick={reset}>{t("Reset values", "Đặt lại giá trị")}</button>}
      visual={<canvas ref={canvasRef} className="studio-canvas" width="800" height="430" aria-hidden="true" />}
      description={
        <p>
          {t("The solid line joins points A and B and shows average velocity. The dashed line touches the curve at A and shows instantaneous velocity. Move t₂ toward t₁ to make the two slopes converge.", "Đường liền nối điểm A và B và biểu diễn vận tốc trung bình. Đường đứt nét tiếp xúc với đường cong tại A và biểu diễn vận tốc tức thời. Di chuyển t₂ về gần t₁ để hai độ dốc tiến gần nhau.")}
        </p>
      }
      tableRegionLabel={t("Secant and tangent current values", "Các giá trị hiện tại của cát tuyến và tiếp tuyến")}
      table={
        <table>
          <caption>{t("Current values for the secant and tangent", "Giá trị hiện tại của cát tuyến và tiếp tuyến")}</caption>
          <thead><tr><th scope="col">{t("Point", "Điểm")}</th><th scope="col">{t("Time (s)", "Thời gian (s)")}</th><th scope="col">{t("Position", "Vị trí")}</th><th scope="col">{t("Slope represented", "Độ dốc biểu diễn")}</th></tr></thead>
          <tbody>
            <tr><th scope="row">A</th><td>{format(firstTime)}</td><td>{format(current.firstPosition)}</td><td>{t("Tangent", "Tiếp tuyến")}: {format(current.instantaneousVelocity)}</td></tr>
            <tr><th scope="row">B</th><td>{format(secondTime)}</td><td>{format(current.secondPosition)}</td><td>{t("Secant", "Cát tuyến")} A–B: {format(current.averageVelocity)}</td></tr>
          </tbody>
        </table>
      }
    />
  );
}

export function ProjectileCliffFigure({ language = "en-AU" }: Readonly<{ language?: "en-AU" | "vi" }>) {
  const copy = projectileCopy[language];
  const [horizontalVelocity, setHorizontalVelocity] = useState(20);
  const [time, setTime] = useState(cliffFallTime);
  const [objectAppearance, setObjectAppearance] = useState<ObjectAppearance>("point");
  const colourSupport = useColourSupport();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { imageRef: ballImageRef, ready: ballReady } = useCanvasImage("/simulator/tennis-ball-sprite.png");
  const current = projectileAt(time, horizontalVelocity);
  const landing = projectileAt(cliffFallTime, horizontalVelocity);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const palette = readStudioPalette(canvas);

    const width = canvas.width;
    const height = canvas.height;
    const left = 82;
    const right = width - 36;
    const trajectoryRight = right - 100;
    const top = 52;
    const ground = height - 62;
    const toX = (distance: number) => left + (distance / 45) * (trajectoryRight - left);
    const toY = (verticalPosition: number) =>
      ground - (verticalPosition / 12) * (ground - top);

    context.clearRect(0, 0, width, height);
    context.fillStyle = palette.background;
    context.fillRect(0, 0, width, height);
    context.lineCap = "round";
    context.font = "15px system-ui";

    context.fillStyle = palette.surface;
    context.fillRect(20, toY(10), left - 20, ground - toY(10));
    context.strokeStyle = palette.guide;
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(20, ground);
    context.lineTo(right, ground);
    context.stroke();

    context.fillStyle = palette.muted;
    context.textAlign = "left";
    context.fillText("10.0 m", 22, toY(10) - 12);
    context.fillText(copy.ground, 22, ground + 25);
    context.textAlign = "right";
    context.fillText(`${copy.landing} ${format(landing.horizontalDistance)} m`, right, ground + 25);

    context.strokeStyle = palette.primary;
    context.lineWidth = 4;
    context.beginPath();
    for (let index = 0; index <= 80; index += 1) {
      const point = projectileAt(
        (index / 80) * cliffFallTime,
        horizontalVelocity,
      );
      if (index === 0) {
        context.moveTo(toX(point.horizontalDistance), toY(point.height));
      } else {
        context.lineTo(
          toX(point.horizontalDistance),
          toY(Math.max(point.height, 0)),
        );
      }
    }
    context.stroke();

    const currentX = toX(current.horizontalDistance);
    const currentY = toY(Math.max(current.height, 0));
    const ballImage = ballImageRef.current;
    const showBall = objectAppearance === "ball" && ballReady && ballImage;
    if (showBall) {
      const ballSize = 56;
      const ballRadius = ballSize / 2;
      context.save();
      context.beginPath();
      context.arc(currentX, currentY, ballRadius, 0, Math.PI * 2);
      context.clip();
      context.drawImage(
        ballImage,
        currentX - ballRadius,
        currentY - ballRadius,
        ballSize,
        ballSize,
      );
      context.restore();
      context.strokeStyle = palette.text;
      context.lineWidth = 2;
      context.beginPath();
      context.arc(currentX, currentY, ballRadius, 0, Math.PI * 2);
      context.stroke();
    } else {
      context.fillStyle = palette.tertiary;
      context.beginPath();
      context.arc(currentX, currentY, 8, 0, Math.PI * 2);
      context.fill();
    }
    const horizontalArrowStart = currentX + (showBall ? 30 : 0);
    const horizontalArrow = drawArrow(
      context,
      horizontalArrowStart,
      currentY,
      horizontalArrowStart + Math.max(18, horizontalVelocity * 3),
      currentY,
      palette.primary,
      { minX: left, maxX: right, minY: currentY - 16, maxY: currentY + 16 },
      4,
    );
    let verticalArrow: ReturnType<typeof drawArrow> = null;
    if (time > 0) {
      const verticalArrowStart = Math.min(height - 28, currentY + (showBall ? 30 : 0));
      verticalArrow = drawArrow(
        context,
        currentX,
        verticalArrowStart,
        currentX,
        verticalArrowStart + Math.max(12, Math.abs(current.verticalVelocity) * 5),
        palette.secondary,
        { minX: currentX - 16, maxX: currentX + 16, minY: top, maxY: height - 16 },
        4,
      );
    }
    context.fillStyle = palette.text;
    context.textAlign = "center";
    if (horizontalArrow) {
      context.fillText("vₓ", (horizontalArrow.start.x + horizontalArrow.end.x) / 2, currentY - 12);
    }
    if (verticalArrow) {
      context.textAlign = "left";
      context.fillText("vᵧ", currentX + 10, (verticalArrow.start.y + verticalArrow.end.y) / 2 + 5);
    }
  }, [ballImageRef, ballReady, colourSupport, copy, current, horizontalVelocity, landing.horizontalDistance, objectAppearance, time]);

  const reset = () => {
    setHorizontalVelocity(20);
    setTime(cliffFallTime);
  };

  return (
    <ConceptStudio
      titleId="projectile-studio-title"
      title={copy.title}
      summary={
        <>
          x = {format(current.horizontalDistance)} m · y = {format(Math.max(current.height, 0))} m
        </>
      }
      formula={
        <math display="block">
          <mtable rowspacing="0.8em">
            <mtr><mtd><mi>x</mi></mtd><mtd><mo>=</mo></mtd><mtd><msub><mi>v</mi><mrow><mn>0</mn><mi>x</mi></mrow></msub><mi>t</mi></mtd></mtr>
            <mtr><mtd><mi>y</mi></mtd><mtd><mo>=</mo></mtd><mtd><mn>10</mn><mo>−</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>g</mi><msup><mi>t</mi><mn>2</mn></msup></mtd></mtr>
          </mtable>
        </math>
      }
      controls={
        <>
          <ObjectAppearanceControl legend={copy.objectLegend} name="projectile-object-appearance" value={objectAppearance} alternative="ball" pointLabel={copy.point} alternativeLabel={copy.ball} onChange={setObjectAppearance} />
          <VariableControl id="projectile-horizontal-velocity" symbol="v₀ₓ" name={copy.horizontalSpeed} unit="m/s" value={horizontalVelocity} minimum={5} maximum={30} step={1} onChange={setHorizontalVelocity} />
          <VariableControl id="projectile-time" symbol="t" name={copy.elapsedTime} unit="s" value={time} minimum={0} maximum={cliffFallTime} step={0.01} onChange={setTime} />
        </>
      }
      result={
        <p>
          x = {format(current.horizontalDistance)} m, y = {format(Math.max(current.height, 0))} m, v<sub>y</sub> = {format(current.verticalVelocity)} m/s.
        </p>
      }
      actions={<button className="studio-reset" type="button" onClick={reset}>{copy.reset}</button>}
      visual={<canvas ref={canvasRef} className="studio-canvas" width="800" height="430" aria-hidden="true" />}
      description={
        <p>
          {copy.description}
        </p>
      }
      tableRegionLabel={copy.currentValuesRegion}
      table={
        <table>
          <caption>{copy.caption}</caption>
          <thead><tr><th scope="col">{copy.time}</th><th scope="col">{copy.horizontalSpeedColumn}</th><th scope="col">{copy.horizontalDistance}</th><th scope="col">{copy.height}</th><th scope="col">{copy.verticalVelocity}</th></tr></thead>
          <tbody><tr><th scope="row">{format(time)}</th><td>{format(horizontalVelocity)}</td><td>{format(current.horizontalDistance)}</td><td>{format(Math.max(current.height, 0))}</td><td>{format(current.verticalVelocity)}</td></tr></tbody>
        </table>
      }
    />
  );
}

export function RelativeFrameFigure({ language = "en-AU" }: Readonly<{ language?: "en-AU" | "vi" }>) {
  const vi = language === "vi";
  const t = (english: string, vietnamese: string) => vi ? vietnamese : english;
  const [carlosRelativeToAmy, setCarlosRelativeToAmy] = useState(5);
  const [carlosRelativeToBill, setCarlosRelativeToBill] = useState(-10);
  const [objectAppearance, setObjectAppearance] = useState<ObjectAppearance>("point");
  const colourSupport = useColourSupport();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { imageRef: carImageRef, ready: carReady } = useCanvasImage("/simulator/car-sprite.png");
  const billRelativeToAmy = billVelocityRelativeToAmy(
    carlosRelativeToAmy,
    carlosRelativeToBill,
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const palette = readStudioPalette(canvas);

    const width = canvas.width;
    const height = canvas.height;
    const origin = width / 2;
    const arrowMinX = 104;
    const arrowMaxX = width - 86;
    const scale = Math.min(origin - arrowMinX, arrowMaxX - origin) / 30;
    const rows = [
      { y: 128, label: vi ? "Carlos so với Amy" : "Carlos relative to Amy", value: carlosRelativeToAmy, color: palette.primary, dash: [] },
      { y: 226, label: vi ? "Carlos so với Bill" : "Carlos relative to Bill", value: carlosRelativeToBill, color: palette.secondary, dash: [10, 7] },
      { y: 324, label: vi ? "Bill so với Amy" : "Bill relative to Amy", value: billRelativeToAmy, color: palette.tertiary, dash: [2, 6] },
    ];

    context.clearRect(0, 0, width, height);
    context.fillStyle = palette.background;
    context.fillRect(0, 0, width, height);
    context.font = "15px system-ui";
    context.lineCap = "round";

    context.strokeStyle = palette.guide;
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(66, 74);
    context.lineTo(width - 48, 74);
    context.stroke();
    context.fillStyle = palette.muted;
    context.textAlign = "left";
    context.fillText(vi ? "chiều âm" : "negative direction", 66, 48);
    context.textAlign = "right";
    context.fillText(vi ? "chiều dương" : "positive direction", width - 48, 48);
    context.textAlign = "center";
    context.fillText("0", origin, 98);

    for (const row of rows) {
      context.fillStyle = palette.muted;
      context.textAlign = "left";
      context.fillText(row.label, 66, row.y - 24);
      context.strokeStyle = palette.guide;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(66, row.y);
      context.lineTo(width - 48, row.y);
      context.stroke();
      context.setLineDash(row.dash);
      const arrow = drawArrow(
        context,
        origin,
        row.y,
        origin + row.value * scale,
        row.y,
        row.color,
        { minX: arrowMinX, maxX: arrowMaxX, minY: row.y - 16, maxY: row.y + 16 },
        5,
      );
      context.setLineDash([]);
      const endpointX = arrow?.end.x ?? origin;
      const carImage = carImageRef.current;
      const showCar = objectAppearance === "car" && carReady && carImage;
      if (showCar) {
        const carWidth = 54;
        const carHeight = carWidth * (carImage.naturalHeight / carImage.naturalWidth);
        context.save();
        context.translate(endpointX, row.y);
        context.scale(row.value < 0 ? -1 : 1, 1);
        context.drawImage(carImage, -carWidth / 2, -carHeight / 2, carWidth, carHeight);
        context.restore();
      } else {
        context.fillStyle = row.color;
        context.beginPath();
        context.arc(endpointX, row.y, 6, 0, Math.PI * 2);
        context.fill();
      }
      context.fillStyle = row.color;
      context.textAlign = row.value < 0 ? "right" : "left";
      context.fillText(
        `${row.value > 0 ? "+" : ""}${format(row.value)} m/s`,
        origin + row.value * scale + (row.value < 0 ? -14 : 14),
        row.y + (showCar ? 34 : 5),
      );
    }
  }, [billRelativeToAmy, carImageRef, carReady, carlosRelativeToAmy, carlosRelativeToBill, colourSupport, objectAppearance, vi]);

  const reset = () => {
    setCarlosRelativeToAmy(5);
    setCarlosRelativeToBill(-10);
  };

  return (
    <ConceptStudio
      titleId="relative-studio-title"
      title={t("Relative velocity between reference frames", "Vận tốc tương đối giữa các hệ quy chiếu")}
      summary={
        <>
          {t("Bill relative to Amy", "Bill so với Amy")} = {billRelativeToAmy > 0 ? "+" : ""}{format(billRelativeToAmy)} m/s
        </>
      }
      formula={
        <math display="block">
          <mtable rowspacing="0.8em">
            <mtr><mtd><msub><mover><mi>v</mi><mo>→</mo></mover><mrow><mi>C</mi><mi>B</mi></mrow></msub></mtd><mtd><mo>=</mo></mtd><mtd><msub><mover><mi>v</mi><mo>→</mo></mover><mrow><mi>C</mi><mi>A</mi></mrow></msub><mo>+</mo><msub><mover><mi>v</mi><mo>→</mo></mover><mrow><mi>A</mi><mi>B</mi></mrow></msub></mtd></mtr>
            <mtr><mtd><msub><mover><mi>v</mi><mo>→</mo></mover><mrow><mi>B</mi><mi>A</mi></mrow></msub></mtd><mtd><mo>=</mo></mtd><mtd><msub><mover><mi>v</mi><mo>→</mo></mover><mrow><mi>C</mi><mi>A</mi></mrow></msub><mo>−</mo><msub><mover><mi>v</mi><mo>→</mo></mover><mrow><mi>C</mi><mi>B</mi></mrow></msub></mtd></mtr>
          </mtable>
        </math>
      }
      controls={
        <>
          <ObjectAppearanceControl legend={t("Velocity marker", "Dấu chỉ vận tốc")} name="relative-object-appearance" value={objectAppearance} pointLabel={t("Point", "Điểm")} alternativeLabel={t("Car", "Xe")} onChange={setObjectAppearance} />
          <VariableControl id="relative-carlos-amy" symbol="vCA" name={t("Carlos measured by Amy", "Vận tốc Carlos do Amy đo")} unit="m/s" value={carlosRelativeToAmy} minimum={-15} maximum={15} step={1} onChange={setCarlosRelativeToAmy} />
          <VariableControl id="relative-carlos-bill" symbol="vCB" name={t("Carlos measured by Bill", "Vận tốc Carlos do Bill đo")} unit="m/s" value={carlosRelativeToBill} minimum={-15} maximum={15} step={1} onChange={setCarlosRelativeToBill} />
        </>
      }
      result={
        <p>
          v<sub>BA</sub> = {format(carlosRelativeToAmy)} − ({format(carlosRelativeToBill)}) = {format(billRelativeToAmy)} m/s.
        </p>
      }
      actions={<button className="studio-reset" type="button" onClick={reset}>{t("Reset to lecture values", "Đặt lại theo giá trị bài giảng")}</button>}
      visual={<canvas ref={canvasRef} className="studio-canvas" width="800" height="430" aria-hidden="true" />}
      description={
        <p>
          {t("Every arrow begins at zero. Its direction shows the velocity sign and its length shows magnitude. The selected point or car marks the arrow endpoint and does not represent position. Subtracting Carlos's Bill-frame velocity from his Amy-frame velocity gives Bill's velocity relative to Amy.", "Mỗi mũi tên bắt đầu từ số không. Hướng của mũi tên biểu thị dấu vận tốc và độ dài biểu thị độ lớn. Điểm hoặc xe đã chọn chỉ đánh dấu đầu mũi tên, không biểu diễn vị trí. Lấy vận tốc của Carlos trong hệ Bill trừ khỏi vận tốc trong hệ Amy sẽ cho vận tốc của Bill so với Amy.")}
        </p>
      }
      tableRegionLabel={t("Relative velocity current values", "Các giá trị vận tốc tương đối hiện tại")}
      table={
        <table>
          <caption>{t("Current relative-velocity relationship", "Quan hệ vận tốc tương đối hiện tại")}</caption>
          <thead><tr><th scope="col">{t("Relationship", "Quan hệ")}</th><th scope="col">{t("Velocity (m/s)", "Vận tốc (m/s)")}</th><th scope="col">{t("Direction", "Hướng")}</th></tr></thead>
          <tbody>
            <tr><th scope="row">{t("Carlos relative to Amy", "Carlos so với Amy")}</th><td>{format(carlosRelativeToAmy)}</td><td>{carlosRelativeToAmy < 0 ? t("Negative", "Âm") : carlosRelativeToAmy > 0 ? t("Positive", "Dương") : t("Stationary", "Đứng yên")}</td></tr>
            <tr><th scope="row">{t("Carlos relative to Bill", "Carlos so với Bill")}</th><td>{format(carlosRelativeToBill)}</td><td>{carlosRelativeToBill < 0 ? t("Negative", "Âm") : carlosRelativeToBill > 0 ? t("Positive", "Dương") : t("Stationary", "Đứng yên")}</td></tr>
            <tr><th scope="row">{t("Bill relative to Amy", "Bill so với Amy")}</th><td>{format(billRelativeToAmy)}</td><td>{billRelativeToAmy < 0 ? t("Negative", "Âm") : billRelativeToAmy > 0 ? t("Positive", "Dương") : t("Stationary", "Đứng yên")}</td></tr>
          </tbody>
        </table>
      }
    />
  );
}
