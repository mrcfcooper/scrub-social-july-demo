/* Facility Intel — Mobile (390) */
function MStatusBar() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 24px 4px', color: T.open }}>
      <span style={{ fontFamily: T.font, fontWeight: 400, fontSize: 15 }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="18" height="11" viewBox="0 0 18 11" fill={T.open}><rect x="0" y="6" width="3" height="5" rx="1"/><rect x="5" y="3.5" width="3" height="7.5" rx="1"/><rect x="10" y="1.5" width="3" height="9.5" rx="1"/><rect x="15" y="0" width="3" height="11" rx="1" opacity="0.4"/></svg>
        <svg width="16" height="11" viewBox="0 0 16 11" fill={T.open}><path d="M8 2.2C10 2.2 11.8 3 13.1 4.3l1-1A8 8 0 0 0 8 .7 8 8 0 0 0 1.9 3.3l1 1A6.6 6.6 0 0 1 8 2.2Z"/><path d="M8 5.1c1.1 0 2.2.5 3 1.2l1 1A5 5 0 0 0 8 4a5 5 0 0 0-4 3.3l1 1c.8-.7 1.9-1.2 3-1.2Z"/><circle cx="8" cy="9.2" r="1.5"/></svg>
        <svg width="24" height="11" viewBox="0 0 24 11"><rect x="0.5" y="0.5" width="20" height="10" rx="2.5" fill="none" stroke={T.open} opacity="0.5"/><rect x="2" y="2" width="15" height="7" rx="1.5" fill={T.open}/><rect x="21.5" y="3.5" width="1.5" height="4" rx="0.75" fill={T.open} opacity="0.5"/></svg>
      </div>
    </div>
  );
}

function MHero() {
  const F = window.FAC;
  return (
    <div style={{ background: T.plum, color: T.open, padding: '0 16px 22px' }}>
      <MStatusBar />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 0 12px' }}>
        <span style={{ width: 36, height: 36, borderRadius: '9999px 9999px 9999px 0', background: 'rgba(255,255,255,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic name="arrow-left" size={18} color={T.open} /></span>
        <span style={{ fontFamily: T.font, fontWeight: 400, fontSize: 15, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.82)' }}>Facility intel</span>
        <span style={{ width: 36, height: 36, borderRadius: '9999px 9999px 9999px 0', background: 'rgba(255,255,255,0.10)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic name="bookmark" size={17} color={T.open} /></span>
      </div>

      <PhotoFrame variant="BL" radius={22} style={{ width: '100%', height: 168, background: 'rgba(255,255,255,0.07)' }}>
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'rgba(255,255,255,0.55)' }}>
          <Ic name="building" size={28} color="rgba(255,255,255,0.5)" />
          <span style={{ fontFamily: T.font, fontWeight: 400, textTransform: 'lowercase', fontSize: 12 }}>facility photo</span>
        </div>
      </PhotoFrame>

      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: T.font, fontSize: 12, color: 'rgba(255,255,255,0.78)', marginTop: 14 }}><Ic name="check-circle" size={14} color={T.lav} /> Verified · {F.system}</span>
      <h1 style={{ fontFamily: T.font, fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.04, fontSize: 27, color: T.open, margin: '8px 0 0' }}>{F.name}</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '10px 0 0', flexWrap: 'wrap', color: 'rgba(255,255,255,0.82)', fontFamily: T.font, fontWeight: 300, fontSize: 13.5 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Ic name="map-pin" size={15} color={T.lav} />{F.city}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><Ic name="building" size={15} color={T.lav} />{F.type}</span>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', margin: '14px 0 0' }}>
        {F.units.slice(0, 4).map(u => (
          <span key={u} style={{ fontFamily: T.font, fontWeight: 400, fontSize: 12, padding: '4px 11px', borderRadius: 9999, background: 'rgba(255,255,255,0.10)', color: T.open, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.16)' }}>{u}</span>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '20px 0 0', padding: 16, borderRadius: 20, background: 'rgba(255,255,255,0.06)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12)' }}>
        <ScoreRing value={F.score} size={92} dark />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
          <span style={{ fontFamily: T.font, fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>Scrub Society score</span>
          <Stars value={F.overall} size={16} />
          <span style={{ fontFamily: T.font, fontWeight: 300, fontSize: 12.5, color: 'rgba(255,255,255,0.84)' }}>{F.overall} avg · {F.reviewCount} reviews · {F.diaryCount} diaries</span>
          <TargetBadge style={{ background: 'rgba(187,175,239,0.22)', color: T.lav, alignSelf: 'flex-start' }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginTop: 12 }}>
        {F.metaTiles.map(m => <MetaTile key={m.label} {...m} dark />)}
      </div>
    </div>
  );
}

function MSection({ eyebrow, title, sub, badge, children }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 12 }}>
        <div>
          {eyebrow && <div style={{ fontFamily: T.font, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 10.5, color: T.fg2, marginBottom: 6 }}>{eyebrow}</div>}
          <h2 style={{ fontFamily: T.font, fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.1, fontSize: 21, color: T.fg1, margin: 0 }}>{title}</h2>
        </div>
        {badge}
      </div>
      {sub && <p style={{ fontFamily: T.font, fontWeight: 300, fontSize: 13.5, lineHeight: 1.5, color: T.fg2, margin: '-4px 0 12px' }}>{sub}</p>}
      {children}
    </div>
  );
}

function MTabBar() {
  const tabs = [['home', 'Home'], ['search', 'Jobs'], ['sparkles', 'Erin'], ['users', 'Society'], ['user', 'Profile']];
  return (
    <div style={{ padding: '10px 12px 22px', background: T.open, borderTop: `1px solid ${T.line}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4 }}>
        {tabs.map(([ic, label], i) => {
          const on = i === 1;
          return (
            <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '6px 0', borderRadius: 16, background: on ? 'rgba(187,175,239,0.45)' : 'transparent' }}>
              <Icon name={ic} size={20} color={on ? T.plum : T.fg3} />
              <span style={{ fontFamily: T.font, fontWeight: 400, fontSize: 10, color: on ? T.plum : T.fg3 }}>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MobileFacilityIntel() {
  const F = window.FAC;
  return (
    <div style={{ width: 414, background: '#1a0f16', borderRadius: 52, padding: 12, boxShadow: '0 30px 70px -20px rgba(66,26,49,0.5)' }}>
      <div style={{ width: 390, borderRadius: 40, overflow: 'hidden', background: T.open, fontFamily: T.font }}>
        <MHero />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22, padding: '20px 16px 8px' }}>
          {/* Ratings */}
          <MSection eyebrow="Community signal" title="Ratings breakdown" badge={<TargetBadge />}>
            <div style={{ borderRadius: 18, background: T.open, boxShadow: `inset 0 0 0 1px ${T.line}`, padding: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <div style={{ fontFamily: T.font, fontWeight: 400, letterSpacing: '-0.04em', fontSize: 44, lineHeight: 1, color: T.plum }}>{F.overall}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <Stars value={F.overall} size={17} />
                  <span style={{ fontFamily: T.font, fontWeight: 400, textTransform: 'lowercase', fontSize: 12, color: T.fg2 }}>from {F.reviewCount} traveler reviews</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {F.ratings.map(r => <BreakdownBar key={r.label} {...r} />)}
              </div>
            </div>
          </MSection>

          {/* Culture */}
          <MSection eyebrow="What travelers flag" title="Unit culture">
            <div style={{ borderRadius: 18, background: T.open, boxShadow: `inset 0 0 0 1px ${T.line}`, padding: 18 }}>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                {F.culture.map((c, i) => <Chip key={c} tone={i % 3 === 0 ? 'acc' : i % 3 === 1 ? 'tint' : 'cloud'}>{c}</Chip>)}
              </div>
            </div>
          </MSection>

          {/* Notes */}
          <MSection eyebrow="The practical stuff" title="Parking, charting, float &amp; housing" sub="The questions every traveler asks before day one.">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {F.notes.map(n => <NoteTile key={n.title} {...n} />)}
            </div>
          </MSection>

          {/* Voices — target state */}
          <TargetWrap caption="phase 3 — populated as travelers contribute. sample data shown. no PHI, structured tags first.">
            <MSection title="Reviews &amp; diaries" badge={<TargetBadge />} sub="Lived-in, anonymized intel attached to the job decision." />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingTop: 8 }}>
              {F.reviews.slice(0, 2).map((r, i) => <QuoteCallout key={i} review={r} />)}
            </div>
            <div style={{ fontFamily: T.font, fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 10.5, color: T.fg2, margin: '20px 0 12px' }}>Assignment diaries</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {F.diaries.map((d, i) => <DiaryCard key={i} diary={d} />)}
            </div>
          </TargetWrap>

          {/* CTA */}
          <WorkedHereCTA compact />

          {/* Related jobs */}
          <MSection eyebrow="Apply with confidence" title="Open jobs here">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {F.relatedJobs.map((j, i) => <JobRow key={i} job={j} onOpen={() => {}} />)}
            </div>
          </MSection>
        </div>
        <MTabBar />
      </div>
    </div>
  );
}

Object.assign(window, { MobileFacilityIntel });
