import { useEffect, useRef, useState } from "react";
import "./newsEditor.css";

export function NewsDialog({ isOpen, onClose }) {
  const dialogRef = useRef();
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editRow, setEditRow] = useState({});
  const [adding, setAdding] = useState(false);
  const emptyRow = { title: '', description: '', date: '', imageUrl: null };
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
        const res = await fetch('/api/news');
        const json = await res.json();
        setData(json.map(item => ({ ...item, id: item._id })));
      } catch {
        alert('problem occured');
      }
    }
    fetchData();
  }, [isOpen]);

  const columns = ['title', 'description', 'date', 'imageUrl'];

  const startEdit = (row) => { setEditingId(row.id); setEditRow({ ...row }); };
  const cancelEdit = () => { setEditingId(null); setEditRow({}); };

  const saveEdit = async () => {
    const formData = new FormData();
    Object.entries(editRow).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });
    await fetch(`/api/news/${editingId}`, { method: 'PUT', body: formData });
    setData(prev => prev.map(row => row.id === editingId ? { ...editRow } : row));
    cancelEdit();
  };

  const deleteRow = async (id) => {
    if (!window.confirm('Delete this news item?')) return;
    await fetch(`/api/news/${id}`, { method: 'DELETE' });
    setData(prev => prev.filter(row => row.id !== id));
  };

  const saveNew = async () => {
    if (!newRow.title || !newRow.date) { alert('Fill required fields'); return; }
    const formData = new FormData();
    Object.entries(newRow).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });
    const res = await fetch('/api/news', { method: 'POST', body: formData });
    const created = await res.json();
    setData(prev => [...prev, { ...created, id: created._id }]);
    setNewRow(emptyRow);
    setAdding(false);
  };

  const cancelNew = () => { setNewRow(emptyRow); setAdding(false); };

  const renderCell = (col, value, onChange) => {
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
    if (col === 'description') {
      return <textarea className="table-input" value={value || ''} onChange={onChange} />;
    }
    return <input className="table-input" value={value || ''} onChange={onChange} />;
  };

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
            {data.map((row,i) => (
              <tr key={row.id} className="table-tr">
                <td className="table-td">{i+1}</td>
                {columns.map(col => (
                  <td key={col} className="table-td">
                    {editingId === row.id
                      ? renderCell(col, editRow[col], (e) => setEditRow(prev => ({ ...prev, [col]: e.target.value })))
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
                    {renderCell(col, newRow[col], (e) => setNewRow(prev => ({ ...prev, [col]: e.target.value })))}
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