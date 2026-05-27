"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import { navItems } from "../data/portfolio"

const sectionIds = navItems.map((item) => item.href.replace("#", ""))

function useActiveSection() {
  const [activeId, setActiveId] = useState(sectionIds[0])

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries[0]) {
          setActiveId(visibleEntries[0].target.id)
        }
      },
      {
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0.08, 0.2, 0.45, 0.7],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return activeId
}

export function ActiveNav() {
  const activeId = useActiveSection()

  return (
    <nav className="hidden items-center gap-1 md:flex" aria-label="Navegacao principal">
      {navItems.map((item) => {
        const id = item.href.replace("#", "")
        const isActive = activeId === id

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`nav-link inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-cyan-300 ${
              isActive
                ? "is-active bg-cyan-300/12 text-cyan-100 shadow-[0_0_24px_rgba(103,232,249,0.16)]"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <i className={`${item.icon} text-[0.8rem]`} aria-hidden />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

export function MobileNav() {
  const activeId = useActiveSection()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-cyan-100 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus:outline-none focus:ring-2 focus:ring-cyan-300"
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        aria-label="Abrir menu"
      >
        <i className={isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"} aria-hidden />
      </button>

      <div
        id="mobile-nav"
        className={`mobile-menu absolute left-4 right-4 top-[calc(100%+0.75rem)] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/94 shadow-2xl shadow-black/40 backdrop-blur-xl transition ${
          isOpen ? "is-open" : ""
        }`}
      >
        <nav className="grid gap-1 p-2" aria-label="Navegacao principal mobile">
          {navItems.map((item) => {
            const id = item.href.replace("#", "")
            const isActive = activeId === id

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`mobile-nav-link flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition focus:outline-none focus:ring-2 focus:ring-cyan-300 ${
                  isActive ? "bg-cyan-300/12 text-cyan-100" : "text-white/68 hover:bg-white/[0.06] hover:text-white"
                }`}
              >
                <i className={`${item.icon} w-4 text-cyan-200/80`} aria-hidden />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
