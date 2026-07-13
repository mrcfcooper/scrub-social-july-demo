/* Facility Intel — Desktop (1280) */
function FacTopBar() {
  const F = window.FAC;
  return (
    <div style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', borderBottom: `1px solid ${T.line}`, background: 'rgba(255,255,255,0.86)', backdropFilter: 'blur(16px)', position: 'sticky', top: 0, zIndex: 5 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <SMark size={24} color={T.plum} />
        <span style={{ fontFamily: T.font, fontWeight: 400, fontSize: 17, letterSpacing: '-0.03em', color: T.plum }}>Scrub Society</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: T.font, fontWeight: 300, fontSize: 13.5, color: T.fg2 }}>
        <span>Jobs</span><Ic name="chevron-right" size={14} color={T.fg3} />
        <span>Facilities</span><Ic name="chevron-right" size={14} color={T.fg3} />
        <span style={{ color: T.fg1 }}>{F.name}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <Ic name="search" size={19} color={T.fg2} />
        <Ic name="bell" size={19} color={T.fg2} />
        <span style={{ width: 32, height: 32, borderRadius: '9999px 9999px 9999px 0', background: T.lav, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.font, fontSize: 13, color: T.plum }}>CR</span>
      </div>
    </div>
  );
}

function FacHero() {
  const F = window.FAC;
  return (
    <div style={{ padding: '24px 24px 0' }}>
      <div style={{ borderRadius: 32, background: T.plum, padding: 32, display: 'flex', gap: 30, color: T.open }}>
        <div style={{ width: 360, flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <PhotoFrame variant="BL" radius={26} style={{ width: 360, height: 256, background: 'rgba(255,255,255,0.07)' }}>
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, color: 'rgba(255,255,255,0.55)' }}>
              <Ic name="building" size={34} color="rgba(255,255,255,0.5)" />
              <span style={{ fontFamily: T.font, fontWeight: 400, textTransform: 'lowercase', fontSize: 12.5 }}>facility photo</span>
            </div>
          </PhotoFrame>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Ic name="check-circle" size={16} color={T.lav} />
            <span style={{ fontFamily: T.font, fontWeight: 300, fontSize: 12.5, color: 'rgba(255,255,255,0.78)' }}>Verified facility · {F.system}</span>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontFamily: T.font, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: 11, color: T.lav }}>Facility intel</span>
          <h1 style={{ fontFamily: T.font, fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.02, fontSize: 40, color: T.open, margin: '12px 0 0' }}>{F.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, margin: '12px 0 0', flexWrap: 'wrap', color: 'rgba(255,255,255,0.84)', fontFamily: T.font, fontWeight: 300, fontSize: 14.5 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Ic name="map-pin" size={16} color={T.lav} />{F.city}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Ic name="building" size={16} color={T.lav} />{F.type}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Ic name="award" size={16} color={T.lav} />{F.beds} · {F.recognition}</span>
          </div>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', margin: '18px 0 0' }}>
            {F.units.map(u => (
              <span key={u} style={{ fontFamily: T.font, fontWeight: 400, fontSize: 12.5, padding: '5px 12px', borderRadius: 9999, background: 'rgba(255,255,255,0.10)', color: T.open, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.16)' }}>{u}</span>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 'auto', paddingTop: 24 }}>
            {F.metaTiles.map(m => <MetaTile key={m.label} {...m} dark />)}
          </div>
        </div>

        <div style={{ width: 196, flex: '0 0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 12, paddingLeft: 24, borderLeft: '1px solid rgba(255,255,255,0.16)' }}>
          <span style={{ fontFamily: T.font, fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 10.5, color: 'rgba(255,255,255,0.7)' }}>Scrub Society score</span>
          <ScoreRing value={F.score} size={138} dark />
          <Stars value={F.overall} size={17} />
          <span style={{ fontFamily: T.font, fontWeight: 300, fontSize: 13.5, color: 'rgba(255,255,255,0.84)' }}>{F.overall} avg · {F.reviewCount} reviews · {F.diaryCount} diaries</span>
          <TargetBadge style={{ background: 'rgba(187,175,239,0.22)', color: T.lav }} />
        </div>
      </div>
    </div>
  );
}

function RatingsCard() {
  const F = window.FAC;
  return (
    <div style={{ borderRadius: 22, background: T.open, boxShadow: `inset 0 0 0 1px ${T.line}`, padding: 26 }}>
      <SectionTitle eyebrow="Community signal" title="Ratings breakdown"
        right={<TargetBadge />} />
      <div style={{ display: 'grid', gridTemplateColumns: '210px 1fr', gap: 28, alignItems: 'center' }}>
        <div style={{ borderRadius: 18, background: T.cloud, padding: '22px 18px', textAlign: 'center', boxShadow: `inset 0 0 0 1px ${T.line}` }}>
          <div style={{ fontFamily: T.font, fontWeight: 400, letterSpacing: '-0.04em', fontSize: 52, lineHeight: 1, color: T.plum }}>{F.overall}</div>
          <div style={{ margin: '10px 0 8px', display: 'flex', justifyContent: 'center' }}><Stars value={F.overall} size={18} /></div>
          <span style={{ fontFamily: T.font, fontWeight: 400, textTransform: 'lowercase', fontSize: 12.5, color: T.fg2 }}>from {F.reviewCount} traveler reviews</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {F.ratings.map(r => <BreakdownBar key={r.label} {...r} />)}
        </div>
      </div>
    </div>
  );
}

function CultureCard() {
  const F = window.FAC;
  return (
    <div style={{ borderRadius: 22, background: T.open, boxShadow: `inset 0 0 0 1px ${T.line}`, padding: 26 }}>
      <SectionTitle eyebrow="What travelers flag" title="Unit culture" sub="Recurring themes pulled from structured tags across diaries and reviews." />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {F.culture.map((c, i) => <Chip key={c} tone={i % 3 === 0 ? 'acc' : i % 3 === 1 ? 'tint' : 'cloud'}>{c}</Chip>)}
      </div>
    </div>
  );
}

function NotesCard() {
  const F = window.FAC;
  return (
    <div>
      <SectionTitle eyebrow="The practical stuff" title="Parking, charting, float &amp; housing" sub="The questions every traveler asks before day one — answered from the people who already worked here." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {F.notes.map(n => <NoteTile key={n.title} {...n} />)}
      </div>
    </div>
  );
}

function VoicesSection() {
  const F = window.FAC;
  return (
    <TargetWrap caption="phase 3 — populated as travelers contribute reviews and diaries. shown here with sample data. no PHI, no named accusations; structured tags first.">
      <SectionTitle title="Reviews &amp; assignment diaries"
        sub="The moat: lived-in, anonymized intel attached to the job decision — not a review free-for-all."
        right={<TargetBadge />} />
      <div style={{ fontFamily: T.font, fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 11, color: T.fg2, margin: '4px 0 16px' }}>Recent reviews</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18, paddingTop: 8 }}>
        {F.reviews.map((r, i) => <QuoteCallout key={i} review={r} />)}
      </div>
      <div style={{ fontFamily: T.font, fontWeight: 400, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 11, color: T.fg2, margin: '26px 0 16px' }}>Assignment diaries</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
        {F.diaries.map((d, i) => <DiaryCard key={i} diary={d} />)}
      </div>
    </TargetWrap>
  );
}

function RelatedJobs() {
  const F = window.FAC;
  return (
    <div style={{ borderRadius: 22, background: T.cloud, boxShadow: `inset 0 0 0 1px ${T.line}`, padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <h3 style={{ fontFamily: T.font, fontWeight: 400, letterSpacing: '-0.03em', fontSize: 18, color: T.fg1, margin: 0 }}>Open jobs here</h3>
        <span style={{ fontFamily: T.font, fontWeight: 400, textTransform: 'lowercase', fontSize: 12.5, color: T.fg3 }}>{F.relatedJobs.length} active</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {F.relatedJobs.map((j, i) => <JobRow key={i} job={j} onOpen={() => {}} />)}
      </div>
      <button style={{ width: '100%', marginTop: 14, background: 'transparent', border: `1px solid ${T.line}`, borderRadius: 9999, padding: '12px 0', cursor: 'pointer', fontFamily: T.font, fontWeight: 400, fontSize: 14, color: T.plum, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
        See all jobs in San Diego <Ic name="arrow-right" size={16} color={T.plum} />
      </button>
    </div>
  );
}

function DesktopFacilityIntel() {
  return (
    <div style={{ width: 1280, background: T.open, fontFamily: T.font }}>
      <FacTopBar />
      <FacHero />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 28, padding: '28px 24px 40px', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <RatingsCard />
          <CultureCard />
          <NotesCard />
          <VoicesSection />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'sticky', top: 84 }}>
          <WorkedHereCTA />
          <RelatedJobs />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DesktopFacilityIntel });
