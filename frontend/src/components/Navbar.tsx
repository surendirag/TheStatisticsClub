import { NavLink } from 'react-router-dom'
import './Navbar.css'

const publicLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/news', label: 'News' },
  { to: '/events', label: 'Events' },
]

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">Σ</span>
          <span>The Statistics Club</span>
        </NavLink>

        <nav className="nav-links">
          {publicLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink to="/admin" className="nav-link admin-link">
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
