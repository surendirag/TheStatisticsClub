import { useContent } from '../context/ContentContext'
import type { EventStatus } from '../types'
import EventCard from '../components/EventCard'
import './EventsPage.css'

const sections: { status: EventStatus; title: string; description: string }[] = [
  {
    status: 'ongoing',
    title: 'Ongoing Events',
    description: 'Events happening right now.',
  },
  {
    status: 'upcoming',
    title: 'Upcoming Events',
    description: 'Mark your calendar for these sessions.',
  },
  {
    status: 'previous',
    title: 'Previous Events',
    description: 'A look back at what we have done.',
  },
]

export default function EventsPage() {
  const { content, loading } = useContent()

  return (
    <div className="page">
      <div className="container">
        <header className="page-header">
          <h1>Events</h1>
          <p>Workshops, competitions, and club gatherings across the semester.</p>
        </header>

        {loading ? (
          <div className="page-loading">Loading…</div>
        ) : (
        <div className="event-sections">
          {sections.map(({ status, title, description }) => {
            const events = content.events.filter((e) => e.status === status)
            return (
              <section key={status} className="event-section">
                <div className="event-section-header">
                  <h2 className="section-title">{title}</h2>
                  <p>{description}</p>
                </div>
                {events.length === 0 ? (
                  <div className="empty-state">No {status} events yet.</div>
                ) : (
                  <div className="card-grid">
                    {events.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                )}
              </section>
            )
          })}
        </div>
        )}
      </div>
    </div>
  )
}
