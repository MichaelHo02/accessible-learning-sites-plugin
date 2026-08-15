export function motionAt(initialVelocity: number, acceleration: number, time: number) {
  return {
    acceleration,
    velocity: initialVelocity + acceleration * time,
    displacement:
      initialVelocity * time + 0.5 * acceleration * time * time,
  };
}

export function sampleTimesThrough(time: number, intervals: number) {
  return time === 0
    ? [0]
    : Array.from({ length: intervals + 1 }, (_, index) =>
        (index / intervals) * time,
      );
}

export function projectileAt(
  time: number,
  horizontalVelocity = 20,
  initialHeight = 10,
) {
  const gravity = 9.81;
  return {
    horizontalDistance: horizontalVelocity * time,
    height: initialHeight - 0.5 * gravity * time * time,
    verticalVelocity: -gravity * time,
  };
}

export function secantAt(firstTime: number, secondTime: number) {
  const firstPosition = firstTime * firstTime;
  const secondPosition = secondTime * secondTime;

  return {
    firstTime,
    firstPosition,
    secondPosition,
    averageVelocity:
      (secondPosition - firstPosition) / (secondTime - firstTime),
    instantaneousVelocity: 2 * firstTime,
  };
}

export function billVelocityRelativeToAmy(
  carlosRelativeToAmy: number,
  carlosRelativeToBill: number,
) {
  return carlosRelativeToAmy - carlosRelativeToBill;
}
