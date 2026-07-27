import { useState } from "react";
import BirthDate from "./birthdate/BirthDate";
import LifeExpectancy from "./expectancy/LifeExpectancy";

function LifeSection() {
  const [birthDate, setBirthDate] = useState("");
  return (
    <section>
      <BirthDate birthDate={birthDate} onChange={setBirthDate} />
      <LifeExpectancy birthDate={birthDate} />
    </section>
  );
}

export default LifeSection;
