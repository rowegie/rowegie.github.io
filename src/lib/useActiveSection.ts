import { useEffect, useState } from 'react'

// Returns the id of the section currently being read: the last one whose top
// has scrolled past a line 30% down the viewport (or into view, at the end of
// the page). Null above the first one.
export function useActiveSection(ids: readonly string[], enabled: boolean): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (!enabled) return
    let frame = 0

    const update = () => {
      frame = 0
      // A short final section can't scroll up to the line, so once the page is
      // scrolled to the end, count anything that has come into view.
      const atEnd =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      const line = atEnd ? window.innerHeight : window.innerHeight * 0.3
      let current: string | null = null
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ids, enabled])

  return active
}
