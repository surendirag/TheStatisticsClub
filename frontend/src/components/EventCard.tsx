import type { ClubEvent } from '../types'
import './EventCard.css'

interface EventCardProps {
  event: ClubEvent
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-IN', {
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
  return (
    <article className="event-card card">
      <div className="event-card-header">
        <span className={`badge badge-${event.status}`}>{statusLabels[event.status]}</span>
        <time dateTime={event.date}>{formatDate(event.date)}</time>
      </div>
      <h3>{event.title}</h3>
      <p>{event.description}</p>
      <p className="event-location">{event.location}</p>
    </article>
  )
}
