import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FEED, JOBS, FACILITY } from "./data";
import { Attrib, Avatar, Headline, PhotoFrame, Post, ScoreRing, photoUrl } from "./ui";
import { Icon, Logomark } from "./icons";

const initialsOf = (name) => name.split(" ").map((w) => w[0]).slice(0, 2).join("");

function MetaTile({ label, value }) {
  return (
    <div className="meta-tile">
      <div className="lbl">{label}</div>
      <div className="val">{value}</div>
    </div>
  );
}

// ─── Feed ────────────────────────────────────────────────────────────────────
export function Feed() {
  const [tab, setTab] = useState("questions");
  const posts = tab === "questions" ? FEED.questions : FEED.lounge;
  return (
    <div>
      <div className="tabs" role="tablist">
        <button className={`tab ${tab === "questions" ? "on" : ""}`} onClick={() => setTab("questions")}>
          Real questions
        </button>
        <button className={`tab ${tab === "lounge" ? "on" : ""}`} onClick={() => setTab("lounge")}>
          The lounge
        </button>
      </div>
      {tab === "questions" && <Attrib id="rachelSplit" />}

      <Post p={posts[0]} />

      {/* Erin prompt slot, injected between cards */}
      <div className="card plum">
        <div className="row">
          <Avatar initials="E" color="#BBAFEF" />
          <div className="grow">
            <div className="small">Erin</div>
            <div style={{ fontSize: 12, color: "var(--dew)" }}>Your AI assistant · suggestion</div>
          </div>
        </div>
        <p className="small" style={{ marginTop: 10, lineHeight: 1.5 }}>{FEED.erin.text}</p>
        <div className="wrap" style={{ marginTop: 10 }}>
          {FEED.erin.actions.map((a) => (
            <button key={a} className="btn sky sm">{a}</button>
          ))}
        </div>
      </div>

      {posts.slice(1).map((p) => <Post key={p.id} p={p} />)}

      {/* Meetups board */}
      <div className="card dew">
        <div className="eyebrow">Meetups & events</div>
        <div className="small" style={{ marginTop: 6 }}>{FEED.meetup.title}</div>
        <div className="muted" style={{ color: "var(--plum-soft)" }}>{FEED.meetup.detail}</div>
        <div className="muted" style={{ color: "var(--plum-soft)" }}>{FEED.meetup.sub}</div>
        <button className="btn sm" style={{ marginTop: 10 }}>I'm going</button>
      </div>

      {/* Roommate board */}
      <div className="card lav flip">
        <div className="eyebrow" style={{ color: "var(--plum-soft)" }}>Roommate board</div>
        <div className="small" style={{ marginTop: 6 }}>{FEED.roommate.title}</div>
        <div className="small" style={{ color: "var(--plum-soft)" }}>{FEED.roommate.detail}</div>
        <div className="muted" style={{ color: "var(--plum-soft)" }}>{FEED.roommate.sub}</div>
        <Attrib id="amberRoommate" />
      </div>
    </div>
  );
}

// ─── Jobs ────────────────────────────────────────────────────────────────────
export function Jobs() {
  return (
    <div>
      <div className="sect">
        <h2><Headline>Jobs with the inside story</Headline></h2>
        <span className="subtext">{JOBS.length} matches</span>
      </div>
      <p className="muted" style={{ marginTop: 6 }}>
        Every card shows what the community knows — not just what the feed says.
      </p>
      {JOBS.map((j) => <JobCard key={j.id} j={j} />)}
    </div>
  );
}

function JobCard({ j }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="card" style={{ position: "relative" }}>
      <button
        className={`save ${saved ? "on" : ""}`}
        onClick={() => setSaved(!saved)}
        aria-pressed={saved}
        aria-label={saved ? "Saved" : "Save job"}
      >
        <Icon name="bookmark" size={17} style={saved ? { fill: "currentColor" } : undefined} />
      </button>
      <Link to={`/jobs/${j.id}`} className="linkless">
        <div className="row" style={{ alignItems: "flex-start", gap: 12 }}>
          <span className="thumb">
            {photoUrl(j.photo)
              ? <img src={photoUrl(j.photo)} alt="" />
              : initialsOf(j.facility)}
          </span>
          <div className="grow" style={{ paddingRight: 36 }}>
            <div style={{ fontSize: 16, letterSpacing: "-0.01em", lineHeight: 1.2 }}>{j.title}</div>
            <div className="muted" style={{ marginTop: 3 }}>{j.facility} · {j.city}</div>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: 12 }}>
          <span className="pill acc"><Icon name="building" size={13} /> {j.social.score} traveler score</span>
          <span className="pill"><Icon name="users" size={13} /> {j.social.workedHere} worked here</span>
          <span className="pill"><Icon name="book-open" size={13} /> {j.social.diaries} diaries</span>
          <span className="pill"><Icon name="message-circle" size={13} /> {j.social.answeredQs} answered</span>
        </div>
        <div className="between" style={{ marginTop: 14 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span className="money">{j.weekly.replace("/wk", "")}</span>
            <span className="subtext">per wk · starts {j.start}</span>
          </div>
          <Icon name="chevron-right" size={16} style={{ color: "var(--fg3)" }} />
        </div>
      </Link>
    </div>
  );
}

// ─── Job detail ──────────────────────────────────────────────────────────────
function Tile({ icon, label, value }) {
  return (
    <div className="tile">
      <div className="row" style={{ gap: 6 }}>
        <Icon name={icon} size={14} style={{ color: "var(--fg3)" }} />
        <span className="eyebrow" style={{ fontSize: 10 }}>{label}</span>
      </div>
      <div className="tile-val">{value}</div>
    </div>
  );
}

export function JobDetail({ id }) {
  const nav = useNavigate();
  const j = JOBS.find((x) => x.id === id) || JOBS[0];
  return (
    <div>
      <button className="backlink" onClick={() => nav(-1)}>
        <Icon name="arrow-left" size={16} /> Back to jobs
      </button>

      <PhotoFrame photo={j.photo} tone="var(--dew)" icon="building" label="facility photo" height={160} />

      <div className="card">
        <div className="eyebrow">Travel contract</div>
        <h2 style={{ fontSize: 22, marginTop: 6 }}>{j.title}</h2>
        <div className="muted" style={{ marginTop: 4 }}>{j.facility} · {j.city}</div>
        <div className="tiles">
          <Tile icon="moon" label="shift" value={j.shift} />
          <Tile icon="calendar" label="starts" value={j.start} />
          <Tile icon="briefcase" label="length" value={j.length} />
          <Tile icon="dollar" label="base rate" value={j.hourly} />
        </div>
      </div>

      {/* Pay + apply — plum block per the kit's mobile apply card */}
      <div className="card plum">
        <div className="eyebrow" style={{ color: "var(--lavender)" }}>Estimated weekly pay</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 8 }}>
          <span style={{ fontSize: 30, letterSpacing: "-0.03em", lineHeight: 1 }}>{j.weekly.replace("/wk", "")}</span>
          <span className="subtext" style={{ color: "rgba(249, 242, 232, 0.72)" }}>per wk</span>
        </div>
        <button className="btn accent block bubble" style={{ marginTop: 16 }}>Quick apply</button>
        <div className="subtext" style={{ color: "rgba(249, 242, 232, 0.72)", marginTop: 10, textAlign: "center" }}>
          recruiter {j.recruiter.toLowerCase()} · replies in ~2h
        </div>
      </div>

      {/* The social context column — the moat beat */}
      <div className="card dew">
        <div className="between" style={{ alignItems: "flex-start" }}>
          <div>
            <div className="eyebrow">What the Society knows</div>
            <div className="small" style={{ marginTop: 6 }}>
              {j.social.workedHere} members have worked here
            </div>
            <div className="small" style={{ color: "var(--fg2)" }}>
              {j.social.diaries} assignment diaries · {j.social.answeredQs} questions answered
            </div>
          </div>
          <ScoreRing value={j.social.score} size={64} />
        </div>
        {j.facilityId ? (
          <Link to={`/facility/${j.facilityId}`} className="linkless">
            <button className="btn block" style={{ marginTop: 14 }}>Open the facility hub</button>
          </Link>
        ) : (
          <button className="btn block ghost" style={{ marginTop: 14 }}>Facility hub (demo: see Pacific View)</button>
        )}
        <button className="btn block ghost" style={{ marginTop: 8 }}>Ask someone who worked here</button>
        <Attrib id="jennyTrip" />
      </div>
    </div>
  );
}

// ─── Facility hub ────────────────────────────────────────────────────────────
export function Facility() {
  const f = FACILITY;
  const [tab, setTab] = useState("qa");
  return (
    <div>
      {/* Plum hero band — facility-intel reference */}
      <div className="card plum">
        <span className="watermark"><Logomark size={150} color="var(--lavender)" /></span>
        <div className="eyebrow" style={{ color: "var(--lavender)" }}>Facility intel</div>
        <h2 style={{ fontSize: 26, marginTop: 6, paddingRight: 24 }}>{f.name}</h2>
        <div className="wrap" style={{ marginTop: 10, gap: 12 }}>
          <span className="hero-meta"><Icon name="map-pin" size={14} /> {f.city}</span>
          <span className="hero-meta"><Icon name="building" size={14} /> {f.type}</span>
        </div>
        <div className="between" style={{ marginTop: 16, alignItems: "center" }}>
          <div className="stack" style={{ minWidth: 0 }}>
            <div className="hero-meta"><Icon name="users" size={14} /> {f.workedHere} members worked here</div>
            <div className="hero-meta"><Icon name="user-check" size={14} /> {f.askable} open to questions</div>
          </div>
          <div style={{ textAlign: "center", flex: "none" }}>
            <ScoreRing value={f.score} size={92} stroke={9} dark />
            <div className="subtext" style={{ color: "rgba(249, 242, 232, 0.72)", marginTop: 4 }}>
              {f.scoreLabel}
            </div>
          </div>
        </div>
        <div className="meta-tiles">
          <MetaTile label="beds" value={f.stats.beds} />
          <MetaTile label="ratio" value={f.stats.ratio} />
          <MetaTile label="parking" value={f.stats.parking} />
          <MetaTile label="scrubs" value={f.stats.scrubs} />
        </div>
      </div>

      <PhotoFrame photo="facility-pacific-view" icon="building" label="facility photo" height={140} />

      {/* Member ratings — BreakdownBar grid */}
      <div className="card">
        <div className="eyebrow">The vibe, from members</div>
        <div className="bars">
          {f.vibe.map((v) => (
            <div key={v.k} className="bar-row">
              <span>{v.k}</span>
              <span className="bar-track"><i style={{ width: `${(v.v / 5) * 100}%` }} /></span>
              <span style={{ textAlign: "right" }}>{v.v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="tabs" role="tablist">
        {[["qa", "Q&A"], ["pay", "Pay reality"], ["notes", "Insider notes"], ["review", "Write a review"]].map(([k, label]) => (
          <button key={k} className={`tab ${tab === k ? "on" : ""}`} onClick={() => setTab(k)}>{label}</button>
        ))}
      </div>

      {tab === "qa" && <QATab f={f} />}
      {tab === "pay" && <PayTab f={f} />}
      {tab === "notes" && <NotesTab f={f} />}
      {tab === "review" && <ReviewComposer />}
    </div>
  );
}

function QATab({ f }) {
  return (
    <div>
      {f.qa.map((q) => (
        <div key={q.id} className="card">
          <div className="small">{q.q}</div>
          <div className="muted" style={{ marginTop: 2 }}>Asked by {q.askedBy}</div>
          {q.answers.map((a, i) => (
            <div key={i} className="answer">
              <div className="row">
                <Avatar
                  initials={a.anon ? "?" : a.by.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  color={a.verified ? "#421A31" : "#CEDBFE"}
                  dark={a.verified}
                />
                <div className="grow">
                  <span className="small">{a.by}</span>{" "}
                  {a.verified && (
                    <span className="verified small">
                      <Icon name="check" size={12} /> {a.badge}
                    </span>
                  )}
                  {a.anon && <span className="pill sky" style={{ marginLeft: 4 }}>anonymous answer</span>}
                </div>
              </div>
              <p className="small" style={{ marginTop: 8, lineHeight: 1.45 }}>{a.text}</p>
              <div className="muted row" style={{ marginTop: 6, gap: 5 }}>
                <Icon name="thumbs-up" size={13} /> Helpful · {a.helpful}
              </div>
            </div>
          ))}
          {q.id === "q1" && <Attrib id="brandyTesting" />}
          {q.id === "q2" && <Attrib id="ashleyAnon" />}
        </div>
      ))}
      <button className="btn block" style={{ marginTop: 14 }}>Ask the {f.workedHere} people who worked here</button>
    </div>
  );
}

function PayTab({ f }) {
  return (
    <div>
      {f.payReports.map((p, i) => (
        <div key={i} className="card between">
          <div>
            <div style={{ fontSize: 20, letterSpacing: "-0.02em", color: "var(--plum)" }}>{p.rate}</div>
            <div className="muted">{p.spec} · {p.agency} · {p.when}</div>
          </div>
          {p.verified
            ? <span className="pill sky"><Icon name="shield-check" size={13} /> contract-verified</span>
            : <span className="pill outline">self-reported</span>}
        </div>
      ))}
      <div className="card dew">
        <div className="small">Reality check</div>
        <p className="small" style={{ marginTop: 6, color: "var(--plum-soft)" }}>
          Listed rates for this facility ranged $2,950–$3,600/wk over the last 90 days. If your quote is under $3,050, ask for the breakdown.
        </p>
      </div>
    </div>
  );
}

function NotesTab({ f }) {
  return (
    <div>
      {f.insiderNotes.map((n, i) => (
        <div key={i} className="card row" style={{ alignItems: "flex-start", gap: 12 }}>
          <span className="icon-well"><Icon name={n.icon} size={17} /></span>
          <p className="small" style={{ lineHeight: 1.45 }}>{n.text}</p>
        </div>
      ))}
      <div className="stack card" style={{ background: "transparent", boxShadow: "none", padding: 0 }}>
        <Attrib id="rachel" />
      </div>
    </div>
  );
}

// Review composer: Rachel's mad-face rule + Amber's moderation rule + Cooper's structured terms
function ReviewComposer() {
  const [mood, setMood] = useState(null);
  const [chips, setChips] = useState([]);
  const locked = mood === "mad";
  const terms = ["Supportive charge nurses", "Heavy float", "Great orientation", "Parking is rough", "Traveler-friendly", "Short-staffed nights", "Fair scheduling", "Would return"];
  return (
    <div className="card">
      <div className="small">How was your assignment here?</div>
      <div className="faces">
        {[["happy", "smile"], ["mid", "meh"], ["mad", "frown"]].map(([k, ico]) => (
          <button key={k} className={`face ${mood === k ? "on" : ""}`} onClick={() => setMood(k)} aria-label={k}>
            <Icon name={ico} size={24} />
          </button>
        ))}
      </div>
      {locked ? (
        <>
          <div className="locknote">
            Free-text is closed for critical reviews — choose from structured feedback instead. Negative with a name attached is never published.
          </div>
          <div className="chips-select">
            {terms.map((t) => (
              <button
                key={t}
                className={chips.includes(t) ? "on" : ""}
                onClick={() => setChips((c) => c.includes(t) ? c.filter((x) => x !== t) : [...c, t])}
              >
                {t}
              </button>
            ))}
          </div>
        </>
      ) : (
        <textarea
          className="compose"
          placeholder={mood ? "Tell travelers what to expect — as much as you want." : "Pick a face to start."}
          disabled={!mood}
        />
      )}
      <button className="btn block" style={{ marginTop: 12 }} disabled={!mood}>
        Submit for review
      </button>
      <Attrib id="rachelMadFace" />
      <Attrib id="amberModRule" />
      <Attrib id="cooperStructured" />
    </div>
  );
}
