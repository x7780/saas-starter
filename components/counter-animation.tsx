"use client"

import { useEffect, useRef, useState } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface CounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimalPlaces?: number
  threshold?: number
}

export function CounterAnimation({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  decimalPlaces = 0,
  threshold = 0.1,
}: CounterProps) {
  const [count, setCount] = useState(0)
  const { ref, isIntersecting } = useIntersectionObserver({ threshold, freezeOnceVisible: true })
  const countRef = useRef(0)
  const startTimeRef = useRef<number | null>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isIntersecting) return

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const progress = timestamp - startTimeRef.current
      const percentage = Math.min(progress / duration, 1)

      // Easing function for smoother animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4)

      countRef.current = easeOutQuart * end
      setCount(countRef.current)

      if (percentage < 1) {
        frameRef.current = requestAnimationFrame(animate)
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [isIntersecting, end, duration])

  const formattedCount = count.toFixed(decimalPlaces)

  return (
    <span ref={ref} className="inline-block">
      {prefix}
      {formattedCount}
      {suffix}
    </span>
  )
}
