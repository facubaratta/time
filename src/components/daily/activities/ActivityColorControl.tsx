import type { Activity } from "../dailyTimeUtils"

function ActivityColorControl({
  activity,
  onChange,
}: {
  activity: Activity
  onChange: (color: string) => void
}) {
  const activityName = activity.label || "activity"

  if (activity.visual === "night") {
    return (
      <span
        aria-label="Night sky"
        style={{
          width: 30,
          height: 30,
          gridArea: "color",
          display: "grid",
          placeItems: "center",
          border: "1px solid #444",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #080d22, #172453)",
          color: "#fff3bd",
          fontSize: 19,
        }}
      >
        ☾
      </span>
    )
  }

  return (
    <label
      className="daily-activity__color"
      title={`Choose a color for ${activityName}`}
      style={{ gridArea: "color" }}
    >
      <input
        aria-label={`Color for ${activityName}`}
        type="color"
        value={activity.color}
        style={{
          width: 30,
          height: 30,
          display: "block",
          padding: 0,
          overflow: "hidden",
          border: "1px solid #444",
          borderRadius: "50%",
          background: "transparent",
          cursor: "pointer",
        }}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

export default ActivityColorControl
