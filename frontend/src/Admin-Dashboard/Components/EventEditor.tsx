import { useEffect, useRef, useState } from "react";
import "./eventEditor.css";
import type { NewsItem } from "../../types";

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  status: string;
  image: string | null;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const STATUS_OPTIONS = ['upcoming', 'ongoing', 'previous'];

export function EventsDialog({ isOpen, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [data, setData] = useState<Event[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRow, setEditRow] = useState<Partial<Event>>({});
  const [adding, setAdding] = useState(false);
  const emptyRow: Omit<Event, 'id'> = { title: '', description: '', date: '' as any, location: '', status: 'upcoming', image: null };
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
        setData(json.map((event: any) => ({ ...event, id: event._id, image: event.imageUrl })));
      } catch {
        alert('problem occured');
      }
    }
    fetchData();
  }, [isOpen]);

  const columns: (keyof Omit<Event, 'id'>)[] = ['title', 'description', 'date', 'location', 'status', 'image'];

  const startEdit = (row: Event) => { setEditingId(row.id); setEditRow({ ...row }); };
  const cancelEdit = () => { setEditingId(null); setEditRow({}); };

  const saveEdit = async () => {
    const formData = new FormData();
    Object.entries(editRow).forEach(([key, value]) => {
        if (value === null || value === undefined) return;
        if (key === 'image') formData.append('image', value as unknown as Blob);
        else if (key === 'imageUrl') return;
        else formData.append(key, value as string);
    });
    await fetch(`/api/events/${editingId}`, { method: 'PUT', body: formData });
    setData(prev => prev.map(row => row.id === editingId ? { ...row, ...editRow } as Event : row));
    cancelEdit();
  };

  const deleteRow = async (id: string) => {
    if (!window.confirm('Delete this event?')) return;
    setData(prev => prev.filter(row => row.id !== id));
    await fetch(`/api/events/${id}`, { method: 'DELETE' });
  };

  const saveNew = async () => {
    if (!newRow.title || !newRow.date || !newRow.location) { alert('Fill required fields'); return; }
    const formData = new FormData();
    Object.entries(newRow).forEach(([key, value]) => {
        if (value === null || value === undefined) return;
        if (key === 'image') formData.append('image', value as unknown as Blob);
        else if (key === 'imageUrl') return;
        else formData.append(key, value as string);
    });
    const res = await fetch('/api/events', { method: 'POST', body: formData });
    const created = await res.json();
    setData(prev => [...prev, { ...created, id: created._id, image: created.imageUrl }]);
    setNewRow(emptyRow); setAdding(false);
  };

  const cancelNew = () => { setNewRow(emptyRow); setAdding(false); };

  const renderEditCell = (col: string, value: any, onChange: (e: any) => void) => {
    if (col === 'status') {
      return (
        <select className="table-input" value={value} onChange={onChange}>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      );
    }
    if (col === 'description') {
      return <textarea className="table-input" value={value || ''} onChange={onChange} />;
    }
    if (col === 'image') {
      return (
        <input
          type="file"
          accept="image/*"
          className="table-input"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onChange({ target: { value: file } });
          }}
        />
      );
    }
    if (col === 'date') {
  return (
    <input
      type="date"
      className="table-input"
      value={value ? new Date(value).toISOString().split('T')[0] : ''}
      onChange={onChange}
    />
  );
  }
    return <input className="table-input" value={value || ''} onChange={onChange} />;
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
            {data.map((row, i) => (
              <tr key={row.id} className="table-tr">
                <td className="table-td">{i + 1}</td>
                {columns.map(col => (
                  <td key={col} className="table-td">
                    {editingId === row.id
                      ? renderEditCell(col, editRow[col as keyof Event], (e) => setEditRow(prev => ({ ...prev, [col]: e.target.value })))
                      : col === 'date'
                        ? row[col] ? new Date(row[col]).toLocaleDateString() : '—'
                        : col === 'image'
                          ? row[col] ? <img src={row[col] as string} alt="" style={{ width: 40, height: 40, objectFit: 'cover' }} /> : '—'
                          : row[col as keyof Event]
                            ? String(row[col as keyof Event]) 
                            : '-'}
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
                    {renderEditCell(col, newRow[col as keyof typeof newRow], (e) => setNewRow(prev => ({ ...prev, [col]: e.target.value })))}
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