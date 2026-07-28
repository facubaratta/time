import { useId } from "react"
import { MIN_ACTIVITY_HOURS, formatHours } from "../dailyTimeUtils"
import type { Activity } from "../dailyTimeUtils"

type Props = {
  activity: Activity
  control: "number" | "slider"
  maxHours?: number
  period: "day" | "week"
  periodLocked?: boolean
  onChange: (hours: string) => void
  onPeriodChange: (period: "day" | "week") => void
}

function HoursControl({
  activity,
  control,
  maxHours,
  period,
  periodLocked = false,
  onChange,
  onPeriodChange,
}: Props) {
  const inputId = useId()
  const activityName = activity.label || "activity"
  const isSlider = control === "slider"

  return (
    <>
      {isSlider && (
        <output
          htmlFor={inputId}
          style={{
            gridArea: "value",
            color: "#aaa",
            fontSize: 14,
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}
        >
          {formatHours(activity.hours)}
          <span style={{ color: "#666", fontWeight: 400 }}>
            {" "}
            / {formatHours(Math.max(0, (maxHours ?? 0) - activity.hours))} left
          </span>
        </output>
      )}
      <label
          style={{
            minWidth: 0,
            gridArea: "hours",
          display: isSlider ? "block" : "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <input
          id={inputId}
          aria-label={`Hours spent on ${activityName}`}
          type={isSlider ? "range" : "number"}
          min={isSlider ? 0 : MIN_ACTIVITY_HOURS}
          max={isSlider ? Math.min(12, maxHours ?? 12) : maxHours}
          step={isSlider ? "0.1" : "0.5"}
          value={activity.hours}
          style={
            isSlider
              ? {
                  width: "100%",
                  height: 22,
                  display: "block",
                  margin: 0,
                  cursor: "pointer",
                  accentColor: activity.color,
                }
              : {
                  width: 84,
                  padding: "6px 6px 6px 10px",
                  margin: 0,
                  border: "1px solid #3a3a3a",
                  borderRadius: 4,
                  background: "#111",
                  color: "#fff",
                  colorScheme: "dark",
                  fontVariantNumeric: "tabular-nums",
                }
          }
          onChange={(event) => onChange(event.target.value)}
        />
        {!isSlider && (
          <select
            className="daily-activity__period"
            aria-label={`Frequency for ${activityName}`}
            value={period}
            disabled={periodLocked}
            style={{
              minWidth: 104,
              flex: 1,
              padding: "6px 26px 6px 8px",
              border: "1px solid #3a3a3a",
              borderRadius: 4,
              background: "#111",
              color: "#fff",
              colorScheme: "dark",
            }}
            onChange={(event) =>
              onPeriodChange(event.target.value as "day" | "week")
            }
          >
            <option value="day">per day</option>
            <option value="week">per week</option>
          </select>
        )}
      </label>
    </>
  )
}

export default HoursControl
