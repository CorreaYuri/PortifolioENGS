"use client"

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react"

type RevealProps = {
  as?: "article" | "div" | "section"
  children: ReactNode
  className?: string
  delay?: number
  once?: boolean
}

export function Reveal({ as: Component = "div", children, className = "", delay = 0, once = true }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(entry.target)
          return
        }

        if (!once) setIsVisible(false)
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.16 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [once])

  return (
    <Component
      ref={ref as never}
      className={`reveal-on-scroll ${isVisible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Component>
  )
}
