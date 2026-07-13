// Scrub Society — Home page sections (web/desktop). Composed from ss-kit.jsx primitives.
const { useState } = React;

/* ───────────────────────── data ───────────────────────── */
const QUICK_LINKS = [
  { label: 'Find Jobs',              icon: 'briefcase',      href: '/jobs' },
  { label: 'Find Housing',           icon: 'building',       href: '/housing' },
  { label: 'Get Advice and Info',    icon: 'file-text',      href: '/resources' },
  { label: 'RN Compact License Info',icon: 'map-pin',        href: '/compact-license' },
  { label: 'Get quick answers',      icon: 'message-circle', href: '/faqs' },
  { label: 'Join the community',     icon: 'users',          href: '/community' },
];

const FEATURED_JOBS = [
  { role: 'Travel Nurse — MedSurg / Tele', vendor: 'Aya Healthcare', specialty: 'MedSurg / Telemetry', pay: 2840, city: 'DENVER, CO', state: 'Colorado', weeks: 13 },
  { role: 'Travel Nurse — ICU',            vendor: 'Medical Solutions', specialty: 'Intensive Care', pay: 3120, city: 'PHOENIX, AZ', state: 'Arizona', weeks: 13 },
  { role: 'Travel Nurse — Labor & Delivery', vendor: 'Triage Staffing', specialty: 'L&D', pay: 2675, city: 'PORTLAND, OR', state: 'Oregon', weeks: 13 },
];

const EVENTS = [
  { photo: window.__resources.eventTeam, category: 'Meetup', daysLeft: 12, title: 'Denver Travelers Night Out', subtitle: 'Drinks, trivia & new friends', desc: 'Off-shift and in a new city? Come meet the locals-for-now. We take over the back patio, the trivia gets competitive, and the first round is on the Society.', date: 'Jun 21, 2026 · 7:00 PM', location: 'Denver, CO', attendees: '120+' },
  { photo: window.__resources.eventTravcon, category: 'Conference', daysLeft: 47, title: 'TravCon 2026 Society Lounge', subtitle: 'Our home base on the floor', desc: 'Find your people at the biggest travel-healthcare gathering of the year. Charging stations, free cold brew, mentor office hours, and the comfiest chairs in the hall.', date: 'Aug 25, 2026 · All day', location: 'Las Vegas, NV', attendees: '2,400+' },
];

const EMPLOYERS = ['AMN Healthcare', 'TNAA', 'Triage', 'Medical Solutions'];

const BLOGS = [
  { title: 'The packing list that saves your sanity', author: 'Maya R., RN', date: 'May 28, 2026', excerpt: 'Thirteen weeks, one car, zero regrets. The gear that earns its trunk space — and what to leave behind.' },
  { title: 'Reading a pay package without the spin', author: 'Devon K., RN', date: 'May 19, 2026', excerpt: 'Stipends, taxable rates, and the math recruiters hope you skip. Here is how to find the real weekly number.' },
  { title: 'Compact license, plain English', author: 'Erin · Scrub Society', date: 'May 9, 2026', excerpt: 'Which states are in, what a multistate license actually covers, and the one form people always forget.' },
];

/* ───────────────────────── nav ───────────────────────── */
function SiteNav() {
  const links = ['Jobs', 'Housing', 'Society', 'Resources', 'Events'];
  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 56px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
        <SMark size={30} />
        <span style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 21, letterSpacing: '-0.03em', color: SS.plum }}>Scrub Society</span>
      </div>
      <nav style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
        {links.map(l => <a key={l} href="#" className="ss-navlink" style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 15, color: SS.fg1, textDecoration: 'none' }}>{l}</a>)}
      </nav>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <a href="#" style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 15, color: SS.fg1, textDecoration: 'none' }}>Sign in</a>
        <PrimaryButton style={{ padding: '11px 20px', fontSize: 15 }}>Join the Society</PrimaryButton>
      </div>
    </header>
  );
}

/* ───────────────────────── hero (Image/Media variant + gradient overlay) ───────────────────────── */
function HeroSearch() {
  const [q, setQ] = useState('');
  return (
    <section style={{ padding: '8px 24px 0' }}>
      <div style={{ position: 'relative', borderRadius: 32, overflow: 'hidden', minHeight: 560 }}>
        {/* media */}
        <img src={window.__resources.eventTeam} alt="Travel healthcare professionals"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        {/* plum gradient overlay — legibility scrim */}
        <div style={{ position: 'absolute', inset: 0, background:
          'linear-gradient(105deg, rgba(66,26,49,0.94) 0%, rgba(66,26,49,0.86) 34%, rgba(66,26,49,0.52) 64%, rgba(66,26,49,0.30) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background:
          'linear-gradient(to top, rgba(66,26,49,0.55) 0%, transparent 38%)' }} />

        {/* content */}
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 48, alignItems: 'center', padding: '56px 60px' }}>
          {/* left — copy + search */}
          <div>
            <Chip tone="acc" bubble icon="sparkles" style={{ fontSize: 13 }}>630K+ active healthcare professionals</Chip>
            <H1 dark style={{ fontSize: 56, marginTop: 22, lineHeight: 1.0 }}>
              What can we <span style={{ color: SS.lav }}>help you with</span> today?
            </H1>
            <Body dark size={18} style={{ marginTop: 18, maxWidth: 480, color: 'rgba(255,255,255,0.86)' }}>
              Tell us what you're looking for — jobs, housing, or resources — and we'll take you to the right place. Powered by a community that gets it.
            </Body>

            {/* search pill */}
            <form onSubmit={(e) => e.preventDefault()} style={{ marginTop: 28, maxWidth: 540 }}>
              <div style={{ display: 'flex', alignItems: 'stretch', background: SS.open, borderRadius: 9999, padding: 7, boxShadow: SS.sh3 }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 18, minWidth: 0 }}>
                  <Icon name="search" size={20} color={SS.fg3} />
                  <input value={q} onChange={(e) => setQ(e.target.value)}
                    placeholder="Search jobs, housing, advice…"
                    style={{ flex: 1, border: 0, outline: 'none', background: 'transparent', fontFamily: SS.font, fontWeight: 300, fontSize: 16, color: SS.fg1, minWidth: 0 }} />
                </div>
                <button type="submit" className="ss-btn" style={{
                  border: 0, cursor: 'pointer', background: SS.plum, color: SS.open,
                  fontFamily: SS.font, fontWeight: 400, fontSize: 15, padding: '0 26px',
                  borderRadius: SS.rBubble, display: 'inline-flex', alignItems: 'center', gap: 8,
                }}>Search<Icon name="arrow-right" size={18} color="currentColor" /></button>
              </div>
            </form>
          </div>

          {/* right — 6 quick actions */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            {QUICK_LINKS.map(item => (
              <a key={item.label} href={item.href} className="ss-quick" style={{
                textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 14,
                background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: '20px 20px 20px 0', padding: '20px 18px', minHeight: 128,
                backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                justifyContent: 'space-between', transition: 'all 160ms var(--ss-ease, ease)',
              }}>
                <span className="ss-quick-ic" style={{
                  width: 46, height: 46, borderRadius: '13px 13px 13px 0', background: SS.lav, color: SS.plum,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}><Icon name={item.icon} size={24} color="currentColor" /></span>
                <span style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 16, letterSpacing: '-0.02em', color: SS.open, lineHeight: 1.15 }}>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────── section heading ───────────────────────── */
function SectionHead({ eyebrow, title, sub, align = 'center', right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: right ? 'space-between' : 'center', gap: 24, textAlign: align, flexDirection: right ? 'row' : 'column', marginBottom: 36 }}>
      <div style={{ maxWidth: right ? 'none' : 640, margin: right ? 0 : '0 auto' }}>
        {eyebrow && <Subhead style={{ display: 'block', marginBottom: 12 }}>{eyebrow}</Subhead>}
        <H2 style={{ fontSize: 40 }}>{title}</H2>
        {sub && <Body size={17} style={{ marginTop: 14, color: SS.fg2, maxWidth: right ? 520 : 640, marginLeft: right ? 0 : 'auto', marginRight: right ? 0 : 'auto' }}>{sub}</Body>}
      </div>
      {right}
    </div>
  );
}

/* ───────────────────────── featured jobs ───────────────────────── */
function FeaturedJobs() {
  return (
    <section style={{ padding: '72px 56px' }}>
      <SectionHead eyebrow="Featured assignments" title="Featured jobs"
        sub="See pay range, location, and shift details upfront. Apply, and your recruiter follows up within one business day." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {FEATURED_JOBS.map((j, i) => (
          <Card key={i} hover padding={16} style={{ borderRadius: '20px 20px 20px 0', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative' }}>
              <PhotoSlot label="job photo" square="BL" radius={14} style={{ height: 168 }} />
              <span style={{ position: 'absolute', top: 12, right: 12 }}>
                <Chip tone="acc" bubble icon="sparkles" style={{ fontSize: 12, boxShadow: SS.sh1 }}>Featured</Chip>
              </span>
            </div>
            <div style={{ padding: '18px 8px 8px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: '12px 12px 12px 0', background: SS.dew, color: SS.plum, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SS.font, fontWeight: 400, fontSize: 15, letterSpacing: '-0.02em' }}>
                  {j.vendor.split(' ').map(w => w[0]).slice(0, 2).join('')}
                </div>
                <div style={{ lineHeight: 1.25 }}>
                  <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 13, color: SS.fg1 }}>{j.vendor}</div>
                  <div style={{ fontFamily: SS.font, fontWeight: 300, fontSize: 12.5, color: SS.fg3 }}>{j.specialty}</div>
                </div>
              </div>
              <H3 style={{ fontSize: 19, minHeight: 46 }}>{j.role}</H3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, margin: '16px 0 18px' }}>
                <MetaRow icon="dollar" main={'$' + j.pay.toLocaleString()} sub="per week" />
                <MetaRow icon="map-pin" main={j.city} sub={j.state + ' · ' + j.weeks + ' weeks'} />
              </div>
              <div style={{ marginTop: 'auto' }}>
                <GhostButton iconRight="arrow-right" style={{ width: '100%', justifyContent: 'center' }}>View assignment</GhostButton>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 36 }}>
        <GhostButton>Sign up for job alerts</GhostButton>
        <PrimaryButton iconRight="arrow-right">Search all jobs</PrimaryButton>
      </div>
    </section>
  );
}
function MetaRow({ icon, main, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <span style={{ width: 34, height: 34, borderRadius: '10px 10px 10px 0', background: SS.open, boxShadow: `inset 0 0 0 1px ${SS.line}`, color: SS.plum, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
        <Icon name={icon} size={17} color="currentColor" />
      </span>
      <div style={{ lineHeight: 1.2 }}>
        <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 15, color: SS.fg1, letterSpacing: '-0.01em' }}>{main}</div>
        <div style={{ fontFamily: SS.font, fontWeight: 300, fontSize: 12.5, color: SS.fg3 }}>{sub}</div>
      </div>
    </div>
  );
}

/* ───────────────────────── social club events ───────────────────────── */
function SocialClub() {
  return (
    <section style={{ padding: '72px 24px', background: SS.cloud, margin: '0 24px', borderRadius: 32 }}>
      <div style={{ padding: '0 32px' }}>
        <SectionHead eyebrow="The Scrub Society Social Club" title="Connect, celebrate, share"
          sub="From local meetups and trivia nights to trips and TravCon — your place to find your people on the road." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {EVENTS.map((e, i) => (
            <Card key={i} hover padding={16} style={{ borderRadius: '20px 20px 20px 0', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative' }}>
                <PhotoFrame square="BL" radius={14} style={{ height: 240 }}>
                  <img src={e.photo} alt={e.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </PhotoFrame>
                <span style={{ position: 'absolute', top: 12, left: 12 }}>
                  <Chip tone="sky" bubble icon="ticket" style={{ fontSize: 12 }}>{e.category}</Chip>
                </span>
                <div style={{ position: 'absolute', top: 12, right: 12, background: SS.open, borderRadius: '14px 14px 14px 0', padding: '8px 14px', textAlign: 'center', boxShadow: SS.sh2 }}>
                  <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 22, color: SS.plum, lineHeight: 1, letterSpacing: '-0.03em' }}>{e.daysLeft}</div>
                  <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 9.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: SS.fg2, marginTop: 2 }}>days left</div>
                </div>
              </div>
              <div style={{ padding: '18px 10px 10px' }}>
                <H3 style={{ fontSize: 22 }}>{e.title}</H3>
                <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 14, color: SS.lav, marginTop: 4, filter: 'brightness(0.78)' }}>{e.subtitle}</div>
                <Body size={14.5} style={{ marginTop: 12, color: SS.fg2 }}>{e.desc}</Body>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 18 }}>
                  <EventMeta icon="calendar" v={e.date} />
                  <EventMeta icon="map-pin" v={e.location} />
                  <EventMeta icon="users" v={e.attendees} />
                </div>
              </div>
            </Card>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <PrimaryButton iconRight="arrow-right">Explore all events</PrimaryButton>
        </div>
      </div>
    </section>
  );
}
function EventMeta({ icon, v }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: SS.fg2, fontFamily: SS.font, fontWeight: 300, fontSize: 13.5 }}>
      <Icon name={icon} size={16} color={SS.plum} />{v}
    </span>
  );
}

/* ───────────────────────── employer logos ───────────────────────── */
function EmployerStrip() {
  return (
    <section style={{ padding: '72px 56px' }}>
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <H2 style={{ fontSize: 34 }}>Connect with top healthcare employers</H2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
        {EMPLOYERS.map(name => (
          <div key={name} className="ss-card-hover" style={{
            background: SS.open, borderRadius: '20px 20px 20px 0', boxShadow: `inset 0 0 0 1px ${SS.line}`,
            height: 112, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
            transition: 'transform 160ms var(--ss-ease, ease), box-shadow 160ms',
          }}>
            <span style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 21, letterSpacing: '-0.02em', color: 'rgba(66,26,49,0.55)', textAlign: 'center' }}>{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ───────────────────────── blogs ───────────────────────── */
function BlogCards() {
  return (
    <section style={{ padding: '72px 56px', background: SS.cloud }}>
      <SectionHead eyebrow="Behind the scrubs" title="From the blog"
        sub="From packing hacks to contract tips, our blogs dish out the advice — and the stories — you need to make work and life smoother." />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {BLOGS.map((b, i) => (
          <Card key={i} hover padding={0} style={{ borderRadius: '20px 20px 20px 0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <PhotoSlot label="article image" square="none" radius={0} style={{ height: 196 }} />
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <H3 style={{ fontSize: 20 }}>{b.title}</H3>
              <Subtext style={{ display: 'block', marginTop: 8 }}>by {b.author} · {b.date}</Subtext>
              <Body size={14.5} style={{ marginTop: 12, color: SS.fg2, flex: 1 }}>{b.excerpt}</Body>
              <div style={{ marginTop: 18 }}>
                <GhostButton iconRight="arrow-right">Read blog</GhostButton>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div style={{ textAlign: 'center', marginTop: 36 }}>
        <GhostButton iconRight="arrow-right">View all blogs</GhostButton>
      </div>
    </section>
  );
}

/* ───────────────────────── join / newsletter footer ───────────────────────── */
function JoinFooter() {
  const [email, setEmail] = useState('');
  const cols = [
    { h: 'Society',   l: ['Jobs', 'Housing', 'Mentors', 'Discounts', 'CE credits'] },
    { h: 'Resources', l: ['Compact license', 'Travel checklist', 'Pay calculator', 'Blog', 'Podcast'] },
    { h: 'Company',   l: ['About us', 'For employers', 'Events', 'Contact'] },
  ];
  return (
    <footer style={{ background: SS.plum, color: SS.open, marginTop: 16, borderRadius: '32px 32px 0 0', overflow: 'hidden', position: 'relative' }}>
      {/* join / newsletter band */}
      <div style={{ position: 'relative', padding: '72px 56px 56px' }}>
        <div style={{ position: 'absolute', right: -50, top: -40, opacity: 0.10, pointerEvents: 'none' }}>
          <SMark size={300} color={SS.open} />
        </div>
        <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 56, alignItems: 'center' }}>
          <div>
            <Subhead dark style={{ display: 'block', marginBottom: 14 }}>On the road, but never alone</Subhead>
            <H2 dark style={{ fontSize: 46 }}>Join the Scrub Society.</H2>
            <Body dark size={17} style={{ marginTop: 16, maxWidth: 460, color: 'rgba(255,255,255,0.82)' }}>
              Discover new jobs, get customized alerts, and unlock unlimited resources — free for healthcare professionals.
            </Body>
            <div style={{ display: 'flex', gap: 22, marginTop: 26, alignItems: 'center' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: SS.font, fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.85)' }}><Icon name="check" size={16} color={SS.lav} />Free forever</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: SS.font, fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.85)' }}><Icon name="check" size={16} color={SS.lav} />Takes ~3 minutes</span>
            </div>
          </div>
          {/* newsletter card */}
          <div style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: '20px 20px 20px 0', padding: 28 }}>
            <H3 dark style={{ fontSize: 20 }}>Get the Society dispatch</H3>
            <Body dark size={14.5} style={{ marginTop: 8, color: 'rgba(255,255,255,0.78)' }}>Jobs, pay insights, and road-tested tips — straight to your inbox.</Body>
            <form onSubmit={(e) => e.preventDefault()} style={{ marginTop: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: SS.open, borderRadius: 9999, padding: '6px 6px 6px 16px' }}>
                <Icon name="mail" size={18} color={SS.fg3} />
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com"
                  style={{ flex: 1, border: 0, outline: 'none', background: 'transparent', fontFamily: SS.font, fontWeight: 300, fontSize: 15, color: SS.fg1, minWidth: 0 }} />
                <AccentButton style={{ padding: '11px 20px', fontSize: 14, borderRadius: SS.rBubble }}>Join now</AccentButton>
              </div>
              <Subtext dark style={{ display: 'block', marginTop: 10, color: 'rgba(255,255,255,0.6)' }}>no spam. unsubscribe anytime.</Subtext>
            </form>
          </div>
        </div>
      </div>

      {/* footer links */}
      <div style={{ padding: '0 56px 40px' }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.16)', marginBottom: 40 }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <SMark size={28} color={SS.open} />
              <span style={{ fontFamily: SS.font, fontSize: 20, fontWeight: 400, letterSpacing: '-0.03em' }}>Scrub Society</span>
            </div>
            <Body dark size={14} style={{ maxWidth: 300, color: 'rgba(255,255,255,0.72)' }}>Travel changes your location. Scrub Society keeps you connected.</Body>
            <Subtext dark style={{ display: 'block', marginTop: 22, color: 'rgba(255,255,255,0.55)' }}>scrubsociety.com · @scrubsociety</Subtext>
          </div>
          {cols.map(c => (
            <div key={c.h}>
              <Subhead dark style={{ display: 'block', marginBottom: 14 }}>{c.h}</Subhead>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {c.l.map(item => <li key={item}><a href="#" style={{ fontFamily: SS.font, fontWeight: 300, fontSize: 14.5, color: 'rgba(255,255,255,0.82)', textDecoration: 'none' }}>{item}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, paddingTop: 22, borderTop: '1px solid rgba(255,255,255,0.16)', display: 'flex', justifyContent: 'space-between' }}>
          <Subtext dark style={{ color: 'rgba(255,255,255,0.55)' }}>© 2026 scrub society. all rights reserved.</Subtext>
          <Subtext dark style={{ color: 'rgba(255,255,255,0.55)' }}>belong everywhere.</Subtext>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────────── app ───────────────────────── */
function App() {
  return (
    <div style={{ width: 1440, margin: '0 auto', background: SS.open, boxShadow: '0 30px 80px -30px rgba(66,26,49,0.4)' }}>
      <SiteNav />
      <HeroSearch />
      <FeaturedJobs />
      <SocialClub />
      <EmployerStrip />
      <BlogCards />
      <JoinFooter />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
