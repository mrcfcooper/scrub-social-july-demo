/* global React, lucide */
// Scrub Society — shared mobile UI components

const Icon = ({ name, size = 20 }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide) window.lucide.createIcons({ nameAttr: 'data-lucide', icons: window.lucide.icons });
  });
  return <i ref={ref} data-lucide={name} style={{ width: size, height: size, display: 'inline-flex' }} />;
};

const TopBar = ({ showLogo = true, right }) => (
  <div className="ss-topbar">
    <div className="logo">{showLogo ? 'Scrub Society' : ''}</div>
    <div className="actions">
      {right || <>
        <button className="ss-iconbtn" aria-label="Search"><Icon name="search" /></button>
        <button className="ss-iconbtn" aria-label="Notifications"><Icon name="bell" /></button>
      </>}
    </div>
  </div>
);

const ChipRow = ({ items, active, onChange }) => (
  <div className="ss-chiprow">
    {items.map((c) => (
      <button key={c}
        className={`ss-chip ${active === c ? 'active' : ''}`}
        onClick={() => onChange && onChange(c)}>{c}</button>
    ))}
  </div>
);

const Post = ({ eyebrow, headline, byline, body, cover = 'sky' }) => (
  <div className="ss-post">
    <div className={`cover ${cover}`}>
      <div>
        <div className="eye">{eyebrow}</div>
        <div className="headline">{headline}</div>
      </div>
    </div>
    <div className="body">
      {byline && <div className="byline"><div className="avatar" /> {byline}</div>}
      {body && <p>{body}</p>}
    </div>
  </div>
);

const SectionHeading = ({ title, more = 'see all' }) => (
  <div className="ss-section">
    <h2>{title}</h2>
    <span className="more">{more}</span>
  </div>
);

const SpotlightCard = ({ name, role, img = '' }) => (
  <div className="ss-spot">
    <div className={`img ${img}`} />
    <div className="meta">
      <div className="name">{name}</div>
      <div className="role">{role}</div>
    </div>
  </div>
);

const JobRow = ({ title, location, pay, tags = [] }) => (
  <div className="ss-job">
    <div className="r1">
      <div className="title">{title}</div>
      <div className="pay">{pay}</div>
    </div>
    <div className="loc">{location}</div>
    <div className="tags">{tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
  </div>
);

const TabBar = ({ active, onChange }) => {
  const tabs = [
    { id: 'feed', label: 'feed', icon: 'home' },
    { id: 'jobs', label: 'jobs', icon: 'briefcase' },
    { id: 'community', label: 'community', icon: 'users' },
    { id: 'saved', label: 'saved', icon: 'bookmark' },
    { id: 'profile', label: 'you', icon: 'user' },
  ];
  return (
    <div className="ss-tabbar">
      {tabs.map(t => (
        <button key={t.id}
          className={`ss-tab ${active === t.id ? 'active' : ''}`}
          onClick={() => onChange && onChange(t.id)}>
          <Icon name={t.icon} size={22} />
          <span>{t.label}</span>
        </button>
      ))}
    </div>
  );
};

Object.assign(window, { Icon, TopBar, ChipRow, Post, SectionHeading, SpotlightCard, JobRow, TabBar });
