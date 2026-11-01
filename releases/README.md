# Release artifacts

`lvlitup-1.0.0-unsigned.xpi` is a locally packaged add-on archive. It is useful for source inspection or Firefox temporary loading, but regular Firefox will reject it because it is unsigned.

For the Firefox menu item **Install Add-on From File**, use the signed `.xpi` attached to a GitHub release. The release workflow creates this after the repository has AMO unlisted-signing secrets configured:

- `AMO_JWT_ISSUER`
- `AMO_JWT_SECRET`

No compilation is needed to install a signed release: download the `.xpi`, open Firefox’s Add-ons Manager, select **Install Add-on From File**, and choose it.
