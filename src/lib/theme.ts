export type Theme = 'light' | 'dark'
export type ThemeChoice = Theme | 'system'

const STORAGE_KEY = 'theme'
const THEME_COLORS: Record<Theme, string> = { light: '#FAFBFA', dark: '#121A21' }

// The choice is a per-browser convenience; storage can be unavailable
// (private windows, blocked site data), so every access is guarded.
export function storedTheme(): Theme | null {
  try {
    const t = localStorage.getItem(STORAGE_KEY)
    return t === 'light' || t === 'dark' ? t : null
  } catch {
    return null
  }
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((m) => m.setAttribute('content', THEME_COLORS[theme]))
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Not saved; the toggle still works for this visit.
  }
}

export function storedChoice(): ThemeChoice {
  return storedTheme() ?? 'system'
}

// "system" drops the saved choice so the CSS follows prefers-color-scheme again.
export function applyChoice(choice: ThemeChoice) {
  if (choice !== 'system') {
    applyTheme(choice)
    return
  }
  delete document.documentElement.dataset.theme
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => {
    const media = m.getAttribute('media') ?? ''
    m.setAttribute('content', THEME_COLORS[media.includes('dark') ? 'dark' : 'light'])
  })
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Nothing saved to remove.
  }
}
