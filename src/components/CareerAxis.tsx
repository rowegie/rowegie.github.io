import type { Role } from '../data/profile'
import { formatRange, monthIndex } from '../lib/dates'

type Props = { roles: Role[] }

const FIRST_YEAR = 2016
const LAST_YEAR = 2026
const TOTAL_MONTHS = (LAST_YEAR - FIRST_YEAR + 1) * 12
const TICKS = [2016, 2018, 2020, 2022, 2024, 2026]

const pct = (months: number) => `${(months / TOTAL_MONTHS) * 100}%`

// A year axis of every role. It repeats the dated list below it, so the chart
// is hidden from assistive tech and the list stays the accessible source.
export default function CareerAxis({ roles }: Props) {
  return (
    <figure className="career-axis">
      <figcaption className="career-axis__caption">
        Roles by year, {FIRST_YEAR} to {LAST_YEAR}
      </figcaption>
      <div className="career-axis__chart" aria-hidden="true">
        <div className="career-axis__ticks">
          {TICKS.map((year) => (
            <span key={year} style={{ left: pct(monthIndex({ year, month: 1 }, FIRST_YEAR)) }}>
              {year}
            </span>
          ))}
        </div>
        <ol className="career-axis__rows">
          {roles.map((r) => {
            const start = monthIndex(r.start, FIRST_YEAR)
            const end = monthIndex(r.end, FIRST_YEAR) + 1
            return (
              <li key={`${r.employer}-${r.start.year}-${r.start.month}`} className="career-axis__row">
                <span className="career-axis__label">{r.employer}</span>
                <span className="career-axis__track">
                  {TICKS.map((year) => (
                    <span
                      key={year}
                      className="career-axis__grid"
                      style={{ left: pct(monthIndex({ year, month: 1 }, FIRST_YEAR)) }}
                    />
                  ))}
                  <span
                    className="career-axis__bar"
                    style={{ left: pct(start), width: pct(end - start) }}
                    title={`${r.title}, ${r.employer}: ${formatRange(r.start, r.end)}`}
                  />
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </figure>
  )
}
