import { useLayoutEffect, useMemo, useRef, useState } from 'react'

type Props = {
  birthYear: number
  currentPosition: number
  endYear: number
  sectionColors: string[]
}

function LifeTimeline({
  birthYear,
  currentPosition,
  endYear,
  sectionColors,
}: Props) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const todayRef = useRef<HTMLSpanElement>(null)
  const [todayIsVisible, setTodayIsVisible] = useState(false)
  const [hiddenMilestones, setHiddenMilestones] = useState<number[]>([])
  const expectancy = endYear - birthYear
  const milestoneAges = useMemo(() => {
    const ages = [7, 12, 18]

    for (let age = 30; age < expectancy; age += 10) {
      ages.push(age)
    }

    return ages.filter((age) => age < expectancy)
  }, [expectancy])

  useLayoutEffect(() => {
    const timeline = timelineRef.current
    const today = todayRef.current

    if (!timeline || !today) return

    const updateTodayVisibility = () => {
      const todayBounds = today.getBoundingClientRect()
      const labels = Array.from(
        timeline.querySelectorAll<HTMLElement>(
        '[data-timeline-label]',
        ),
      )
      const firstLabel = labels[0]
      const lastLabel = labels.at(-1)
      const visibleLabels = firstLabel ? [firstLabel] : []
      const hiddenAges: number[] = []
      const minimumGap = 4
      const overlaps = (first: DOMRect, second: DOMRect) =>
        first.left < second.right + minimumGap &&
        first.right + minimumGap > second.left

      labels.slice(1, -1).forEach((label) => {
        const labelBounds = label.getBoundingClientRect()
        const previousBounds = visibleLabels.at(-1)?.getBoundingClientRect()
        const lastBounds = lastLabel?.getBoundingClientRect()
        const doesNotFit =
          (previousBounds && overlaps(labelBounds, previousBounds)) ||
          (lastBounds && overlaps(labelBounds, lastBounds))

        if (doesNotFit) {
          hiddenAges.push(Number(label.dataset.timelineAge))
        } else {
          visibleLabels.push(label)
        }
      })

      if (lastLabel) visibleLabels.push(lastLabel)

      setHiddenMilestones((current) =>
        current.join(',') === hiddenAges.join(',') ? current : hiddenAges,
      )

      const overlapsLabel = visibleLabels.some((label) =>
        overlaps(todayBounds, label.getBoundingClientRect()),
      )

      setTodayIsVisible(!overlapsLabel)
    }

    updateTodayVisibility()

    const resizeObserver = new ResizeObserver(updateTodayVisibility)
    resizeObserver.observe(timeline)

    return () => resizeObserver.disconnect()
  }, [currentPosition, milestoneAges])

  return (
    <div
      ref={timelineRef}
      style={{
        position: 'relative',
        height: 18,
        marginTop: 10,
        color: '#666',
        fontSize: 10,
      }}
    >
      <span
        data-timeline-label
        style={{
          position: 'absolute',
          left: 0,
          color: sectionColors[0],
        }}
      >
        {birthYear}
      </span>
      {milestoneAges.map((age, index) => (
        <span
          key={age}
          data-timeline-label
          data-timeline-age={age}
          style={{
            position: 'absolute',
            left: `${(age / expectancy) * 100}%`,
            transform: 'translateX(-50%)',
            color: sectionColors[index + 1],
            visibility: hiddenMilestones.includes(age) ? 'hidden' : 'visible',
          }}
        >
          {age}
        </span>
      ))}
      <span
        ref={todayRef}
        style={{
          position: 'absolute',
          left: `${currentPosition}%`,
          transform: 'translateX(-50%)',
          color: '#fff',
          visibility: todayIsVisible ? 'visible' : 'hidden',
        }}
      >
        Today
      </span>
      <span
        data-timeline-label
        style={{
          position: 'absolute',
          right: 0,
          color: sectionColors.at(-1),
        }}
      >
        {endYear}
      </span>
    </div>
  )
}

export default LifeTimeline
