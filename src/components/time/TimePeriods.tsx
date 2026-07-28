import { useMemo } from "react";
import { type Period, getPeriods } from "../../periods";
import TimeBlock from "./TimeBlock";
import useNow from "../../useNow";
import "./time.css";

const TimePeriods = () => {
  const now = useNow();
  const periods: Period[] = useMemo(() => getPeriods(now), [now]);
  return (
    <section className="period-rail" aria-label="Current time progress">
      <div
        className="time-grid"
        style={{
          display: "grid",
          borderTop: "1px solid #292929",
          borderLeft: "1px solid #292929",
        }}
      >
        {periods.map((period) => (
          <TimeBlock key={period.label} now={now} period={period} />
        ))}
      </div>
    </section>
  );
};

export default TimePeriods;
