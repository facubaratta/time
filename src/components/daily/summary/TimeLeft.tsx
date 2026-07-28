import { formatHours } from "../dailyTimeUtils";

function TimeLeft({ remaining }: { remaining: number }) {
  return (
    <div className="daily-bar__time-left" aria-live="polite">
      <div>
        <span>Daily time left</span>
        <strong>
          {formatHours(remaining)}
          <small> / day</small>
        </strong>
      </div>
    </div>
  );
}

export default TimeLeft;
