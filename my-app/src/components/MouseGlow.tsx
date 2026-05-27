"use client"

import { useEffect } from "react"

export function MouseGlow() {
  useEffect(() => {
    const root = document.documentElement

    function onPointerMove(event: PointerEvent) {
      root.style.setProperty("--glow-x", `${event.clientX}px`)
      root.style.setProperty("--glow-y", `${event.clientY}px`)
    }

    window.addEventListener("pointermove", onPointerMove)
    return () => window.removeEventListener("pointermove", onPointerMove)
  }, [])

  return <div className="pointer-glow" aria-hidden />
}
