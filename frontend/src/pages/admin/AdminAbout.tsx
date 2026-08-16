import { useState } from 'react'
import { useContent } from '../../context/ContentContext'
import type { Member } from '../../types'

function createEmptyMember(): Member {
  return {
    id: crypto.randomUUID(),
    name: '',
    rollNumber: '',
    photo: '',
    domain: 'General',
  }
}

export default function AdminAbout() {
  const { content, updateMembers } = useContent()
  const [members, setMembers] = useState<Member[]>(content.members)

  const updateMember = (id: string, patch: Partial<Member>) => {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)))
  }

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id))
  }

  const addMember = () => {
    setMembers((prev) => [...prev, createEmptyMember()])
  }

  const handleSave = () => {
    updateMembers(members)
  }

  return (
    <div className="admin-panel">
      <h1>Edit About Us</h1>
      <p>Manage club members — name, roll number, photo URL, and domain grouping.</p>

      {members.map((member, index) => (
        <div key={member.id} className="admin-item">
          <div className="admin-item-header">
            <h3>Member {index + 1}</h3>
            <button type="button" className="btn btn-danger" onClick={() => removeMember(member.id)}>
              Remove
            </button>
          </div>
          <div className="form-grid">
            <div className="form-field">
              <label>Name</label>
              <input
                value={member.name}
                onChange={(e) => updateMember(member.id, { name: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>Roll number</label>
              <input
                value={member.rollNumber}
                onChange={(e) => updateMember(member.id, { rollNumber: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label>Domain</label>
              <input
                value={member.domain}
                onChange={(e) => updateMember(member.id, { domain: e.target.value })}
                placeholder="e.g. Core Team, Events"
              />
            </div>
            <div className="form-field">
              <label>Photo URL</label>
              <input
                value={member.photo}
                onChange={(e) => updateMember(member.id, { photo: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>
        </div>
      ))}

      <div className="btn-group">
        <button type="button" className="btn btn-secondary" onClick={addMember}>
          Add member
        </button>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Save changes
        </button>
      </div>
    </div>
  )
}
