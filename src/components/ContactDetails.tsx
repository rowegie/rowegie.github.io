import { profile } from '../data/profile'
import CopyEmailButton from './CopyEmailButton'
import SocialLinks from './SocialLinks'

export default function ContactDetails() {
  return (
    <div className="contact-details">
      <div className="contact-details__email">
        <p className="contact-details__label">Email</p>
        <p className="contact-details__address">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
        <div className="contact-details__actions">
          <a className="button button--primary" href={`mailto:${profile.email}`}>
            Email me
          </a>
          <CopyEmailButton email={profile.email} />
        </div>
      </div>
      <dl className="contact-details__facts">
        <div>
          <dt>Location</dt>
          <dd>{profile.location}</dd>
        </div>
        <div>
          <dt>Time zone</dt>
          <dd>{profile.timezone}</dd>
        </div>
        <div>
          <dt>Profiles</dt>
          <dd>
            <SocialLinks className="social-links--large" />
          </dd>
        </div>
      </dl>
    </div>
  )
}
