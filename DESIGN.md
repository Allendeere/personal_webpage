---
name: Sarah — Personal Portfolio
description: A clear software portfolio with generous typography and a distinct S monogram.
colors:
  background: "#fafafa"
  surface: "#f0f1f3"
  surface-raised: "#e5e7eb"
  text: "#141519"
  muted: "#50545d"
  subtle: "#626771"
  line: "#d9dce2"
  line-strong: "#a2a7b0"
  accent: "#164bdb"
  accent-ink: "#ffffff"
  section-background: "#f0f1f3"
  artwork-bg: "#e9ebef"
  button-bg: "#16171b"
  button-text: "#ffffff"
  button-hover: "#34363e"
  dark-background: "#101114"
  dark-surface: "#191b20"
  dark-surface-raised: "#292c33"
  dark-text: "#f6f7f9"
  dark-muted: "#bcc0c9"
  dark-subtle: "#a3a8b3"
  dark-line: "#333741"
  dark-line-strong: "#666d7a"
  dark-accent: "#91b5ff"
  dark-accent-ink: "#101114"
  dark-section-background: "#17191e"
  dark-artwork-bg: "#22252c"
  dark-button-bg: "#f1f3f7"
  dark-button-text: "#101114"
  dark-button-hover: "#d8dce5"
  dialog-backdrop: "#08090bdd"
  video-label: "#171719"
typography:
  display:
    fontFamily: "Geist Variable, Noto Sans TC, Microsoft JhengHei, sans-serif"
    fontSize: "clamp(3.625rem, 6.6vw, 6.25rem)"
    fontWeight: 530
    lineHeight: 1.06
    letterSpacing: "-.04em"
  headline:
    fontFamily: "Geist Variable, Noto Sans TC, Microsoft JhengHei, sans-serif"
    fontSize: "clamp(2.5rem, 4.2vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-.035em"
  title:
    fontFamily: "Geist Variable, Noto Sans TC, Microsoft JhengHei, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 550
    letterSpacing: "-.02em"
  body:
    fontFamily: "Geist Variable, Noto Sans TC, Microsoft JhengHei, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.95
  lead:
    fontFamily: "Geist Variable, Noto Sans TC, Microsoft JhengHei, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.9
  label:
    fontFamily: "Geist Variable, Noto Sans TC, Microsoft JhengHei, sans-serif"
    fontSize: ".9375rem"
    fontWeight: 400
  caption:
    fontFamily: "Geist Variable, Noto Sans TC, Microsoft JhengHei, sans-serif"
    fontSize: ".875rem"
    fontWeight: 400
    lineHeight: 1.6
  button:
    fontFamily: "Geist Variable, Noto Sans TC, Microsoft JhengHei, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 550
rounded:
  thumbnail-image: "2px"
  screenshot: "5px"
  control: "6px"
  compact-container: "8px"
  dialog-mobile: "10px"
  image-container: "12px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  content-gap: "24px"
  lg: "32px"
  layout-gap: "48px"
  dialog-inset: "56px"
components:
  button-primary:
    backgroundColor: "{colors.button-bg}"
    textColor: "{colors.button-text}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "15px 23px"
  button-primary-hover:
    backgroundColor: "{colors.button-hover}"
  button-header:
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "10px 18px"
  button-icon:
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    size: "48px"
  button-icon-hover:
    backgroundColor: "{colors.surface-raised}"
  filter-selected:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
  project-artwork:
    backgroundColor: "{colors.artwork-bg}"
    rounded: "{rounded.image-container}"
    padding: "60px 24px 24px"
    width: "100%"
  project-dialog:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    rounded: "{rounded.image-container}"
    width: "min(1080px, calc(100% - 56px))"
---

# Design System: Sarah — Personal Portfolio

## Overview

**Creative North Star: “The Software Showroom.”**

Clear, generous software presentation puts Sarah's actual work first. The revised identity combines neutral white, black, and cool gray, a restrained blue interaction accent, larger Traditional Chinese reading text, and self-hosted Geist. Vercel and Linear inform the precision; the implemented source and the user's readability requirements govern the system.

**Key Characteristics:**

- Light by default, with a matching dark option.
- Reading text (18–20px), supporting labels (15–16px), and a minimum text size of (14px) at the default root size.
- A generated black S monogram, quiet rectangular controls, and real project imagery.
- One featured screenshot with explicit text selectors and subtle pointer feedback.

## Colors

The frontmatter records the exact light and dark values. Semantic CSS custom properties in `src/index.css` select the active theme; use those variables in implementation.

### Primary

- **Near-black action:** `button-bg` and `button-text` form the filled primary action; `button-hover` supplies hover feedback. Dark mode uses the corresponding light action pair.
- **Interaction blue:** `accent` signals focus, text-link hover, selection, and progress. `dark-accent` provides its dark-theme counterpart. Blue is not the primary button fill.

### Neutral

- **White / cool charcoal:** background pairs anchor the page and dialog.
- **Cool gray surfaces:** surface, raised-surface, and section-background pairs organize controls and the biography band.
- **Reading hierarchy:** text, muted, and subtle pairs separate headings, prose, and metadata. Line and strong-line pairs distinguish separators and outlined actions.
- **Neutral image stages:** every project uses the active `artwork-bg`; project data tone names do not imply different visible colors. The backdrop darkens the page without blur.

**The Role Rule.** Preserve theme-aware roles and readable contrast. Keep the interface neutral; reserve blue for meaningful interaction.

## Typography

**Font:** Geist Variable, Noto Sans TC, Microsoft JhengHei, sans-serif. Geist Latin is self-hosted with `font-display: swap` and variable weights (100–900); Chinese uses available fallback fonts.

The root respects the browser default size (`100%`). Body text starts at (1.125rem). The frontmatter defines the observed roles: display, headline, project title, body, lead, label, caption, and button. Biography prose has a (50ch) measure; detail introductions use (60ch). Reading line-height is generally (1.8–1.95), with a root line-height of (1.7).

Hero and detail introductions use the lead role on desktop, reducing to the body size on smaller screens. Project titles reduce from (1.75rem) to (1.625rem). Caption text stays at (.875rem), including mobile. Navigation is (1.0625rem), increasing to (1.125rem) in the mobile menu. Display text remains fluid; it does not determine supporting text size.

**The Readability Floor Rule.** Keep main prose at (18–20px) and supporting copy at least (14px) at the default root size, including narrow screens. Wrap labels and controls before shrinking text.

## Layout

The shared shell caps at (1320px), with desktop side margins of (56px). Margins step to (36px) below (1150px), (24px) below (820px), and (20px) below (640px). Minimum body width is (320px).

The hero uses two nearly equal columns and a (48px) gap; at (820px) it stacks into one column. The image remains a single screenshot, with text selectors below. Project cards occupy alternating seven- and five-column spans of a twelve-column grid, with (32px) horizontal and (64px) vertical gaps and a (72px) even-card offset. At (820px) cards become equal halves; at (640px) they become one column without offsets and with (40px) gaps.

Biography columns stack at (820px). Section spacing generally spans (108–130px) on desktop and (70–80px) on mobile. Text rows, metadata, actions, and contact details wrap. Navigation becomes a disclosed vertical menu at (640px). Narrow-screen adjustments at (359px) preserve supporting text size.

The native project dialog caps at (1080px) with dynamic viewport-height limits. Mobile uses (8px) outer margins, one story column, and gallery controls arranged in two rows. The sticky top bar stays inside the dialog's scrolling area; its panel uses `overflow: clip` to avoid a competing scroll ancestor. Keep native scrolling and anchor navigation.

## Elevation & Depth

Depth is restrained. Flat surfaces and thin separators organize the page. Project screenshots use one soft shadow (`0 14px 28px #00000012`); mobile navigation uses (`0 12px 24px #00000012`). The featured screenshot has a neutral surround without a shadow. The modal uses a dark backdrop and opaque sticky controls, without backdrop blur.

**The Quiet Depth Rule.** Let real artifact content supply complexity. Keep surrounding interface structure flat and use the existing screenshot shadow sparingly.

## Shapes

Controls use modest rectangular corners (`control`); image containers use `image-container`. Inner screenshot corners use `screenshot`; thumbnails, compact menus, mobile galleries, and mobile dialogs use their smaller recorded variants. Detail metadata is plain text, without bordered chips. Functional icons remain for actions such as navigation, copying, and closing; decorative icons do not define the identity.

The generated S mark is the brand asset, not an icon-library glyph. Use `public/brand/sarah-mark.png` with transparent padding intact; source CSS inverts it in dark mode. Header size is (42px), reducing to (36px) on mobile; biography and footer reuse the same mark. Browser and Apple icons are derived assets. The generation prompt, source image, and derivative history are recorded in `public/brand/PROVENANCE.md`.

## Components

### Actions and navigation

The primary action has a minimum height of (56px), reducing to (54px) on mobile. Hover changes its background, lifts it by (2px), and moves the arrow by (3px); press scales to (.98). Outlined contact actions have a strong neutral border and a minimum height of (48px). Text links turn blue on hover.

Icon controls use (48px) targets, raised-surface hover, and (.95) press scale. Keyboard focus uses a (2px) accent outline with (6px) offset. The mobile navigation links use generous vertical padding and separators. The theme switch defaults to light and stores the chosen mode locally.

### Project selection and cards

Featured-project selectors are text buttons, with a dark underline on the active item and explicit pressed state; target height is (52px), or (50px) on mobile. Category filters use a neutral selected surface, counts, and (50px) minimum height, reducing to (48px) on mobile. Their shared selected background uses a spring (stiffness 400, damping 35).

Project previews use neutral image stages and clean screenshots. Hover lifts the screenshot by (5px) and enlarges it to (1.015). Keep real content and source aspect ratios; gallery images use `object-fit: contain` for complete inspection. Metadata remains text and is not presented as an action.

### Project dialog and feedback

Use the native modal dialog, focus its sticky close button on opening, support Escape, and keep the page from scrolling behind it. Gallery arrows, keyboard left/right controls, thumbnail selection, image counts, and a full-image link provide parallel inspection paths. Selected thumbnails use an accent border and full opacity. Image errors offer retry; video errors offer download. The supplied video uses native controls and does not autoplay. Clipboard success or failure is announced and clears after (2600ms).

### Motion

Motion for React uses the shared curve `cubic-bezier(.22,1,.36,1)`. Most feedback lasts (200ms), featured changes (240ms), dialog entrance (250ms), card entrances (380ms), and screenshot hover (450ms). Initial hero entrances last (750–850ms). Pointer tilt is mouse-only, limited to (2deg) vertically and (3deg) horizontally, using spring stiffness (160) and damping (28).

`MotionConfig` and `useReducedMotion` honor the user preference. Reduced motion removes pointer tilt and spatial entrances, removes screenshot hover transforms, hides the progress line, and uses immediate scrolling. CSS transition and animation durations reduce to (.01ms).

## Do's and Don'ts

### Do:

- **Do** prioritize older readers: preserve the reading-size floor, readable contrast, wrapping, and generous controls on every viewport.
- **Do** use the generated S asset and keep its provenance with the source and derivatives.
- **Do** preserve real supplied project screenshots, updated magnetic-chess images, and image provenance.
- **Do** retain keyboard controls, visible focus, explicit selected states, and sticky modal controls.

### Don't:

- **Don't** restore the rejected warm/green palette, decorative symbols, synthetic window decoration, or multi-image hero ornamentation.
- **Don't** shrink supporting text below the established minimum to force a layout to fit.
- **Don't** replace the S mark with a generic library icon or alter its drawing through CSS decoration.
- **Don't** invent professional titles, dates, technology stacks, employers, repositories, metrics, testimonials, or project outcomes.
- **Don't** use the outdated magnetic-chess `image_original.png`, autoplay, or scroll hijacking.

Extracted from `personal_webpage.client/src/index.css`, `App.css`, and `App.jsx`; identity and evidence constraints come from `PRODUCT.md`, `.impeccable/surface-portfolio.md`, and the brand provenance record. This documents current source behavior rather than asserting independent validation of every scenario.
