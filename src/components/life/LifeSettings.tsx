import useNow from "../../useNow";
import { timeStore, useTimeStore } from "../../timeStore";
import BirthDateInput from "./birthdate/Input";
import LifeExpectancyInput from "./expectancy/Input";
import { getAge, parseBirthDate } from "./lifeCalculations";
import "./life.css";

function LifeSettings() {
  const now = useNow();
  const { birthDate, lifeExpectancy } = useTimeStore();
  const date = parseBirthDate(birthDate);
  const currentAge = date ? getAge(now, date) : null;
  const effectiveExpectancy = Math.max(lifeExpectancy, currentAge ?? 0);

  return (
    <section className="life-settings" aria-label="Life settings">
      <BirthDateInput
        birthDate={birthDate}
        age={currentAge}
        required={currentAge === null}
        onChange={timeStore.setBirthDate}
      />
      <div className="life-expectancy-input-cell">
        <LifeExpectancyInput
          currentAge={currentAge}
          expectancy={effectiveExpectancy}
          onChange={timeStore.setLifeExpectancy}
        />
      </div>
    </section>
  );
}

export default LifeSettings;
