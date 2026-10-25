import { clientFeedback } from '../data/profile'
import { ExternalLinkIcon, StarIcon } from './icons'

type Props = { compact?: boolean }

// The Upwork client rating for the Jetpack Shipping ERP work. The full version
// lists the client's endorsements; the compact one is a single line.
export default function ClientRating({ compact = false }: Props) {
  const score = clientFeedback.rating.toFixed(1)
  return (
    <div className={compact ? 'client-rating client-rating--compact' : 'client-rating'}>
      <p className="client-rating__score">
        <span className="client-rating__stars">
          {Array.from({ length: 5 }, (_, i) => (
            <StarIcon key={i} className="client-rating__star" />
          ))}
        </span>
        <a className="external-link" href={clientFeedback.url} target="_blank" rel="noopener noreferrer">
          {compact
            ? `${score} on ${clientFeedback.platform}`
            : `${score} client rating on ${clientFeedback.platform}`}
          <ExternalLinkIcon className="external-link__icon" />{' '}
          <span className="visually-hidden">(opens in a new tab)</span>
        </a>
      </p>
      {!compact && (
        <ul className="client-rating__endorsements" aria-label="Endorsed by the client">
          {clientFeedback.endorsements.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
