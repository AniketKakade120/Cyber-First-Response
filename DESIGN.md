---
name: Cyber First Response
description: A calm, modern civic guidance service for clear cyber-incident action, reporting, and recovery.
colors:
  public-service-blue: "#0057b8"
  public-service-blue-hover: "#004a9f"
  public-service-blue-deep: "#003b73"
  public-service-blue-deeper: "#002f5c"
  public-service-blue-soft: "#eaf3ff"
  public-service-blue-subtle: "#dbeaff"
  public-service-blue-emphasis: "#c7ddf5"
  civic-navy-stage: "#082b55"
  safety-orange: "#e85d04"
  safety-orange-text: "#b64400"
  service-paper: "#ffffff"
  page-neutral: "#fafafa"
  soft-neutral: "#f5f5f5"
  neutral-hairline: "#d9d9d9"
  neutral-gridline: "#737373"
  ink: "#171717"
  muted-ink: "#404040"
  focus-neutral: "#525252"
  status-error: "#8a1a16"
  status-warning: "#ad4e00"
  status-info: "#006d75"
  status-success: "#00522c"
typography:
  display:
    fontFamily: '"Noto Sans Display", "Noto Sans", sans-serif'
    fontSize: "clamp(2.5rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: '"Noto Sans Display", "Noto Sans", sans-serif'
    fontSize: "clamp(2rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  title:
    fontFamily: '"Noto Sans Display", "Noto Sans", sans-serif'
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: "2.25rem"
  body:
    fontFamily: '"Noto Sans", system-ui, sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.5rem"
  label:
    fontFamily: '"Noto Sans", system-ui, sans-serif'
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: "1rem"
    letterSpacing: "normal"
rounded:
  md: "8px"
  lg: "12px"
  xl: "16px"
  island: "32px"
  full: "999px"
spacing:
  2xs: "0.25rem"
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.25rem"
  xl: "1.5rem"
  section-xs: "1.5rem"
  section-sm: "1.75rem"
  section-md: "2.25rem"
  section-lg: "2.5rem"
  section-xl: "3rem"
components:
  button-primary:
    backgroundColor: "{colors.public-service-blue}"
    textColor: "{colors.page-neutral}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 1rem"
    height: "2.5rem"
  button-primary-hover:
    backgroundColor: "{colors.public-service-blue-hover}"
    textColor: "{colors.page-neutral}"
    rounded: "{rounded.md}"
  button-primary-active:
    backgroundColor: "{colors.public-service-blue-deep}"
    textColor: "{colors.page-neutral}"
    rounded: "{rounded.md}"
  button-outline:
    backgroundColor: "{colors.service-paper}"
    textColor: "{colors.public-service-blue-hover}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0 1rem"
    height: "2.5rem"
  input:
    backgroundColor: "{colors.service-paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "0.75rem"
    height: "3rem"
  editorial-panel:
    backgroundColor: "{colors.public-service-blue-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.island}"
    padding: "1.75rem"
  navy-interface-island:
    backgroundColor: "{colors.civic-navy-stage}"
    textColor: "{colors.page-neutral}"
    rounded: "{rounded.island}"
    padding: "2.5rem"
---

# Design System: Cyber First Response

## Overview

**Creative North Star: "The Modern Civic Guidance Desk"**

Cyber First Response feels like a calm public-service guide translated into a polished digital service. The user-pinned five-reference set governs the visual world: oversized editorial hierarchy, deep navy stages, luminous public-service blue, open divided rows, asymmetric white space, and a small number of rounded interface islands. Civic-service seed `55b83fb9` corroborates the official, action-oriented character, but the references supersede its earlier counter-grid composition.

Hierarchy and sequence do more work than repeated cards. Urgent help appears first; a large promise follows; plain-language incident routes remain open and scannable; deeper tasks move into focused UX4G forms and status panels. The mood is authoritative, humane, and decisive—never financial-product glossy, alarmist, or decorative.

Truthfulness is part of the interface character. Local saves and prepared reports must be visually and verbally distinct from official submission, police acknowledgement, institutional tracking, or guaranteed recovery. Accessibility is equally structural: visible focus, semantic landmarks, keyboard operation, minimum practical target sizes, responsive reflow, and reduced-motion behavior are non-negotiable.

**Key Characteristics:**

- Deep navy gradient stages surrounded by crisp service paper.
- Oversized, tightly tracked editorial headings with short line lengths.
- Open incident routes separated by hairlines instead of boxed card repetition.
- Asymmetric 12-column desktop compositions that collapse predictably.
- Selective pale-blue and neutral panels, with restrained elevation.
- Orange and red reserved for urgency, warning, or exceptional emphasis.
- UX4G 2.0.1 remains the authority for tokens, controls, and interaction states.
- A curved route motif connects citizen, action, and verified next step.

## Colors

The palette pairs official deep navy and service blue with white and pale neutral surfaces; warm accents are scarce so urgency retains meaning.

### Primary

- **Public-Service Blue** (`#0057b8`): primary actions, route cues, borders, selection, and interactive emphasis.
- **Public-Service Blue Hover** (`#004a9f`): hover state for primary controls and the default brand-text blue.
- **Public-Service Blue Deep / Deeper** (`#003b73` / `#002f5c`): active states and the dark end of civic gradients.
- **Blue Soft / Subtle / Emphasis** (`#eaf3ff` / `#dbeaff` / `#c7ddf5`): hover washes, selected information, large tonal panels, and light text accents inside navy stages.

### Secondary

- **Safety Orange** (`#e85d04`): the brand-mark underscore and exceptional urgency emphasis.
- **Safety Orange Text** (`#b64400`): readable warm emphasis on light surfaces.

### Tertiary

- **Status Error** (`#8a1a16`), **Status Warning** (`#ad4e00`), **Status Info** (`#006d75`), and **Status Success** (`#00522c`): UX4G semantic feedback only; do not repurpose these as decorative accents.

### Neutral

- **Civic Navy Stage** (`#082b55`): hero, saved-report, safety, and footer stages that need institutional weight.
- **Service Paper** (`#ffffff`): navigation, elevated controls, and the primary reading surface.
- **Page Neutral** (`#fafafa`) and **Soft Neutral** (`#f5f5f5`): page canvas and low-emphasis content panels.
- **Ink** (`#171717`) and **Muted Ink** (`#404040`): primary and supporting copy.
- **Neutral Hairline** (`#d9d9d9`) and **Neutral Gridline** (`#737373`): open-row dividers and stronger structural boundaries.
- **Focus Neutral** (`#525252`): visible local focus outlines where the component does not use the UX4G blue focus ring.

### Named Rules

**The Urgency Is Scarce Rule.** Orange and red identify genuinely urgent or exceptional states; they never become broad decorative palette colors.

**The Navy Stage Rule.** Deep navy appears as a deliberate stage or interface island, not as a background on every section.

**The Semantic Ownership Rule.** Application colors map to UX4G semantic variables once; components consume those semantic roles rather than introducing new one-off values.

Dark theme remaps primary action to `#6eb2ff`, hover to `#8fc4ff`, stronger states to `#a8d1ff` and `#c2deff`, soft surfaces to `#173452`, `#214566`, and `#2b5578`, orange to `#ff9b5c`, warm text to `#ffb27f`, and the navy stage to `#071a2f`.

## Typography

**Display Font:** Noto Sans Display (with Noto Sans and sans-serif fallback)  
**Body Font:** Noto Sans (with system-ui and sans-serif fallback)  
**Label Font:** Noto Sans (with system-ui and sans-serif fallback)

**Character:** One family system creates the clarity of an official service, while the display cut, large scale, tight tracking, and deliberate line breaks add contemporary editorial presence. Weight and spacing establish authority without ornament.

### Hierarchy

- **Display** (700, `clamp(2.5rem, 5vw, 3.75rem)`, `1.02`): the homepage promise only, held to roughly 18 characters per line and reduced to `2.5rem` on mobile.
- **Headline** (700, `clamp(2rem, 4vw, 3rem)`, `1.08`): editorial section statements with selective blue continuation text; reduced to `2rem` on mobile.
- **Title** (700, `1.75rem`, `2.25rem`): UX4G strong page and major section headings before local responsive rules.
- **Body** (400, `1rem`, `1.5rem`): task copy and form guidance; lead copy may use `1.125rem` with a `1.625rem` line height and stays near 54–68 characters.
- **Label** (700, `0.75rem`, normal tracking): compact utilities, form labels, saved-state messages, and interface metadata. The hero interface eyebrow alone uses `0.08em` tracking.

### Named Rules

**The Hierarchy Before Containers Rule.** Use scale, weight, line length, and white space to establish sections before adding a panel or border.

**The Short Promise Rule.** Display headlines remain short, left aligned, and deliberately broken; dense instructions belong in body copy.

## Layout

The base UX4G container reaches `1320px` at its widest with a `1.5rem` horizontal gutter. The homepage uses a 12-column editorial composition for service and guidance sections. Headings can occupy columns 1–4 while task modules occupy the remaining span; the visual imbalance creates generous breathing room and a clear reading sequence.

The hero is a two-column `6fr / 5fr` stage with a minimum height of `24rem`, `2.5rem` internal padding, and a large citizen-to-safe-step interface on the right. Incident choices form two open columns with no outer box, a `2.5rem` inter-column channel, and `1px` top dividers. Reporting workspaces use a flexible main column plus a `19–23rem` support rail; status views use a `3fr / 2fr` split.

Spacing follows the implemented UX4G rhythm: `0.25rem`, `0.5rem`, `0.75rem`, `1rem`, `1.25rem`, and `1.5rem` for local gaps and padding, with section steps at `1.5rem`, `1.75rem`, `2.25rem`, `2.5rem`, and `3rem`. Prefer meaningful empty space and aligned edges over adding wrappers.

At `64rem` and below, desktop navigation becomes the mobile menu, the hero becomes one column, report support moves below the form, and 12-column compositions resolve into two columns with key modules spanning both. At `48rem` and below, content becomes one column, headline sizes reduce, panels tighten, form grids stack, full-width actions replace action rows, the horizontal stepper becomes a compact mobile progress bar, and a fixed five-destination service nav appears above the safe-area inset. Print removes global navigation, footer, mobile navigation, complaint actions, and alert actions.

**The Open Row Rule.** A list of routes is divided, not tiled: use one hairline and one hover wash per row instead of four enclosing borders.

**The Mobile Continuity Rule.** Home, Report, Track, Check, and Help remain reachable from the fixed bottom navigation on narrow screens.

## Elevation & Depth

Depth is restrained and functional. Most hierarchy comes from tonal layering, navy gradients, rounded stage silhouettes, and hairline separation. UX4G level 1 anchors the sticky masthead and primary report surface; level 2 lifts the saved-report island and mobile service navigation; level 3 is reserved for the route interface and context alerts. Flat content remains the default.

### Shadow Vocabulary

- **Level 1** (`0px 1px 2px 0px rgba(0,0,0,.04), 0px 1px 2px 0px rgba(0,0,0,.04)`): sticky masthead and focused report surface.
- **Level 2** (`0px 4px 8px 0px rgba(0,0,0,.08), 0px 1px 2px 0px rgba(0,0,0,.04)`): selective navy service island and fixed mobile navigation.
- **Level 3** (`0px 8px 16px 0px rgba(0,0,0,.16), 0px 4px 8px 0px rgba(0,0,0,.08)`): the hero route interface and UX4G context alerts.
- **Focus Ring** (`0 0 0 0.125rem #fafafa, 0 0 0 0.25rem #0057b8` in light theme): high-contrast keyboard focus around components using the UX4G focus shadow.

### Named Rules

**The Flat-By-Default Rule.** Do not shadow ordinary content modules or open route rows; elevation marks sticky, focused, floating, or high-attention interface layers.

## Shapes

Controls use gently rounded `8px` corners. Alerts and compact cards use `12px`; larger tonal modules use `16px`; signature hero and interface islands double that to `32px`. Circular nodes, badges, and the brand mark use a `999px` radius. Open rows use square edges and hairline rules.

The recurring silhouette is the curved route: circular start and end nodes connected by straight segments and one rounded turn. It communicates guided progression without illustrative clutter. The hero also uses an oversized clipped ring, creating depth while preserving the civic geometry.

**The Island Contrast Rule.** Large radii belong to a few intentional interface islands; do not round every section into a card.

## Components

UX4G 2.0.1 supplies the canonical controls, typography utilities, cards, alerts, stepper, accordion, tags, and navigation foundations. Application CSS composes them into the editorial civic layout.

### Buttons

- **Shape:** gently rounded (`8px`) with medium-weight `1rem` text and a `2.5rem` minimum height for medium controls; large buttons reach `3rem`.
- **Primary:** public-service blue on near-white text with `1rem` horizontal padding.
- **Hover / Focus:** hover deepens to Public-Service Blue Hover; active deepens again; focus stays visibly ringed. State transitions run `150ms ease`, with press transform feedback at `80ms ease`.
- **Secondary / Ghost / Tertiary:** outlined actions use service paper, a blue border, and blue text; text actions are reserved for lower-priority continuation, editing, and help.
- **Hero Exception:** the outlined button becomes transparent with white border and text, then returns to service paper with blue text on hover.

### Chips

- **Style:** UX4G tonal tags use compact type and soft semantic fills for optional, informational, and warning metadata.
- **State:** tags describe status or field meaning; they are not decorative category pills and do not replace buttons.

### Cards / Containers

- **Corner Style:** use `16px` for standard editorial modules and `32px` for high-emphasis islands; open content may stay square.
- **Background:** service paper for focused work, soft neutral for low-emphasis guidance, blue-soft for supportive action, and navy gradients for key stages.
- **Shadow Strategy:** flat by default; apply the elevation vocabulary only where the component floats or anchors a workflow.
- **Border:** omit borders on editorial modules; use `1px` neutral hairlines for lists, review rows, and legacy UX4G outline cards.
- **Internal Padding:** `1.5rem` for compact modules, `1.75rem–2.25rem` for editorial modules, and `2.5rem` for the desktop hero stage.

### Inputs / Fields

- **Style:** white surface, `8px` radius, neutral stroke, `3rem` medium height, `1rem` body text, and clear external labels and hints.
- **Focus:** a visible `2px` focus outline with `0.125rem` offset for native fields, or the UX4G focus treatment for library inputs.
- **Error / Disabled:** use UX4G semantic error messaging and state colors; disabled fields reduce contrast without removing their label or meaning.

### Navigation

The utility bar is compact and operational, keeping emergency contacts, text-size controls, language status, and theme switching visible. The white masthead is sticky with level-1 elevation; desktop links use compact medium-weight text and one clear report action. Below `64rem`, the desktop links collapse into a menu. Below `48rem`, the fixed five-item bottom service nav provides `2.25rem` minimum targets plus safe-area padding and a `2px` top rule.

### Incident Route Row

Each route is an open two-line row with a `2.25rem` circular tonal icon, a strong `1.125rem` title, supporting `0.875rem` copy, and a trailing blue arrow. A `1px` top rule supplies structure; hover adds a blue-soft wash and `1rem` inline inset over `160ms ease-out`. The first, most urgent financial-loss icon alone receives the warning-soft treatment.

### Navy Guidance Stage

The signature stage combines the navy-to-deep-blue gradient, a short oversized promise, white and pale-blue type, a route visualization, and a separately raised blue interface island. It communicates progression; it must not become a generic promotional banner.

## Do's and Don'ts

### Do:

- **Do** start urgent journeys with the immediate action rail before the broader service promise.
- **Do** use oversized, short, left-aligned editorial headings and let asymmetric white space carry hierarchy.
- **Do** keep route choices open, divided, and easy to scan; preserve the icon-title-description-arrow sequence.
- **Do** use UX4G semantic tokens and component states, including visible keyboard focus and reduced-motion support.
- **Do** distinguish a report saved on this device from an official submission or institutional acknowledgement in both copy and status styling.
- **Do** preserve responsive task continuity with stacked forms, full-width mobile actions, and fixed bottom navigation.

### Don't:

- **Don't** turn every module into a bordered, elevated, or rounded faux card.
- **Don't** use orange or red as ambient decoration, broad backgrounds, or competing calls to action.
- **Don't** make the service resemble a fintech landing page, a generic feature-card gallery, or an alarm-heavy emergency screen.
- **Don't** invent verified statistics, response-time guarantees, recovery promises, agency endorsements, or official-submission states.
- **Don't** introduce new colors, type families, radii, or shadow levels outside the mapped UX4G system without updating this contract.
- **Don't** hide safety, privacy, or local-only reporting distinctions behind hover, disclosure, or decorative language.
