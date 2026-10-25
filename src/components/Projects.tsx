import { projects } from '../data/profile'
import BrandChipList from './BrandChipList'
import ClientRating from './ClientRating'
import { ExternalLinkIcon } from './icons'
import Section from './Section'

export default function Projects() {
  return (
    <Section id="projects" title="Projects">
      <ul className="projects">
        {projects.map((p) => (
          <li key={p.name} className="project">
            <div className="project__head">
              <h3 className="project__name">{p.name}</h3>
            </div>
            <p className="project__summary">{p.summary}</p>
            <dl className="project__meta">
              <div>
                <dt>Role</dt>
                <dd>
                  {p.role}
                  {p.context && <span className="project__context">, {p.context}</span>}
                </dd>
              </div>
              <div>
                <dt>My work</dt>
                <dd>{p.work}</dd>
              </div>
            </dl>
            {p.feedback && <ClientRating />}
            <div className="project__foot">
              <BrandChipList items={p.stack} label={`${p.name} technologies`} />
              {p.site && (
                <p className="project__site">
                  <a className="external-link" href={p.site.url} rel="noopener noreferrer" target="_blank">
                    Visit {p.site.label}
                    <ExternalLinkIcon className="external-link__icon" />{' '}
                    <span className="visually-hidden">(opens in a new tab)</span>
                  </a>
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
