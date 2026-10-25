import { sectionAliases, sectionIds } from '../data/sections'

// Vite's base URL is "/" locally and "/<repo>/" on a GitHub Pages project
// site. Build every internal link from it so links work in both places and
// from both pages.
export const BASE_URL = import.meta.env.BASE_URL

export function href(path = ''): string {
  return `${BASE_URL}${path}`
}

// Each home-page section has its own clean address, e.g. /projects.
export const sectionPath = (id: string) => href(id)
export const contactPage = href('contact')

// Which part of the home page a path points at: '' for the top, a section id,
// or null when the path isn't part of the home page at all.
export function homeTarget(pathname: string): string | null {
  if (!pathname.startsWith(BASE_URL)) return null
  // /projects, /projects/ and /projects.html all mean the same section.
  const rest = pathname
    .slice(BASE_URL.length)
    .replace(/\/$/, '')
    .replace(/\.html$/, '')
  if (rest === '' || rest === 'index') return ''
  if (sectionIds.includes(rest)) return rest
  return sectionAliases[rest] ?? null
}
