/* Preference Center — data model + net-new selection controls.
   These three controls (toggle, frequency select, consent checkbox) are NOT in the
   Scrub Society bundle, so they are built here directly on the design tokens. Flagged
   in the Design notes panel. Everything else composes the shipped primitives. */

const { useState } = React;

/* ----------------------------- data model ----------------------------- */
const FREQS = ['Instant', 'Daily', 'Weekly', 'Monthly'];

const CHANNELS = [
  { id: 'push',  label: 'Push' },
  { id: 'email', label: 'Email' },
  { id: 'sms',   label: 'SMS' },
  { id: 'inapp', label: 'In-app' },
];

// A channel is "available" for a topic when topic.ch[channel] exists.
const TOPICS = [
  { id: 'jm', title: 'New job matches', desc: 'Jobs matching your profile', badge: 'Recommended',
    ch: { push:{on:true,freq:'Instant'}, email:{on:true,freq:'Daily'}, sms:{on:false,freq:'Instant'}, inapp:{on:true,freq:'Instant'} } },
  { id: 'sj', title: 'Saved job updates', desc: 'Pay changes, start date, status',
    ch: { push:{on:true,freq:'Daily'}, email:{on:false,freq:'Daily'}, sms:{on:false,freq:'Instant'}, inapp:{on:true,freq:'Instant'} } },
  { id: 'aa', title: 'Application activity', desc: 'Submitted, recruiter views, follow-up',
    ch: { push:{on:true,freq:'Instant'}, email:{on:true,freq:'Instant'}, sms:{on:false,freq:'Instant'}, inapp:{on:true,freq:'Instant'} } },
  { id: 'ro', title: 'Recruiter outreach', desc: 'When a recruiter contacts you via Erin',
    ch: { push:{on:true,freq:'Instant'}, email:{on:false,freq:'Instant'}, sms:{on:false,freq:'Instant'}, inapp:{on:true,freq:'Instant'} } },
  { id: 'nl', title: 'Community newsletter', desc: 'Facility intel, community picks',
    ch: { email:{on:false,freq:'Weekly'} } },
  { id: 'pa', title: 'Platform announcements', desc: 'New features, important notices',
    ch: { push:{on:true,freq:'Instant'}, email:{on:true,freq:'Instant'}, inapp:{on:true,freq:'Instant'} } },
  { id: 'sc', title: 'Sponsored content', desc: 'From Scrub Society partner agencies',
    ch: { email:{on:false,freq:'Weekly'} } },
];

function buildInitialState() {
  const cells = {};
  TOPICS.forEach(t => {
    cells[t.id] = {};
    Object.keys(t.ch).forEach(cid => { cells[t.id][cid] = { ...t.ch[cid] }; });
  });
  return cells;
}

/* --------------------------- channel glyphs ---------------------------
   Lucide-style, 1.75 stroke, currentColor — matches the DS icon policy. The
   bundle ships `bell` but not mail / message / app-window, so those three are
   drawn inline at the same stroke weight. */
function ChannelGlyph({ id, size = 18, color = 'var(--ss-plum-grove)' }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: color, strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round',
    style: { flex: '0 0 auto' } };
  const paths = {
    push: <g><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M11 18h2" /></g>,
    email: <g><rect x="2" y="4.5" width="20" height="15" rx="2.5" /><path d="m3 7 9 6 9-6" /></g>,
    sms: <path d="M21 11.5a8 8 0 0 1-11.4 7.2L3 21l2.3-6.6A8 8 0 1 1 21 11.5Z" />,
    inapp: <g><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 8.5h18" /><path d="M7 5.8h.01" /></g>,
  };
  return <svg {...common}>{paths[id]}</svg>;
}

/* ------------------------------ toggle --------------------------------
   Brand rule: tap states are color-change, on = Plum Grove track. Press 0.98. */
function PrefToggle({ on, disabled, onChange, ariaLabel }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => !disabled && onChange(!on)}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        width: 40, height: 24, padding: 0, border: 0, flex: '0 0 auto',
        borderRadius: 9999, position: 'relative', cursor: disabled ? 'not-allowed' : 'pointer',
        background: on ? 'var(--ss-plum-grove)' : 'color-mix(in srgb, var(--ss-plum-grove) 18%, white)',
        boxShadow: on ? 'none' : 'inset 0 0 0 1px var(--ss-line)',
        opacity: disabled ? 0.32 : 1,
        transform: pressed && !disabled ? 'scale(0.97)' : 'scale(1)',
        transition: 'background var(--ss-dur-fast) var(--ss-ease-standard), transform var(--ss-dur-fast) var(--ss-ease-standard), opacity var(--ss-dur-base) var(--ss-ease-standard)',
      }}
    >
      <span style={{
        position: 'absolute', top: 3, left: 3, width: 18, height: 18, borderRadius: '50%',
        background: '#fff', boxShadow: '0 1px 2px rgba(66,26,49,0.28)',
        transform: on ? 'translateX(16px)' : 'translateX(0)',
        transition: 'transform var(--ss-dur-base) var(--ss-ease-standard)',
      }} />
    </button>
  );
}

/* -------------------------- frequency select --------------------------
   Styled native <select> on tokens (radius-2, hairline, Outfit Light, chevron). */
function FreqSelect({ value, onChange, disabled, compact }) {
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <select
        value={value}
        disabled={disabled}
        onChange={e => onChange(e.target.value)}
        aria-label="Frequency"
        style={{
          appearance: 'none', WebkitAppearance: 'none',
          fontFamily: 'var(--ss-font)', fontWeight: 300,
          fontSize: compact ? 12 : 13, lineHeight: 1.4, color: 'var(--ss-fg-1)',
          background: '#fff', border: 0, boxShadow: 'inset 0 0 0 1px var(--ss-line)',
          borderRadius: 'var(--ss-radius-2)', padding: compact ? '4px 24px 4px 10px' : '6px 28px 6px 12px',
          cursor: disabled ? 'not-allowed' : 'pointer', outline: 'none',
        }}
      >
        {FREQS.map(f => <option key={f} value={f}>{f}</option>)}
      </select>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--ss-fg-3)"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        style={{ position: 'absolute', right: compact ? 8 : 10, pointerEvents: 'none' }}>
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

/* ----------------------------- not available --------------------------- */
function NotAvailable() {
  return <span aria-label="Not available" style={{ color: 'var(--ss-fg-3)', opacity: 0.5, fontSize: 16, lineHeight: 1 }}>—</span>;
}

/* --------------------------- consent checkbox -------------------------- */
function ConsentCheckbox({ checked, onChange, id }) {
  return (
    <button
      type="button" role="checkbox" aria-checked={checked} id={id}
      onClick={() => onChange(!checked)}
      style={{
        flex: '0 0 auto', width: 20, height: 20, padding: 0, marginTop: 1,
        borderRadius: 6, cursor: 'pointer', border: 0,
        background: checked ? 'var(--ss-plum-grove)' : '#fff',
        boxShadow: checked ? 'none' : 'inset 0 0 0 1.5px color-mix(in srgb, var(--ss-plum-grove) 30%, white)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background var(--ss-dur-fast) var(--ss-ease-standard)',
      }}
    >
      {checked && (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff"
          strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
      )}
    </button>
  );
}

Object.assign(window, {
  FREQS, CHANNELS, TOPICS, buildInitialState,
  ChannelGlyph, PrefToggle, FreqSelect, NotAvailable, ConsentCheckbox,
});
