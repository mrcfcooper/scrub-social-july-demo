// Jobs list — WEB (desktop). Rebuilt on Scrub Society clean primitives.
// Faithful to the live layout (controls panel → active filters → results bar → list),
// but composed only from kit primitives: H1/Body/Subhead/Subtext, Card, Chip,
// GhostButton/PrimaryButton, Icon, SMark, SiteNav.

// ── A single job result, built on the canonical job-card primitive ──
function WebJobCard({ job }) {
  const [saved, setSaved] = React.useState(job.id === 'j2');
  const [hover, setHover] = React.useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: SS.open, borderRadius: 20, padding: 20,
        boxShadow: hover
          ? '0 14px 30px -18px rgba(66,26,49,0.45), inset 0 0 0 1px rgba(66,26,49,0.12)'
          : `inset 0 0 0 1px ${SS.line}`,
        display: 'flex', gap: 18, alignItems: 'flex-start', cursor: 'pointer',
        transition: 'box-shadow 120ms var(--ss-ease-standard, ease), transform 120ms',
        transform: hover ? 'translateY(-2px)' : 'none',
      }}
    >
      {/* facility thumbnail — speech-bubble corner */}
      <div style={{
        width: 72, height: 72, borderRadius: '20px 20px 20px 0',
        background: SS.dew, color: SS.plum, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: SS.font, fontWeight: 400, fontSize: 20, letterSpacing: '-0.02em', flex: '0 0 auto',
      }}>{initials(job.hospital)}</div>

      {/* center column */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <H3 style={{ fontSize: 19 }}>{job.role}</H3>
          {job.verified && <Chip tone="sky" icon="check" style={{ fontSize: 11, padding: '3px 9px' }}>Verified partner</Chip>}
        </div>
        <Body size={14} style={{ color: SS.fg2, marginTop: 3 }}>
          {job.hospital} · {job.city} · {job.weeks}-week assignment · starts {job.start}
        </Body>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
          <Chip tone="acc">{job.specialty}</Chip>
          <Chip tone="tint">{job.shift}</Chip>
          {job.compact && <Chip tone="cloud">Compact license</Chip>}
          {job.tags.map((t) => <Chip key={t} tone="out">{t}</Chip>)}
        </div>
      </div>

      {/* right column — pay + save */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flex: '0 0 auto' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 26, letterSpacing: '-0.02em', color: SS.plum, lineHeight: 1 }}>
            ${job.pay.toLocaleString()}
          </div>
          <Subtext style={{ display: 'block', marginTop: 4 }}>per wk · through {job.agency}</Subtext>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
          aria-label={saved ? 'Saved' : 'Save job'}
          style={{
            width: 40, height: 40, borderRadius: 9999, border: 0, cursor: 'pointer',
            background: saved ? SS.lav : SS.open, color: SS.plum,
            boxShadow: saved ? 'none' : `inset 0 0 0 1px ${SS.line}`,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
          }}
        >
          <Icon name={saved ? 'bookmark-fill' : 'bookmark'} size={18} color="currentColor" />
        </button>
      </div>
    </article>
  );
}

// ── A control button styled like a GhostButton but with a trailing chevron ──
function ControlButton({ icon, children, chevron = true, accent = false, badge }) {
  return (
    <button style={{
      position: 'relative',
      fontFamily: SS.font, fontWeight: 400, fontSize: 15,
      height: 50, padding: '0 18px', borderRadius: 9999, cursor: 'pointer',
      background: SS.open, color: SS.plum, border: 0,
      boxShadow: `inset 0 0 0 1.5px ${accent ? SS.lav : SS.line}`,
      display: 'inline-flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
    }}>
      {icon && <Icon name={icon} size={18} color={accent ? SS.plum : SS.fg2} />}
      {children}
      {chevron && <Icon name="chevron-down" size={16} color={SS.fg3} />}
      {badge != null && (
        <span style={{
          position: 'absolute', top: -6, right: -6, minWidth: 22, height: 22, padding: '0 6px',
          borderRadius: 9999, background: SS.plum, color: SS.open,
          fontFamily: SS.font, fontSize: 12, fontWeight: 400,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        }}>{badge}</span>
      )}
    </button>
  );
}

// ── Segmented view toggle (grid / list / map) ──
function ViewToggle({ value }) {
  const modes = [
    { id: 'grid', icon: 'briefcase' },
    { id: 'list', icon: 'sliders' },
    { id: 'map', icon: 'map-pin' },
  ];
  return (
    <div style={{ display: 'inline-flex', background: SS.open, borderRadius: 9999, padding: 4, boxShadow: `inset 0 0 0 1.5px ${SS.line}` }}>
      {modes.map((m) => {
        const on = m.id === value;
        return (
          <span key={m.id} title={`${m.id} view`} style={{
            width: 42, height: 42, borderRadius: 9999, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: on ? SS.plum : 'transparent', color: on ? SS.open : SS.fg3,
          }}>
            <Icon name={m.icon} size={18} color="currentColor" />
          </span>
        );
      })}
    </div>
  );
}

function WebJobsList() {
  const total = 2400;
  const shown = 248;
  return (
    <div style={{ background: SS.cloud, minHeight: '100%' }}>
      <div style={{ background: SS.open }}>
        <SiteNav />
      </div>

      {/* CONTROLS PANEL */}
      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '32px 40px 0' }}>
        <H1 style={{ fontSize: 40 }}>Your next shift starts here<span style={{ color: SS.lav }}>.</span></H1>
        <Body size={16} style={{ color: SS.fg2, marginTop: 8, maxWidth: 620 }}>
          Browse travel and per diem opportunities for nurses and allied health professionals.
        </Body>

        {/* search + controls card */}
        <div style={{ background: SS.open, borderRadius: 24, padding: 18, boxShadow: `inset 0 0 0 1px ${SS.line}`, marginTop: 24 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{
              flex: 1, display: 'flex', alignItems: 'center', gap: 10, height: 50, padding: '0 18px',
              borderRadius: 9999, background: SS.cloud, boxShadow: `inset 0 0 0 1px ${SS.line}`,
            }}>
              <Icon name="search" size={20} color={SS.fg2} />
              <input
                defaultValue="13-week ICU"
                placeholder="Search by location, profession, pay…"
                style={{ flex: 1, border: 0, outline: 0, background: 'transparent', fontFamily: SS.font, fontWeight: 300, fontSize: 15, color: SS.plum }}
              />
            </div>
            <ControlButton icon="briefcase">Travel</ControlButton>
            <ControlButton icon="filter">Filters</ControlButton>
            <ControlButton icon="compass" accent>Explore</ControlButton>
          </div>
        </div>

        {/* active filter summary */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginTop: 18 }}>
          <Subhead>Active filters</Subhead>
          <Chip tone="acc">ICU</Chip>
          <Chip tone="tint">Nights · 3×12</Chip>
          <Chip tone="cloud">Compact license</Chip>
          <Chip tone="out">Housing stipend</Chip>
          <GhostButton icon="x" style={{ padding: '8px 14px', fontSize: 13, marginLeft: 4, whiteSpace: 'nowrap' }}>Clear all</GhostButton>
        </div>
      </section>

      {/* RESULTS PANEL */}
      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '24px 40px 56px' }}>
        {/* results bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
          padding: '14px 0', borderBottom: `1px solid ${SS.line}`, marginBottom: 20, flexWrap: 'wrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ width: 8, height: 8, borderRadius: 9999, background: SS.lav, alignSelf: 'center' }} />
            <span style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 16, color: SS.plum }}>
              Showing <strong style={{ fontWeight: 400 }}>{shown}</strong> jobs
            </span>
            <Subtext>of {total.toLocaleString()} total</Subtext>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <ControlButton icon="sliders">Sort: Best fit</ControlButton>
            <ControlButton icon="briefcase" chevron={false} badge={2}>Compare</ControlButton>
            <ViewToggle value="list" />
          </div>
        </div>

        {/* job list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {JOBS_DATA.map((j) => <WebJobCard key={j.id} job={j} />)}
        </div>

        {/* pagination sentinel */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 28 }}>
          <GhostButton icon="arrow-right" style={{ flexDirection: 'row-reverse' }}>Load more assignments</GhostButton>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { WebJobsList, WebJobCard, ControlButton, ViewToggle });
