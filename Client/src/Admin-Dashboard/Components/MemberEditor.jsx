import { useEffect, useRef, useState } from "react";
import "./memberEditor.css";

// Sample data — replace with your actual DB fetch
const INITIAL_DATA = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "admin" },
  { id: 2, name: "Bob", email: "bob@example.com", role: "editor" },
  { id: 3, name: "Charlie", email: "charlie@example.com", role: "viewer" },
];

export function EditableTableDialog({ isOpen, onClose }) {
  const [data, setData] = useState(INITIAL_DATA);
  const [editingId, setEditingId] = useState(null);
  const [editRow, setEditRow] = useState({});
  const dialogRef = useRef(null);
  const emptyRow = { name: "", email: "", role: "" };
  const [adding, setAdding] = useState(false);
  const [newRow, setNewRow] = useState(emptyRow);

  useEffect(() => {
    async function fetchData() {
      try {
        // api request logic
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

  const startEdit = (row) => {
    setEditingId(row.id);
    setEditRow({ ...row });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditRow({});
  };

  const saveEdit = () => {
    setData((prev) =>
      prev.map((row) => (row.id === editingId ? { ...editRow } : row))
    );
    cancelEdit();
  };

  const deleteRow = (id) => {
    setData((prev) => prev.filter((row) => row.id !== id));
  };

  const saveNew = () => {
    if (!newRow.name || !newRow.email || !newRow.role) {
      alert("Fill all fields");
      return;
    }
    const id = data.length > 0 ? Math.max(...data.map((r) => r.id)) + 1 : 1;
    setData((prev) => [...prev, { id, ...newRow }]);
    setNewRow(emptyRow);
    setAdding(false);
  };

  const cancelNew = () => {
    setNewRow(emptyRow);
    setAdding(false);
  };

  const columns = Object.keys(INITIAL_DATA[0]).filter((k) => k !== "id");

  return (
    <dialog
      className="table-dialog"
      onClick={(e) => e.stopPropagation()}
      ref={dialogRef}
      onClose={onClose}
    >
      {/* Header */}
      <div className="dialog-header">
        <h2 className="dialog-title">Database</h2>
        <div className="dialog-actions">
          <button
            className="btn-save"
            onClick={() => setAdding(true)}
            disabled={adding}
          >
            + Add
          </button>
          <button className="btn-close" onClick={onClose}>
            ✕
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th className="table-th">#</th>
              {columns.map((col) => (
                <th key={col} className="table-th">
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                </th>
              ))}
              <th className="table-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="table-tr">
                <td className="table-td">{row.id}</td>
                {columns.map((col) => (
                  <td key={col} className="table-td">
                    {editingId === row.id ? (
                      <input
                        className="table-input"
                        value={editRow[col] || ""}
                        onChange={(e) =>
                          setEditRow((prev) => ({
                            ...prev,
                            [col]: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      row[col]
                    )}
                  </td>
                ))}
                <td className="table-td">
                  {editingId === row.id ? (
                    <div className="dialog-actions">
                      <button className="btn-save" onClick={saveEdit}>
                        Save
                      </button>
                      <button className="btn-cancel" onClick={cancelEdit}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="dialog-actions">
                      <button
                        className="btn-edit"
                        onClick={() => startEdit(row)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => deleteRow(row.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {adding && (
              <tr className="table-tr">
                <td className="table-td">—</td>
                {columns.map((col) => (
                  <td key={col} className="table-td">
                    <input
                      className="table-input"
                      placeholder={col}
                      value={newRow[col] || ""}
                      onChange={(e) =>
                        setNewRow((prev) => ({
                          ...prev,
                          [col]: e.target.value,
                        }))
                      }
                    />
                  </td>
                ))}
                <td className="table-td">
                  <div className="dialog-actions">
                    <button className="btn-save" onClick={saveNew}>
                      Add
                    </button>
                    <button className="btn-cancel" onClick={cancelNew}>
                      Cancel
                    </button>
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