import { integrations, skillGroups } from '../data/profile'
import BrandChipList from './BrandChipList'
import Section from './Section'

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="skills">
        {skillGroups.map((g) => (
          <div key={g.name} className="skills__group">
            <dt>{g.name}</dt>
            <dd>
              <BrandChipList items={g.items} label={g.name} />
            </dd>
          </div>
        ))}
        <div className="skills__group">
          <dt>Third-party integrations</dt>
          <dd>
            <BrandChipList items={integrations} label="Third-party integrations" />
          </dd>
        </div>
      </dl>
    </Section>
  )
}
