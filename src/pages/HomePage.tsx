import About from '../components/About'
import Education from '../components/Education'
import Experience from '../components/Experience'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import SiteFooter from '../components/SiteFooter'
import SiteSidebar from '../components/SiteSidebar'
import Skills from '../components/Skills'
import { useSectionLinks } from '../lib/useSectionLinks'

export default function HomePage() {
  useSectionLinks('home')

  return (
    <>
      <SiteSidebar current="home" />
      <div className="site-content">
        <main id="main" className="page" tabIndex={-1}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
        </main>
        <SiteFooter />
      </div>
    </>
  )
}
