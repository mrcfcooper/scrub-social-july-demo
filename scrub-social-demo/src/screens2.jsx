import { useState } from "react";
import { Link } from "react-router-dom";
import { DIARY, JOBS, RECRUITER, MENTOR, GRAPH, BADGES, PINS, TOP8, GUIDE, PERSONAS } from "./data";
import { Attrib, Avatar, Sect, Stars } from "./ui";

// ─── Assignment Diary (Rachel's dream, built to spec) ───────────────────────
export function Diary() {
  const d = DIARY;
  const job = JOBS.find((j) => d.jobsBelow.includes(j.id));
  return (
    <div>
      <div className="card">
        <div className="eyebrow">Assignment diary</div>
        <div className="row" style={{ marginTop: 8 }}>
          <Avatar initials="MC" color="#82ABF4" size="lg" />
          <div>
            <div className="small" style={{ fontWeight: 600 }}>{d.author} · {d.authorRole}</div>
            <div className="muted">{d.facility} · {d.city}</div>
            <div className="muted">{d.dates}</div>
          </div>
        </div>
        <div className="stack" style={{ marginTop: 12 }}>
          {d.ratings.map((r) => (
            <div key={r.k} className="between small">
              <span>{r.k}</span>
              <Stars n={r.v} />
            </div>
          ))}
        </div>
        <Attrib id="rachel" />
      </div>

      <Sect title="The scrapbook" sub="tap to view" />
      <div className="wrap" style={{ marginTop: 4 }}>
        {d.photos.map((p) => (
          <div key={p.label} className="photo" style={{ background: p.tone, flex: "1 1 45%" }}>
            📸 {p.label}
          </div>
        ))}
      </div>

      <Sect title="The Yelp side of it" />
      {d.yelp.map((y) => (
        <div key={y.k} className="card row" style={{ alignItems: "flex-start" }}>
          <span style={{ fontSize: 20 }}>{y.emoji}</span>
          <div>
            <div className="small" style={{ fontWeight: 600 }}>{y.k}</div>
            <div className="small" style={{ color: "var(--plum-soft)" }}>{y.v}</div>
          </div>
        </div>
      ))}

      <Sect title="Week by week" />
      {d.entries.map((e) => (
        <div key={e.week} className="card">
          <div className="eyebrow">{e.week}</div>
          <p className="small" style={{ marginTop: 6, lineHeight: 1.45 }}>{e.text}</p>
        </div>
      ))}

      {/* Jobs at the bottom — Rachel's loop closer */}
      <Sect title="Assignments available here now" />
      {job && (
        <Link to={`/jobs/${job.id}`} className="linkless">
          <div className="card dew between">
            <div>
              <div className="small" style={{ fontWeight: 600 }}>{job.title}</div>
              <div className="muted" style={{ color: "var(--plum-soft)" }}>{job.facility} · starts {job.start}</div>
            </div>
            <div style={{ fontWeight: 700, color: "var(--plum)" }}>{job.weekly}</div>
          </div>
        </Link>
      )}
      <div className="muted" style={{ marginTop: 8 }}>
        Reading someone's San Diego diary? San Diego assignments surface right here. It works on both sides.
      </div>
    </div>
  );
}

// ─── Traveler profile ────────────────────────────────────────────────────────
export function Profile() {
  const p = PERSONAS.traveler;
  return (
    <div>
      <div className="card">
        <div className="row">
          <Avatar initials={p.initials} color={p.color} size="lg" />
          <div className="grow">
            <div className="between">
              <div>
                <div style={{ fontWeight: 600, fontSize: 16 }}>{p.name}</div>
                <div className="muted">{p.role} · {p.handle}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="wrap" style={{ marginTop: 10 }}>
          <span className="pill solid">🟢 {p.status}</span>
          <span className="pill sky">✓ {p.trust}% positive</span>
          <span className="pill">👀 consumer mode ok</span>
        </div>
        <Attrib id="harpsterTrust" />
      </div>

      <Sect title="Badges" />
      <div className="wrap" style={{ marginTop: 4 }}>
        {BADGES.map((b) => (
          <span key={b.label} className="pill" style={{ background: "var(--cloud)" }}>{b.emoji} {b.label}</span>
        ))}
      </div>
      <div className="stack"><Attrib id="jennaBadges" /></div>

      <Sect title="Where I've been" sub={`${PINS.length} states`} />
      <div className="wrap" style={{ marginTop: 4 }}>
        {PINS.map((s) => (
          <span key={s} className="pin">{s}<small>📍</small></span>
        ))}
      </div>
      <div className="stack"><Attrib id="jennyPins" /></div>

      <Sect title="My top 8" />
      <div className="card" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {TOP8.map((t) => (
          <div key={t.k} className="row" style={{ alignItems: "flex-start" }}>
            <span style={{ fontSize: 18 }}>{t.emoji}</span>
            <div>
              <div className="muted">{t.k}</div>
              <div className="small" style={{ fontWeight: 600 }}>{t.v}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="stack"><Attrib id="rachelTop8" /></div>

      <Sect title="Profile strength" sub={`${p.completion}%`} />
      <div className="card">
        <div className="meter"><i style={{ width: `${p.completion}%` }} /></div>
        <p className="small" style={{ marginTop: 10, color: "var(--plum-soft)" }}>
          Add one professional reference to hit 100% and earn the <b>Society Founder</b> badge. Built from your resume — you've worked 8 cities, 12 hospitals, 7 states. We filled that in for you.
        </p>
        <Attrib id="jennyComplete" />
      </div>
    </div>
  );
}

// ─── Recruiter view (Ashley's seat) ─────────────────────────────────────────
export function Recruiter() {
  const r = RECRUITER;
  return (
    <div>
      <div className="card">
        <div className="row">
          <Avatar initials="AH" color="#BBAFEF" size="lg" />
          <div className="grow">
            <div style={{ fontWeight: 600, fontSize: 16 }}>{r.name}</div>
            <div className="muted">{r.agency} · {r.years} years</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 18, color: "var(--plum)" }}>{r.rating}★</div>
            <div className="muted">{r.reviews} reviews</div>
          </div>
        </div>
        <p className="small" style={{ marginTop: 10, lineHeight: 1.45 }}>“{r.bio}”</p>
        <div className="wrap" style={{ marginTop: 10 }}>
          <span className="pill sky">👥 booked {r.booked} travelers</span>
          <span className="pill">🧭 Recommended by {r.recommendedBy.join(", ")}</span>
        </div>
        <Attrib id="ashleyHuman" />
        <Attrib id="ashleyRecs" />
      </div>

      <Sect title="Reviews" />
      {r.reviewsList.map((rv, i) => (
        <div key={i} className="card">
          <div className="between">
            <span className="small" style={{ fontWeight: 600 }}>{rv.by}</span>
            <Stars n={rv.stars} />
          </div>
          <p className="small" style={{ marginTop: 6, lineHeight: 1.45 }}>{rv.text}</p>
        </div>
      ))}
      <div className="stack"><Attrib id="ashleyReviews" /></div>

      <Sect title="My hottest jobs" sub="posted to followers" />
      {r.hotJobs.map((h, i) => (
        <div key={i} className="card dew between">
          <div>
            <div className="small" style={{ fontWeight: 600 }}>{h.title}</div>
            <div className="muted" style={{ color: "var(--plum-soft)" }}>🔥 {h.tag}</div>
          </div>
          <div style={{ fontWeight: 700, color: "var(--plum)" }}>{h.pay}</div>
        </div>
      ))}

      <Sect title="Ambassador rewards" />
      <div className="card lav flip">
        <div className="between">
          <div className="small" style={{ fontWeight: 600, color: "var(--plum)" }}>
            {r.ambassador.referred} referrals · {r.ambassador.booked} booked
          </div>
          <span className="pill" style={{ background: "var(--cloud)" }}>🧊 {r.ambassador.reward} at 5 booked</span>
        </div>
        <div className="meter" style={{ marginTop: 10, background: "rgba(255,255,255,0.6)" }}>
          <i style={{ width: `${r.ambassador.progress}%`, background: "var(--plum)" }} />
        </div>
        <Attrib id="ashleyYeti" />
      </div>

      <div className="card">
        <div className="small" style={{ fontWeight: 600 }}>Answer as anonymous</div>
        <p className="small" style={{ marginTop: 6, color: "var(--plum-soft)" }}>
          Toggle on to answer community questions with your real thoughts — shown as “Recruiter · TravelMed” with no name.
        </p>
        <Attrib id="ashleyAnon" />
      </div>
    </div>
  );
}

// ─── Mentor view (Brandy's seat) ─────────────────────────────────────────────
export function Mentor() {
  const m = MENTOR;
  return (
    <div>
      <div className="card plum">
        <div className="row">
          <Avatar initials="BP" color="#BBAFEF" size="lg" />
          <div className="grow">
            <div style={{ fontWeight: 600, fontSize: 16 }}>{m.name} <span className="verified">✓</span></div>
            <div style={{ fontSize: 12, color: "var(--dew)" }}>{m.title} · {m.years}</div>
          </div>
        </div>
        <p className="small" style={{ marginTop: 10, lineHeight: 1.5 }}>“{m.bio}”</p>
        <div className="wrap" style={{ marginTop: 10 }}>
          <span className="pill">💡 {m.answered} answers</span>
          <span className="pill">🙌 {m.helpfulVotes.toLocaleString()} helpful votes</span>
          <span className="pill">🧭 {m.mentees} mentees</span>
        </div>
        <Attrib id="brandyMentor" />
      </div>

      <Sect title="Contribution history" sub="public — trust signal" />
      {m.history.map((h, i) => (
        <div key={i} className="card between">
          <div>
            <div className="small" style={{ fontWeight: 600 }}>{h.text}</div>
            <div className="muted">{h.where}</div>
          </div>
          <span className="muted">{h.when}</span>
        </div>
      ))}
      <div className="stack"><Attrib id="brandyHistory" /></div>

      <Sect title="Moderation queue" sub="bam, bam, bam" />
      {m.queue.map((q, i) => (
        <div key={i} className="card between">
          <span className="small grow" style={{ lineHeight: 1.4 }}>{q.text}</span>
          {q.status === "approved" && <span className="pill sky">✓ approved</span>}
          {q.status === "auto" && <span className="pill solid">🤖 auto</span>}
          {q.status === "pending" && (
            <span className="row">
              <button className="btn sm">✓</button>
              <button className="btn sm ghost">✕</button>
            </span>
          )}
        </div>
      ))}
      <div className="stack"><Attrib id="brandyMod" /></div>

      <div className="card dew">
        <div className="small" style={{ fontWeight: 600 }}>Ban from social, keep job access</div>
        <p className="small" style={{ marginTop: 6, color: "var(--plum-soft)" }}>
          Trolls lose posting and commenting — the troll badge is real — but they keep the app for job search. The community stays clean without losing the candidate.
        </p>
        <Attrib id="harpsterBan" />
      </div>
    </div>
  );
}

// ─── 7 Degrees of Brandy ─────────────────────────────────────────────────────
export function Graph() {
  const [active, setActive] = useState(null);
  const g = GRAPH;
  const onPath = (id) => g.path.includes(id);
  const pathEdges = g.path.slice(0, -1).map((n, i) => [n, g.path[i + 1]].sort().join("-"));
  const node = (id) => g.nodes.find((n) => n.id === id);
  return (
    <div>
      <Sect title="7 degrees of Brandy" sub="tap a node" />
      <p className="muted" style={{ marginTop: 4 }}>
        Travelers, recruiters, agencies, and facilities — connected through real work history. Future architecture signal, not production architecture.
      </p>
      <div className="graph-wrap">
        <svg className="graph-svg" viewBox="0 0 460 480" role="img" aria-label="Relationship graph">
          {g.edges.map(([a, b]) => {
            const A = node(a), B = node(b);
            const hot = pathEdges.includes([a, b].sort().join("-"));
            return (
              <line
                key={a + b}
                x1={A.x + 34} y1={A.y} x2={B.x + 34} y2={B.y}
                stroke={hot ? "#82ABF4" : "#CEDBFE"}
                strokeWidth={hot ? 4 : 2}
              />
            );
          })}
          {g.nodes.map((n) => (
            <g key={n.id} className="gnode" onClick={() => setActive(n)}>
              <circle cx={n.x + 34} cy={n.y} r={onPath(n.id) ? 32 : 26}
                fill={n.tone} stroke={active?.id === n.id ? "#421A31" : "white"} strokeWidth="3" />
              <text x={n.x + 34} y={n.y + 4} textAnchor="middle"
                fontSize="11" fontWeight="600"
                fill={n.tone === "#421A31" ? "#F9F2E8" : "#421A31"}>
                {n.label.split(" ")[0]}
              </text>
              <text x={n.x + 34} y={n.y + 48} textAnchor="middle" fontSize="10" fill="#8a7383">
                {n.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
      <div className="card sky" style={{ background: "var(--dew)" }}>
        <div className="small" style={{ fontWeight: 600 }}>
          {active ? `${active.label}` : "You're 2 connections from Brandy"}
        </div>
        <p className="small" style={{ marginTop: 4, color: "var(--plum-soft)" }}>
          {active ? active.sub : "You → Ashley H. (booked you, Feb '26) → Brandy P. Ashley staffed 57 travelers; every one is a path into the graph."}
        </p>
      </div>
      <div className="stack"><Attrib id="harpsterGraph" /></div>
    </div>
  );
}

// ─── Demo guide ──────────────────────────────────────────────────────────────
export function Guide() {
  return (
    <div>
      <div className="card plum">
        <div className="eyebrow" style={{ color: "var(--lavender)" }}>The one-line demo script</div>
        <h2 style={{ fontSize: 18, marginTop: 6, lineHeight: 1.35 }}>
          “Everything you're about to see, you asked for on May 11.”
        </h2>
        <p className="small" style={{ marginTop: 8, color: "var(--dew)" }}>
          Every feature carries a chip citing who asked for it on the workshop call. Walk the loop: Feed → Job → Facility hub → Q&A → Diary → switch personas.
        </p>
      </div>
      {GUIDE.map((g, i) => (
        <Link key={i} to={g.route} className="linkless">
          <div className="card">
            <div className="between">
              <span className="pill solid">{g.who}</span>
              <span className="muted">{g.see} →</span>
            </div>
            <p className="small" style={{ marginTop: 8, lineHeight: 1.4 }}>{g.asked}</p>
          </div>
        </Link>
      ))}
      <div className="muted" style={{ marginTop: 14, textAlign: "center" }}>
        Prototype · seeded demo data · no real users, auth, or PHI
      </div>
    </div>
  );
}
