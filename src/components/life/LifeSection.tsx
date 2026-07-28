import BirthDate from "./birthdate/BirthDate";
import LifeExpectancy from "./expectancy/LifeExpectancy";
import { timeStore, useTimeStore } from "../../timeStore";
import "./life.css";

function LifeSection() {
  const { birthDate, lifeExpectancy } = useTimeStore();

  return (
    <section className="life-composition" aria-label="Life expectancy">
      <BirthDate birthDate={birthDate} onChange={timeStore.setBirthDate} />
      <LifeExpectancy
        birthDate={birthDate}
        expectancy={lifeExpectancy}
        onExpectancyChange={timeStore.setLifeExpectancy}
      />
    </section>
  );
}

export default LifeSection;
