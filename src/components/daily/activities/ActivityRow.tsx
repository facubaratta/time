import { useId } from "react";
import { formatHours } from "../dailyTimeUtils";
import type { Activity } from "../dailyTimeUtils";

type EditableField = "label" | "hours" | "color";

const visuallyHidden = {
  width: 1,
  height: 1,
  padding: 0,
  position: "absolute",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
} as const;

type Props = {
  activity: Activity;
  groupTitle: string;
  index: number;
  onChange: (id: number, field: EditableField, value: string) => void;
  onRemove: (id: number) => void;
};

function ActivityRow({
  activity,
  groupTitle,
  index,
  onChange,
  onRemove,
}: Props) {
  const sliderId = useId();
  const activityName = activity.label || "activity";

  return (
    <div
      className="daily-activity"
      style={{
        minWidth: 0,
        minHeight: 78,
        display: "grid",
        gridTemplateColumns: "34px minmax(0, 1fr) max-content 34px",
        gridTemplateAreas:
          '"color name value remove" "color slider slider remove"',
        alignItems: "center",
        columnGap: 10,
        borderBottom: "1px solid #2c2c2c",
      }}
    >
      <label
        className="daily-activity__color"
        title={`Choose a color for ${activityName}`}
        style={{ gridArea: "color" }}
      >
        <span style={visuallyHidden}>{`Color for ${activityName}`}</span>
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
          onChange={(event) =>
            onChange(activity.id, "color", event.target.value)
          }
        />
      </label>
      <label style={{ gridArea: "name" }}>
        <span style={visuallyHidden}>
          {`${groupTitle} activity ${index + 1}`}
        </span>
        <input
          aria-label={`${groupTitle} activity ${index + 1}`}
          value={activity.label}
          placeholder="Name activity"
          style={{
            minWidth: 0,
            width: "100%",
            padding: "2px 0 6px",
            border: 0,
            outline: 0,
            background: "transparent",
            color: "#fff",
          }}
          onChange={(event) =>
            onChange(activity.id, "label", event.target.value)
          }
        />
      </label>
      <output
        htmlFor={sliderId}
        style={{
          gridArea: "value",
          color: "#aaa",
          fontSize: 11,
          whiteSpace: "nowrap",
        }}
      >
        {formatHours(activity.hours)}
      </output>
      <button
        className="daily-activity__remove"
        type="button"
        aria-label={`Remove ${activityName}`}
        onClick={() => onRemove(activity.id)}
        style={{ gridArea: "remove" }}
      >
        ×
      </button>
      <label style={{ minWidth: 0, gridArea: "slider" }}>
        <span style={visuallyHidden}>{`Hours spent on ${activityName}`}</span>
        <input
          id={sliderId}
          aria-label={`Hours spent on ${activityName}`}
          type="range"
          min="0"
          max="24"
          step="0.25"
          value={activity.hours}
          style={{
            width: "100%",
            height: 22,
            display: "block",
            margin: 0,
            cursor: "pointer",
            accentColor: activity.color,
          }}
          onChange={(event) =>
            onChange(activity.id, "hours", event.target.value)
          }
        />
      </label>
    </div>
  );
}

export default ActivityRow;
