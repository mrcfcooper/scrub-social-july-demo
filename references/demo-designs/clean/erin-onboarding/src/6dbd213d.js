// Scrub Society — Erin onboarding · desktop frame
// Centered modal over a dimmed post-signup app. Reuses useErinFlow + Tray + MatchCard from erin-flow.jsx.
const { useState: useStateD } = React;
const SSd = window.SS;
const {
  Icon: IconD, SMark: SMarkD, JobRow: JobRowD, SAMPLE_JOBS: JOBS_D,
  PrimaryButton: PBtnD, GhostButton: GBtnD, IconButton: IBtnD,
  Body: BodyD, Subhead: SubheadD, Subtext: SubtextD, H1: H1D, H2: H2D, H3: H3D,
  useErinFlow: useErinFlowD, Tray: TrayD, MatchCard: MatchCardD, ErinAvatar: ErinAvatarD, ProgressBar: ProgressBarD,
  fillWith: fillWithD,
} = window;

// dimmed app behind the modal
function FauxApp() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: SSd.cloud, overflow: 'hidden' }}>
      {/* top nav */}
      <div style={{
        height: 64, background: SSd.open, boxShadow: `inset 0 -1px 0 ${SSd.line}`,
        display: 'flex', alignItems: 'center', gap: 30, padding: '0 32px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <SMarkD size={26} color={SSd.plum} />
          <span style={{ fontFamily: SSd.font, fontWeight: 400, fontSize: 18, letterSpacing: '-0.03em', color: SSd.plum }}>scrub society</span>
        </div>
        <div style={{ display: 'flex', gap: 24, marginLeft: 18 }}>
          {['Jobs', 'Society', 'Resources', 'Erin'].map((n, i) => (
            <span key={n} style={{ fontFamily: SSd.font, fontWeight: i === 0 ? 400 : 300, fontSize: 15, color: i === 0 ? SSd.plum : SSd.fg2 }}>{n}</span>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', width: 38, height: 38, borderRadius: '9999px 9999px 9999px 0', background: SSd.lav, color: SSd.plum, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: SSd.font, fontSize: 14 }}>LC</div>
      </div>
      {/* hero + cards */}
      <div style={{ padding: 32 }}>
        <div style={{ background: SSd.plum, borderRadius: 28, padding: '34px 36px', color: SSd.open, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -20, bottom: -40, opacity: 0.12 }}><SMarkD size={200} color={SSd.lav} /></div>
          <span style={{ fontFamily: SSd.font, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.62)' }}>good morning, lin</span>
          <H1D dark style={{ fontSize: 40, marginTop: 10 }}>Your next move, your way<span style={{ color: SSd.lav }}>.</span></H1D>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 20 }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ background: SSd.open, borderRadius: 20, padding: 18, boxShadow: `inset 0 0 0 1px ${SSd.line}`, height: 150 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// captured-so-far chips (live profile preview = field mapping made visible)
function CapturedChips({ data }) {
  const items = [];
  if (data.profession) items.push(data.profession);
  if (data.specialties && data.specialties.length) items.push(data.specialties.length > 1 ? `${data.specialties[0]} +${data.specialties.length - 1}` : data.specialties[0]);
  if (data.years) items.push(data.years);
  if (data.location) items.push(data.location);
  if (data.radius) items.push(data.radius);
  if (data.shift) items.push(data.shift);
  if (data.availability) items.push(data.availability);
  if (!items.length) return null;
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 20 }}>
      {items.map((t, i) => (
        <span key={i} style={{ fontFamily: SSd.font, fontSize: 12.5, color: SSd.plum, background: SSd.dew, padding: '5px 11px', borderRadius: 9999, display: 'inline-flex', gap: 5, alignItems: 'center' }}>
          <IconD name="check" size={12} color={SSd.plum} />{t}
        </span>
      ))}
    </div>
  );
}

function DesktopModalBody({ snap, h, start }) {
  if (snap.phase === 'welcome') {
    return (
      <div style={{ padding: '44px 44px 40px', textAlign: 'left' }}>
        <ErinAvatarD size={56} />
        <span style={{ display: 'block', marginTop: 20, fontFamily: SSd.font, fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase', color: SSd.fg3 }}>{ERIN.copy.welcomeKicker}</span>
        <H1D style={{ fontSize: 44, marginTop: 10 }}>{ERIN.copy.welcomeHeadline}</H1D>
        <BodyD size={16} style={{ color: SSd.fg2, marginTop: 16, maxWidth: 440 }}>{ERIN.copy.welcomeBody}</BodyD>
        <div style={{ display: 'flex', gap: 12, marginTop: 28, alignItems: 'center' }}>
          <PBtnD icon="arrow-right" onClick={start} style={{ flexDirection: 'row-reverse', fontSize: 16, padding: '15px 26px' }}>{ERIN.copy.welcomeCta}</PBtnD>
          <GBtnD onClick={start}>{ERIN.copy.welcomeSkip}</GBtnD>
        </div>
      </div>
    );
  }

  if (snap.phase === 'results') {
    return (
      <div style={{ padding: '30px 36px 34px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <IBtnD name="arrow-left" onClick={h.onBack} />
          <div>
            <span style={{ fontFamily: SSd.font, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: SSd.fg3 }}>{ERIN.copy.resultsKicker}</span>
            <H2D style={{ fontSize: 26 }}>{ERIN.matchCount} matches for you</H2D>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '12px 0 14px' }}>
          <span style={{ width: 7, height: 7, borderRadius: 9999, background: SSd.lav }} />
          <SubtextD style={{ color: SSd.fg3 }}>proactive ranking is target-state · phase 2</SubtextD>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, maxHeight: 360, overflowY: 'auto', paddingRight: 4 }}>
          {JOBS_D.map(j => <JobRowD key={j.id} job={j} onOpen={() => {}} />)}
        </div>
      </div>
    );
  }

  const step = ERIN.steps[snap.stepIdx];
  const isMatch = snap.phase === 'match';
  const answered = (snap.phase === 'finding' || snap.phase === 'match') ? 7 : snap.stepIdx;
  return (
    <div style={{ padding: '26px 36px 30px' }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <ErinAvatarD size={42} />
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: SSd.font, fontWeight: 400, fontSize: 17, color: SSd.plum, letterSpacing: '-0.01em' }}>
            {isMatch ? 'Here’s what I found for you' : 'Let’s set up your matches'}
          </div>
          <SubtextD style={{ color: SSd.fg3 }}>{isMatch ? 'sorted by best match' : 'with erin · about a minute'}</SubtextD>
        </div>
        <IBtnD name="x" onClick={h.onReset} />
      </div>
      <div style={{ margin: '18px 0 22px' }}>
        <ProgressBarD answered={answered} current={snap.stepIdx} />
      </div>

      <CapturedChips data={snap.data} />

      {isMatch ? (
        <div>
          <BodyD size={15.5} style={{ color: SSd.fg1, marginBottom: 16 }}>{fillWithD(ERIN.copy.matchIntro, snap.data)}</BodyD>
          <MatchCardD />
          <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
            <PBtnD icon="arrow-right" onClick={h.onSeeAll} style={{ flexDirection: 'row-reverse' }}>{fillWithD(ERIN.copy.seeAll, snap.data)}</PBtnD>
            <GBtnD icon="message-circle" onClick={h.onReset}>{ERIN.copy.keepChatting}</GBtnD>
          </div>
        </div>
      ) : snap.phase === 'finding' ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '20px 0' }}>
          <IconD name="sparkles" size={18} color={SSd.fg3} />
          <BodyD style={{ color: SSd.fg2 }}>{fillWithD(ERIN.copy.findingLead, snap.data)}</BodyD>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', maxWidth: 460, marginBottom: 20 }}>
            <ErinAvatarD size={26} />
            <div style={{ background: SSd.open, color: SSd.plum, padding: '12px 16px', borderRadius: '4px 18px 18px 18px', boxShadow: `inset 0 0 0 1px ${SSd.line}`, fontFamily: SSd.font, fontWeight: 300, fontSize: 16, lineHeight: 1.5 }}>
              {fillWithD(step.ask, snap.data)}
            </div>
          </div>
          <TrayD snap={snap} h={h} />
        </div>
      )}

      {/* footer — reinforces profile mapping */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 26, paddingTop: 16, boxShadow: `inset 0 1px 0 ${SSd.lineSoft}` }}>
        <IconD name="check" size={14} color={SSd.fg3} />
        <SubtextD style={{ color: SSd.fg3 }}>your answers save straight to your scrub society profile — no re-asking later</SubtextD>
      </div>
    </div>
  );
}

function DesktopOnboarding({ width = 1180, height = 800 }) {
  const { snap, h, start } = useErinFlowD();
  return (
    <div style={{
      width, height, borderRadius: 16, overflow: 'hidden', position: 'relative',
      background: SSd.cloud, boxShadow: '0 40px 90px -30px rgba(66,26,49,0.45), inset 0 0 0 1px rgba(66,26,49,0.1)',
    }}>
      <FauxApp />
      {/* scrim */}
      <div style={{ position: 'absolute', inset: 0, background: 'color-mix(in srgb, #421A31 52%, transparent)', backdropFilter: 'blur(2px)' }} />
      {/* modal */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{
          width: 600, maxHeight: height - 64, overflowY: 'auto', background: SSd.open, borderRadius: 28,
          boxShadow: '0 30px 60px -20px rgba(66,26,49,0.5)',
        }}>
          <DesktopModalBody snap={snap} h={h} start={start} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DesktopOnboarding, FauxApp, CapturedChips, DesktopModalBody });
