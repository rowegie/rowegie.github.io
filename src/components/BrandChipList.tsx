import { brandIcon } from '../data/brandIcons'

type Props = { items: string[]; label: string }

// Skills and integrations as chips: a small brand tile plus the name. The tiles
// are decorative; the name carries the meaning.
export default function BrandChipList({ items, label }: Props) {
  return (
    <ul className="brand-chips" aria-label={label}>
      {items.map((name) => {
        const icon = brandIcon(name)
        return (
          <li key={name} className="brand-chips__item">
            {icon?.kind === 'mark' && (
              <span className="brand-chips__tile" style={{ background: icon.color }} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill={icon.ink} focusable="false">
                  <path d={icon.path} />
                </svg>
              </span>
            )}
            {icon?.kind === 'image' && <img className="brand-chips__tile" src={icon.src} alt="" />}
            {icon?.kind === 'glyph' && (
              <span className="brand-chips__tile brand-chips__tile--glyph" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  focusable="false"
                >
                  <path d={icon.path} />
                </svg>
              </span>
            )}
            {name}
          </li>
        )
      })}
    </ul>
  )
}
