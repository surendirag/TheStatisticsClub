import { useEffect, useRef, useState } from "react";
import "./newsEditor.css";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: Date;
  image: string | null;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function NewsDialog({ isOpen, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [data, setData] = useState<NewsItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRow, setEditRow] = useState<Partial<NewsItem>>({});
  const [adding, setAdding] = useState(false);
  const emptyRow: Omit<NewsItem, 'id'> = { title: '', description: '', date: '' as any, image: null };
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
        setData(json.map((item: any) => ({ ...item, id: item._id, image: item.imageUrl })));
      } catch {
        alert('problem occured');
      }
    }
    fetchData();
  }, [isOpen]);

  const columns: (keyof Omit<NewsItem, 'id'>)[] = ['title', 'description', 'date', 'image'];

  const startEdit = (row: NewsItem) => { setEditingId(row.id); setEditRow({ ...row }); };
  const cancelEdit = () => { setEditingId(null); setEditRow({}); };

  const saveEdit = async () => {
    const formData = new FormData();
    Object.entries(editRow).forEach(([key, value]) => {
        if (value === null || value === undefined) return;
        if (key === 'image') formData.append('image', value as unknown as Blob);
        else if (key === 'imageUrl') return;
        else formData.append(key, value as string);
    });
    await fetch(`/api/news/${editingId}`, { method: 'PUT', body: formData });
    setData(prev => prev.map(row => row.id === editingId ? { ...row, ...editRow } as NewsItem : row));
    cancelEdit();
  };

  const deleteRow = async (id: string) => {
    if (!window.confirm('Delete this news item?')) return;
    await fetch(`/api/news/${id}`, { method: 'DELETE' });
    setData(prev => prev.filter(row => row.id !== id));
  };

  const saveNew = async () => {
    if (!newRow.title || !newRow.date) { alert('Fill required fields'); return; }
    const formData = new FormData();
    Object.entries(newRow).forEach(([key, value]) => {
        if (value === null || value === undefined) return;
        if (key === 'image') formData.append('image', value as unknown as Blob);
        else if (key === 'imageUrl') return;
        else formData.append(key, value as string);
    });
    const res = await fetch('/api/news', { method: 'POST', body: formData });
    const created = await res.json();
    setData(prev => [...prev, { ...created, id: created._id, image: created.imageUrl }]);
    setNewRow(emptyRow);
    setAdding(false);
  };

  const cancelNew = () => { setNewRow(emptyRow); setAdding(false); };

  const renderCell = (col: string, value: any, onChange: (e: any) => void) => {
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
    if (col === 'description') {
      return <textarea className="table-input" value={value || ''} onChange={onChange} />;
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
            {data.map((row, i) => (
              <tr key={row.id} className="table-tr">
                <td className="table-td">{i + 1}</td>
                {columns.map(col => (
                  <td key={col} className="table-td">
                    {editingId === row.id
                      ? renderCell(col, editRow[col as keyof NewsItem], (e) => setEditRow(prev => ({ ...prev, [col]: e.target.value })))
                      : col === 'date'
                        ? row[col] ? new Date(row[col]).toLocaleDateString() : '—'
                        : col === 'image'
                          ? row[col] ? <img src={row[col] as string} alt="" style={{ width: 40, height: 40, objectFit: 'cover' }} /> : '—'
                          : row[col as keyof NewsItem]
                            ? String(row[col as keyof NewsItem])
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
                    {renderCell(col, newRow[col as keyof typeof newRow], (e) => setNewRow(prev => ({ ...prev, [col]: e.target.value })))}
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