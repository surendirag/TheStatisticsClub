import { useState } from "react";
import HeroEditorDialog from "./Components/HeroEditor.tsx";
import { EditableTableDialog } from "./Components/MemberEditor.tsx";
import { NewsDialog } from "./Components/NEWSEditor.tsx";
import { EventsDialog } from "./Components/EventEditor.tsx";
import "./Dashboard.css";

interface Section {
  key: string;
  title: string;
  desc: string;
  color: string;
}

const sections: Section[] = [
  { key: "members", title: "Members", desc: "Manage team members and their profiles.", color: "#fff" },
  { key: "news", title: "News", desc: "Publish and edit news articles.", color: "#fff" },
  { key: "events", title: "Events", desc: "Create and manage upcoming events.", color: "#fff" },
];

export default function Dashboard() {
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);

  const openers: Record<string, () => void> = {
    hero: () => setIsHeroOpen(true),
    members: () => setIsMembersOpen(true),
    news: () => setIsNewsOpen(true),
    events: () => setIsEventsOpen(true),
  };

  return (
    <div className="page">
      <HeroEditorDialog isOpen={isHeroOpen} onClose={() => setIsHeroOpen(false)} />
      <EditableTableDialog isOpen={isMembersOpen} onClose={() => setIsMembersOpen(false)} />
      <NewsDialog isOpen={isNewsOpen} onClose={() => setIsNewsOpen(false)} />
      <EventsDialog isOpen={isEventsOpen} onClose={() => setIsEventsOpen(false)} />

      <div className="container">
        <header className="page-header">
          <h1>Hey Admin!</h1>
          <p>Welcome to the Admin Page, what shall we calculate today?</p>
        </header>

        <div className="dashboard-grid">
          {sections.map((section) => (
            <button
              key={section.key}
              className="dashboard-card"
              onClick={openers[section.key]}
              style={{ backgroundColor: section.color }}
            >
              <span className="dashboard-card-title">{section.title}</span>
              <span className="dashboard-card-desc">{section.desc}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}