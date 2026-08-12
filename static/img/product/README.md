# Product screenshots

Drop real screenshots here and the site picks them up automatically — no code
change required. Each component falls back to its built mockup if the file is
absent, so a missing image never renders as a broken image.

| File | Used by | Shot |
|---|---|---|
| `zara-workspace.png` | `src/components/ZaraWorkspace.tsx` | The Zara panel in the Zpoa Workspace: activity bar, chat list, a conversation with at least one rendered table, and the composer. |

## Capture guidance

- **2x device pixel ratio.** A 1x capture looks soft on retina displays.
- **Crop to the application**, not the whole desktop — no OS taskbar, no browser
  chrome, no other windows.
- **Use a seeded demo tenant**, never a real one. No customer names, real
  employee addresses, real hostnames, or real mesh IPs: those become public the
  moment the site deploys.
- **Dark theme**, to match the surrounding section.
- Export as WebP where possible; PNG is acceptable for UI with sharp text.
