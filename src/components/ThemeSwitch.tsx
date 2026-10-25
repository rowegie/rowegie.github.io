import { useState } from 'react'
import { applyChoice, storedChoice, type ThemeChoice } from '../lib/theme'
import { MonitorIcon, MoonIcon, SunIcon } from './icons'

const OPTIONS: { value: ThemeChoice; label: string; Icon: typeof SunIcon }[] = [
  { value: 'system', label: 'System', Icon: MonitorIcon },
  { value: 'light', label: 'Light', Icon: SunIcon },
  { value: 'dark', label: 'Dark', Icon: MoonIcon },
]

export default function ThemeSwitch() {
  const [choice, setChoice] = useState<ThemeChoice>(storedChoice)

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
