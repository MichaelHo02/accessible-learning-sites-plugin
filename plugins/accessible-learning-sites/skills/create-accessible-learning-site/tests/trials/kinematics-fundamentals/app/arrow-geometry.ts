export type ArrowBounds = Readonly<{
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}>;

export type ArrowPoint = Readonly<{ x: number; y: number }>;

export type ArrowGeometry = Readonly<{
  start: ArrowPoint;
  end: ArrowPoint;
  head: readonly [ArrowPoint, ArrowPoint, ArrowPoint];
  length: number;
  headLength: number;
}>;

export function boundedArrowGeometry(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  bounds: ArrowBounds,
): ArrowGeometry | null {
  const values = [startX, startY, endX, endY, bounds.minX, bounds.maxX, bounds.minY, bounds.maxY];
  if (!values.every(Number.isFinite)) return null;

  const minX = Math.min(bounds.minX, bounds.maxX);
  const maxX = Math.max(bounds.minX, bounds.maxX);
  const minY = Math.min(bounds.minY, bounds.maxY);
  const maxY = Math.max(bounds.minY, bounds.maxY);
  if (startX < minX || startX > maxX || startY < minY || startY > maxY) return null;

  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const desiredLength = Math.hypot(deltaX, deltaY);
  if (desiredLength < 0.5) return null;
  const clamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, value));
  const unitX = deltaX / desiredLength;
  const unitY = deltaY / desiredLength;
  const length = Math.min(
    desiredLength,
    unitX > 0 ? (maxX - startX) / unitX : unitX < 0 ? (minX - startX) / unitX : desiredLength,
    unitY > 0 ? (maxY - startY) / unitY : unitY < 0 ? (minY - startY) / unitY : desiredLength,
  );
  if (length < 0.5) return null;

  const fittedEndX = clamp(startX + unitX * length, minX, maxX);
  const fittedEndY = clamp(startY + unitY * length, minY, maxY);
  const angle = Math.atan2(fittedEndY - startY, fittedEndX - startX);
  const headLength = Math.min(11, length * 0.45);
  const headLeft = {
    x: clamp(fittedEndX - headLength * Math.cos(angle - Math.PI / 6), minX, maxX),
    y: clamp(fittedEndY - headLength * Math.sin(angle - Math.PI / 6), minY, maxY),
  };
  const headRight = {
    x: clamp(fittedEndX - headLength * Math.cos(angle + Math.PI / 6), minX, maxX),
    y: clamp(fittedEndY - headLength * Math.sin(angle + Math.PI / 6), minY, maxY),
  };

  return {
    start: { x: startX, y: startY },
    end: { x: fittedEndX, y: fittedEndY },
    head: [{ x: fittedEndX, y: fittedEndY }, headLeft, headRight],
    length,
    headLength,
  };
}
