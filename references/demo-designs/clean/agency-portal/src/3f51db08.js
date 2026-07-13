// ── Assignment tracking panel (right) ────────────────────────────────────────
const { STAGES } = window.PORTAL_DATA;

function PanelCard({ title, icon, children, action }) {
  return (
    <div style={{ background: P.open, borderRadius: 16, boxShadow: `inset 0 0 0 1px ${P.line}`, padding: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 11 }}>
        {icon && <Ico name={icon} size={15} color={P.fg2} />}
        <span style={{ fontFamily: P.font, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: P.fg2 }}>{title}</span>
        <span style={{ flex: 1 }} />
        {action}
      </div>
      {children}
    </div>
  );
}

function Field({ icon, label, value, strong }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 9, padding: '4px 0' }}>
      <Ico name={icon} size={15} color={P.fg3} style={{ marginTop: 2 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: P.font, fontSize: 10.5, color: P.fg3, textTransform: 'lowercase' }}>{label}</div>
        <div style={{ fontFamily: P.font, fontWeight: strong ? 400 : 300, fontSize: 13, color: P.fg1, lineHeight: 1.35 }}>{value}</div>
      </div>
    </div>
  );
}

function StageTracker({ stage }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 10 }}>
        {STAGES.map((s, i) => {
          const done = i < stage, cur = i === stage;
          return (
            <React.Fragment key={s}>
              <div style={{
                width: 18, height: 18, borderRadius: 9999, flex: '0 0 auto',
                background: done ? P.plum : cur ? P.lav : P.canvas,
                boxShadow: cur ? `inset 0 0 0 2px ${P.plum}` : done ? 'none' : `inset 0 0 0 1px ${P.line}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {done && <Ico name="check" size={11} color="#fff" stroke={2.5} />}
                {cur && <span style={{ width: 6, height: 6, borderRadius: 9999, background: P.plum }} />}
              </div>
              {i < STAGES.length - 1 && <div style={{ flex: 1, height: 2, background: i < stage ? P.plum : P.line }} />}
            </React.Fragment>
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: P.font, fontSize: 11, fontWeight: 300, color: P.fg3 }}>{STAGES[0]}</span>
        <span style={{ fontFamily: P.font, fontSize: 12.5, fontWeight: 400, color: P.plum }}>{STAGES[stage]}</span>
        <span style={{ fontFamily: P.font, fontSize: 11, fontWeight: 300, color: P.fg3 }}>{STAGES[STAGES.length - 1]}</span>
      </div>
    </div>
  );
}

function CredRow({ c }) {
  const map = {
    ok: { icon: 'shield-check', fg: '#2E7D5B', bg: '#E4F3EC', label: 'verified' },
    pending: { icon: 'clock', fg: P.alert, bg: P.alertBg, label: 'pending' },
    missing: { icon: 'alert-triangle', fg: P.fg3, bg: P.canvas, label: 'missing' },
  }[c.status];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '6px 0' }}>
      <span style={{ width: 24, height: 24, borderRadius: 8, background: map.bg, color: map.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
        <Ico name={map.icon} size={14} color={map.fg} stroke={2} />
      </span>
      <span style={{ flex: 1, fontFamily: P.font, fontWeight: 300, fontSize: 13, color: P.fg1 }}>{c.name}</span>
      <span style={{ fontFamily: P.font, fontSize: 11, color: map.fg, textTransform: 'lowercase' }}>{map.label}</span>
    </div>
  );
}

function QuickAction({ icon, label, primary, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 9, width: '100%', border: 0, cursor: 'pointer',
      background: primary ? P.plum : P.open, color: primary ? P.open : P.fg1,
      boxShadow: primary ? 'none' : `inset 0 0 0 1px ${P.line}`,
      padding: '10px 13px', borderRadius: 11, fontFamily: P.font, fontWeight: 400, fontSize: 13, textAlign: 'left',
      transition: 'all 120ms',
    }}>
      <Ico name={icon} size={16} color={primary ? '#fff' : P.fg2} />
      <span style={{ flex: 1 }}>{label}</span>
      <Ico name="chevron-right" size={15} color={primary ? 'rgba(255,255,255,0.7)' : P.fg3} />
    </button>
  );
}

function TrackingPanel({ conv, onClose }) {
  const j = conv.job;
  const credOk = conv.creds.filter(c => c.status === 'ok').length;
  return (
    <aside style={{
      width: 340, flex: '0 0 340px', background: P.canvas, borderLeft: `1px solid ${P.line}`,
      height: '100%', overflowY: 'auto',
    }}>
      <div style={{ padding: '14px 16px 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: P.font, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: P.fg2 }}>Assignment</span>
        <span style={{ flex: 1 }} />
        <button onClick={onClose} style={{ ...iconBtn(false), width: 30, height: 30 }} title="Hide panel"><Ico name="x" size={16} /></button>
      </div>

      <div style={{ padding: '0 16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Candidate summary */}
        <PanelCard title="Candidate" icon="user" action={<button style={{ ...textLinkBtn, fontSize: 12 }}>Profile</button>}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 8 }}>
            <Avatar initials={conv.initials} tone={conv.tone} size={46} />
            <div>
              <div style={{ fontFamily: P.font, fontWeight: 400, fontSize: 15, color: P.fg1, letterSpacing: '-0.01em' }}>{conv.name}</div>
              <div style={{ fontFamily: P.font, fontWeight: 300, fontSize: 12, color: P.fg2 }}>{conv.specialty} · {conv.years}</div>
            </div>
          </div>
          <div style={{ height: 1, background: P.lineSoft, margin: '4px 0 6px' }} />
          <Field icon="map-pin" label="home base" value={conv.home} />
          <Field icon="graduation" label="license" value={conv.license} strong />
        </PanelCard>

        {/* Job applied for */}
        <PanelCard title="Applied for" icon="briefcase" action={<span style={{ fontFamily: P.font, fontSize: 11, color: P.fg3 }}>{j.ref}</span>}>
          <div style={{ fontFamily: P.font, fontWeight: 400, fontSize: 14, color: P.fg1, letterSpacing: '-0.01em', lineHeight: 1.3 }}>{j.title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '3px 0 10px' }}>
            <Ico name="building" size={13} color={P.fg3} />
            <span style={{ fontFamily: P.font, fontWeight: 300, fontSize: 12.5, color: P.fg2 }}>{j.facility} · {j.location}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
            <Field icon="dollar" label="pay" value={j.pay} strong />
            <Field icon="clock" label="shift" value={j.shift} />
            <Field icon="calendar" label="start" value={j.start} />
            <Field icon="plane" label="length" value={j.length} />
          </div>
        </PanelCard>

        {/* Stage tracker */}
        <PanelCard title="Pipeline stage" icon="file-check">
          <StageTracker stage={conv.stage} />
        </PanelCard>

        {/* Credentials */}
        <PanelCard title="Credentials" icon="shield-check" action={<span style={{ fontFamily: P.font, fontSize: 11.5, color: P.fg3 }}>{credOk}/{conv.creds.length} ready</span>}>
          {conv.creds.map((c, i) => <CredRow key={i} c={c} />)}
        </PanelCard>

        {/* Quick actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <QuickAction icon="file-check" label="Submit candidate" primary />
          <QuickAction icon="calendar-clock" label="Schedule a call" />
          <QuickAction icon="paperclip" label="Request documents" />
        </div>
      </div>
    </aside>
  );
}

window.TrackingPanel = TrackingPanel;
