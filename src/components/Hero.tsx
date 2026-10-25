import { profile } from '../data/profile'
import { sectionPath } from '../lib/paths'
import ProfilePhoto from './ProfilePhoto'
import SocialLinks from './SocialLinks'

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
      <SocialLinks className="hero__social" />
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
