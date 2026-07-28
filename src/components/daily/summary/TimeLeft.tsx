import { formatHours } from "../dailyTimeUtils"

function TimeLeft({ remaining }: { remaining: number }) {
  return (
    <div
      aria-live="polite"
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "14px clamp(14px, 3vw, 24px)",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          padding: "9px 12px",
          background: "rgba(0, 0, 0, 0.82)",
          textAlign: "right",
        }}
      >
        <span
          style={{
            display: "block",
            color: "#aaa",
            fontSize: 10,
            fontWeight: 650,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Daily time left
        </span>
        <strong
          style={{
            display: "block",
            marginTop: 4,
            fontSize: "clamp(24px, 4vw, 38px)",
            fontWeight: 650,
            letterSpacing: "-0.05em",
            lineHeight: 1,
          }}
        >
          {formatHours(remaining)}
          <small
            style={{
              color: "#777",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: 0,
            }}
          >
            {" "}
            / day
          </small>
        </strong>
      </div>
    </div>
  )
}

export default TimeLeft
