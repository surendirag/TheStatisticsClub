// Dashboard.jsx
import { useState } from "react";
import HeroEditorDialog from "./Components/HeroEditor";
import { EditableTableDialog } from "./Components/MemberEditor";
import { NewsDialog } from "./Components/NEWSEditor";
import { EventsDialog } from "./Components/EventEditor";
import "./Dashboard.css";

const sections = [
  //{ key: "hero", title: "Hero Section", desc: "Edit the homepage banner, headline and CTA.", color: "#45ff77" },
  { key: "members", title: "Members", desc: "Manage team members and their profiles.", color: "#45b5ff" },
  { key: "news", title: "News", desc: "Publish and edit news articles.", color: "#ff45f9" },
  { key: "events", title: "Events", desc: "Create and manage upcoming events.", color: "#ff4551" },
];

export default function Dashboard() {
  const [isHeroOpen, setIsHeroOpen] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);

  const openers = {
    hero: () => setIsHeroOpen(true),
    members: () => setIsMembersOpen(true),
    news: () => setIsNewsOpen(true),
    events: () => setIsEventsOpen(true),
  };

  return (
    <div className="page">
      {/* dialogs */}
      <HeroEditorDialog isOpen={isHeroOpen} onClose={() => setIsHeroOpen(false)} />
      <EditableTableDialog isOpen={isMembersOpen} onClose={() => setIsMembersOpen(false)} />
      <NewsDialog isOpen={isNewsOpen} onClose={() => setIsNewsOpen(false)} />
      <EventsDialog isOpen={isEventsOpen} onClose={() => setIsEventsOpen(false)} />

      <div className="container">
        <header className="page-header">
          <h1>Hey Admin!</h1>
          <p>Welcome to the Admin Page, you've earned one.</p>
        </header>

        <div className="dashboard-grid">
          {sections.map((section) => (
            <button
              key={section.key}
              className="dashboard-card"
              onClick={openers[section.key]}
              style={{backgroundColor: section.color}}
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