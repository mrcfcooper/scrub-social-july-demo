/* global React, Icon */

const ProfileScreen = () => {
  return (
    <div className="ss-screen">
      <div className="ss-prof-hero">
        <div style={{ paddingTop: 34 }}>
          <div className="big-avatar">K</div>
          <h1>Kiara Stone</h1>
          <div className="role">occupational therapist · 4 yrs</div>
          <div className="ss-prof-stats">
            <div className="stat"><div className="n">14</div><div className="l">assignments</div></div>
            <div className="stat"><div className="n">8</div><div className="l">states</div></div>
            <div className="stat"><div className="n">486</div><div className="l">community</div></div>
          </div>
        </div>
      </div>

      <div style={{ padding: '4px 16px 14px' }}>
        <button className="ss-btn outline wide">Edit profile</button>
      </div>

      <div className="ss-menu">
        {[
          { i: 'briefcase', t: 'My assignments' },
          { i: 'bookmark', t: 'Saved jobs & posts' },
          { i: 'map-pin', t: 'Housing searches' },
          { i: 'book-open', t: 'Learning pathways' },
        ].map(r => (
          <div className="ss-menurow" key={r.t}>
            <div className="ic"><Icon name={r.i} /></div>
            <div className="t">{r.t}</div>
            <span className="chev"><Icon name="chevron-right" size={16} /></span>
          </div>
        ))}
      </div>

      <div className="ss-menu">
        {[
          { i: 'bell', t: 'Notifications' },
          { i: 'settings', t: 'Settings' },
          { i: 'message-circle', t: 'Help & support' },
        ].map(r => (
          <div className="ss-menurow" key={r.t}>
            <div className="ic"><Icon name={r.i} /></div>
            <div className="t">{r.t}</div>
            <span className="chev"><Icon name="chevron-right" size={16} /></span>
          </div>
        ))}
      </div>

      <div style={{ padding: '6px 20px 20px', fontSize: 11, color: 'var(--fg-muted)',
        textTransform: 'lowercase' }}>
        scrub society v2.4 · @thescrubsociety
      </div>
    </div>
  );
};

window.ProfileScreen = ProfileScreen;
