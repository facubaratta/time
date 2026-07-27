import { useId, useMemo, useState } from "react";

type Activity = {
  id: number;
  label: string;
  hours: number;
};

type ActivityListProps = {
  title: string;
  eyebrow: string;
  activities: Activity[];
  onChange: (activities: Activity[]) => void;
};

const DAY_HOURS = 24;

function formatHours(value: number) {
  const rounded = Math.round(value * 10) / 10;
  return `${rounded} ${rounded === 1 ? "hour" : "hours"}`;
}

function ActivityList({
  title,
  eyebrow,
  activities,
  onChange,
}: ActivityListProps) {
  const fieldId = useId();

  const updateActivity = (
    id: number,
    field: "label" | "hours",
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

  return (
    <div className="daily-list">
      <div className="daily-list__header">
        <div>
          <span className="daily-eyebrow">{eyebrow}</span>
          <h3>{title}</h3>
        </div>
        <strong>
          {formatHours(
            activities.reduce((total, activity) => total + activity.hours, 0),
          )}
        </strong>
      </div>

      <div className="daily-list__rows">
        {activities.map((activity, index) => (
          <div className="daily-activity" key={activity.id}>
            <label className="daily-activity__name">
              <span className="sr-only">{`${title} activity ${index + 1}`}</span>
              <input
                aria-label={`${title} activity ${index + 1}`}
                value={activity.label}
                placeholder="Name activity"
                onChange={(event) =>
                  updateActivity(activity.id, "label", event.target.value)
                }
              />
            </label>
            <label className="daily-activity__hours">
              <span className="sr-only">{`Hours spent on ${activity.label || "activity"}`}</span>
              <input
                aria-label={`Hours spent on ${activity.label || "activity"}`}
                type="number"
                min="0"
                max="24"
                step="0.25"
                value={activity.hours}
                onChange={(event) =>
                  updateActivity(activity.id, "hours", event.target.value)
                }
              />
              <span>hrs</span>
            </label>
            <button
              className="daily-activity__remove"
              type="button"
              aria-label={`Remove ${activity.label || "activity"}`}
              onClick={() =>
                onChange(
                  activities.filter((item) => item.id !== activity.id),
                )
              }
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button
        className="daily-add"
        type="button"
        onClick={() =>
          onChange([
            ...activities,
            { id: Date.now(), label: "", hours: 1 },
          ])
        }
      >
        <span aria-hidden="true">＋</span> Add activity
      </button>
      <span className="sr-only" id={fieldId}>
        Enter the average number of hours spent each day.
      </span>
    </div>
  );
}

function DailyTime() {
  const [obligations, setObligations] = useState<Activity[]>([
    { id: 1, label: "Sleep", hours: 8 },
    { id: 2, label: "Work", hours: 8 },
    { id: 3, label: "Meals & chores", hours: 2 },
  ]);
  const [timeWasters, setTimeWasters] = useState<Activity[]>([
    { id: 4, label: "TikTok", hours: 1 },
    { id: 5, label: "TV", hours: 1 },
  ]);

  const totals = useMemo(() => {
    const required = obligations.reduce(
      (total, activity) => total + activity.hours,
      0,
    );
    const wasted = timeWasters.reduce(
      (total, activity) => total + activity.hours,
      0,
    );
    return {
      required,
      wasted,
      used: required + wasted,
      remaining: DAY_HOURS - required - wasted,
    };
  }, [obligations, timeWasters]);

  const freePercentage = Math.max(
    0,
    Math.min(100, (totals.remaining / DAY_HOURS) * 100),
  );
  const requiredPercentage = Math.min(
    100,
    (totals.required / DAY_HOURS) * 100,
  );
  const wastedPercentage = Math.min(
    100 - requiredPercentage,
    (totals.wasted / DAY_HOURS) * 100,
  );
  const isOverbooked = totals.remaining < 0;

  return (
    <section className="daily-section" aria-labelledby="daily-time-title">
      <div className="daily-section__intro">
        <div>
          <span className="daily-kicker">Your average day</span>
          <h2 id="daily-time-title">DAILY TIME</h2>
        </div>
        <p>
          Account for where your hours go. What remains is the time you actually
          get to choose.
        </p>
      </div>

      <div className="daily-summary">
        <div className="daily-summary__metric" aria-live="polite">
          <span>{isOverbooked ? "Overbooked by" : "Time left each day"}</span>
          <strong>
            {formatHours(Math.abs(totals.remaining))}
            <small> / day</small>
          </strong>
          <p>
            {isOverbooked
              ? "Your plan needs more hours than a day has."
              : `${Math.round(freePercentage)}% of your day is still yours.`}
          </p>
        </div>

        <div className="daily-summary__visual">
          <div
            className={`daily-budget ${isOverbooked ? "daily-budget--over" : ""}`}
            aria-label={`${formatHours(totals.required)} obligations, ${formatHours(totals.wasted)} time wasters, ${formatHours(Math.max(0, totals.remaining))} left`}
            role="img"
          >
            <span
              className="daily-budget__required"
              style={{ width: `${requiredPercentage}%` }}
            />
            <span
              className="daily-budget__wasted"
              style={{ width: `${wastedPercentage}%` }}
            />
            <span
              className="daily-budget__free"
              style={{ width: `${freePercentage}%` }}
            />
          </div>
          <div className="daily-legend">
            <span>
              <i className="daily-legend__required" /> Obligations
            </span>
            <span>
              <i className="daily-legend__wasted" /> Time wasters
            </span>
            <span>
              <i className="daily-legend__free" /> Time left
            </span>
          </div>
        </div>
      </div>

      <div className="daily-columns">
        <ActivityList
          eyebrow="Must do"
          title="Obligations"
          activities={obligations}
          onChange={setObligations}
        />
        <ActivityList
          eyebrow="Could reclaim"
          title="Time wasters"
          activities={timeWasters}
          onChange={setTimeWasters}
        />
      </div>
    </section>
  );
}

export default DailyTime;
