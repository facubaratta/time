import { DAY, HOUR, MINUTE, WEEK } from "../../../time";

const formatNumber = (value: number) =>
  new Intl.NumberFormat().format(Math.max(0, Math.floor(value)));

function Stat({ label, value }: { label: string; value: number }) {
  const text = formatNumber(value);
  const fontSize = 140 / text.length;
  return (
    <div
      style={{
        minWidth: 0,
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#000",
        containerType: "inline-size",
      }}
    >
      <strong
        style={{
          display: "block",
          maxWidth: "100%",
          overflow: "hidden",
          whiteSpace: "nowrap",
          fontFamily:
            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
          fontSize: `clamp(14px, ${fontSize}cqw, 30px)`,
          fontVariantNumeric: "tabular-nums",
          fontWeight: 450,
          letterSpacing: "-0.055em",
          lineHeight: 0.95,
        }}
      >
        {text}
      </strong>
      <span
        style={{
          display: "block",
          marginTop: 18,
          color: "#888",
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.1em",
          lineHeight: 1.25,
          textTransform: "uppercase",
        }}
      >
        {label} left
      </span>
    </div>
  );
}

function LifeStats({ remaining }: { remaining: number }) {
  const days = remaining / DAY;
  const stats: Record<string, number> = {
    "Weeks / weekends": remaining / WEEK,
    Days: days,
    Hours: remaining / HOUR,
    Minutes: remaining / MINUTE,
    Seconds: remaining / 1000,
  };
  return (
    <div className="life-stats">
      {Object.entries(stats).map(([label, value]) => (
        <Stat key={label} label={label} value={value} />
      ))}
    </div>
  );
}

export default LifeStats;
