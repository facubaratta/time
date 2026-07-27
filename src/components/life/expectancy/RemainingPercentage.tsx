const RemainingPercentage = ({ elapsed }: { elapsed: number | null }) => (
  <div className="remaining-percentage">
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
      Estimated time remaining
    </span>
    <strong
      style={{
        display: "block",
        marginTop: 4,
        fontSize: 44,
        fontWeight: 400,
        letterSpacing: "-0.06em",
        lineHeight: 0.9,
      }}
    >
      {elapsed !== null ? `${Math.floor(100 - elapsed)}%` : "—"}
    </strong>
  </div>
);

export default RemainingPercentage
