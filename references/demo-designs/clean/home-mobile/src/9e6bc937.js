// Scrub Society — Mobile Home (focused launchpad)
// Composes ONLY design-system primitives (components.jsx) + sample data (screens.jsx).
// A launchpad, not the long web home: compact greeting + search, condensed quick
// actions, one featured-jobs strip, one Erin teaser, one Society event teaser.

// ── Section header: label + optional "see all" route link ──
function SectionHead({ children, action, onAction }) {
  return (
    <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
      <Subhead>{children}</Subhead>
      {action && (
        <button onClick={onAction} style={{
          border: 0, background: 'transparent', cursor: 'pointer', padding: 0,
          fontFamily: SS.font, fontWeight: 400, fontSize: 13, color: SS.plum,
          display: 'inline-flex', alignItems: 'center', gap: 4,
        }}>
          {action}<Icon name="arrow-right" size={14} color="currentColor" />
        </button>
      )}
    </div>
  );
}

// ── Quick action tile (condensed action set) ──
function ActionTile({ icon, title, blurb, tone, onClick }) {
  const bg = { lav: SS.lav, dew: SS.dew, sky: SS.sky, cloud: SS.cloud }[tone] || SS.open;
  const [press, setPress] = React.useState(false);
  return (
    <button
      onClick={onClick}
      onPointerDown={() => setPress(true)}
      onPointerUp={() => setPress(false)}
      onPointerLeave={() => setPress(false)}
      style={{
        textAlign: 'left', border: 0, cursor: 'pointer',
        background: bg, borderRadius: 20, padding: 14, minHeight: 104,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        transform: press ? 'scale(0.98)' : 'none',
        transition: 'transform 120ms cubic-bezier(0.4,0,0.2,1)',
        boxShadow: tone === 'cloud' ? `inset 0 0 0 1px ${SS.line}` : 'none',
      }}>
      <span style={{
        width: 38, height: 38, borderRadius: '12px 12px 12px 0',
        background: 'rgba(66,26,49,0.10)', display: 'inline-flex',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon name={icon} size={20} color={SS.plum} />
      </span>
      <div>
        <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 15, color: SS.plum, letterSpacing: '-0.01em' }}>{title}</div>
        <Subtext style={{ color: 'rgba(66,26,49,0.66)' }}>{blurb}</Subtext>
      </div>
    </button>
  );
}

// ── Featured job card (horizontal strip) ──
function FeaturedJobCard({ job, onOpen }) {
  return (
    <button onClick={onOpen} style={{
      textAlign: 'left', border: 0, cursor: 'pointer',
      minWidth: 232, maxWidth: 232, background: SS.open, borderRadius: 22,
      boxShadow: `inset 0 0 0 1px ${SS.line}`, padding: 16,
      display: 'flex', flexDirection: 'column', gap: 0, flex: '0 0 auto',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{
          width: 40, height: 40, borderRadius: '12px 12px 12px 0',
          background: SS.dew, color: SS.plum, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: SS.font, fontWeight: 400, fontSize: 13, letterSpacing: '-0.02em',
        }}>{job.hospital.split(' ').map(w => w[0]).slice(0, 2).join('')}</span>
        <Subtext style={{ marginLeft: 'auto', color: SS.fg3 }}>{job.weeks} wks</Subtext>
      </div>
      <H3 style={{ fontSize: 17 }}>{job.role}</H3>
      <Body size={13} style={{ color: SS.fg2, marginTop: 2 }}>{job.hospital} · {job.city}</Body>
      <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
        <Chip tone="acc" style={{ whiteSpace: 'nowrap' }}>{job.role.split(' ')[0]}</Chip>
        <Chip tone="out" style={{ whiteSpace: 'nowrap' }}>{job.tags[0]}</Chip>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 14 }}>
        <span style={{ fontFamily: SS.font, fontWeight: 400, letterSpacing: '-0.02em', fontSize: 22, color: SS.plum }}>${job.pay.toLocaleString()}</span>
        <Subtext style={{ color: SS.fg3 }}>per wk</Subtext>
      </div>
    </button>
  );
}

// ── Main launchpad ──
function HomeLaunchpad({ onOpenJob, onGo }) {
  return (
    <div style={{ paddingBottom: 112, display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* 1 — Compact greeting + search entry, on dark Plum Grove */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ background: SS.plum, borderRadius: 28, padding: 20, position: 'relative', overflow: 'hidden' }}>
          <Subhead dark style={{ display: 'block', marginBottom: 6 }}>tuesday · good morning</Subhead>
          <H2 dark style={{ fontSize: 26, position: 'relative', zIndex: 1 }}>
            Where to next, Lin<span style={{ color: SS.lav }}>?</span>
          </H2>

          {/* Unified search / "what can we help you with" entry */}
          <button onClick={() => onGo('jobs')} style={{
            marginTop: 16, width: '100%', cursor: 'pointer', border: 0,
            background: SS.open, borderRadius: 9999, padding: '12px 12px 12px 16px',
            display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 1,
            boxShadow: '0 6px 18px -8px rgba(0,0,0,0.4)',
          }}>
            <Icon name="search" size={18} color={SS.fg2} />
            <span style={{ flex: 1, textAlign: 'left', fontFamily: SS.font, fontWeight: 300, fontSize: 14, color: SS.fg2 }}>What can we help you with?</span>
            <span style={{
              width: 34, height: 34, borderRadius: 9999, background: SS.lav,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
            }}>
              <Icon name="sparkles" size={17} color={SS.plum} />
            </span>
          </button>

          {/* decorative S watermark */}
          <div style={{ position: 'absolute', right: -16, top: -18, opacity: 0.12, zIndex: 0 }}>
            <SMark size={130} color={SS.lav} />
          </div>
        </div>
      </div>

      {/* 2 — Quick actions (condensed action set) */}
      <div>
        <SectionHead>Quick actions</SectionHead>
        <div style={{ padding: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <ActionTile icon="map-pin"    title="Compact license"  blurb="renew in 11 min"      tone="lav"   onClick={() => onGo('profile')} />
          <ActionTile icon="building"   title="Housing"          blurb="furnished + flexible"  tone="dew"   onClick={() => onGo('society')} />
          <ActionTile icon="graduation" title="CE credits"       blurb="free for members"      tone="sky"   onClick={() => onGo('society')} />
          <ActionTile icon="heart"      title="Discounts"        blurb="scrubs, gear, travel"  tone="cloud" onClick={() => onGo('society')} />
        </div>
      </div>

      {/* 3 — Featured jobs strip → Jobs tab */}
      <div>
        <SectionHead action="See all jobs" onAction={() => onGo('jobs')}>Featured jobs</SectionHead>
        <div style={{ display: 'flex', gap: 12, padding: '0 16px 4px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {SAMPLE_JOBS.slice(0, 4).map(j => (
            <FeaturedJobCard key={j.id} job={j} onOpen={() => onOpenJob(j)} />
          ))}
        </div>
      </div>

      {/* 4 — Erin teaser bubble → Erin tab */}
      <div style={{ padding: '0 16px' }}>
        <button onClick={() => onGo('erin')} style={{
          width: '100%', textAlign: 'left', border: 0, cursor: 'pointer',
          background: SS.open, borderRadius: 22, padding: 16,
          boxShadow: `inset 0 0 0 1px ${SS.line}`, display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              width: 36, height: 36, borderRadius: '9999px 9999px 9999px 0', background: SS.lav, color: SS.plum,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: SS.font, fontWeight: 400, fontSize: 15, letterSpacing: '-0.02em', flex: '0 0 auto',
            }}>E</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 14, color: SS.plum }}>Erin</div>
              <Subtext>your scrubsociety guide</Subtext>
            </div>
            <Chip tone="tint">2 new</Chip>
          </div>
          <div style={{
            background: SS.cloud, color: SS.plum, padding: '11px 14px',
            borderRadius: '4px 18px 18px 18px',
            fontFamily: SS.font, fontWeight: 300, fontSize: 14, lineHeight: 1.45,
          }}>
            Your Denver contract wraps in 3 weeks. Want me to line up west-coast ICU roles with weekly pay over $2,500?
          </div>
          <span style={{
            alignSelf: 'flex-start', fontFamily: SS.font, fontWeight: 400, fontSize: 13, color: SS.plum,
            display: 'inline-flex', alignItems: 'center', gap: 5,
          }}>
            Chat with Erin <Icon name="arrow-right" size={14} color="currentColor" />
          </span>
        </button>
      </div>

      {/* 5 — Happening in the Society event teaser → Society tab */}
      <div>
        <SectionHead action="See all" onAction={() => onGo('society')}>Happening in the Society</SectionHead>
        <div style={{ padding: '0 16px' }}>
          <button onClick={() => onGo('society')} style={{
            width: '100%', textAlign: 'left', border: 0, cursor: 'pointer',
            background: SS.open, borderRadius: 22, padding: 16,
            boxShadow: `inset 0 0 0 1px ${SS.line}`, display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <div style={{
              width: 54, height: 54, borderRadius: '16px 16px 16px 0', background: SS.plum, color: SS.open,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
            }}>
              <span style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 11, letterSpacing: '0.08em' }}>MAR</span>
              <span style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 22, letterSpacing: '-0.03em', lineHeight: 1 }}>18</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <H3 style={{ fontSize: 16 }}>Denver traveler meetup</H3>
              <Body size={13} style={{ color: SS.fg2, marginTop: 2 }}>Mile High Park · 6:30pm</Body>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                <Chip tone="acc">32 going</Chip>
                <Chip tone="out">7 from your unit</Chip>
              </div>
            </div>
            <Icon name="chevron-right" size={18} color={SS.fg3} />
          </button>
        </div>
      </div>

    </div>
  );
}

Object.assign(window, { HomeLaunchpad });
