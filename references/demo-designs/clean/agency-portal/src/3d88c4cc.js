// ── Tweaks: layout density, panels, accents ──────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "comfortable",
  "trackPanel": true,
  "railDark": true,
  "urgency": "amber"
}/*EDITMODE-END*/;

function PortalTweaks({ t, setTweak }) {
  const { TweaksPanel, TweakSection, TweakRadio, TweakToggle } = window;
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Layout" />
      <TweakRadio label="Row density" value={t.density} options={['comfortable', 'compact']}
        onChange={(v) => setTweak('density', v)} />
      <TweakToggle label="Assignment panel" value={t.trackPanel !== false}
        onChange={(v) => setTweak('trackPanel', v)} />
      <TweakToggle label="Plum nav rail" value={t.railDark !== false}
        onChange={(v) => setTweak('railDark', v)} />
      <TweakSection label="Accents" />
      <TweakRadio label="Urgency color" value={t.urgency} options={['amber', 'plum']}
        onChange={(v) => setTweak('urgency', v)} />
    </TweaksPanel>
  );
}

window.TWEAK_DEFAULTS = TWEAK_DEFAULTS;
window.PortalTweaks = PortalTweaks;
