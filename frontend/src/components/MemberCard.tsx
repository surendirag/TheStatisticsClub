import type { Member } from '../types'
import './MemberCard.css'

interface MemberCardProps {
  member: Member
}

export default function MemberCard({ member }: MemberCardProps) {
  const image = member.imageUrl || member.photo
  const rollNo = member.rollNo || member.rollNumber

  return (
    <article className="member-card card">
      <div className="member-photo">
        {image ? (
          <img src={image} alt={member.name} />
        ) : (
          <span className="member-initial">{member.name.charAt(0)}</span>
        )}
      </div>
      <div className="member-info">
        <h3>{member.name}</h3>
        {rollNo && <p className="member-roll">{rollNo}</p>}
      </div>
    </article>
  )
}
