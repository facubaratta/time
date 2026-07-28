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
      <ActivityLegend activities={activeActivities} />
    </div>
  )
}

export default DailySummary
