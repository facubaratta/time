import { useMemo } from "react";
import { type Period, getPeriods } from "../../periods";
import TimeBlock from "./TimeBlock";
import useNow from "../../useNow";

const TimePeriods = () => {
  const now = useNow();
  const periods: Period[] = useMemo(() => getPeriods(now), [now]);
  return (
    <section>
      <div className="time-grid">
        {periods.map((period) => (
          <TimeBlock key={period.label} now={now} period={period} />
        ))}
      </div>
    </section>
  );
};

export default TimePeriods;
