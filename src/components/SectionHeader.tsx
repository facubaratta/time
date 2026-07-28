type Props = {
  title: string
  description: string
}

function SectionHeader({ title, description }: Props) {
  return (
    <header
      style={{
        marginBottom: 28,
        paddingTop: 14,
        borderTop: "1px solid var(--line)",
      }}
    >
      <div
        className="section-header__content"
        style={{ marginLeft: "var(--section-indent, min(35%, 360px))" }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "clamp(34px, 5vw, 70px)",
            fontWeight: 450,
            letterSpacing: "-0.055em",
            lineHeight: 0.95,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            maxWidth: 460,
            margin: "14px 0 0",
            color: "var(--muted)",
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>
      </div>
    </header>
  )
}

export default SectionHeader
