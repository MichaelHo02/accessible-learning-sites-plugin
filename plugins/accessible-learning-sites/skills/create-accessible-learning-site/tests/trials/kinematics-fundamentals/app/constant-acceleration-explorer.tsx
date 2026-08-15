"use client";

import { useEffect, useRef, useState } from "react";
import { useColourSupport } from "./components/accessible-learning";
import {
  ConceptStudio,
  drawArrow,
  ObjectAppearanceControl,
  readStudioPalette,
  type ObjectAppearance,
  useCanvasImage,
  VariableControl,
} from "./kinematics-visuals";
import { motionAt, sampleTimesThrough } from "./kinematics-model";

const defaults = { initialVelocity: 0, acceleration: 2, time: 4 };

function format(value: number) {
  const normalized = Math.abs(value) < 0.005 ? 0 : value;
  return Number.isInteger(normalized) ? String(normalized) : normalized.toFixed(2);
}

function paddedRange(values: number[]) {
  const minimum = Math.min(...values, 0);
  const maximum = Math.max(...values, 0);
  const padding = Math.max(1, (maximum - minimum) * 0.15);
  return { minimum: minimum - padding, maximum: maximum + padding };
}

export function ConstantAccelerationExplorer({ language = "en-AU" }: Readonly<{ language?: "en-AU" | "vi" }>) {
  const vi = language === "vi";
  const t = (english: string, vietnamese: string) => vi ? vietnamese : english;
  const [initialVelocity, setInitialVelocity] = useState(defaults.initialVelocity);
  const [acceleration, setAcceleration] = useState(defaults.acceleration);
  const [time, setTime] = useState(defaults.time);
  const [objectAppearance, setObjectAppearance] = useState<ObjectAppearance>("point");
  const [resetAnnouncement, setResetAnnouncement] = useState("");
  const colourSupport = useColourSupport();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { imageRef: carImageRef, ready: carReady } = useCanvasImage("/simulator/car-sprite.png");
  const current = motionAt(initialVelocity, acceleration, time);
  const sampleTimes = sampleTimesThrough(time, 2);
  const isDefault =
    initialVelocity === defaults.initialVelocity &&
    acceleration === defaults.acceleration &&
    time === defaults.time;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const palette = readStudioPalette(canvas);

    const width = canvas.width;
    const height = canvas.height;
    const left = 70;
    const right = width - 34;
    const top = 42;
    const motionY = 135;
    const plotTop = 235;
    const plotBottom = height - 62;
    const selected = motionAt(initialVelocity, acceleration, time);
    const plottedTimes = sampleTimesThrough(time, 80);
    const samples = plottedTimes.map((sampleTime) =>
      motionAt(initialVelocity, acceleration, sampleTime),
    );
    const velocityRange = paddedRange(samples.map((sample) => sample.velocity));
    const displacementRange = paddedRange(
      samples.map((sample) => sample.displacement),
    );
    const toTimeX = (sampleTime: number) =>
      time === 0 ? left : left + (sampleTime / time) * (right - left);
    const toVelocityY = (value: number) => {
      const middle = plotTop + (plotBottom - plotTop) * 0.25;
      const halfHeight = (plotBottom - plotTop) * 0.22;
      return (
        middle -
        ((value - velocityRange.minimum) /
          (velocityRange.maximum - velocityRange.minimum) -
          0.5) *
          halfHeight *
          2
      );
    };
    const toDisplacementY = (value: number) => {
      const middle = plotTop + (plotBottom - plotTop) * 0.75;
      const halfHeight = (plotBottom - plotTop) * 0.22;
      return (
        middle -
        ((value - displacementRange.minimum) /
          (displacementRange.maximum - displacementRange.minimum) -
          0.5) *
          halfHeight *
          2
      );
    };

    context.clearRect(0, 0, width, height);
    context.fillStyle = palette.background;
    context.fillRect(0, 0, width, height);
    context.font = "15px system-ui";
    context.lineCap = "round";

    context.fillStyle = palette.muted;
    context.textAlign = "left";
    context.fillText(vi ? "chuyển động tại thời điểm đã chọn" : "motion at the selected time", left, top - 12);
    context.strokeStyle = palette.guide;
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(left, motionY);
    context.lineTo(right, motionY);
    context.stroke();

    const displacementValues = samples.map((sample) => sample.displacement);
    const motionRange = paddedRange(displacementValues);
    const motionLeft = left + 115;
    const motionRight = right - 115;
    const toMotionX = (value: number) =>
      motionLeft +
      ((value - motionRange.minimum) /
        (motionRange.maximum - motionRange.minimum)) *
        (motionRight - motionLeft);
    const startX = toMotionX(0);
    const currentX = toMotionX(selected.displacement);

    context.fillStyle = palette.tertiary;
    context.beginPath();
    context.arc(startX, motionY, 6, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = palette.muted;
    context.textAlign = "center";
    context.fillText(vi ? "bắt đầu" : "start", startX, motionY + 28);

    const carImage = carImageRef.current;
    const showCar = objectAppearance === "car" && carReady && carImage;
    if (showCar) {
      const carWidth = 104;
      const carHeight = carWidth * (carImage.naturalHeight / carImage.naturalWidth);
      context.drawImage(
        carImage,
        currentX - carWidth / 2,
        motionY - carHeight - 2,
        carWidth,
        carHeight,
      );
    } else {
      context.fillStyle = palette.primary;
      context.beginPath();
      context.arc(currentX, motionY, 12, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = palette.tertiary;
      context.lineWidth = 2;
      context.stroke();
    }
    context.fillStyle = palette.text;
    context.fillText(
      `Δx = ${format(selected.displacement)} m`,
      currentX,
      motionY - (showCar ? 58 : 25),
    );

    if (Math.abs(selected.velocity) > 0.01) {
      const direction = Math.sign(selected.velocity);
      const arrowLength = Math.min(115, Math.max(12, Math.abs(selected.velocity) * 4));
      const arrowStartX = currentX + direction * (showCar ? 48 : 0);
      const arrow = drawArrow(
        context,
        arrowStartX,
        motionY - 2,
        arrowStartX + direction * arrowLength,
        motionY - 2,
        palette.secondary,
        { minX: left, maxX: right, minY: motionY - 16, maxY: motionY + 12 },
        4,
      );
      context.fillStyle = palette.secondary;
      if (arrow) {
        context.textAlign = direction > 0 ? "right" : "left";
        context.fillText(`v = ${format(selected.velocity)} m/s`, arrow.end.x - direction * 8, motionY - 19);
      }
    }

    const panels = [
      {
        label: vi ? "vận tốc v(t) (m/s)" : "velocity v(t) (m/s)",
        color: palette.primary,
        dash: [] as number[],
        value: (sample: ReturnType<typeof motionAt>) => sample.velocity,
        toY: toVelocityY,
        labelY: plotTop - 7,
        axisY: plotTop + (plotBottom - plotTop) * 0.47,
      },
      {
        label: vi ? "độ dời Δx(t) (m)" : "displacement Δx(t) (m)",
        color: palette.secondary,
        dash: [10, 7],
        value: (sample: ReturnType<typeof motionAt>) => sample.displacement,
        toY: toDisplacementY,
        labelY: plotTop + (plotBottom - plotTop) * 0.51,
        axisY: plotBottom,
      },
    ];

    for (const panel of panels) {
      context.fillStyle = palette.muted;
      context.textAlign = "left";
      context.fillText(panel.label, left, panel.labelY);
      context.strokeStyle = palette.guide;
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(left, panel.labelY + 10);
      context.lineTo(left, panel.axisY);
      context.lineTo(right, panel.axisY);
      context.stroke();

      context.strokeStyle = panel.color;
      context.lineWidth = 4;
      context.setLineDash(panel.dash);
      context.beginPath();
      samples.forEach((sample, index) => {
        const x = toTimeX(plottedTimes[index]);
        const y = panel.toY(panel.value(sample));
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      });
      context.stroke();
      context.setLineDash([]);

      const lastValue = panel.value(selected);
      const lastX = toTimeX(time);
      const lastY = panel.toY(lastValue);
      context.fillStyle = panel.color;
      context.beginPath();
      context.arc(lastX, lastY, 7, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = palette.text;
      context.textAlign = "right";
      context.fillText(format(lastValue), right - 10, lastY - 10);
    }

    context.fillStyle = palette.muted;
    context.textAlign = "left";
    context.fillText("0 s", left, height - 22);
    context.textAlign = "right";
    context.fillText(`${format(time)} s`, right, height - 22);
    context.fillText(vi ? "thời gian t" : "time t", right, height - 3);
  }, [acceleration, carImageRef, carReady, colourSupport, initialVelocity, objectAppearance, time, vi]);

  function reset() {
    setInitialVelocity(defaults.initialVelocity);
    setAcceleration(defaults.acceleration);
    setTime(defaults.time);
    setResetAnnouncement(
      t("Values reset to initial velocity 0 metres per second, acceleration 2 metres per second squared, and time 4 seconds.", "Đã đặt lại: vận tốc ban đầu 0 m/s, gia tốc 2 m/s² và thời gian 4 giây."),
    );
  }

  function updateValue(setter: (value: number) => void) {
    return (value: number) => {
      setter(value);
      setResetAnnouncement("");
    };
  }

  return (
    <section className="motion-explorer" aria-labelledby="motion-explorer-title">
      <h3 id="motion-explorer-title">{t("Explore the constant-acceleration graphs", "Khám phá các đồ thị gia tốc không đổi")}</h3>
      <p>
        {t("This interactive version of the lecture's static graphs connects acceleration, velocity, and displacement without requiring visual graph reading. The canvas and semantic table both cover 0 to the selected time.", "Phiên bản tương tác của các đồ thị tĩnh trong bài giảng liên hệ gia tốc, vận tốc và độ dời mà không bắt buộc phải đọc đồ thị bằng mắt. Cả vùng vẽ và bảng ngữ nghĩa đều thể hiện từ 0 đến thời điểm đã chọn.")}
      </p>
      <ConceptStudio
        titleId="constant-acceleration-studio-title"
        title={t("Constant acceleration", "Gia tốc không đổi")}
        summary={
          <>
            {t("At", "Tại")} {format(time)} s · v = {format(current.velocity)} m/s · Δx = {format(current.displacement)} m
          </>
        }
        formula={
          <math display="block">
            <mtable rowspacing="0.8em">
              <mtr>
                <mtd><mi>v</mi></mtd>
                <mtd><mo>=</mo></mtd>
                <mtd><msub><mi>v</mi><mn>0</mn></msub><mo>+</mo><mi>a</mi><mi>t</mi></mtd>
              </mtr>
              <mtr>
                <mtd><mi>Δx</mi></mtd>
                <mtd><mo>=</mo></mtd>
                <mtd><msub><mi>v</mi><mn>0</mn></msub><mi>t</mi><mo>+</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi><msup><mi>t</mi><mn>2</mn></msup></mtd>
              </mtr>
            </mtable>
          </math>
        }
        controls={
          <>
            <ObjectAppearanceControl legend={t("Object appearance", "Cách hiển thị vật")} name="constant-object-appearance" value={objectAppearance} pointLabel={t("Point", "Điểm")} alternativeLabel={t("Car", "Xe")} onChange={setObjectAppearance} />
            <VariableControl id="initial-velocity" symbol="v₀" name={t("initial velocity", "vận tốc ban đầu")} unit="m/s" value={initialVelocity} minimum={-10} maximum={30} step={1} onChange={updateValue(setInitialVelocity)} />
            <VariableControl id="acceleration" symbol="a" name={t("acceleration", "gia tốc")} unit="m/s²" value={acceleration} minimum={-10} maximum={10} step={0.5} onChange={updateValue(setAcceleration)} />
            <VariableControl id="elapsed-time" symbol="t" name={t("selected time", "thời gian đã chọn")} unit="s" value={time} minimum={0} maximum={10} step={0.5} onChange={updateValue(setTime)} />
          </>
        }
        result={
          <p>
            {resetAnnouncement ? `${resetAnnouncement} ` : ""}
            v = {format(initialVelocity)} + ({format(acceleration)} × {format(time)}) = {format(current.velocity)} m/s; Δx = {format(current.displacement)} m.
          </p>
        }
        actions={<button className="studio-reset" type="button" disabled={isDefault} onClick={reset}>{t("Reset values", "Đặt lại giá trị")}</button>}
        visual={<canvas ref={canvasRef} className="studio-canvas" width="800" height="500" aria-hidden="true" />}
        description={
          <p>
            {t("The upper diagram places the selected point or car at the same calculated displacement and points the velocity arrow in its direction of travel. Changing the object appearance does not change the motion. The lower solid and dashed plots show velocity and displacement over exactly the selected interval.", "Sơ đồ phía trên đặt điểm hoặc xe đã chọn tại cùng một độ dời đã tính và hướng mũi tên vận tốc theo chiều chuyển động. Thay đổi cách hiển thị vật không làm thay đổi chuyển động. Các đường liền và đứt nét phía dưới biểu diễn vận tốc và độ dời đúng trong khoảng thời gian đã chọn.")}
          </p>
        }
        tableRegionLabel={t("Constant acceleration current values", "Các giá trị gia tốc không đổi hiện tại")}
        table={
          <table>
            <caption>{t("Values equivalent to the velocity and displacement plots", "Các giá trị tương đương với đồ thị vận tốc và độ dời")}</caption>
            <thead>
              <tr><th scope="col">{t("Time (s)", "Thời gian (s)")}</th><th scope="col">{t("Acceleration (m/s²)", "Gia tốc (m/s²)")}</th><th scope="col">{t("Velocity (m/s)", "Vận tốc (m/s)")}</th><th scope="col">{t("Displacement (m)", "Độ dời (m)")}</th></tr>
            </thead>
            <tbody>
              {sampleTimes.map((sampleTime) => {
                const sample = motionAt(initialVelocity, acceleration, sampleTime);
                return (
                  <tr key={sampleTime}>
                    <th scope="row">{format(sampleTime)}</th>
                    <td>{format(sample.acceleration)}</td>
                    <td>{format(sample.velocity)}</td>
                    <td>{format(sample.displacement)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        }
      />
    </section>
  );
}
