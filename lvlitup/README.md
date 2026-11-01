# LVLITUP

Minimal Firefox extension for per-tab sound levels and control.

- Per-tab live level history and peak indication
- Volume boost, ten-band EQ, balance, mono, limiter, and loudness matching
- Native per-tab mute, solo, and optional auto-duck
- Site-specific remembered settings stored locally
- Firefox light, dark, and custom-theme aware UI
- No accounts, telemetry, network requests, or remote code

## Source layout

- `content/main.js` contains the page-world audio engine and safe media routing.
- `content/bridge.js` relays page-world messages to extension APIs.
- `background/` owns tab state, ducking, solo, shortcuts, icons, and sidebar updates.
- `shared/constants.js` contains the settings schema and audio helpers.
- `sidebar/` contains the tab list, controls, sparkline renderer, and UI components.
- `theme/` contains the Material 3 token baseline and Firefox theme integration.
- `options/` contains compact persistent defaults and saved-site controls.
- `test/` contains the audio fixture and local validation script.

## Run

Load `lvlitup/manifest.json` from `about:debugging#/runtime/this-firefox` using **Load Temporary Add-on**.

```bash
cd lvlitup
npx web-ext run
```

## Test

```bash
cd lvlitup
node test/validate.js
npx web-ext lint --source-dir .
```

Open `test/test-page.html` in Firefox to exercise media-element, Web Audio, and clipping sources.

## Package

```bash
cd lvlitup
npx web-ext build
```

Submit the produced archive as an unlisted AMO add-on for signing.

## Privacy

No accounts, cookies, analytics, backend, or network requests. Settings stay in Firefox extension storage on the device.

## Limits

DRM and CORS-restricted media remain audible in Limited mode with native volume only. Web Audio destination routing is best-effort so an unsupported page route cannot silence the page.
