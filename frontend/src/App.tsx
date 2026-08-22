import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ContentProvider } from './context/ContentContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import NewsPage from './pages/NewsPage'
import EventsPage from './pages/EventsPage'

export default function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="news" element={<NewsPage />} />
            <Route path="events" element={<EventsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContentProvider>
  )
}
