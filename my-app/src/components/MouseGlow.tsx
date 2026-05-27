"use client"

import { useEffect } from "react"

export function MouseGlow() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reduceMotion.matches) return

    const root = document.documentElement
    const target = { x: window.innerWidth / 2, y: window.innerHeight * 0.2 }
    const current = { ...target }
    let frameId = 0
    let isAnimating = false

    function onPointerMove(event: PointerEvent) {
      target.x = event.clientX
      target.y = event.clientY

      if (!isAnimating) {
        isAnimating = true
        frameId = window.requestAnimationFrame(animateGlow)
      }
    }

    function animateGlow() {
      current.x += (target.x - current.x) * 0.08
      current.y += (target.y - current.y) * 0.08

      root.style.setProperty("--glow-x", `${current.x}px`)
      root.style.setProperty("--glow-y", `${current.y}px`)

      if (Math.abs(target.x - current.x) > 0.5 || Math.abs(target.y - current.y) > 0.5) {
        frameId = window.requestAnimationFrame(animateGlow)
        return
      }

      isAnimating = false
    }

    root.style.setProperty("--glow-x", `${current.x}px`)
    root.style.setProperty("--glow-y", `${current.y}px`)
    window.addEventListener("pointermove", onPointerMove)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener("pointermove", onPointerMove)
    }
  }, [])

  return <div className="pointer-glow" aria-hidden />
}
