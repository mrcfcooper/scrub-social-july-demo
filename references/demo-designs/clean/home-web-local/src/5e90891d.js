// Scrub Society — primitives kit (web). Composed only from the design system.
// Outfit Regular (400) for headings/subheads/subtext, Outfit Light (300) for body.

const SS = {
  plum: '#421A31',
  open: '#FFFFFF',
  lav:  '#BBAFEF',
  sky:  '#82ABF4',
  dew:  '#CEDBFE',
  cloud:'#F9F2E8',
  line: 'rgba(66,26,49,0.12)',
  lineSoft: 'rgba(66,26,49,0.08)',
  fg1:  '#421A31',
  fg2:  'rgba(66,26,49,0.72)',
  fg3:  'rgba(66,26,49,0.50)',
  font: 'Outfit, "Helvetica Neue", Arial, sans-serif',
  // brand radii
  rPill: 9999,
  rPhoto: '28px 28px 28px 0',     // speech-bubble photo frame (square bottom-left)
  rBubble: '9999px 9999px 9999px 0',
  // shadows (paper-flat, no glow)
  sh1: '0 1px 2px rgba(66,26,49,0.12)',
  sh2: '0 6px 16px -8px rgba(66,26,49,0.22)',
  sh3: '0 18px 36px -16px rgba(66,26,49,0.28)',
};

// ─────────────── icon (inline Lucide paths) ───────────────
function Icon({ name, size = 20, stroke = 1.75, color = 'currentColor', style }) {
  const path = ICON_PATHS[name];
  if (!path) return <span style={{ width: size, height: size, display: 'inline-block' }} />;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={{ flex: '0 0 auto', ...style }}
      dangerouslySetInnerHTML={{ __html: path }} />
  );
}
const ICON_PATHS = {
  'search':         '<circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/>',
  'message-circle': '<path d="M21 11a8 8 0 0 1-15.4 3L3 21l7-2.6A8 8 0 1 1 21 11Z"/>',
  'users':          '<path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M17 3.13a4 4 0 0 1 0 7.75"/>',
  'map-pin':        '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  'calendar':       '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  'dollar':         '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  'briefcase':      '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  'building':       '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4M10 10h4M10 14h4M10 18h4"/>',
  'file-text':      '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5"/><path d="M9 13h6M9 17h6M9 9h1"/>',
  'sparkles':       '<path d="M9.94 14.34 12 21l2.06-6.66L21 12l-6.94-2.34L12 3l-2.06 6.66L3 12Z"/><path d="M19 3v4M21 5h-4"/>',
  'arrow-right':    '<path d="M5 12h14M12 5l7 7-7 7"/>',
  'arrow-left':     '<path d="M19 12H5M12 19l-7-7 7-7"/>',
  'chevron-right':  '<path d="m9 6 6 6-6 6"/>',
  'check':          '<path d="M20 6 9 17l-5-5"/>',
  'image':          '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.6-3.6a2 2 0 0 0-2.8 0L6 20"/>',
  'mail':           '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
  'ticket':         '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M13 5v14"/>',
};

// ─────────────── Type ───────────────
function H1({ children, style, dark }) { return <h1 style={{ fontFamily: SS.font, fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.02, fontSize: 34, color: dark ? SS.open : SS.fg1, margin: 0, textWrap: 'balance', ...style }}>{children}</h1>; }
function H2({ children, style, dark }) { return <h2 style={{ fontFamily: SS.font, fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.06, fontSize: 24, color: dark ? SS.open : SS.fg1, margin: 0, textWrap: 'balance', ...style }}>{children}</h2>; }
function H3({ children, style, dark }) { return <h3 style={{ fontFamily: SS.font, fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.15, fontSize: 18, color: dark ? SS.open : SS.fg1, margin: 0, ...style }}>{children}</h3>; }
function Subhead({ children, style, dark }) { return <span style={{ fontFamily: SS.font, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 12, color: dark ? 'rgba(255,255,255,0.75)' : SS.fg2, ...style }}>{children}</span>; }
function Body({ children, style, dark, size = 16 }) { return <p style={{ fontFamily: SS.font, fontWeight: 300, fontSize: size, lineHeight: 1.55, color: dark ? 'rgba(255,255,255,0.85)' : SS.fg1, margin: 0, textWrap: 'pretty', ...style }}>{children}</p>; }
function Subtext({ children, style, dark }) { return <span style={{ fontFamily: SS.font, fontWeight: 400, textTransform: 'lowercase', fontSize: 13, color: dark ? 'rgba(255,255,255,0.7)' : SS.fg2, ...style }}>{children}</span>; }

// ─────────────── Buttons ───────────────
function PrimaryButton({ children, onClick, full, icon, iconRight, style }) {
  return (
    <button onClick={onClick} className="ss-btn" style={{
      fontFamily: SS.font, fontWeight: 400, fontSize: 15, letterSpacing: 0,
      background: SS.plum, color: SS.open, border: 0, padding: '14px 24px',
      borderRadius: 9999, display: 'inline-flex', gap: 8, alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', width: full ? '100%' : 'auto', transition: 'all 120ms var(--ss-ease, ease)', ...style,
    }}>
      {icon && <Icon name={icon} size={18} color="currentColor" />}{children}{iconRight && <Icon name={iconRight} size={18} color="currentColor" />}
    </button>
  );
}
function AccentButton({ children, onClick, full, icon, style }) {
  return (
    <button onClick={onClick} className="ss-btn" style={{
      fontFamily: SS.font, fontWeight: 400, fontSize: 15,
      background: SS.lav, color: SS.plum, border: 0, padding: '14px 24px',
      borderRadius: 9999, display: 'inline-flex', gap: 8, alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', width: full ? '100%' : 'auto', transition: 'all 120ms', ...style,
    }}>
      {icon && <Icon name={icon} size={18} color="currentColor" />}{children}
    </button>
  );
}
function GhostButton({ children, onClick, icon, iconRight, style, onDark }) {
  return (
    <button onClick={onClick} className="ss-btn" style={{
      fontFamily: SS.font, fontWeight: 400, fontSize: 14,
      background: 'transparent', color: onDark ? SS.open : SS.plum, padding: '12px 18px',
      borderRadius: 9999, display: 'inline-flex', gap: 7, alignItems: 'center',
      border: 0, boxShadow: `inset 0 0 0 1.5px ${onDark ? 'rgba(255,255,255,0.4)' : SS.plum}`,
      cursor: 'pointer', transition: 'all 120ms', ...style,
    }}>
      {icon && <Icon name={icon} size={16} color="currentColor" />}{children}{iconRight && <Icon name={iconRight} size={16} color="currentColor" />}
    </button>
  );
}

// ─────────────── Chip ───────────────
function Chip({ children, tone = 'out', icon, bubble, style }) {
  const tones = {
    out:   { bg: 'transparent', fg: SS.plum, bd: SS.line },
    acc:   { bg: SS.lav,   fg: SS.plum },
    tint:  { bg: SS.dew,   fg: SS.plum },
    sky:   { bg: SS.sky,   fg: SS.plum },
    cloud: { bg: SS.cloud, fg: SS.plum },
    dark:  { bg: SS.plum,  fg: SS.open },
  };
  const t = tones[tone];
  return (
    <span style={{
      fontFamily: SS.font, fontWeight: 400, fontSize: 12.5, lineHeight: 1.4,
      padding: '6px 12px', borderRadius: bubble ? SS.rBubble : 9999,
      background: t.bg, color: t.fg, display: 'inline-flex', alignItems: 'center', gap: 6,
      boxShadow: t.bd ? `inset 0 0 0 1px ${t.bd}` : 'none', ...style,
    }}>
      {icon && <Icon name={icon} size={14} color="currentColor" />}{children}
    </span>
  );
}

// ─────────────── Card ───────────────
function Card({ children, style, padding = 24, alt, hover }) {
  return (
    <div className={hover ? 'ss-card-hover' : undefined} style={{
      background: alt ? SS.cloud : SS.open, borderRadius: 20, padding,
      boxShadow: `inset 0 0 0 1px ${SS.line}`, transition: 'transform 160ms var(--ss-ease, ease), box-shadow 160ms', ...style,
    }}>{children}</div>
  );
}

// ─────────────── Photo frame (speech-bubble corner) ───────────────
function PhotoFrame({ children, radius = 20, square = 'BL', style }) {
  const radii = {
    BL: `${radius}px ${radius}px ${radius}px 0`,
    BR: `${radius}px ${radius}px 0 ${radius}px`,
    none: `${radius}px`,
  };
  return (
    <div style={{ borderRadius: radii[square], overflow: 'hidden', background: SS.dew, ...style }}>
      {children}
    </div>
  );
}

// ─────────────── Photo placeholder (morning-dew fill + glyph) ───────────────
function PhotoSlot({ label, radius = 20, square = 'BL', style }) {
  const radii = { BL: `${radius}px ${radius}px ${radius}px 0`, none: `${radius}px` };
  return (
    <div style={{
      position: 'relative', background: SS.dew, borderRadius: radii[square], overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center', ...style,
    }}>
      <Icon name="image" size={30} color="rgba(66,26,49,0.34)" />
      {label && <span style={{
        position: 'absolute', left: 12, bottom: 10, fontFamily: SS.font, fontWeight: 400,
        fontSize: 11, textTransform: 'lowercase', color: 'rgba(66,26,49,0.55)',
      }}>{label}</span>}
    </div>
  );
}

// ─────────────── S Mark (speech-bubble logomark) ───────────────
function SMark({ size = 28, color = SS.plum }) {
  return (
    <svg viewBox="0 0 240 320" width={size} height={size * 320 / 240} style={{ flex: '0 0 auto' }}>
      <g fill={color}>
        <rect x="-19.75" y="122.84" width="241.12" height="74.07" rx="37.03" transform="translate(142.57 -24.46) rotate(45)"/>
        <path d="M24.8,216.14h120.56v37.03c0,20.44-16.59,37.03-37.03,37.03H24.8c-20.44,0-37.03-16.59-37.03-37.03h0c0-20.44,16.59-37.03,37.03-37.03Z" transform="translate(198.52 27.09) rotate(45)"/>
        <path d="M93.29,29.53h120.56v37.03c0,20.44-16.59,37.03-37.03,37.03h-83.52c-20.44,0-37.03-16.59-37.03-37.03h0c0-20.44,16.59-37.03,37.03-37.03Z" transform="translate(183.49 209.13) rotate(-135)"/>
      </g>
    </svg>
  );
}

Object.assign(window, {
  SS, Icon,
  H1, H2, H3, Subhead, Body, Subtext,
  PrimaryButton, AccentButton, GhostButton,
  Chip, Card, PhotoFrame, PhotoSlot, SMark,
});
