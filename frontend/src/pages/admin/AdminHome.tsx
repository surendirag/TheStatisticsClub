import { useState } from 'react'
import { useContent } from '../../context/ContentContext'
import type { HomeContent } from '../../types'

export default function AdminHome() {
  const { content, updateHome } = useContent()
  const [form, setForm] = useState<HomeContent>(content.home)

  const handleSave = () => {
    updateHome(form)
  }

  return (
    <div className="admin-panel">
      <h1>Edit Home Page</h1>
      <p>Update the hero section and intro text shown on the landing page.</p>

      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="heroTitle">Hero title</label>
          <input
            id="heroTitle"
            value={form.heroTitle}
            onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
          />
        </div>
        <div className="form-field">
          <label htmlFor="heroSubtitle">Hero subtitle</label>
          <input
            id="heroSubtitle"
            value={form.heroSubtitle}
            onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
          />
        </div>
        <div className="form-field">
          <label htmlFor="intro">Introduction</label>
          <textarea
            id="intro"
            value={form.intro}
            onChange={(e) => setForm({ ...form, intro: e.target.value })}
          />
        </div>
      </div>

      <div className="btn-group" style={{ marginTop: '1rem' }}>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save changes
        </button>
      </div>
    </div>
  )
}
