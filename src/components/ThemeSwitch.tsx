import { useEffect, useState } from 'react'
import { applyChoice, msUntilThemeChange, showTheme, storedChoice, timeTheme, type ThemeChoice } from '../lib/theme'
import { AutoThemeIcon, MoonIcon, SunIcon } from './icons'

const OPTIONS: { value: ThemeChoice; label: string; Icon: typeof SunIcon }[] = [
  { value: 'auto', label: 'Auto (time of day)', Icon: AutoThemeIcon },
  { value: 'light', label: 'Light', Icon: SunIcon },
  { value: 'dark', label: 'Dark', Icon: MoonIcon },
]

export default function ThemeSwitch() {
  const [choice, setChoice] = useState<ThemeChoice>(storedChoice)

  // While on Auto, flip at 6:00 / 18:00 if the page stays open, and recheck
  // when the visitor comes back to the tab (timers pause while asleep).
  useEffect(() => {
    if (choice !== 'auto') return
    let timer = 0
    const refresh = () => {
      showTheme(timeTheme())
      window.clearTimeout(timer)
      timer = window.setTimeout(refresh, msUntilThemeChange() + 1000)
    }
    const onVisible = () => {
      if (document.visibilityState === 'visible') refresh()
    }
    refresh()
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [choice])

  return (
    <fieldset className="theme-switch">
      <legend className="visually-hidden">Theme</legend>
      {OPTIONS.map(({ value, label, Icon }) => (
        <label key={value} className="theme-switch__option" title={label}>
          <input
            type="radio"
            name="theme"
            value={value}
            checked={choice === value}
            onChange={() => {
              applyChoice(value)
              setChoice(value)
            }}
          />
          <Icon className="theme-switch__icon" />
          <span className="visually-hidden">{label}</span>
        </label>
      ))}
    </fieldset>
  )
}
