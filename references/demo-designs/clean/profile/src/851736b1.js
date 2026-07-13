// Scrub Society — Profile, rebuilt from the mobile kit primitives (components.jsx).
// Every visual here is composed from SS tokens + the kit's Card / Chip / type / button
// primitives. Where the live product needed something the kit has no primitive for,
// it's noted in FLAGS (see Profile.html) and built as a thin local composition.

// ─────────────── sample clinician (mirrors live Profile fields) ───────────────
const PROFILE = {
  first: 'Lin', last: 'Castro', initials: 'LC',
  title: 'ICU travel RN', years: 4,
  email: 'lin.castro@email.com',
  mobile: '(303) 555-0148',
  dob: '03 / 14 / 1992',
  shift: 'Nights',
  duration: '3 × 12 (36 hrs)',
  address: ['418 Larimer St, Apt 5', 'Denver, Colorado, 80202'],
  licenses: [
    { type: 'Registered Nurse (RN)', number: 'RN-CO-884213', state: 'Colorado', exp: 'Aug 2026', valid: true },
    { type: 'Registered Nurse (RN)', number: 'RN-CA-552108', state: 'California · compact', exp: 'Mar 2027', valid: true },
  ],
  certifications: [
    { type: 'Basic Life Support (BLS)', number: 'AHA-7741', exp: 'Nov 2026', valid: true },
    { type: 'Advanced Cardiac Life Support (ACLS)', number: 'AHA-3392', exp: 'Feb 2027', valid: true },
    { type: 'NIH Stroke Scale (NIHSS)', number: 'NIHSS-1180', exp: 'Jan 2025', valid: false },
  ],
  specialties: [
    { profession: 'Registered Nurse', specialty: 'Intensive Care Unit (ICU)' },
    { profession: 'Registered Nurse', specialty: 'Progressive Care Unit (PCU)' },
  ],
  work: [
    { employer: 'HCA HealthONE Presbyterian', unit: 'ICU · 18-bed surgical', period: 'Jan 2025 – Present', agency: 'Aya Healthcare', kind: 'Travel', charge: true, desc: 'Charge experience on nights. 1:2 ratio, post-surgical and trauma overflow.' },
    { employer: 'Cedars-Sinai Medical Center', unit: 'L&D', period: 'Aug 2024 – Dec 2024', agency: 'Cross Country', kind: 'Travel', charge: false, desc: 'High-acuity labor & delivery, 3×12 days.' },
  ],
  education: [
    { school: 'University of Colorado', course: 'Nursing', grad: 'May 2018', degree: 'BSN', graduated: true },
  ],
  references: [
    { name: 'Marisol Ortega', title: 'Charge Nurse, ICU', company: 'HCA Presbyterian', period: 'Jan 2025 – Present', phone: '(303) 555-0112', email: 'm.ortega@email.com' },
    { name: 'Devon Reyes', title: 'Nurse Manager', company: 'Cedars-Sinai', period: 'Aug 2024 – Dec 2024', phone: '(310) 555-0199', email: null },
  ],
};

const TABS = [
  { id: 'licenses',       label: 'Licenses',      count: PROFILE.licenses.length },
  { id: 'certifications', label: 'Certifications', count: PROFILE.certifications.length },
  { id: 'specialties',    label: 'Specialties',   count: PROFILE.specialties.length },
  { id: 'work',           label: 'Work History',  count: PROFILE.work.length },
  { id: 'education',      label: 'Education',      count: PROFILE.education.length },
  { id: 'references',     label: 'References',     count: PROFILE.references.length },
];

// ─────────────── local glyphs the kit's Lucide subset is missing ───────────────
// (flagged: the kit ships home/search/user… but no pencil, trash, mail, phone, award.)
const P_PATHS = {
  pencil: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  trash:  '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>',
  mail:   '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  phone:  '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 11a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.9.6 2.9.8a2 2 0 0 1 1.6 2Z"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
  award:  '<circle cx="12" cy="8" r="6"/><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5"/>',
  cake:   '<path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s1-1 4-1 4 2 8 2 4-1 4-1"/><path d="M2 21h20"/><path d="M7 8v3M12 8v3M17 8v3"/><path d="M7 4h.01M12 4h.01M17 4h.01"/>',
  clock:  '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  moon:   '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  pin:    '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
};
function PIcon({ name, size = 16, stroke = 1.75, color = 'currentColor', style }) {
  const d = P_PATHS[name];
  if (!d) return <Icon name={name} size={size} stroke={stroke} color={color} style={style} />;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={{ flex: '0 0 auto', ...style }} dangerouslySetInnerHTML={{ __html: d }} />
  );
}

// ─────────────── avatar (brand speech-bubble shape) ───────────────
function Avatar({ size = 64, fs = 24 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '9999px 9999px 9999px 0',
      background: SS.lav, color: SS.plum, flex: '0 0 auto',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: SS.font, fontWeight: 400, fontSize: fs, letterSpacing: '-0.03em',
    }}>{PROFILE.initials}</div>
  );
}

// ─────────────── profile completeness meter (no kit primitive → built on tokens) ───────────────
function CompletionMeter({ pct, dark }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
        <Subhead dark={dark}>Profile complete</Subhead>
        <span style={{ fontFamily: SS.font, fontWeight: 400, fontSize: 13, color: dark ? SS.open : SS.plum }}>{pct}%</span>
      </div>
      <div style={{ height: 8, borderRadius: 9999, background: dark ? 'rgba(255,255,255,0.18)' : SS.dew, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, borderRadius: 9999, background: dark ? SS.lav : SS.plum, transition: 'width 400ms' }} />
      </div>
    </div>
  );
}

// ─────────────── contact field ───────────────
function ContactItem({ label, value, icon, editable }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
      <Subhead style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {icon && <PIcon name={icon} size={13} color={SS.fg3} />}{label}
      </Subhead>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
        <span style={{ fontFamily: SS.font, fontWeight: 300, fontSize: 14, color: SS.fg1, wordBreak: 'break-word', minWidth: 0 }}>{value}</span>
        {editable && (
          <button title={`Edit ${label.toLowerCase()}`} style={{
            border: 0, background: 'transparent', cursor: 'pointer', padding: 2,
            color: SS.fg3, display: 'inline-flex', flex: '0 0 auto',
          }}><PIcon name="pencil" size={13} color="currentColor" /></button>
        )}
      </div>
    </div>
  );
}

// ─────────────── section header (title · count chip · blurb · add) ───────────────
function SectionHead({ title, count, blurb, addLabel }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12,
      padding: '18px 20px', borderBottom: `1px solid ${SS.line}`, background: SS.cloud,
      borderRadius: '20px 20px 0 0',
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <H3 style={{ fontSize: 18 }}>{title}</H3>
          {count > 0 && <Chip tone="acc" style={{ fontSize: 11, padding: '3px 9px' }}>{count}</Chip>}
        </div>
        {blurb && <Body size={13} style={{ color: SS.fg2, marginTop: 3 }}>{blurb}</Body>}
      </div>
      {addLabel && <PrimaryButton icon="plus" style={{ padding: '9px 16px', fontSize: 13, flex: '0 0 auto' }}>{addLabel}</PrimaryButton>}
    </div>
  );
}

// ─────────────── one credential card (used by every tab) ───────────────
function CredCard({ title, rows, foot }) {
  return (
    <div style={{ position: 'relative', background: SS.open, borderRadius: 16, padding: 16, boxShadow: `inset 0 0 0 1px ${SS.line}` }}>
      <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 4 }}>
        <button title="Edit" style={iconBtn(SS.plum, SS.dew)}><PIcon name="pencil" size={15} color="currentColor" /></button>
        <button title="Delete" style={iconBtn(SS.plum, SS.cloud)}><PIcon name="trash" size={15} color="currentColor" /></button>
      </div>
      <H3 style={{ fontSize: 15, paddingRight: 64, lineHeight: 1.25 }}>{title}</H3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, marginTop: 12 }}>
        {rows.map((r, i) => (
          <div key={i}>
            <Subhead style={{ display: 'block', marginBottom: 3 }}>{r.label}</Subhead>
            {r.chip
              ? <Chip tone={r.tone || 'tint'} icon={r.icon}>{r.value}</Chip>
              : r.mono
                ? <span style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 13, color: SS.fg1, background: SS.cloud, padding: '3px 8px', borderRadius: 6, display: 'inline-block' }}>{r.value}</span>
                : <Body size={13} style={{ color: SS.fg1 }}>{r.value}</Body>}
          </div>
        ))}
      </div>
      {foot}
    </div>
  );
}
function iconBtn(fg, bg) {
  return {
    width: 30, height: 30, borderRadius: 9, border: 0, cursor: 'pointer',
    background: bg, color: fg, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  };
}

// ─────────────── tab content builders ───────────────
function expChip(item) {
  // valid → soft tint; expired → flagged dark chip (no semantic green/red in the brand palette)
  return item.valid
    ? { label: 'Expires', value: item.exp, chip: true, tone: 'tint', icon: 'calendar' }
    : { label: 'Expired', value: `${item.exp} · expired`, chip: true, tone: 'dark', icon: 'calendar' };
}
function TabBody({ id }) {
  if (id === 'licenses') return (
    <CardGrid>{PROFILE.licenses.map((l, i) => (
      <CredCard key={i} title={l.type} rows={[
        { label: 'License number', value: l.number, mono: true },
        { label: 'State', value: l.state, chip: true, tone: 'sky', icon: 'pin' },
        expChip(l),
      ]} />
    ))}</CardGrid>
  );
  if (id === 'certifications') return (
    <CardGrid>{PROFILE.certifications.map((c, i) => (
      <CredCard key={i} title={c.type} rows={[
        { label: 'Certificate number', value: c.number, mono: true },
        expChip(c),
      ]} />
    ))}</CardGrid>
  );
  if (id === 'specialties') return (
    <CardGrid>{PROFILE.specialties.map((s, i) => (
      <CredCard key={i} title={s.specialty} rows={[
        { label: 'Profession', value: s.profession, chip: true, tone: 'acc' },
      ]} />
    ))}</CardGrid>
  );
  if (id === 'work') return (
    <CardGrid>{PROFILE.work.map((w, i) => (
      <CredCard key={i} title={w.employer} rows={[
        { label: 'Unit', value: w.unit },
        { label: 'Period', value: w.period, chip: true, tone: 'tint', icon: 'calendar' },
        { label: 'Agency', value: w.agency, chip: true, tone: 'sky' },
        { label: 'Type', value: w.kind + (w.charge ? ' · charge' : ''), chip: true, tone: 'acc' },
        { label: 'Description', value: w.desc },
      ]} />
    ))}</CardGrid>
  );
  if (id === 'education') return (
    <CardGrid>{PROFILE.education.map((e, i) => (
      <CredCard key={i} title={e.school} rows={[
        { label: 'Course of study', value: e.course, chip: true, tone: 'tint' },
        { label: 'Status', value: e.graduated ? 'Graduated' : 'Did not graduate', chip: true, tone: e.graduated ? 'acc' : 'cloud', icon: 'award' },
        { label: 'Graduated', value: e.grad },
        { label: 'Degree', value: e.degree, chip: true, tone: 'sky' },
      ]} />
    ))}</CardGrid>
  );
  if (id === 'references') return (
    <CardGrid>{PROFILE.references.map((r, i) => (
      <CredCard key={i} title={r.name} rows={[
        { label: 'Title', value: r.title },
        { label: 'Worked together', value: `${r.company} · ${r.period}`, chip: true, tone: 'tint' },
        ...(r.phone ? [{ label: 'Phone', value: r.phone, chip: true, tone: 'sky', icon: 'phone' }] : []),
        ...(r.email ? [{ label: 'Email', value: r.email, chip: true, tone: 'cloud', icon: 'mail' }] : []),
      ]} />
    ))}</CardGrid>
  );
  return null;
}
function CardGrid({ children, single }) {
  return <div style={{ display: 'grid', gridTemplateColumns: single ? '1fr' : 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12, padding: 20 }}>{children}</div>;
}

// ─────────────── account statistics (right rail) ───────────────
const STAT_ROWS = [
  { n: PROFILE.licenses.length,       label: 'Professional licenses' },
  { n: PROFILE.certifications.length, label: 'Certifications' },
  { n: PROFILE.specialties.length,    label: 'Profession specialties' },
  { n: PROFILE.work.length,           label: 'Work history' },
  { n: PROFILE.education.length,      label: 'Education history' },
  { n: PROFILE.references.length,     label: 'References' },
];
function StatList() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {STAT_ROWS.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 38, height: 38, borderRadius: '9999px 9999px 9999px 0', flex: '0 0 auto',
            background: i % 2 ? SS.dew : SS.lav, color: SS.plum,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: SS.font, fontWeight: 400, fontSize: 15, letterSpacing: '-0.02em',
          }}>{s.n}</div>
          <Body size={14} style={{ color: SS.fg1 }}>{s.label}</Body>
        </div>
      ))}
    </div>
  );
}

// ─────────────── resume card ───────────────
function ResumeCard() {
  return (
    <Card style={{ padding: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: '12px 12px 12px 0', background: SS.cloud, color: SS.plum, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
          <PIcon name="download" size={20} color="currentColor" />
        </div>
        <div>
          <H3 style={{ fontSize: 16 }}>Resume</H3>
          <Subtext>auto-fills your profile</Subtext>
        </div>
      </div>
      <Body size={13} style={{ color: SS.fg2 }}>Drop a PDF and we'll pull your licenses, work history, and references — you confirm before anything saves.</Body>
      <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
        <PrimaryButton icon="plus" style={{ padding: '11px 16px', fontSize: 14, flex: 1 }}>Upload resume</PrimaryButton>
      </div>
    </Card>
  );
}

Object.assign(window, {
  PROFILE, TABS, PIcon, Avatar, CompletionMeter, ContactItem,
  SectionHead, CredCard, TabBody, CardGrid, StatList, ResumeCard,
});
