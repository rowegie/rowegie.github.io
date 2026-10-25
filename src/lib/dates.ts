import type { YearMonth } from '../data/profile'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function formatYearMonth({ year, month }: YearMonth): string {
  return `${MONTHS[month - 1]} ${year}`
}

export function formatRange(start: YearMonth, end: YearMonth): string {
  return `${formatYearMonth(start)} – ${formatYearMonth(end)}`
}

// Months since January of `fromYear`, used to place bars on the career axis.
export function monthIndex({ year, month }: YearMonth, fromYear: number): number {
  return (year - fromYear) * 12 + (month - 1)
}
