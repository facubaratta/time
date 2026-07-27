import useNow from "../../../useNow";

const dateInputValue = (date: Date) =>
  [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");

type Props = {
  birthDate: string;
  age: number | null;
  onChange: (value: string) => void;
};

const Input = ({ birthDate, age, onChange }: Props) => {
  const now = useNow();
  const earliestBirthDate = new Date(
    now.getFullYear() - 120,
    now.getMonth(),
    now.getDate(),
  );
  return (
    <label className="birth-date-input">
      <span style={{ color: "#777" }}>
        {age !== null ? `Current age: ${age}` : "Choose your birth date"}
      </span>
      <input
        type="date"
        min={dateInputValue(earliestBirthDate)}
        max={dateInputValue(now)}
        value={birthDate}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
};

export default Input;
