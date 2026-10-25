import { profile } from '../data/profile'
import { photoUrl } from '../lib/photo'

type Props = { className: string; width: number; height: number; eager?: boolean }

export default function ProfilePhoto({ className, width, height, eager = false }: Props) {
  if (!photoUrl) return null
  return (
    <img
      className={className}
      src={photoUrl}
      alt={`Portrait of ${profile.name}`}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}
