// ── Portal theme + left rail + top bar + conversation list ───────────────────
const { SMark } = window;

// Portal palette — brand tokens + a single flagged deviation (urgency amber).
const P = {
  plum: '#421A31', open: '#FFFFFF', lav: '#BBAFEF', sky: '#82ABF4', dew: '#CEDBFE', cloud: '#F9F2E8',
  fg1: '#421A31', fg2: 'rgba(66,26,49,0.72)', fg3: 'rgba(66,26,49,0.50)',
  line: 'rgba(66,26,49,0.12)', lineSoft: 'rgba(66,26,49,0.07)',
  canvas: '#F1ECEF',                // faint plum-tinted page bg (warm, not gray)
  hover: 'rgba(66,26,49,0.045)',
  sel: 'rgba(187,175,239,0.20)',    // lavender wash for selected row
  lavSoft: '#EDE9FB',
  // Urgency / SLA — the brand palette ships no alert hue; this warm amber harmonizes
  // with Soft Cloud and is used ONLY for time-critical signals. Flagged in handoff notes.
  alert: '#B5701A', alertBg: '#FBEEDA', alertLine: 'rgba(181,112,26,0.28)',
  font: 'Outfit, "Helvetica Neue", Arial, sans-serif',
};
const TONE_BG = { lav: '#E4DEF8', sky: '#DCE8FC', dew: '#E3EBFE', cloud: '#F1E9DC' };

function Avatar({ initials, tone = 'lav', size = 42, ring }) {
  return (
    <div style={{
      width: size, height: size, flex: '0 0 auto',
      borderRadius: `${size * 0.5}px ${size * 0.5}px ${size * 0.5}px ${Math.max(3, size * 0.14)}px`, // speech-bubble tail
      background: TONE_BG[tone] || TONE_BG.lav, color: P.plum,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: P.font, fontWeight: 400, fontSize: size * 0.36, letterSpacing: '-0.02em',
      boxShadow: ring ? `0 0 0 2px ${P.open}, 0 0 0 4px ${ring}` : 'none',
    }}>{initials}</div>
  );
}

// Tiny lavender Erin token (sparkle bubble).
function ErinDot({ size = 22 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: `${size/2}px ${size/2}px ${size/2}px 3px`,
      background: P.lav, color: P.plum, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
    }}><Ico name="sparkles" size={size * 0.6} /></div>
  );
}

// ── Left rail (dark plum) ────────────────────────────────────────────────────
function NavRail({ dark, onLogo }) {
  const nav = [
    { id: 'inbox', icon: 'inbox', label: 'Inbox', on: true, badge: 4 },
    { id: 'candidates', icon: 'users', label: 'Candidates' },
    { id: 'jobs', icon: 'briefcase', label: 'Jobs' },
    { id: 'subs', icon: 'file-check', label: 'Submissions' },
    { id: 'cal', icon: 'calendar', label: 'Calendar' },
  ];
  const bg = dark ? P.plum : P.open;
  const fgOff = dark ? 'rgba(255,255,255,0.62)' : P.fg3;
  const fgOn = dark ? P.open : P.plum;
  const onBg = dark ? 'rgba(187,175,239,0.22)' : P.sel;
  return (
    <nav style={{
      width: 72, flex: '0 0 72px', background: bg, height: '100%',
      borderRight: dark ? 'none' : `1px solid ${P.line}`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '14px 0', gap: 4,
    }}>
      <button onClick={onLogo} title="Scrub Society for Agencies" style={{
        width: 42, height: 42, borderRadius: '50% 50% 50% 6px', border: 0, cursor: 'pointer',
        background: dark ? 'rgba(255,255,255,0.10)' : P.plum, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10,
      }}>
        <SMark size={20} color={P.open} />
      </button>
      {nav.map(n => (
        <button key={n.id} title={n.label} style={{
          position: 'relative', width: 48, height: 48, borderRadius: 16, border: 0, cursor: 'pointer',
          background: n.on ? onBg : 'transparent', color: n.on ? fgOn : fgOff,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
          fontFamily: P.font, transition: 'all 120ms',
        }}>
          <Ico name={n.icon} size={21} />
          <span style={{ fontSize: 9, fontWeight: 400 }}>{n.label}</span>
          {n.badge ? <span style={{
            position: 'absolute', top: 5, right: 8, minWidth: 15, height: 15, padding: '0 4px',
            borderRadius: 9999, background: P.alert, color: '#fff', fontSize: 9, fontWeight: 500,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{n.badge}</span> : null}
        </button>
      ))}
      <div style={{ flex: 1 }} />
      <button title="Settings" style={{
        width: 48, height: 48, borderRadius: 16, border: 0, cursor: 'pointer', background: 'transparent', color: fgOff,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}><Ico name="settings" size={21} /></button>
    </nav>
  );
}

// ── Top bar (light) ──────────────────────────────────────────────────────────
function TopBar({ ws, recruiter, onToggleTrack, trackOpen }) {
  const [wsOpen, setWsOpen] = React.useState(false);
  return (
    <header style={{
      height: 58, flex: '0 0 58px', background: P.open, borderBottom: `1px solid ${P.line}`,
      display: 'flex', alignItems: 'center', gap: 16, padding: '0 16px 0 18px',
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontFamily: P.font, fontWeight: 400, fontSize: 17, letterSpacing: '-0.03em', color: P.plum }}>Scrub Society</span>
        <span style={{ fontFamily: P.font, fontWeight: 400, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: P.fg3 }}>for agencies</span>
      </div>

      <div style={{ width: 1, height: 26, background: P.line }} />

      {/* Workspace switcher */}
      <div style={{ position: 'relative' }}>
        <button onClick={() => setWsOpen(o => !o)} style={{
          display: 'flex', alignItems: 'center', gap: 9, border: 0, cursor: 'pointer',
          background: wsOpen ? P.hover : 'transparent', padding: '6px 9px', borderRadius: 10, fontFamily: P.font,
        }}>
          <span style={{ width: 26, height: 26, borderRadius: '50% 50% 50% 4px', background: P.plum, color: P.open, fontSize: 11, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{ws.short}</span>
          <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
            <span style={{ fontSize: 13.5, fontWeight: 400, color: P.fg1, letterSpacing: '-0.01em' }}>{ws.agency}</span>
            <span style={{ fontSize: 10.5, fontWeight: 400, color: P.fg3, textTransform: 'lowercase' }}>{ws.plan}</span>
          </span>
          <Ico name="chevron-down" size={15} color={P.fg3} />
        </button>
        {wsOpen && (
          <div style={{
            position: 'absolute', top: 48, left: 0, width: 248, background: P.open, borderRadius: 14,
            boxShadow: '0 18px 36px -16px rgba(66,26,49,0.34), inset 0 0 0 1px ' + P.line, padding: 6, zIndex: 40,
          }}>
            <div style={{ padding: '8px 10px 6px', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: P.fg3, fontFamily: P.font }}>Switch workspace</div>
            <button style={rowMenuStyle(true)}>
              <span style={miniWs(P.plum)}>{ws.short}</span><span style={{ flex: 1, textAlign: 'left' }}>{ws.agency}</span><Ico name="check" size={16} />
            </button>
            {ws.other.map((o, i) => (
              <button key={i} style={rowMenuStyle(false)}>
                <span style={miniWs(P.fg3)}>{o.split(' ').map(w => w[0]).slice(0,2).join('')}</span><span style={{ flex: 1, textAlign: 'left' }}>{o}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ flex: 1 }} />

      {/* Global search */}
      <label style={{
        display: 'flex', alignItems: 'center', gap: 8, width: 260, height: 38, padding: '0 12px',
        background: P.canvas, borderRadius: 9999, color: P.fg3,
      }}>
        <Ico name="search" size={16} />
        <input placeholder="Search candidates, jobs…" style={{
          border: 0, outline: 0, background: 'transparent', fontFamily: P.font, fontWeight: 300, fontSize: 13, color: P.fg1, width: '100%',
        }} />
      </label>

      <button title="Toggle assignment panel" onClick={onToggleTrack} style={iconBtn(trackOpen)}>
        <Ico name="panel-right" size={18} />
      </button>
      <button title="Notifications" style={iconBtn(false)}>
        <Ico name="bell" size={18} />
        <span style={{ position: 'absolute', top: 7, right: 8, width: 7, height: 7, borderRadius: 9999, background: P.alert }} />
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 2 }}>
        <Avatar initials={recruiter.initials} tone="sky" size={34} />
      </div>
    </header>
  );
}
function iconBtn(active) {
  return {
    position: 'relative', width: 38, height: 38, borderRadius: 10, border: 0, cursor: 'pointer',
    background: active ? P.sel : 'transparent', color: active ? P.plum : P.fg2,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  };
}
function rowMenuStyle(active) {
  return {
    display: 'flex', alignItems: 'center', gap: 10, width: '100%', border: 0, cursor: 'pointer',
    background: active ? P.sel : 'transparent', padding: '9px 10px', borderRadius: 10,
    fontFamily: P.font, fontWeight: 400, fontSize: 13, color: P.fg1, textAlign: 'left',
  };
}
function miniWs(bg) {
  return { width: 24, height: 24, borderRadius: '50% 50% 50% 4px', background: bg, color: '#fff', fontSize: 10, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' };
}

// ── Conversation list ────────────────────────────────────────────────────────
function FilterTabs({ active, onChange, counts }) {
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: 'Unread' },
    { id: 'erin', label: 'Erin' },
    { id: 'flagged', label: 'Flagged' },
    { id: 'snoozed', label: 'Snoozed' },
  ];
  return (
    <div style={{ display: 'flex', gap: 4, padding: '0 12px 10px', overflowX: 'auto' }}>
      {tabs.map(t => {
        const on = t.id === active;
        const c = counts[t.id] || 0;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, border: 0, cursor: 'pointer',
            background: on ? P.plum : 'transparent', color: on ? P.open : P.fg2,
            padding: '7px 12px', borderRadius: 9999, fontFamily: P.font, fontWeight: 400, fontSize: 12.5,
            boxShadow: on ? 'none' : `inset 0 0 0 1px ${P.line}`, whiteSpace: 'nowrap', transition: 'all 120ms',
          }}>
            {t.id === 'erin' && <Ico name="sparkles" size={13} color={on ? P.lav : P.fg3} />}
            {t.label}
            {c > 0 && <span style={{
              fontSize: 11, fontWeight: 500, color: on ? P.open : P.fg3,
              background: on ? 'rgba(255,255,255,0.18)' : P.canvas, padding: '0 6px', borderRadius: 9999, minWidth: 18, textAlign: 'center',
            }}>{c}</span>}
          </button>
        );
      })}
    </div>
  );
}

function ConversationRow({ c, selected, onClick, compact }) {
  const spine = (c.urgent && !c.joined) ? P.alert : (c.erinPending && !c.joined) ? P.lav : c.snoozed ? P.dew : 'transparent';
  const nameWeight = c.unread ? 500 : 400;
  const fromLabel = c.lastFrom === 'erin' ? 'erin' : c.lastFrom === 'rec' ? 'you' : null;
  return (
    <button onClick={onClick} style={{
      position: 'relative', width: '100%', textAlign: 'left', border: 0, cursor: 'pointer',
      background: selected ? P.sel : 'transparent',
      padding: compact ? '9px 14px 9px 16px' : '12px 14px 13px 16px',
      display: 'flex', gap: 11, alignItems: 'flex-start', fontFamily: P.font,
      borderBottom: `1px solid ${P.lineSoft}`, opacity: c.snoozed ? 0.72 : 1, transition: 'background 120ms',
    }}
      onMouseEnter={e => { if (!selected) e.currentTarget.style.background = P.hover; }}
      onMouseLeave={e => { if (!selected) e.currentTarget.style.background = 'transparent'; }}
    >
      <span style={{ position: 'absolute', left: 0, top: 8, bottom: 8, width: 3, borderRadius: 9999, background: spine }} />
      <div style={{ position: 'relative' }}>
        <Avatar initials={c.initials} tone={c.tone} size={compact ? 36 : 42} />
        {c.unread && <span style={{ position: 'absolute', top: -2, right: -2, width: 11, height: 11, borderRadius: 9999, background: P.sky, boxShadow: `0 0 0 2px ${selected ? '#F1ECF8' : P.open}` }} />}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: nameWeight, color: P.fg1, letterSpacing: '-0.01em', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
          <span style={{ fontSize: 11, fontWeight: 400, color: c.urgent ? P.alert : P.fg3, flex: '0 0 auto' }}>{c.time}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 1 }}>
          <span style={{ fontSize: 11.5, fontWeight: 400, color: P.fg2 }}>{c.specialty}</span>
          <span style={{ width: 3, height: 3, borderRadius: 9999, background: P.fg3 }} />
          <span style={{ fontSize: 11.5, fontWeight: 300, color: P.fg3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.home}</span>
        </div>
        {!compact && (
          <p style={{
            margin: '5px 0 0', fontSize: 12.5, fontWeight: 300, lineHeight: 1.4, color: c.unread ? P.fg1 : P.fg2,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {fromLabel && <span style={{ color: P.fg3 }}>{fromLabel}: </span>}{c.preview}
          </p>
        )}
        {/* state chips */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
          {c.erinPending && !c.joined && <MiniChip icon="sparkles" tone="lav">Erin handoff</MiniChip>}
          {c.urgent && !c.joined && <MiniChip icon="zap" tone="alert">{c.sla || 'Urgent'}</MiniChip>}
          {c.flagged && !c.urgent && <MiniChip icon="flag" tone="plum">Flagged</MiniChip>}
          {c.snoozed && <MiniChip icon="clock" tone="dew">Wakes {c.snoozeUntil}</MiniChip>}
          {c.newApplicant && <MiniChip icon="user-plus" tone="sky">New applicant</MiniChip>}
        </div>
      </div>
    </button>
  );
}

function MiniChip({ children, icon, tone }) {
  const map = {
    lav: { bg: P.lavSoft, fg: P.plum },
    alert: { bg: P.alertBg, fg: P.alert },
    plum: { bg: 'rgba(66,26,49,0.07)', fg: P.fg1 },
    dew: { bg: '#E8EFFE', fg: '#3D5A8A' },
    sky: { bg: '#DEEAFD', fg: '#345086' },
  }[tone] || { bg: P.canvas, fg: P.fg2 };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: P.font, fontWeight: 400, fontSize: 11,
      padding: '3px 8px 3px 6px', borderRadius: 9999, background: map.bg, color: map.fg, lineHeight: 1.2,
    }}>
      <Ico name={icon} size={12} color={map.fg} stroke={2} />{children}
    </span>
  );
}

function ConversationList({ items, selectedId, onSelect, filter, onFilter, counts, compact, activeCount }) {
  return (
    <section style={{
      width: 366, flex: '0 0 366px', background: P.open, borderRight: `1px solid ${P.line}`,
      display: 'flex', flexDirection: 'column', height: '100%',
    }}>
      <div style={{ padding: '16px 16px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <h1 style={{ margin: 0, fontFamily: P.font, fontWeight: 400, fontSize: 21, letterSpacing: '-0.035em', color: P.fg1 }}>Inbox</h1>
          <span style={{ fontFamily: P.font, fontSize: 12, color: P.fg3, fontWeight: 400 }}>{activeCount} active</span>
          <div style={{ flex: 1 }} />
          <button style={{ ...iconBtn(false), width: 34, height: 34 }} title="Compose"><Ico name="plus" size={18} /></button>
        </div>
      </div>
      <FilterTabs active={filter} onChange={onFilter} counts={counts} />
      <div style={{ flex: 1, overflowY: 'auto', borderTop: `1px solid ${P.lineSoft}` }}>
        {items.length === 0 ? (
          <div style={{ padding: '40px 24px', textAlign: 'center', color: P.fg3, fontFamily: P.font, fontWeight: 300, fontSize: 13 }}>
            Nothing here right now.
          </div>
        ) : items.map(c => (
          <ConversationRow key={c.id} c={c} selected={c.id === selectedId} onClick={() => onSelect(c.id)} compact={compact} />
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { P, TONE_BG, Avatar, ErinDot, NavRail, TopBar, ConversationList, MiniChip, iconBtn });
