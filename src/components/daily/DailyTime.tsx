import { useMemo } from "react";
import ActivityList from "./activities/ActivityList";
import { calculateDailyTotals } from "./dailyTimeUtils";
import { timeStore, useTimeStore } from "../../timeStore";
import "./daily.css";

function DailyTime() {
  const { obligations, timeWasters } = useTimeStore();

  const totals = useMemo(() => {
    return calculateDailyTotals(obligations, timeWasters);
  }, [obligations, timeWasters]);

  return (
    <section id="day" className="daily-chapter" aria-label="Daily time settings">
      <div className="daily-columns">
        <ActivityList
          eyebrow="Must do"
          title="Obligations"
          hoursControl="number"
          defaultColor="#32b6ff"
          activities={obligations}
          totalHoursUsed={totals.required + totals.wasted}
          onChange={timeStore.setObligations}
        />
        <ActivityList
          eyebrow="Could reclaim"
          title="Time wasters"
          hoursControl="slider"
          defaultColor="#ff557a"
          activities={timeWasters}
          totalHoursUsed={totals.required + totals.wasted}
          onChange={timeStore.setTimeWasters}
        />
      </div>
    </section>
  );
}

export default DailyTime;
