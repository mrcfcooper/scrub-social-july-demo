/* global React, TopBar, SectionHeading, Icon */

const CommunityScreen = () => {
  return (
    <div className="ss-screen">
      <TopBar />
      <div style={{ padding: '0 20px 4px' }}>
        <div style={{ fontWeight: 400, fontSize: 32, letterSpacing: '-0.04em', lineHeight: 1.02 }}>
          Better together.
        </div>
      </div>

      <SectionHeading title="Your circles" more="manage" />
      <div style={{ padding: '0 16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { name: 'West Coast travelers', members: '2,104', icon: 'plane', bg: 'var(--clear-sky)' },
          { name: 'OT in acute care', members: '486', icon: 'heart', bg: 'var(--lavender-field)' },
          { name: 'First-year travelers', members: '1,203', icon: 'compass', bg: 'var(--morning-dew)' },
        ].map(c => (
          <div key={c.name} style={{
            background: 'var(--soft-cloud)', borderRadius: 20, padding: 14,
            display: 'flex', alignItems: 'center', gap: 14, border: '1px solid var(--border)'
          }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: c.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={c.icon} size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 15, letterSpacing: '-0.005em' }}>{c.name}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-muted)', textTransform: 'lowercase', marginTop: 2 }}>
                {c.members} members · 3 new today
              </div>
            </div>
            <Icon name="chevron-right" size={16} />
          </div>
        ))}
      </div>

      <SectionHeading title="Recent threads" />
      <div style={{ padding: '0 16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { q: 'First travel assignment — what would you tell past-you?', replies: 47, grp: 'first-year travelers' },
          { q: 'Housing in Seattle — anyone used Furnished Finder recently?', replies: 23, grp: 'west coast travelers' },
          { q: 'Evaluating a contract with no guaranteed hours?', replies: 31, grp: 'travel rn' },
        ].map((t, i) => (
          <div key={i} style={{
            background: 'var(--soft-cloud)', borderRadius: 20, padding: 16,
            border: '1px solid var(--border)'
          }}>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em',
              color: 'var(--fg-muted)', fontWeight: 500 }}>{t.grp}</div>
            <div style={{ fontWeight: 400, fontSize: 17, letterSpacing: '-0.02em',
              lineHeight: 1.2, marginTop: 6 }}>{t.q}</div>
            <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginTop: 10,
              textTransform: 'lowercase' }}>{t.replies} replies · 2h</div>
          </div>
        ))}
      </div>

      <div style={{ height: 12 }} />
    </div>
  );
};

window.CommunityScreen = CommunityScreen;
