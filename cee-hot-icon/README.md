# CEE Hot Icon — GOL IBE

Branded PWA shortcut for Central & Eastern Europe clients.  
White-square icon with the GOL IBE compass logo — installable directly to the Windows taskbar.

---

## Quick install (client guide)

### Chrome / Edge on Windows 10 / 11

1. Open **Chrome** or **Edge** and go to the GOL IBE URL provided by your agency.
2. Click the **install icon** (⊕) that appears at the right end of the address bar.
3. Click **Install** in the prompt — the app opens in its own window and a shortcut appears on your desktop.
4. **Drag** the desktop shortcut onto the **Windows taskbar**.

Done. The white icon with the blue compass appears on your taskbar permanently.

---

## Icon

| File | Size | Use |
|---|---|---|
| `icon.svg` | scalable | Chrome / Edge PWA install, taskbar |

**Design:** white square background `#ffffff` · GOL IBE compass (blue `#0b4db8` outer ring, red `#ff4d4d` inner ring, white centre, white cardinal markers).

To replace the logo, edit `icon.svg` — keep the `viewBox="0 0 512 512"` and white background `<rect>`.

---

## PWA manifest

`manifest.json` is ready to reference from your GOL IBE web `<head>`:

```html
<link rel="manifest" href="/cee-hot-icon/manifest.json">
```

Add this tag to the `<head>` of your main HTML page alongside the standard meta tags.

---

## Files

```
cee-hot-icon/
├── icon.svg        ← white-square icon (SVG, all sizes)
├── manifest.json   ← PWA manifest
└── README.md       ← this file
```
