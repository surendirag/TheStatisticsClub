import { useEffect, useRef, useState } from "react";
import "./eventEditor.css";

const INITIAL_EVENTS = [
  {
    id: '1',
    title: 'Intro to R Workshop',
    description: 'Hands-on session covering data import, visualization, and basic modeling in R.',
    date: '2026-07-15',
    location: 'Lab 204',
    status: 'previous',
    imageUrl: 'kkk.com/img.png'
  },
];

const STATUS_OPTIONS = ['upcoming', 'ongoing', 'previous'];

export function EventsDialog({ isOpen, onClose }) {
  const dialogRef = useRef();
  const [data, setData] = useState(INITIAL_EVENTS);
  const [editingId, setEditingId] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [adding, setAdding] = useState(false);
  const emptyRow = { title: '', description: '', date: '', location: '', status: 'upcoming', imageUrl: null };
  const [newRow, setNewRow] = useState(emptyRow);

  useEffect(() => {
    if (!dialogRef.current) return;
    if (isOpen) dialogRef.current.showModal();
    else if (dialogRef.current.open) dialogRef.current.close();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    async function fetchData() {
      try {
        const res = await fetch('/api/events');
        const json = await res.json();
        setData(json.map(event => ({ ...event, id: event._id })));
      } catch {
        alert('problem occured');
      }
    }
    fetchData();
  }, [isOpen]);

  const columns = ['title', 'description', 'date', 'location', 'status', 'imageUrl'];

  const startEdit = (row) => { setEditingId(row.id); setEditRow({ ...row }); };
  const cancelEdit = () => { setEditingId(null); setEditRow({}); };
  const saveEdit = async () => {
    const formData = new FormData();
    Object.entries(editRow).forEach(([key, value]) => formData.append(key, value));

    await fetch(`/api/events/${editingId}`, { method: 'PUT', body: formData });
    cancelEdit();
  };
  const deleteRow = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    setData(prev => prev.filter(row => row.id !== id));
    await fetch(`/api/events/${id}`, { method: 'DELETE' })
  };
  const saveNew = async () => {
    if (!newRow.title || !newRow.date || !newRow.location) { alert('Fill required fields'); return; }
    
    const formData = new FormData();
    Object.entries(newRow).forEach(([key, value]) => formData.append(key, value));

    const res = await fetch('/api/events', { method: 'POST', body: formData });
    const created = await res.json();
    setData(prev => [...prev, { ...created, id: created._id }]); 
    setNewRow(emptyRow); setAdding(false);
  };
  const cancelNew = () => { setNewRow(emptyRow); setAdding(false); };

  // status column gets a select, everything else gets a text input
  const renderEditCell = (col, value, onChange) => {
    if (col === 'status') {
      return (
        <select className="table-input" value={value} onChange={onChange}>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      );
    }
    if (col === 'description') {
        return (
            <textarea className="table-input" value={value} onChange={onChange} />
        )
    }
    if (col === 'imageUrl') {
        return (
            <input 
                type="file" 
                accept="image/*"
                className="table-input"
                onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) onChange({ target: { value: file } });
                }} 
            />
        );
    }
    return <input className="table-input" value={value} onChange={onChange} />;
  };

  return (
    <dialog ref={dialogRef} className="events-dialog" onClose={onClose}>
      <div className="dialog-header">
        <h2 className="dialog-title">Events</h2>
        <div className="dialog-actions">
          <button className="btn-save" onClick={() => setAdding(true)} disabled={adding}>+ Add</button>
          <button className="btn-close" onClick={onClose}>✕</button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th className="table-th col-id">#</th>
              {columns.map(col => (
                <th key={col} className={`table-th col-${col}`}>
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                </th>
              ))}
              <th className="table-th col-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row,i) => (
              <tr key={row.id} className="table-tr">
                <td className="table-td">{i+1}</td>
                {columns.map(col => (
                  <td key={col} className="table-td">
                    {editingId === row.id
                      ? renderEditCell(col, editRow[col], (e) => setEditRow(prev => ({ ...prev, [col]: e.target.value })))
                      : col === 'imageUrl'
                        ? row[col] ? <img src={row[col]} alt="" style={{ width: 40, height: 40, objectFit: 'cover' }} /> : '—'
                        : row[col]}
                  </td>
                ))}
                <td className="table-td">
                  {editingId === row.id ? (
                    <div className="dialog-actions">
                      <button className="btn-save" onClick={saveEdit}>Save</button>
                      <button className="btn-cancel" onClick={cancelEdit}>Cancel</button>
                    </div>
                  ) : (
                    <div className="dialog-actions">
                      <button className="btn-edit" onClick={() => startEdit(row)}>Edit</button>
                      <button className="btn-delete" onClick={() => deleteRow(row.id)}>Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {adding && (
              <tr className="table-tr">
                <td className="table-td">—</td>
                {columns.map(col => (
                  <td key={col} className="table-td">
                    {renderEditCell(col, newRow[col], (e) => setNewRow(prev => ({ ...prev, [col]: e.target.value })))}
                  </td>
                ))}
                <td className="table-td">
                  <div className="dialog-actions">
                    <button className="btn-save" onClick={saveNew}>Add</button>
                    <button className="btn-cancel" onClick={cancelNew}>Cancel</button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </dialog>
  );
}