export const MINUTE = 60 * 1000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const WEEK = 7 * DAY;

export const progress = (now: Date, start: Date, end: Date) => {
  const startTime = start.getTime();
  const endTime = end.getTime();
  if (endTime <= startTime) return now.getTime() < endTime ? 0 : 100;

  const value =
    ((now.getTime() - startTime) / (endTime - startTime)) * 100;
  return Math.min(100, Math.max(0, value));
};
