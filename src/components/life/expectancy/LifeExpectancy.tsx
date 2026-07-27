import { useState } from "react";
import useNow from "../../../useNow";
import { progress } from "../../../time";
import ProgressBar from "../../ProgressBar";
import LifeTimeline from "./LifeTimeline";
import { birthdayInYear, getAge, parseBirthDate } from "../lifeProgress";
import LifeStats from "./LifeStats";
import Input from "./Input";
import RemainingPercentage from "./RemainingPercentage";

function LifeExpectancy({ birthDate }: { birthDate: string }) {
  const now = useNow();
  const [expectancy, setExpectancy] = useState(80);
  const date = parseBirthDate(birthDate);
  const currentAge = date ? getAge(now, date) : null;
  const effectiveExpectancy = Math.max(expectancy, currentAge ?? 0);
  const expectedEnd =
    date && currentAge !== null
      ? birthdayInYear(date, date.getFullYear() + effectiveExpectancy)
      : null;
  const elapsed = date && expectedEnd ? progress(now, date, expectedEnd) : null;

  return (
    <div className="life-expectancy">
      <div className="life-expectancy__content">
        <Input
          currentAge={currentAge}
          expectancy={effectiveExpectancy}
          onChange={setExpectancy}
        />
        {date && expectedEnd && elapsed !== null ? (
          <div className="life-progress">
            <div className="life-progress__bar">
              <ProgressBar
                label="Estimated life elapsed"
                value={elapsed}
                large
              />
              <LifeTimeline
                birthYear={date.getFullYear()}
                currentPosition={elapsed}
                endYear={expectedEnd.getFullYear()}
              />
            </div>
            <RemainingPercentage elapsed={elapsed} />
          </div>
        ) : (
          <div
            style={{
              marginTop: 28,
              color: "#666",
              fontSize: 15,
            }}
          >
            Add your birth date to estimate time remaining
          </div>
        )}
      </div>
      {expectedEnd && elapsed !== null && (
        <LifeStats
          remaining={Math.max(0, expectedEnd.getTime() - now.getTime())}
        />
      )}
    </div>
  );
}

export default LifeExpectancy;
