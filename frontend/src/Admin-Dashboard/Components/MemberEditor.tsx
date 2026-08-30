import { useEffect, useRef, useState } from "react";
import "./memberEditor.css";

interface Member {
  id: string;
  name: string;
  rollNo: string;
  domain: string;
  image: string | null;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function EditableTableDialog({ isOpen, onClose }: Props) {
  const [data, setData] = useState<Member[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRow, setEditRow] = useState<Partial<Member>>({});
  const dialogRef = useRef<HTMLDialogElement>(null);
  const emptyRow: Omit<Member, 'id'> = { name: "", rollNo: "", domain: "", image: null };
  const [adding, setAdding] = useState(false);
  const [newRow, setNewRow] = useState(emptyRow);

  useEffect(() => {
    if (!isOpen) return;
    async function fetchData() {
      try {
        const res = await fetch('/api/members');
        const json = await res.json();
        setData(json.map((member: any) => ({ ...member, id: member._id, image: member.imageUrl })));
      } catch {
        alert("problem occurred");
      }
    }
    fetchData();
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const startEdit = (row: Member) => { setEditingId(row.id); setEditRow({ ...row }); };
  const cancelEdit = () => { setEditingId(null); setEditRow({}); };

  const saveEdit = async () => {
    const formData = new FormData();
    Object.entries(editRow).forEach(([key, value]) => {
        if (value === null || value === undefined) return;
        if (key === 'image') formData.append('image', value as unknown as Blob);
        else if (key === 'imageUrl') return;
        else formData.append(key, value as string);
    });
    await fetch(`/api/members/${editingId}`, { method: 'PUT', body: formData });
    setData(prev => prev.map(row => row.id === editingId ? { ...row, ...editRow } as Member : row));
    cancelEdit();
  };

  const deleteRow = async (id: string) => {
    if (!window.confirm('Delete this member?')) return;
    await fetch(`/api/members/${id}`, { method: 'DELETE' });
    setData(prev => prev.filter(row => row.id !== id));
  };

  const saveNew = async () => {
    if (!newRow.name || !newRow.rollNo) { alert('Fill all fields'); return; }
    const formData = new FormData();
    Object.entries(newRow).forEach(([key, value]) => {
        if (value === null || value === undefined) return;
        if (key === 'image') formData.append('image', value as unknown as Blob);
        else if (key === 'imageUrl') return;
        else formData.append(key, value as string);
    });
    const res = await fetch('/api/members', { method: 'POST', body: formData });
    const created = await res.json();
    setData(prev => [...prev, { ...created, id: created._id, image: created.imageUrl }]);
    setNewRow(emptyRow);
    setAdding(false);
  };

  const cancelNew = () => { setNewRow(emptyRow); setAdding(false); };

  const columns: (keyof Omit<Member, 'id'>)[] = ['name', 'rollNo', 'domain', 'image'];

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
    return <input className="table-input" value={value || ""} onChange={onChange} />;
  };

  return (
    <dialog className="table-dialog" onClick={(e) => e.stopPropagation()} ref={dialogRef} onClose={onClose}>
      <div className="dialog-header">
        <h2 className="dialog-title">Members</h2>
        <div className="dialog-actions">
          <button className="btn-save" onClick={() => setAdding(true)} disabled={adding}>+ Add</button>
          <button className="btn-close" onClick={onClose}>✕</button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th className="table-th">#</th>
              {columns.map(col => (
                <th key={col} className="table-th">
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                </th>
              ))}
              <th className="table-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.id} className="table-tr">
                <td className="table-td">{i + 1}</td>
                {columns.map(col => (
                  <td key={col} className="table-td">
                    {editingId === row.id
                      ? renderCell(col, editRow[col as keyof Member], (e) => setEditRow(prev => ({ ...prev, [col]: e.target.value })))
                      : col === 'image'
                        ? row[col] ? <img src={row[col] as string} alt="" style={{ width: 40, height: 40, objectFit: 'cover' }} /> : '—'
                        : row[col as keyof Member]}
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