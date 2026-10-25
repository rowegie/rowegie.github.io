import { integrations, skillGroups, type SkillGroup } from '../data/profile'
import BrandChipList from './BrandChipList'
import Section from './Section'

// Backend-first order: backend, testing, databases and cloud, then API
// integrations (a core backend strength), then frontend, tooling and operating
// systems.
const apiIntegrations: SkillGroup = { name: 'API integrations', items: integrations }
const afterCloud = skillGroups.findIndex((g) => g.name === 'Cloud and delivery') + 1
const groups = [
  ...skillGroups.slice(0, afterCloud),
  apiIntegrations,
  ...skillGroups.slice(afterCloud),
]

export default function Skills() {
  return (
    <Section id="skills" title="Skills">
      <dl className="skills">
        {groups.map((g) => (
          <div key={g.name} className="skills__group">
            <dt>{g.name}</dt>
            <dd>
              <BrandChipList items={g.items} label={g.name} />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}
