import {
  DAY_HOURS,
  averageDailyHours,
  formatHours,
} from "../dailyTimeUtils"
import type { Activity } from "../dailyTimeUtils"
import NightSky, { NIGHT_SKY_BACKGROUND } from "./NightSky"
import TimeLeft from "./TimeLeft"

function DailyBar({
  activities,
  remaining,
}: {
  activities: Activity[]
  remaining: number
}) {
  const freePercentage = Math.min(100, (remaining / DAY_HOURS) * 100)
  const ariaLabel = `${activities
    .map(
      (activity) =>
        `${activity.label || "Unnamed activity"}: ${formatHours(averageDailyHours(activity))} daily average`,
    )
    .join(", ")}, ${formatHours(remaining)} left`

  return (
    <div
      aria-label={ariaLabel}
      role="img"
      style={{
        height: 104,
        position: "relative",
        display: "flex",
        overflow: "hidden",
        border: "1px solid #3b3b3b",
        background: "#080808",
      }}
    >
      {activities.map((activity) => (
        <span
          key={activity.id}
          title={`${activity.label || "Unnamed activity"} · ${formatHours(averageDailyHours(activity))} daily average`}
          style={{
            height: "100%",
            flex: "0 0 auto",
            position: "relative",
            overflow: "hidden",
            background:
              activity.visual === "night"
                ? NIGHT_SKY_BACKGROUND
                : activity.color,
            flexBasis: `${(averageDailyHours(activity) / DAY_HOURS) * 100}%`,
            transition: "flex-basis 220ms ease",
          }}
        >
          {activity.visual === "night" && <NightSky />}
        </span>
      ))}
      <span
        style={{
          height: "100%",
          flex: "0 0 auto",
          flexBasis: `${freePercentage}%`,
          background: "#111",
          transition: "flex-basis 220ms ease",
        }}
      />
      <TimeLeft remaining={remaining} />
    </div>
  )
}

export default DailyBar
