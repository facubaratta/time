import { useEffect, useState } from "react";

const UPDATE_MS = 1000

export default function useNow() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), UPDATE_MS)
    return () => window.clearInterval(interval)
  }, [])

  return now
}

