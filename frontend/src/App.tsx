import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { ContentProvider } from './context/ContentContext'
import { AuthProvider, useAuth } from './context/UserContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import NewsPage from './pages/NewsPage'
import EventsPage from './pages/EventsPage'
import LoginPage from './Admin-Dashboard/LoginPage.tsx'
import Dashboard from './Admin-Dashboard/Dashboard.tsx'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (!user) return <Navigate to='/login' />;
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="news" element={<NewsPage />} />
              <Route path="events" element={<EventsPage />} />

            {/* Admin routes */}
              <Route path='/login' element={<LoginPage />} />
              <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ContentProvider>
    </AuthProvider>
  )
}
