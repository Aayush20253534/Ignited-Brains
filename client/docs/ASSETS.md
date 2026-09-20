# Ignited Brains asset system

The screenshots supplied for the rebuild are the visual source of truth, but a screenshot is not a maintainable website asset. This project therefore keeps page photography, reusable artwork, icons and design-reference images separate.

## Directory contract

```text
public/
├── brand/        Brand-owned logos and marks
├── common/       Reusable photography shared across pages
├── home/         Home-only photography
├── about/        About-only photography
├── solutions/    Solutions landing photography
├── space-lab/    Space Lab photography
├── schools/      Schools & Institutions photography
├── projects/     Projects photography
├── media/        Media page photography
├── contact/      Partner/Contact photography
├── icons/        Static SVG icons
├── decorative/   Non-content SVG decoration
└── reference/    Optional local design-reference screenshots
```

Do not put a 2048px full-page screenshot into a section as a background and call the page finished. It may look accurate at one viewport, right up until a user owns a different monitor.

## Naming

Use lowercase kebab-case:

```text
hero-robotics.webp
project-mars-rover.webp
gallery-space.webp
```

Avoid names such as:

```text
IMG_4482 FINAL 2.png
newimage.png
heroFinalLatestActuallyFinal.jpg
```

Humanity has already produced enough of those.

## Photography format

Prefer:

1. AVIF when the source pipeline can produce it cleanly.
2. WebP for general photographic assets.
3. PNG only when alpha transparency is genuinely required.
4. SVG for vectors, icons and decorative geometry.

Keep original source dimensions large enough for retina displays, but avoid committing enormous uncompressed exports.

### Target source sizes

- Full hero: 1600–2200 px wide
- Half-width feature image: 1000–1400 px wide
- Card image: 700–1000 px wide
- Small thumbnails: 400–700 px wide

The final UI uses `next/image`, responsive `sizes`, lazy loading and explicit aspect-ratio containers.

## Asset slots

`data/asset-slots.ts` records the exact filename contract for each page.

`lib/assets.ts` provides stable public paths for components. Once a final visual is prepared, place it in the matching directory using the expected name. Page components should reference the centralized path rather than inventing filenames inline.

## Screenshot references

The supplied screenshots are used for:

- layout proportions
- image subject and crop direction
- visual hierarchy
- section composition
- color and lighting direction
- responsive interpretation

They should not be shipped to users as giant page screenshots.

If you want local side-by-side comparison while developing, place copies under `public/reference/`. Reference files are development material only and should not be used by production page components.

## Validation

From `client/`:

```bash
node scripts/check-assets.mjs
```

The check validates directory structure, filename hygiene, supported formats and accidental oversized source files.
