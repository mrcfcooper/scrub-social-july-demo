import { ATTRIB } from "./data";

export function Attrib({ id }) {
  const a = ATTRIB[id];
  if (!a) return null;
  return (
    <div className="attrib">
      <span className="mark">💬</span>
      <span><b>{a.who} asked for this</b> · May 11 — “{a.quote}”</span>
    </div>
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

export function Stars({ n }) {
  return <span className="stars" aria-label={`${n} out of 5 stars`}>{"★".repeat(n)}{"☆".repeat(5 - n)}</span>;
}

export function Post({ p }) {
  return (
    <article className="card">
      <div className="row">
        <Avatar
          initials={p.anon ? "?" : p.author.split(" ").map((w) => w[0]).join("")}
          color={p.anon ? "#CEDBFE" : "#BBAFEF"}
        />
        <div className="grow">
          <div className="small" style={{ fontWeight: 600 }}>
            {p.author} {p.anon && <span className="pill sky" style={{ marginLeft: 4 }}>🎭 anonymous</span>}
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
      <h3 style={{ fontSize: 16 }}>{title}</h3>
      {sub && <span className="muted">{sub}</span>}
    </div>
  );
}
