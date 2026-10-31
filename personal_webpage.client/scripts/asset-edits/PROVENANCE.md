# Asset provenance

Project images and the gameplay video were supplied by Sarah from her portfolio directory. Original files in Downloads are unchanged. Images are resized and encoded as WebP. Original filenames and dimensions are recorded in `src/asset-manifest.json`.

At Sarah's request, all eight corporate website screenshots have had both company identities removed, including header logos, Chinese and English names in navigation, headings, paragraphs, and the vertical illustration label. Neutral wording replaces identifying text. Only recorded crop regions are changed; the surrounding image pixels are preserved. Lossless patches and coordinates are maintained in `scripts/asset-edits/corporate/` and reapplied on import.

On 2026-11-01, Sarah rejected the speech-game style edits because the results appeared blurrier. All thirteen speech-game images were restored byte-for-byte from commit `a93c76b`, before the restyling. The generated derivatives and import overrides were removed. These images use the original supplied artwork, with only the pre-existing resize and WebP encoding. Future imports use the original portfolio files directly.

Corporate anonymization used built-in imagegen, followed by crop compositing and lossless WebP encoding. Exact corporate prompts are recorded in `scripts/asset-edits/prompts.json`. Other projects have no new styling changes. The retired magnetic-game composite and duplicate speech-therapy image are excluded.
