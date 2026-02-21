# Android install + APK build

This project is now PWA-ready for Chrome Android install prompts.

## 1) Make install prompt work in Chrome Android

Requirements:
- Serve over HTTPS (or localhost for testing)
- Keep `public/manifest.webmanifest` and `public/sw.js` deployed
- Ensure `public/icons/icon-192.png` and `public/icons/icon-512.png` are reachable

After deploy:
- Open app in Chrome Android
- Tap menu -> Install app (or Add to Home screen)

If Chrome still shows only shortcut:
- Clear site data for your domain in Chrome
- Reopen the app and wait 5-10 seconds for service worker install
- Confirm manifest is served as `application/manifest+json`

## 2) Build shareable APK (Trusted Web Activity)

Chrome-installed WebAPK cannot be exported as a standalone APK file.
To share an APK, package the PWA as a TWA:

1. Set real values in `twa-manifest.json`:
   - `applicationId`
   - `host`
   - `iconUrl`
   - `maskableIconUrl`
2. Install Java + Android SDK + Node.js
3. Run:
   - `npm i -g @bubblewrap/cli`
   - `bubblewrap init --manifest https://YOUR_DOMAIN/manifest.webmanifest`
   - `bubblewrap build`
4. The signed/unsigned APK is generated in the Android project output from Bubblewrap.

Optional publishing:
- Use `bubblewrap build --appBundle` for Play Store AAB.
