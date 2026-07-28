const RemainingTime = ({
  remainingYears,
  remainingPercentage,
}: {
  remainingYears: number | null;
  remainingPercentage: number | null;
}) => (
  <div
    className="remaining-time"
    style={{
      minHeight: 58,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <span
      style={{
        display: "block",
        color: "#777",
        fontSize: 10,
        lineHeight: 1,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      Time left
    </span>
    <div className="remaining-time__value">
      <strong>
        {remainingYears === null
          ? "—"
          : `${new Intl.NumberFormat(undefined, {
              maximumFractionDigits: 1,
            }).format(Math.max(0, remainingYears))} years`}
      </strong>
      {remainingPercentage !== null && (
        <span>{Math.floor(Math.max(0, remainingPercentage))}% remaining</span>
      )}
    </div>
  </div>
);

export default RemainingTime;
