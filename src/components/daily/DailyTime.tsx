import { useMemo, useState } from "react";
import ActivityList from "./ActivityList";
import { calculateDailyTotals } from "./dailyTimeUtils";
import DailySummary from "./DailySummary";
import type { Activity } from "./dailyTimeUtils";
import "./daily.css";

function DailyTime() {
  const [obligations, setObligations] = useState<Activity[]>([
    { id: 1, label: "Sleep", hours: 8, color: "#7c6cff" },
    { id: 2, label: "Work", hours: 8, color: "#32b6ff" },
    { id: 3, label: "Meals & chores", hours: 2, color: "#45d49a" },
  ]);
  const [timeWasters, setTimeWasters] = useState<Activity[]>([
    { id: 4, label: "TikTok", hours: 1, color: "#ff557a" },
    { id: 5, label: "TV", hours: 1, color: "#ffad42" },
  ]);

  const totals = useMemo(() => {
    return calculateDailyTotals(obligations, timeWasters);
  }, [obligations, timeWasters]);

  return (
    <section aria-label="Daily time">
      <DailySummary
        totals={totals}
        activities={[...obligations, ...timeWasters]}
      />

      <div
        className="daily-columns"
        style={{
          display: "grid",
          borderRight: "1px solid #333",
          borderBottom: "1px solid #333",
          borderLeft: "1px solid #333",
        }}
      >
        <ActivityList
          eyebrow="Must do"
          title="Obligations"
          defaultColor="#32b6ff"
          activities={obligations}
          onChange={setObligations}
        />
        <ActivityList
          eyebrow="Could reclaim"
          title="Time wasters"
          defaultColor="#ff557a"
          activities={timeWasters}
          onChange={setTimeWasters}
        />
      </div>
    </section>
  );
}

export default DailyTime;
