# Local artifacts

`lvlitup-1.0.0-unsigned.xpi` is a local archive of the extension source.

For temporary use, load `lvlitup/manifest.json` through
`about:debugging#/runtime/this-firefox`; Firefox removes it when Firefox restarts.

For permanent use, submit the XPI to
[Mozilla Add-ons](https://addons.mozilla.org/developers/addon/submit/), complete
review, download the signed XPI, and install it from `about:addons`. Firefox
rejects this unsigned archive as a permanent installation.
