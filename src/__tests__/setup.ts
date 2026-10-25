import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// jsdom doesn't implement scrolling; the home page calls this for #section URLs.
Element.prototype.scrollIntoView = () => {}

afterEach(() => {
  cleanup()
  // Following a #section link in one test shouldn't leak into the next.
  window.history.replaceState(null, '', '/')
})
