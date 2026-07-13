// Erin chat widget — composable parts, built on Scrub Society primitives (window.SS, Icon, Chip, Card…)
// Bubble + job-card vocabulary follows ui_kits/mobile/screens.jsx (ErinBubble / YouBubble / JobRow).

// ─────────── small glyph supplement (icons the DS set doesn't ship) ───────────
function Glyph({ d, size = 18, stroke = 1.75, color = 'currentColor', fill = 'none', style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={{ flex: '0 0 auto', ...style }} dangerouslySetInnerHTML={{ __html: d }} />
  );
}
const GLYPH = {
  headset: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 14a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2z"/><path d="M20 14a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2z"/><path d="M17 18v1a3 3 0 0 1-3 3h-2"/>',
  minimize: '<path d="M5 12h14"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};

// ─────────── avatars ───────────
function ErinAvatar({ size = 26 }) {
  return (
    <div style={{
      width: size, height: size, flex: '0 0 auto',
      borderRadius: '9999px 9999px 9999px 0', background: SS.lav, color: SS.plum,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <Icon name="sparkles" size={Math.round(size * 0.52)} color={SS.plum} />
    </div>
  );
}
function PersonAvatar({ size = 26, initial = 'M', bg = SS.sky }) {
  return (
    <div style={{
      width: size, height: size, flex: '0 0 auto',
      borderRadius: '9999px 9999px 9999px 0', background: bg, color: SS.plum,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: SS.font, fontWeight: 400, fontSize: Math.round(size * 0.42), letterSpacing: '-0.02em',
    }}>{initial}</div>
  );
}

// ─────────── target-state pill (Phase 2/3 proactive markers) ───────────
function TargetPill({ label = 'target state', style }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5, alignSelf: 'flex-start',
      padding: '3px 9px 3px 7px', borderRadius: 9999,
      background: 'rgba(187,175,239,0.30)', border: `1px dashed rgba(66,26,49,0.40)`,
      ...style,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 9999, background: SS.plum, opacity: 0.55 }} />
      <span style={{
        fontFamily: SS.font, fontWeight: 400, fontSize: 9.5, letterSpacing: '0.13em',
        textTransform: 'uppercase', color: SS.plum, opacity: 0.85,
      }}>{label}</span>
    </span>
  );
}

// ─────────── Erin / You / Recruiter rows ───────────
// ErinRow holds the avatar (or a spacer to align stacked content) + a column for pill + children.
function ErinRow({ children, target, avatar = true }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', maxWidth: '95%' }}>
      {avatar === 'spacer'
        ? <div style={{ width: 26, flex: '0 0 auto' }} />
        : <ErinAvatar size={26} />}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0, flex: 1 }}>
        {target && <TargetPill />}
        {children}
      </div>
    </div>
  );
}

function ErinBubble({ text, target, children }) {
  return (
    <ErinRow target={target}>
      {text && (
        <div style={{
          background: SS.open, color: SS.plum, padding: '11px 14px',
          borderRadius: '4px 18px 18px 18px',
          boxShadow: `inset 0 0 0 1px ${target ? 'rgba(187,175,239,0.9)' : SS.line}`,
          fontFamily: SS.font, fontWeight: 300, fontSize: 14, lineHeight: 1.45,
          textWrap: 'pretty',
        }}>{text}</div>
      )}
      {children}
    </ErinRow>
  );
}

function YouBubble({ text }) {
  return (
    <div style={{
      alignSelf: 'flex-end', background: SS.plum, color: SS.open,
      padding: '11px 14px', borderRadius: '18px 18px 4px 18px', maxWidth: '82%',
      fontFamily: SS.font, fontWeight: 300, fontSize: 14, lineHeight: 1.45, textWrap: 'pretty',
    }}>{text}</div>
  );
}

function RecruiterBubble({ text, name = 'Maria', agency = 'Aya' }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', maxWidth: '95%' }}>
      <PersonAvatar size={26} initial={name[0]} bg={SS.sky} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingLeft: 2 }}>
          <span style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 12, color: SS.plum }}>{name} · {agency}</span>
          <span style={{
            fontFamily: SS.font, fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: SS.plum, background: SS.sky, padding: '2px 7px', borderRadius: 9999,
          }}>recruiter</span>
        </div>
        <div style={{
          background: SS.open, color: SS.plum, padding: '11px 14px',
          borderRadius: '4px 18px 18px 18px', boxShadow: `inset 0 0 0 1px ${SS.line}`,
          fontFamily: SS.font, fontWeight: 300, fontSize: 14, lineHeight: 1.45, textWrap: 'pretty',
        }}>{text}</div>
      </div>
    </div>
  );
}

// ─────────── typing indicator ───────────
function TypingBubble() {
  return (
    <ErinRow>
      <div style={{
        background: SS.open, boxShadow: `inset 0 0 0 1px ${SS.line}`,
        borderRadius: '4px 18px 18px 18px', padding: '13px 15px',
        display: 'inline-flex', gap: 5, alignItems: 'center', alignSelf: 'flex-start',
      }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 7, height: 7, borderRadius: 9999, background: SS.plum,
            animation: `erinDot 1.1s ${i * 0.16}s infinite ease-in-out`,
          }} />
        ))}
      </div>
    </ErinRow>
  );
}

// ─────────── system line (state-machine transitions) ───────────
function SystemLine({ text, icon }) {
  return (
    <div style={{
      alignSelf: 'center', display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 13px', borderRadius: 9999, background: 'rgba(66,26,49,0.05)',
      maxWidth: '90%',
    }}>
      {icon && <Glyph d={GLYPH[icon]} size={13} color={SS.fg2} />}
      <span style={{
        fontFamily: SS.font, fontWeight: 400, fontSize: 11.5, textTransform: 'lowercase',
        color: SS.fg2, letterSpacing: '0.01em', textAlign: 'center',
      }}>{text}</span>
    </div>
  );
}

// ─────────── suggestion chips (the guidance pattern that drives the flow) ───────────
function SuggestionChips({ items, onPick, align = 'left' }) {
  return (
    <div style={{
      display: 'flex', gap: 6, flexWrap: 'wrap',
      justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
    }}>
      {items.map(c => (
        <button key={c} onClick={() => onPick && onPick(c)} style={{
          fontFamily: SS.font, fontWeight: 400, fontSize: 12.5, lineHeight: 1.3,
          padding: '8px 13px', borderRadius: 9999, cursor: onPick ? 'pointer' : 'default',
          background: SS.open, color: SS.plum, border: 0,
          boxShadow: `inset 0 0 0 1px ${SS.line}`, whiteSpace: 'nowrap',
          transition: 'all 120ms',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(187,175,239,0.28)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = SS.open; }}
        >{c}</button>
      ))}
    </div>
  );
}

// ─────────── inline job-match cards (two variants for the Card-primitive fork) ───────────
function initialsOf(name) { return name.split(' ').map(w => w[0]).slice(0, 2).join(''); }

// Variant A — compact row: dense, scannable, several fit in the thread at once.
function JobMatchCompact({ job, onOpen, flag }) {
  return (
    <article onClick={onOpen} style={{
      background: SS.open, borderRadius: '16px 16px 16px 4px', padding: 11,
      boxShadow: `inset 0 0 0 1px ${SS.line}`, cursor: onOpen ? 'pointer' : 'default',
      display: 'flex', alignItems: 'center', gap: 11,
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: '12px 12px 12px 0', flex: '0 0 auto',
        background: SS.dew, color: SS.plum, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: SS.font, fontWeight: 400, fontSize: 13, letterSpacing: '-0.02em',
      }}>{initialsOf(job.hospital)}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 14, color: SS.plum, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>{job.role}</span>
          {flag && <Icon name="check" size={13} color={SS.plum} />}
        </div>
        <div style={{ fontFamily: SS.font, fontWeight: 300, fontSize: 12, color: SS.fg2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {job.hospital} · {job.city}
        </div>
      </div>
      <div style={{ textAlign: 'right', flex: '0 0 auto' }}>
        <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 16, color: SS.plum, letterSpacing: '-0.02em', lineHeight: 1 }}>${job.pay.toLocaleString()}</div>
        <span style={{ fontFamily: SS.font, fontSize: 10.5, textTransform: 'lowercase', color: SS.fg3 }}>per wk</span>
      </div>
    </article>
  );
}

// Variant B — rich card: full chips, pay block, and in-card actions.
function JobMatchRich({ job, onOpen, onAsk, flag }) {
  const [saved, setSaved] = React.useState(false);
  return (
    <article style={{
      background: SS.open, borderRadius: '18px 18px 18px 4px', padding: 14,
      boxShadow: `inset 0 0 0 1px ${SS.line}`, display: 'flex', flexDirection: 'column', gap: 11,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
        <div style={{
          width: 44, height: 44, borderRadius: '13px 13px 13px 0', flex: '0 0 auto',
          background: SS.dew, color: SS.plum, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: SS.font, fontWeight: 400, fontSize: 14, letterSpacing: '-0.02em',
        }}>{initialsOf(job.hospital)}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <H3 style={{ fontSize: 15, whiteSpace: 'nowrap' }}>{job.role}</H3>
            {flag && <Icon name="check" size={14} color={SS.plum} />}
          </div>
          <Body size={12} style={{ color: SS.fg2, marginTop: 1 }}>{job.hospital} · {job.city}</Body>
        </div>
        <button onClick={() => setSaved(!saved)} style={{ background: 'transparent', border: 0, padding: 2, cursor: 'pointer', color: saved ? SS.plum : SS.fg3 }}>
          <Icon name={saved ? 'bookmark-fill' : 'bookmark'} size={18} color="currentColor" />
        </button>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <Chip tone="tint">{job.weeks} wks</Chip>
        <Chip tone="out">{job.shift}</Chip>
        {job.tags.map(t => <Chip key={t} tone="out">{t}</Chip>)}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 22, color: SS.plum, letterSpacing: '-0.02em' }}>${job.pay.toLocaleString()}</span>
          <span style={{ fontFamily: SS.font, fontSize: 11.5, textTransform: 'lowercase', color: SS.fg3, marginLeft: 6 }}>per wk · starts {job.start}</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, borderTop: `1px solid ${SS.lineSoft}`, paddingTop: 11 }}>
        <button onClick={onAsk} style={ghostMini()}>
          <Icon name="message-circle" size={15} color="currentColor" /> Ask about this
        </button>
        <button onClick={onOpen} style={{ ...ghostMini(), background: SS.plum, color: SS.open, boxShadow: 'none' }}>
          View role <Icon name="arrow-right" size={15} color="currentColor" />
        </button>
      </div>
    </article>
  );
}
function ghostMini() {
  return {
    flex: 1, justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: 6,
    fontFamily: SS.font, fontWeight: 400, fontSize: 13, cursor: 'pointer',
    padding: '9px 12px', borderRadius: 9999, border: 0,
    background: 'transparent', color: SS.plum, boxShadow: `inset 0 0 0 1.5px ${SS.plum}`,
  };
}

// ─────────── recruiter handoff card (LIVE human path: HUMAN_PENDING → HUMAN_ASSIGNED) ───────────
function RecruiterHandoffCard({ onConnect, onDismiss, recruiter = 'Maria', agency = 'Aya' }) {
  return (
    <div style={{
      background: SS.open, borderRadius: '16px 16px 16px 4px', padding: 14,
      boxShadow: `inset 0 0 0 1px ${SS.line}`, display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      <div style={{ display: 'flex', gap: 11, alignItems: 'center' }}>
        <div style={{
          width: 40, height: 40, borderRadius: '12px 12px 12px 0', flex: '0 0 auto',
          background: SS.sky, color: SS.plum, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Glyph d={GLYPH.headset} size={20} color={SS.plum} />
        </div>
        <div style={{ flex: 1 }}>
          <H3 style={{ fontSize: 15 }}>Want to talk to a recruiter?</H3>
          <Body size={12.5} style={{ color: SS.fg2, marginTop: 2 }}>
            I'll hand this to {recruiter} at {agency}. She'll confirm the details and submit you — usually back within one business day.
          </Body>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={onConnect} style={{
          flex: 1.5, justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: 7,
          fontFamily: SS.font, fontWeight: 400, fontSize: 14, cursor: 'pointer',
          padding: '11px 14px', borderRadius: 9999, border: 0, background: SS.plum, color: SS.open,
        }}>Connect with {recruiter}</button>
        <button onClick={onDismiss} style={{
          flex: 1, justifyContent: 'center', display: 'inline-flex', alignItems: 'center',
          fontFamily: SS.font, fontWeight: 400, fontSize: 14, cursor: 'pointer',
          padding: '11px 12px', borderRadius: 9999, border: 0,
          background: 'transparent', color: SS.plum, boxShadow: `inset 0 0 0 1.5px ${SS.plum}`,
        }}>Keep chatting</button>
      </div>
    </div>
  );
}

// ─────────── Ask-the-Society card (TARGET: community Q&A is Phase 3) ───────────
function AskSocietyCard({ question, onPost, members = '2,400' }) {
  return (
    <div style={{
      background: SS.open, borderRadius: '16px 16px 16px 4px', padding: 14,
      boxShadow: `inset 0 0 0 1px rgba(187,175,239,0.9)`, display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      <div style={{ display: 'flex', gap: 9, alignItems: 'center' }}>
        <div style={{
          width: 34, height: 34, borderRadius: '10px 10px 10px 0', flex: '0 0 auto',
          background: SS.lav, color: SS.plum, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="users" size={18} color={SS.plum} />
        </div>
        <div>
          <H3 style={{ fontSize: 15 }}>Ask the Society</H3>
          <span style={{ fontFamily: SS.font, fontSize: 11.5, textTransform: 'lowercase', color: SS.fg2 }}>peers who've worked these units</span>
        </div>
      </div>
      <div style={{
        background: SS.cloud, borderRadius: 12, padding: '11px 13px',
        fontFamily: SS.font, fontWeight: 300, fontSize: 13.5, lineHeight: 1.4, color: SS.plum,
      }}>“{question}”</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={onPost} style={{
          flex: 1, justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: 7,
          fontFamily: SS.font, fontWeight: 400, fontSize: 14, cursor: 'pointer',
          padding: '11px 14px', borderRadius: 9999, border: 0, background: SS.lav, color: SS.plum,
        }}>
          <Icon name="send" size={15} color={SS.plum} /> Post to the Society
        </button>
      </div>
      <span style={{ fontFamily: SS.font, fontSize: 11, textTransform: 'lowercase', color: SS.fg3, textAlign: 'center' }}>
        shared as “icu traveler” · {members} members can answer
      </span>
    </div>
  );
}

// peer answer returning from the Society (TARGET)
function PeerAnswerCard({ author, role, body, likes = 12 }) {
  return (
    <article style={{
      background: SS.open, borderRadius: '14px 14px 14px 4px', padding: 13,
      boxShadow: `inset 0 0 0 1px ${SS.line}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <PersonAvatar size={30} initial={author[0]} bg={SS.dew} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 13, color: SS.plum }}>{author}</div>
          <span style={{ fontFamily: SS.font, fontSize: 11, textTransform: 'lowercase', color: SS.fg2 }}>{role}</span>
        </div>
        <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center', color: SS.fg2, fontFamily: SS.font, fontSize: 12 }}>
          <Icon name="heart" size={14} color="currentColor" />{likes}
        </span>
      </div>
      <Body size={13} style={{ marginTop: 9 }}>{body}</Body>
    </article>
  );
}

Object.assign(window, {
  Glyph, GLYPH, ErinAvatar, PersonAvatar, TargetPill, initialsOf,
  ErinRow, ErinBubble, YouBubble, RecruiterBubble, TypingBubble, SystemLine,
  SuggestionChips, JobMatchCompact, JobMatchRich, RecruiterHandoffCard, AskSocietyCard, PeerAnswerCard,
});
