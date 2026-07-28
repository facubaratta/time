import type { Activity } from "../dailyTimeUtils"

function Swatch({ activity }: { activity?: Activity }) {
  return (
    <i
      style={{
        width: 10,
        height: 10,
        display: "block",
        border: "1px solid #555",
        background: activity
          ? activity.visual === "night"
            ? "linear-gradient(135deg, #080d22, #2c407d)"
            : activity.color
          : "#111",
      }}
    />
  )
}

function ActivityLegend({ activities }: { activities: Activity[] }) {
  return (
    <div
      className="daily-summary__legend"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "16px 26px",
        color: "#888",
        fontSize: 11,
      }}
    >
      {activities.map((activity) => (
        <span
          key={activity.id}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <Swatch activity={activity} />
          {activity.label || "Unnamed"}
        </span>
      ))}
      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Swatch />
        Time left
      </span>
    </div>
  )
}

export default ActivityLegend
