import useNow from "../../../useNow";
import { progress } from "../../../time";
import ProgressBar from "../../ProgressBar";
import LifeTimeline from "./LifeTimeline";
import { birthdayInYear, getAge, parseBirthDate } from "../lifeProgress";
import Input from "./Input";
import RemainingTime from "./RemainingTime";

const sectionColors = [
  "#a78bfa",
  "#60a5fa",
  "#22d3ee",
  "#34d399",
  "#facc15",
  "#fb923c",
  "#f472b6",
];

type Props = {
  birthDate: string;
  expectancy: number;
  onExpectancyChange: (value: number) => void;
};

function LifeExpectancy({
  birthDate,
  expectancy,
  onExpectancyChange,
}: Props) {
  const now = useNow();
  const date = parseBirthDate(birthDate);
  const currentAge = date ? getAge(now, date) : null;
  const effectiveExpectancy = Math.max(expectancy, currentAge ?? 0);
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
    width:
      ((age - sectionBoundaries[index]) / effectiveExpectancy) * 100,
  }));

  return (
    <div className="life-expectancy-layout">
      <div className="life-expectancy-input-cell">
        <Input
          currentAge={currentAge}
          expectancy={effectiveExpectancy}
          onChange={onExpectancyChange}
        />
      </div>
      <div className="life-expectancy-progress-cell">
        {date && expectedEnd && elapsed !== null ? (
          <div
            className="life-progress"
            style={{
              minWidth: 0,
              display: "grid",
              alignItems: "center",
            }}
          >
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
              remainingPercentage={elapsed === null ? null : 100 - elapsed}
            />
          </div>
        ) : (
          <div style={{ color: "#666", fontSize: 15 }}>
            Add your birth date to estimate time remaining
          </div>
        )}
      </div>
    </div>
  );
}

export default LifeExpectancy;
