import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/schibsted-grotesk'
import '@fontsource-variable/jetbrains-mono'
import './styles/global.css'
import ContactPage from './pages/ContactPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ContactPage />
  </StrictMode>,
)
