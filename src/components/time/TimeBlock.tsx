import type { Period } from "../../periods";
import { progress } from "../../time";
import ProgressBar from "../ProgressBar";
import Label from "./Label";

const TimeBlock = ({ now, period }: { now: Date; period: Period }) => {
  const value = progress(now, period.start, period.end);
  return (
    <div
      className="time-block"
      style={{
        gridColumn: `span ${period.columns}`,
      }}
    >
      <div className="time-block__header">
        <Label {...period} />
        <span className="time-block__percentage">
          {Math.floor(value)}%
        </span>
      </div>
      <ProgressBar label={`${period.label} progress`} value={value} />
    </div>
  );
};

export default TimeBlock;
