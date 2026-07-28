import {
  DAY_HOURS,
  NIGHT_SKY_BACKGROUND,
  averageDailyHours,
  formatHours,
} from "../dailyTimeUtils";
import type { Activity } from "../dailyTimeUtils";
import NightSky from "./NightSky";
import TimeLeft from "./TimeLeft";

function DailyBar({
  activities,
  remaining,
}: {
  activities: Activity[];
  remaining: number;
}) {
  const freePercentage = Math.min(100, (remaining / DAY_HOURS) * 100);
  const ariaLabel = `${activities
    .map(
      (activity) =>
        `${activity.label || "Unnamed activity"}: ${formatHours(averageDailyHours(activity))} daily average`,
    )
    .join(", ")}, ${formatHours(remaining)} left`;

  return (
    <div className="daily-bar" aria-label={ariaLabel} role="img">
      {activities.map((activity) => (
        <span
          key={activity.id}
          title={`${activity.label || "Unnamed activity"} · ${formatHours(averageDailyHours(activity))} daily average`}
          style={{
            background:
              activity.visual === "night"
                ? NIGHT_SKY_BACKGROUND
                : activity.color,
            flexBasis: `${(averageDailyHours(activity) / DAY_HOURS) * 100}%`,
          }}
        >
          {activity.visual === "night" && <NightSky />}
        </span>
      ))}
      <span
        className="daily-bar__free"
        style={{ flexBasis: `${freePercentage}%` }}
      />
      <TimeLeft remaining={remaining} />
    </div>
  );
}

export default DailyBar;
