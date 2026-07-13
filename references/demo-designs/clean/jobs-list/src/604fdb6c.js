// Scrub Society — Mobile screens. Imports primitives from components.jsx (via window).

// ─────────────── shared sample data ───────────────
const SAMPLE_JOBS = [
  { id: 'j1', role: 'ICU travel RN',       hospital: 'HCA Presbyterian',  city: 'Denver, CO',     start: 'mar 24',  weeks: 13, shift: 'Nights · 3×12', pay: 2840, tags: ['Housing stipend', 'Weekly pay'],  agency: 'Aya' },
  { id: 'j2', role: 'L&D travel RN',       hospital: 'Cedars-Sinai',      city: 'Los Angeles, CA',start: 'apr 7',   weeks: 13, shift: 'Days · 3×12',  pay: 3120, tags: ['Premium pay', 'Rapid hire'],     agency: 'Cross Country' },
  { id: 'j3', role: 'MedSurg travel RN',   hospital: 'Mass General',      city: 'Boston, MA',     start: 'mar 31',  weeks: 8,  shift: 'Rotating',     pay: 2410, tags: ['Short contract'],                agency: 'Aureus' },
  { id: 'j4', role: 'ER travel RN',        hospital: 'Sentara Norfolk',   city: 'Norfolk, VA',    start: 'apr 14',  weeks: 13, shift: 'Nights · 3×12', pay: 2680, tags: ['Coastal', 'Weekly pay'],         agency: 'Medical Solutions' },
];

const SAMPLE_POSTS = [
  { id: 'p1', author: 'Lin C.',     role: 'ICU · 4 yrs travel', avatar: '#BBAFEF', body: 'Hot tip for the LA crowd: park-and-ride on the Expo Line saves you an hour and your sanity. The Mid-City stop is 11 min to Cedars.', likes: 42, comments: 8, when: '2h' },
  { id: 'p2', author: 'Devon R.',   role: 'L&D · first contract',avatar: '#CEDBFE', body: 'First night shift in a new unit tonight. Any tips for fast intros at the start of a shift? Half-hopeful, half-coffee.', likes: 17, comments: 22, when: '5h' },
  { id: 'p3', author: 'Marisol O.', role: 'ER · NM, CO, OR',     avatar: '#82ABF4', body: 'Just renewed compact license — the new portal actually works. Took 11 minutes. Posting the checklist in #credentialing.', likes: 88, comments: 12, when: '1d' },
];

// ─────────────── Home screen ───────────────
function HomeScreen({ onOpenJob, onTalkToErin, onSeeAll }) {
  return (
    <div style={{ paddingBottom: 110 }}>
      {/* Hero card on dark Plum Grove */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ background: SS.plum, borderRadius: 28, padding: 22, position: 'relative', overflow: 'hidden' }}>
          <Subhead dark style={{ display: 'block', marginBottom: 10 }}>Good morning, Lin</Subhead>
          <H1 dark style={{ fontSize: 32, lineHeight: 1.04 }}>Your next move,<br/>your way<span style={{ color: SS.lav }}>.</span></H1>
          <Body dark size={13} style={{ marginTop: 10, color: 'rgba(255,255,255,0.78)' }}>
            12 new ICU openings within your radius this week. Want me to filter for the ones with weekly pay over $2,500?
          </Body>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            <AccentButton icon="sparkles" onClick={onTalkToErin}>Ask Erin</AccentButton>
            <GhostButton onDark onClick={onSeeAll}>See all jobs</GhostButton>
          </div>
          {/* decorative S */}
          <div style={{ position: 'absolute', right: -10, bottom: -22, opacity: 0.14 }}>
            <SMark size={140} color={SS.lav} />
          </div>
        </div>
      </div>

      {/* Featured for you */}
      <div style={{ padding: '22px 16px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Subhead>Featured for you</Subhead>
        <Subtext style={{ color: SS.fg3 }}>scrubsociety picks</Subtext>
      </div>
      <div style={{ display: 'flex', gap: 12, padding: '4px 16px 8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {SAMPLE_JOBS.slice(0, 3).map(j => (
          <div key={j.id} onClick={() => onOpenJob(j)} style={{
            minWidth: 240, background: SS.open, borderRadius: 22,
            boxShadow: `inset 0 0 0 1px ${SS.line}`, padding: 14, cursor: 'pointer',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <Chip tone="acc">{j.role.split(' ')[0]}</Chip>
              <Subtext style={{ marginLeft: 'auto' }}>{j.weeks} wks</Subtext>
            </div>
            <H3 style={{ fontSize: 17 }}>{j.role}</H3>
            <Body size={13} style={{ color: SS.fg2, marginTop: 2 }}>{j.hospital} · {j.city}</Body>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 12 }}>
              <span style={{ fontFamily: SS.font, fontWeight: 400, letterSpacing: '-0.02em', fontSize: 22, color: SS.plum }}>${j.pay.toLocaleString()}</span>
              <Subtext>per wk</Subtext>
            </div>
          </div>
        ))}
      </div>

      {/* Quicklinks */}
      <div style={{ padding: '20px 16px 6px' }}>
        <Subhead>Quick paths</Subhead>
      </div>
      <div style={{ padding: '8px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <QuickTile icon="map-pin"    title="Compact license"  blurb="renew in 11 min" tone="lav" />
        <QuickTile icon="building"   title="Housing partners" blurb="furnished + flexible" tone="dew" />
        <QuickTile icon="graduation" title="CE credits"       blurb="free for members" tone="sky" />
        <QuickTile icon="heart"      title="Discounts"        blurb="scrubs, gear, vacation" tone="cloud" />
      </div>

      {/* From the Society */}
      <div style={{ padding: '22px 16px 6px' }}><Subhead>From the Society</Subhead></div>
      <div style={{ padding: '0 16px' }}>
        <PostCard post={SAMPLE_POSTS[0]} compact />
      </div>
    </div>
  );
}
function QuickTile({ icon, title, blurb, tone }) {
  const bg = { lav: SS.lav, dew: SS.dew, sky: SS.sky, cloud: SS.cloud }[tone] || SS.open;
  return (
    <div style={{
      background: bg, borderRadius: 20, padding: 14, minHeight: 96,
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
    }}>
      <Icon name={icon} size={22} color={SS.plum} />
      <div>
        <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 14, color: SS.plum, letterSpacing: '-0.01em' }}>{title}</div>
        <Subtext style={{ color: 'rgba(66,26,49,0.7)' }}>{blurb}</Subtext>
      </div>
    </div>
  );
}

// ─────────────── Jobs feed ───────────────
function JobsScreen({ onOpenJob }) {
  const [active, setActive] = React.useState('All');
  const filters = ['All', 'ICU', 'L&D', 'ER', 'MedSurg', 'Saved'];
  return (
    <div style={{ paddingBottom: 110 }}>
      <div style={{ padding: '0 16px' }}>
        {/* search pill */}
        <div style={{
          background: SS.open, borderRadius: 9999, padding: '10px 14px',
          display: 'flex', gap: 8, alignItems: 'center', boxShadow: `inset 0 0 0 1px ${SS.line}`,
        }}>
          <Icon name="search" size={18} color={SS.fg2} />
          <input placeholder="13-week ICU in Denver" style={{
            border: 0, outline: 0, background: 'transparent', flex: 1,
            fontFamily: SS.font, fontWeight: 300, fontSize: 14, color: SS.plum,
          }}/>
          <Icon name="sliders" size={18} color={SS.fg2} />
        </div>
      </div>

      {/* filter chips */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '12px 16px', scrollbarWidth: 'none' }}>
        {filters.map(f => (
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

      {/* Results */}
      <div style={{ padding: '0 16px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Subhead>{SAMPLE_JOBS.length} matches</Subhead>
        <Subtext>sorted by · best fit</Subtext>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '8px 16px 16px' }}>
        {SAMPLE_JOBS.map(j => <JobRow key={j.id} job={j} onOpen={() => onOpenJob(j)} />)}
      </div>
    </div>
  );
}

function JobRow({ job, onOpen }) {
  const [saved, setSaved] = React.useState(false);
  return (
    <article onClick={onOpen} style={{
      background: SS.open, borderRadius: 22, padding: 16,
      boxShadow: `inset 0 0 0 1px ${SS.line}`, cursor: 'pointer',
      display: 'flex', flexDirection: 'column', gap: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <div style={{
          width: 48, height: 48, borderRadius: '14px 14px 14px 0',
          background: SS.dew, color: SS.plum, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: SS.font, fontWeight: 400, fontSize: 14, letterSpacing: '-0.02em',
          flex: '0 0 auto',
        }}>{job.hospital.split(' ').map(w => w[0]).slice(0, 2).join('')}</div>
        <div style={{ flex: 1 }}>
          <H3 style={{ fontSize: 16 }}>{job.role}</H3>
          <Body size={13} style={{ color: SS.fg2, marginTop: 1 }}>{job.hospital} · {job.city}</Body>
        </div>
        <button onClick={(e) => { e.stopPropagation(); setSaved(!saved); }} style={{
          background: 'transparent', border: 0, padding: 4, cursor: 'pointer', color: saved ? SS.plum : SS.fg3,
        }}>
          <Icon name={saved ? 'bookmark-fill' : 'bookmark'} size={20} color="currentColor" />
        </button>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <Chip tone="acc">{job.role.split(' ')[0]}</Chip>
        <Chip tone="tint">{job.weeks} wks</Chip>
        <Chip tone="out">{job.shift}</Chip>
        {job.tags.map(t => <Chip key={t} tone="out">{t}</Chip>)}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 4 }}>
        <div>
          <span style={{ fontFamily: SS.font, fontWeight: 400, letterSpacing: '-0.02em', fontSize: 22, color: SS.plum }}>${job.pay.toLocaleString()}</span>
          <Subtext style={{ marginLeft: 6 }}>per wk · starts {job.start}</Subtext>
        </div>
        <Icon name="chevron-right" size={18} color={SS.fg3} />
      </div>
    </article>
  );
}

// ─────────────── Job detail ───────────────
function JobDetailScreen({ job, onBack, onApply }) {
  return (
    <div style={{ paddingBottom: 140 }}>
      <ScreenHeader title="Assignment" onBack={onBack}
        right={<IconButton name="bookmark" />} />
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ background: SS.plum, borderRadius: 28, padding: 22, color: SS.open }}>
          <Subhead dark style={{ display: 'block', marginBottom: 8 }}>{job.hospital}</Subhead>
          <H1 dark style={{ fontSize: 28, lineHeight: 1.08 }}>{job.role} in {job.city.split(',')[0]}.</H1>
          <div style={{ marginTop: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <Chip tone="acc">{job.role.split(' ')[0]}</Chip>
            <Chip tone="tint">{job.weeks} weeks</Chip>
            <Chip tone="cloud">{job.shift}</Chip>
          </div>
        </div>
      </div>

      <div style={{ padding: '4px 16px 0', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        <StatTile label="Weekly pay"    value={`$${job.pay.toLocaleString()}`} foot="includes stipend" />
        <StatTile label="Start date"    value={job.start} foot={`${job.weeks}-week contract`} />
        <StatTile label="Location"      value={job.city.split(',')[0]} foot={job.city} />
        <StatTile label="Through"       value={job.agency} foot="verified partner" />
      </div>

      <div style={{ padding: '20px 16px 6px' }}><Subhead>What you'll see upfront</Subhead></div>
      <div style={{ padding: '0 16px' }}>
        <Card>
          <Body>
            Pay range, location, shift details, and start date are all visible here. Apply, and your recruiter at {job.agency} will follow up within one business day with next steps — not a single business week.
          </Body>
        </Card>
      </div>

      <div style={{ padding: '18px 16px 6px' }}><Subhead>Society notes</Subhead></div>
      <div style={{ padding: '0 16px' }}>
        <Card padding={14}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <div style={{ width: 32, height: 32, borderRadius: '9999px 9999px 9999px 0', background: SS.lav, color: SS.plum, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SS.font, fontSize: 13, flex: '0 0 auto' }}>M</div>
            <div>
              <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 13, color: SS.plum }}>Marisol O. · 3 contracts here</div>
              <Body size={13} style={{ marginTop: 2 }}>Parking's $0 with the ICU badge. Cafeteria coffee is medical-grade questionable — there's a Starbucks 2 floors down by the chapel.</Body>
            </div>
          </div>
        </Card>
      </div>

      <div style={{
        position: 'absolute', left: 12, right: 12, bottom: 18,
        background: SS.open, borderRadius: 28, padding: 12,
        boxShadow: '0 14px 30px -8px rgba(66,26,49,0.28), inset 0 0 0 1px rgba(66,26,49,0.08)',
        display: 'flex', gap: 10, alignItems: 'center',
      }}>
        <GhostButton style={{ flex: 1, justifyContent: 'center' }} icon="message-circle">Ask Erin</GhostButton>
        <PrimaryButton onClick={onApply} style={{ flex: 1.4 }} icon="check">Apply now</PrimaryButton>
      </div>
    </div>
  );
}
function StatTile({ label, value, foot }) {
  return (
    <div style={{ background: SS.open, borderRadius: 18, padding: 14, boxShadow: `inset 0 0 0 1px ${SS.line}` }}>
      <Subhead style={{ display: 'block', marginBottom: 4 }}>{label}</Subhead>
      <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 22, letterSpacing: '-0.02em', color: SS.plum }}>{value}</div>
      <Subtext style={{ color: SS.fg3 }}>{foot}</Subtext>
    </div>
  );
}

// ─────────────── Erin chat ───────────────
function ErinScreen({ onBack }) {
  const [thread, setThread] = React.useState([
    { who: 'erin', text: "Hey Lin — I see your Denver ICU contract wraps in 3 weeks. Want to start looking, or take a breath first?" },
    { who: 'you',  text: "Looking. ICU preferred, west coast if possible." },
    { who: 'erin', text: "Got it. I'm pulling ICU openings on the west coast starting late March, weekly pay $2,500+. Quick clarifier — open to nights, or days only?" },
  ]);
  const [draft, setDraft] = React.useState('');
  const send = () => {
    if (!draft.trim()) return;
    setThread(t => [...t, { who: 'you', text: draft }]);
    setDraft('');
    setTimeout(() => {
      setThread(t => [...t, { who: 'erin', text: "On it. Here are three that fit — I flagged two with housing stipend already." }]);
    }, 700);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ScreenHeader title="Erin" onBack={onBack}
        right={<IconButton name="settings" />} />
      <div style={{ padding: '0 16px 6px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 44, height: 44, borderRadius: '9999px 9999px 9999px 0', background: SS.lav, color: SS.plum, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SS.font, fontSize: 16, letterSpacing: '-0.02em' }}>E</div>
        <div>
          <H3 style={{ fontSize: 16 }}>Erin</H3>
          <Subtext>your scrubsociety guide · always on</Subtext>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px 120px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {thread.map((m, i) => m.who === 'you'
          ? <YouBubble key={i} text={m.text} />
          : <ErinBubble key={i} text={m.text} />)}
        {/* Suggested follow-ups */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
          <Chip tone="out">Nights OK</Chip>
          <Chip tone="out">Days only</Chip>
          <Chip tone="out">Either works</Chip>
        </div>
      </div>

      {/* Composer */}
      <div style={{
        position: 'absolute', left: 12, right: 12, bottom: 18,
        background: SS.open, borderRadius: 28, padding: '8px 8px 8px 16px',
        boxShadow: '0 14px 30px -8px rgba(66,26,49,0.28), inset 0 0 0 1px rgba(66,26,49,0.08)',
        display: 'flex', gap: 8, alignItems: 'center',
      }}>
        <input value={draft} onChange={e => setDraft(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="ask anything — pay, housing, the unit…"
          style={{ flex: 1, border: 0, outline: 0, background: 'transparent', fontFamily: SS.font, fontWeight: 300, fontSize: 14, color: SS.plum }} />
        <button onClick={send} style={{ width: 40, height: 40, borderRadius: 9999, border: 0, background: SS.plum, color: SS.open, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="send" size={18} color="currentColor" />
        </button>
      </div>
    </div>
  );
}
function ErinBubble({ text }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', maxWidth: '88%' }}>
      <div style={{ width: 26, height: 26, borderRadius: '9999px 9999px 9999px 0', background: SS.lav, color: SS.plum, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SS.font, fontSize: 11, flex: '0 0 auto' }}>E</div>
      <div style={{ background: SS.open, color: SS.plum, padding: '11px 14px', borderRadius: '4px 18px 18px 18px', boxShadow: `inset 0 0 0 1px ${SS.line}`, fontFamily: SS.font, fontWeight: 300, fontSize: 14, lineHeight: 1.45 }}>{text}</div>
    </div>
  );
}
function YouBubble({ text }) {
  return (
    <div style={{ alignSelf: 'flex-end', background: SS.plum, color: SS.open, padding: '11px 14px', borderRadius: '18px 18px 4px 18px', maxWidth: '82%', fontFamily: SS.font, fontWeight: 300, fontSize: 14, lineHeight: 1.45 }}>{text}</div>
  );
}

// ─────────────── Society feed ───────────────
function SocietyScreen() {
  return (
    <div style={{ paddingBottom: 110 }}>
      <div style={{ padding: '0 16px' }}>
        <H2>The Society</H2>
        <Body size={13} style={{ color: SS.fg2, marginTop: 4 }}>peer-reviewed. road-tested.</Body>
      </div>
      <div style={{ padding: '14px 16px', display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {['Latest', 'Following', 'ICU', 'L&D', 'Housing', 'Credentialing'].map((t, i) => (
          <span key={t} style={{
            fontFamily: SS.font, fontWeight: 400, fontSize: 13, padding: '7px 14px', borderRadius: 9999,
            background: i === 0 ? SS.plum : SS.open, color: i === 0 ? SS.open : SS.plum,
            boxShadow: i === 0 ? 'none' : `inset 0 0 0 1px ${SS.line}`, whiteSpace: 'nowrap', flex: '0 0 auto',
          }}>{t}</span>
        ))}
      </div>
      <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {SAMPLE_POSTS.map(p => <PostCard key={p.id} post={p} />)}
      </div>
    </div>
  );
}
function PostCard({ post, compact }) {
  return (
    <article style={{ background: SS.open, borderRadius: 22, padding: compact ? 14 : 16, boxShadow: `inset 0 0 0 1px ${SS.line}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: '9999px 9999px 9999px 0', background: post.avatar, color: SS.plum, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SS.font, fontSize: 14, letterSpacing: '-0.02em', flex: '0 0 auto' }}>{post.author[0]}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 14, color: SS.plum }}>{post.author}</div>
          <Subtext>{post.role}</Subtext>
        </div>
        <Subtext style={{ color: SS.fg3 }}>{post.when}</Subtext>
      </div>
      <Body size={14} style={{ marginTop: 12 }}>{post.body}</Body>
      {!compact && (
        <div style={{ display: 'flex', gap: 14, marginTop: 14, color: SS.fg2, alignItems: 'center' }}>
          <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}><Icon name="heart" size={16} />{post.likes}</span>
          <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}><Icon name="message-circle" size={16} />{post.comments}</span>
          <span style={{ marginLeft: 'auto' }}><Icon name="bookmark" size={16} /></span>
        </div>
      )}
    </article>
  );
}

// ─────────────── Profile ───────────────
function ProfileScreen() {
  return (
    <div style={{ paddingBottom: 110 }}>
      <div style={{ padding: '0 16px' }}>
        <div style={{ background: SS.plum, borderRadius: 28, padding: 22, color: SS.open, display: 'flex', gap: 16, alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ width: 72, height: 72, borderRadius: '9999px 9999px 9999px 0', background: SS.lav, color: SS.plum, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SS.font, fontSize: 28, letterSpacing: '-0.03em', flex: '0 0 auto' }}>LC</div>
          <div style={{ flex: 1 }}>
            <H2 dark style={{ fontSize: 22 }}>Lin Castro</H2>
            <Body dark size={13}>ICU travel RN · 4 yrs traveling</Body>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
              <Chip tone="acc">ICU</Chip>
              <Chip tone="tint">Compact license</Chip>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '14px 16px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        <ProfStat label="contracts" value="9" />
        <ProfStat label="states" value="6" />
        <ProfStat label="kudos" value="142" />
      </div>

      <div style={{ padding: '18px 16px 6px' }}><Subhead>Current</Subhead></div>
      <div style={{ padding: '0 16px' }}>
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <H3 style={{ fontSize: 16 }}>ICU travel RN</H3>
            <Chip tone="acc">3 weeks left</Chip>
          </div>
          <Body size={13} style={{ color: SS.fg2, marginTop: 2 }}>HCA Presbyterian · Denver, CO · started jan 6</Body>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <GhostButton icon="calendar">Log shift</GhostButton>
            <GhostButton icon="dollar">Pay history</GhostButton>
          </div>
        </Card>
      </div>

      <div style={{ padding: '18px 16px 6px' }}><Subhead>Account</Subhead></div>
      <div style={{ padding: '0 16px' }}>
        <Card padding={4}>
          {[
            { i: 'briefcase', t: 'Documents & credentials', s: 'BLS, ACLS, RN license · all current' },
            { i: 'building',  t: 'Housing preferences',    s: 'furnished, pet-friendly' },
            { i: 'bell',      t: 'Notifications',          s: 'jobs + erin replies on' },
            { i: 'settings',  t: 'Settings',               s: '' },
          ].map((row, i, arr) => (
            <div key={row.t} style={{
              display: 'flex', gap: 12, alignItems: 'center', padding: '14px 12px',
              borderBottom: i < arr.length - 1 ? `1px solid ${SS.lineSoft}` : 'none',
            }}>
              <Icon name={row.i} size={20} color={SS.plum} />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 14, color: SS.plum }}>{row.t}</div>
                {row.s && <Subtext>{row.s}</Subtext>}
              </div>
              <Icon name="chevron-right" size={18} color={SS.fg3} />
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
function ProfStat({ label, value }) {
  return (
    <div style={{ background: SS.open, borderRadius: 18, padding: 14, boxShadow: `inset 0 0 0 1px ${SS.line}`, textAlign: 'left' }}>
      <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 26, letterSpacing: '-0.03em', color: SS.plum, lineHeight: 1 }}>{value}</div>
      <Subtext style={{ display: 'block', marginTop: 4 }}>{label}</Subtext>
    </div>
  );
}

Object.assign(window, {
  HomeScreen, JobsScreen, JobDetailScreen, ErinScreen, SocietyScreen, ProfileScreen,
  JobRow, PostCard, SAMPLE_JOBS, SAMPLE_POSTS,
});
