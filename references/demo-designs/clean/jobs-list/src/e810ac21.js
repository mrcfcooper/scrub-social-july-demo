// Scrub Society — Mobile UI kit primitives
// Brand voice: relatable, playful, reliable. Outfit Light for body, Regular for everything else.

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
};

// ─────────────── icon (Lucide via CDN createIcons after mount) ───────────────
function Icon({ name, size = 20, stroke = 1.75, color = 'currentColor', style }) {
  // Use Lucide icons rendered as inline SVG via dangerouslySet — simpler than wiring data-lucide
  // Each name maps to inline path; keeps everything self-contained.
  const path = ICON_PATHS[name];
  if (!path) return <span style={{ width: size, height: size }} />;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{ flex: '0 0 auto', ...style }}
      dangerouslySetInnerHTML={{ __html: path }} />
  );
}
const ICON_PATHS = {
  'home':           '<path d="M3 12 12 4l9 8"/><path d="M5 10v10h14V10"/>',
  'search':         '<circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/>',
  'message-circle': '<path d="M21 11a8 8 0 0 1-15.4 3L3 21l7-2.6A8 8 0 1 1 21 11Z"/>',
  'users':          '<path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M17 3.13a4 4 0 0 1 0 7.75"/>',
  'user':           '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  'bookmark':       '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
  'bookmark-fill':  '<path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" fill="currentColor"/>',
  'map-pin':        '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  'calendar':       '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  'dollar':         '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
  'briefcase':      '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
  'plane':          '<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19.5 4S15 5 15 5l-3.5 3.5L4 6 2 8l7.2 4.4-2 2L4 14l-1 1 3.5 2 2 3.5 1-1-.4-3.2 2-2L15 22l2-2Z"/>',
  'stethoscope':    '<path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/>',
  'sparkles':       '<path d="M9.94 14.34 12 21l2.06-6.66L21 12l-6.94-2.34L12 3l-2.06 6.66L3 12Z"/><path d="M19 3v4M21 5h-4"/>',
  'heart':          '<path d="M19 14c1.5-1.5 3-3.5 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2 1.5 4 3 5.5l7 7Z"/>',
  'bell':           '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  'filter':         '<path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>',
  'arrow-right':    '<path d="M5 12h14M12 5l7 7-7 7"/>',
  'arrow-left':     '<path d="M19 12H5M12 19l-7-7 7-7"/>',
  'chevron-right':  '<path d="m9 6 6 6-6 6"/>',
  'chevron-down':   '<path d="m6 9 6 6 6-6"/>',
  'check':          '<path d="M20 6 9 17l-5-5"/>',
  'plus':           '<path d="M12 5v14M5 12h14"/>',
  'x':              '<path d="M18 6 6 18M6 6l12 12"/>',
  'send':           '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  'sliders':        '<line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/>',
  'star':           '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  'graduation':     '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
  'building':       '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/>',
  'compass':        '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
  'settings':       '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
};

// ─────────────── Type primitives ───────────────
function H1({ children, style, dark }) { return <h1 style={{ fontFamily: SS.font, fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.04, fontSize: 34, color: dark ? SS.open : SS.fg1, margin: 0, textWrap: 'balance', ...style }}>{children}</h1>; }
function H2({ children, style, dark }) { return <h2 style={{ fontFamily: SS.font, fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.08, fontSize: 24, color: dark ? SS.open : SS.fg1, margin: 0, ...style }}>{children}</h2>; }
function H3({ children, style, dark }) { return <h3 style={{ fontFamily: SS.font, fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.15, fontSize: 18, color: dark ? SS.open : SS.fg1, margin: 0, ...style }}>{children}</h3>; }
function Subhead({ children, style, dark }) { return <span style={{ fontFamily: SS.font, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 11, color: dark ? 'rgba(255,255,255,0.75)' : SS.fg2, ...style }}>{children}</span>; }
function Body({ children, style, dark, size = 14 }) { return <p style={{ fontFamily: SS.font, fontWeight: 300, fontSize: size, lineHeight: 1.5, color: dark ? 'rgba(255,255,255,0.85)' : SS.fg1, margin: 0, textWrap: 'pretty', ...style }}>{children}</p>; }
function Subtext({ children, style, dark }) { return <span style={{ fontFamily: SS.font, fontWeight: 400, textTransform: 'lowercase', fontSize: 12, color: dark ? 'rgba(255,255,255,0.7)' : SS.fg2, ...style }}>{children}</span>; }

// ─────────────── Buttons ───────────────
function PrimaryButton({ children, onClick, full, icon, style }) {
  return (
    <button onClick={onClick} style={{
      fontFamily: SS.font, fontWeight: 400, fontSize: 15, letterSpacing: 0,
      background: SS.plum, color: SS.open, border: 0, padding: '14px 22px',
      borderRadius: 9999, display: 'inline-flex', gap: 8, alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', width: full ? '100%' : 'auto', transition: 'all 120ms', ...style,
    }}>
      {icon && <Icon name={icon} size={18} color="currentColor" />}{children}
    </button>
  );
}
function AccentButton({ children, onClick, full, icon, style }) {
  return (
    <button onClick={onClick} style={{
      fontFamily: SS.font, fontWeight: 400, fontSize: 15,
      background: SS.lav, color: SS.plum, border: 0, padding: '14px 22px',
      borderRadius: 9999, display: 'inline-flex', gap: 8, alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', width: full ? '100%' : 'auto', ...style,
    }}>
      {icon && <Icon name={icon} size={18} color="currentColor" />}{children}
    </button>
  );
}
function GhostButton({ children, onClick, icon, style, onDark }) {
  return (
    <button onClick={onClick} style={{
      fontFamily: SS.font, fontWeight: 400, fontSize: 14,
      background: 'transparent', color: onDark ? SS.open : SS.plum, padding: '10px 16px',
      borderRadius: 9999, display: 'inline-flex', gap: 6, alignItems: 'center',
      border: 0, boxShadow: `inset 0 0 0 1.5px ${onDark ? 'rgba(255,255,255,0.4)' : SS.plum}`,
      cursor: 'pointer', ...style,
    }}>
      {icon && <Icon name={icon} size={16} color="currentColor" />}{children}
    </button>
  );
}
function IconButton({ name, onClick, onDark, style }) {
  return (
    <button onClick={onClick} style={{
      width: 40, height: 40, borderRadius: 9999, border: 0, cursor: 'pointer',
      background: onDark ? 'rgba(255,255,255,0.12)' : SS.open,
      boxShadow: onDark ? 'none' : `inset 0 0 0 1px ${SS.line}`,
      color: onDark ? SS.open : SS.plum,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', ...style,
    }}>
      <Icon name={name} size={18} color="currentColor" />
    </button>
  );
}

// ─────────────── Containers ───────────────
function Card({ children, style, padding = 16, alt }) {
  return (
    <div style={{
      background: alt ? SS.cloud : SS.open, borderRadius: 20, padding,
      boxShadow: `inset 0 0 0 1px ${SS.line}`, ...style,
    }}>{children}</div>
  );
}
function Chip({ children, tone = 'out', icon, style }) {
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
      fontFamily: SS.font, fontWeight: 400, fontSize: 12, lineHeight: 1.4,
      padding: '5px 11px', borderRadius: 9999,
      background: t.bg, color: t.fg, display: 'inline-flex', alignItems: 'center', gap: 5,
      boxShadow: t.bd ? `inset 0 0 0 1px ${t.bd}` : 'none', ...style,
    }}>
      {icon && <Icon name={icon} size={13} color="currentColor" />}{children}
    </span>
  );
}

// ─────────────── Header (per-screen top bar) ───────────────
function ScreenHeader({ title, onBack, right, dark }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px 12px', gap: 10 }}>
      {onBack ? <IconButton name="arrow-left" onClick={onBack} onDark={dark} /> : <div style={{ width: 40 }} />}
      <H3 dark={dark} style={{ flex: 1, textAlign: 'center', fontSize: 16 }}>{title}</H3>
      <div style={{ minWidth: 40, display: 'flex', justifyContent: 'flex-end' }}>{right || null}</div>
    </div>
  );
}

// ─────────────── Tab bar (mobile bottom nav) ───────────────
function TabBar({ active, onChange }) {
  const tabs = [
    { id: 'home',    icon: 'home',           label: 'Home' },
    { id: 'jobs',    icon: 'search',         label: 'Jobs' },
    { id: 'erin',    icon: 'sparkles',       label: 'Erin' },
    { id: 'society', icon: 'users',          label: 'Society' },
    { id: 'profile', icon: 'user',           label: 'Profile' },
  ];
  return (
    <div style={{
      position: 'absolute', left: 12, right: 12, bottom: 18,
      background: SS.open, borderRadius: 28, padding: '10px 8px',
      display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
      boxShadow: '0 14px 30px -8px rgba(66,26,49,0.28), inset 0 0 0 1px rgba(66,26,49,0.08)',
    }}>
      {tabs.map(t => {
        const on = t.id === active;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} style={{
            border: 0, background: on ? 'rgba(187,175,239,0.45)' : 'transparent',
            color: on ? SS.plum : SS.fg3,
            borderRadius: 18, padding: '6px 0',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, cursor: 'pointer',
            fontFamily: SS.font,
          }}>
            <Icon name={t.icon} size={20} color="currentColor" />
            <span style={{ fontSize: 10, fontWeight: 400 }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─────────────── Photo frame (speech-bubble corner) ───────────────
function PhotoFrame({ children, variant = 'BL', radius = 22, style }) {
  // BL = square bottom-left (default brand mark mirror), BR variant flips it
  const radii = {
    BL: `${radius}px ${radius}px ${radius}px 0`,
    BR: `${radius}px ${radius}px 0 ${radius}px`,
    TL: `0 ${radius}px ${radius}px ${radius}px`,
    all: `${radius}px`,
  };
  return (
    <div style={{ borderRadius: radii[variant], overflow: 'hidden', background: SS.dew, ...style }}>
      {children}
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
  PrimaryButton, AccentButton, GhostButton, IconButton,
  Card, Chip, ScreenHeader, TabBar, PhotoFrame, SMark,
});
