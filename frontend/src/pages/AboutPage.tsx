import { useMemo } from 'react'
import { useContent } from '../context/ContentContext'
import MemberCard from '../components/MemberCard'
import './AboutPage.css'

export default function AboutPage() {
  const { content, loading } = useContent()

  const membersByDomain = useMemo(() => {
    const grouped = new Map<string, typeof content.members>()
    for (const member of content.members) {
      const list = grouped.get(member.domain) ?? []
      list.push(member)
      grouped.set(member.domain, list)
    }
    return Array.from(grouped.entries())
  }, [content.members])

  return (
    <div className="page">
      <div className="container">
        <header className="page-header">
          <h1>About Us</h1>
          <p>Meet the members of The Statistics Club, organized by domain.</p>
        </header>

        {loading ? (
          <div className="page-loading">Loading…</div>
        ) : membersByDomain.length === 0 ? (
          <div className="empty-state">No members added yet.</div>
        ) : (
          <div className="domain-sections">
            {membersByDomain.map(([domain, members]) => (
              <section key={domain} className="domain-section">
                <h2 className="section-title">{domain}</h2>
                <div className="card-grid">
                  {members.map((member) => (
                    <MemberCard key={member.id} member={member} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
