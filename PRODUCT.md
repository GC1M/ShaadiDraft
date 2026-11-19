# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Indian families making invitation cards for their own ceremonies. Two groups are served equally until analytics shows which one dominates:

- **The couple and their family** (bride, groom, siblings, parents), mostly on phones, making cards to send on WhatsApp.
- **Parents and elders** making traditional kankotris and lagna patrikas, often in a regional script.

Open decision: which group to prioritize. Revisit once Google Analytics and Clarity data is in.

## Product Purpose

A free online maker for Indian wedding and family-ceremony invitation cards. The visitor picks a design for a ceremony, fills in the families' names and details in their language, and downloads a card. Success is a finished card shared on WhatsApp or sent to print.

## Positioning

- **Regional and traditional.** Real kankotri, lagna patrika, shaadi card and Anand Karaj formats in Gujarati, Hindi, Marathi, Punjabi, Tamil and English, carrying the correct god, sacred symbol and invocation for the family. Phonetic typing means no Indian keyboard is needed.
- **Free, no login.** No account; drafts stay in the visitor's browser and the download is immediate.
- **Same card, any language.** Switching a card's language keeps the exact pages, sections, sizes, artwork and ornaments; only the words change.

## Operating Context

- Ceremonies: Save the Date, Ring Ceremony, Haldi, Mehendi, Sangeet, Wedding, Reception, Baby Shower (Simant).
- Outputs: a 1080x1920 story image for WhatsApp and a 5x7 inch print-ready PDF.
- Discovery is through the gallery filters (ceremony, language, God or sacred symbol) and through static SEO pages: per-design pages, language and ceremony hubs, and wording guides in `public/`.
- Made in Surat, India.

## Capabilities and Constraints

- React + Vite + Tailwind single-page editor (`src/`) plus static HTML pages (`public/`).
- Invite data is one serializable JSON object persisted to localStorage (`src/types.ts`); a hosted couple microsite is a planned later phase.
- Couple photo upload into design photo windows.
- Gallery labels must match what each card shows (see `CLAUDE.md`).
- Business model: free with ads today. Paid features (premium designs, high-resolution downloads) are planned, not live; `public/refund.html` already describes them.

## Brand Commitments

- Name: ShaadiTemplate (shaaditemplate.com). Contact: hello@shaaditemplate.com.
- Logo assets: `public/favicon.svg`, `public/logo-on-dark.svg`, app icons in `public/`.

## Evidence on Hand

- 89 design and hub pages in `public/templates/`, cover previews in `public/templates/previews/`, wording guides in `public/guides/`.
- No testimonials, user counts, reviews or press exist. Do not invent them.

## Product Principles

1. Cultural correctness beats decoration: the right god, invocation, script and format for the family's tradition.
2. Free and frictionless: no login wall, no forced steps between picking a design and downloading it.
3. Language is a swap, not a redesign: every card holds its layout in every language.
4. Built for phones first, with print as a first-class output.
5. Usable by elders as well as the couple: plain words, readable sizes, regional scripts treated as native, not as translations.
