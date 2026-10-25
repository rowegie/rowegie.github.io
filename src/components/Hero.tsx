import { profile, profileLinks } from '../data/profile'
import { sectionPath } from '../lib/paths'
import ProfilePhoto from './ProfilePhoto'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      {/* Wide screens: a round photo beside the heading, as on the contact page.
          Smaller screens: a large photo stacked above it. */}
      <div className="hero__title-row">
        <ProfilePhoto className="hero__photo" width={320} height={320} eager />
        <div className="hero__title">
          <h1 id="hero-title" className="hero__name">
            {profile.name}
          </h1>
          <p className="hero__role">{profile.role}</p>
        </div>
      </div>
      <p className="hero__statement">{profile.positioning}</p>
      {/* Smaller screens only; on wide screens the sidebar carries these. */}
      <ul className="hero__links" aria-label="Profiles">
        {profileLinks.map((link) => (
          <li key={link.url}>
            <a href={link.url} target="_blank" rel="noopener noreferrer me">
              {link.kind === 'github' ? 'github' : link.label.toLowerCase()}
              <span className="hero__links-arrow" aria-hidden="true">
                ↗
              </span>
              {link.note && (
                <>
                  {' '}
                  <span className="hero__links-note">{link.note}</span>
                </>
              )}{' '}
              <span className="visually-hidden">(opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
      <div className="hero__actions">
        <a className="button button--primary" href={`mailto:${profile.email}`}>
          Email me
        </a>
        <a className="button button--secondary" href={sectionPath('projects')}>
          See projects
        </a>
      </div>
      <p className="hero__location">Based in {profile.location}</p>
    </section>
  )
}
