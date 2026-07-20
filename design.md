---
version: 1.0
name: JT-Research
description: A warm, serif-forward academic publication site for research papers. The system uses a Paper & Burgundy palette — cream canvas, near-black ink, deep wine accent, and a near-black footer — to read like a modern journal rather than a tech marketing page. Display and long-form body copy run Source Serif 4; UI chrome and paper titles use Inter; code uses JetBrains Mono. The site is bilingual (EN / CS) with a compact language switcher in the top nav.

colors:
  primary: "#7a2e2e"
  primary-active: "#5c2020"
  primary-disabled: "#e6dcdc"
  ink: "#161514"
  body: "#3a3936"
  body-strong: "#211f1d"
  muted: "#6f6d68"
  muted-soft: "#8f8c86"
  hairline: "#e2e0db"
  hairline-soft: "#ebe9e4"
  canvas: "#faf9f5"
  surface-soft: "#f2f1ee"
  surface-card: "#e9e7e2"
  surface-cream-strong: "#ded9d1"
  surface-dark: "#121212"
  surface-dark-elevated: "#1c1c1c"
  surface-dark-soft: "#171717"
  on-primary: "#ffffff"
  on-dark: "#f5f4f2"
  on-dark-soft: "#9a9793"
  success: "#4f8a5b"
  warning: "#b8862f"
  error: "#a83b3b"

typography:
  display-xl:
    fontFamily: "Source Serif 4, serif"
    fontSize: 60px
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: -0.025em
  display-lg:
    fontFamily: "Source Serif 4, serif"
    fontSize: 36px
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: -0.025em
  display-md:
    fontFamily: "Source Serif 4, serif"
    fontSize: 30px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.025em
  paper-title:
    fontFamily: "Inter, sans-serif"
    fontSize: 52px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.025em
  body-lg:
    fontFamily: "Source Serif 4, serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: 0
  body-md:
    fontFamily: "Source Serif 4, serif"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: 0
  body-sm:
    fontFamily: "Source Serif 4, serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: 0
  caption-uppercase:
    fontFamily: "Inter, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.05em
  nav-link:
    fontFamily: "Inter, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0
  wordmark:
    fontFamily: "Source Serif 4, serif"
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: -0.025em
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  button:
    fontFamily: "Inter, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0

rounded:
  sm: 6px
  md: 8px
  lg: 12px

spacing:
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  section: 96px

components:
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    height: 64px
    sticky: true
  hero-band:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    padding: 96px 24px
    borderBottom: "{colors.hairline}"
  publications-table:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    padding: 56px 24px 96px
  paper-header:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    alignment: center
    maxWidth: 768px
  paper-article:
    backgroundColor: "{colors.canvas}"
    maxWidth: 672px
  footer:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark-soft}"
    padding: 64px 24px
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    height: 40px
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    border: "{colors.hairline}"
    rounded: "{rounded.md}"
    height: 40px
  language-switcher:
    backgroundColor: transparent
    activeBackground: "{colors.surface-card}"
    border: "{colors.hairline}"
    rounded: "{rounded.md}"
---

## Overview

JT-Research is a personal research publication site. The visual identity is **Paper & Burgundy** — warm off-white canvas, near-black ink, and a deep wine accent (`#7a2e2e`) used sparingly on links and interactive states. The tone is academic and editorial: generous whitespace, serif body copy, hairline dividers, and a single dark footer band.

The site has three page types:

| Route | Purpose |
|---|---|
| `/` | English home — hero intro + publications table |
| `/cs` | Czech home — same layout, localized copy |
| `/papers/[slug]` | Long-form MDX paper with centered title header and serif article body |

Content is authored as MDX files in `content/papers/`. The home page lists primary papers in a three-column table (date, category, title). Translations are sibling MDX files linked via frontmatter and surfaced through the language switcher on paper pages.

**Key characteristics:**
- Warm cream canvas (`{colors.canvas}` — `#faf9f5`) with warm dark ink (`{colors.ink}` — `#161514`).
- Burgundy accent (`{colors.primary}` — `#7a2e2e`) on inline links, MDX anchors, and primary buttons — never as a full-bleed band.
- Source Serif 4 at weight 400 for home headlines, hero copy, section headings, and all MDX body text.
- Inter for navigation, table column headers, paper page titles, and UI labels.
- Near-black footer (`{colors.surface-dark}` — `#121212`) — the only persistent dark surface on the site.
- Max content width 1200px on listing pages; 672px (`max-w-2xl`) for paper article prose.
- Bilingual EN / CS with a pill-style language toggle in the top nav.

## Colors

Tokens are defined as CSS custom properties in `src/app/globals.css` and exposed to Tailwind via `@theme inline`.

### Brand & Accent
- **Burgundy / Primary** (`{colors.primary}` — `#7a2e2e`): Inline links, MDX anchors, primary button background, blockquote left border.
- **Burgundy Active** (`{colors.primary-active}` — `#5c2020`): Link hover state.
- **Burgundy Disabled** (`{colors.primary-disabled}` — `#e6dcdc`): Reserved for disabled primary buttons.

### Surface
- **Canvas** (`{colors.canvas}` — `#faf9f5`): Default page floor for nav, hero, publications, and paper content.
- **Surface Soft** (`{colors.surface-soft}` — `#f2f1ee`): Row hover background on the publications table (`hover:bg-surface-soft/60`).
- **Surface Card** (`{colors.surface-card}` — `#e9e7e2`): Active language-switcher pill, inline code background.
- **Surface Cream Strong** (`{colors.surface-cream-strong}` — `#ded9d1`): Available token; not currently used in components.
- **Surface Dark** (`{colors.surface-dark}` — `#121212`): Footer background, MDX code blocks (`<pre>`).
- **Surface Dark Elevated** (`{colors.surface-dark-elevated}` — `#1c1c1c`): Available token; not currently used.
- **Surface Dark Soft** (`{colors.surface-dark-soft}` — `#171717`): Available token; not currently used.
- **Hairline** (`{colors.hairline}` — `#e2e0db`): Nav border, hero bottom border, table row dividers, empty-state card border, MDX table borders, image borders.
- **Hairline Soft** (`{colors.hairline-soft}` — `#ebe9e4`): Available token; not currently used.

### Text
- **Ink** (`{colors.ink}` — `#161514`): Headlines, wordmark, paper titles, table title column, strong text.
- **Body Strong** (`{colors.body-strong}` — `#211f1d`): Available token; not currently used in components.
- **Body** (`{colors.body}` — `#3a3936`): Hero description, table row text, MDX paragraphs and lists.
- **Muted** (`{colors.muted}` — `#6f6d68`): Table column headers, empty-state body copy.
- **Muted Soft** (`{colors.muted-soft}` — `#8f8c86`): Inactive language-switcher labels.
- **On Primary** (`{colors.on-primary}` — `#ffffff`): Text on burgundy buttons.
- **On Dark** (`{colors.on-dark}` — `#f5f4f2`): Footer wordmark.
- **On Dark Soft** (`{colors.on-dark-soft}` — `#9a9793`): Footer copyright line.

### Semantic
- **Success** (`{colors.success}` — `#4f8a5b`): Defined; not used in current UI.
- **Warning** (`{colors.warning}` — `#b8862f`): Defined; not used in current UI.
- **Error** (`{colors.error}` — `#a83b3b`): Defined; not used in current UI.

## Typography

### Font Families

Loaded via `next/font/google` in `src/app/layout.tsx`:

| Role | Font | CSS variable | Weights loaded |
|---|---|---|---|
| Display & body serif | Source Serif 4 | `--font-source-serif` | 300, 400, 500, 600, 700 (+ italic) |
| UI sans | Inter | `--font-inter` | 400, 500, 600 |
| Code | JetBrains Mono | `--font-jetbrains-mono` | 400, 500 |

`body` defaults to `font-serif` (Source Serif 4). Components opt into `font-sans` where needed.

### Hierarchy in Practice

| Element | Font | Size (desktop) | Weight | Notes |
|---|---|---|---|---|
| Home h1 | Source Serif 4 | 60px (`text-6xl`) | 400 | Left-aligned, `max-w-3xl`, `tracking-tight` |
| Home h2 ("Publications") | Source Serif 4 | 36px (`text-4xl`) | 400 | Left-aligned |
| Hero description | Source Serif 4 | 18px (`text-lg`) | 400 | `text-body`, `max-w-2xl` |
| Paper page h1 | Inter | 52px (`text-5xl`) | 700 | Centered — intentionally sans for contrast with serif article |
| Paper page date | Inter | 14px (`text-sm`) | 400 | Centered below title |
| Paper page "JT-Research" label | Inter | 14px (`text-sm`) | 600 | Centered above title |
| MDX h2 | Source Serif 4 | 30px (`text-3xl`) | 400 | `mt-12` |
| MDX h3 | Source Serif 4 | 24px (`text-2xl`) | 400 | `mt-8` |
| MDX body | Source Serif 4 | 16px (`text-base`) | 400 | `leading-relaxed`, `text-body` |
| Table column headers | Inter | 12px (`text-xs`) | 500 | Uppercase, `tracking-wider`, `text-muted` |
| Nav links | Inter | 14px (`text-sm`) | 500 | Hover → `text-primary` |
| Wordmark | Source Serif 4 | 20px (`text-xl`) | 400 | `tracking-tight` |
| Footer wordmark | Source Serif 4 | 16px (`text-base`) | 400 | `text-on-dark` |
| Inline code | JetBrains Mono | 14px (`text-sm`) | 400 | `bg-surface-card` pill |
| Code blocks | JetBrains Mono | 14px (`text-sm`) | 400 | `bg-surface-dark text-on-dark` |

### Principles
- Display serif stays at weight 400 on the home page. The paper page title deliberately breaks this — Inter bold at large size gives the article header a distinct "publication masthead" feel separate from the listing pages.
- Negative tracking (`tracking-tight`) on large serif and paper titles.
- Links use burgundy with underline (`underline-offset-2` or `underline-offset-4`).

## Layout

### Spacing System
- **Base unit:** 4px (Tailwind default).
- **Section padding:** `{spacing.section}` — 96px (`py-section` / `pb-section`). Used on hero vertical padding (sm+) and publications bottom padding.
- **Hero padding:** `py-24` (96px) on mobile, `sm:py-section` on desktop.
- **Publications section:** `pt-14 sm:pt-16`, `pb-section`.
- **Paper header:** `pt-20 sm:pt-28`, `pb-16 sm:pb-20`.
- **Paper article:** `pb-section`.
- **Footer:** `py-16` (64px).

### Grid & Container
- **Max content width:** 1200px (`max-w-[1200px]`) — nav, hero, publications, footer.
- **Paper article width:** 672px (`max-w-2xl`) for MDX prose.
- **Paper header width:** 768px (`max-w-3xl`), centered.
- **Horizontal padding:** 24px (`px-6`) on all sections.

### Page Structure

**Home (`/` and `/cs`):**
```
┌─────────────────────────────────────────┐
│ TopNav (sticky, 64px, hairline bottom)  │
├─────────────────────────────────────────┤
│ Hero (left-aligned h1 + description)    │
│ border-b hairline                       │
├─────────────────────────────────────────┤
│ Publications table (h2 + 3-col table)   │
│ or empty-state card                     │
├─────────────────────────────────────────┤
│ Footer (dark, full-width)               │
└─────────────────────────────────────────┘
```

**Paper (`/papers/[slug]`):**
```
┌─────────────────────────────────────────┐
│ TopNav (language links → paper slugs)   │
├─────────────────────────────────────────┤
│ Centered header (label, h1, date)       │
├─────────────────────────────────────────┤
│ Article (max-w-2xl MDX prose)           │
│ Author section (border-t hairline)      │
├─────────────────────────────────────────┤
│ Footer                                  │
└─────────────────────────────────────────┘
```

## Elevation & Depth

The site is intentionally flat. Depth comes from surface color contrast, not shadows.

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow | All sections, nav, hero, table |
| Hairline border | 1px `{colors.hairline}` | Nav bottom, hero bottom, table rows, empty state, author divider, MDX tables, images |
| Hover tint | `bg-surface-soft/60` | Publications table row hover |
| Dark surface | `{colors.surface-dark}` fill | Footer, code blocks |

No drop shadows are used anywhere in the current implementation.

## Shapes

| Token | Value | Use |
|---|---|---|
| `{rounded.md}` | 8px | Buttons, language switcher container, language pills |
| `{rounded.lg}` | 12px | Empty-state card, MDX images, code blocks |

## Components

### TopNav (`src/components/TopNav.tsx`)

Sticky header, 64px tall, `{colors.canvas}` at 95% opacity with `backdrop-blur-sm`. Bottom hairline border.

- **Left:** "JT-Research" wordmark — Source Serif 4, links to current language home.
- **Right:** "Papers" / "Články" nav link + language switcher pill.
- **Language switcher:** Bordered container (`border-hairline rounded-md p-0.5`). Active language gets `bg-surface-card`; inactive links are `text-muted` with hover to `text-ink`. On paper pages, links route to translated paper slugs.

### Hero (`src/components/Hero.tsx`)

Full-width cream band below nav. Bottom hairline border. Left-aligned (not centered).

- h1: Source Serif 4, responsive `text-4xl` → `text-6xl`, `max-w-3xl`.
- Description paragraph: `text-lg text-body`, `max-w-2xl`, supports inline React nodes (email link in burgundy).

### PublicationsTable (`src/components/PublicationsTable.tsx`)

Section with `id="papers"` for nav anchor. h2 heading, then a responsive table.

- **Columns:** Date (140px), Category (200px), Title (flexible).
- **Headers:** Inter uppercase caption style.
- **Rows:** Entire row is a single link. Grid layout inside `<td>`. Hover: soft background tint + underline.
- **Empty state:** Centered card with hairline border, serif heading + muted body copy.
- **Overflow:** Horizontal scroll on narrow viewports (`overflow-x-auto`, `min-w-[640px]`).

### Paper Page Header (`src/app/papers/[slug]/page.tsx`)

Centered masthead above the article.

- Small "JT-Research" label (Inter semibold).
- Title (Inter bold, `text-4xl` → `text-5xl`).
- Formatted date below title.

### MDX Article (`src/components/mdx-components.tsx`)

Custom MDX component map for paper body content.

- Headings h2/h3: Source Serif 4, progressive sizes.
- Body: Source Serif 4, `text-body`.
- Links: `text-primary` with underline.
- Blockquotes: left border in `{colors.primary}`, italic.
- Inline code: `bg-surface-card` pill with JetBrains Mono.
- Code blocks: dark background (`surface-dark`), rounded-lg, monospace.
- Images: full width, rounded-lg, hairline border.
- Tables: hairline row borders, sans uppercase headers, serif body cells.

### Author Section

Below the article, separated by `border-t border-hairline`. h2 ("Author" / "Autor") in Source Serif 4, author names in `text-lg text-body`.

### Footer (`src/components/Footer.tsx`)

Full-width `{colors.surface-dark}` band. Flex column on mobile, row on `sm+`.

- Left: "JT-Research" wordmark in `text-on-dark`.
- Right: Copyright line in `text-on-dark-soft`, dynamic year.

### Button (`src/components/Button.tsx`)

Utility component — defined but not currently rendered on any page.

| Variant | Background | Text | Border |
|---|---|---|---|
| `primary` | `{colors.primary}` | `{colors.on-primary}` | none |
| `secondary` | `{colors.canvas}` | `{colors.ink}` | `{colors.hairline}` |
| `text-link` | transparent | `{colors.ink}` | none, underline on hover |

Shared: `h-10`, `px-5`, `rounded-md`, `text-sm font-medium`. Supports `href` (renders as Next.js Link) or native `<button>`.

## Internationalization

| Context | English | Czech |
|---|---|---|
| Home route | `/` | `/cs` |
| Nav "Papers" | Papers | Články |
| Hero title | Research from JT-Research | Výzkum od JT-Research |
| Publications heading | Publications | Publikace |
| Date format | `en-US` (e.g. Jul 20, 2026) | `cs-CZ` (e.g. 20. 7. 2026) |
| Author heading | Author | Autor |

Paper translations are separate MDX files linked via `translations` / `translationOf` frontmatter. The nav language switcher on paper pages links directly to sibling slugs.

## Content Model

Papers live in `content/papers/*.mdx` with gray-matter frontmatter:

```yaml
title: "Paper title"
date: "2026-07-20"
authors: ["Jan Tomášek"]
category: "Economic Research"
lang: en
translations:
  cs: paper-slug-cs
abstract: "One or two sentence summary."
```

Figures and charts are stored in `public/papers/<slug>/` and embedded in MDX with absolute paths.

## Responsive Behavior

| Breakpoint | Key changes |
|---|---|
| Mobile (< 640px) | Hero h1 at `text-4xl`; publications table scrolls horizontally; footer stacks vertically |
| `sm` (≥ 640px) | Hero h1 at `text-6xl`; hero uses `py-section`; footer goes side-by-side |
| `md` (≥ 768px) | Paper title at `text-[3.25rem]` |

No hamburger menu — the nav is minimal enough to stay horizontal at all breakpoints.

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS v4 (`@import "tailwindcss"`), `@tailwindcss/typography` plugin
- **Content:** MDX via `next-mdx-remote`, `gray-matter` for frontmatter
- **Fonts:** `next/font/google` (Source Serif 4, Inter, JetBrains Mono)
- **Tokens:** CSS custom properties in `globals.css`, mapped through `@theme inline`

## File Map

| File | Role |
|---|---|
| `src/app/globals.css` | Color tokens, font theme aliases, body defaults |
| `src/app/layout.tsx` | Font loading, root metadata, body classes |
| `src/components/HomePage.tsx` | Composes home page from TopNav + Hero + PublicationsTable + Footer |
| `src/components/TopNav.tsx` | Sticky header with wordmark, nav link, language switcher |
| `src/components/Hero.tsx` | Home hero band |
| `src/components/PublicationsTable.tsx` | Publications listing table |
| `src/components/Footer.tsx` | Dark footer |
| `src/components/Button.tsx` | Reusable button (unused on current pages) |
| `src/components/mdx-components.tsx` | MDX element styling for paper content |
| `src/lib/home-copy.tsx` | Localized home page copy (EN / CS) |
| `src/lib/papers.ts` | MDX file reading, sorting, translation resolution |

## Do's and Don'ts

### Do
- Keep the canvas warm cream — it is the site's defining surface.
- Use burgundy sparingly: links, hover accents, blockquote borders, primary buttons.
- Use Source Serif 4 for editorial content; Inter for UI chrome and the paper page title.
- Maintain the 1200px max-width container and generous section padding.
- Use hairline borders for structure instead of shadows.

### Don't
- Don't introduce coral, cyan, or cool-gray canvas tones — the palette is Paper & Burgundy.
- Don't add full-bleed accent-color bands — the site stays predominantly cream.
- Don't bold serif display headlines on the home page (weight 400 is intentional).
- Don't use card grids or category tabs for publications — the table layout is the current pattern.

## Known Gaps

- `Button` component exists but is not used on any live page.
- `Badge`, `PaperCard`, and `PaperGrid` were removed during the homepage redesign; only the publications table remains.
- Semantic colors (success, warning, error) and `surface-cream-strong` are tokenized but unused.
- No mobile hamburger nav — acceptable at current nav complexity but would be needed if more links are added.
- Paper page `prose prose-neutral` wrapper is present alongside custom MDX components; some Tailwind Typography defaults may overlap with explicit MDX styles.
- No dark mode.
- No search, filtering, or category tabs on the publications listing.
