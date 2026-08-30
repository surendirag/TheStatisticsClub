import type { ClubEvent } from '../types'
import './EventCard.css'

interface EventCardProps {
  event: ClubEvent
}

function formatDate(date: string) {
  if (!date) return ''
  const parsed = new Date(date)
  if (isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const statusLabels = {
  previous: 'Previous',
  ongoing: 'Ongoing',
  upcoming: 'Upcoming',
} as const

export default function EventCard({ event }: EventCardProps) {
  const image = event.imageUrl || event.image

  return (
    <article className="event-card card">
      {image && (
        <div className="card-image-wrapper">
          <img src={image} alt={event.title} className="card-image" />
        </div>
      )}
      <div className="event-card-header">
        <span className={`badge badge-${event.status}`}>{statusLabels[event.status] || event.status}</span>
        <time dateTime={event.date}>{formatDate(event.date)}</time>
      </div>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p className="event-location">{event.location}</p>
    </article>
  )
}
