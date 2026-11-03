# Browser fullscreen payloads

These ELF files come from [ps5-web-browser-fullscreen](https://github.com/owendswang/ps5-web-browser-fullscreen) by [owendswang](https://github.com/owendswang), with firmware fixes from the community. All credit for the fullscreen patch goes to them.

- `web-browser-fullscreen.elf`: `web-browser-fullscreen-test9.elf` from the [`test` release](https://github.com/owendswang/ps5-web-browser-fullscreen/releases/tag/test) (uploaded 2026-11-03). SHA-256 `e38785c809e7cd35b8fd886cf43750e0bc0a228efb7954b5cab569356e1326a0`.
- `web-browser-restore.elf`: `web-browser-restore-test9.elf` from the same release. SHA-256 `0dd33148698ef870c43b76bbb2286b50fdf639b6fbf3875f79844fd98296aad9`.

They are unmodified and licensed under GPL-3.0-or-later (see `LICENSE`). The source code is at https://github.com/owendswang/ps5-web-browser-fullscreen.

WBrowser sends them to websrv (the Homebrew Launcher, `127.0.0.1:8080`) through `fullscreen.js`. After applying or restoring, close and reopen the browser. The patch is in memory, so it goes away after a reboot or a system language change.
