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
  required?: boolean;
  onChange: (value: string) => void;
};

const Input = ({ birthDate, age, required = false, onChange }: Props) => {
  const now = useNow();
  const earliestBirthDate = new Date(
    now.getFullYear() - 120,
    now.getMonth(),
    now.getDate(),
  );
  return (
    <label
      className={`birth-date-input${required ? " birth-date-input--required" : ""}`}
      style={{
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 10,
      }}
    >
      <span style={{ color: "#777" }}>
        {age !== null ? `Current age: ${age}` : "Birth date required"}
      </span>
      <input
        aria-describedby={required ? "birth-date-requirement" : undefined}
        aria-invalid={required || undefined}
        type="date"
        required
        min={dateInputValue(earliestBirthDate)}
        max={dateInputValue(now)}
        value={birthDate}
        onChange={(event) => onChange(event.target.value)}
        style={{
          minWidth: 0,
          width: "100%",
          padding: 0,
          border: 0,
          outline: 0,
          background: "transparent",
          color: "#fff",
          colorScheme: "dark",
          fontSize: "clamp(20px, 5vw, 24px)",
        }}
      />
      {required && (
        <span
          id="birth-date-requirement"
          className="birth-date-requirement"
          role="status"
        >
          Set this to unlock your life progress and remaining-time estimates.
        </span>
      )}
    </label>
  );
};

export default Input;
