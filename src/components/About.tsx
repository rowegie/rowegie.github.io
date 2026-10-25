import { clientFeedback, highlights, profile } from '../data/profile'
import { ExternalLinkIcon } from './icons'
import Section from './Section'

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="prose">
        {profile.summary.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <dl className="highlights">
        {highlights.map((h) => (
          <div key={h.name} className="highlights__item">
            <dt>{h.name}</dt>
            <dd>{h.text}</dd>
          </div>
        ))}
        <div className="highlights__item">
          <dt>Rated {clientFeedback.rating.toFixed(1)} by a client</dt>
          <dd>
            On {clientFeedback.platform}, for the manufacturing ERP work, with client endorsements
            for{' '}
            {clientFeedback.endorsements.map((e) => `“${e}”`).join(' and ')}.{' '}
            <a className="external-link" href={clientFeedback.url} target="_blank" rel="noopener noreferrer">
              View {clientFeedback.platform} profile
              <ExternalLinkIcon className="external-link__icon" />{' '}
              <span className="visually-hidden">(opens in a new tab)</span>
            </a>
          </dd>
        </div>
      </dl>
    </Section>
  )
}
