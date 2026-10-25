import { profileLinks } from '../data/profile'
import { BrandIcon } from './icons'

type Props = { className?: string }

// The two GitHub accounts share an icon, so each shows the years it covers.
export default function SocialLinks({ className = '' }: Props) {
  return (
    <ul className={`social-links ${className}`.trim()}>
      {profileLinks.map((link) => {
        const name = link.note ? `${link.label}, ${link.note}` : link.label
        return (
          <li key={link.url}>
            <a
              className="social-links__link"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer me"
              aria-label={`${name} (opens in a new tab)`}
              title={name}
            >
              <BrandIcon kind={link.kind} className="social-links__icon" />
              {link.note && (
                <span className="social-links__note" aria-hidden="true">
                  {link.note}
                </span>
              )}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
