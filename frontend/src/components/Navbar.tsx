import { NavLink } from 'react-router-dom'
import './Navbar.css'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/UserContext'

const initialPublicLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/news', label: 'News' },
  { to: '/events', label: 'Events' },
  { to: '/login', label: 'Login'},
];

const adminPublicLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/news', label: 'News' },
  { to: '/events', label: 'Events' },
  { to: '/dashboard', label: 'Admin'},
];

export default function Navbar() {
  const [publicLinks, setPublicLinks] = useState(initialPublicLinks);
  const {user} = useAuth();

  useEffect(()=>{
    if (!user) return;
    if (user) {
      setPublicLinks(adminPublicLinks)
    }
  },[user]);

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
