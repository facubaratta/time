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
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: "1px solid #292929",
        borderBottom: "1px solid #292929",
      }}
    >
      <div
        className="time-block__header"
        style={{
          minWidth: 0,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <Label {...period} />
        <span
          style={{
            flex: "0 0 auto",
            fontSize: "clamp(18px, 3vw, 30px)",
            letterSpacing: "-0.05em",
          }}
        >
          {Math.floor(value)}%
        </span>
      </div>
      <ProgressBar label={`${period.label} progress`} value={value} />
    </div>
  );
};

export default TimeBlock;
