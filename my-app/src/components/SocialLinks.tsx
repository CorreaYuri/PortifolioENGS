import { socials } from "../data/portfolio"

export function SocialLinks() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={s.label}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition hover:-translate-y-0.5 hover:border-cyan-300/45 hover:bg-cyan-300/10 hover:text-cyan-100 focus:outline-none focus:ring-2 focus:ring-cyan-300"
        >
          <i className={`${s.icon} text-lg`} aria-hidden />
        </a>
      ))}
    </div>
  )
}
