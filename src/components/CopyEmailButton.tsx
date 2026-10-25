import { useEffect, useRef, useState } from 'react'

type Props = { email: string }

type Status = 'idle' | 'copied' | 'failed'

const MESSAGES: Record<Status, string> = {
  idle: '',
  copied: 'Email address copied.',
  failed: 'Couldn’t copy. Select the address and copy it instead.',
}

export default function CopyEmailButton({ email }: Props) {
  const [status, setStatus] = useState<Status>('idle')
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  // Without the Clipboard API (old browsers, insecure origins) the button
  // can't work, and the address is still there to select.
  if (typeof navigator === 'undefined' || !navigator.clipboard) return null

  async function copy() {
    window.clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(email)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
    timer.current = window.setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <span className="copy-email">
      <button type="button" className="button button--secondary" onClick={copy}>
        Copy email
      </button>
      <span className="copy-email__status" role="status">
        {MESSAGES[status]}
      </span>
    </span>
  )
}
