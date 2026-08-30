import { useEffect, useRef, useState } from "react";
import "./heroeditor.css";

interface HeroData {
  heroTitle: string;
  heroSubtitle: string;
  intro: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

async function submit(data: HeroData) {
  await fetch('/api/hero', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export default function HeroEditorDialog({ isOpen, onClose }: Props) {
  const [data, setData] = useState<HeroData>({
    heroTitle: "The Statistics Club",
    heroSubtitle: "Exploring data, probability, and insight together",
    intro: "Welcome to The Statistics Club — a community for students passionate about statistics, data science, and analytical thinking. Join us for workshops, talks, and collaborative projects.",
  });

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/hero');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch {
        alert("Problem occurred while fetching data.");
      }
    }
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit(data);
    onClose();
  };

  return (
    <dialog ref={dialogRef} onClose={onClose} className="hero-dialog">
      <div className="dialog-header">
        <h2 className="dialog-title">Hero Editor</h2>
        <div className="actions">
          <button type="button" className="close-btn" onClick={onClose}>✕</button>
        </div>
      </div>

      <form className="formContainer" onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="heroTitle">Hero Title</label>
          <input id="heroTitle" className="heroTitleInput" value={data.heroTitle} onChange={handleChange} />
        </div>

        <div className="inputGroup">
          <label htmlFor="heroSubtitle">Hero Subtitle</label>
          <input id="heroSubtitle" className="heroSubTitleInput" value={data.heroSubtitle} onChange={handleChange} />
        </div>

        <div className="inputGroup">
          <label htmlFor="intro">Introduction</label>
          <textarea id="intro" className="introInput" rows={4} value={data.intro} onChange={handleChange} />
        </div>

        <button type="submit" className="submitBtn">Submit</button>
      </form>
    </dialog>
  );
}