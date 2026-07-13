/* Facility Intel — presentation shell (gray canvas, labeled frames, flags panel) */
const { createRoot } = ReactDOM;

function Legend() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: T.font, fontWeight: 300, fontSize: 13, color: T.fg2 }}>
        <span style={{ width: 26, height: 16, borderRadius: 5, background: 'color-mix(in srgb, #BBAFEF 16%, #fff)', outline: '2px dashed rgba(66,26,49,0.30)', outlineOffset: -3 }} /> Phase 3 · target-state data
      </span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: T.font, fontWeight: 300, fontSize: 13, color: T.fg2 }}>
        <span style={{ width: 16, height: 16, borderRadius: 4, background: T.open, boxShadow: `inset 0 0 0 1px ${T.line}` }} /> live · verified facility data
      </span>
    </div>
  );
}

function FlagItem({ n, head, children }) {
  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <span style={{ width: 24, height: 24, flex: '0 0 auto', borderRadius: '8px 8px 8px 0', background: T.dew, color: T.plum, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: T.font, fontSize: 12.5 }}>{n}</span>
      <div>
        <div style={{ fontFamily: T.font, fontWeight: 400, fontSize: 14, color: T.fg1, marginBottom: 3 }}>{head}</div>
        <p style={{ fontFamily: T.font, fontWeight: 300, fontSize: 13, lineHeight: 1.5, color: T.fg2, margin: 0 }}>{children}</p>
      </div>
    </div>
  );
}

function FlagsPanel() {
  return (
    <div style={{ width: 1280, margin: '0 auto', borderRadius: 22, background: T.open, boxShadow: `inset 0 0 0 1px ${T.line}, 0 6px 16px -8px rgba(66,26,49,0.22)`, padding: 26 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        <Ic name="message-square" size={18} color={T.plum} />
        <h2 style={{ fontFamily: T.font, fontWeight: 400, letterSpacing: '-0.03em', fontSize: 19, color: T.fg1, margin: 0 }}>Where this fights the primitives</h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px 40px' }}>
        <FlagItem n="1" head="No Rating primitive in the kit">Built stars + breakdown bars from tokens. The 5-star metaphor reads a touch consumer-review-y for a clinician audience — the numeric average + bars are the on-brand spine; consider dropping stars entirely to stay closer to "structured intel, not a review free-for-all."</FlagItem>
        <FlagItem n="2" head="No quote-callout primitive">Composed on the speech-bubble radius + Soft Cloud card. The brand bans translucent panels over photos, so quotes sit on solid Cloud cards — never floated over the hero image.</FlagItem>
        <FlagItem n="3" head="StatTile / Rating aren't exported">The bundle defines StatTile but only exports it inside the mobile screens, and ships no Rating. Rebuilt MetaTile / NoteTile / Rating from Card + tokens so they stay consistent.</FlagItem>
        <FlagItem n="4" head="Icon set is ~30 glyphs">Parking, float, charting & housing needed car / shuffle / clipboard / home. Added a small extension at the same 1.75 stroke + currentColor rather than swapping icon systems.</FlagItem>
        <FlagItem n="5" head="Trust rules aren't enforced by primitives">Brand standards (no PHI, no named accusations, structured-tags-first) shape the data model, not the components. Attribution is role + length + season only; structured chips lead, freeform follows. Worth encoding into the contribution schema.</FlagItem>
        <FlagItem n="6" head="Desktop is web-only territory">The kit is mobile-first with a marketing-web set; there's no app-shell or sticky-sidebar pattern. Desktop honors "compose from cards" but the top bar + sticky rail are net-new and should be ratified.</FlagItem>
      </div>
    </div>
  );
}

function Frame({ label, meta, children }) {
  return (
    <div style={{ flex: '0 0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14, paddingLeft: 4 }}>
        <span style={{ fontFamily: T.font, fontWeight: 400, fontSize: 15, letterSpacing: '-0.01em', color: T.plum }}>{label}</span>
        <span style={{ fontFamily: T.font, fontWeight: 400, textTransform: 'lowercase', fontSize: 12.5, color: T.fg3 }}>{meta}</span>
      </div>
      {children}
    </div>
  );
}

function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#E9E4EA', backgroundImage: 'radial-gradient(rgba(66,26,49,0.06) 1px, transparent 1px)', backgroundSize: '22px 22px' }}>
      <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(233,228,234,0.86)', backdropFilter: 'blur(14px)', borderBottom: '1px solid rgba(66,26,49,0.10)', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <SMark size={28} color={T.plum} />
          <div>
            <div style={{ fontFamily: T.font, fontWeight: 400, fontSize: 18, letterSpacing: '-0.03em', color: T.plum }}>Facility Intel — full-screen page</div>
            <div style={{ fontFamily: T.font, fontWeight: 300, fontSize: 13, color: T.fg2 }}>Scrub Society · the community / facility moat · desktop + mobile</div>
          </div>
        </div>
        <Legend />
      </header>

      <main style={{ padding: '32px 40px 80px' }}>
        <FlagsPanel />
        <div style={{ display: 'flex', gap: 64, width: 'max-content', margin: '40px auto 0', alignItems: 'flex-start' }}>
          <Frame label="Desktop" meta="full-screen · 1280w">
            <div style={{ borderRadius: 18, overflow: 'hidden', boxShadow: '0 24px 60px -24px rgba(66,26,49,0.45), inset 0 0 0 1px rgba(66,26,49,0.08)' }}>
              <DesktopFacilityIntel />
            </div>
          </Frame>
          <Frame label="Mobile" meta="390w · iOS">
            <MobileFacilityIntel />
          </Frame>
        </div>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
