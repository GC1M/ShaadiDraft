# ShaadiTemplate

## Gallery labels (strict)

Customers find designs only through the gallery filters (event, language, God or sacred symbol), so every template's labels must match what the card actually shows. Check this every time a template is added or its artwork changes.

- **Symbol:** every god, deity or sacred figure visible anywhere on the card (painted art, emblem, shloka) must be a filter option, and the template must be tagged with it. `symbol` is the main one (it drives the cover invocation and emblem); put any others in `also`.
- **Missing symbol:** if the figure has no option yet, add it. That means a new id in `SYMBOL_IDS` (`src/types.ts`), its label in `SYMBOLS` (`src/i18n.ts`), its invocation in every `src/samples/*.ts`, and its drawing in `Emblem` (`src/card/motifs.tsx`). Never tag the card with the nearest existing option instead.
- **Event and language:** `event` and `lang` must match the card's occasion and the script its sample text is written in.
- Use `floral` only for cards with no sacred figure at all.

## Static pages and SEO

See `doc/SEO.md` for the plan (the `doc/` folder is private and gitignored; it lives in the main checkout). After adding or editing anything in `public/*.html` or `index.html`, run `python3 scripts/seo.py` to refresh head tags, share images and the sitemap. A new template needs its cover preview at `public/templates/previews/<id>.webp` (540x960); render it with `python3 scripts/previews.py <id>` while `npm run dev` runs. Re-render whenever a template's sample text, design or artwork changes: CI runs `node scripts/previews-check.mjs` and fails on stale previews.
