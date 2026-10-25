import { profile } from '../data/profile'
import SocialLinks from './SocialLinks'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>
          {profile.name}, {profile.location}
        </p>
        <div className="site-footer__contact">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <SocialLinks />
        </div>
      </div>
    </footer>
  )
}
