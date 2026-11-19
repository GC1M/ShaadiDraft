---
name: ShaadiTemplate
description: Free Indian wedding invitation maker, presented like a bride's trousseau box.
colors:
  wine: "#4a0e1c"
  wine-deep: "#2c0710"
  velvet-glow: "#6e1a2d"
  maroon: "#6b1428"
  zari: "#c9a45c"
  zari-light: "#d8b56c"
  zari-foil: "#f0d595"
  zari-shadow: "#b48c45"
  antique-gold: "#9a7330"
  rose: "#f7edea"
  paper: "#fffaf6"
  ink: "#2b1418"
typography:
  display:
    fontFamily: "Bodoni Moda, Didot, serif"
    fontSize: "64px"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bodoni Moda, Didot, serif"
    fontSize: "56px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Bodoni Moda, Didot, serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.375
  body:
    fontFamily: "Jost, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Jost, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    letterSpacing: "0.22em"
  devanagari-accent:
    fontFamily: "Tiro Devanagari Hindi, serif"
    fontSize: "16px"
    fontWeight: 400
rounded:
  sm: "2px"
  md: "6px"
  full: "9999px"
spacing:
  gutter: "16px"
  gutter-sm: "24px"
  container: "1152px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.zari}"
    textColor: "{colors.wine-deep}"
    typography: "{typography.body}"
    rounded: "{rounded.full}"
    padding: "16px 32px"
  button-secondary:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.rose}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
  button-secondary-hover:
    backgroundColor: "{colors.wine-deep}"
  button-outline-on-velvet:
    textColor: "{colors.rose}"
    rounded: "{rounded.full}"
    padding: "10px 16px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
  select-filter:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "10px 40px 10px 16px"
  segmented-active:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.rose}"
    rounded: "{rounded.full}"
    padding: "6px 14px"
  segmented-active-on-velvet:
    backgroundColor: "{colors.zari}"
    textColor: "{colors.wine-deep}"
    rounded: "{rounded.full}"
    padding: "6px 14px"
---

# Design System: ShaadiTemplate

## Overview

**Creative North Star: "The Trousseau Box"**

The site is the box a bride's trousseau is shown in: a lining of wine velvet, edges finished in gold zari, and the cards themselves laid out on ivory silk for the family to look over. Velvet frames the moments of arrival and action (the hero, the editor's toolbar and settings panel); ivory rose holds the browsing (the gallery, the editor's form, the static pages). Zari is the thread that stitches the two together, and it is spent sparingly so it still reads as gold.

The chrome exists to present the cards, not to compete with them. Card designs bring their own palettes, fonts and painted art; the site stays in its three materials (velvet, zari, ivory) so any card looks right on it. Ornament is textile and ceremonial (a woven buta border, a line-drawn mandap, falling marigold petals, a flickering diya), drawn in thin gold strokes, never filled clip-art.

Scope: this file governs the site chrome only (the gallery and hero in `src/App.tsx` and `src/Hero.tsx`, the editor in `src/Editor.tsx`, shared primitives in `src/ui.tsx` and `src/index.css`, and the static pages styled by `public/legal.css`). Card designs (`src/card/`) and the Ananya & Arjun sample couple site (`src/site/`, scoped under `.ov` and `.fm`) are separate worlds with their own palettes and are not bound by these tokens.

**Key Characteristics:**
- Two grounds only: wine velvet with grain, and warm ivory rose.
- Zari gold as foil (gradient, catches light on hover), never as a flat fill for large areas.
- Bodoni Moda for anything ceremonial; Jost for everything functional.
- Pills for actions and filters, gentle 6px corners for form fields, square cards.
- Motion is ritual: things draw themselves, rise in, or shimmer; all of it stops under reduced motion.

## Colors

A warm, low-key palette of wine, gold and ivory, taken from wedding textiles rather than from screen UI.

### Primary
- **Wine Velvet** (wine): the ground of every dark surface (hero, editor toolbar, settings panel, static page header), the fill of secondary buttons and active segmented options on ivory, and the main link and text accent on ivory.
- **Deep Wine Lining** (wine-deep): shadowed corners of the velvet, hover state of wine buttons, text on zari buttons, and the band behind the woven zari border.
- **Velvet Glow** (velvet-glow): only inside the velvet gradient, as the soft pool of light upper right.

### Secondary
- **Zari Gold** (zari): the gold thread. Event-tab underline, link underlines, the hero mandap strokes, the ✦ separators, eyebrow labels on velvet, focus ring on velvet, active segmented option on velvet.
- **Zari Foil** (zari-foil, zari-light, zari-shadow): the stops of the metallic foil gradient on primary buttons, the scroll-progress bar and the woven border. Always used together as a gradient, never alone.
- **Antique Gold** (antique-gold): zari dimmed to read on ivory; the focus ring on light grounds.
- **Maroon** (maroon): link color on the static pages.

### Neutral
- **Ivory Rose** (rose): page background of the gallery and static pages, and the text color on velvet (at 60 to 85% opacity for secondary copy).
- **Paper** (paper): inputs, selects and inset panels on ivory, one step lighter than the page.
- **Kohl Ink** (ink): body text on ivory. Secondary text uses ink at 55 to 70% opacity; hairlines use wine at 10 to 30% opacity.

### Named Rules
**The Thread, Not the Cloth Rule.** Zari is a thread. It appears as strokes, underlines, hairlines, small labels and the foil on one primary button per view. It never fills a section, a card or a panel.

**The Two Grounds Rule.** Every surface is either wine velvet or ivory rose (with paper for fields). No grays, no third background color, no pure white or pure black.

## Typography

**Display Font:** Bodoni Moda (with Didot, serif)
**Body Font:** Jost (with system-ui, sans-serif)
**Script accent:** Tiro Devanagari Hindi, for the Devanagari word beside the logo.

**Character:** A high-contrast Didone that feels like an engraved wedding card, paired with a clean geometric sans that keeps the tool parts plain and readable.

### Hierarchy
- **Display** (400, 40px mobile, 56px tablet, 64px desktop, line-height 1.04, -0.02em, balanced wrap): the hero headline only, arriving word by word.
- **Headline** (400, 40px mobile, 56px desktop, line-height 1, -0.015em): section heads such as "Choose your design". The greeting ribbon uses the same face in italic at 26 to 32px.
- **Title** (400, 24px; design names at 19px, line-height 1.375): editor step headings (with an italic zari step number), empty-state message, design names under each card.
- **Body** (400, 15px for controls, links and tabs; 17px with relaxed leading for hero copy and static pages): all functional text.
- **Label** (500, 13px, 0.22em tracking, uppercase, zari): eyebrow above the hero headline. Editor field labels are 13px sentence case in ink at 65%.

### Named Rules
**The Engraved Voice Rule.** Bodoni Moda is for ceremony: headlines, names, step numbers, the brand. Buttons, inputs, filters, tabs and help text are always Jost.

## Layout

Content sits in a centered container of 1152px (`max-w-6xl`) with a 16px gutter on phones and 24px from 640px up. Sections breathe: the gallery opens 64px below the ribbon and leaves 96px at the bottom. The gallery grid is 2 columns on phones, 3 from 768px and 4 from 1024px, with generous vertical gaps (56px) so each card reads as its own object. The event tab bar sticks to the top on a translucent ivory blur and scrolls sideways on phones. The hero is a fixed-height stage (640 to 880px, 88vh) on desktop with the copy standing inside the mandap's opening; below 768px the mandap becomes a normal block and the copy follows it. The editor is a two-pane layout on large screens (velvet preview, ivory form) and a single column with a floating zari download button on phones. Static pages use a single 720px reading column.

## Elevation & Depth

Depth comes from material, not from stacked panels. Velvet gets its depth from grain and two radial pools of light; ivory stays flat. Shadows are long, soft and warm-tinted (wine or near-black, never neutral gray), and they belong to objects that are physically "lifted": the cards in the gallery and the foil button.

### Shadow Vocabulary
- **Card at rest** (`box-shadow: 0 18px 40px -18px rgba(43, 20, 24, .55)`): every gallery card.
- **Card lifted** (`box-shadow: 0 28px 50px -20px rgba(43, 20, 24, .6)`): hover or focus, paired with a 6px translate up and a zari hairline outline 6px out.
- **Foil button** (`box-shadow: 0 1px 0 rgba(255, 240, 200, .6) inset, 0 14px 30px -12px rgba(10, 0, 4, .7)`): primary zari buttons.
- **Velvet bar** (`box-shadow: 0 8px 24px -12px rgba(10, 0, 4, .6)`): the sticky editor toolbar.

### Named Rules
**The Lifted Object Rule.** Only cards and the foil button cast shadows. Panels, inputs and sections sit flat and are separated by hairlines or a change of ground.

## Shapes

Three corner values, each with a job. Pills (fully round) for anything you tap to act or choose: buttons, filter selects, segmented controls, the featured badge. A gentle 6px corner for things you type into and inset panels. Square corners for invitation cards, because they are printed objects. Borders are hairlines in wine at low opacity; the one decorative edge is the woven zari border (a repeating buta and diamond pattern) that marks the change from velvet to ivory.

## Components

### Buttons
Tactile and ceremonial: the primary action looks like gold foil.
- **Shape:** fully round pill (9999px).
- **Primary (foil):** a vertical foil gradient from zari-foil through zari and zari-shadow to zari-light, wine-deep text, medium weight, 16px by 32px in the hero and 10px by 16px in the editor. On hover the gradient slides to show its lower half; the hero CTA also carries a light sweep every 4.5s. One foil button per view.
- **Secondary (wine):** wine fill, ivory rose text; hover deepens to wine-deep.
- **Outline on velvet:** transparent, ivory rose text, zari hairline at 70%; hover adds a 10% white wash.
- **Text link:** wine text with a zari underline offset 6px; hover turns the underline wine.
- **Focus:** 2px antique-gold outline offset 3px (zari on velvet). Disabled at 60% opacity.

### Chips / Segmented controls
- **Style:** a pill track (wine at 6% with a wine hairline on ivory; black at 20% with a zari hairline on velvet) holding pill options.
- **State:** selected is wine with rose text on ivory, zari with wine-deep text on velvet. Unselected is ink at 70% (rose at 75% on velvet), hover to full.

### Cards / Containers
- **Corner Style:** square for invitation cards; 6px for inset form panels; 2px for the dashed empty-state box.
- **Background:** the card's own artwork; inset panels use paper at 70% with a wine hairline at 10%.
- **Shadow Strategy:** see Card at rest and Card lifted.
- **Border:** none at rest; a zari hairline outline appears 6px outside the card on hover and focus.
- **Internal Padding:** 16px for inset panels.

### Inputs / Fields
- **Style:** paper fill, wine hairline at 20%, 6px corners, 10px by 14px padding, 16px text (prevents iOS zoom).
- **Hover / Focus:** border strengthens to wine at 40%, then solid wine on focus with a 2px zari ring at 40%.
- **Filter selects:** same materials as a pill with a custom wine chevron.

### Navigation
- **Header:** sits on velvet. Brand is Bodoni Moda italic 24px with the logo and a zari Devanagari accent; links are 15px rose at 80%, full rose with an underline on hover.
- **Event tabs:** a row of 15px text tabs over a wine hairline, each with a count in ink at 40%. The chosen tab is wine and gets a 2px zari thread that grows from the center.
- **Scroll progress:** a 3px foil bar fixed to the top of the gallery.

### Woven Zari Border (signature)
A 40px band on deep wine with two gold rules top and bottom and a repeating buta (paisley) and mirrored buta around a diamond, filled with the foil gradient. It marks the seam between velvet and ivory, like the edge of a sari.

### Mandap Hero (signature)
A gold line drawing of a mandap that draws itself stroke by stroke on load (platform first, dome last), then lights its diyas (which keep flickering) and lets marigold and rose petals fall outside the pillars. The headline stands in the opening on a soft pool of lamplight.

## Do's and Don'ts

### Do:
- **Do** keep every surface on one of two grounds: wine velvet (with its grain) or ivory rose, with paper for fields.
- **Do** use the foil gradient for the single primary action in a view, and zari strokes or underlines for everything else gold.
- **Do** set ceremonial text in Bodoni Moda and every control in Jost.
- **Do** use pills for actions and filters, 6px corners for fields, square corners for cards.
- **Do** tint shadows with wine or near-black and keep them long and soft.
- **Do** honor `prefers-reduced-motion`: every intro, draw, petal, shine, ribbon and scroll animation has a static fallback.
- **Do** let the card artwork lead: the chrome around a card stays quiet.

### Don't:
- **Don't** fill a section, panel or card background with zari gold.
- **Don't** introduce grays, pure white, pure black or a new accent color into the chrome.
- **Don't** use Bodoni Moda for buttons, inputs, tabs or help text.
- **Don't** add shadows to panels, inputs or sections.
- **Don't** apply these tokens to card designs or the sample couple site; they have their own worlds.
- **Don't** use bounce or elastic easing in the chrome; motion decelerates smoothly (the intro uses `cubic-bezier(.2,.7,.2,1)`).
