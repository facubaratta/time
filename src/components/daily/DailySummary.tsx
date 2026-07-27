import { DAY_HOURS, formatHours } from "./dailyTimeUtils";
import type { Activity, DailyTotals } from "./dailyTimeUtils";

type Props = {
  totals: DailyTotals;
  activities: Activity[];
};

function DailySummary({ totals, activities }: Props) {
  const freePercentage = Math.max(
    0,
    Math.min(100, (totals.remaining / DAY_HOURS) * 100),
  );
  const isOverbooked = totals.remaining < 0;
  const activeActivities = activities.filter((activity) => activity.hours > 0);

  return (
    <div
      style={{
        padding: "clamp(20px, 3vw, 32px)",
        border: "1px solid #333",
      }}
    >
      <div
        aria-label={`${activeActivities.map((activity) => `${activity.label || "Unnamed activity"}: ${formatHours(activity.hours)}`).join(", ")}, ${formatHours(Math.max(0, totals.remaining))} left`}
        role="img"
        style={{
          height: 104,
          position: "relative",
          display: "flex",
          overflow: "hidden",
          border: `1px solid ${isOverbooked ? "#ff654f" : "#3b3b3b"}`,
          background: "#080808",
          boxShadow: isOverbooked ? "inset 0 -3px #ff654f" : undefined,
        }}
      >
        {activeActivities.map((activity) => (
          <span
            key={activity.id}
            title={`${activity.label || "Unnamed activity"} · ${formatHours(activity.hours)}`}
            style={{
              height: "100%",
              flex: "0 0 auto",
              backgroundColor: activity.color,
              flexBasis: `${(activity.hours / DAY_HOURS) * 100}%`,
              transition: "flex-basis 220ms ease",
            }}
          />
        ))}
        <span
          style={{
            height: "100%",
            flex: "0 0 auto",
            flexBasis: `${freePercentage}%`,
            background: "#111",
            transition: "flex-basis 220ms ease",
          }}
        />
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
                color: isOverbooked ? "#ff8c7b" : "#aaa",
                fontSize: 10,
                fontWeight: 650,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {isOverbooked ? "Overbooked by" : "Daily time left"}
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
              {formatHours(Math.abs(totals.remaining))}
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
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px 26px",
          marginTop: 18,
          color: "#888",
          fontSize: 11,
        }}
      >
        {activeActivities.map((activity) => (
          <span
            key={activity.id}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <i
              style={{
                width: 10,
                height: 10,
                display: "block",
                border: "1px solid #555",
                backgroundColor: activity.color,
              }}
            />
            {activity.label || "Unnamed"}
          </span>
        ))}
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <i
            style={{
              width: 10,
              height: 10,
              display: "block",
              border: "1px solid #555",
              background: "#111",
            }}
          />{" "}
          Time left
        </span>
      </div>
    </div>
  );
}

export default DailySummary;
