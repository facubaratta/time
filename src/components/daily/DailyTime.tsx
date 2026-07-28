import { useMemo, useState } from "react";
import ActivityList from "./activities/ActivityList";
import { calculateDailyTotals, defaultActivities } from "./dailyTimeUtils";
import DailySummary from "./summary/DailySummary";
import "./daily.css";

function DailyTime() {
  const [obligations, setObligations] = useState(defaultActivities.obligations);
  const [timeWasters, setTimeWasters] = useState(defaultActivities.wasters);

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
          hoursControl="number"
          defaultColor="#32b6ff"
          activities={obligations}
          totalHoursUsed={totals.required + totals.wasted}
          onChange={setObligations}
        />
        <ActivityList
          eyebrow="Could reclaim"
          title="Time wasters"
          hoursControl="slider"
          defaultColor="#ff557a"
          activities={timeWasters}
          totalHoursUsed={totals.required + totals.wasted}
          onChange={setTimeWasters}
        />
      </div>
    </section>
  );
}

export default DailyTime;
