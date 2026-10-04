# Production cleanup — 2026-10-04

This follow-up resolves the repository-wide failures recorded during the Projects redesign. It preserves the existing content, layout, videos, and About animations.

## Changes

- Admin session state initializes after hydration. Restoring a saved session and fetching dashboard data both cancel obsolete requests. Loading derives from the current request key, and filter handlers reset pagination in the same update as the changed filter.
- The shared logo no longer declares an unused prop. The partner application dialog uses a stable close callback while retaining the submission guard and Escape/backdrop behavior.
- Removed unused Three.js and React Three Fiber dependencies and their unused transitive packages.
- Asset validation accepts the real GIF fallbacks and MP4 videos used by the site, checks their signatures, and keeps the 4 MiB limit. Production checks now inspect the current Projects and Contact hero assets.
- Renamed the unused `about hero.png` file to `about-hero.png` and removed Windows metadata.

## Media optimization

| Asset | Previous bytes | Current bytes | Preserved behavior |
| --- | ---: | ---: | --- |
| Home hero MP4 | 11,085,807 | 3,166,247 | H.264, 1280×720, 24 fps, 8 seconds |
| Student photo → `build.webp` | 5,848,441 | 614,634 | Same photograph, 1920×1440 |
| India map → `india-network.webp` | 7,979,006 | 2,008,764 | Lossless RGB frames, 1267×601, 24 frames at 80 ms, infinite loop |

All references use the replacement paths. The original Home story video and About GIF fallbacks remain available. All 24 India animation frames were compared against the source and match pixel-for-pixel, including frame timing and loop behavior.

## Verification

- `npm run check`: asset validation, production checks, TypeScript, and ESLint pass.
- `npm run build`: production build passes.
- `npm test` in `server/`: all three validation tests pass.
- Browser checks against the production build pass at desktop and mobile sizes for admin sign-in, session restoration/expiry, sign-out, pagination, all filter resets, overlapping searches, refresh loading, API errors, and recovery.
- Partner dialog checks pass for Escape/backdrop dismissal, blocked dismissal during submission, success, and scroll restoration. All submissions and admin API data were mocked locally.
- Optimized Home media loads; the original story video plays and pauses on dismissal. About artwork loads its reduced-motion posters, animated WebP, and GIF fallbacks. The Media gallery loads the optimized photograph.
- No browser runtime errors or failed image requests were observed.
