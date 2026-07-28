export const DAY_HOURS = 24;

export type Activity = {
  id: number;
  label: string;
  hours: number;
  color: string;
  period?: "day" | "week";
  locked?: boolean;
  visual?: "night";
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
  return activities.reduce(
    (total, activity) => total + averageDailyHours(activity),
    0,
  );
}

export function averageDailyHours(activity: Activity) {
  return activity.hours * activityFrequency(activity);
}

export function activityFrequency(activity: Activity) {
  return activity.period === "week" ? 1 / 7 : 1;
}

export function formatAnnualDuration(dailyHours: number) {
  const days = (dailyHours * 365) / DAY_HOURS;
  const months = days / (365 / 12);
  const value = days >= 365 / 12 ? months : days;
  const rounded = Math.round(value * 10) / 10;
  const unit =
    days >= 365 / 12
      ? rounded === 1
        ? "month"
        : "months"
      : rounded === 1
        ? "day"
        : "days";

  return `${rounded} ${unit}`;
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
    remaining: Math.max(0, DAY_HOURS - required - wasted),
  };
}

export const defaultActivities: Record<"obligations" | "wasters", Activity[]> =
  {
    obligations: [
      {
        id: 1,
        label: "Sleep",
        hours: 8,
        color: "#7c6cff",
        period: "day",
        locked: true,
        visual: "night",
      },
      {
        id: 2,
        label: "Work",
        hours: 40,
        color: "#32b6ff",
        period: "week",
      },
      {
        id: 3,
        label: "Meals & chores",
        hours: 2,
        color: "#45d49a",
        period: "day",
      },
    ],
    wasters: [
      { id: 4, label: "TikTok", hours: 1, color: "#ff557a" },
      { id: 5, label: "TV", hours: 1, color: "#ffad42" },
    ],
  };
