/* Facility Intel — shared primitives composed on Scrub Society tokens.
   Globals from the DS bundle: Icon, Card, Chip, H1/H2/H3, Subhead, Body,
   Subtext, PrimaryButton, AccentButton, GhostButton, PhotoFrame, SMark, SS, JobRow. */
const T = window.SS;

/* ---- Extended icon set (names the bundle's inline map doesn't ship) ---- */
const FAC_ICONS = {
  'car': '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  'clipboard-check': '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  'shuffle': '<path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22"/><path d="m18 2 4 4-4 4"/><path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2"/><path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8"/><path d="m18 14 4 4-4 4"/>',
  'moon': '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  'shield-check': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  'square-pen': '<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.4 2.6a2 2 0 0 1 3 3L12 15l-4 1 1-4z"/>',
  'message-square': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  'trending-up': '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  'lock': '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  'award': '<path d="m15.5 12.9 1.5 8.5a.5.5 0 0 1-.8.5l-3.6-2.7a1 1 0 0 0-1.2 0l-3.6 2.7a.5.5 0 0 1-.8-.5l1.5-8.5"/><circle cx="12" cy="8" r="6"/>',
  'check-circle': '<path d="M21.8 10A10 10 0 1 1 17 3.3"/><path d="m9 11 3 3L22 4"/>',
  'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9"/><path d="M16 3.1a4 4 0 0 1 0 7.8"/>',
};
function Ic({ name, size = 20, stroke = 1.75, color = 'currentColor', style }) {
  const p = FAC_ICONS[name];
  if (p) return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={{ flex: '0 0 auto', ...style }} dangerouslySetInnerHTML={{ __html: p }} />
  );
  return <Icon name={name} size={size} stroke={stroke} color={color} style={style} />;
}

/* ---- Eyebrow + title block ---- */
function SectionTitle({ eyebrow, title, sub, right, dark, size = 22 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>
      <div>
        {eyebrow && <div style={{ fontFamily: T.font, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 11, color: dark ? 'rgba(255,255,255,.7)' : T.fg2, marginBottom: 8 }}>{eyebrow}</div>}
        <h2 style={{ fontFamily: T.font, fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.08, fontSize: size, color: dark ? T.open : T.fg1, margin: 0 }}>{title}</h2>
        {sub && <p style={{ fontFamily: T.font, fontWeight: 300, fontSize: 14, lineHeight: 1.5, color: dark ? 'rgba(255,255,255,.78)' : T.fg2, margin: '6px 0 0', maxWidth: 520 }}>{sub}</p>}
      </div>
      {right}
    </div>
  );
}

/* ---- Phase-3 / target-state markers ---- */
function TargetBadge({ style }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: T.font, fontWeight: 400, fontSize: 11.5, letterSpacing: '0.04em', textTransform: 'uppercase', color: T.plum, background: T.lav, padding: '5px 11px 5px 9px', borderRadius: 9999, ...style }}>
      <Ic name="lock" size={13} color={T.plum} /> Phase 3 · target state
    </span>
  );
}
function TargetWrap({ children, caption }) {
  return (
    <div style={{ borderRadius: 22, padding: 20, background: 'color-mix(in srgb, #BBAFEF 16%, #fff)', boxShadow: 'inset 0 0 0 1.5px rgba(66,26,49,0.20)', backgroundImage: 'none', outline: '2px dashed rgba(66,26,49,0.22)', outlineOffset: -10 }}>
      {children}
      {caption && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16, paddingTop: 14, borderTop: '1px solid rgba(66,26,49,0.12)' }}>
          <Ic name="sparkles" size={15} color={T.fg2} />
          <span style={{ fontFamily: T.font, fontWeight: 400, textTransform: 'lowercase', fontSize: 12.5, color: T.fg2 }}>{caption}</span>
        </div>
      )}
    </div>
  );
}

/* ---- Score ring (data viz, flat) ---- */
function ScoreRing({ value = 86, size = 132, dark = true }) {
  const r = (size - 14) / 2, c = 2 * Math.PI * r, off = c * (1 - value / 100);
  const track = dark ? 'rgba(255,255,255,0.18)' : 'rgba(66,26,49,0.14)';
  return (
    <div style={{ position: 'relative', width: size, height: size, flex: '0 0 auto' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={9} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={T.lav} strokeWidth={9} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: T.font, fontWeight: 400, letterSpacing: '-0.04em', fontSize: size * 0.34, lineHeight: 1, color: dark ? T.open : T.plum }}>{value}</span>
        <span style={{ fontFamily: T.font, fontWeight: 400, textTransform: 'lowercase', fontSize: 12, color: dark ? 'rgba(255,255,255,.7)' : T.fg2, marginTop: 2 }}>/ 100</span>
      </div>
    </div>
  );
}

/* ---- Stars (fractional) ---- */
function Stars({ value = 4.3, size = 16, gap = 3 }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  const row = (color) => (
    <div style={{ display: 'flex', gap }}>
      {[0, 1, 2, 3, 4].map(i => <Icon key={i} name="star" size={size} color={color} stroke={0} style={{ fill: color }} />)}
    </div>
  );
  return (
    <div style={{ position: 'relative', display: 'inline-block', lineHeight: 0 }}>
      {row('rgba(66,26,49,0.16)')}
      <div style={{ position: 'absolute', inset: 0, width: pct + '%', overflow: 'hidden' }}>{row(T.lav)}</div>
    </div>
  );
}

/* ---- Rating breakdown bar ---- */
function BreakdownBar({ label, value }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr 34px', alignItems: 'center', gap: 14 }}>
      <span style={{ fontFamily: T.font, fontWeight: 300, fontSize: 14, color: T.fg1 }}>{label}</span>
      <div style={{ height: 8, borderRadius: 9999, background: 'rgba(66,26,49,0.10)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: (value / 5 * 100) + '%', background: T.lav, borderRadius: 9999 }} />
      </div>
      <span style={{ fontFamily: T.font, fontWeight: 400, fontSize: 13.5, color: T.fg1, textAlign: 'right' }}>{value.toFixed(1)}</span>
    </div>
  );
}

/* ---- Meta tile (facility quick facts) ---- */
function MetaTile({ icon, label, value, dark }) {
  return (
    <div style={{ borderRadius: 16, padding: '13px 15px', background: dark ? 'rgba(255,255,255,0.08)' : T.open, boxShadow: dark ? 'inset 0 0 0 1px rgba(255,255,255,0.14)' : `inset 0 0 0 1px ${T.line}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <Ic name={icon} size={17} color={dark ? T.lav : T.fg2} />
        <span style={{ fontFamily: T.font, fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 10, color: dark ? 'rgba(255,255,255,.65)' : T.fg3 }}>{label}</span>
      </div>
      <div style={{ fontFamily: T.font, fontWeight: 400, fontSize: 15, letterSpacing: '-0.01em', color: dark ? T.open : T.fg1 }}>{value}</div>
    </div>
  );
}

/* ---- Note tile (parking / charting / float / housing) ---- */
function NoteTile({ icon, title, status, body, sources }) {
  return (
    <div style={{ borderRadius: 18, padding: 18, background: T.open, boxShadow: `inset 0 0 0 1px ${T.line}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <span style={{ width: 38, height: 38, borderRadius: '12px 12px 12px 0', background: T.dew, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
            <Ic name={icon} size={19} color={T.plum} />
          </span>
          <span style={{ fontFamily: T.font, fontWeight: 400, fontSize: 16, letterSpacing: '-0.01em', color: T.fg1 }}>{title}</span>
        </div>
        <Chip tone="tint">{status}</Chip>
      </div>
      <p style={{ fontFamily: T.font, fontWeight: 300, fontSize: 13.5, lineHeight: 1.5, color: T.fg2, margin: 0 }}>{body}</p>
      <span style={{ fontFamily: T.font, fontWeight: 400, textTransform: 'lowercase', fontSize: 11.5, color: T.fg3 }}>from {sources} traveler notes</span>
    </div>
  );
}

/* ---- Quote callout (traveler review) ---- */
function QuoteCallout({ review, w }) {
  return (
    <div style={{ position: 'relative', borderRadius: 20, padding: '22px 22px 18px', background: T.cloud, boxShadow: `inset 0 0 0 1px ${T.line}`, width: w, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <span style={{ position: 'absolute', top: -14, left: 20, width: 36, height: 36, borderRadius: '9999px 9999px 9999px 0', background: T.lav, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(66,26,49,0.14)' }}>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: 30, lineHeight: 1, color: T.plum, transform: 'translateY(4px)' }}>&ldquo;</span>
      </span>
      <p style={{ fontFamily: T.font, fontWeight: 300, fontSize: 16, lineHeight: 1.55, color: T.fg1, margin: '6px 0 0', textWrap: 'pretty' }}>{review.quote}</p>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {review.tags.map(t => <Chip key={t} tone="out">{t}</Chip>)}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 12, borderTop: `1px solid ${T.line}` }}>
        <span style={{ width: 26, height: 26, borderRadius: '9999px 9999px 9999px 0', background: T.dew, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
          <Ic name="users" size={14} color={T.plum} />
        </span>
        <span style={{ fontFamily: T.font, fontWeight: 400, textTransform: 'lowercase', fontSize: 12.5, color: T.fg2 }}>{review.role.toLowerCase()} · {review.length} · {review.when}</span>
        <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: T.font, fontSize: 11.5, color: T.fg3 }}>
          <Ic name="shield-check" size={13} color={T.fg3} /> anonymized
        </span>
      </div>
    </div>
  );
}

/* ---- Assignment diary card ---- */
function DiaryCard({ diary }) {
  return (
    <div style={{ borderRadius: 18, padding: 18, background: T.open, boxShadow: `inset 0 0 0 1px ${T.line}`, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
        <span style={{ width: 40, height: 40, borderRadius: '9999px 9999px 9999px 0', background: T.plum, color: T.open, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
          <Ic name="square-pen" size={18} color={T.open} />
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: T.font, fontWeight: 400, fontSize: 15, letterSpacing: '-0.01em', color: T.fg1 }}>{diary.unit} · {diary.shift} · {diary.length}</div>
          <span style={{ fontFamily: T.font, fontWeight: 400, textTransform: 'lowercase', fontSize: 12, color: T.fg3 }}>anonymized diary · {diary.when}</span>
        </div>
        {diary.flag && <Chip tone="acc" icon="check">{diary.flag}</Chip>}
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {diary.sections.map(s => <Chip key={s} tone="cloud">{s}</Chip>)}
      </div>
      <p style={{ fontFamily: T.font, fontWeight: 300, fontSize: 14, lineHeight: 1.5, color: T.fg2, margin: 0 }}>{diary.note}</p>
      <button style={{ alignSelf: 'flex-start', background: 'transparent', border: 0, padding: 0, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: T.font, fontWeight: 400, fontSize: 13.5, color: T.plum }}>
        Read the full diary <Ic name="arrow-right" size={15} color={T.plum} />
      </button>
    </div>
  );
}

/* ---- "Have you worked here?" CTA into the assignment diary ---- */
function WorkedHereCTA({ compact }) {
  return (
    <div style={{ borderRadius: 24, padding: compact ? 22 : 26, background: T.plum, color: T.open, position: 'relative', overflow: 'hidden' }}>
      <span style={{ position: 'absolute', right: -28, top: -28, width: 120, height: 120, borderRadius: '9999px 9999px 9999px 0', background: 'rgba(187,175,239,0.16)' }} />
      <div style={{ position: 'relative' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: T.font, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 11, color: T.lav }}>
          <Ic name="square-pen" size={14} color={T.lav} /> assignment diary
        </span>
        <h3 style={{ fontFamily: T.font, fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.06, fontSize: compact ? 24 : 28, color: T.open, margin: '12px 0 0' }}>Have you worked here?</h3>
        <p style={{ fontFamily: T.font, fontWeight: 300, fontSize: 14.5, lineHeight: 1.5, color: 'rgba(255,255,255,0.84)', margin: '10px 0 18px' }}>
          Add your assignment diary — structured, anonymized, and only the parts that help the next traveler. It is how this page gets smarter.
        </p>
        <button style={{ fontFamily: T.font, fontWeight: 400, fontSize: 15, background: T.lav, color: T.plum, border: 0, padding: '13px 20px', borderRadius: 9999, display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
          Start your diary <Ic name="arrow-right" size={17} color={T.plum} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 16 }}>
          <Ic name="shield-check" size={15} color={T.lav} />
          <span style={{ fontFamily: T.font, fontWeight: 400, textTransform: 'lowercase', fontSize: 12, color: 'rgba(255,255,255,0.72)' }}>no PHI · anonymized · structured tags first</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Ic, SectionTitle, TargetBadge, TargetWrap, ScoreRing, Stars, BreakdownBar, MetaTile, NoteTile, QuoteCallout, DiaryCard, WorkedHereCTA });
