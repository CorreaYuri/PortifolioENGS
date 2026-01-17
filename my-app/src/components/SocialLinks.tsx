import { socials } from "../data/portfolio"

export function SocialLinks() {
  return (
    <div className="flex items-center justify-between xl:justify-start gap-3 w-full">
      {socials.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={s.label}
          className="rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <i className={`btnoptionsBtn-RedesSociais text-slate-800 ${s.icon} btn-animado p-1 text-lg md:text-4xl`} />
        </a>
      ))}
    </div>
  )
}
