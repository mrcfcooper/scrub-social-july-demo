// Erin chat widget — page assembly: masthead, storyboard strip, interactive frames, notes.

const LEAD = "On it. Three ICU openings out west, starting late March, $2,500+ weekly. I flagged the two with housing already sorted.";
const PROACTIVE = "Hey Lin — heads up, your Denver ICU contract wraps in 3 weeks. Want to start looking, or take a breath first?";
const Q_SOCIETY = "How's the ICU ratio on nights at Providence St. Vincent (Portland)?";

// ─────────── storyboard frames ───────────
const FRAMES = [
  {
    n: '01', title: 'Welcome / empty state', tone: 'live',
    caption: 'Cold open. Reactive intro + starter prompts — the live path. No proactive nudge here.',
    height: 524, beats: [
      { kind: 'erin', text: "Hey Lin — I'm Erin, your Society guide. I actually know travel healthcare: pay packages, license stuff, housing, and which units staff their ratios. What are we working on?" },
      { kind: 'chips', items: ['Find ICU jobs', 'Is my pay fair?', 'Compact license', 'Housing help'] },
    ],
  },
  {
    n: '02', title: 'Typing indicator', tone: 'mixed',
    caption: 'User answers; Erin pulls live matches while the dots run. Proactive opener carries a target-state pill.',
    height: 524, beats: [
      { kind: 'erin', target: true, text: PROACTIVE },
      { kind: 'you', text: "Looking. ICU, west coast if I can get it." },
      { kind: 'typing' },
    ],
  },
  {
    n: '03a', title: 'Job match · compact row', tone: 'target',
    caption: 'Variant A — dense rows; several matches scan at once. Proactive push = target state.',
    height: 524, scrollBottom: true, beats: [
      { kind: 'jobs', target: true, text: LEAD, variant: 'compact', items: MATCHES },
      { kind: 'chips', items: ['Talk to a recruiter', 'Ask the Society'] },
    ],
  },
  {
    n: '03b', title: 'Job match · rich card', tone: 'target',
    caption: 'Variant B — chips, pay block, in-card actions. The Card-primitive fork for Michael.',
    height: 524, scrollBottom: true, beats: [
      { kind: 'jobs', target: true, text: LEAD, variant: 'rich', items: MATCHES.slice(0, 2) },
    ],
  },
  {
    n: '04', title: 'Recruiter handoff', tone: 'live',
    caption: 'The live human path — HUMAN_PENDING → HUMAN_ASSIGNED. Erin steps back; a real recruiter takes over.',
    height: 524, scrollBottom: true, beats: [
      { kind: 'erin', text: "Want a human in the loop? I can hand this to your recruiter at Aya — they'll confirm details and submit you." },
      { kind: 'handoff' },
      { kind: 'system', icon: 'clock', text: 'connecting you with a recruiter…' },
      { kind: 'system', text: 'maria from aya joined the chat' },
      { kind: 'recruiter', name: 'Maria', agency: 'Aya', text: "Hi Lin! I've got the Portland ICU role pulled up — $2,680/wk with the stipend. Want me to submit you today?" },
    ],
  },
  {
    n: '05', title: 'Ask someone (the Society)', tone: 'target',
    caption: 'Target state — routes the question to the community feed for peer travelers. Separate from the recruiter handoff.',
    height: 524, scrollBottom: true, beats: [
      { kind: 'erin', target: true, text: "Want more than my take? I can post this to the Society — travelers who've worked these units can weigh in." },
      { kind: 'asksociety', question: Q_SOCIETY },
      { kind: 'system', text: 'posted to the society' },
      { kind: 'peer', author: 'Devon R.', role: 'icu · 3 contracts there', body: "Ratio's a true 2:1 on nights and charge actually protects your breaks. Parking's free with the ICU badge.", likes: 14 },
    ],
  },
];

function ToneTag({ tone }) {
  const map = {
    live:   { t: 'live', bg: 'rgba(31,138,91,0.14)', fg: '#1F6B49' },
    target: { t: 'target state', bg: 'rgba(187,175,239,0.30)', fg: SS.plum },
    mixed:  { t: 'live + target', bg: 'rgba(130,171,244,0.20)', fg: SS.plum },
  };
  const m = map[tone] || map.live;
  return (
    <span style={{
      fontFamily: SS.font, fontWeight: 400, fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
      color: m.fg, background: m.bg, padding: '3px 9px', borderRadius: 9999,
      border: tone === 'target' ? '1px dashed rgba(66,26,49,0.35)' : '0',
    }}>{m.t}</span>
  );
}

function StoryFrame({ f }) {
  return (
    <div style={{ width: 326, flex: '0 0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <span style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 13, color: SS.fg3, letterSpacing: '0.02em' }}>{f.n}</span>
        <span style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 15, color: SS.plum, letterSpacing: '-0.01em' }}>{f.title}</span>
        <ToneTag tone={f.tone} />
      </div>
      <div style={{
        borderRadius: 22, overflow: 'hidden', background: SS.open,
        boxShadow: '0 18px 40px -20px rgba(66,26,49,0.35), inset 0 0 0 1px rgba(66,26,49,0.08)',
      }}>
        <ErinSurfaceStatic beats={f.beats} variant="popover" height={f.height} scrollBottom={f.scrollBottom} />
      </div>
      <p style={{ fontFamily: SS.font, fontWeight: 300, fontSize: 12.5, lineHeight: 1.5, color: SS.fg2, margin: 0, textWrap: 'pretty' }}>{f.caption}</p>
    </div>
  );
}

// ─────────── section heading ───────────
function SectionHead({ over, title, sub }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <Subhead style={{ display: 'block', marginBottom: 9 }}>{over}</Subhead>
      <H2 style={{ fontSize: 30 }}>{title}</H2>
      {sub && <Body size={14.5} style={{ color: SS.fg2, marginTop: 8, maxWidth: 620 }}>{sub}</Body>}
    </div>
  );
}

// ─────────── notes ───────────
function NoteList({ title, items }) {
  return (
    <div style={{ background: SS.open, borderRadius: 22, padding: 24, boxShadow: `inset 0 0 0 1px ${SS.line}`, flex: 1, minWidth: 300 }}>
      <H3 style={{ fontSize: 17, marginBottom: 14 }}>{title}</H3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', gap: 11 }}>
            <span style={{ width: 7, height: 7, borderRadius: '9999px 9999px 9999px 0', background: SS.lav, flex: '0 0 auto', marginTop: 6 }} />
            <div>
              <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 14, color: SS.plum, letterSpacing: '-0.01em' }}>{it.h}</div>
              <Body size={13} style={{ color: SS.fg2, marginTop: 2 }}>{it.b}</Body>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const FLAGS = [
  { h: 'No chat primitives exist yet', b: 'Bubbles live inside screens.jsx and aren’t exported; the message radii (4 18 18 18 / 18 18 4 18) are bespoke and not in the --ss-radius scale. Recommend promoting ErinBubble / YouBubble + two bubble-radius tokens into the kit.' },
  { h: 'White Erin bubbles need a tinted thread', b: 'On a pure Open Air surface the white bubble + hairline nearly vanishes — it only reads because the device sits on iOS gray. The popover tints its thread with a ~3.5% Plum wash. That surface token isn’t defined; it should be.' },
  { h: 'Lavender does double duty', b: 'Lavender Field is both Erin’s identity (avatar) and the accent CTA color. In-thread that risks reading her avatar and the primary action as the same thing. Kept CTAs on Plum inside the chat to separate them.' },
  { h: 'Icon set has no human-support glyph', b: 'No phone / headset / agent icon ships in the Lucide subset, so the recruiter affordance borrows a hand-drawn headset. Add headset + clock to the kit if handoff ships.' },
  { h: 'lowercase subtext vs. proper nouns', b: 'The subtext role is lower-case by rule, but recruiter names and agencies (Maria · Aya) must keep caps. Names use Body/Regular here, not Subtext — worth an explicit carve-out in the type rules.' },
];

const TARGETS = [
  { h: 'Proactive openers — Phase 2', b: 'Erin noticing the contract is wrapping and pushing matches unprompted is the agent loop. Every proactive message carries the target-state pill.' },
  { h: 'Ask the Society — Phase 3', b: 'Routing a question to the community feed (peer Q&A) is later than launch. Whole card + the returning peer answer are pilled target state.' },
  { h: 'Recruiter handoff is LIVE', b: 'The HUMAN_PENDING → HUMAN_ASSIGNED takeover is the shipping human path — no target pill. Erin yields; a real recruiter posts in-thread.' },
  { h: 'Staging degrades to CSS-only', b: 'The standalone HTML paste for staging is pure CSS, no JS — the clickable composer collapses to the checkbox-hack stepper there. Full interactivity (this prototype) is the design reference, not the staging artifact.' },
];

// ─────────── page ───────────
function Page() {
  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '46px 28px 90px' }}>
      {/* masthead */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 16 }}>
        <SMark size={26} />
        <span style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 14, color: SS.fg2 }}>Scrub Society</span>
        <span style={{ width: 4, height: 4, borderRadius: 9999, background: SS.fg3 }} />
        <span style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 14, color: SS.fg2, letterSpacing: '0.04em' }}>TSS-1108</span>
      </div>
      <H1 style={{ fontSize: 46, maxWidth: 760 }}>Erin chat widget<span style={{ color: SS.lav }}>.</span></H1>
      <Body size={16} style={{ color: SS.fg2, marginTop: 14, maxWidth: 640 }}>
        Built on the Scrub Society bubble + job-card vocabulary. Mobile-primary, full-screen; desktop docks as a popover. Storyboard documents the dev handoff; the live frames sell the feel.
      </Body>

      {/* legend */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 22 }}>
        <LegendItem><TargetPill /> proactive / Phase 2–3, not in the first build</LegendItem>
        <LegendItem><span style={{ width: 9, height: 9, borderRadius: 9999, background: '#1F8A5B' }} /> live path — ships in v1</LegendItem>
        <LegendItem><Icon name="message-circle" size={15} color={SS.plum} /> two job-card variants (03a / 03b) for the Card-primitive fork</LegendItem>
      </div>

      <Hr />

      {/* storyboard */}
      <SectionHead over="Storyboard · the review + handoff artifact"
        title="Five states, one thread"
        sub="Each frame is the same widget surface at a different beat. Read left to right: welcome, typing, the two job-card variants, the live recruiter handoff, and the target-state community route." />
      <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap', rowGap: 40 }}>
        {FRAMES.map(f => <StoryFrame key={f.n} f={f} />)}
      </div>

      <Hr />

      {/* interactive mobile */}
      <SectionHead over="Interactive · mobile (primary)"
        title="The full-screen Erin tab"
        sub="Tap the suggestion chips to drive the flow — Erin replies with matches, the recruiter takeover, or the Society route. Or type anything in the composer." />
      <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '0 0 auto' }}>
          <IOSDevice width={372} height={760}>
            <div style={{ height: '100%' }}>
              <ErinInteractive variant="mobile" />
            </div>
          </IOSDevice>
        </div>
        <div style={{ flex: 1, minWidth: 280, maxWidth: 420, paddingTop: 8 }}>
          <HintRow n="1" t="Proactive open" b="Erin starts with the contract-wrap nudge (target state) — tap “Start looking” or “Find ICU jobs.”" />
          <HintRow n="2" t="Inline matches" b="Rich job cards land in the thread. “See compact list” swaps to the dense variant." />
          <HintRow n="3" t="Human or peers" b="“Talk to a recruiter” triggers the live takeover; “Ask the Society” posts to the community." />
          <HintRow n="4" t="Free text" b="The composer is wired — ask about housing, pay, or licenses and Erin routes a canned reply." />
        </div>
      </div>

      <Hr />

      {/* interactive desktop */}
      <SectionHead over="Interactive · desktop"
        title="Docked popover over the jobs page"
        sub="The widget reads as a popover only because there’s a page behind it — here, a saved ICU search. The launcher state (closed) sits to the right with its proactive nudge." />
      <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '0 0 auto' }}>
          <ChromeWindow width={1000} height={660} url="scrubsociety.com/jobs" tabs={[{ title: 'Jobs · Scrub Society' }, { title: 'Compact license' }]}>
            <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, overflow: 'auto' }}>
                <DesktopHostPage />
              </div>
              <ErinPopover interactive width={384} height={560} />
            </div>
          </ChromeWindow>
        </div>
        <div style={{ flex: '0 0 auto', width: 300 }}>
          <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 13, color: SS.plum, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
            Closed state <ToneTag tone="mixed" />
          </div>
          <div style={{
            position: 'relative', height: 360, borderRadius: 16, overflow: 'hidden',
            background: '#FBFAF7', boxShadow: `inset 0 0 0 1px ${SS.line}`,
          }}>
            <div style={{ padding: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                <SMark size={20} /><span style={{ fontFamily: SS.font, fontSize: 14, color: SS.plum }}>Scrub Society</span>
              </div>
              <div style={{ height: 10, width: '70%', borderRadius: 9999, background: 'rgba(66,26,49,0.08)', marginBottom: 9 }} />
              <div style={{ height: 10, width: '52%', borderRadius: 9999, background: 'rgba(66,26,49,0.06)', marginBottom: 18 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                {[0, 1, 2].map(i => <div key={i} style={{ height: 46, borderRadius: 12, background: SS.open, boxShadow: `inset 0 0 0 1px ${SS.line}` }} />)}
              </div>
            </div>
            <ErinLauncher />
          </div>
          <p style={{ fontFamily: SS.font, fontWeight: 300, fontSize: 12.5, lineHeight: 1.5, color: SS.fg2, marginTop: 12, textWrap: 'pretty' }}>
            Plum launcher (the bubble already live on the site) with an unread count. The proactive nudge above it is target state.
          </p>
        </div>
      </div>

      <Hr />

      {/* notes */}
      <SectionHead over="Handoff notes" title="Reading the design" />
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <NoteList title="Where it fights the primitives" items={FLAGS} />
        <NoteList title="Target-state index & build notes" items={TARGETS} />
      </div>
    </div>
  );
}

function LegendItem({ children }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 13px', borderRadius: 9999,
      background: SS.open, boxShadow: `inset 0 0 0 1px ${SS.line}`,
      fontFamily: SS.font, fontWeight: 300, fontSize: 12.5, color: SS.fg1,
    }}>{children}</span>
  );
}
function HintRow({ n, t, b }) {
  return (
    <div style={{ display: 'flex', gap: 13, marginBottom: 18 }}>
      <div style={{
        width: 28, height: 28, borderRadius: '9px 9px 9px 0', flex: '0 0 auto',
        background: SS.lav, color: SS.plum, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: SS.font, fontWeight: 400, fontSize: 13,
      }}>{n}</div>
      <div>
        <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 15, color: SS.plum, letterSpacing: '-0.01em' }}>{t}</div>
        <Body size={13.5} style={{ color: SS.fg2, marginTop: 2 }}>{b}</Body>
      </div>
    </div>
  );
}
function Hr() {
  return <div style={{ height: 1, background: 'rgba(66,26,49,0.10)', margin: '46px 0' }} />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Page />);
