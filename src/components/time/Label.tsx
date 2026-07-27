import type { Period } from "../../periods";

const Label = (period: Period) => (
  <div>
    <strong
      style={{
        display: "block",
        fontSize: 22,
        fontWeight: 500,
      }}
    >
      {period.label}
    </strong>
    <span
      style={{
        display: "block",
        marginTop: 5,
        color: "#666",
        fontSize: 11,
      }}
    >
      {period.detail}
    </span>
  </div>
);

export default Label