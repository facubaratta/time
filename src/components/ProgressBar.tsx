type Props = {
  label: string
  value: number
  large?: boolean
  sections?: Array<{
    color: string
    width: number
  }>
}

function ProgressBar({ label, value, large = false, sections }: Props) {
  const sectionGradient = sections
    ? `linear-gradient(to right, ${sections
        .flatMap((section, index) => {
          const boundary = sections
            .slice(0, index + 1)
            .reduce((total, item) => total + item.width, 0)

          if (index === sections.length - 1) {
            return `${section.color} 100%`
          }

          const nextColor = sections[index + 1].color
          return [
            `${section.color} ${Math.max(0, boundary - 1)}%`,
            `${nextColor} ${Math.min(100, boundary + 1)}%`,
          ]
        })
        .join(", ")})`
    : undefined

  return (
    <div
      style={{
        height: 4,
        marginTop: 20,
        backgroundColor: "#222",
        overflow: "hidden",
        position: "relative",
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
          display: "flex",
          background: sectionGradient ?? "#fff",
          transition: "width 0.8s linear",
          width: sections ? "100%" : `${value}%`,
        }}
      />
      {sections && (
        <span
          style={{
            position: "absolute",
            inset: `0 0 0 ${value}%`,
            backgroundColor: "#222",
            transition: "left 0.8s linear",
          }}
        />
      )}
    </div>
  );
}

export default ProgressBar
