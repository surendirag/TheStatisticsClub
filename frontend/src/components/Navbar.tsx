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
          <img src="/club-logo.png" alt="The Statistics Club logo" className="brand-logo" />
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
        </nav>
      </div>
    </header>
  )
}
