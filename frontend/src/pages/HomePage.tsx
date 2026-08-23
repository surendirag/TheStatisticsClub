import { Link } from 'react-router-dom'
import { useContent } from '../context/ContentContext'
import NewsCard from '../components/NewsCard'
import EventCard from '../components/EventCard'
import './HomePage.css'

export default function HomePage() {
  const { content } = useContent()
  const { home, news, events } = content

  const upcomingEvents = events.filter((e) => e.status === 'upcoming').slice(0, 2)
  const latestNews = [...news].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 2)

  return (
    <div className="home-page">
      <section className="hero">
        <div className="container hero-inner">
          <p className="hero-eyebrow">IIT Tirupati · Statistics Club</p>
          <h1>{home.heroTitle}</h1>
          <p className="hero-subtitle">{home.heroSubtitle}</p>
          <p className="hero-intro">{home.intro}</p>
          <div className="hero-actions">
            <Link to="/events" className="btn btn-primary">View Events</Link>
            <Link to="/about" className="btn btn-secondary">Meet the Team</Link>
          </div>
        </div>
      </section>

      <section className="page">
        <div className="container">
          <div className="home-section-header">
            <h2>Latest News</h2>
            <Link to="/news">See all →</Link>
          </div>
          <div className="card-grid">
            {latestNews.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="page home-events-preview">
        <div className="container">
          <div className="home-section-header">
            <h2>Upcoming Events</h2>
            <Link to="/events">See all →</Link>
          </div>
          <div className="card-grid">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => <EventCard key={event.id} event={event} />)
            ) : (
              <div className="empty-state">No upcoming events yet.</div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
