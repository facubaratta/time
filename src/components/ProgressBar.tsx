type Props = {
  label: string
  value: number
  large?: boolean
}

function ProgressBar({ label, value, large = false }: Props) {
  return (
    <div
      style={{
        height: 4,
        marginTop: 20,
        backgroundColor: "#222",
        overflow: "hidden",
        ...(large ? { height: 12, marginTop: 32 } : {}),
      }}
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Number(value.toFixed(2))}
    >
      <span
        style={{
          height: "100%",
          display: "block",
          backgroundColor: "#fff",
          transition: "width 0.8s linear",
          width: `${value}%`,
        }}
      />
    </div>
  );
}

export default ProgressBar
