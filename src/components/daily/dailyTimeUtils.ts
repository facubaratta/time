export const DAY_HOURS = 24;

export type Activity = {
  id: number;
  label: string;
  hours: number;
  color: string;
};

export type DailyTotals = {
  required: number;
  wasted: number;
  remaining: number;
};

export function formatHours(value: number) {
  const rounded = Math.round(value * 10) / 10;
  return `${rounded} ${rounded === 1 ? "hour" : "hours"}`;
}

export function totalActivityHours(activities: Activity[]) {
  return activities.reduce((total, activity) => total + activity.hours, 0);
}

export function calculateDailyTotals(
  obligations: Activity[],
  timeWasters: Activity[],
): DailyTotals {
  const required = totalActivityHours(obligations);
  const wasted = totalActivityHours(timeWasters);

  return {
    required,
    wasted,
    remaining: DAY_HOURS - required - wasted,
  };
}
