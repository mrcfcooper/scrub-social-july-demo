/* global React, Icon */

const OnboardingScreen = () => {
  return (
    <div className="ss-screen" style={{ background: 'var(--plum-grove)', color: 'var(--morning-dew)',
      position: 'relative', overflow: 'hidden' }}>
      {/* Decorative color blocks */}
      <div style={{ position: 'absolute', top: 0, right: -60, width: 260, height: 260,
        borderRadius: '50%', background: 'var(--lavender-field)', opacity: 0.9 }} />
      <div style={{ position: 'absolute', top: 140, left: -80, width: 220, height: 220,
        borderRadius: '50%', background: 'var(--open-air)', opacity: 0.9 }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        padding: '60px 28px 28px', position: 'relative', zIndex: 2 }}>
        <div style={{ fontSize: 13, textTransform: 'lowercase', opacity: 0.75, marginBottom: 20 }}>
          scrubsociety.com
        </div>
        <div style={{ fontWeight: 400, fontSize: 56, letterSpacing: '-0.04em',
          lineHeight: 1.02, color: 'var(--morning-dew)' }}>
          Belong<br />everywhere.
        </div>
        <div style={{ fontWeight: 300, fontSize: 16, lineHeight: 1.5, marginTop: 20,
          color: 'var(--morning-dew)', opacity: 0.8, maxWidth: 320 }}>
          A community and resource hub for travel nurses and allied health professionals.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 36 }}>
          <button className="ss-btn wide" style={{
            background: 'var(--morning-dew)', color: 'var(--plum-grove)', fontSize: 16 }}>
            Join Scrub Society
          </button>
          <button className="ss-btn outline wide" style={{
            borderColor: 'var(--morning-dew)', color: 'var(--morning-dew)' }}>
            I have an account
          </button>
        </div>
        <div style={{ textAlign: 'center', fontSize: 12, opacity: 0.6, marginTop: 22,
          textTransform: 'lowercase' }}>
          better together
        </div>
      </div>
    </div>
  );
};

window.OnboardingScreen = OnboardingScreen;
