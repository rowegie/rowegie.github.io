// The home page's sections. Each one also has its own address (/about,
// /projects, …); the build writes a copy of the home page for each of them
// (about.html, …) so they work as direct links on GitHub Pages.
export const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experiences', label: 'Experiences' },
  { id: 'education', label: 'Education' },
] as const

export type SectionId = (typeof sections)[number]['id']

export const sectionIds: readonly string[] = sections.map((s) => s.id)

// Older addresses that still work and point at a renamed section.
export const sectionAliases: Readonly<Record<string, SectionId>> = {
  experience: 'experiences',
}
