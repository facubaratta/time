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
