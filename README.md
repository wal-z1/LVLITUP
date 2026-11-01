# LVLITUP

Firefox extension for per-tab sound levels and control.

## Features

- Per-tab live level history and peak indication
- Volume boost, ten-band EQ, balance, mono, limiter, and loudness matching
- Native per-tab mute, solo, and optional auto-duck
- Site-specific remembered settings stored locally
- Firefox light, dark, and custom-theme aware UI

LVLITUP has no accounts, telemetry, backend, or network requests. Settings remain in
Firefox extension storage on the device.

## Install locally

In Firefox, open `about:debugging#/runtime/this-firefox`, select **Load Temporary
Add-on**, and choose [`lvlitup/manifest.json`](lvlitup/manifest.json).

The included XPI is an unsigned local archive. It is available in
[`releases/`](releases/) and is also attached to the GitHub release.

## Development

```powershell
node .\lvlitup\test\validate.js
.\scripts\package.ps1
```

The source implementation is in [`lvlitup/`](lvlitup/).
