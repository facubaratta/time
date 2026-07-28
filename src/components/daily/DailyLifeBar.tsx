import { useMemo } from "react";
import { useTimeStore } from "../../timeStore";
import { calculateDailyTotals } from "./dailyTimeUtils";
import DailySummary from "./summary/DailySummary";
import "./daily.css";

function DailyLifeBar() {
  const { obligations, timeWasters } = useTimeStore();
  const activities = [...obligations, ...timeWasters];
  const totals = useMemo(
    () => calculateDailyTotals(obligations, timeWasters),
    [obligations, timeWasters],
  );

  return (
    <section className="daily-life-bar" aria-label="Daily time allocation">
      <DailySummary totals={totals} activities={activities} />
    </section>
  );
}

export default DailyLifeBar;
