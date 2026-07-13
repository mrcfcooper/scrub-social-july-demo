import { useState } from "react";
import { ATTRIB, PHOTOS } from "./data";
import { Icon } from "./icons";

// Every image in src/assets/photos/, resolved at build time. PhotoFrame falls
// back to the flat brand wash for any manifest key whose file hasn't landed.
const PHOTO_FILES = import.meta.glob("./assets/photos/*", {
  eager: true,
  query: "?url",
  import: "default",
});
export const photoUrl = (key) => {
  const file = key && PHOTOS[key];
  return file ? PHOTO_FILES[`./assets/photos/${file}`] : undefined;
};

// Attribution marker — the demo's thesis, kept unobtrusive: a small lavender
// quote chip with the asker's name. Tapping opens a popover with the full
// quote. Pass `full` for the quote-callout rendering (Guide page).
export function Attrib({ id, full }) {
  const a = ATTRIB[id];
  const [open, setOpen] = useState(false);
  if (!a) return null;
  if (full) {
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
  return (
    <span className="attrib-mini">
      <button
        className="attrib-chip"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={`${a.who} asked for this feature`}
      >
        <span className="q" aria-hidden="true">“</span>
        {a.who.toLowerCase()}
      </button>
      {open && (
        <>
          <span className="attrib-scrim" onClick={() => setOpen(false)} />
          <span className="attrib-pop" role="dialog">
            <span className="attrib-quote">“{a.quote}”</span>
            <span className="attrib-meta subtext">
              <b>{a.who}</b> asked for this · may 11
            </span>
          </span>
        </>
      )}
    </span>
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
          color="#CEDBFE"
        />
        <div className="grow">
          <div className="small">
            {p.author}{" "}
            {p.anon && (
              <span className="pill tint" style={{ marginLeft: 4 }}>
                <Icon name="user" size={12} /> anonymous
              </span>
            )}
          </div>
          <div className="muted">{p.role} · {p.community} · {p.when}</div>
        </div>
        {p.mentorAnswered && (
          <span className="pill" title="A mentor answered">
            <Icon name="compass" size={12} /> Mentor answered
          </span>
        )}
      </div>
      <p className="small" style={{ marginTop: 10, lineHeight: 1.45 }}>{p.text}</p>
      {p.photo && (
        <PhotoFrame
          photo={p.photo.key}
          tone={p.photo.tone}
          label={p.photo.label}
          height={140}
          style={{ marginTop: 10 }}
        />
      )}
      <div className="rxn">
        {p.reactions.map((r) => (
          <span key={r.label}><Icon name={r.icon} size={13} /> {r.label} {r.n}</span>
        ))}
        <span><Icon name="message-circle" size={13} /> {p.comments}</span>
      </div>
      {p.attrib && <Attrib id={p.attrib} />}
    </article>
  );
}

// Flat SVG donut, lavender fill — kit ScoreRing (renders final value, no count-up)
export function ScoreRing({ value, size = 64, stroke = 8, dark }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const mid = size / 2;
  const track = dark ? "rgba(255, 255, 255, 0.18)" : "rgba(66, 26, 49, 0.12)";
  const ink = dark ? "var(--air)" : "var(--plum)";
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`Score ${value} out of 100`}>
      <circle cx={mid} cy={mid} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <circle
        cx={mid} cy={mid} r={r} fill="none"
        stroke="var(--lavender)" strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)}
        transform={`rotate(-90 ${mid} ${mid})`}
      />
      <text
        x="50%" y="52%" dominantBaseline="central" textAnchor="middle"
        fontSize={size * 0.3} fontWeight="400" letterSpacing="-0.02" fill={ink}
      >
        {value}
      </text>
    </svg>
  );
}

// Photo in the speech-bubble frame when the file exists; flat brand-wash
// placeholder (icon + lowercase caption) when it doesn't.
export function PhotoFrame({ photo, tone = "var(--dew)", icon = "camera", label, height = 120, style }) {
  const url = photoUrl(photo);
  if (url) {
    return (
      <div className="photo-frame has-img" style={{ height, ...style }}>
        <img src={url} alt={label || ""} />
        {label && <span className="photo-cap">{label}</span>}
      </div>
    );
  }
  return (
    <div className="photo-frame" style={{ background: tone, height, ...style }}>
      <Icon name={icon} size={22} />
      {label && <span className="subtext" style={{ color: "inherit" }}>{label}</span>}
    </div>
  );
}

// Headline with the brand's lavender end-punctuation
export function Headline({ children, mark = "." }) {
  return (
    <>
      {children}
      <span style={{ color: "var(--lavender)" }}>{mark}</span>
    </>
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
