// Erin chat widget — surfaces: header, composer, beat renderer, device/popover shells, host page.

// ─────────── canonical sample matches (ICU, west coast, the thread's narrative) ───────────
const MATCHES = [
  { id: 'm1', role: 'ICU travel RN', hospital: 'Providence St. Vincent', city: 'Portland, OR',     start: 'mar 24', weeks: 13, shift: 'Nights · 3×12', pay: 2680, tags: ['Housing stipend'], housing: true },
  { id: 'm2', role: 'ICU travel RN', hospital: 'UCSF Medical Center',    city: 'San Francisco, CA', start: 'apr 7',  weeks: 13, shift: 'Days · 3×12',   pay: 3240, tags: ['Premium pay', 'Housing'], housing: true },
  { id: 'm3', role: 'ICU travel RN', hospital: 'Swedish First Hill',     city: 'Seattle, WA',       start: 'mar 31', weeks: 8,  shift: 'Nights · 3×12', pay: 2520, tags: ['Short contract'], housing: false },
];

// ─────────── header (Erin identity + presence + window controls) ───────────
function ErinHeader({ variant = 'popover', onClose }) {
  const mobile = variant === 'mobile';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 11,
      padding: mobile ? '54px 14px 12px' : '13px 14px',
      borderBottom: `1px solid ${SS.lineSoft}`, background: SS.open, flex: '0 0 auto',
      borderRadius: mobile ? 0 : '24px 24px 0 0',
    }}>
      {mobile && <IconButton name="arrow-left" />}
      <div style={{ position: 'relative' }}>
        <ErinAvatar size={mobile ? 40 : 36} />
        <span style={{
          position: 'absolute', right: -1, bottom: -1, width: 11, height: 11, borderRadius: 9999,
          background: '#1F8A5B', boxShadow: `0 0 0 2px ${SS.open}`,
        }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{ fontFamily: SS.font, fontWeight: 400, fontSize: mobile ? 17 : 15, color: SS.plum, letterSpacing: '-0.01em' }}>Erin</span>
        <span style={{ fontFamily: SS.font, fontSize: 11.5, textTransform: 'lowercase', color: SS.fg2 }}>your scrubsociety guide · always on</span>
      </div>
      {mobile
        ? <IconButton name="settings" />
        : (
          <div style={{ display: 'flex', gap: 4 }}>
            <button onClick={() => {}} style={hdrBtn()}><Glyph d={GLYPH.minimize} size={17} color={SS.fg2} /></button>
            <button onClick={onClose} style={hdrBtn()}><Icon name="x" size={17} color={SS.fg2} /></button>
          </div>
        )}
    </div>
  );
}
function hdrBtn() {
  return { width: 30, height: 30, borderRadius: 9999, border: 0, background: 'transparent', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' };
}

// ─────────── composer ───────────
function Composer({ value, onChange, onSend, placeholder = 'ask anything — pay, housing, the unit…', live, safeBottom }) {
  return (
    <div style={{
      flex: '0 0 auto', padding: 12, paddingBottom: safeBottom ? 30 : 12,
      background: SS.open, borderTop: `1px solid ${SS.lineSoft}`,
    }}>
      <div style={{
        background: SS.open, borderRadius: 9999, padding: '6px 6px 6px 16px',
        display: 'flex', gap: 8, alignItems: 'center', boxShadow: `inset 0 0 0 1px ${SS.line}`,
      }}>
        <input
          value={value} disabled={!live}
          onChange={e => onChange && onChange(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') onSend && onSend(); }}
          placeholder={placeholder}
          style={{ flex: 1, border: 0, outline: 0, background: 'transparent', fontFamily: SS.font, fontWeight: 300, fontSize: 14, color: SS.plum, minWidth: 0 }}
        />
        <button onClick={onSend} style={{
          width: 38, height: 38, borderRadius: 9999, border: 0, background: SS.plum, color: SS.open,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
        }}>
          <Icon name="send" size={17} color="currentColor" />
        </button>
      </div>
    </div>
  );
}

// ─────────── beat renderer (shared by storyboard + interactive) ───────────
function renderBeat(b, i, handlers = {}) {
  switch (b.kind) {
    case 'erin':    return <ErinBubble key={i} text={b.text} target={b.target} />;
    case 'you':     return <YouBubble key={i} text={b.text} />;
    case 'typing':  return <TypingBubble key={i} />;
    case 'system':  return <SystemLine key={i} text={b.text} icon={b.icon} />;
    case 'recruiter': return <RecruiterBubble key={i} text={b.text} name={b.name} agency={b.agency} />;
    case 'chips':   return <SuggestionChips key={i} items={b.items} onPick={handlers.onPick} />;
    case 'jobs':    return (
      <ErinRow key={i} target={b.target}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {b.text && (
            <div style={{
              background: SS.open, color: SS.plum, padding: '11px 14px',
              borderRadius: '4px 18px 18px 18px',
              boxShadow: `inset 0 0 0 1px ${b.target ? 'rgba(187,175,239,0.9)' : SS.line}`,
              fontFamily: SS.font, fontWeight: 300, fontSize: 14, lineHeight: 1.45, textWrap: 'pretty',
            }}>{b.text}</div>
          )}
          {b.variant === 'rich'
            ? b.items.map(j => <JobMatchRich key={j.id} job={j} flag={j.housing ? 'Housing' : null} onOpen={handlers.onOpenJob} onAsk={handlers.onAskJob} />)
            : b.items.map(j => <JobMatchCompact key={j.id} job={j} flag={j.housing} onOpen={handlers.onOpenJob} />)}
        </div>
      </ErinRow>
    );
    case 'handoff': return (
      <ErinRow key={i} avatar="spacer">
        <RecruiterHandoffCard onConnect={handlers.onConnectRecruiter} onDismiss={handlers.onDismissHandoff} />
      </ErinRow>
    );
    case 'asksociety': return (
      <ErinRow key={i} avatar="spacer" target>
        <AskSocietyCard question={b.question} onPost={handlers.onPostSociety} />
      </ErinRow>
    );
    case 'peer': return (
      <ErinRow key={i} avatar="spacer" target>
        <PeerAnswerCard author={b.author} role={b.role} body={b.body} likes={b.likes} />
      </ErinRow>
    );
    default: return null;
  }
}

// thread scroll region
function Thread({ beats, handlers, scrollRef }) {
  return (
    <div ref={scrollRef} style={{
      flex: 1, overflowY: 'auto', minHeight: 0,
      background: 'rgba(66,26,49,0.035)',
      padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 11,
    }}>
      {beats.map((b, i) => renderBeat(b, i, handlers))}
    </div>
  );
}

// static surface for storyboard frames (header + thread + dead composer)
function ErinSurfaceStatic({ beats, variant = 'popover', composer = true, height, scrollBottom }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (scrollBottom && ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [scrollBottom]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height, background: SS.open, overflow: 'hidden' }}>
      <ErinHeader variant={variant} />
      <Thread beats={beats} handlers={{}} scrollRef={ref} />
      {composer && <Composer live={false} value="" />}
    </div>
  );
}

// ─────────── interactive thread engine ───────────
function useErinThread(initial) {
  const [beats, setBeats] = React.useState(initial);
  const [draft, setDraft] = React.useState('');
  const scrollRef = React.useRef(null);
  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [beats]);

  const stripChips = arr => arr.filter(b => b.kind !== 'chips');
  const append = (...bs) => setBeats(t => [...stripChips(t), ...bs]);
  const erinReply = (afterTyping, delay = 850) => {
    setBeats(t => [...stripChips(t), { kind: 'typing' }]);
    setTimeout(() => setBeats(t => [...t.filter(b => b.kind !== 'typing'), ...afterTyping]), delay);
  };
  return { beats, setBeats, draft, setDraft, scrollRef, append, erinReply };
}

function ErinInteractive({ variant = 'mobile' }) {
  const t = useErinThread([
    { kind: 'erin', target: true, text: "Hey Lin — heads up, your Denver ICU contract wraps in 3 weeks. Want to start looking, or take a breath first?" },
    { kind: 'chips', items: ['Start looking', 'Find ICU jobs', 'Take a breath'] },
  ]);

  const matchesLead = "On it. Three ICU openings out west, starting late March, $2,500+ weekly. I flagged the two with housing already sorted.";

  const handlers = {
    onPick: (c) => routeUser(c),
    onConnectRecruiter: () => {
      t.append({ kind: 'you', text: 'Yes, connect me.' });
      t.erinReply([
        { kind: 'system', icon: 'clock', text: 'connecting you with a recruiter…' },
      ], 500);
      setTimeout(() => t.setBeats(prev => [...prev,
        { kind: 'system', text: 'maria from aya joined the chat' },
        { kind: 'recruiter', name: 'Maria', agency: 'Aya', text: "Hi Lin! I've got the Portland ICU role pulled up — pay's confirmed at $2,680 with the stipend. Want me to submit you today?" },
        { kind: 'chips', items: ['Submit me', 'Ask about housing', 'Ask the Society'] },
      ]), 1400);
    },
    onDismissHandoff: () => { t.append({ kind: 'you', text: 'Not yet — keep chatting.' }); t.erinReply([{ kind: 'erin', text: "Totally fine. I'm here whenever. Want me to compare these three on pay and commute?" }]); },
    onPostSociety: () => {
      t.append({ kind: 'system', text: 'posted to the society' });
      t.erinReply([
        { kind: 'erin', target: true, text: "Posted. I'll ping you when travelers weigh in — usually a few answers within the hour." },
        { kind: 'peer', author: 'Devon R.', role: 'icu · 3 contracts there', body: "Ratio's a true 2:1 on nights and charge actually protects your breaks. Parking's free with the ICU badge.", likes: 14 },
      ], 1100);
    },
    onOpenJob: () => {},
    onAskJob: () => { t.append({ kind: 'you', text: 'Tell me more about the Portland one.' }); t.erinReply([{ kind: 'erin', text: "Providence St. Vincent, Portland — 13 weeks, nights 3×12, $2,680/wk with a housing stipend. Strong ICU, level II trauma. Want the floor notes from members who've worked it?" }]); },
  };

  function routeUser(text) {
    const low = text.toLowerCase();
    t.append({ kind: 'you', text });
    t.setDraft('');
    if (/(job|icu|look|match|opening|west)/.test(low)) {
      t.erinReply([
        { kind: 'erin', target: true, text: matchesLead },
        { kind: 'jobs', variant: 'rich', items: MATCHES },
        { kind: 'chips', items: ['See compact list', 'Talk to a recruiter', 'Ask the Society'] },
      ]);
    } else if (/(compact|list|more job)/.test(low)) {
      t.erinReply([
        { kind: 'erin', text: "Here's the tighter list — same three, easier to scan." },
        { kind: 'jobs', variant: 'compact', items: MATCHES },
        { kind: 'chips', items: ['Talk to a recruiter', 'Ask the Society'] },
      ]);
    } else if (/(recruiter|human|apply|submit|talk to)/.test(low)) {
      t.erinReply([
        { kind: 'erin', text: "Want a human in the loop? I can hand this to your recruiter — they'll confirm details and submit you." },
        { kind: 'handoff' },
      ]);
    } else if (/(society|someone|peer|ask the)/.test(low)) {
      t.erinReply([
        { kind: 'erin', target: true, text: "Want more than my take? I can post this to the Society — travelers who've worked these units can weigh in." },
        { kind: 'asksociety', question: "How's the ICU ratio on nights at Providence St. Vincent (Portland)?" },
      ]);
    } else if (/(housing|stipend|rent|live)/.test(low)) {
      t.erinReply([{ kind: 'erin', text: "Two of the three include a housing stipend — Portland and SF. I can pull furnished, pet-friendly options near each if you want to compare." }]);
    } else if (/(breath|wait|later|not yet)/.test(low)) {
      t.erinReply([{ kind: 'erin', text: "Smart. You've got three weeks — no need to rush it. I'll keep an eye on west-coast ICU roles and nudge you when something strong lands." }]);
    } else {
      t.erinReply([{ kind: 'erin', text: "Got it. I can help with pay packages, licenses, housing, or pulling matches — where do you want to start?" }]);
    }
  }

  const composer = (
    <Composer live value={t.draft} onChange={t.setDraft} safeBottom={variant === 'mobile'}
      onSend={() => { if (t.draft.trim()) routeUser(t.draft.trim()); }} />
  );

  if (variant === 'popover') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: SS.open }}>
        <ErinHeader variant="popover" />
        <Thread beats={t.beats} handlers={handlers} scrollRef={t.scrollRef} />
        {composer}
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: SS.open }}>
      <ErinHeader variant="mobile" />
      <Thread beats={t.beats} handlers={handlers} scrollRef={t.scrollRef} />
      {composer}
    </div>
  );
}

// desktop job row for the host page (the kit's WebJobRow isn't exported)
function DesktopJobRow({ job }) {
  return (
    <article style={{ background: SS.open, borderRadius: 20, padding: 16, boxShadow: `inset 0 0 0 1px ${SS.line}`, display: 'flex', gap: 14, alignItems: 'center' }}>
      <div style={{
        width: 52, height: 52, borderRadius: '15px 15px 15px 0', flex: '0 0 auto',
        background: SS.dew, color: SS.plum, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: SS.font, fontWeight: 400, fontSize: 15, letterSpacing: '-0.02em',
      }}>{initialsOf(job.hospital)}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <H3 style={{ fontSize: 16 }}>{job.role}</H3>
        <Body size={12.5} style={{ color: SS.fg2, marginTop: 1 }}>{job.hospital} · {job.city} · {job.shift}</Body>
        <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
          <Chip tone="tint">{job.weeks} wks</Chip>
          {(job.tags || []).slice(0, 1).map(t => <Chip key={t} tone="out">{t}</Chip>)}
        </div>
      </div>
      <div style={{ textAlign: 'right', flex: '0 0 auto' }}>
        <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 22, color: SS.plum, letterSpacing: '-0.02em', lineHeight: 1 }}>${job.pay.toLocaleString()}</div>
        <span style={{ fontFamily: SS.font, fontSize: 11, textTransform: 'lowercase', color: SS.fg3 }}>per wk · starts {job.start}</span>
      </div>
    </article>
  );
}

// ─────────── desktop host page (jobs feed behind the popover) ───────────
function DesktopHostPage() {
  return (
    <div style={{ minHeight: '100%', background: '#FBFAF7', position: 'relative' }}>
      <div style={{ borderBottom: `1px solid ${SS.lineSoft}` }}>
        <SiteNav />
      </div>
      <div style={{ padding: '22px 32px 40px', maxWidth: 1100, margin: '0 auto' }}>
        <Subhead style={{ display: 'block', marginBottom: 8 }}>Jobs · saved search</Subhead>
        <H2 style={{ fontSize: 30 }}>ICU travel RN · west coast</H2>
        <div style={{ display: 'flex', gap: 8, margin: '16px 0 20px', flexWrap: 'wrap' }}>
          {['ICU', 'West coast', '13 weeks', '$2,500+ /wk', 'Housing stipend'].map((f, i) => (
            <Chip key={f} tone={i === 0 ? 'dark' : 'out'}>{f}</Chip>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {[...MATCHES, SAMPLE_JOBS[0]].map(j => <DesktopJobRow key={j.id} job={j} />)}
        </div>
      </div>
    </div>
  );
}

// docked popover (open) anchored bottom-right inside a relative parent
function ErinPopover({ width = 384, height = 568, interactive = true, beats }) {
  return (
    <div style={{
      position: 'absolute', right: 22, bottom: 22, width, height,
      borderRadius: 24, overflow: 'hidden', background: SS.open,
      boxShadow: '0 24px 60px -12px rgba(66,26,49,0.45), 0 0 0 1px rgba(66,26,49,0.08)',
      zIndex: 30, display: 'flex', flexDirection: 'column',
    }}>
      {interactive ? <ErinInteractive variant="popover" /> : <ErinSurfaceStatic beats={beats} variant="popover" height={height} />}
    </div>
  );
}

// closed launcher FAB + proactive nudge (target)
function ErinLauncher({ withNudge = true }) {
  return (
    <div style={{ position: 'absolute', right: 22, bottom: 22, zIndex: 30, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
      {withNudge && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, maxWidth: 244 }}>
          <TargetPill />
          <div style={{
            background: SS.open, color: SS.plum, padding: '12px 14px',
            borderRadius: '18px 18px 4px 18px',
            boxShadow: '0 14px 30px -10px rgba(66,26,49,0.30), inset 0 0 0 1px rgba(187,175,239,0.9)',
            fontFamily: SS.font, fontWeight: 300, fontSize: 13.5, lineHeight: 1.4,
          }}>
            Your Denver contract wraps in 3 weeks — want me to line up west-coast ICU options?
          </div>
        </div>
      )}
      <button style={{
        width: 60, height: 60, borderRadius: '9999px 9999px 9999px 8px', border: 0, cursor: 'pointer',
        background: SS.plum, color: SS.open, display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 16px 34px -10px rgba(66,26,49,0.55)', position: 'relative',
      }}>
        <Icon name="sparkles" size={26} color={SS.lav} />
        <span style={{
          position: 'absolute', top: -2, right: -2, minWidth: 20, height: 20, padding: '0 5px',
          borderRadius: 9999, background: SS.lav, color: SS.plum, fontFamily: SS.font, fontWeight: 400,
          fontSize: 11, display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 0 2px ${SS.plum}`,
        }}>1</span>
      </button>
    </div>
  );
}

Object.assign(window, {
  MATCHES, ErinHeader, Composer, renderBeat, Thread, ErinSurfaceStatic,
  useErinThread, ErinInteractive, DesktopHostPage, ErinPopover, ErinLauncher,
});
