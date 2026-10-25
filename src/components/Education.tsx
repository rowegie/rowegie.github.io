import { education } from '../data/profile'
import Section from './Section'

export default function Education() {
  return (
    <Section id="education" title="Education">
      <ul className="education">
        {education.map((e) => (
          <li key={e.credential} className="education__item">
            <h3 className="education__credential">{e.credential}</h3>
            <p className="education__school">
              {e.school}, {e.location}
            </p>
            <p className="education__year">{e.year}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
