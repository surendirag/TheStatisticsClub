import { useEffect, useRef, useState } from "react";
import "./newsEditor.css";

const INITIAL_NEWS = [
  {
    id: '1',
    title: 'Club registration open for 2026',
    content: 'We are now accepting new members for the upcoming academic year.',
    date: '2026-08-01',
  },
];

export function NewsDialog({ isOpen, onClose }) {
  const dialogRef = useRef();
  const [data, setData] = useState(INITIAL_NEWS);
  const [editingId, setEditingId] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [adding, setAdding] = useState(false);
  const emptyRow = { title: '', content: '', date: '' };
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
        // const res = await fetch('/api/news');
        // const json = await res.json();
        // setData(json);
      } catch {
        alert('problem occured');
      }
    }
    fetchData();
  }, [isOpen]);

  const columns = ['title', 'content', 'date'];

  const startEdit = (row) => { setEditingId(row.id); setEditRow({ ...row }); };
  const cancelEdit = () => { setEditingId(null); setEditRow({}); };
  const saveEdit = () => {
    setData(prev => prev.map(row => row.id === editingId ? { ...editRow } : row));
    // await fetch(`/api/news/${editingId}`, { method: 'PUT', body: JSON.stringify(editRow) })
    cancelEdit();
  };
  const deleteRow = (id) => {
    if (!window.confirm('Delete this news item?')) return;
    setData(prev => prev.filter(row => row.id !== id));
    // await fetch(`/api/news/${id}`, { method: 'DELETE' })
  };
  const saveNew = () => {
    if (!newRow.title || !newRow.content || !newRow.date) { alert('Fill all fields'); return; }
    const id = String(Math.max(...data.map(r => Number(r.id))) + 1);
    setData(prev => [...prev, { id, ...newRow }]);
    // await fetch('/api/news', { method: 'POST', body: JSON.stringify(newRow) })
    setNewRow(emptyRow); setAdding(false);
  };
  const cancelNew = () => { setNewRow(emptyRow); setAdding(false); };

  return (
    <dialog ref={dialogRef} className="news-dialog" onClose={onClose}>
      <div className="dialog-header">
        <h2 className="dialog-title">News</h2>
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
            {data.map(row => (
              <tr key={row.id} className="table-tr">
                <td className="table-td">{row.id}</td>
                {columns.map(col => (
                  <td key={col} className="table-td">
                    {editingId === row.id
                      ? <input className="table-input" value={editRow[col] || ''} onChange={(e) => setEditRow(prev => ({ ...prev, [col]: e.target.value }))} />
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
                    <input className="table-input" placeholder={col} value={newRow[col] || ''}
                      onChange={(e) => setNewRow(prev => ({ ...prev, [col]: e.target.value }))} />
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