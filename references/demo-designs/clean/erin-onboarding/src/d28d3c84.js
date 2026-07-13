// Scrub Society — Erin onboarding · mobile flow
// Composes DS primitives (window globals from _ds_bundle.js): SS, Icon, Card, PrimaryButton,
// GhostButton, IconButton, SMark, IOSDevice, JobRow, SAMPLE_JOBS, Body, Subhead, Subtext, H1, H2, H3.
const { useState, useRef, useEffect, useLayoutEffect } = React;
const SS = window.SS;
const {
  Icon, Card, PrimaryButton, GhostButton, AccentButton, IconButton,
  SMark, IOSDevice, JobRow, SAMPLE_JOBS,
  Body, Subhead, Subtext, H1, H2, H3,
} = window;

// ─────────────── helpers ───────────────
function stateAbbr(loc) {
  if (!loc || loc.indexOf(',') < 0) return 'your';
  return loc.split(',')[1].trim();
}
function fillWith(t, data) {
  return (t || '')
    .replace('{city}', (data && data.location) ? data.location.split(',')[0] : 'home base')
    .replace('{state}', stateAbbr(data && data.location))
    .replace('{n}', String(ERIN.matchCount));
}
function echoStr(step, v) {
  if (step.type === 'multi') return (v || []).join(' · ');
  return v;
}
function specialtyOptions(profession) {
  return ERIN.specialtiesByProfession[profession] || ERIN.specialtiesByProfession['Registered Nurse (RN)'];
}

// ─────────────── Erin avatar (speech-bubble S monogram) ───────────────
function ErinAvatar({ size = 30, dark }) {
  return (
    <div style={{
      width: size, height: size, flex: '0 0 auto',
      borderRadius: '9999px 9999px 9999px 0',
      background: SS.lav, color: SS.plum,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: SS.font, fontWeight: 400, fontSize: size * 0.42, letterSpacing: '-0.02em',
      boxShadow: dark ? 'none' : `inset 0 0 0 1px ${SS.line}`,
    }}>E</div>
  );
}

// ─────────────── chat bubbles ───────────────
function ErinBubble({ children, dark }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', maxWidth: '90%' }}>
      <ErinAvatar size={26} dark={dark} />
      <div style={{
        background: dark ? 'rgba(255,255,255,0.10)' : SS.open,
        color: dark ? SS.open : SS.plum,
        padding: '11px 14px', borderRadius: '4px 18px 18px 18px',
        boxShadow: dark ? 'inset 0 0 0 1px rgba(255,255,255,0.16)' : `inset 0 0 0 1px ${SS.line}`,
        fontFamily: SS.font, fontWeight: 300, fontSize: 14.5, lineHeight: 1.5,
      }}>{children}</div>
    </div>
  );
}
function YouBubble({ children }) {
  return (
    <div style={{
      alignSelf: 'flex-end', background: SS.plum, color: SS.open,
      padding: '11px 14px', borderRadius: '18px 18px 4px 18px', maxWidth: '84%',
      fontFamily: SS.font, fontWeight: 300, fontSize: 14.5, lineHeight: 1.5,
    }}>{children}</div>
  );
}
function TypingBubble({ dark }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
      <ErinAvatar size={26} dark={dark} />
      <div style={{
        background: dark ? 'rgba(255,255,255,0.10)' : SS.open,
        padding: '14px 16px', borderRadius: '4px 18px 18px 18px',
        boxShadow: dark ? 'none' : `inset 0 0 0 1px ${SS.line}`,
        display: 'flex', gap: 5, alignItems: 'center',
      }}>
        {[0, 1, 2].map(i => (
          <span key={i} className="erin-typing-dot" style={{
            width: 6, height: 6, borderRadius: 9999, background: SS.fg3,
            animationDelay: `${i * 160}ms`,
          }} />
        ))}
      </div>
    </div>
  );
}

// ─────────────── progress bar (7 segments) ───────────────
function ProgressBar({ answered, current, total = 7 }) {
  return (
    <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) => {
        const done = i < answered;
        const here = i === current;
        return (
          <div key={i} style={{
            flex: 1, height: 6, borderRadius: 9999,
            background: done ? SS.plum : here ? SS.lav : 'rgba(187,175,239,0.32)',
            transition: 'background 220ms cubic-bezier(.4,0,.2,1)',
          }} />
        );
      })}
    </div>
  );
}

// ─────────────── selectable option chip ───────────────
function OptionChip({ children, icon, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      fontFamily: SS.font, fontWeight: 400, fontSize: 14.5, lineHeight: 1.2,
      minHeight: 44, padding: '10px 15px', borderRadius: 9999, cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', gap: 7,
      background: selected ? SS.plum : SS.open,
      color: selected ? SS.open : SS.plum,
      border: 0,
      boxShadow: selected ? 'none' : `inset 0 0 0 1px ${SS.line}`,
      transition: 'all 120ms cubic-bezier(.4,0,.2,1)',
    }}>
      {selected
        ? <Icon name="check" size={15} color="currentColor" />
        : icon ? <Icon name={icon} size={15} color={SS.fg2} /> : null}
      {children}
    </button>
  );
}

// ─────────────── match card (hero, in-chat) ───────────────
function MatchCard({ compact }) {
  const job = SAMPLE_JOBS[0];
  return (
    <div style={{
      background: SS.open, borderRadius: 20, padding: 15,
      boxShadow: `0 10px 24px -14px rgba(66,26,49,0.4), inset 0 0 0 1px ${SS.line}`,
      maxWidth: '94%',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <span style={{
          fontFamily: SS.font, fontSize: 12, fontWeight: 400, color: SS.plum,
          background: SS.lav, padding: '4px 10px', borderRadius: 9999,
          display: 'inline-flex', gap: 5, alignItems: 'center',
        }}><Icon name="sparkles" size={13} color="currentColor" />Best match</span>
        <Subtext style={{ marginLeft: 'auto', color: SS.fg3 }}>94% fit</Subtext>
      </div>
      <H3 style={{ fontSize: 17 }}>{job.role}</H3>
      <Body size={13} style={{ color: SS.fg2, marginTop: 2 }}>{job.hospital} · {job.city}</Body>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 11 }}>
        {['ICU', `${job.weeks} wks`, job.shift, 'Housing stipend'].map(t => (
          <span key={t} style={{
            fontFamily: SS.font, fontSize: 12, color: SS.plum, background: SS.dew,
            padding: '4px 10px', borderRadius: 9999,
          }}>{t}</span>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 12 }}>
        <div>
          <span style={{ fontFamily: SS.font, fontWeight: 400, letterSpacing: '-0.02em', fontSize: 24, color: SS.plum }}>${job.pay.toLocaleString()}</span>
          <Subtext style={{ marginLeft: 6 }}>per wk · starts {job.start}</Subtext>
        </div>
      </div>
      {/* Erin's read */}
      <div style={{
        display: 'flex', gap: 8, alignItems: 'flex-start',
        background: SS.cloud, borderRadius: 14, padding: '11px 12px', marginTop: 13,
      }}>
        <ErinAvatar size={22} />
        <Body size={12.5} style={{ color: SS.fg1, lineHeight: 1.45 }}>{ERIN.copy.matchErin}</Body>
      </div>
      {!compact && (
        <div style={{ display: 'flex', gap: 9, marginTop: 13 }}>
          <GhostButton icon="bookmark" style={{ flex: 1, justifyContent: 'center' }}>Save</GhostButton>
          <PrimaryButton icon="check" style={{ flex: 1.3 }}>Apply now</PrimaryButton>
        </div>
      )}
    </div>
  );
}

// ─────────────── option tray (bottom) ───────────────
function Tray({ snap, h }) {
  const { phase, data } = snap;
  if (phase === 'finding') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '4px 2px' }}>
        <Icon name="sparkles" size={16} color={SS.fg3} />
        <Subtext style={{ color: SS.fg3 }}>erin is lining up your matches…</Subtext>
      </div>
    );
  }
  if (phase === 'match') {
    return (
      <div style={{ display: 'flex', gap: 9 }}>
        <PrimaryButton full icon="arrow-right" onClick={h.onSeeAll} style={{ flex: 1.4, flexDirection: 'row-reverse' }}>
          {fillWith(ERIN.copy.seeAll, data)}
        </PrimaryButton>
        <GhostButton icon="message-circle" onClick={h.onReset} style={{ flex: 1, justifyContent: 'center' }}>{ERIN.copy.keepChatting}</GhostButton>
      </div>
    );
  }
  const step = ERIN.steps[snap.stepIdx];
  if (!step) return null;

  if (step.type === 'single') {
    const opts = step.id === 'profession' ? ERIN.professions.map(p => ({ v: p.v, icon: p.icon }))
      : (step.field === 'years' ? ERIN.experience
        : step.field === 'radius' ? ERIN.radius
          : step.field === 'shift' ? ERIN.shift
            : ERIN.availability).map(v => ({ v }));
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {opts.map(o => (
          <OptionChip key={o.v} icon={o.icon} onClick={() => h.onCommit(o.v)}>{o.v}</OptionChip>
        ))}
      </div>
    );
  }

  if (step.type === 'multi') {
    const opts = specialtyOptions(data.profession);
    const sel = snap.multiSel || [];
    return (
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 11 }}>
          {opts.map(o => (
            <OptionChip key={o} selected={sel.indexOf(o) >= 0} onClick={() => h.onToggle(o)}>{o}</OptionChip>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Subtext style={{ color: SS.fg3 }}>{sel.length ? `${sel.length} selected` : 'pick at least one'}</Subtext>
          <PrimaryButton
            icon="arrow-right"
            onClick={() => sel.length && h.onCommit(sel)}
            style={{
              marginLeft: 'auto', flexDirection: 'row-reverse',
              opacity: sel.length ? 1 : 0.4, pointerEvents: sel.length ? 'auto' : 'none',
            }}>Continue</PrimaryButton>
        </div>
      </div>
    );
  }

  if (step.type === 'location') {
    return (
      <div>
        <div style={{
          background: SS.open, borderRadius: 9999, padding: '11px 8px 11px 15px',
          display: 'flex', gap: 8, alignItems: 'center', boxShadow: `inset 0 0 0 1px ${SS.line}`, marginBottom: 10,
        }}>
          <Icon name="map-pin" size={18} color={SS.fg2} />
          <input
            value={snap.locInput || ''}
            onChange={e => h.onLocInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && (snap.locInput || '').trim()) h.onCommit(snap.locInput.trim()); }}
            placeholder="city, state — e.g. Denver, CO"
            style={{ flex: 1, border: 0, outline: 0, background: 'transparent', fontFamily: SS.font, fontWeight: 300, fontSize: 14.5, color: SS.plum }} />
          <button onClick={() => (snap.locInput || '').trim() && h.onCommit(snap.locInput.trim())} style={{
            width: 38, height: 38, borderRadius: 9999, border: 0, cursor: 'pointer',
            background: (snap.locInput || '').trim() ? SS.plum : 'rgba(66,26,49,0.18)', color: SS.open,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
          }}><Icon name="arrow-right" size={17} color="currentColor" /></button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {ERIN.locationSuggest.map(s => (
            <OptionChip key={s} icon={s === 'Use current location' ? 'map-pin' : undefined}
              onClick={() => h.onCommit(s === 'Use current location' ? 'Denver, CO' : s)}>{s}</OptionChip>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

// ─────────────── mobile chat view (pure) ───────────────
function MobileChatView({ snap, h }) {
  const scrollRef = useRef(null);
  useLayoutEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [snap.thread.length, snap.phase]);

  const answered = snap.phase === 'finding' || snap.phase === 'match' ? 7
    : ERIN.steps.slice(0, snap.stepIdx).length;
  const showBar = snap.phase === 'capture';

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: SS.cloud }}>
      {/* pinned header */}
      <div style={{
        paddingTop: 52, paddingBottom: 12, paddingLeft: 16, paddingRight: 16,
        background: 'color-mix(in srgb, #F9F2E8 86%, transparent)', backdropFilter: 'blur(14px)',
        boxShadow: `0 1px 0 ${SS.lineSoft}`, position: 'relative', zIndex: 3,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: showBar ? 12 : 0 }}>
          <ErinAvatar size={36} />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 15, color: SS.plum, letterSpacing: '-0.01em' }}>Erin</div>
            <Subtext style={{ color: SS.fg3 }}>setting up your matches</Subtext>
          </div>
          <IconButton name="x" onClick={h.onReset} />
        </div>
        {showBar && <ProgressBar answered={answered} current={snap.stepIdx} />}
      </div>

      {/* thread */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: 11 }}>
        {snap.thread.map((m, i) => {
          if (m.kind === 'typing') return <TypingBubble key={i} />;
          if (m.kind === 'match') return <div key={i} style={{ marginTop: 2 }}><MatchCard /></div>;
          return m.who === 'you' ? <YouBubble key={i}>{m.text}</YouBubble> : <ErinBubble key={i}>{m.text}</ErinBubble>;
        })}
      </div>

      {/* pinned tray */}
      <div style={{
        padding: '12px 16px 24px', background: SS.open,
        boxShadow: `0 -1px 0 ${SS.lineSoft}, 0 -10px 24px -18px rgba(66,26,49,0.25)`,
      }}>
        <Tray snap={snap} h={h} />
      </div>
    </div>
  );
}

// ─────────────── welcome takeover (dark) ───────────────
function WelcomeScreen({ onStart, onSkip }) {
  return (
    <div style={{ height: '100%', background: SS.plum, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', right: -38, top: 70, opacity: 0.12 }}><SMark size={250} color={SS.lav} /></div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '72px 26px 0', position: 'relative', zIndex: 1 }}>
        <ErinAvatar size={58} dark />
        <div style={{ marginTop: 22 }}>
          <span style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.62)' }}>{ERIN.copy.welcomeKicker}</span>
        </div>
        <H1 dark style={{ fontSize: 46, lineHeight: 1.02, marginTop: 10 }}>{ERIN.copy.welcomeHeadline}</H1>
        <div style={{ marginTop: 22, maxWidth: 320 }}>
          <ErinBubble dark>{ERIN.copy.welcomeBody}</ErinBubble>
        </div>
      </div>
      <div style={{ padding: '0 22px 40px', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button onClick={onStart} style={{
          fontFamily: SS.font, fontWeight: 400, fontSize: 16, background: SS.lav, color: SS.plum,
          border: 0, padding: '16px 22px', borderRadius: 9999, cursor: 'pointer',
          display: 'inline-flex', gap: 8, alignItems: 'center', justifyContent: 'center',
        }}>
          {ERIN.copy.welcomeCta}<Icon name="arrow-right" size={18} color="currentColor" />
        </button>
        <button onClick={onSkip} style={{
          fontFamily: SS.font, fontWeight: 300, fontSize: 14, background: 'transparent',
          color: 'rgba(255,255,255,0.72)', border: 0, padding: '6px', cursor: 'pointer',
        }}>{ERIN.copy.welcomeSkip}</button>
      </div>
    </div>
  );
}

// ─────────────── results screen (target-state) ───────────────
function ResultsView({ data, onBack }) {
  const prefs = [data.specialties && data.specialties[0] || 'ICU', data.radius || 'Within 100 mi', data.shift || 'Nights'];
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: SS.cloud }}>
      <div style={{ background: SS.plum, color: SS.open, padding: '56px 18px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -20, bottom: -30, opacity: 0.12 }}><SMark size={150} color={SS.lav} /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 1 }}>
          <IconButton name="arrow-left" onDark onClick={onBack} />
          <ErinAvatar size={30} dark />
          <div style={{ fontFamily: SS.font, fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>Erin’s picks</div>
        </div>
        <div style={{ marginTop: 16, position: 'relative', zIndex: 1 }}>
          <span style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>{ERIN.copy.resultsKicker}</span>
          <H2 dark style={{ fontSize: 27, marginTop: 7 }}>{ERIN.matchCount} matches for you</H2>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
            {prefs.map(p => (
              <span key={p} style={{ fontFamily: SS.font, fontSize: 12, color: SS.plum, background: SS.lav, padding: '4px 11px', borderRadius: 9999 }}>{p}</span>
            ))}
            <span style={{ fontFamily: SS.font, fontSize: 12, color: 'rgba(255,255,255,0.85)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.28)', padding: '4px 11px', borderRadius: 9999 }}>{(data.location || 'Denver, CO')}</span>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '2px 2px 4px' }}>
          <span style={{ width: 7, height: 7, borderRadius: 9999, background: SS.lav, flex: '0 0 auto' }} />
          <Subtext style={{ color: SS.fg3 }}>proactive ranking is target-state · phase 2</Subtext>
        </div>
        {SAMPLE_JOBS.map(j => <JobRow key={j.id} job={j} onOpen={() => {}} />)}
      </div>
    </div>
  );
}

// ─────────────── interactive hero ───────────────
function useErinFlow() {
  const steps = ERIN.steps;
  const [phase, setPhase] = useState('welcome');
  const [stepIdx, setStepIdx] = useState(0);
  const [data, setData] = useState({ specialties: [] });
  const [thread, setThread] = useState([]);
  const [multiSel, setMultiSel] = useState([]);
  const [locInput, setLocInput] = useState('');
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  function start() {
    setPhase('capture'); setStepIdx(0); setData({ specialties: [] });
    setThread([{ who: 'erin', text: fillWith(steps[0].ask, {}) }]);
  }
  function reset() {
    clearTimeout(timer.current);
    setPhase('welcome'); setStepIdx(0); setData({ specialties: [] }); setThread([]); setMultiSel([]); setLocInput('');
  }
  function commit(value) {
    const step = steps[stepIdx];
    const newData = { ...data, [step.field]: value };
    setData(newData); setMultiSel([]); setLocInput('');
    const youText = echoStr(step, value);
    const next = stepIdx + 1;
    if (next < steps.length) {
      setThread(t => [...t, { who: 'you', text: youText }, { who: 'erin', text: fillWith(steps[next].ask, newData) }]);
      setStepIdx(next);
    } else {
      setThread(t => [...t, { who: 'you', text: youText }, { who: 'erin', kind: 'typing' }]);
      setStepIdx(next); setPhase('finding');
      timer.current = setTimeout(() => {
        setThread(t => [
          ...t.filter(m => m.kind !== 'typing'),
          { who: 'erin', text: fillWith(ERIN.copy.findingLead, newData) },
          { who: 'erin', text: fillWith(ERIN.copy.matchIntro, newData) },
          { who: 'erin', kind: 'match' },
        ]);
        setPhase('match');
      }, 1700);
    }
  }
  function toggle(v) {
    setMultiSel(s => s.indexOf(v) >= 0 ? s.filter(x => x !== v) : [...s, v]);
  }
  const snap = { phase, stepIdx, data, thread, multiSel, locInput };
  const h = { onCommit: commit, onToggle: toggle, onLocInput: setLocInput, onReset: reset, onSeeAll: () => setPhase('results'), onBack: () => setPhase('match') };
  return { snap, h, start, reset };
}

function ErinMobile({ width = 402, height = 858 }) {
  const { snap, h, start } = useErinFlow();
  const dark = snap.phase === 'welcome' || snap.phase === 'results';
  let inner;
  if (snap.phase === 'welcome') inner = <WelcomeScreen onStart={start} onSkip={start} />;
  else if (snap.phase === 'results') inner = <ResultsView data={snap.data} onBack={h.onBack} />;
  else inner = <MobileChatView snap={snap} h={h} />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
      <IOSDevice width={width} height={height} dark={dark}>{inner}</IOSDevice>
    </div>
  );
}

// ─────────────── frozen snapshots (storyboard) ───────────────
function simulate(numAnswered) {
  const steps = ERIN.steps;
  const data = { specialties: [] };
  const thread = [];
  for (let i = 0; i <= numAnswered && i < steps.length; i++) {
    thread.push({ who: 'erin', text: fillWith(steps[i].ask, data) });
    if (i < numAnswered) {
      const s = steps[i]; const v = ERIN.canned[s.field]; data[s.field] = v;
      thread.push({ who: 'you', text: echoStr(s, v) });
    }
  }
  return { phase: 'capture', stepIdx: numAnswered, data, thread, multiSel: [], locInput: '' };
}
function frozenAt(key) {
  const fullData = { ...ERIN.canned, specialties: ERIN.canned.specialties };
  switch (key) {
    case 'welcome': return { phase: 'welcome' };
    case 'profession': return simulate(0);
    case 'specialty': return { ...simulate(1), multiSel: ['Intensive Care (ICU)'] };
    case 'experience': return simulate(2);
    case 'location': return simulate(3);
    case 'radius': return simulate(4);
    case 'shift': return simulate(5);
    case 'finding': {
      const s = simulate(7); s.phase = 'finding';
      s.thread = [...s.thread, { who: 'erin', kind: 'typing' }]; return s;
    }
    case 'match': {
      const s = simulate(7); s.phase = 'match';
      s.thread = [...s.thread,
        { who: 'erin', text: fillWith(ERIN.copy.findingLead, fullData) },
        { who: 'erin', text: fillWith(ERIN.copy.matchIntro, fullData) },
        { who: 'erin', kind: 'match' }];
      return s;
    }
    case 'results': return { phase: 'results', data: fullData };
    default: return simulate(0);
  }
}
const NOOP_H = { onCommit() {}, onToggle() {}, onLocInput() {}, onReset() {}, onSeeAll() {}, onBack() {} };

function StaticMobile({ frozenKey, scale = 0.52 }) {
  const snap = frozenAt(frozenKey);
  const W = 402, H = 824;
  let inner;
  if (snap.phase === 'welcome') inner = <WelcomeScreen onStart={() => {}} onSkip={() => {}} />;
  else if (snap.phase === 'results') inner = <ResultsView data={snap.data} onBack={() => {}} />;
  else inner = <MobileChatView snap={snap} h={NOOP_H} />;
  return (
    <div style={{ width: W * scale, height: H * scale, flex: '0 0 auto' }}>
      <div style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: 'top left', pointerEvents: 'none' }}>
        <IOSDevice width={W} height={H} dark={snap.phase === 'welcome' || snap.phase === 'results'}>{inner}</IOSDevice>
      </div>
    </div>
  );
}

Object.assign(window, {
  ErinMobile, StaticMobile, MobileChatView, WelcomeScreen, ResultsView, MatchCard,
  ErinAvatar, OptionChip, ProgressBar, ErinBubble, YouBubble, Tray, frozenAt, NOOP_H, useErinFlow,
  fillWith, echoStr, specialtyOptions,
});
