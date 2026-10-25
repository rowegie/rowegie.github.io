import { useEffect, useRef, useState } from 'react'
import { profile, profileLinks } from '../data/profile'
import { sectionIds, sections } from '../data/sections'
import { contactPage, href, sectionPath } from '../lib/paths'
import { useActiveSection } from '../lib/useActiveSection'
import { BrandIcon, CloseIcon, MailIcon, MenuIcon } from './icons'
import ThemeSwitch from './ThemeSwitch'

// Matches the CSS breakpoint where the fixed sidebar replaces the top bar.
const WIDE_SCREEN = '(min-width: 64rem)'

type Props = { current: 'home' | 'contact' }

// Fixed left sidebar on wide screens; on smaller ones a top bar's menu button
// slides the same sidebar in as a drawer.
export default function SiteSidebar({ current }: Props) {
  const activeSection = useActiveSection(sectionIds, current === 'home')
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const sidebarRef = useRef<HTMLElement>(null)

  // While the drawer is open: the page behind it is inert and doesn't scroll,
  // focus moves into the drawer, and Escape closes it and returns focus.
  useEffect(() => {
    if (!open) return
    const content = document.querySelector('.site-content')
    content?.setAttribute('inert', '')
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    sidebarRef.current?.querySelector<HTMLElement>('a, button, input')?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      buttonRef.current?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      content?.removeAttribute('inert')
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  // Growing past the breakpoint shows the fixed sidebar; drop a stale drawer.
  useEffect(() => {
    const query = window.matchMedia?.(WIDE_SCREEN)
    if (!query) return
    const onChange = () => {
      if (query.matches) setOpen(false)
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="topbar">
        <a className="topbar__name" href={href()} aria-current={current === 'home' ? 'page' : undefined}>
          {profile.name}
        </a>
        <button
          ref={buttonRef}
          type="button"
          className="menu-button"
          aria-expanded={open}
          aria-controls="site-sidebar"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon className="menu-button__icon" /> : <MenuIcon className="menu-button__icon" />}
          <span className="visually-hidden">Menu</span>
        </button>
      </div>
      <div className="sidebar-backdrop" data-open={open || undefined} onClick={() => setOpen(false)} />
      <aside id="site-sidebar" className="sidebar" data-open={open || undefined} ref={sidebarRef}>
        <nav
          className="sidebar__nav"
          aria-label="Main"
          onClick={(e) => {
            // Following any link (including a #section on this page) closes the drawer.
            if ((e.target as HTMLElement).closest('a')) setOpen(false)
          }}
        >
          <a className="sidebar__name" href={href()} aria-current={current === 'home' ? 'page' : undefined}>
            {profile.name}
          </a>
          <ul className="sidebar__list sidebar__list--icons">
            <li>
              <a href={contactPage} aria-current={current === 'contact' ? 'page' : undefined}>
                <MailIcon className="sidebar__icon" />
                Contact
              </a>
            </li>
            {profileLinks.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={`${link.note ? `${link.label}, ${link.note}` : link.label} (opens in a new tab)`}
                >
                  <BrandIcon kind={link.kind} className="sidebar__icon" />
                  {link.kind === 'github' ? 'GitHub' : link.label}
                  <span className="sidebar__external" aria-hidden="true">
                    ↗
                  </span>
                  {link.note && <span className="sidebar__note">{link.note}</span>}
                </a>
              </li>
            ))}
          </ul>
          <hr className="sidebar__rule" />
          <ul className="sidebar__list">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={sectionPath(s.id)}
                  aria-current={activeSection === s.id ? 'location' : undefined}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sidebar__foot">
          <ThemeSwitch />
          <p className="sidebar__reach">For work &amp; everything else, reach me at</p>
          <a className="sidebar__email" href={`mailto:${profile.email}`}>
            <MailIcon className="sidebar__icon" />
            {profile.email}
          </a>
        </div>
      </aside>
    </>
  )
}
