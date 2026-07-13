/* Preference Center — frames + composition. Composes shipped DS primitives
   (Card, Chip, PrimaryButton, GhostButton, SMark, type roles) plus the three
   net-new controls from controls.jsx. */

const { useState: useS } = React;
const {
  SS, Card, Chip, PrimaryButton, GhostButton, SMark, H2, H3, Subhead, Body, Subtext,
  TOPICS: PC_TOPICS, CHANNELS: PC_CHANNELS, buildInitialState,
  ChannelGlyph, PrefToggle, FreqSelect, NotAvailable, ConsentCheckbox,
} = window;

/* ============================ shared pieces ============================ */

function ConsentBox({ consent, setConsent }) {
  return (
    <div style={{
      background: 'var(--ss-soft-cloud)', borderRadius: 'var(--ss-radius-2)',
      boxShadow: 'inset 0 0 0 1px var(--ss-line)', padding: 'var(--ss-space-4)',
    }}>
      <p className="ss-body ss-body-sm" style={{ color: 'var(--ss-fg-2)', marginBottom: 12 }}>
        SMS requires your explicit consent under TCPA. Standard message and data rates apply.
        You can reply STOP at any time to opt out. View our{' '}
        <a href="#" style={{ color: 'var(--ss-plum-grove)', textDecoration: 'underline' }}>privacy policy</a>.
      </p>
      <label htmlFor="sms-consent" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
        <ConsentCheckbox id="sms-consent" checked={consent} onChange={setConsent} />
        <span className="ss-body ss-body-sm" style={{ color: 'var(--ss-fg-1)' }}>
          I consent to receive text messages from Scrub Society. Consent is not required to use the platform.
        </span>
      </label>
    </div>
  );
}

function Actions({ onSave, saved }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
      <PrimaryButton onClick={onSave}>{saved ? 'Saved ✓' : 'Save preferences'}</PrimaryButton>
      <GhostButton>Cancel</GhostButton>
    </div>
  );
}

function UnsubLink() {
  return (
    <a href="#" style={{
      fontFamily: 'var(--ss-font)', fontWeight: 300, fontSize: 13,
      color: 'var(--ss-fg-2)', textDecoration: 'underline',
    }}>Unsubscribe from all Scrub Society emails</a>
  );
}

function SmsHint() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
      <span style={{ marginTop: 1, color: 'var(--ss-fg-3)' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
          strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" /></svg>
      </span>
      <span className="ss-subtext" style={{ textTransform: 'none', color: 'var(--ss-fg-3)', fontSize: 11.5, lineHeight: 1.45 }}>
        outbound SMS is paused platform-wide (SSGNR-20). a toggled-on row is saved as your target state and starts sending once delivery is live.
      </span>
    </div>
  );
}

/* ============================ desktop matrix =========================== */

function Legend() {
  const item = (glyph, label) => (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      {glyph}
      <span className="ss-subtext" style={{ textTransform: 'none', fontSize: 11.5, color: 'var(--ss-fg-2)' }}>{label}</span>
    </span>
  );
  return (
    <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'center', marginBottom: 14 }}>
      {item(<span style={{ width: 28, height: 17, borderRadius: 9999, background: 'var(--ss-plum-grove)', position: 'relative', display: 'inline-block' }}>
        <span style={{ position: 'absolute', top: 2.5, right: 2.5, width: 12, height: 12, borderRadius: '50%', background: '#fff' }} /></span>, 'Toggle on / off')}
      {item(<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--ss-fg-3)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>, 'Frequency when on')}
      {item(<NotAvailable />, 'Not available')}
    </div>
  );
}

function ChannelHead({ id, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
      <ChannelGlyph id={id} size={18} />
      <span style={{ fontFamily: 'var(--ss-font)', fontWeight: 400, fontSize: 12, color: 'var(--ss-fg-1)' }}>{label}</span>
    </div>
  );
}

function MatrixCell({ topic, ch, cell, consent, setCell }) {
  if (!cell) return <td style={cellTd}><div style={cellInner}><NotAvailable /></div></td>;
  const isSms = ch.id === 'sms';
  const disabled = isSms && !consent;
  return (
    <td style={cellTd}>
      <div style={cellInner}>
        <PrefToggle on={cell.on} disabled={disabled}
          ariaLabel={`${ch.label}: ${topic.title}`}
          onChange={v => setCell(topic.id, ch.id, { on: v })} />
        {cell.on && !disabled && (
          <FreqSelect compact value={cell.freq} onChange={f => setCell(topic.id, ch.id, { freq: f })} />
        )}
      </div>
    </td>
  );
}

const cellTd = { padding: '12px 8px', textAlign: 'center', verticalAlign: 'middle', borderTop: '1px solid var(--ss-line)' };
const cellInner = { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, minHeight: 50, justifyContent: 'center' };

function DesktopMatrix({ cells, consent, setCell }) {
  return (
    <div style={{ borderRadius: 'var(--ss-radius-3)', boxShadow: 'inset 0 0 0 1px var(--ss-line)', overflow: 'hidden', background: '#fff' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '34%' }} />
          <col /><col /><col /><col />
        </colgroup>
        <thead>
          <tr style={{ background: 'var(--ss-soft-cloud)' }}>
            <th style={{ textAlign: 'left', padding: '14px 20px' }}>
              <span className="ss-subhead" style={{ fontSize: 11 }}>Topic</span>
            </th>
            {PC_CHANNELS.map(c => (
              <th key={c.id} style={{ padding: '12px 8px' }}><ChannelHead id={c.id} label={c.label} /></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {PC_TOPICS.map(t => (
            <tr key={t.id}>
              <td style={{ textAlign: 'left', padding: '14px 20px', verticalAlign: 'top', borderTop: '1px solid var(--ss-line)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ fontFamily: 'var(--ss-font)', fontWeight: 400, fontSize: 15, color: 'var(--ss-fg-1)' }}>{t.title}</span>
                  {t.badge && <Chip tone="acc" style={{ fontSize: 10.5, padding: '2px 9px' }}>{t.badge}</Chip>}
                </div>
                <p className="ss-body" style={{ fontWeight: 300, fontSize: 12.5, color: 'var(--ss-fg-2)', marginTop: 3 }}>{t.desc}</p>
              </td>
              {PC_CHANNELS.map(c => (
                <MatrixCell key={c.id} topic={t} ch={c} cell={cells[t.id][c.id]} consent={consent} setCell={setCell} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ============================ mobile reflow ============================
   Four columns won't fit a phone, so the matrix becomes one card per topic
   with its available channels stacked as rows. N/A channels are omitted on
   mobile (rather than rendering dead dashes); the desktop matrix still shows
   them explicitly. */

function MobileChannelRow({ topic, ch, cell, consent, setCell, last }) {
  const isSms = ch.id === 'sms';
  const disabled = isSms && !consent;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0',
      borderTop: last ? 'none' : 'none',
      opacity: disabled ? 0.55 : 1,
    }}>
      <span style={{ color: disabled ? 'var(--ss-fg-3)' : 'var(--ss-plum-grove)' }}>
        <ChannelGlyph id={ch.id} size={20} color="currentColor" />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--ss-font)', fontWeight: 400, fontSize: 15, color: 'var(--ss-fg-1)' }}>{ch.label}</div>
        {isSms && disabled && (
          <div className="ss-subtext" style={{ textTransform: 'none', fontSize: 11, color: 'var(--ss-fg-3)' }}>needs consent below</div>
        )}
      </div>
      {cell.on && !disabled && (
        <FreqSelect value={cell.freq} onChange={f => setCell(topic.id, ch.id, { freq: f })} />
      )}
      <PrefToggle on={cell.on} disabled={disabled} ariaLabel={`${ch.label}: ${topic.title}`}
        onChange={v => setCell(topic.id, ch.id, { on: v })} />
    </div>
  );
}

function MobileTopicCard({ topic, cells, consent, setCell }) {
  const avail = PC_CHANNELS.filter(c => cells[topic.id][c.id]);
  return (
    <Card padding={18} style={{ borderRadius: 'var(--ss-radius-3)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
        <span style={{ fontFamily: 'var(--ss-font)', fontWeight: 400, fontSize: 16, color: 'var(--ss-fg-1)' }}>{topic.title}</span>
        {topic.badge && <Chip tone="acc" style={{ fontSize: 10.5, padding: '2px 9px' }}>{topic.badge}</Chip>}
      </div>
      <p className="ss-body" style={{ fontWeight: 300, fontSize: 13, color: 'var(--ss-fg-2)' }}>{topic.desc}</p>
      <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--ss-line)' }}>
        {avail.map((c, i) => (
          <div key={c.id} style={{ borderTop: i === 0 ? 'none' : '1px solid var(--ss-line)' }}>
            <MobileChannelRow topic={topic} ch={c} cell={cells[topic.id][c.id]} consent={consent} setCell={setCell} last={i === avail.length - 1} />
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ============================== screen ================================= */

function PrefScreen({ variant, cells, consent, setCell, setConsent, onSave, saved }) {
  const mobile = variant === 'mobile';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 16 : 22 }}>
      <div>
        <H2 style={{ fontSize: mobile ? 24 : 28 }}>Notification preferences</H2>
        <p className="ss-body" style={{ fontWeight: 300, fontSize: mobile ? 14 : 15, color: 'var(--ss-fg-2)', marginTop: 6 }}>
          Control how and when we reach you — for each topic, pick your channel and cadence.
        </p>
      </div>

      {!mobile && (
        <div>
          <span className="ss-subhead" style={{ display: 'block', marginBottom: 12 }}>Notification matrix</span>
          <Legend />
          <DesktopMatrix cells={cells} consent={consent} setCell={setCell} />
        </div>
      )}

      {mobile && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {PC_TOPICS.map(t => (
            <MobileTopicCard key={t.id} topic={t} cells={cells} consent={consent} setCell={setCell} />
          ))}
        </div>
      )}

      <ConsentBox consent={consent} setConsent={setConsent} />
      <SmsHint />
      <Actions onSave={onSave} saved={saved} />
      <UnsubLink />
    </div>
  );
}

window.PrefScreen = PrefScreen;
