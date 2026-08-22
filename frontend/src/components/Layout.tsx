import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import PageBackdrop from './PageBackdrop'
import './Layout.css'

export default function Layout() {
  return (
    <div className="layout">
      <PageBackdrop />
      <div className="layout-content">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <footer className="site-footer">
          <div className="container">
            <p>© {new Date().getFullYear()} The Statistics Club. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
