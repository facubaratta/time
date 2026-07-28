import useNow from "../../useNow";
import { progress } from "../../time";
import { useTimeStore } from "../../timeStore";
import ProgressBar from "../ProgressBar";
import LifeCycle, { type Cycle } from "./birthdate/LifeCycle";
import LifeTimeline from "./expectancy/LifeTimeline";
import RemainingTime from "./expectancy/RemainingTime";
import {
  birthdayInYear,
  getAge,
  parseBirthDate,
} from "./lifeCalculations";
import "./life.css";

const sectionColors = [
  "#a78bfa",
  "#60a5fa",
  "#22d3ee",
  "#34d399",
  "#facc15",
  "#fb923c",
  "#f472b6",
];

function getCycles(now: Date, birthDate: Date, age: number): Cycle[] {
  const birthdayThisYear = birthdayInYear(birthDate, now.getFullYear());
  const lastBirthday =
    birthdayThisYear > now
      ? birthdayInYear(birthDate, now.getFullYear() - 1)
      : birthdayThisYear;
  const nextBirthday = birthdayInYear(
    birthDate,
    lastBirthday.getFullYear() + 1,
  );
  const decadeAge = Math.floor(age / 10) * 10;
  const decadeStart = birthdayInYear(
    birthDate,
    birthDate.getFullYear() + decadeAge,
  );
  const decadeEnd = birthdayInYear(
    birthDate,
    birthDate.getFullYear() + decadeAge + 10,
  );

  return [
    {
      label: "Next birthday",
      value: progress(now, lastBirthday, nextBirthday),
      detail: `Age ${age} → ${age + 1}`,
    },
    {
      label: `Your ${decadeAge}s`,
      value: progress(now, decadeStart, decadeEnd),
      detail: `Age ${decadeAge} → ${decadeAge + 10}`,
    },
  ];
}

function LifeProgress() {
  const now = useNow();
  const { birthDate, lifeExpectancy } = useTimeStore();
  const date = parseBirthDate(birthDate);
  const currentAge = date ? getAge(now, date) : null;
  const effectiveExpectancy = Math.max(lifeExpectancy, currentAge ?? 0);
  const cycles =
    date && currentAge !== null ? getCycles(now, date, currentAge) : [];
  const expectedEnd =
    date && currentAge !== null
      ? birthdayInYear(date, date.getFullYear() + effectiveExpectancy)
      : null;
  const elapsed = date && expectedEnd ? progress(now, date, expectedEnd) : null;
  const remainingYears =
    expectedEnd === null
      ? null
      : Math.max(0, expectedEnd.getTime() - now.getTime()) /
        (365.2425 * 24 * 60 * 60 * 1000);
  const sectionBoundaries = [
    0,
    7,
    12,
    18,
    ...Array.from(
      { length: Math.max(0, Math.ceil((effectiveExpectancy - 30) / 10)) },
      (_, index) => 30 + index * 10,
    ),
    effectiveExpectancy,
  ]
    .filter((age) => age <= effectiveExpectancy)
    .filter((age, index, ages) => age !== ages[index - 1]);
  const sections = sectionBoundaries.slice(1).map((age, index) => ({
    color: sectionColors[index % sectionColors.length],
    width: ((age - sectionBoundaries[index]) / effectiveExpectancy) * 100,
  }));

  return (
    <section className="life-progress-section" aria-label="Life progress">
      <div className="birth-date-cycles">
        {cycles.length > 0 ? (
          cycles.map((cycle) => <LifeCycle key={cycle.label} {...cycle} />)
        ) : (
          <div className="birth-date-placeholder">
            Birthday and decade progress
          </div>
        )}
      </div>
      <div className="life-expectancy-progress-cell">
        {date && expectedEnd && elapsed !== null ? (
          <div className="life-progress">
            <div style={{ minWidth: 0 }}>
              <ProgressBar
                label="Estimated life elapsed"
                value={elapsed}
                large
                sections={sections}
              />
              <LifeTimeline
                birthYear={date.getFullYear()}
                currentPosition={elapsed}
                endYear={expectedEnd.getFullYear()}
                sectionColors={sections.map((section) => section.color)}
              />
            </div>
            <RemainingTime
              remainingYears={remainingYears}
              remainingPercentage={100 - elapsed}
            />
          </div>
        ) : (
          <div className="life-progress-placeholder">
            Add your birth date to calculate remaining time
          </div>
        )}
      </div>
    </section>
  );
}

export default LifeProgress;
