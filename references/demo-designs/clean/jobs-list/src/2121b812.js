// Scrub Society — Web sections (marketing site). Uses primitives from components.jsx.

function SiteNav() {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 32px', background: 'transparent',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <SMark size={28} />
        <span style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 20, letterSpacing: '-0.02em', color: SS.plum }}>Scrub Society</span>
      </div>
      <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {['Jobs', 'Mentors', 'Housing', 'Society', 'Resources'].map(l => (
          <a key={l} href="#" style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 14, color: SS.fg1, textDecoration: 'none' }}>{l}</a>
        ))}
      </nav>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <a href="#" style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 14, color: SS.fg1, textDecoration: 'none' }}>Sign in</a>
        <PrimaryButton style={{ padding: '10px 18px', fontSize: 14 }}>Join the Society</PrimaryButton>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section style={{ padding: '24px 24px 0' }}>
      <div style={{
        background: SS.plum, color: SS.open, borderRadius: 40, overflow: 'hidden',
        display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 28, padding: '60px 64px',
        position: 'relative', minHeight: 480, alignItems: 'center',
      }}>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Subhead dark style={{ display: 'block', marginBottom: 18 }}>Belong everywhere</Subhead>
          <H1 dark style={{ fontSize: 84, lineHeight: 0.98 }}>
            Your way and<br />the highway<span style={{ color: SS.lav }}>.</span>
          </H1>
          <Body dark size={17} style={{ marginTop: 22, maxWidth: 460, color: 'rgba(255,255,255,0.82)' }}>
            A community-powered career platform for travel healthcare professionals. Real opportunities, real guidance, and a Society that has the road already mapped.
          </Body>
          <div style={{ display: 'flex', gap: 12, marginTop: 28, alignItems: 'center' }}>
            <AccentButton style={{ padding: '16px 26px', fontSize: 16 }}>Find your next assignment</AccentButton>
            <GhostButton onDark style={{ padding: '14px 22px', fontSize: 15 }} icon="sparkles">Talk to Erin</GhostButton>
          </div>
          <div style={{ display: 'flex', gap: 22, marginTop: 36, alignItems: 'center' }}>
            <Stat n="2,400+" l="open assignments" />
            <Sep />
            <Stat n="46" l="states · all compact" />
            <Sep />
            <Stat n="$2.8k" l="avg weekly pay" />
          </div>
        </div>

        {/* photo cluster — speech bubble frames */}
        <div style={{ position: 'relative', height: 460 }}>
          <PhotoFrame variant="BL" radius={36} style={{
            position: 'absolute', top: 0, right: 30, width: 280, height: 340,
            background: `url("../../assets/photo-medical-team.jpg") center/cover`,
          }}><div style={{ width: '100%', height: '100%' }} /></PhotoFrame>
          <PhotoFrame variant="BR" radius={28} style={{
            position: 'absolute', bottom: 6, left: 0, width: 220, height: 200,
            background: `url("../../assets/travel-nurse-mobile.png") center/cover`,
          }}><div style={{ width: '100%', height: '100%' }} /></PhotoFrame>
          <div style={{
            position: 'absolute', bottom: 70, right: -10, background: SS.lav, color: SS.plum,
            padding: '12px 18px', borderRadius: '9999px 9999px 9999px 0',
            fontFamily: SS.font, fontSize: 14, fontWeight: 400, boxShadow: '0 8px 24px -8px rgba(0,0,0,0.3)',
          }}>You're in good company.</div>
        </div>
      </div>
    </section>
  );
}
function Stat({ n, l }) {
  return (
    <div>
      <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 26, color: SS.open, letterSpacing: '-0.03em', lineHeight: 1 }}>{n}</div>
      <Subtext dark style={{ display: 'block', marginTop: 4 }}>{l}</Subtext>
    </div>
  );
}
function Sep() { return <span style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.25)' }} />; }

function LogoStrip() {
  return (
    <section style={{ padding: '40px 64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 30 }}>
      <Subhead style={{ flex: '0 0 auto' }}>Trusted partners</Subhead>
      <div style={{ flex: 1, height: 1, background: SS.lineSoft }} />
      <div style={{ display: 'flex', gap: 36, alignItems: 'center', color: SS.fg2 }}>
        {['Aya', 'Aureus', 'CrossCountry', 'Medical Solutions', 'TaleMed', 'Trustaff'].map(n => (
          <span key={n} style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 16, letterSpacing: '-0.02em' }}>{n}</span>
        ))}
      </div>
    </section>
  );
}

function ValueProps() {
  const items = [
    { icon: 'compass',     t: 'Find the work that fits your life',      b: 'Filter by pay, shift, specialty, and start date. See pay range, location, and shift details upfront — apply, and your recruiter follows up within one business day.' },
    { icon: 'users',       t: 'Peer-reviewed. Road-tested.',           b: 'Every assignment carries notes from members who\u2019ve worked there. Floor culture, parking, the unit\'s actual ratio — not just the contract on paper.' },
    { icon: 'sparkles',    t: 'Meet Erin, your career guide',          b: 'Erin is the assistant who actually knows travel healthcare. Ask about licenses, pay packages, or which hospitals have the worst charting systems. (She\'ll tell you.)' },
  ];
  return (
    <section style={{ padding: '40px 24px' }}>
      <div style={{ padding: '0 40px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28 }}>
        <div>
          <Subhead style={{ display: 'block', marginBottom: 10 }}>What's in the Society</Subhead>
          <H2 style={{ fontSize: 48 }}>More routes. Less roulette.</H2>
        </div>
        <Body size={15} style={{ maxWidth: 360, color: SS.fg2 }}>We make the hard parts easier: finding the right role, understanding the real pay story, navigating licenses, and walking in day one with fewer surprises.</Body>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, padding: '0 16px' }}>
        {items.map(i => (
          <div key={i.t} style={{ background: SS.open, borderRadius: 28, padding: 28, boxShadow: `inset 0 0 0 1px ${SS.line}`, minHeight: 280 }}>
            <div style={{ width: 52, height: 52, borderRadius: '14px 14px 14px 0', background: SS.lav, color: SS.plum, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
              <Icon name={i.icon} size={24} color="currentColor" />
            </div>
            <H3 style={{ fontSize: 22 }}>{i.t}</H3>
            <Body size={14} style={{ marginTop: 10, color: SS.fg2 }}>{i.b}</Body>
          </div>
        ))}
      </div>
    </section>
  );
}

function JobsPreview() {
  return (
    <section style={{ padding: '40px 40px', background: SS.cloud, margin: '40px 24px', borderRadius: 40 }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 22 }}>
        <div>
          <Subhead style={{ display: 'block', marginBottom: 10 }}>Featured assignments</Subhead>
          <H2 style={{ fontSize: 40 }}>Paging: your next move.</H2>
        </div>
        <GhostButton icon="arrow-right" style={{ flexDirection: 'row-reverse' }}>See all 2,400</GhostButton>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {SAMPLE_JOBS.slice(0, 4).map(j => <WebJobRow key={j.id} job={j} />)}
      </div>
    </section>
  );
}
function WebJobRow({ job }) {
  return (
    <article style={{ background: SS.open, borderRadius: 24, padding: 20, boxShadow: `inset 0 0 0 1px ${SS.line}`, display: 'flex', gap: 16, alignItems: 'center' }}>
      <div style={{
        width: 64, height: 64, borderRadius: '18px 18px 18px 0',
        background: SS.dew, color: SS.plum, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: SS.font, fontWeight: 400, fontSize: 18, letterSpacing: '-0.02em', flex: '0 0 auto',
      }}>{job.hospital.split(' ').map(w => w[0]).slice(0, 2).join('')}</div>
      <div style={{ flex: 1 }}>
        <H3 style={{ fontSize: 18 }}>{job.role}</H3>
        <Body size={13} style={{ color: SS.fg2, marginTop: 2 }}>{job.hospital} · {job.city} · {job.shift}</Body>
        <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
          <Chip tone="acc">{job.role.split(' ')[0]}</Chip>
          <Chip tone="tint">{job.weeks} wks</Chip>
          {job.tags.slice(0, 1).map(t => <Chip key={t} tone="out">{t}</Chip>)}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 26, color: SS.plum, letterSpacing: '-0.02em', lineHeight: 1 }}>${job.pay.toLocaleString()}</div>
        <Subtext>per wk · starts {job.start}</Subtext>
      </div>
    </article>
  );
}

function SocietyBand() {
  return (
    <section style={{ padding: '40px 64px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36, alignItems: 'center' }}>
        <div>
          <Subhead style={{ display: 'block', marginBottom: 10 }}>The Society</Subhead>
          <H2 style={{ fontSize: 48 }}>Take what you need. Leave the trail better.</H2>
          <Body size={15} style={{ marginTop: 16, color: SS.fg2, maxWidth: 480 }}>
            Every tip, checklist, pay insight, housing lead, and hard-earned lesson becomes a marker for the next person coming up the road. That's how a community turns into a Society.
          </Body>
          <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
            <PrimaryButton>Read the latest</PrimaryButton>
            <GhostButton>Become a contributor</GhostButton>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {SAMPLE_POSTS.map(p => <PostCard key={p.id} post={p} />)}
        </div>
      </div>
    </section>
  );
}

function CTABand() {
  return (
    <section style={{ padding: '40px 24px' }}>
      <div style={{
        background: SS.lav, borderRadius: 40, padding: '64px 56px',
        display: 'flex', gap: 36, alignItems: 'center', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ maxWidth: 600 }}>
          <H2 style={{ fontSize: 56, color: SS.plum }}>On the road,<br/>but never alone.</H2>
          <Body size={16} style={{ marginTop: 14, color: 'rgba(66,26,49,0.8)', maxWidth: 500 }}>
            Join the Society — free for healthcare professionals. Get matched, get guidance, get going.
          </Body>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <PrimaryButton style={{ padding: '18px 30px', fontSize: 17 }}>Create your profile</PrimaryButton>
          <Subtext style={{ textAlign: 'center', color: 'rgba(66,26,49,0.7)' }}>takes about 3 minutes</Subtext>
        </div>
        <div style={{ position: 'absolute', right: -40, top: -30, opacity: 0.6 }}>
          <SMark size={260} color={SS.plum} />
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  const cols = [
    { h: 'Society',   l: ['Jobs', 'Mentors', 'Housing', 'Discounts', 'CE credits'] },
    { h: 'Resources', l: ['Compact license', 'Travel checklist', 'Pay calculator', 'Blog', 'Podcast'] },
    { h: 'Company',   l: ['About us', 'For employers', 'Partners', 'Contact'] },
  ];
  return (
    <footer style={{ padding: '40px 64px 36px', background: SS.plum, color: SS.open, marginTop: 30, borderRadius: '40px 40px 0 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 36 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
            <SMark size={28} color={SS.open} />
            <span style={{ fontFamily: SS.font, fontSize: 20, fontWeight: 400, letterSpacing: '-0.02em' }}>Scrub Society</span>
          </div>
          <Body dark size={14} style={{ maxWidth: 320, color: 'rgba(255,255,255,0.75)' }}>
            Travel changes your location. Scrub Society keeps you connected.
          </Body>
          <Subtext dark style={{ display: 'block', marginTop: 26, color: 'rgba(255,255,255,0.6)' }}>scrubsociety.com · @scrubsociety</Subtext>
        </div>
        {cols.map(c => (
          <div key={c.h}>
            <Subhead dark style={{ display: 'block', marginBottom: 14 }}>{c.h}</Subhead>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {c.l.map(item => <li key={item} style={{ fontFamily: SS.font, fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.85)' }}><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>{item}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 40, paddingTop: 22, borderTop: '1px solid rgba(255,255,255,0.18)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Subtext dark style={{ color: 'rgba(255,255,255,0.6)' }}>© 2026 scrub society. all rights reserved.</Subtext>
        <Subtext dark style={{ color: 'rgba(255,255,255,0.6)' }}>belong everywhere.</Subtext>
      </div>
    </footer>
  );
}

Object.assign(window, {
  SiteNav, Hero, LogoStrip, ValueProps, JobsPreview, SocietyBand, CTABand, SiteFooter,
});
