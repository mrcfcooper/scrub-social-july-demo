// Jobs list — MOBILE (app). Rebuilt on Scrub Society clean primitives inside the
// iOS device frame. Keeps the bottom tab bar. Mirrors the live mobile jobs layout:
// header → search → job-type + filters row → filter chips → results count + sort →
// job rows → bottom tab bar.

function MobileJobRow({ job }) {
  const [saved, setSaved] = React.useState(job.id === 'j2');
  return (
    <article style={{
      background: SS.open, borderRadius: 20, padding: 16,
      boxShadow: `inset 0 0 0 1px ${SS.line}`, cursor: 'pointer',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{
          width: 46, height: 46, borderRadius: '14px 14px 14px 0',
          background: SS.dew, color: SS.plum, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: SS.font, fontWeight: 400, fontSize: 14, letterSpacing: '-0.02em', flex: '0 0 auto',
        }}>{initials(job.hospital)}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <H3 style={{ fontSize: 16 }}>{job.role}</H3>
          <Body size={13} style={{ color: SS.fg2, marginTop: 1 }}>{job.hospital} · {job.city}</Body>
        </div>
        <button onClick={(e) => { e.stopPropagation(); setSaved(!saved); }} aria-label="Save"
          style={{ background: 'transparent', border: 0, padding: 4, cursor: 'pointer', color: saved ? SS.plum : SS.fg3 }}>
          <Icon name={saved ? 'bookmark-fill' : 'bookmark'} size={20} color="currentColor" />
        </button>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <Chip tone="acc">{job.specialty}</Chip>
        <Chip tone="tint">{job.shift}</Chip>
        {job.compact && <Chip tone="cloud">Compact</Chip>}
        {job.tags.slice(0, 1).map((t) => <Chip key={t} tone="out">{t}</Chip>)}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 2 }}>
        <div>
          <span style={{ fontFamily: SS.font, fontWeight: 400, letterSpacing: '-0.02em', fontSize: 22, color: SS.plum }}>${job.pay.toLocaleString()}</span>
          <Subtext style={{ marginLeft: 6 }}>per wk · starts {job.start}</Subtext>
        </div>
        <Icon name="chevron-right" size={18} color={SS.fg3} />
      </div>
    </article>
  );
}

function MobileJobsApp() {
  const [tab, setTab] = React.useState('jobs');
  const [active, setActive] = React.useState('ICU');
  const filters = ['All', 'ICU', 'L&D', 'ER', 'MedSurg', 'Saved'];

  return (
    <IOSDevice keyboard={false}>
      <div style={{ background: SS.cloud, minHeight: '100%', position: 'relative', display: 'flex', flexDirection: 'column', paddingTop: 54 }}>
        {/* header */}
        <div style={{ padding: '4px 16px 12px' }}>
          <H2 style={{ fontSize: 24 }}>Your next shift starts here</H2>
          <Subtext>more routes. less roulette.</Subtext>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', position: 'relative', paddingBottom: 110 }}>
          {/* search pill */}
          <div style={{ padding: '0 16px' }}>
            <div style={{
              background: SS.open, borderRadius: 9999, padding: '11px 14px',
              display: 'flex', gap: 8, alignItems: 'center', boxShadow: `inset 0 0 0 1px ${SS.line}`,
            }}>
              <Icon name="search" size={18} color={SS.fg2} />
              <input defaultValue="13-week ICU in Denver" style={{
                border: 0, outline: 0, background: 'transparent', flex: 1,
                fontFamily: SS.font, fontWeight: 300, fontSize: 14, color: SS.plum,
              }} />
              <Icon name="x" size={16} color={SS.fg3} />
            </div>
          </div>

          {/* job type + filters row (2-up, like live mobile) */}
          <div style={{ padding: '10px 16px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[{ i: 'briefcase', t: 'Travel' }, { i: 'filter', t: 'Filters' }].map((b) => (
              <button key={b.t} style={{
                height: 46, borderRadius: 9999, border: 0, cursor: 'pointer', background: SS.open,
                boxShadow: `inset 0 0 0 1px ${SS.line}`, color: SS.plum,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                fontFamily: SS.font, fontWeight: 400, fontSize: 14,
              }}>
                <Icon name={b.i} size={17} color={SS.fg2} />{b.t}
                <Icon name="chevron-down" size={15} color={SS.fg3} />
              </button>
            ))}
          </div>

          {/* filter chips */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '12px 16px', scrollbarWidth: 'none' }}>
            {filters.map((f) => (
              <button key={f} onClick={() => setActive(f)} style={{
                border: 0, cursor: 'pointer', padding: '8px 14px', borderRadius: 9999,
                fontFamily: SS.font, fontWeight: 400, fontSize: 13,
                background: active === f ? SS.plum : SS.open,
                color: active === f ? SS.open : SS.plum,
                boxShadow: active === f ? 'none' : `inset 0 0 0 1px ${SS.line}`,
                whiteSpace: 'nowrap', flex: '0 0 auto',
              }}>{f}</button>
            ))}
          </div>

          {/* results count + sort */}
          <div style={{ padding: '0 16px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <Subhead>248 jobs</Subhead>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Subtext>sorted · best fit</Subtext>
              <Icon name="chevron-down" size={14} color={SS.fg3} />
            </span>
          </div>

          {/* job rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '8px 16px 16px' }}>
            {JOBS_DATA.slice(0, 4).map((j) => <MobileJobRow key={j.id} job={j} />)}
          </div>
        </div>

        {/* bottom tab bar — kept per spec */}
        <TabBar active={tab} onChange={setTab} />
      </div>
    </IOSDevice>
  );
}

Object.assign(window, { MobileJobsApp, MobileJobRow });
