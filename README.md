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

For local testing, open `about:debugging#/runtime/this-firefox` in Firefox, choose
**Load Temporary Add-on**, and select [`lvlitup/manifest.json`](lvlitup/manifest.json).

Download the unsigned local archive from the
[latest release](https://github.com/wal-z1/LVLITUP/releases/latest).

## Development

```powershell
node .\lvlitup\test\validate.js
.\scripts\package.ps1
```

The extension source is in [`lvlitup/`](lvlitup/).
