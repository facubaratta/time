import { useMemo } from "react";
import { DAY, HOUR, MINUTE, WEEK } from "../../time";
import useNow from "../../useNow";
import {
  calculateDailyTotals,
  formatAnnualDuration,
} from "../daily/dailyTimeUtils";
import { birthdayInYear, getAge, parseBirthDate } from "../life/lifeProgress";
import SectionHeader from "../SectionHeader";
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

function Stat({
  label,
  value,
  suffix = "left",
}: {
  label: string;
  value: number | string | null;
  suffix?: string;
}) {
  const text =
    typeof value === "number"
      ? formatNumber(value)
      : value === null
        ? "—"
        : value;
  const fontSize = 140 / text.length;

  return (
    <div className="life-stat">
      <strong style={{ fontSize: `clamp(14px, ${fontSize}cqw, 30px)` }}>
        {text}
      </strong>
      <span>
        {label} {suffix}
      </span>
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

  const remainingStats: Array<[string, number | null]> = [
    ["Weeks / weekends", remaining === null ? null : remaining / WEEK],
    ["Days", remaining === null ? null : remaining / DAY],
    ["Hours", remaining === null ? null : remaining / HOUR],
    ["Minutes", remaining === null ? null : remaining / MINUTE],
    ["Seconds", remaining === null ? null : remaining / 1000],
  ];

  return (
    <section
      aria-label="Life stats"
      style={{ paddingTop: "clamp(64px, 9vw, 128px)" }}
    >
      <SectionHeader
        title="Life stats"
        description="The scale of the time ahead—and what your current habits add up to."
      />
      <div className="life-stats">
        {remainingStats.map(([label, value]) => (
          <Stat key={label} label={label} value={value} />
        ))}
        <Stat
          label="Time wasters"
          value={formatAnnualDuration(totals.wasted)}
          suffix="per year"
        />
        <Stat
          label="Time wasters"
          value={
            wastedDaysAcrossRemainingLife === null
              ? null
              : formatDuration(wastedDaysAcrossRemainingLife)
          }
          suffix="over your remaining life"
        />
      </div>
    </section>
  );
}

export default LifeStats;
