import ProgressBar from "../../ProgressBar";

export interface Cycle {
  label: string;
  detail: string;
  value: number;
}

const LifeCycle = ({ label, detail, value }: Cycle) => (
  <div
    className="life-cycle"
    style={{ minWidth: 0, border: "1px solid #333" }}
  >
    <div
      className="life-cycle__header"
      style={{
        minWidth: 0,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
      }}
    >
      <div>
        <strong style={{ display: "block", fontSize: 18 }}>{label}</strong>
        <span
          style={{
            display: "block",
            marginTop: 5,
            color: "#777",
            fontSize: 10,
          }}
        >
          {detail}
        </span>
      </div>
      <span
        style={{
          fontSize: 28,
          letterSpacing: "-0.05em",
        }}
      >
        {Math.floor(value)}%
      </span>
    </div>
    <ProgressBar label={`${label} progress`} value={value} />
  </div>
);

export default LifeCycle;
