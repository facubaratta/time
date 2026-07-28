import { useMemo } from "react";
import { DAY, HOUR, MINUTE, WEEK } from "../../time";
import useNow from "../../useNow";
import {
  DAY_HOURS,
  calculateDailyTotals,
  formatAnnualDuration,
} from "../daily/dailyTimeUtils";
import { birthdayInYear, getAge, parseBirthDate } from "../life/lifeProgress";
import { useTimeStore } from "../../timeStore";
import "./stats.css";

const formatNumber = (value: number) =>
  new Intl.NumberFormat().format(Math.max(0, Math.floor(value)));

function formatDuration(days: number) {
  const years = days / 365;
  const months = days / (365 / 12);
  const value = days >= 365 ? years : days >= 365 / 12 ? months : days;
  const rounded = Math.round(value * 10) / 10;
  const unit =
    days >= 365
      ? rounded === 1
        ? "year"
        : "years"
      : days >= 365 / 12
        ? rounded === 1
          ? "month"
          : "months"
        : rounded === 1
          ? "day"
          : "days";

  return `${rounded} ${unit}`;
}

function Counter({
  label,
  value,
}: {
  label: string;
  value: number | string | null;
}) {
  return (
    <div className="life-counter">
      <span>{label}</span>
      <strong>
        {value === null
          ? "—"
          : typeof value === "number"
            ? formatNumber(value)
            : value}
      </strong>
    </div>
  );
}

function LifeStats() {
  const now = useNow();
  const { birthDate, lifeExpectancy, obligations, timeWasters } =
    useTimeStore();
  const totals = useMemo(
    () => calculateDailyTotals(obligations, timeWasters),
    [obligations, timeWasters],
  );
  const date = parseBirthDate(birthDate);
  const currentAge = date ? getAge(now, date) : null;
  const effectiveExpectancy = Math.max(lifeExpectancy, currentAge ?? 0);
  const expectedEnd =
    date && currentAge !== null
      ? birthdayInYear(date, date.getFullYear() + effectiveExpectancy)
      : null;
  const remaining = expectedEnd
    ? Math.max(0, expectedEnd.getTime() - now.getTime())
    : null;
  const wastedDaysAcrossRemainingLife =
    remaining === null
      ? null
      : (remaining / DAY) * (totals.wasted / 24);
  const freeDaysAcrossRemainingLife =
    remaining === null
      ? null
      : (remaining / DAY) * (totals.remaining / DAY_HOURS);
  const remainingDays = remaining === null ? null : remaining / DAY;
  const freeDayPercentage = Math.round(
    (totals.remaining / DAY_HOURS) * 100,
  );

  const remainingStats: Array<[string, number | null]> = [
    ["Weekends", remaining === null ? null : remaining / WEEK],
    ["Days", remainingDays],
    ["Hours", remaining === null ? null : remaining / HOUR],
    ["Minutes", remaining === null ? null : remaining / MINUTE],
    ["Seconds", remaining === null ? null : remaining / 1000],
  ];

  return (
    <section className="life-stats" aria-label="Life stats">
      <div className="life-stats__time">
        <div className="life-stats__counters">
          {remainingStats.map(([label, value]) => (
            <Counter key={label} label={label} value={value} />
          ))}
        </div>
      </div>

      <div className="life-stats__free">
        <div className="life-stats__free-label">
          <span>At your current rhythm</span>
          <strong>
            FREE
            <br />
            TIME LEFT
          </strong>
        </div>
        <div className="life-stats__free-total">
          <strong>
            {freeDaysAcrossRemainingLife === null
              ? "—"
              : formatDuration(freeDaysAcrossRemainingLife)}
          </strong>
          <span>{freeDayPercentage}% of each future day remains yours</span>
        </div>
        <div className="life-stats__free-notes">
          <div>
            <span>Free each year</span>
            <strong>{formatAnnualDuration(totals.remaining)}</strong>
          </div>
          <div>
            <span>Drifting each year</span>
            <strong>{formatAnnualDuration(totals.wasted)}</strong>
          </div>
          <div>
            <span>Still reclaimable</span>
            <strong>
              {wastedDaysAcrossRemainingLife === null
                ? "—"
                : formatDuration(wastedDaysAcrossRemainingLife)}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LifeStats;
