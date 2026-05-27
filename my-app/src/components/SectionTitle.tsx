type SectionTitleProps = {
  children: React.ReactNode
  description?: string
  eyebrow?: string
  icon?: string
}

export function SectionTitle({ children, description, eyebrow, icon }: SectionTitleProps) {
  return (
    <div className="mb-10 max-w-3xl">
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-amber-200/80">
          {icon && <i className={`${icon} text-amber-200`} aria-hidden />}
          <span>{eyebrow}</span>
        </p>
      )}
      <h2 className="text-3xl font-semibold tracking-normal text-white md:text-5xl">{children}</h2>
      {description && <p className="mt-4 text-base leading-7 text-white/60 md:text-lg">{description}</p>}
    </div>
  )
}
