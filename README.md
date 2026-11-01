# LVLITUP

Firefox extension for per-tab volume, EQ, balance, mono, limiting, loudness matching,
mute, solo, and auto-ducking.

## Features

- Live per-tab levels, peaks, and volume control
- Ten-band EQ, boost, balance, mono, limiter, and loudness matching
- Native mute, solo, and optional auto-ducking
- Saved site settings with light and dark theme support
- No accounts, telemetry, backend, or network requests

## Install

For temporary local use, open `about:debugging#/runtime/this-firefox` in Firefox,
choose **Load Temporary Add-on**, and select
[`lvlitup/manifest.json`](lvlitup/manifest.json). Firefox removes temporary
add-ons when it restarts.

For persistent installation, use a signed Firefox add-on package. The included XPI
is unsigned and is intended for local packaging or testing, not permanent
installation through **Install Add-on From File**.

## Sign manually

1. Build an archive with `.\scripts\package.ps1 -Version 1.0.0`.
2. Create or sign in to a Mozilla Add-ons (AMO) developer account.
3. Submit the generated XPI at <https://addons.mozilla.org/developers/addon/submit/>.
4. Complete the AMO review, then download the signed XPI.
5. In Firefox, open `about:addons`, select the gear menu, choose **Install Add-on
   From File**, and select the signed XPI.

Firefox, not this repository, provides the release signature. Do not upload
credentials or signing keys to the repository.

## Development

```powershell
node .\lvlitup\test\validate.js
.\scripts\package.ps1
```

`package.ps1` creates `releases/lvlitup-<version>-unsigned.xpi` from
[`lvlitup/`](lvlitup/). Pass a version when needed:

```powershell
.\scripts\package.ps1 -Version 1.0.0
```
