# Sahib — English Marketing Design System (LTR)

> **Scope:** English marketing surface at [esahib.com](https://esahib.com). The live product app is [sahib.cc](https://sahib.cc).  
> **Source of truth for shared brand:** [`../sahib/design.md`](../sahib/design.md) — read that file for the full Sahib palette, motion, glass language, logos, and component DNA. **Do not edit the Arabic product repo** when building English; it stays **RTL** and Arabic-first.  
> **When this file and `../sahib/design.md` disagree on colors, radii, or motion, the Arabic system document wins** — then align English CSS to match.

---

## 1. Product pairing (two surfaces, one brand)

| Surface | Repo / path | Direction | Language | Role |
|---------|-------------|-----------|----------|------|
| **Arabic product** | `../sahib` | `dir="rtl"` | Arabic (MSA / Iraqi context in-product) | Live app at **sahib.cc** — chat, sidebar, prompt bar |
| **English marketing** | `Sahib English` (this repo) | `dir="ltr"` | English | **esahib.com** — landing, waitlist, positioning; **Launch App → sahib.cc** |

Both must feel like one company: same matte dark canvas (`#2E3035`), same blue logo gradients, same orange stroke discipline, same glass panels, same calm premium tone. Only **reading direction, alignment, and English copy** change here.

---

## 2. The one structural rule (LTR)

Everything in this repo is **left-to-right**:

```html
<html lang="en" dir="ltr">
```

| Topic | Arabic product (`../sahib`) | English marketing (this repo) |
|-------|---------------------------|-------------------------------|
| Document direction | `rtl` | `ltr` |
| Default text align | `right` | `left` |
| Primary navigation / logo | Visual **right** (sidebar) | Visual **left** (header) |
| Primary CTA cluster | Per app chrome | Visual **right** (e.g. “Launch App”) |
| Hero copy | RTL flow | **Left column** |
| Hero visual / teaser | Per app layout | **Right column** |
| Logical CSS | `margin-inline-*`, `padding-inline-*` | Same — **never** hardcode `margin-left` unless mirroring is intentional |
| Skeleton shimmer | RTL sweep (Arabic app) | **LTR** sweep (`90deg` in CSS) |
| Chat bubble tails | Toward author in RTL | Mirror: user tail bottom-**right**, assistant tail bottom-**left** |

**Do not** set `dir="rtl"` on any English marketing page root. Nested widgets (email fields, URLs) may use `dir="ltr"` explicitly where needed.

---

## 3. Color system (locked — shared with Arabic)

Use the **same hex values** as `../sahib/design.md` §3. English CSS may expose aliases for marketing code; map as follows:

| Arabic token (`../sahib`) | English marketing alias | Value | Notes |
|---------------------------|-------------------------|-------|--------|
| `--canvas-bg` | `--bg-base` | `#2E3035` | Cards, panels, legacy flat canvas |
| — | `--bg-master-grey` | `#0F1113` | Auth / page vignette **edges** (master grey) |
| — | `--bg-auth-navy` | `#1E293B` | Auth / page vignette **center** (deep muted navy) |
| `--surface-2` | `--bg-surface` | `#3C3F47` | Cards, elevated panels |
| `--surface-3` / hairline surfaces | `--bg-elevated` | `#41444B` | Skeleton bars, subtle elevation |
| `--text-primary` | `--fg-1` | `#FFFFFF` | Headlines, primary body on dark |
| `--text-muted` | `--fg-3` | `#A9A9A9` | Subcopy, placeholders, metadata |
| `--text-faint` | (optional) | `#65768C` | Disabled / lowest priority |
| `--accent-orange` | `--accent-orange` | `#F7731E` | **Strokes & send accents only — never large fills** |
| `--brand-blue-light` | `--accent-blue` | `#5E94FF` | Strokes, chips, logo highlights, streaming cursor |
| `--brand-blue-dark` | — | `#334B7B` | Logo shadows |
| `--brand-blue-mid` | — | `#72A1FF` | Logo midtones |
| `--stroke-1` (hairline) | `--stroke-1` | `rgba(255,255,255,0.06)` or `#3E424A` | Dividers, glass borders |

### Gradients (unchanged)

Copy verbatim from Arabic spec:

- `--gradient-logo-back` / `--gradient-logo-front` — baked into logo SVGs; do not recreate in CSS.
- `--surface-blue-wash` — marketing heroes only; optional over `--bg-base`.
- Orange→blue prompt-bar rim — **product only**; marketing uses static glass unless explicitly building a prompt demo.

### Strict rules (from Arabic palette)

1. **No extra grays or blues** outside the locked matrix.
2. **`#F7731E` is never a panel fill** — outlines, send detail, rare high-intent stroke only.
3. **English marketing is dark-only** for now (matches Arabic primary mode). No light-mode branch in this repo unless product adds a paired English light spec later.

---

## 4. Glassmorphism (shared material)

Same treatment as Arabic night UI and `../sahib` glass surfaces:

```css
.glass {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(229, 237, 255, 0.12);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: background 0.2s ease, border-color 0.2s ease;
}

.glass:hover {
  background: rgba(255, 255, 255, 0.10);
  border-color: rgba(229, 237, 255, 0.20);
}
```

Use for: header “Launch App” pill, waitlist shell, floating chat teaser, feature cards. **Not** for full-page backgrounds — page canvas uses the auth vignette below.

### 4.1 Auth / brand-mark page background (birds)

Full-viewport radial vignette behind the logo mark (“birds”) and auth-style surfaces:

- **Center:** `#1E293B` (`--bg-auth-navy`) — deep muted navy
- **Edges:** `#0F1113` (`--bg-master-grey`) — master grey

```css
background-color: var(--bg-master-grey);
background-image: radial-gradient(
  ellipse 90% 80% at 50% 42%,
  var(--bg-auth-navy) 0%,
  var(--bg-master-grey) 100%
);
```

Glass panels and cards still use `--bg-base` / surfaces — they float on top of this vignette.

---

## 5. Typography

### Families

| Role | Stack | Weights | Use on English marketing |
|------|--------|---------|---------------------------|
| **English UI** | `"DM Sans", "Inter", system-ui, sans-serif` | 400, 500, 600 | Body, subheads, buttons, form placeholders |
| **Brand / display** | `"Muna", "Noto Naskh Arabic", serif` | 400, 700, 900 | Hero headline only (brand gravitas); optional `صاحب` in lockups |
| **Song / poetic** | `"Aref Ruqaa", …` | — | **Not used** on English marketing (Arabic product music page only) |

### Size rule (English vs Arabic pairing)

When English sits next to Arabic brand marks: **English UI one step smaller** so weight balances.

| Element | English marketing | Arabic product (reference) |
|---------|-------------------|---------------------------|
| Body / subcopy | **13–14px** | ~16–20px (`--fs-body`) |
| Brand-adjacent labels | **15px** | ~16px meta |
| Hero display | clamp ~32–44px, Muna **900** | `--fs-display` / word-mark led |

### Copy voice (English)

- Address the reader clearly; brand name is **Sahib** (صاحب in lockups only).
- Prefer **Sahib**, not “the AI”, “the assistant”, or “the model”.
- Calm, premium, no emoji, no exclamation spam (aligned with Arabic voice §2).
- Approved marketing lines (examples):
  - **“The Intelligent Companion for the Arabic World.”** (hero)
  - **“Bridge the gap between heritage and high-tech with the first AI designed for the Iraqi context.”** (sub)
  - Placeholder: **“Enter your email for early access…”**

Arabic taglines (`أذكى من جن الماء`, etc.) live in `../sahib/design.md` §2 — use on Arabic surfaces only.

---

## 6. Spacing & grid (Iraq-aware — same numbers, LTR flow)

Numeric scale (shared): **8px base** — `8 / 16 / 24 / 32 / 48 / 80`.

| Token | Value | English marketing use |
|-------|-------|------------------------|
| Section padding (vertical) | **80px** | Hero and major sections |
| Container max-width | **1100px** | Centered content |
| Header padding | **16px 24px** | Sticky top bar |
| Grid gap (hero) | **32px** | Two-column hero |

### Button padding (Latin — use English row from Arabic spec)

From `../sahib/design.md` §5:

| Variable | Value |
|----------|-------|
| `--btn-pad-y-en` | `10px` |
| `--btn-pad-x-en` | `22px` |

All primary marketing buttons in this repo use **English (LTR) padding**, not the compressed Arabic values.

---

## 7. Borders, shadows, radii (unchanged)

From Arabic system §7:

- **Hairlines:** `rgba(255,255,255,0.06)`, 0.4–1px.
- **Blue strokes:** `1px solid #5E94FF` — secondary CTAs, chips.
- **Orange strokes:** 1.5–2px — rare high-intent actions.
- **Shadows:** short, downward, low opacity — no glow halos.

```
--shadow-sm: 0 1px 1px 0 rgba(0,0,0,0.25);
--shadow-md: 1px 1px 1px 0 rgba(0,0,0,0.25);
```

| Element | Radius |
|---------|--------|
| Cards / chat snippet | **14–16px** |
| Pills (waitlist, Launch App) | **999px** (`--radius-pill`) |
| Small controls | **8px** |

---

## 8. Motion (shared discipline)

From `../sahib/design.md` §8:

- **No bouncy easing** — `ease` or `ease-out`, 120–200ms.
- **Hover:** colour / wash only — no scale on nav icons.
- **Press:** `scale(0.98)` only on buttons.
- **Skeleton:** `sahib-skeleton-breathe` + LTR shimmer on `.sahib-skeleton-bar`.
- **Streaming cursor:** 6px circle, `#395387` / `--accent-blue`, `sahib-cursor-pulse` ~900ms.

---

## 9. English marketing components

These are **in scope for this repo**. Full chat sidebar, agility horses, and prompt-bar rim are **out of scope** — see `../sahib/design.md` §9.

### 9.1 Site header

- **Logo:** top-**left**, compact mark (`public/logo-mark.svg`), ~**40px** height.
- **Launch App:** top-**right**, `.glass` pill, links to **https://sahib.cc**.
- Sticky optional; hairline or glass bar on `--bg-base`.

### 9.2 Hero (Section 01)

Two columns on desktop (stack on narrow viewports):

| Column | Content |
|--------|---------|
| **Left** | Master wordmark (`public/logo-hero.svg`), tagline, subhead (`--fg-3`), waitlist form |
| **Right** | Floating `.glass` chat snippet (preview) |

**Waitlist shell**

- `.glass` pill container.
- Input: `placeholder` for early access email, `font-size: 13px`.
- Submit: **32px** circle, fill `--accent-blue` (`#395387` marketing alias OK if matched to brand blue), white arrow **→** (LTR forward).

**Chat teaser (static marketing)**

- User bubble: “Who are you?” — align **end** (visual right in LTR).
- Assistant area: three `.sahib-skeleton-bar` + `.sahib-stream-cursor`.
- Bubble radii mirror LTR tails (see §2).

### 9.3 Future sections (placeholder)

When adding features, pillars, or image/music demos:

- Reuse **§3 colors**, **§4 glass**, **§6 grid**.
- Prompt-bar demos must match **music prompt bar geometry** from Arabic product when specified — same height, glass material, sticky float; only **direction and English labels** change.
- Image gallery scrolls **behind** a sticky floating prompt bar (z-index above content; no opaque bar behind scrollbar).

---

## 10. Iconography

- Prefer SVG sprite / brand assets from `../sahib/assets/` where applicable.
- **No emoji** in UI (aligned with Arabic §10).
- Lucide only as temporary stand-in — flag in PR until brand icon exists.
- English marketing may use `public/icons.svg` for docs / community / GitHub nav if needed.

---

## 11. Assets & repo layout

```
Sahib English/
├── design.md          ← this file (LTR marketing spec)
├── index.html         ← lang="en" dir="ltr"
├── public/
│   ├── logo-hero.svg
│   ├── logo-mark.svg
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── index.css      ← tokens + glass + skeleton
    ├── App.css        ← layout
    └── App.tsx        ← marketing sections
```

**Canonical logos and icons:** copy or reference from `../sahib/assets/` — do not fork gradients.

---

## 12. Implementation checklist (before shipping UI)

- [ ] Root: `lang="en"` `dir="ltr"`.
- [ ] Background `--bg-base` / `--canvas-bg` = `#2E3035`.
- [ ] No orange panel fills; orange stroke-only.
- [ ] Glass panels use §4 recipe.
- [ ] English body 13–14px; hero Muna 900.
- [ ] Logical properties for horizontal spacing.
- [ ] Launch App → `https://sahib.cc`.
- [ ] Arabic repo `../sahib` **unchanged** (still RTL).

---

## 13. Relationship to code

| File | Role |
|------|------|
| `src/index.css` | Token aliases, glass, skeleton, cursor |
| `src/App.css` | Marketing layout |
| `src/App.tsx` | Section composition |

If `src/index.css` tokens drift from §3, update CSS to match **this file** and `../sahib/design.md`.

---

_Last derived from `../sahib/design.md` (2026-05-18 sync). English marketing LTR overlay — 2026-05-25._
