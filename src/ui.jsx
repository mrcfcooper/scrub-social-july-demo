import { ATTRIB } from "./data";

// Attribution chip — the demo's thesis, styled as a quote callout: lavender
// speech-bubble badge (squared bottom-left), the quote, then who asked.
export function Attrib({ id }) {
  const a = ATTRIB[id];
  if (!a) return null;
  return (
    <aside className="attrib">
      <span className="attrib-badge" aria-hidden="true">“</span>
      <p className="attrib-quote">“{a.quote}”</p>
      <div className="attrib-meta subtext">
        <b>{a.who}</b> asked for this · may 11
      </div>
    </aside>
  );
}

export function Avatar({ initials, color, size, dark }) {
  return (
    <span
      className={`avatar ${size === "lg" ? "lg" : ""} ${dark ? "dark" : ""}`}
      style={{ background: color }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

export function Stars({ n, size = 14 }) {
  return (
    <span className="stars" role="img" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i <= n ? "var(--lavender)" : "rgba(66, 26, 49, 0.16)"}
          aria-hidden="true"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

export function Post({ p }) {
  return (
    <article className="card">
      <div className="row">
        <Avatar
          initials={p.anon ? "?" : p.author.split(" ").map((w) => w[0]).join("")}
          color={p.anon ? "#CEDBFE" : "#CEDBFE"}
        />
        <div className="grow">
          <div className="small" style={{ fontWeight: 400 }}>
            {p.author} {p.anon && <span className="pill tint" style={{ marginLeft: 4 }}>🎭 anonymous</span>}
          </div>
          <div className="muted">{p.role} · {p.community} · {p.when}</div>
        </div>
        {p.mentorAnswered && <span className="pill" title="A mentor answered">🧭 Mentor answered</span>}
      </div>
      <p className="small" style={{ marginTop: 10, lineHeight: 1.45 }}>{p.text}</p>
      {p.photo && (
        <div className="photo" style={{ background: p.photo.tone, marginTop: 10 }}>
          📸 {p.photo.label}
        </div>
      )}
      <div className="rxn">
        {Object.entries(p.reactions).map(([k, v]) => (
          <span key={k}>{k} {v}</span>
        ))}
        <span>💬 {p.comments}</span>
      </div>
      {p.attrib && <Attrib id={p.attrib} />}
    </article>
  );
}

export function Sect({ title, sub }) {
  return (
    <div className="sect">
      <h3>{title}</h3>
      {sub && <span className="subtext">{sub}</span>}
    </div>
  );
}
