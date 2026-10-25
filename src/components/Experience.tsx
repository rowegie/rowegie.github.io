import { experience } from '../data/profile'
import { formatYearMonth } from '../lib/dates'
import BrandChipList from './BrandChipList'
import CareerAxis from './CareerAxis'
import ClientRating from './ClientRating'
import Section from './Section'

const toIso = ({ year, month }: { year: number; month: number }) =>
  `${year}-${String(month).padStart(2, '0')}`

export default function Experience() {
  return (
    <Section id="experiences" title="Experiences">
      <CareerAxis roles={experience} />
      <ol className="roles">
        {experience.map((r) => (
          <li key={`${r.employer}-${toIso(r.start)}`} className="role">
            <div className="role__head">
              <h3 className="role__title">
                {r.title}
                <span className="role__employer">{r.employer}</span>
              </h3>
              <p className="role__when">
                <time dateTime={toIso(r.start)}>{formatYearMonth(r.start)}</time>
                {' – '}
                <time dateTime={toIso(r.end)}>{formatYearMonth(r.end)}</time>
              </p>
              <p className="role__location">{r.location}</p>
              {r.feedback && <ClientRating compact />}
            </div>
            <ul className="role__duties">
              {r.duties.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <BrandChipList items={r.tech} label={`Technologies at ${r.employer}`} />
          </li>
        ))}
      </ol>
    </Section>
  )
}
