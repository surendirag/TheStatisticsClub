import { useContent } from '../context/ContentContext'
import NewsCard from '../components/NewsCard'

export default function NewsPage() {
  const { content, loading } = useContent()
  const sortedNews = [...content.news].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <div className="page">
      <div className="container">
        <header className="page-header">
          <h1>News</h1>
          <p>Announcements, updates, and stories from the club.</p>
        </header>

        {loading ? (
          <div className="page-loading">Loading…</div>
        ) : sortedNews.length === 0 ? (
          <div className="empty-state">No news posted yet.</div>
        ) : (
          <div className="card-grid">
            {sortedNews.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
