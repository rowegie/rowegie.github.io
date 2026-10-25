import { useEffect } from 'react'
import { homeTarget, href, sectionPath } from './paths'

function goTo(id: string) {
  if (!id) {
    window.scrollTo({ top: 0 })
    return
  }
  const target = document.getElementById(id)
  if (!target) return
  target.scrollIntoView()
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
}

// In-page navigation without "#" in the address bar.
// - On the home page, links to /about, /projects, … scroll to that section and
//   update the address with a clean path, so Back/Forward step through sections.
// - Opening one of those addresses directly lands on its section.
// - Old-style /#projects links still work and are rewritten to /projects.
// - Other in-page links (the skip link) move focus without touching the URL.
export function useSectionLinks(page: 'home' | 'contact') {
  useEffect(() => {
    const onHome = page === 'home'
    const arrivedHash = decodeURIComponent(window.location.hash.slice(1))
    if (arrivedHash) {
      const section = onHome ? homeTarget(href(`${arrivedHash}/`)) : null
      document.getElementById(section || arrivedHash)?.scrollIntoView()
      const clean = section ? sectionPath(section) : window.location.pathname
      history.replaceState(history.state, '', clean + window.location.search)
    } else if (onHome) {
      const id = homeTarget(window.location.pathname)
      if (id) {
        document.getElementById(id)?.scrollIntoView()
        // Other spellings (/experience, /projects/, /projects.html) show the canonical one.
        if (window.location.pathname !== sectionPath(id)) {
          history.replaceState(history.state, '', sectionPath(id) + window.location.search)
        }
      }
    }

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return
      }
      const link = (e.target as Element | null)?.closest?.('a')
      if (!link || link.target) return
      const url = new URL(link.href, window.location.href)
      if (url.origin !== location.origin) return

      // Same-page #fragment (e.g. the skip link): focus it, leave the URL alone.
      if (url.hash && url.pathname === location.pathname) {
        const id = decodeURIComponent(url.hash.slice(1))
        if (!document.getElementById(id)) return
        e.preventDefault()
        requestAnimationFrame(() => goTo(id))
        return
      }

      // Home-page section (or the top) while already on the home page.
      const id = onHome && !url.hash ? homeTarget(url.pathname) : null
      if (id === null) return
      e.preventDefault()
      const path = id ? sectionPath(id) : href()
      if (location.pathname !== path) history.pushState(null, '', path + location.search)
      // Wait a frame so a closing menu drawer has released the page first.
      requestAnimationFrame(() => goTo(id))
    }

    const onPopState = () => {
      const id = homeTarget(location.pathname)
      if (id !== null) goTo(id)
    }

    // Back/Forward between sections should land on the section heading, not on
    // whatever scroll position the browser remembered for that entry.
    const restoration = history.scrollRestoration
    if (onHome) history.scrollRestoration = 'manual'

    document.addEventListener('click', onClick)
    if (onHome) window.addEventListener('popstate', onPopState)
    return () => {
      history.scrollRestoration = restoration
      document.removeEventListener('click', onClick)
      window.removeEventListener('popstate', onPopState)
    }
  }, [page])
}
