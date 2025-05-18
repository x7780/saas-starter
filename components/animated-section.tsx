"use client"

import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"
import { type HTMLAttributes, forwardRef } from "react"

interface AnimatedSectionProps extends HTMLAttributes<HTMLDivElement> {
  animation?: "fade-up" | "fade-in" | "fade-right" | "fade-left" | "scale-up" | "none"
  delay?: number
  threshold?: number
  once?: boolean
}

export const AnimatedSection = forwardRef<HTMLDivElement, AnimatedSectionProps>(
  ({ children, animation = "fade-up", delay = 0, threshold = 0.1, once = true, className, ...props }, forwardedRef) => {
    const { ref, isIntersecting } = useIntersectionObserver({
      threshold,
      freezeOnceVisible: once,
    })

    const setRefs = (node: HTMLDivElement) => {
      // @ts-ignore - forwardRef types are complex
      if (typeof forwardedRef === "function") forwardedRef(node)
      else if (forwardedRef) forwardedRef.current = node
      ref.current = node
    }

    const animationClasses = {
      "fade-up": "animate-fade-up",
      "fade-in": "animate-fade-in",
      "fade-right": "animate-fade-right",
      "fade-left": "animate-fade-left",
      "scale-up": "animate-scale-up",
      none: "",
    }

    return (
      <div
        ref={setRefs}
        className={cn(
          "opacity-0",
          isIntersecting && [animationClasses[animation], `animate-delay-${delay}`],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)

AnimatedSection.displayName = "AnimatedSection"
