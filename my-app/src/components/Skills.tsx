import { skillGroups } from "../data/portfolio"

export function Skills() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {skillGroups.map((group) => (
        <div key={group.title}>
          <h3 className="text-white ml-2 mb-2 text-lg">{group.title}</h3>

          <div className="text-white border border-dashed border-blue-500 p-5 rounded-lg">
            <ul className="space-y-3">
              {group.items.map((it) => (
                <li key={it.name} className="flex gap-3 items-center">
                  <span className="w-36">{it.name}</span>

                  <div className="w-full">
                    <div
                      className="h-2 border border-white/30 rounded"
                      role="progressbar"
                      aria-label={`${it.name} nível`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={it.level}
                    >
                      <div className="h-full bg-blue-500 rounded" style={{ width: `${it.level}%` }} />
                    </div>
                  </div>

                  <span className="w-12 text-right text-white/70 text-sm">{it.level}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
