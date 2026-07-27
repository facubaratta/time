import useNow from "../../../useNow";
import { progress } from "../../../time";
import {
  birthdayInYear,
  getAge,
  parseBirthDate,
} from "../lifeProgress";
import Input from "./Input";
import LifeCycle, { type Cycle } from "./LifeCycle";

type Props = {
  birthDate: string;
  onChange: (value: string) => void;
};

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

const BirthDate = ({ birthDate, onChange }: Props) => {
  const now = useNow();
  const date = parseBirthDate(birthDate);
  const age = date ? getAge(now, date) : null;
  const cycles = date && age !== null ? getCycles(now, date, age) : [];

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <Input birthDate={birthDate} age={age} onChange={onChange} />
      {age !== null ? (
        <div
          className="birth-date-cycles"
          style={{
            minWidth: 0,
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(220px, 100%), 1fr))",
          }}
        >
          {cycles.map((cycle) => (
            <LifeCycle key={cycle.label} {...cycle} />
          ))}
        </div>
      ) : (
        <div
          className="birth-date-placeholder"
          style={{
            minWidth: 0,
            minHeight: 100,
            display: "grid",
            placeItems: "center",
            padding: 20,
            border: "1px solid #333",
            color: "#666",
            textAlign: "center",
          }}
        >
          Birthday and age-decade progress
        </div>
      )}
    </div>
  );
};

export default BirthDate;
