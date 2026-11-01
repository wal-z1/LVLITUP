# LVLITUP

Firefox extension for per-tab audio control.

## Features

- Volume, boost, ten-band EQ, balance, mono, limiter, and loudness matching
- Live levels and peak indicators
- Mute, solo, and optional auto-ducking
- Saved site settings
- Light and dark themes
- No accounts, telemetry, backend, or network requests

## Use temporarily

1. Open `about:debugging#/runtime/this-firefox` in Firefox.
2. Select **Load Temporary Add-on**.
3. Choose [`lvlitup/manifest.json`](lvlitup/manifest.json).

Temporary add-ons are removed when Firefox restarts.

## Install permanently

1. Build the unsigned package:

   ```powershell
   .\scripts\package.ps1 -Version 1.0.0
   ```

2. Submit the XPI to [Mozilla Add-ons](https://addons.mozilla.org/developers/addon/submit/).
3. Complete review and download the signed XPI.
4. In Firefox, open `about:addons` > gear menu > **Install Add-on From File**.

The included `releases/*-unsigned.xpi` cannot be installed permanently.

## Build and validate

```powershell
node .\lvlitup\test\validate.js
.\scripts\package.ps1 -Version 1.0.0
```

`package.ps1` creates `releases/lvlitup-<version>-unsigned.xpi` from
[`lvlitup/`](lvlitup/).
