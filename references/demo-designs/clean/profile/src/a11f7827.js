// Scrub Society — Profile frames: desktop (browser) + mobile (iOS).
// Composes profile-parts.jsx pieces into the two-frame deliverable.

// ─────────────── section tabs (the live underline tabs — no kit primitive) ───────────────
function SectionTabs({ active, onChange, variant }) {
  if (variant === 'mobile') {
    return (
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '4px 16px 2px', scrollbarWidth: 'none' }}>
        {TABS.map(t => {
          const on = t.id === active;
          return (
            <button key={t.id} onClick={() => onChange(t.id)} style={{
              border: 0, cursor: 'pointer', padding: '8px 14px', borderRadius: 9999,
              fontFamily: SS.font, fontWeight: 400, fontSize: 13, whiteSpace: 'nowrap', flex: '0 0 auto',
              background: on ? SS.plum : SS.open, color: on ? SS.open : SS.plum,
              boxShadow: on ? 'none' : `inset 0 0 0 1px ${SS.line}`,
              display: 'inline-flex', alignItems: 'center', gap: 7,
            }}>
              {t.label}
              <span style={{
                fontSize: 11, lineHeight: 1, padding: '2px 6px', borderRadius: 9999,
                background: on ? 'rgba(255,255,255,0.22)' : SS.dew, color: on ? SS.open : SS.plum,
              }}>{t.count}</span>
            </button>
          );
        })}
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', gap: 4, padding: '0 8px', borderBottom: `1px solid ${SS.line}`, overflowX: 'auto', scrollbarWidth: 'none' }}>
      {TABS.map(t => {
        const on = t.id === active;
        return (
          <button key={t.id} onClick={() => onChange(t.id)} style={{
            border: 0, background: 'transparent', cursor: 'pointer',
            padding: '14px 16px', marginBottom: -1, whiteSpace: 'nowrap',
            borderBottom: `2px solid ${on ? SS.plum : 'transparent'}`,
            color: on ? SS.plum : SS.fg3, fontFamily: SS.font, fontWeight: 400, fontSize: 14,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            {t.label}
            <span style={{
              fontSize: 11, lineHeight: 1, padding: '2px 7px', borderRadius: 9999,
              background: on ? SS.lav : SS.cloud, color: SS.plum,
            }}>{t.count}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─────────────── shared header content ───────────────
function HeaderActions({ stacked }) {
  return (
    <div style={{ display: 'flex', gap: 8, flexDirection: stacked ? 'column' : 'row' }}>
      <GhostButton icon="pencil" style={{ padding: '10px 16px', fontSize: 14, justifyContent: 'center' }}>Edit profile</GhostButton>
      <GhostButton icon="download" style={{ padding: '10px 16px', fontSize: 14, justifyContent: 'center' }}>PDF</GhostButton>
    </div>
  );
}
function ContactGrid({ cols }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`, gap: 16 }}>
      <ContactItem label="Email" value={PROFILE.email} icon="mail" editable />
      <ContactItem label="Mobile" value={PROFILE.mobile} icon="phone" editable />
      <ContactItem label="Date of birth" value={PROFILE.dob} icon="cake" />
      <ContactItem label="Shift preference" value={PROFILE.shift} icon="moon" />
      <ContactItem label="Shift duration" value={PROFILE.duration} icon="clock" />
      <ContactItem label="Address" value={PROFILE.address.join(' · ')} icon="pin" />
    </div>
  );
}

// ─────────────── DESKTOP ───────────────
function ProfileWeb() {
  const [tab, setTab] = React.useState('licenses');
  const t = TABS.find(x => x.id === tab);
  const blurbs = {
    licenses: 'Manage your professional credentials',
    certifications: 'Keep certifications current',
    specialties: 'Profession and specialty pairings',
    work: 'Your assignments and staff experience',
    education: 'Degrees and coursework',
    references: 'Colleagues who can vouch for you',
  };
  const addLabels = {
    licenses: 'Add license', certifications: 'Add certification', specialties: 'Add specialty',
    work: 'Add work history', education: 'Add education', references: 'Add reference',
  };
  return (
    <div style={{ background: SS.cloud, minHeight: '100%', fontFamily: SS.font }}>
      {/* app top bar */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 28px', background: SS.open, borderBottom: `1px solid ${SS.line}`,
        position: 'sticky', top: 0, zIndex: 5,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <SMark size={24} />
            <span style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 18, letterSpacing: '-0.02em', color: SS.plum }}>Scrub Society</span>
          </div>
          <nav style={{ display: 'flex', gap: 22 }}>
            {[['Home', 0], ['Jobs', 0], ['Erin', 0], ['Society', 0], ['Profile', 1]].map(([l, on]) => (
              <a key={l} href="#" style={{ textDecoration: 'none', fontFamily: SS.font, fontSize: 14, fontWeight: 400, color: on ? SS.plum : SS.fg2, paddingBottom: 2, borderBottom: on ? `2px solid ${SS.plum}` : '2px solid transparent' }}>{l}</a>
            ))}
          </nav>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <IconButton name="bell" />
          <Avatar size={36} fs={14} />
        </div>
      </header>

      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '24px 28px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2.3fr 1fr', gap: 20, alignItems: 'start' }}>
          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* header card */}
            <Card style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ padding: 24 }}>
                <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                  <Avatar size={76} fs={28} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <H2 style={{ fontSize: 26 }}>{PROFILE.first} {PROFILE.last}</H2>
                    <Body size={14} style={{ color: SS.fg2, marginTop: 2 }}>{PROFILE.title} · {PROFILE.years} years experience</Body>
                    <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap' }}>
                      <Chip tone="acc">ICU</Chip>
                      <Chip tone="tint">Compact license</Chip>
                      <Chip tone="sky">Available Mar 2026</Chip>
                    </div>
                  </div>
                  <HeaderActions />
                </div>
                <div style={{ marginTop: 18, maxWidth: 360 }}>
                  <CompletionMeter pct={100} />
                </div>
              </div>
              <div style={{ padding: 24, borderTop: `1px solid ${SS.line}`, background: SS.open }}>
                <ContactGrid cols={3} />
              </div>
            </Card>

            {/* tabbed credentials */}
            <Card style={{ padding: 0, overflow: 'hidden' }}>
              <SectionTabs active={tab} onChange={setTab} variant="web" />
              <SectionHead title={t.label} count={t.count} blurb={blurbs[tab]} addLabel={addLabels[tab]} />
              <TabBody id={tab} />
            </Card>
          </div>

          {/* RIGHT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 86 }}>
            <Card style={{ padding: 20 }}>
              <H3 style={{ fontSize: 16, marginBottom: 14 }}>Account statistics</H3>
              <StatList />
            </Card>
            <ResumeCard />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────── MOBILE ───────────────
function ProfileMobileBody() {
  const [tab, setTab] = React.useState('licenses');
  const t = TABS.find(x => x.id === tab);
  const addLabels = {
    licenses: 'Add', certifications: 'Add', specialties: 'Add',
    work: 'Add', education: 'Add', references: 'Add',
  };
  return (
    <div style={{ paddingBottom: 110 }}>
      {/* header card */}
      <div style={{ padding: '0 16px' }}>
        <Card style={{ padding: 18 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <Avatar size={60} fs={22} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <H3 style={{ fontSize: 19 }}>{PROFILE.first} {PROFILE.last}</H3>
              <Body size={13} style={{ color: SS.fg2 }}>{PROFILE.title} · {PROFILE.years} yrs</Body>
              <div style={{ display: 'flex', gap: 6, marginTop: 7, flexWrap: 'wrap' }}>
                <Chip tone="acc" style={{ fontSize: 11, padding: '3px 9px' }}>ICU</Chip>
                <Chip tone="tint" style={{ fontSize: 11, padding: '3px 9px' }}>Compact</Chip>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 16 }}><CompletionMeter pct={100} /></div>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <GhostButton icon="pencil" style={{ flex: 1, justifyContent: 'center', padding: '10px 0', fontSize: 13 }}>Edit profile</GhostButton>
            <GhostButton icon="download" style={{ flex: 1, justifyContent: 'center', padding: '10px 0', fontSize: 13 }}>PDF</GhostButton>
          </div>
        </Card>
      </div>

      {/* contact */}
      <div style={{ padding: '14px 16px 0' }}>
        <Card style={{ padding: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <ContactItem label="Email" value={PROFILE.email} icon="mail" editable />
            <ContactItem label="Mobile" value={PROFILE.mobile} icon="phone" editable />
            <ContactItem label="Shift" value={PROFILE.shift} icon="moon" />
            <ContactItem label="Duration" value={PROFILE.duration} icon="clock" />
          </div>
          <div style={{ marginTop: 14 }}>
            <ContactItem label="Address" value={PROFILE.address.join(', ')} icon="pin" />
          </div>
        </Card>
      </div>

      {/* stats */}
      <div style={{ padding: '14px 16px 0' }}>
        <Card style={{ padding: 16 }}>
          <H3 style={{ fontSize: 15, marginBottom: 12 }}>Account statistics</H3>
          <StatList />
        </Card>
      </div>

      {/* credentials */}
      <div style={{ padding: '18px 16px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Subhead>Credentials</Subhead>
        <GhostButton icon="plus" style={{ padding: '7px 13px', fontSize: 13 }}>{addLabels[tab]}</GhostButton>
      </div>
      <SectionTabs active={tab} onChange={setTab} variant="mobile" />
      <Body size={13} style={{ color: SS.fg2, padding: '8px 16px 0' }}>{t.count} {t.label.toLowerCase()}</Body>
      {/* CardGrid auto-fills to a single column at phone width */}
      <TabBody id={tab} />

      {/* resume */}
      <div style={{ padding: '6px 16px 0' }}><ResumeCard /></div>
    </div>
  );
}

Object.assign(window, { SectionTabs, ProfileWeb, ProfileMobileBody });
