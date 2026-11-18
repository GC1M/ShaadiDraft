# ShaadiTemplate

## Gallery labels (strict)

Customers find designs only through the gallery filters (event, language, God or sacred symbol), so every template's labels must match what the card actually shows. Check this every time a template is added or its artwork changes.

- **Symbol:** every god, deity or sacred figure visible anywhere on the card (painted art, emblem, shloka) must be a filter option, and the template must be tagged with it. `symbol` is the main one (it drives the cover invocation and emblem); put any others in `also`.
- **Missing symbol:** if the figure has no option yet, add it. That means a new id in `SYMBOL_IDS` (`src/types.ts`), its label in `SYMBOLS` (`src/i18n.ts`), its invocation in every `src/samples/*.ts`, and its drawing in `Emblem` (`src/card/motifs.tsx`). Never tag the card with the nearest existing option instead.
- **Event and language:** `event` and `lang` must match the card's occasion and the script its sample text is written in.
- Use `floral` only for cards with no sacred figure at all.
