import type { Activity } from "../dailyTimeUtils"
import ActivityColorControl from "./ActivityColorControl"
import HoursControl from "./HoursControl"

export type EditableField = "label" | "hours" | "color"

type Props = {
  activity: Activity
  groupTitle: string
  hoursControl: "number" | "slider"
  maxHours?: number
  index: number
  onChange: (id: number, field: EditableField, value: string) => void
  onPeriodChange: (id: number, period: "day" | "week") => void
  onRemove: (id: number) => void
}

function ActivityRow({
  activity,
  groupTitle,
  hoursControl,
  maxHours,
  index,
  onChange,
  onPeriodChange,
  onRemove,
}: Props) {
  const activityName = activity.label || "activity"

  return (
    <div
      className="daily-activity"
      style={{
        minWidth: 0,
        minHeight: 60,
        display: "grid",
        gridTemplateColumns:
          hoursControl === "slider"
            ? "34px minmax(0, 1fr) max-content 34px"
            : "34px minmax(0, 1fr) 194px 34px",
        gridTemplateAreas:
          hoursControl === "slider"
            ? '"color name value remove" "color hours hours remove"'
            : '"color name hours remove"',
        alignItems: "center",
        columnGap: 10,
        borderBottom: "1px solid #2c2c2c",
      }}
    >
      <ActivityColorControl
        activity={activity}
        onChange={(color) => onChange(activity.id, "color", color)}
      />
      <label style={{ gridArea: "name" }}>
        <input
          aria-label={`${groupTitle} activity ${index + 1}`}
          value={activity.label}
          placeholder="Name activity"
          readOnly={activity.kind === "sleep"}
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
      {activity.locked ? (
        <span
          aria-label={`${activityName} cannot be removed`}
          title={`${activityName} cannot be removed`}
          style={{
            gridArea: "remove",
            color: "#666",
            fontSize: 13,
            textAlign: "center",
          }}
        >
          ◇
        </span>
      ) : (
        <button
          className="daily-activity__remove"
          type="button"
          aria-label={`Remove ${activityName}`}
          onClick={() => onRemove(activity.id)}
          style={{ gridArea: "remove" }}
        >
          ×
        </button>
      )}
      <HoursControl
        activity={activity}
        control={hoursControl}
        maxHours={maxHours}
        period={activity.period ?? "day"}
        periodLocked={activity.kind === "sleep"}
        onChange={(hours) => onChange(activity.id, "hours", hours)}
        onPeriodChange={(period) =>
          onPeriodChange(activity.id, period)
        }
      />
    </div>
  )
}

export default ActivityRow
