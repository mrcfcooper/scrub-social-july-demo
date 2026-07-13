/* global React, TopBar, ChipRow, JobRow, SectionHeading, Icon */

const JobsScreen = () => {
  const [filter, setFilter] = React.useState('All');
  return (
    <div className="ss-screen">
      <TopBar />
      <div style={{ padding: '0 20px 4px' }}>
        <div style={{ fontWeight: 400, fontSize: 32, letterSpacing: '-0.04em', lineHeight: 1.02 }}>
          Find your journey.
        </div>
        <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginTop: 6, textTransform: 'lowercase' }}>
          142 new openings this week
        </div>
      </div>

      <div className="ss-search" style={{ marginTop: 16 }}>
        <Icon name="search" size={16} />
        <input placeholder="City, specialty, or hospital" />
      </div>

      <ChipRow items={['All', 'ICU', 'Peds', 'OT', 'Travel RN', 'Remote']}
        active={filter} onChange={setFilter} />

      <div className="ss-joblist">
        <JobRow title="ICU Travel RN — Cedars-Sinai" location="Los Angeles, CA · 13 wk contract"
          pay="$3,420/wk" tags={['travel', 'nights', 'housing included']} />
        <JobRow title="Peds OT — Children's Hospital" location="Denver, CO · full-time"
          pay="$108k/yr" tags={['perm', 'relocation']} />
        <JobRow title="Med-Surg Float Pool" location="Austin, TX · 8 wk contract"
          pay="$2,890/wk" tags={['travel', 'days', 'weekends off']} />
        <JobRow title="NICU Travel RN" location="Seattle, WA · 13 wk contract"
          pay="$3,680/wk" tags={['travel', 'nights']} />
        <JobRow title="Home Health OT" location="Phoenix, AZ · part-time"
          pay="$62/hr" tags={['flexible', 'car required']} />
      </div>

      <div style={{ height: 16 }} />
    </div>
  );
};

window.JobsScreen = JobsScreen;
