import ActivityRow from "./ActivityRow";
import { formatHours, totalActivityHours } from "../dailyTimeUtils";
import type { Activity } from "../dailyTimeUtils";

type Props = {
  title: string;
  eyebrow: string;
  defaultColor: string;
  activities: Activity[];
  onChange: (activities: Activity[]) => void;
};

function ActivityList({
  title,
  eyebrow,
  defaultColor,
  activities,
  onChange,
}: Props) {
  const updateActivity = (
    id: number,
    field: "label" | "hours" | "color",
    value: string,
  ) => {
    onChange(
      activities.map((activity) =>
        activity.id === id
          ? {
              ...activity,
              [field]:
                field === "hours"
                  ? Math.max(0, Number(value) || 0)
                  : value,
            }
          : activity,
      ),
    );
  };

  const removeActivity = (id: number) => {
    onChange(activities.filter((activity) => activity.id !== id));
  };

  const addActivity = () => {
    onChange([
      ...activities,
      { id: Date.now(), label: "", hours: 1, color: defaultColor },
    ]);
  };

  return (
    <div
      className="daily-list"
      style={{ minWidth: 0, padding: "clamp(20px, 3vw, 32px)" }}
    >
      <div
        style={{
          minHeight: 52,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 24,
          marginBottom: 18,
        }}
      >
        <div>
          <span
            style={{
              display: "block",
              marginBottom: 8,
              color: "#777",
              fontSize: 11,
              fontWeight: 650,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </span>
          <h3 style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
            {title}
          </h3>
        </div>
        <strong
          style={{
            color: "#888",
            fontSize: 13,
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          {formatHours(totalActivityHours(activities))}
        </strong>
      </div>

      <div style={{ borderTop: "1px solid #2c2c2c" }}>
        {activities.map((activity, index) => (
          <ActivityRow
            key={activity.id}
            activity={activity}
            groupTitle={title}
            index={index}
            onChange={updateActivity}
            onRemove={removeActivity}
          />
        ))}
      </div>

      <button
        className="daily-add"
        type="button"
        onClick={addActivity}
      >
        <span aria-hidden="true">＋</span> Add activity
      </button>
    </div>
  );
}

export default ActivityList;
