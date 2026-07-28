import type { Activity } from "../dailyTimeUtils";

function Swatch({ activity }: { activity?: Activity }) {
  return (
    <i
      style={{
        background: activity
          ? activity.visual === "night"
            ? "linear-gradient(135deg, #080d22, #2c407d)"
            : activity.color
          : "#111",
      }}
    />
  );
}

function ActivityLegend({ activities }: { activities: Activity[] }) {
  return (
    <div className="daily-summary__legend">
      {activities.map((activity) => (
        <span key={activity.id}>
          <Swatch activity={activity} />
          {activity.label || "Unnamed"}
        </span>
      ))}
      <span>
        <Swatch />
        Time left
      </span>
    </div>
  );
}

export default ActivityLegend;
