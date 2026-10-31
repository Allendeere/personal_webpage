# Asset provenance

Project images and the gameplay video were supplied by Sarah from her portfolio directory. Original files in Downloads are unchanged. Images are resized and encoded as WebP. Original filenames and dimensions are recorded in `src/asset-manifest.json`.

At Sarah's request, all eight corporate website screenshots have had both company identities removed, including header logos, Chinese and English names in navigation, headings, paragraphs, and the vertical illustration label. Neutral wording replaces identifying text. Only recorded crop regions are changed; the surrounding image pixels are preserved. Lossless patches and coordinates are maintained in `scripts/asset-edits/corporate/` and reapplied on import.

On 2026-11-01, all thirteen speech-game images received a restrained style refinement to backgrounds, palette, and illustrated finish. The original game scenes and interface structure are retained. Original information-bearing overlays were composited back where needed, including dialogue and the composite statistics panel. Records, the calendar, and the six statistical graphs retain their original text, values, controls, and shapes; only existing blank cream surfaces receive a subtle generated paper texture. The reviewed derivatives are maintained in `scripts/asset-edits/speech/` and reused on import. These are styled presentation derivatives of the supplied screenshots.

Edits used built-in imagegen, followed by crop compositing and lossless WebP encoding. Exact prompts are recorded in `scripts/asset-edits/prompts.json`. Other projects have no new styling changes. The retired magnetic-game composite and duplicate speech-therapy image are excluded.
