# Corporate screenshot anonymization

On 2026-10-31 Sarah requested removal of the CHUN MILE and DRAGON MILE logos shown in the website screenshot headers. All eight corporate screenshots are covered. The original download files are unchanged.

Method: built-in imagegen edited a montage of only the eight logo regions. The resulting clean background patches were composited at the exact coordinates in regions.json. The delivered WebP files are lossless derivatives; decoded pixels outside those rectangles are identical to the previous website assets. The output filenames include `-unbranded` to bypass cached branded images. The asset preparation script reapplies these patches when importing the originals again.

On 2026-11-01 Sarah clarified that all remaining company names must also be removed. Fifteen additional crop patches in `names/` cover the Chinese and English references in navigation, headings, paragraphs, and the vertical illustration label. Built-in imagegen removed identifying text and reconstructed the particle illustration behind the vertical label. Matching neutral type replaces the navigation and body references with wording such as 關於我們, 團隊, ABOUT US, and SERVICES. Plain background patches are matched to the original crop boundaries. Exact new prompts are in `../prompts.json`.

Current public filenames use `-anonymous.webp` to bypass older cached images. All 23 patches are reapplied when importing the originals; no identifying company text remains in the displayed screenshots. Layout and pixels outside the listed regions remain unchanged.

## Exact imagegen edit prompt

Precise image edit. The input image is a 720 by 480 pixel montage of eight small website header crops, arranged in 2 columns and 4 rows on a light gray separator background. In EVERY one of the eight pale rectangular crops, completely remove the brand logo AND all accompanying brand wordmark text (the blue CM symbol with Chinese name and CHUN MILE, and the blue shield with DRAGON MILE. and Chinese company name). Paint those removed areas with the same plain pale background color as the surrounding crop. Keep each of the eight rectangles in its exact original position and size and preserve each crop's own background tone. Preserve the gray gaps and overall geometry. Output only the cleaned montage at the same aspect ratio. No substitute logos, no letters, no symbols, no visible remnants, no blur blocks. Do not add any new content. These crops will be composited into the unchanged original screenshots, so matching their original backgrounds is critical.
