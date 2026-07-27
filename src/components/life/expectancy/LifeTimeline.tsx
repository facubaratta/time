type Props = {
  birthYear: number
  currentPosition: number
  endYear: number
}

function LifeTimeline({ birthYear, currentPosition, endYear }: Props) {
  return (
    <div
      style={{
        position: 'relative',
        height: 18,
        marginTop: 10,
        color: '#666',
        fontSize: 10,
      }}
    >
      <span style={{ position: 'absolute', left: 0 }}>{birthYear}</span>
      {currentPosition > 10 && currentPosition < 90 && (
        <span
          style={{
            position: 'absolute',
            left: `${currentPosition}%`,
            transform: 'translateX(-50%)',
            color: '#fff',
          }}
        >
          Today
        </span>
      )}
      <span style={{ position: 'absolute', right: 0 }}>{endYear}</span>
    </div>
  )
}

export default LifeTimeline
