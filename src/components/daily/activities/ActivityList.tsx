import ActivityRow from "./ActivityRow";
import {
  DAY_HOURS,
  MIN_ACTIVITY_HOURS,
  activityFrequency,
  averageDailyHours,
  formatHours,
  totalActivityHours,
} from "../dailyTimeUtils";
import type { Activity } from "../dailyTimeUtils";

type Props = {
  title: string;
  eyebrow: string;
  hoursControl: "number" | "slider";
  defaultColor: string;
  activities: Activity[];
  totalHoursUsed: number;
  onChange: (activities: Activity[]) => void;
};

function ActivityList({
  title,
  eyebrow,
  hoursControl,
  defaultColor,
  activities,
  totalHoursUsed,
  onChange,
}: Props) {
  const maxHoursFor = (activity: Activity) => {
    const frequency = activityFrequency(activity);
    if (frequency === 0) return undefined;

    const availableAverage =
      DAY_HOURS - totalHoursUsed + averageDailyHours(activity);
    return Math.max(0, availableAverage / frequency);
  };

  const updateActivity = (
    id: number,
    field: "label" | "hours" | "color",
    value: string,
  ) => {
    const currentActivity = activities.find((activity) => activity.id === id);
    const maxHours = currentActivity
      ? maxHoursFor(currentActivity)
      : undefined;

    onChange(
      activities.map((activity) =>
        activity.id === id
          ? {
              ...activity,
              [field]:
                field === "hours"
                  ? hoursControl === "slider"
                    ? Math.min(
                        12,
                        maxHours ?? 12,
                        Math.max(0, Number(value) || 0),
                      )
                    : Math.min(
                        maxHours ?? Number.POSITIVE_INFINITY,
                        Math.max(
                          MIN_ACTIVITY_HOURS,
                          Number(value) || MIN_ACTIVITY_HOURS,
                        ),
                      )
                  : value,
            }
          : activity,
      ),
    );
  };

  const updateActivityPeriod = (
    id: number,
    period: "day" | "week",
  ) => {
    onChange(
      activities.map((activity) => {
        if (activity.id !== id) return activity;

        const frequency = period === "week" ? 1 / 7 : 1;
        const otherDailyHours =
          totalHoursUsed - averageDailyHours(activity);
        const maxHours =
          frequency > 0
            ? Math.max(0, (DAY_HOURS - otherDailyHours) / frequency)
            : Number.POSITIVE_INFINITY;

        if (maxHours < MIN_ACTIVITY_HOURS) return activity;

        return {
          ...activity,
          period,
          hours: Math.min(activity.hours, maxHours),
        };
      }),
    );
  };

  const removeActivity = (id: number) => {
    onChange(
      activities.filter(
        (activity) => activity.id !== id || activity.locked,
      ),
    );
  };

  const addActivity = () => {
    const availableHours = Math.max(0, DAY_HOURS - totalHoursUsed);
    const initialHours =
      hoursControl === "slider"
        ? Math.min(1, availableHours)
        : MIN_ACTIVITY_HOURS;

    if (hoursControl === "number" && availableHours < initialHours) return;

    onChange([
      ...activities,
      {
        id: Date.now(),
        label: "",
        hours: initialHours,
        color: defaultColor,
        ...(hoursControl === "number" ? { period: "day" as const } : {}),
      },
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
            hoursControl={hoursControl}
            maxHours={maxHoursFor(activity)}
            index={index}
            onChange={updateActivity}
            onPeriodChange={updateActivityPeriod}
            onRemove={removeActivity}
          />
        ))}
      </div>

      <button
        className="daily-add"
        type="button"
        disabled={
          hoursControl === "number" &&
          DAY_HOURS - totalHoursUsed < MIN_ACTIVITY_HOURS
        }
        onClick={addActivity}
        style={{
          opacity:
            hoursControl === "number" &&
            DAY_HOURS - totalHoursUsed < MIN_ACTIVITY_HOURS
              ? 0.35
              : 1,
        }}
      >
        <span aria-hidden="true">＋</span> Add activity
      </button>
    </div>
  );
}

export default ActivityList;
