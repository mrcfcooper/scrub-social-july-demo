import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { PERSONAS } from "./data";
import { Avatar } from "./ui";
import { Feed, Jobs, JobDetail, Facility } from "./screens";
import { Diary, Profile, Recruiter, Mentor, Graph, Guide } from "./screens2";

function JobDetailRoute() {
  const { id } = useParams();
  return <JobDetail id={id} />;
}

function Header({ persona, setPersona }) {
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const p = PERSONAS[persona];
  const pick = (key) => {
    setPersona(key);
    setOpen(false);
    nav(key === "recruiter" ? "/recruiter" : key === "mentor" ? "/mentor" : "/");
  };
  return (
    <header className="top">
      <div className="top-row">
        <div className="wordmark">Scrub Society <span>Social</span></div>
        <button className="persona-chip" onClick={() => setOpen(!open)} aria-expanded={open}>
          <Avatar initials={p.initials} color={p.color} dark={p.color === "#421A31"} />
          {p.name.split(" ")[0]} ▾
        </button>
      </div>
      {open && (
        <div className="persona-menu">
          {Object.entries(PERSONAS).map(([key, x]) => (
            <button key={key} className="persona-item" onClick={() => pick(key)}>
              <Avatar initials={x.initials} color={x.color} dark={x.color === "#421A31"} />
              <span>
                <span className="pi-name">{x.name}</span><br />
                <span className="pi-role">{x.role}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

function Nav({ persona }) {
  const items =
    persona === "recruiter"
      ? [["/recruiter", "👤", "My profile"], ["/", "🏠", "Feed"], ["/jobs", "💼", "Jobs"], ["/graph", "🕸️", "Graph"], ["/guide", "🎬", "Guide"]]
      : persona === "mentor"
        ? [["/mentor", "🧭", "Mentor"], ["/", "🏠", "Feed"], ["/facility/pacific-view", "🏥", "Facilities"], ["/graph", "🕸️", "Graph"], ["/guide", "🎬", "Guide"]]
        : [["/", "🏠", "Feed"], ["/jobs", "💼", "Jobs"], ["/diary", "📓", "Diary"], ["/profile", "👤", "Profile"], ["/guide", "🎬", "Guide"]];
  return (
    <nav className="nav">
      {items.map(([to, ico, label]) => (
        <NavLink key={to} to={to} className={({ isActive }) => (isActive ? "on" : "")} end={to === "/"}>
          <span className="ico" aria-hidden="true">{ico}</span>
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

function MentorFab() {
  const loc = useLocation();
  const nav = useNavigate();
  if (loc.pathname === "/mentor") return null;
  return (
    <button className="mentor-fab" onClick={() => nav("/mentor")}>
      🧭 Get a mentor
    </button>
  );
}

export default function App() {
  const [persona, setPersona] = useState("traveler");
  return (
    <BrowserRouter>
      <div className="shell">
        <div className="demo-note">Prototype · seeded demo data · everything here came from the May 11 call</div>
        <Header persona={persona} setPersona={setPersona} />
        <main className="screen">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetailRoute />} />
            <Route path="/facility/:id" element={<Facility />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/recruiter" element={<Recruiter />} />
            <Route path="/mentor" element={<Mentor />} />
            <Route path="/graph" element={<Graph />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="*" element={<Feed />} />
          </Routes>
        </main>
        <MentorFab />
        <Nav persona={persona} />
      </div>
    </BrowserRouter>
  );
}
