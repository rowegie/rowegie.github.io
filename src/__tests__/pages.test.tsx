import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { brandIcon } from '../data/brandIcons'
import { sections } from '../data/sections'
import { msUntilThemeChange, timeTheme } from '../lib/theme'
import { clientFeedback, experience, integrations, profile, projects, skillGroups } from '../data/profile'
import { formatYearMonth } from '../lib/dates'
import ContactPage from '../pages/ContactPage'
import HomePage from '../pages/HomePage'

// Things from the resume or private notes that must never reach the site.
const FORBIDDEN = ['9096459987', '639096459987', '.pdf', 'drive.google', 'rd-stage', 'Talima', '2,300']

describe('home page', () => {
  it('has a single h1 with the name', () => {
    render(<HomePage />)
    const h1s = screen.getAllByRole('heading', { level: 1 })
    expect(h1s).toHaveLength(1)
    expect(h1s[0]).toHaveTextContent(profile.name)
  })

  it('lists every role with its title, employer and dates', () => {
    render(<HomePage />)
    const roles = document.querySelectorAll('.role')
    expect(roles).toHaveLength(experience.length)
    experience.forEach((role, i) => {
      const item = within(roles[i] as HTMLElement)
      expect(item.getByRole('heading', { level: 3 })).toHaveTextContent(role.title)
      expect(item.getByRole('heading', { level: 3 })).toHaveTextContent(role.employer)
      expect(roles[i]).toHaveTextContent(
        `${formatYearMonth(role.start)} – ${formatYearMonth(role.end)}`,
      )
    })
  })

  it('shows every project', () => {
    render(<HomePage />)
    for (const p of projects) {
      expect(screen.getByRole('heading', { level: 3, name: p.name })).toBeInTheDocument()
    }
    expect(screen.getByRole('heading', { level: 2, name: 'Projects' })).toBeInTheDocument()
  })

  it('puts the role title under the name', () => {
    render(<HomePage />)
    const name = screen.getByRole('heading', { level: 1 })
    const role = screen.getByText(profile.role)
    expect(name.compareDocumentPosition(role) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy()
  })

  it('opens every external link in a new tab, safely', () => {
    const { container } = render(<HomePage />)
    const external = [...container.querySelectorAll<HTMLAnchorElement>('a[href^="http"]')]
    expect(external.length).toBeGreaterThan(0)
    for (const a of external) {
      expect(a, a.href).toHaveAttribute('target', '_blank')
      expect(a.getAttribute('rel'), a.href).toContain('noopener')
    }
  })

  it('shows the years each GitHub account covers in the footer', () => {
    render(<HomePage />)
    const footer = within(screen.getByRole('contentinfo'))
    expect(footer.getByText('2023–present')).toBeInTheDocument()
    expect(footer.getByText('2017–2022')).toBeInTheDocument()
  })

  it('points every in-page link at an element that exists', () => {
    const { container } = render(<HomePage />)
    const hashLinks = [...container.querySelectorAll<HTMLAnchorElement>('a[href*="#"]')]
    expect(hashLinks.length).toBeGreaterThan(0)
    for (const a of hashLinks) {
      const id = a.getAttribute('href')!.split('#')[1]
      expect(document.getElementById(id), `#${id}`).not.toBeNull()
    }
  })

  it('links each section by a clean path that matches a section on the page', () => {
    const { container } = render(<HomePage />)
    for (const { id } of sections) {
      const links = container.querySelectorAll(`a[href="/${id}"]`)
      expect(links.length, `/${id}`).toBeGreaterThan(0)
      expect(document.getElementById(id), id).not.toBeNull()
    }
  })
})

describe('contact page', () => {
  it('has a single h1 and the email as a mailto link', () => {
    render(<ContactPage />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    const mail = screen.getAllByRole('link', { name: profile.email })
    expect(mail[0]).toHaveAttribute('href', `mailto:${profile.email}`)
  })

  it('links LinkedIn and both GitHub accounts as named icons', () => {
    render(<ContactPage />)
    const main = within(screen.getByRole('main'))
    expect(main.getByRole('link', { name: 'LinkedIn (opens in a new tab)' })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/rowegie-lambojon-951a4a12a/',
    )
    expect(main.getByRole('link', { name: 'GitHub (gie-afk), 2023–present (opens in a new tab)' })).toHaveAttribute(
      'href',
      'https://github.com/gie-afk',
    )
    expect(main.getByRole('link', { name: 'GitHub (rowegie), 2017–2022 (opens in a new tab)' })).toHaveAttribute(
      'href',
      'https://github.com/rowegie',
    )
  })

  it('no longer has the first-message tips', () => {
    render(<ContactPage />)
    expect(screen.queryByText('What helps in a first message')).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'See my projects' })).not.toBeInTheDocument()
  })

  it('copies the email address and says so', async () => {
    const user = userEvent.setup()
    render(<ContactPage />)
    await user.click(screen.getByRole('button', { name: 'Copy email' }))
    expect(await navigator.clipboard.readText()).toBe(profile.email)
    expect(screen.getByRole('status')).toHaveTextContent('Email address copied.')
  })
})

describe('sidebar', () => {
  it('has the name, contact, profiles, sections and email', () => {
    render(<HomePage />)
    const sidebar = within(screen.getByRole('complementary'))
    expect(sidebar.getByRole('link', { name: profile.name })).toHaveAttribute('aria-current', 'page')
    expect(sidebar.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
    expect(sidebar.getByRole('link', { name: 'LinkedIn (opens in a new tab)' })).toBeInTheDocument()
    expect(sidebar.getByRole('link', { name: 'Upwork (opens in a new tab)' })).toHaveAttribute('href', clientFeedback.url)
    expect(sidebar.getByRole('link', { name: 'GitHub (gie-afk), 2023–present (opens in a new tab)' })).toHaveAttribute('href', 'https://github.com/gie-afk')
    expect(sidebar.getByRole('link', { name: 'GitHub (rowegie), 2017–2022 (opens in a new tab)' })).toHaveAttribute('href', 'https://github.com/rowegie')
    for (const label of ['About', 'Skills', 'Projects', 'Experiences', 'Education']) {
      expect(sidebar.getByRole('link', { name: label })).toBeInTheDocument()
    }
    expect(sidebar.getByRole('link', { name: profile.email })).toHaveAttribute('href', `mailto:${profile.email}`)
  })

  it('marks Contact as the current page on the contact page', () => {
    render(<ContactPage />)
    const sidebar = within(screen.getByRole('complementary'))
    expect(sidebar.getByRole('link', { name: 'Contact' })).toHaveAttribute('aria-current', 'page')
  })
})

describe('menu button (phone drawer)', () => {
  it('opens the drawer, makes the page inert, and Escape closes it', async () => {
    const user = userEvent.setup()
    const { container } = render(<HomePage />)
    const button = screen.getByRole('button', { name: 'Menu' })
    const sidebar = screen.getByRole('complementary')
    const content = container.querySelector('.site-content')!
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveAttribute('aria-controls', sidebar.id)

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(sidebar).toHaveAttribute('data-open')
    expect(content).toHaveAttribute('inert')

    await user.keyboard('{Escape}')
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(sidebar).not.toHaveAttribute('data-open')
    expect(content).not.toHaveAttribute('inert')
    expect(button).toHaveFocus()
  })

  it('jumps to a section and shows its clean path in the URL', async () => {
    const user = userEvent.setup()
    render(<HomePage />)
    await user.click(within(screen.getByRole('complementary')).getByRole('link', { name: 'Projects' }))
    await new Promise((r) => requestAnimationFrame(() => r(null)))
    expect(window.location.pathname).toBe('/projects')
    expect(window.location.hash).toBe('')
    expect(document.getElementById('projects')).toHaveFocus()
  })

  it('opens on the section named in the path', () => {
    const scroll = vi.spyOn(Element.prototype, 'scrollIntoView')
    window.history.replaceState(null, '', '/experiences')
    render(<HomePage />)
    expect(scroll.mock.contexts[0]).toBe(document.getElementById('experiences'))
    scroll.mockRestore()
  })

  it('sends the old /experience/ address to /experiences', () => {
    const scroll = vi.spyOn(Element.prototype, 'scrollIntoView')
    window.history.replaceState(null, '', '/experience/')
    render(<HomePage />)
    expect(scroll.mock.contexts[0]).toBe(document.getElementById('experiences'))
    expect(window.location.pathname).toBe('/experiences')
    scroll.mockRestore()
  })

  it('shows no company or project logos, only names', () => {
    render(<HomePage />)
    expect(screen.getByRole('heading', { level: 2, name: 'Experiences' })).toBeInTheDocument()
    for (const id of ['projects', 'experiences']) {
      // Tech chips may use small brand icons; anything else would be a logo.
      const images = [...document.getElementById(id)!.querySelectorAll('img')].filter(
        (img) => !img.closest('.brand-chips'),
      )
      expect(images, id).toHaveLength(0)
    }
    expect(screen.getByRole('heading', { level: 3, name: /BaseUp Inc \(now Yodelle\)/ })).toBeInTheDocument()
  })

  it('rewrites an old /#section link to the clean path', () => {
    window.history.replaceState(null, '', '/#skills')
    render(<HomePage />)
    expect(window.location.hash).toBe('')
    expect(window.location.pathname).toBe('/skills')
  })

  it('closes after choosing a link', async () => {
    const user = userEvent.setup()
    render(<HomePage />)
    const button = screen.getByRole('button', { name: 'Menu' })
    await user.click(button)
    await user.click(within(screen.getByRole('complementary')).getByRole('link', { name: 'Skills' }))
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })
})

describe('theme switch', () => {
  afterEach(() => {
    delete document.documentElement.dataset.theme
    localStorage.clear()
  })

  it('defaults to Auto (time of day) and remembers Light or Dark', async () => {
    const user = userEvent.setup()
    render(<HomePage />)
    const auto = screen.getByRole('radio', { name: 'Auto (time of day)' })
    expect(auto).toBeChecked()
    expect(document.documentElement.dataset.theme).toBe(timeTheme())

    await user.click(screen.getByRole('radio', { name: 'Dark' }))
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')

    await user.click(auto)
    expect(localStorage.getItem('theme')).toBeNull()
    expect(document.documentElement.dataset.theme).toBe(timeTheme())
  })

  it('is light from 6:00 to 18:00 and dark otherwise', () => {
    const at = (h: number, m = 0) => new Date(2026, 9, 25, h, m)
    expect(timeTheme(at(5, 59))).toBe('dark')
    expect(timeTheme(at(6))).toBe('light')
    expect(timeTheme(at(17, 59))).toBe('light')
    expect(timeTheme(at(18))).toBe('dark')
    expect(msUntilThemeChange(at(17, 30))).toBe(30 * 60 * 1000)
    expect(msUntilThemeChange(at(23))).toBe(7 * 60 * 60 * 1000)
  })

  it('starts from a saved choice', () => {
    localStorage.setItem('theme', 'light')
    render(<ContactPage />)
    expect(screen.getByRole('radio', { name: 'Light' })).toBeChecked()
  })
})

describe('Upwork client feedback', () => {
  it('shows the rating and endorsements on the Jetpack Shipping project', () => {
    render(<HomePage />)
    const project = screen.getByRole('heading', { level: 3, name: 'Jetpack Shipping ERP' }).closest('li')!
    const item = within(project)
    expect(item.getByRole('link', { name: '5.0 client rating on Upwork (opens in a new tab)' })).toHaveAttribute('href', clientFeedback.url)
    for (const e of clientFeedback.endorsements) expect(item.getByText(e)).toBeInTheDocument()
  })

  it('shows a compact rating on the Jetpack Shipping role and a highlight in About', () => {
    render(<HomePage />)
    const role = document.querySelectorAll('.role')[0] as HTMLElement
    expect(within(role).getByRole('link', { name: '5.0 on Upwork (opens in a new tab)' })).toBeInTheDocument()
    expect(screen.getByText('Rated 5.0 by a client')).toBeInTheDocument()
  })
})

describe('skill and integration icons', () => {
  it('has an icon for every skill, integration, project and experience keyword', () => {
    const names = [
      ...skillGroups.flatMap((g) => g.items),
      ...integrations,
      ...projects.flatMap((p) => p.stack),
      ...experience.flatMap((r) => r.tech),
    ]
    const missing = names.filter((n) => !brandIcon(n))
    expect(missing).toEqual([])
  })
})

describe('private details', () => {
  it.each([
    ['home', HomePage],
    ['contact', ContactPage],
  ])('are not on the %s page', (_name, Page) => {
    const { container } = render(<Page />)
    for (const term of FORBIDDEN) {
      expect(container.innerHTML).not.toContain(term)
    }
  })
})
