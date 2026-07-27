type Props = {
  currentAge: number | null;
  expectancy: number;
  onChange: (value: number) => void;
};

const Input = ({ currentAge, expectancy, onChange }: Props) => {
  const enabled = currentAge !== null;
  const minimum = currentAge ?? 0;
  return (
    <div className="expectancy-input">
      <div className="expectancy-input__value">
        <span
          style={{
            display: "block",
            color: "#777",
            fontSize: 15,
            lineHeight: 1,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          }}
        >
          Life expectancy
        </span>
        <strong
          style={{
            display: "block",
            marginTop: 4,
            fontSize: 44,
            fontWeight: 400,
            letterSpacing: "-0.06em",
            lineHeight: 0.9,
          }}
        >
          {expectancy} years
        </strong>
      </div>

      <label
        className="expectancy-slider"
        style={{
          opacity: enabled ? 1 : 0.45,
        }}
      >
        <input
          style={{
            cursor: enabled ? "pointer" : "not-allowed",
          }}
          type="range"
          min={minimum}
          max={120}
          value={Math.max(expectancy, minimum)}
          onChange={(event) => onChange(Number(event.target.value))}
          disabled={!enabled}
          aria-label="Life expectancy"
        />
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
            color: "#777",
            fontSize: 20,
            lineHeight: 1,
          }}
        >
          <span>{enabled ? minimum : "Current age"}</span>
          <span>120</span>
        </span>
      </label>
    </div>
  );
};

export default Input;
