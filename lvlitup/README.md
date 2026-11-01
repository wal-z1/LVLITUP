# LVLITUP

Firefox extension for per-tab sound levels and control.

- Per-tab live level history and peak indication
- Volume boost, ten-band EQ, balance, mono, limiter, and loudness matching
- Native per-tab mute, solo, and optional auto-duck
- Site-specific remembered settings stored locally
- Firefox light, dark, and custom-theme aware UI
- No accounts, telemetry, network requests, or remote code

## Install

For normal Firefox, download the signed `.xpi` from the project’s GitHub Releases page. Open Firefox’s Add-ons Manager, choose the gear menu, select **Install Add-on From File**, and select the downloaded file.

Signed releases are produced by the GitHub workflow after AMO unlisted-signing secrets are configured. The committed unsigned package is only for temporary/developer use because Firefox release builds reject unsigned extensions.

## Source layout

- `content/main.js` contains the page-world audio engine and safe media routing.
- `content/bridge.js` relays page-world messages to extension APIs.
- `background/` owns tab state, ducking, solo, shortcuts, icons, and sidebar updates.
- `shared/constants.js` contains the settings schema and audio helpers.
- `sidebar/` contains separate state, actions, components, icons, and sparkline modules.
- `theme/` contains the Material 3 token baseline and Firefox theme integration.
- `options/` contains persistent defaults and saved-site controls.
- `scripts/package.ps1` packages the source without requiring npm or compilation.

## Local package

```powershell
.\scripts\package.ps1
```

The output is `releases/lvlitup-<version>-unsigned.xpi`.

## Development

```bash
cd lvlitup
node test/validate.js
npx web-ext lint --source-dir .
```

Load `lvlitup/manifest.json` temporarily from `about:debugging#/runtime/this-firefox` while developing.

## Privacy

No accounts, cookies, analytics, backend, or network requests. Settings stay in Firefox extension storage on the device.

## Limits

DRM and CORS-restricted media remain audible in Limited mode with native volume only. Web Audio destination routing is best-effort so an unsupported page route cannot silence the page.
