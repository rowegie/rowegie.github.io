import type { ReactNode } from 'react'

type Props = { id: string; title: string; children: ReactNode }

export default function Section({ id, title, children }: Props) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="section__title">
        {title}
      </h2>
      <div className="section__body">{children}</div>
    </section>
  )
}
