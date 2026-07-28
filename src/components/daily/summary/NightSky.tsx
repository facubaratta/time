export const NIGHT_SKY_BACKGROUND = `
  radial-gradient(circle at 12% 22%, #fff 0 1px, transparent 1.5px),
  radial-gradient(circle at 30% 68%, #c9d8ff 0 1px, transparent 1.5px),
  radial-gradient(circle at 48% 18%, #fff 0 1px, transparent 1.5px),
  radial-gradient(circle at 67% 72%, #d8e3ff 0 1px, transparent 1.5px),
  radial-gradient(circle at 84% 30%, #fff 0 1px, transparent 1.5px),
  linear-gradient(135deg, #080d22, #172453)
`

function NightSky() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 30,
        height: 30,
        position: "absolute",
        top: "50%",
        left: "50%",
        borderRadius: "50%",
        background: "#fff3bd",
        boxShadow: "0 0 18px rgba(255, 239, 174, 0.28)",
        transform: "translate(-50%, -50%)",
      }}
    >
      <span
        style={{
          width: 30,
          height: 30,
          position: "absolute",
          top: -7,
          left: 9,
          borderRadius: "50%",
          background: "#111a3b",
        }}
      />
    </span>
  )
}

export default NightSky
