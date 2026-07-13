// Scrub Society — Job detail, rebuilt on the mobile kit primitives (window.*)
// Faithful re-skin of the live JobDetail.tsx layout. Composites below are built
// ONLY from kit primitives (Card, Chip, H*, Body, Subtext, Subhead, *Button, IconButton, PhotoFrame, Icon, TabBar).

const FACILITY_PHOTO = (window.__resources && window.__resources.facilityPhoto) || 'assets/photo-medical-team.jpg';

// ── Shared sample job (mirrors the live JobDetail field set) ──
const JOB = {
  title: 'ICU Travel RN',
  specialty: 'ICU / Critical Care',
  profession: 'Registered Nurse',
  jobType: 'Travel contract',
  facility: 'HCA HealthONE Presbyterian',
  city: 'Denver',
  state: 'Colorado',
  cityState: 'Denver, CO',
  start: 'Mar 24, 2026',
  weeks: 13,
  shift: 'Nights · 3×12',
  hours: 36,
  pay: 2840,
  payLabel: 'Estimated weekly pay',
  updated: 'Jun 2, 2026',
  agency: 'Aya Healthcare',
  featured: true,
  tags: ['Housing stipend', 'Weekly pay', 'Rapid hire'],
  breakdown: [
    { label: 'Taxable hourly (36 hrs)', value: '$31.00 /hr' },
    { label: 'Weekly housing stipend', value: '$924' },
    { label: 'Weekly M&I stipend', value: '$385' },
    { label: 'Travel reimbursement', value: '$500' },
  ],
  description:
    "A Level I trauma center is adding ICU travel RNs for a 13-week assignment. You'll work nights (three 12s) in a 24-bed adult medical ICU with 1:2 ratios, supported by a charge nurse and a rapid-response team. BLS and ACLS required; CCRN preferred but not required.",
  sections: ['Overview', 'Facility details', 'Accommodation', 'Cost of living', 'Transport & crime', 'Weather'],
};

// ─────────────── composites (kit primitives only) ───────────────

// Key-detail tile — composed from Subhead + plain value + Subtext, in a Card-equivalent surface.
function DetailTile({ icon, label, value, foot }) {
  return (
    <div style={{ background: SS.open, borderRadius: 18, padding: 14, boxShadow: `inset 0 0 0 1px ${SS.line}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6, color: SS.fg3 }}>
        <Icon name={icon} size={16} color="currentColor" />
        <Subhead style={{ fontSize: 10 }}>{label}</Subhead>
      </div>
      <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 17, letterSpacing: '-0.02em', color: SS.plum, lineHeight: 1.15 }}>{value}</div>
      {foot && <Subtext style={{ color: SS.fg3, display: 'block', marginTop: 2 }}>{foot}</Subtext>}
    </div>
  );
}

// Pay breakdown row.
function PayRow({ label, value, strong }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '7px 0' }}>
      <Body size={13} style={{ color: SS.fg2 }}>{label}</Body>
      <span style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 13, color: SS.plum, letterSpacing: strong ? '-0.01em' : 0 }}>{value}</span>
    </div>
  );
}

// Big pay figure.
function PayFigure({ amount, suffix, size = 38 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
      <span style={{ fontFamily: SS.font, fontWeight: 400, letterSpacing: '-0.03em', fontSize: size, color: SS.plum, lineHeight: 1 }}>
        ${amount.toLocaleString()}
      </span>
      <Subtext style={{ color: SS.fg3 }}>{suffix}</Subtext>
    </div>
  );
}

// Horizontal section tab strip (mirrors the live sticky tabs; scroll-to in the real app).
function SectionTabs({ tabs, active, onChange, dark }) {
  return (
    <div style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none', padding: '2px 0' }}>
      {tabs.map((t) => {
        const on = t === active;
        return (
          <button key={t} onClick={() => onChange(t)} style={{
            flex: '0 0 auto', border: 0, cursor: 'pointer', whiteSpace: 'nowrap',
            fontFamily: SS.font, fontWeight: 400, fontSize: 13, padding: '8px 14px', borderRadius: 9999,
            background: on ? (dark ? SS.lav : SS.plum) : 'transparent',
            color: on ? (dark ? SS.plum : SS.open) : (dark ? 'rgba(255,255,255,0.7)' : SS.fg2),
            boxShadow: on ? 'none' : `inset 0 0 0 1px ${dark ? 'rgba(255,255,255,0.22)' : SS.line}`,
            transition: 'all 120ms',
          }}>{t}</button>
        );
      })}
    </div>
  );
}

// Photo header with overlaid actions — uses PhotoFrame (signature corner) + IconButton(onDark).
function PhotoHeader({ radius = 22, height = 200, showBack, onBack, actions = ['bookmark', 'share'] }) {
  return (
    <div style={{ position: 'relative' }}>
      <PhotoFrame radius={radius} style={{ height }}>
        <img src={FACILITY_PHOTO} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(66,26,49,0.34) 0%, transparent 34%, transparent 60%, rgba(66,26,49,0.42) 100%)' }} />
      </PhotoFrame>
      {showBack && (
        <div style={{ position: 'absolute', top: 12, left: 12 }}>
          <IconButton name="arrow-left" onDark onClick={onBack} style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.32)' }} />
        </div>
      )}
      <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 8 }}>
        {actions.map((a) => (
          <IconButton key={a} name={a} onDark style={{ background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(10px)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.32)' }} />
        ))}
      </div>
      <div style={{ position: 'absolute', left: 14, bottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
        <Chip tone="cloud" icon="building">{JOB.facility}</Chip>
        {JOB.featured && <Chip tone="acc" icon="star">Featured</Chip>}
      </div>
    </div>
  );
}

// Pay summary card body (shared by mobile + desktop). `cta` toggles the inline apply block.
function PaySummaryBody({ cta }) {
  return (
    <React.Fragment>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, paddingBottom: 12, borderBottom: `1px solid ${SS.lineSoft}` }}>
        <Subhead style={{ fontSize: 10 }}>{JOB.payLabel}</Subhead>
        <Subtext style={{ color: SS.fg3 }}>updated {JOB.updated.toLowerCase()}</Subtext>
      </div>
      <div style={{ padding: '14px 0 4px' }}>
        <PayFigure amount={JOB.pay} suffix="/ week" />
        <Subtext style={{ color: SS.fg3, display: 'block', marginTop: 6 }}>est. {JOB.weeks}-week gross · ${(JOB.pay * JOB.weeks).toLocaleString()}</Subtext>
      </div>
      <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${SS.lineSoft}` }}>
        <Subhead style={{ fontSize: 10, display: 'block', marginBottom: 4 }}>Pay breakdown</Subhead>
        {JOB.breakdown.map((r) => <PayRow key={r.label} label={r.label} value={r.value} />)}
      </div>
      <div style={{ marginTop: 8, paddingTop: 12, borderTop: `1px solid ${SS.lineSoft}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <Body size={13} style={{ color: SS.fg2 }}>Shift</Body>
        <span style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 13, color: SS.plum }}>{JOB.shift} · {JOB.hours} hrs</span>
      </div>
      <Subtext style={{ color: SS.fg3, display: 'block', marginTop: 12, lineHeight: 1.5, textTransform: 'none' }}>
        Weekly total is for information only — it combines hourly wages with housing, meal &amp; incidental reimbursements.
      </Subtext>
      {cta && (
        <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {/* Apply uses the speech-bubble corner — PrimaryButton with the brand photo/bubble radius. */}
          <PrimaryButton full icon="check" style={{ borderRadius: '9999px 9999px 9999px 6px' }}>Apply now</PrimaryButton>
          <GhostButton style={{ justifyContent: 'center' }}>Request more info</GhostButton>
          <Subtext style={{ color: SS.fg3, textAlign: 'center', textTransform: 'none' }}>Not ready to apply? Tell us what you need — your recruiter follows up within one business day.</Subtext>
        </div>
      )}
    </React.Fragment>
  );
}

// "What you'll see upfront" reassurance list (brand functional-copy pattern).
function UpfrontList() {
  const items = ['Pay range & full breakdown', 'Facility name & address', 'Housing assistance options', 'License / compliance needs'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Subhead style={{ fontSize: 10 }}>What you'll see upfront</Subhead>
      {items.map((t) => (
        <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ width: 18, height: 18, borderRadius: 9999, background: SS.lav, color: SS.plum, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
            <Icon name="check" size={12} color="currentColor" />
          </span>
          <Body size={13} style={{ color: SS.fg1 }}>{t}</Body>
        </div>
      ))}
    </div>
  );
}

// Overview detail grid (shared).
function OverviewGrid({ cols = 2 }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 10 }}>
      <DetailTile icon="map-pin"     label="Location"        value={JOB.cityState} foot="Front Range" />
      <DetailTile icon="calendar"    label="Start date"      value={JOB.start} foot={`${JOB.weeks}-week contract`} />
      <DetailTile icon="stethoscope" label="Specialty"       value={JOB.specialty} />
      <DetailTile icon="user"        label="Profession"      value={JOB.profession} />
      <DetailTile icon="briefcase"   label="Job type"        value={JOB.jobType} />
      <DetailTile icon="calendar"    label="Weekly hours"    value={`${JOB.hours} hrs / wk`} foot={JOB.shift} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MOBILE — single scroll, bottom TabBar KEPT (per brief)
// ─────────────────────────────────────────────────────────────
function MobileJobDetail() {
  const [tab, setTab] = React.useState('Overview');
  const [navTab, setNavTab] = React.useState('jobs');
  return (
    <div style={{ height: '100%', position: 'relative', background: SS.cloud }}>
      <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 96 }}>
        {/* status-bar clearance + header */}
        <div style={{ paddingTop: 8 }}>
          <ScreenHeader title="Assignment" onBack={() => {}} right={<IconButton name="bookmark" />} />
        </div>

        {/* Photo header */}
        <div style={{ padding: '0 16px' }}>
          <PhotoHeader height={184} actions={['thumbs-up', 'bookmark', 'share']} />
        </div>

        {/* Title block */}
        <div style={{ padding: '16px 16px 0' }}>
          <H2 style={{ fontSize: 24 }}>{JOB.title} in {JOB.city}.</H2>
          <Body size={13} style={{ color: SS.fg2, marginTop: 4 }}>{JOB.facility} · {JOB.cityState}</Body>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
            <Chip tone="acc">{JOB.specialty.split(' ')[0]}</Chip>
            <Chip tone="tint">{JOB.weeks} weeks</Chip>
            <Chip tone="out">{JOB.shift}</Chip>
          </div>
        </div>

        {/* Pay summary card */}
        <div style={{ padding: '16px 16px 0' }}>
          <Card padding={16}>
            <PaySummaryBody />
          </Card>
        </div>

        {/* Section tabs */}
        <div style={{ padding: '18px 16px 0' }}>
          <SectionTabs tabs={JOB.sections} active={tab} onChange={setTab} />
        </div>

        {/* Overview */}
        <div style={{ padding: '14px 16px 0' }}>
          <OverviewGrid cols={2} />
        </div>

        <div style={{ padding: '14px 16px 0' }}>
          <Card padding={16}>
            <Subhead style={{ fontSize: 10, display: 'block', marginBottom: 8 }}>About this assignment</Subhead>
            <Body>{JOB.description}</Body>
          </Card>
        </div>

        {/* Facility details teaser */}
        <div style={{ padding: '12px 16px 0' }}>
          <Card padding={16} alt>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
              <span style={{ width: 36, height: 36, borderRadius: '12px 12px 12px 0', background: SS.dew, color: SS.plum, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
                <Icon name="building" size={18} color="currentColor" />
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 14, color: SS.plum }}>Facility details unlock on apply</div>
                <Body size={13} style={{ color: SS.fg2, marginTop: 2 }}>Exact address, unit profile, and parking are shared once you apply or request info.</Body>
              </div>
            </div>
          </Card>
        </div>

        {/* Apply CTA — inline (sits above the kept TabBar) */}
        <div style={{ padding: '18px 16px 0' }}>
          <Card padding={16} style={{ background: SS.plum, boxShadow: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <PayFigure amount={JOB.pay} suffix="/ wk" size={26} />
              </div>
              <div style={{ textAlign: 'right' }}>
                <Subtext style={{ color: 'rgba(255,255,255,0.7)' }}>via {JOB.agency}</Subtext>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <GhostButton onDark icon="message-circle" style={{ flex: 1, justifyContent: 'center' }}>Ask Erin</GhostButton>
              <PrimaryButton icon="check" style={{ flex: 1.5, background: SS.lav, color: SS.plum, borderRadius: '9999px 9999px 9999px 6px' }}>Apply now</PrimaryButton>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom tab bar — KEPT per brief */}
      <TabBar active={navTab} onChange={setNavTab} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DESKTOP — two-column, sticky pay card (mirrors live grid)
// ─────────────────────────────────────────────────────────────
function DesktopJobDetail() {
  const [tab, setTab] = React.useState('Overview');
  return (
    <div style={{ background: SS.cloud, minHeight: '100%', fontFamily: SS.font }}>
      {/* Site nav */}
      <div style={{ position: 'sticky', top: 0, zIndex: 5, background: 'rgba(255,255,255,0.86)', backdropFilter: 'blur(16px)', boxShadow: `inset 0 -1px 0 ${SS.line}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 28px', display: 'flex', alignItems: 'center', gap: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <SMark size={26} />
            <span style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 18, letterSpacing: '-0.03em', color: SS.plum }}>Scrub Society</span>
          </div>
          <div style={{ display: 'flex', gap: 22, marginLeft: 12 }}>
            {['Jobs', 'Society', 'Resources', 'Erin'].map((n, i) => (
              <span key={n} style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 14, color: i === 0 ? SS.plum : SS.fg2, letterSpacing: '-0.01em' }}>{n}</span>
            ))}
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: SS.font, fontSize: 14, color: SS.fg2 }}>Sign in</span>
            <PrimaryButton style={{ padding: '10px 18px', fontSize: 14 }}>Join the Society</PrimaryButton>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 28px 56px' }}>
        {/* Back / breadcrumb */}
        <button style={{ border: 0, background: 'transparent', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 7, color: SS.fg2, fontFamily: SS.font, fontSize: 14, padding: '4px 0', marginBottom: 16 }}>
          <Icon name="arrow-left" size={16} color="currentColor" /> Back to jobs
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.85fr) minmax(320px, 1fr)', gap: 28, alignItems: 'start' }}>
          {/* LEFT — main card */}
          <div style={{ background: SS.open, borderRadius: 24, boxShadow: `inset 0 0 0 1px ${SS.line}, ${'0 18px 36px -16px rgba(66,26,49,0.28)'}`, overflow: 'hidden' }}>
            {/* photo header */}
            <div style={{ padding: 16, paddingBottom: 0 }}>
              <PhotoHeader height={260} radius={20} showBack onBack={() => {}} actions={['thumbs-up', 'thumbs-down', 'bookmark', 'share', 'git-compare']} />
            </div>

            {/* section tabs */}
            <div style={{ padding: '18px 24px 0', borderBottom: `1px solid ${SS.lineSoft}` }}>
              <div style={{ paddingBottom: 12 }}>
                <SectionTabs tabs={JOB.sections} active={tab} onChange={setTab} />
              </div>
            </div>

            {/* overview content */}
            <div style={{ padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 6 }}>
                <H1 style={{ fontSize: 34 }}>{JOB.title}</H1>
                {JOB.featured && <Chip tone="acc" icon="star" style={{ flex: '0 0 auto', marginTop: 6 }}>Featured</Chip>}
              </div>
              <Body size={15} style={{ color: SS.fg2 }}>{JOB.facility} · {JOB.cityState}</Body>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginTop: 14 }}>
                {JOB.tags.map((t) => <Chip key={t} tone="out">{t}</Chip>)}
              </div>

              <div style={{ marginTop: 24 }}>
                <OverviewGrid cols={3} />
              </div>

              <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${SS.lineSoft}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <Icon name="briefcase" size={18} color={SS.fg3} />
                  <Subhead>Job description</Subhead>
                </div>
                <Body size={15}>{JOB.description}</Body>
              </div>

              <div style={{ marginTop: 24, paddingTop: 24, borderTop: `1px solid ${SS.lineSoft}` }}>
                <Card padding={20} alt>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <span style={{ width: 40, height: 40, borderRadius: '14px 14px 14px 0', background: SS.dew, color: SS.plum, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
                      <Icon name="building" size={20} color="currentColor" />
                    </span>
                    <div style={{ flex: 1 }}>
                      <H3 style={{ fontSize: 18 }}>Facility details unlock on apply</H3>
                      <Body size={14} style={{ color: SS.fg2, marginTop: 4 }}>Exact address, unit profile, ratios, and parking are shared the moment you apply or request more info — no gatekeeping.</Body>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* RIGHT — sticky pay card */}
          <div style={{ position: 'sticky', top: 88, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ background: SS.open, borderRadius: 20, padding: 22, boxShadow: `inset 0 0 0 1px ${SS.line}` }}>
              <PaySummaryBody cta />
            </div>
            <div style={{ background: SS.open, borderRadius: 20, padding: 22, boxShadow: `inset 0 0 0 1px ${SS.line}` }}>
              <UpfrontList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { JOB, MobileJobDetail, DesktopJobDetail, PhotoHeader, PaySummaryBody });
