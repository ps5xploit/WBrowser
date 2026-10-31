# Browser fullscreen payloads

These ELF files come from [ps5-web-browser-fullscreen](https://github.com/owendswang/ps5-web-browser-fullscreen) by [owendswang](https://github.com/owendswang), with firmware fixes from the community. All credit for the fullscreen patch goes to them.

- `web-browser-fullscreen.elf`: `web-browser-fullscreen-test8.elf` from the [`test` release](https://github.com/owendswang/ps5-web-browser-fullscreen/releases/tag/test) (uploaded 2026-10-30). SHA-256 `3d298257e2d5e105d526c54743e3b683131d6c529a8980c2014b853d1929618f`.
- `web-browser-restore.elf`: `web-browser-restore-test8.elf` from the same release. SHA-256 `ded8718994bc074d4f3875ab82164017326e3f96749ab74d2450b533b719eaf8`.

They are unmodified and licensed under GPL-3.0-or-later (see `LICENSE`). The source code is at https://github.com/owendswang/ps5-web-browser-fullscreen.

WBrowser sends them to websrv (the Homebrew Launcher, `127.0.0.1:8080`) through `fullscreen.js`. After applying or restoring, close and reopen the browser. The patch is in memory, so it goes away after a reboot or a system language change.
