import { useState } from 'react'
import { useContent } from '../../context/ContentContext'
import type { ClubEvent, EventStatus } from '../../types'

function createEmptyEvent(): ClubEvent {
  return {
    id: crypto.randomUUID(),
    title: '',
    description: '',
    date: new Date().toISOString().slice(0, 10),
    location: '',
    status: 'upcoming',
  }
}

export default function AdminEvents() {
  const { content, updateEvents } = useContent()
  const [events, setEvents] = useState<ClubEvent[]>(content.events)

  const updateEvent = (id: string, patch: Partial<ClubEvent>) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)))
  }

  const removeEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

  const addEvent = () => {
    setEvents((prev) => [...prev, createEmptyEvent()])
  }

  const handleSave = () => {
    updateEvents(events)
  }

  return (
    <div className="admin-panel">
      <h1>Edit Events</h1>
      <p>Manage previous, ongoing, and upcoming events.</p>

      {events.map((event, index) => (
        <div key={event.id} className="admin-item">
          <div className="admin-item-header">
            <h3>Event {index + 1}</h3>
            <button type="button" className="btn btn-danger" onClick={() => removeEvent(event.id)}>
              Remove
            </button>
          </div>
          <div className="form-grid">
            <div className="form-field">
              <label>Title</label>
              <input
                value={event.title}
                onChange={(e) => updateEvent(event.id, { title: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>Status</label>
              <select
                value={event.status}
                onChange={(e) =>
                  updateEvent(event.id, { status: e.target.value as EventStatus })
                }
              >
                <option value="ongoing">Ongoing</option>
                <option value="upcoming">Upcoming</option>
                <option value="previous">Previous</option>
              </select>
            </div>
            <div className="form-field">
              <label>Date</label>
              <input
                type="date"
                value={event.date}
                onChange={(e) => updateEvent(event.id, { date: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>Location</label>
              <input
                value={event.location}
                onChange={(e) => updateEvent(event.id, { location: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>Description</label>
              <textarea
                value={event.description}
                onChange={(e) => updateEvent(event.id, { description: e.target.value })}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="btn-group">
        <button type="button" className="btn btn-secondary" onClick={addEvent}>
          Add event
        </button>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save changes
        </button>
      </div>
    </div>
  )
}
