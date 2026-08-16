import { Link, NavLink, Outlet } from 'react-router-dom'
import './AdminLayout.css'

const adminLinks = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/home', label: 'Home Page' },
  { to: '/admin/about', label: 'About Us' },
  { to: '/admin/news', label: 'News' },
  { to: '/admin/events', label: 'Events' },
]

export default function AdminLayout() {
  return (
    <div className="admin-layout page">
      <div className="container admin-shell">
        <aside className="admin-sidebar card">
          <div className="admin-sidebar-header">
            <h2>Admin Dashboard</h2>
            <p>Edit site content for all public pages.</p>
          </div>
          <Link to="/" className="admin-back-link">
            ← Back to site
          </Link>
          <nav className="admin-nav">
            {adminLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  isActive ? 'admin-nav-link active' : 'admin-nav-link'
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <section className="admin-content">
          <Outlet />
        </section>
      </div>
    </div>
  )
}
