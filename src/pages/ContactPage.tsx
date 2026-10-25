import ContactDetails from '../components/ContactDetails'
import ProfilePhoto from '../components/ProfilePhoto'
import SiteFooter from '../components/SiteFooter'
import SiteSidebar from '../components/SiteSidebar'
import { useSectionLinks } from '../lib/useSectionLinks'

export default function ContactPage() {
  useSectionLinks('contact')

  return (
    <>
      <SiteSidebar current="contact" />
      <div className="site-content">
        <main id="main" className="page" tabIndex={-1}>
          <section className="contact-page" aria-labelledby="contact-title">
            <div className="contact-page__head">
              <ProfilePhoto className="contact-page__photo" width={240} height={240} eager />
              <h1 id="contact-title" className="contact-page__title">
                Contact
              </h1>
            </div>
            <p className="contact-page__intro">
              Email is the best way to reach me, whether it’s about a role, a project, or a question
              about my experience.
            </p>
            <ContactDetails />
          </section>
        </main>
        <SiteFooter />
      </div>
    </>
  )
}
