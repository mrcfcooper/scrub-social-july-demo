// ── Conversation view: header · Erin handoff · thread · composer ─────────────
const { Avatar: Av, MiniChip: Chip2 } = window;

function ConvHeader({ conv, joined, onSnooze, onFlag }) {
  return (
    <div style={{
      flex: '0 0 auto', background: P.open, borderBottom: `1px solid ${P.line}`,
      padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <Av initials={conv.initials} tone={conv.tone} size={44} />
      <div style={{ minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ fontFamily: P.font, fontWeight: 400, fontSize: 17, letterSpacing: '-0.02em', color: P.fg1 }}>{conv.name}</span>
          {joined
            ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: P.font, fontSize: 11.5, color: '#2E7D5B', background: '#E4F3EC', padding: '3px 9px', borderRadius: 9999 }}><span style={{ width: 6, height: 6, borderRadius: 9999, background: '#2E7D5B' }} />You’re handling this</span>
            : conv.erinPending
              ? <Chip2 icon="sparkles" tone="lav">Erin handoff</Chip2>
              : null}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 2, fontFamily: P.font }}>
          <span style={{ fontSize: 12.5, fontWeight: 400, color: P.fg2 }}>{conv.specialty}</span>
          <span style={{ width: 3, height: 3, borderRadius: 9999, background: P.fg3 }} />
          <span style={{ fontSize: 12.5, fontWeight: 300, color: P.fg3 }}>{conv.license}</span>
          <span style={{ width: 3, height: 3, borderRadius: 9999, background: P.fg3 }} />
          <span style={{ fontSize: 12.5, fontWeight: 300, color: P.fg3 }}>{conv.years} · {conv.home}</span>
        </div>
      </div>
      <div style={{ flex: 1 }} />
      <button onClick={onFlag} title="Flag" style={{ ...iconBtn(conv.flagged), color: conv.flagged ? P.alert : P.fg2, background: conv.flagged ? P.alertBg : 'transparent' }}><Ico name="flag" size={18} stroke={conv.flagged ? 2 : 1.75} /></button>
      <button onClick={onSnooze} title="Snooze" style={{ ...iconBtn(conv.snoozed) }}><Ico name="clock" size={18} /></button>
      <button title="Call" style={iconBtn(false)}><Ico name="phone" size={18} /></button>
      <button title="More" style={iconBtn(false)}><Ico name="more-horizontal" size={18} /></button>
    </div>
  );
}

// The headline moment: Erin passed this to a human.
function ErinHandoff({ conv, joined, onJoin, onInsert }) {
  const [openSummary, setOpenSummary] = React.useState(true);
  const e = conv.erin;
  if (!e) return null;

  if (joined) {
    return (
      <div style={{
        margin: '14px 18px 0', padding: '10px 14px', borderRadius: 12, background: P.lavSoft,
        display: 'flex', alignItems: 'center', gap: 10, fontFamily: P.font,
      }}>
        <ErinDot size={22} />
        <span style={{ fontSize: 12.5, fontWeight: 300, color: P.fg2, flex: 1 }}>
          You joined this conversation. Erin’s brief is saved below — pick up wherever feels right.
        </span>
        <button onClick={() => onInsert(e.suggested)} style={textLinkBtn}>Use Erin’s draft</button>
      </div>
    );
  }

  return (
    <div style={{
      margin: '16px 18px 0', borderRadius: 16, overflow: 'hidden',
      background: P.open, boxShadow: `0 6px 16px -10px rgba(66,26,49,0.28), inset 0 0 0 1.5px ${P.lav}`,
    }}>
      <div style={{ background: `linear-gradient(0deg, ${P.lavSoft}, ${P.lavSoft})`, padding: '13px 16px', display: 'flex', alignItems: 'flex-start', gap: 11 }}>
        <ErinDot size={30} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: P.font, fontWeight: 400, fontSize: 14.5, color: P.plum }}>Erin passed this to you</span>
            {e.confidence && <span style={{ fontFamily: P.font, fontSize: 11, color: P.plum, background: P.lav, padding: '2px 9px', borderRadius: 9999 }}>{e.confidence}</span>}
            <span style={{ flex: 1 }} />
            {conv.sla && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: P.font, fontSize: 11.5, color: P.alert, background: P.alertBg, padding: '3px 9px', borderRadius: 9999 }}><Ico name="zap" size={12} stroke={2} />{conv.sla}</span>}
          </div>
          <p style={{ margin: '6px 0 0', fontFamily: P.font, fontWeight: 300, fontSize: 13.5, lineHeight: 1.5, color: P.fg1 }}>{e.reason}</p>
        </div>
      </div>

      <div style={{ padding: '4px 16px 14px' }}>
        <button onClick={() => setOpenSummary(s => !s)} style={{
          display: 'flex', alignItems: 'center', gap: 6, border: 0, background: 'transparent', cursor: 'pointer',
          fontFamily: P.font, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: P.fg2, padding: '10px 0 6px',
        }}>
          <Ico name={openSummary ? 'chevron-down' : 'chevron-right'} size={14} />Conversation so far
        </button>
        {openSummary && (
          <p style={{ margin: '0 0 12px', fontFamily: P.font, fontWeight: 300, fontSize: 13, lineHeight: 1.55, color: P.fg2 }}>{e.summary}</p>
        )}

        <div style={{ borderRadius: 12, background: P.canvas, padding: '11px 13px', marginBottom: 13 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
            <Ico name="corner-up-left" size={14} color={P.fg2} />
            <span style={{ fontFamily: P.font, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: P.fg2 }}>Suggested reply</span>
          </div>
          <p style={{ margin: 0, fontFamily: P.font, fontWeight: 300, fontSize: 13, lineHeight: 1.55, color: P.fg1 }}>{e.suggested}</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={onJoin} style={primaryBtn}>
            <Ico name="user-plus" size={17} color="#fff" />Join conversation
          </button>
          <button onClick={() => { onJoin(); onInsert(e.suggested); }} style={ghostBtn}>
            <Ico name="corner-up-left" size={15} />Join &amp; use draft
          </button>
          <span style={{ flex: 1 }} />
          <span style={{ fontFamily: P.font, fontSize: 11.5, fontWeight: 300, color: P.fg3 }}>Erin keeps replying until you join</span>
        </div>
      </div>
    </div>
  );
}

function Bubble({ m, conv }) {
  if (m.who === 'rec') {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
        <div style={{ maxWidth: '76%' }}>
          <div style={{
            background: P.plum, color: P.open, borderRadius: '16px 16px 4px 16px', padding: '10px 14px',
            fontFamily: P.font, fontWeight: 300, fontSize: 13.5, lineHeight: 1.5,
          }}>{m.text}</div>
          <div style={{ textAlign: 'right', fontFamily: P.font, fontSize: 10.5, color: P.fg3, marginTop: 4, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 4 }}>
            You · {m.time}<Ico name="check-check" size={13} color={P.sky} />
          </div>
        </div>
      </div>
    );
  }
  const isErin = m.who === 'erin';
  return (
    <div style={{ display: 'flex', gap: 9 }}>
      {isErin ? <ErinDot size={28} /> : <Av initials={conv.initials} tone={conv.tone} size={28} />}
      <div style={{ maxWidth: '76%' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginBottom: 3 }}>
          <span style={{ fontFamily: P.font, fontSize: 11.5, fontWeight: 400, color: isErin ? P.plum : P.fg1 }}>{isErin ? 'Erin' : conv.name.split(' ')[0]}</span>
          {isErin && <span style={{ fontFamily: P.font, fontSize: 10, color: P.fg3, textTransform: 'lowercase' }}>ai guide</span>}
        </div>
        <div style={{
          background: isErin ? P.lavSoft : P.open, color: P.fg1,
          borderRadius: '4px 16px 16px 16px', padding: '10px 14px',
          boxShadow: isErin ? 'none' : `inset 0 0 0 1px ${P.line}`,
          fontFamily: P.font, fontWeight: 300, fontSize: 13.5, lineHeight: 1.5,
        }}>{m.text}</div>
        <div style={{ fontFamily: P.font, fontSize: 10.5, color: P.fg3, marginTop: 4 }}>{m.time}</div>
      </div>
    </div>
  );
}

function Composer({ conv, joined, draft, setDraft, onSend, onJoin }) {
  const taRef = React.useRef(null);
  const send = () => { if (draft.trim()) { onSend(draft.trim()); setDraft(''); } };
  if (!joined && conv.erinPending) {
    return (
      <div style={{ flex: '0 0 auto', padding: '14px 18px 18px', borderTop: `1px solid ${P.line}`, background: P.open }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 14,
          background: P.canvas, fontFamily: P.font,
        }}>
          <Ico name="sparkles" size={18} color={P.fg3} />
          <span style={{ flex: 1, fontSize: 13, fontWeight: 300, color: P.fg2 }}>Erin is handling this conversation. Join to take over and reply.</span>
          <button onClick={onJoin} style={{ ...primaryBtn, padding: '9px 16px' }}><Ico name="user-plus" size={16} color="#fff" />Join to reply</button>
        </div>
      </div>
    );
  }
  return (
    <div style={{ flex: '0 0 auto', padding: '12px 18px 16px', borderTop: `1px solid ${P.line}`, background: P.open }}>
      <div style={{
        borderRadius: 16, background: P.open, boxShadow: `inset 0 0 0 1px ${P.line}`, padding: 10,
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        <textarea ref={taRef} value={draft} onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); send(); } }}
          placeholder={`Message ${conv.name.split(' ')[0]}…`} rows={2} style={{
            border: 0, outline: 0, resize: 'none', background: 'transparent', fontFamily: P.font, fontWeight: 300,
            fontSize: 13.5, lineHeight: 1.5, color: P.fg1, padding: '4px 6px', minHeight: 42,
          }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button style={composerIcon}><Ico name="paperclip" size={18} /></button>
          <button style={composerIcon}><Ico name="file-text" size={18} /></button>
          <span style={{ flex: 1 }} />
          <span style={{ fontFamily: P.font, fontSize: 11, color: P.fg3, marginRight: 4 }}>⌘↵ to send</span>
          <button onClick={send} disabled={!draft.trim()} style={{
            ...primaryBtn, padding: '9px 16px', opacity: draft.trim() ? 1 : 0.4, cursor: draft.trim() ? 'pointer' : 'default',
          }}><Ico name="send" size={16} color="#fff" />Send</button>
        </div>
      </div>
    </div>
  );
}

const primaryBtn = {
  display: 'inline-flex', alignItems: 'center', gap: 7, border: 0, cursor: 'pointer',
  background: P.plum, color: P.open, padding: '11px 18px', borderRadius: 9999,
  fontFamily: P.font, fontWeight: 400, fontSize: 13.5,
};
const ghostBtn = {
  display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer',
  background: 'transparent', color: P.plum, padding: '10px 16px', borderRadius: 9999,
  border: 0, boxShadow: `inset 0 0 0 1.5px ${P.plum}`, fontFamily: P.font, fontWeight: 400, fontSize: 13,
};
const textLinkBtn = {
  border: 0, background: 'transparent', cursor: 'pointer', fontFamily: P.font, fontWeight: 400,
  fontSize: 12.5, color: P.plum, textDecoration: 'underline', textUnderlineOffset: 2, flex: '0 0 auto',
};
const composerIcon = {
  width: 36, height: 36, borderRadius: 10, border: 0, cursor: 'pointer', background: 'transparent', color: P.fg3,
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
};

function ConversationView({ conv, joined, draft, setDraft, onJoin, onSend, onInsert, onSnooze, onFlag }) {
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [conv.id, conv.messages.length, joined]);
  return (
    <section style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', height: '100%', background: P.canvas }}>
      <ConvHeader conv={conv} joined={joined} onSnooze={onSnooze} onFlag={onFlag} />
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto' }}>
        <ErinHandoff conv={conv} joined={joined} onJoin={onJoin} onInsert={onInsert} />
        <div style={{ padding: '18px 18px 8px', display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 760, margin: '0 auto', width: '100%' }}>
          {conv.messages.map((m, i) => <Bubble key={i} m={m} conv={conv} />)}
        </div>
      </div>
      <Composer conv={conv} joined={joined} draft={draft} setDraft={setDraft} onSend={onSend} onJoin={onJoin} />
    </section>
  );
}

Object.assign(window, { ConversationView, primaryBtn, ghostBtn });
