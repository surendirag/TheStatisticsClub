import { useState } from 'react'
import { useContent } from '../../context/ContentContext'
import type { NewsItem } from '../../types'

function createEmptyNews(): NewsItem {
  return {
    id: crypto.randomUUID(),
    title: '',
    content: '',
    date: new Date().toISOString().slice(0, 10),
  }
}

export default function AdminNews() {
  const { content, updateNews } = useContent()
  const [news, setNews] = useState<NewsItem[]>(content.news)

  const updateItem = (id: string, patch: Partial<NewsItem>) => {
    setNews((prev) => prev.map((n) => (n.id === id ? { ...n, ...patch } : n)))
  }

  const removeItem = (id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id))
  }

  const addItem = () => {
    setNews((prev) => [createEmptyNews(), ...prev])
  }

  const handleSave = () => {
    updateNews(news)
  }

  return (
    <div className="admin-panel">
      <h1>Edit News</h1>
      <p>Add or update announcements shown on the News page and home preview.</p>

      {news.map((item, index) => (
        <div key={item.id} className="admin-item">
          <div className="admin-item-header">
            <h3>News item {index + 1}</h3>
            <button type="button" className="btn btn-danger" onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </div>
          <div className="form-grid">
            <div className="form-field">
              <label>Title</label>
              <input
                value={item.title}
                onChange={(e) => updateItem(item.id, { title: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>Date</label>
              <input
                type="date"
                value={item.date}
                onChange={(e) => updateItem(item.id, { date: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>Content</label>
              <textarea
                value={item.content}
                onChange={(e) => updateItem(item.id, { content: e.target.value })}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="btn-group">
        <button type="button" className="btn btn-secondary" onClick={addItem}>
          Add news item
        </button>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save changes
        </button>
      </div>
    </div>
  )
}
