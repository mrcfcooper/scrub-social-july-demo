/* global React, lucide */

const WIcon = ({ name, size = 16 }) => (
  <i data-lucide={name} style={{ width: size, height: size, display: 'inline-flex' }} />
);
React.useEffect && (() => {})(); // (no-op; lucide call happens after render in index)

const Nav = ({ onJoin }) => (
  <nav className="w-nav">
    <div className="w-nav-inner">
      <a href="#" className="w-logo">Scrub Society</a>
      <div className="w-nav-links">
        <a href="#community">Community</a>
        <a href="#jobs">Jobs</a>
        <a href="#resources">Resources</a>
        <a href="#stories">Stories</a>
      </div>
      <div className="w-nav-cta">
        <button className="w-btn outline">Sign in</button>
        <button className="w-btn primary" onClick={onJoin}>Join</button>
      </div>
    </div>
  </nav>
);

const Hero = ({ onJoin }) => (
  <section className="w-hero">
    <div className="hero-grid">
      <div>
        <div className="subtext">scrubsociety.com</div>
        <h1 style={{ marginTop: 14 }}>Belong<br />everywhere.</h1>
        <p className="lead">
          A community and resource hub for travel nurses and allied health professionals
          who embody the adventurous, chapter-by-chapter life.
        </p>
        <div className="cta-row">
          <button className="w-btn primary lg" onClick={onJoin}>Join Scrub Society</button>
          <button className="w-btn outline lg">How it works</button>
        </div>
        <div className="meta">
          <span>65k members</span>
          <span>· 48 states</span>
          <span>· since 2021</span>
        </div>
      </div>
      <div className="w-hero-art">
        <div className="overlay"><div className="tag">better together</div></div>
      </div>
    </div>
  </section>
);

const Strip = () => (
  <div className="w-strip">
    <div className="w-strip-inner">
      <div className="item"><div className="num">65k</div><div className="lbl">members · nurses & allied health</div></div>
      <div className="item"><div className="num">140+</div><div className="lbl">agency partners reviewed</div></div>
      <div className="item"><div className="num">$3.4k</div><div className="lbl">median weekly travel pay</div></div>
      <div className="item"><div className="num">48</div><div className="lbl">states represented</div></div>
    </div>
  </div>
);

const Pillars = () => (
  <section className="w-pillars">
    <div className="container">
      <div className="head">
        <div className="eyebrow">what we do</div>
        <h2>Everything a traveling healthcare life asks of you — in one place.</h2>
      </div>
      <div className="grid">
        <div className="w-pillar">
          <div className="ic"><WIcon name="briefcase" size={24} /></div>
          <h3>Find a job.</h3>
          <p>Travel contracts and permanent roles from agencies we've actually worked with. Filter by specialty, shift, and weekly pay.</p>
          <a className="link" href="#">Browse openings <WIcon name="arrow-right" size={14} /></a>
        </div>
        <div className="w-pillar accent-lav">
          <div className="ic"><WIcon name="home" size={24} /></div>
          <h3>Find housing.</h3>
          <p>Short-term housing shared by travelers who've been there. Recommendations by city, not generic listings.</p>
          <a className="link" href="#">Explore housing <WIcon name="arrow-right" size={14} /></a>
        </div>
        <div className="w-pillar accent-dew">
          <div className="ic"><WIcon name="users" size={24} /></div>
          <h3>Find your people.</h3>
          <p>Circles by specialty and region. Mentorship from travelers with years on the road, advice from peers mid-assignment.</p>
          <a className="link" href="#">Meet the community <WIcon name="arrow-right" size={14} /></a>
        </div>
        <div className="w-pillar">
          <div className="ic"><WIcon name="book-open" size={24} /></div>
          <h3>Education pathways.</h3>
          <p>Certifications, CEUs, and the long-game moves that grow a traveling career into a lifelong one.</p>
          <a className="link" href="#">View pathways <WIcon name="arrow-right" size={14} /></a>
        </div>
        <div className="w-pillar accent-lav">
          <div className="ic"><WIcon name="compass" size={24} /></div>
          <h3>Travel support.</h3>
          <p>License compacts, tax guides, and city cheat sheets. The practical things you wish someone had told you on day one.</p>
          <a className="link" href="#">Get the guides <WIcon name="arrow-right" size={14} /></a>
        </div>
        <div className="w-pillar accent-dew">
          <div className="ic"><WIcon name="message-circle" size={24} /></div>
          <h3>Share experiences.</h3>
          <p>Post a spotlight, review an agency, or write your own "been-there" story. The library grows with every member.</p>
          <a className="link" href="#">Read spotlights <WIcon name="arrow-right" size={14} /></a>
        </div>
      </div>
    </div>
  </section>
);

const Spotlight = () => (
  <section className="w-spotlight">
    <div className="container">
      <div className="head">
        <div className="eyebrow">spotlights</div>
        <h2>You're in good company.</h2>
      </div>
      <div className="sp-grid">
        <div className="w-sp-card big">
          <div className="img art1" />
          <div className="meta">
            <div className="eye">MEMBER FEATURE</div>
            <h3>Your way and the highway.</h3>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--fg-muted)', marginTop: 8 }}>
              Kevin has worked in fourteen states in three years. Here's what he packs, where he stays, and the one thing he never travels without.
            </p>
            <div className="byline">@kevin.the.nurse · 6 min read</div>
          </div>
        </div>
        <div className="w-sp-card">
          <div className="img lav" />
          <div className="meta">
            <div className="eye">CAREER</div>
            <h3>5 must-know tips for evaluating a job offer.</h3>
            <div className="byline">scrub society editorial · 4 min</div>
          </div>
        </div>
        <div className="w-sp-card">
          <div className="img dew" />
          <div className="meta">
            <div className="eye">COMMUNITY</div>
            <h3>Happy nursiversary.</h3>
            <div className="byline">@lin.travels · 2 min</div>
          </div>
        </div>
        <div className="w-sp-card">
          <div className="img art2" />
          <div className="meta">
            <div className="eye">OCCUPATIONAL THERAPY</div>
            <h3>Kiara on finding flourish in your field.</h3>
            <div className="byline">@kiara.ot · 5 min</div>
          </div>
        </div>
        <div className="w-sp-card">
          <div className="img" />
          <div className="meta">
            <div className="eye">RESOURCES</div>
            <h3>The compact state license, explained.</h3>
            <div className="byline">scrub society guides · 7 min</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Join = ({ onJoin }) => (
  <section className="w-join">
    <div className="eyebrow">member sign-up</div>
    <h2 style={{ marginTop: 12 }}>Flourish in<br />your field.</h2>
    <p>Free to join. Free to stay. We'll never sell your data — we're built by travelers, for travelers.</p>
    <div className="cta-row">
      <button className="w-btn primary lg" onClick={onJoin}>Join Scrub Society</button>
      <button className="w-btn outline lg">Read the manifesto</button>
    </div>
  </section>
);

const Footer = () => (
  <footer className="w-footer">
    <div className="w-footer-inner">
      <div className="brand-block">
        <div className="logo">Scrub Society</div>
        <p>A community and resource hub for travel nurses and allied health professionals.</p>
        <div className="subtext" style={{ marginTop: 20, color: 'var(--morning-dew)', opacity: 0.6 }}>
          scrubsociety.com · @thescrubsociety
        </div>
      </div>
      <div>
        <h4>Community</h4>
        <ul>
          <li><a href="#">Circles</a></li>
          <li><a href="#">Spotlights</a></li>
          <li><a href="#">Mentorship</a></li>
          <li><a href="#">Events</a></li>
        </ul>
      </div>
      <div>
        <h4>Career</h4>
        <ul>
          <li><a href="#">Find a job</a></li>
          <li><a href="#">Agency reviews</a></li>
          <li><a href="#">Pay transparency</a></li>
          <li><a href="#">Contracts</a></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="#">About</a></li>
          <li><a href="#">Manifesto</a></li>
          <li><a href="#">Press</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </div>
    <div className="fine">
      <span>© 2026 scrub society · better together</span>
      <span>privacy · terms · cookies</span>
    </div>
  </footer>
);

const SignupModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(66,26,49,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100, padding: 20
    }} onClick={onClose}>
      <div className="w-signup" onClick={e => e.stopPropagation()}>
        <div className="subtext">member sign-up</div>
        <h2 style={{ marginTop: 10 }}>You're in good<br />company.</h2>
        <div className="fld">
          <label>First name</label>
          <input defaultValue="" placeholder="Kiara" />
        </div>
        <div className="fld">
          <label>Specialty</label>
          <input placeholder="e.g. Travel RN, ICU, OT" />
        </div>
        <div className="fld">
          <label>Email</label>
          <input placeholder="you@scrubsociety.com" />
        </div>
        <button className="w-btn primary lg" style={{ width: '100%', justifyContent: 'center', marginTop: 24 }}>
          Join Scrub Society
        </button>
        <div className="subtext" style={{ textAlign: 'center', marginTop: 16 }}>
          already a member? sign in
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Nav, Hero, Strip, Pillars, Spotlight, Join, Footer, SignupModal, WIcon });
