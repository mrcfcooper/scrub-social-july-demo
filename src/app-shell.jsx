import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { PERSONAS } from "./data";
import { Avatar, Sheet } from "./ui";
import { Icon, Logotype } from "./icons";
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
        <div className="wordmark">
          <Logotype height={30} color="var(--air)" />
          <span>Social</span>
        </div>
        <button className="persona-chip" onClick={() => setOpen(!open)} aria-expanded={open}>
          <Avatar initials={p.initials} color={p.color} dark={p.color === "#421A31"} />
          {p.name.split(" ")[0]}
          <Icon name="chevron-down" size={14} />
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
      ? [["/recruiter", "user", "My profile"], ["/", "home", "Feed"], ["/jobs", "briefcase", "Jobs"], ["/graph", "share-2", "Graph"], ["/guide", "film", "Guide"]]
      : persona === "mentor"
        ? [["/mentor", "compass", "Mentor"], ["/", "home", "Feed"], ["/facility/pacific-view", "building", "Facilities"], ["/graph", "share-2", "Graph"], ["/guide", "film", "Guide"]]
        : [["/", "home", "Feed"], ["/jobs", "briefcase", "Jobs"], ["/diary", "book-open", "Diary"], ["/profile", "user", "Profile"], ["/guide", "film", "Guide"]];
  return (
    <nav className="nav">
      {items.map(([to, ico, label]) => (
        <NavLink key={to} to={to} className={({ isActive }) => (isActive ? "on" : "")} end={to === "/"}>
          <Icon name={ico} size={20} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

// Traveler-facing "Get a mentor" sheet — Brandy's dashboard stays behind the
// mentor persona's own nav; this is the member's side of the ask.
function MentorFab() {
  const loc = useLocation();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  if (loc.pathname === "/mentor") return null;
  const close = () => {
    setOpen(false);
    setSent(false);
  };
  return (
    <>
      <button className="mentor-fab" onClick={() => setOpen(true)}>
        <Icon name="compass" size={16} />
        Get a mentor
      </button>
      <Sheet open={open} onClose={close} label="Get a mentor">
        {sent ? (
          <div style={{ textAlign: "center", padding: "8px 0 4px" }}>
            <span className="seal" style={{ width: 64, height: 64 }}>
              <Icon name="check" size={26} strokeWidth={2.5} />
            </span>
            <h3 style={{ marginTop: 12 }}>Request sent.</h3>
            <p className="small" style={{ marginTop: 8, color: "var(--fg2)" }}>
              Brandy gets your profile and your first question — most mentees
              hear back the same day.
            </p>
            <button className="btn block" style={{ marginTop: 14 }} onClick={close}>Done</button>
          </div>
        ) : (
          <>
            <div className="row" style={{ gap: 12 }}>
              <Avatar initials="BP" color="#421A31" dark size="lg" />
              <div className="grow">
                <div style={{ fontSize: 16 }}>Brandy P.</div>
                <div className="subtext">founding nurse advisor · answering questions today</div>
              </div>
              <span className="dot" aria-hidden="true" />
            </div>
            <p className="small" style={{ marginTop: 12, color: "var(--fg2)" }}>
              18 years and 30+ contracts of been-there. Brandy walks new
              travelers through their first contract — so nothing blindsides you.
            </p>
            <button className="btn block bubble" style={{ marginTop: 14 }} onClick={() => setSent(true)}>
              Request Brandy as your mentor
            </button>
            <button
              className="btn block ghost sm"
              style={{ marginTop: 8 }}
              onClick={() => { close(); nav("/facility/pacific-view"); }}
            >
              See Brandy's answers
            </button>
          </>
        )}
      </Sheet>
    </>
  );
}

export default function App() {
  const [persona, setPersona] = useState("traveler");
  return (
    <BrowserRouter>
      <div className="shell">
        <div className="demo-note">Prototype · seeded demo data · every feature here was asked for by this team</div>
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
