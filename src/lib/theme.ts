export type Theme = 'light' | 'dark'
export type ThemeChoice = Theme | 'auto'

const STORAGE_KEY = 'theme'
const THEME_COLORS: Record<Theme, string> = { light: '#FAFBFA', dark: '#121A21' }

// "Auto" is light from 6:00 to 18:00 in the visitor's local time, dark otherwise.
// Keep in sync with the pre-paint script in index.html and contact.html.
const LIGHT_FROM = 6
const DARK_FROM = 18

export function timeTheme(now = new Date()): Theme {
  const hour = now.getHours()
  return hour >= LIGHT_FROM && hour < DARK_FROM ? 'light' : 'dark'
}

// Milliseconds until Auto next flips (the next 6:00 or 18:00).
export function msUntilThemeChange(now = new Date()): number {
  const next = new Date(now)
  const hour = now.getHours()
  if (hour < LIGHT_FROM) next.setHours(LIGHT_FROM, 0, 0, 0)
  else if (hour < DARK_FROM) next.setHours(DARK_FROM, 0, 0, 0)
  else {
    next.setDate(next.getDate() + 1)
    next.setHours(LIGHT_FROM, 0, 0, 0)
  }
  return next.getTime() - now.getTime()
}

// Paint a theme without changing the saved choice.
export function showTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((m) => m.setAttribute('content', THEME_COLORS[theme]))
}

// The choice is a per-browser convenience; storage can be unavailable
// (private windows, blocked site data), so every access is guarded.
export function storedChoice(): ThemeChoice {
  try {
    const t = localStorage.getItem(STORAGE_KEY)
    return t === 'light' || t === 'dark' ? t : 'auto'
  } catch {
    return 'auto'
  }
}

// Light/Dark are remembered; Auto clears the saved choice and follows the clock.
export function applyChoice(choice: ThemeChoice) {
  showTheme(choice === 'auto' ? timeTheme() : choice)
  try {
    if (choice === 'auto') localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, choice)
  } catch {
    // Not saved; the switch still works for this visit.
  }
}
