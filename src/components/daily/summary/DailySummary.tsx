import { averageDailyHours } from "../dailyTimeUtils"
import type { Activity, DailyTotals } from "../dailyTimeUtils"
import ActivityLegend from "./ActivityLegend"
import DailyBar from "./DailyBar"

type Props = {
  totals: DailyTotals
  activities: Activity[]
}

function DailySummary({ totals, activities }: Props) {
  const activeActivities = activities.filter(
    (activity) => averageDailyHours(activity) > 0,
  )

  return (
    <div
      style={{
        padding: "clamp(20px, 3vw, 32px)",
        border: "1px solid #333",
      }}
    >
      <DailyBar activities={activeActivities} remaining={totals.remaining} />
      <div className="daily-summary__meta">
        <ActivityLegend activities={activeActivities} />
        <p className="daily-summary__disclaimer">
          <span aria-hidden="true">i</span>
          Weekly entries are averaged across all seven days.
        </p>
      </div>
    </div>
  )
}

export default DailySummary
