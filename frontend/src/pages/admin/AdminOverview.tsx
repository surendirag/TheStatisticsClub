import { Link } from 'react-router-dom'
import { useContent } from '../../context/ContentContext'

export default function AdminOverview() {
  const { content, resetToDefault } = useContent()

  return (
    <div className="admin-panel">
      <h1>Overview</h1>
      <p>
        Skeleton admin panel — no login yet. Changes save to your browser&apos;s local storage
        until a backend is connected.
      </p>

      <div className="admin-stats">
        <div className="admin-stat">
          <strong>{content.members.length}</strong>
          <span>Members</span>
        </div>
        <div className="admin-stat">
          <strong>{content.news.length}</strong>
          <span>News items</span>
        </div>
        <div className="admin-stat">
          <strong>{content.events.length}</strong>
          <span>Events</span>
        </div>
      </div>

      <div className="btn-group">
        <Link to="/admin/home" className="btn btn-primary">
          Edit Home
        </Link>
        <Link to="/admin/about" className="btn btn-secondary">
          Edit About
        </Link>
        <Link to="/admin/news" className="btn btn-secondary">
          Edit News
        </Link>
        <Link to="/admin/events" className="btn btn-secondary">
          Edit Events
        </Link>
        <button type="button" className="btn btn-danger" onClick={resetToDefault}>
          Reset to sample data
        </button>
      </div>
    </div>
  )
}
