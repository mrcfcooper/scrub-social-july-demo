// ── App shell: wires selection, filtering, Erin takeover, sending ────────────
const { CONVERSATIONS, WORKSPACE, RECRUITER } = window.PORTAL_DATA;

function nowStamp() {
  const d = new Date();
  let h = d.getHours(), m = d.getMinutes();
  const ap = h >= 12 ? 'pm' : 'am'; h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, '0')}${ap}`;
}

function App() {
  const [tw, setTweak] = window.useTweaks(window.TWEAK_DEFAULTS);
  const compact = tw.density === 'compact';
  const PortalTweaks = window.PortalTweaks;

  const [convs, setConvs] = React.useState(() => CONVERSATIONS.map(c => ({ ...c, messages: c.messages.slice() })));
  const [selectedId, setSelectedId] = React.useState('lin');
  const [filter, setFilter] = React.useState('all');
  const [drafts, setDrafts] = React.useState({});
  const [trackOpen, setTrackOpen] = React.useState(true);

  React.useEffect(() => { setTrackOpen(tw.trackPanel !== false); }, [tw.trackPanel]);

  // urgency tweak — recolor the one non-brand accent at runtime
  React.useEffect(() => {
    if (tw.urgency === 'plum') { P.alert = '#6E3354'; P.alertBg = 'rgba(66,26,49,0.08)'; P.alertLine = 'rgba(66,26,49,0.2)'; }
    else { P.alert = '#B5701A'; P.alertBg = '#FBEEDA'; P.alertLine = 'rgba(181,112,26,0.28)'; }
    setConvs(c => c.slice()); // force repaint
  }, [tw.urgency]);

  const update = (id, patch) => setConvs(cs => cs.map(c => c.id === id ? { ...c, ...patch } : c));

  const counts = React.useMemo(() => ({
    unread: convs.filter(c => c.unread).length,
    erin: convs.filter(c => c.erinPending && !c.joined).length,
    flagged: convs.filter(c => c.flagged).length,
    snoozed: convs.filter(c => c.snoozed).length,
  }), [convs]);

  const activeCount = React.useMemo(() => convs.filter(c => !c.snoozed).length, [convs]);

  const items = React.useMemo(() => {
    switch (filter) {
      case 'unread': return convs.filter(c => c.unread);
      case 'erin': return convs.filter(c => c.erinPending && !c.joined);
      case 'flagged': return convs.filter(c => c.flagged);
      case 'snoozed': return convs.filter(c => c.snoozed);
      default: return convs.filter(c => !c.snoozed);
    }
  }, [convs, filter]);

  const conv = convs.find(c => c.id === selectedId) || convs[0];

  const onSelect = (id) => { setSelectedId(id); update(id, { unread: false }); };
  const onJoin = () => update(conv.id, { joined: true, unread: false });
  const onFlag = () => update(conv.id, { flagged: !conv.flagged });
  const onSnooze = () => update(conv.id, conv.snoozed ? { snoozed: false } : { snoozed: true, snoozeUntil: conv.snoozeUntil || 'Tomorrow 9:00am' });
  const onInsert = (text) => setDrafts(d => ({ ...d, [conv.id]: text }));
  const onSend = (text) => {
    update(conv.id, {
      joined: true, unread: false,
      messages: [...conv.messages, { who: 'rec', time: nowStamp(), text }],
      lastFrom: 'rec', preview: text, time: 'now',
    });
  };

  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', background: P.canvas, fontFamily: P.font }}>
      <NavRail dark={tw.railDark !== false} />
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <TopBar ws={WORKSPACE} recruiter={RECRUITER} onToggleTrack={() => setTrackOpen(o => !o)} trackOpen={trackOpen} />
        <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
          <ConversationList
            items={items} selectedId={selectedId} onSelect={onSelect}
            filter={filter} onFilter={setFilter} counts={counts} compact={compact} activeCount={activeCount}
          />
          <ConversationView
            key={conv.id}
            conv={conv} joined={!!conv.joined}
            draft={drafts[conv.id] || ''} setDraft={(v) => setDrafts(d => ({ ...d, [conv.id]: v }))}
            onJoin={onJoin} onSend={onSend} onInsert={onInsert} onSnooze={onSnooze} onFlag={onFlag}
          />
          {trackOpen && <TrackingPanel conv={conv} onClose={() => setTrackOpen(false)} />}
        </div>
      </div>
      <PortalTweaks t={tw} setTweak={setTweak} />
    </div>
  );
}

window.PortalApp = App;
