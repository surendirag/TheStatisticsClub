import type { Member } from '../types'
import './MemberCard.css'

interface MemberCardProps {
  member: Member
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <article className="member-card card">
      <div className="member-photo">
        {member.photo ? (
          <img src={member.photo} alt={member.name} />
        ) : (
          <span className="member-initial">{member.name.charAt(0)}</span>
        )}
      </div>
      <div className="member-info">
        <h3>{member.name}</h3>
        <p className="member-roll">{member.rollNumber}</p>
      </div>
    </article>
  )
}
