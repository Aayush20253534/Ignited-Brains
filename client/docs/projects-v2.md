# Cinematic Projects redesign

Implemented against `b26f2d1` from main on 2026-10-04, following the supplied Projects reference and instructions.

The page now moves through project showcase, engineering process, student experiences, and impact. All 19 photographic/concept images, five SVG overlays/masters, and the animated India map with its static poster are new and live in `public/projects-v2/`. Generation prompts and provenance are recorded in that directory's `ASSETS.md`.

Project names, categories, locations, descriptions, statistics, and testimonials remain sourced from the existing repository. The featured rover facts were moved verbatim from the previous page. Global navigation, footer, branding, other pages, and backend code were not redesigned.

Filters derive from populated categories. Every project arrow opens that project's own accessible native dialog; the featured rover has a separate dialog. Escape, backdrop dismissal, Tab/Shift+Tab containment, focus restoration, and scroll restoration are supported. The contact CTA is explicitly labelled as a discussion, and no fake project/video routes were added.

Motion uses CSS/SVG and intersection observers without an added dependency. Continuous motion pauses offscreen and when the document is hidden. Reduced motion disables animation and displays a static India poster. The animated map is a stable geographic outline with asynchronous network activity: 60 frames, 10 seconds, 2,877,340 bytes.

## Verification

- Production build and TypeScript: passed.
- ESLint for all changed TypeScript files: passed.
- Browser widths 360, 390, 430, 768, 1024, 1280, 1440, and 1920: no horizontal overflow or clipped text/controls.
- Populated filters and all four project dialogs: passed.
- Keyboard navigation, modal focus containment/restoration, dismissal, and scroll restoration: passed.
- CTA and shared-navigation routes, Projects canonical URL, original factual content, and absence of old page images or invented mockup features: passed.
- Reduced motion, static poster, offscreen pause, asynchronous pulse timing, and once-only impact counters: passed.
- Browser runtime errors and failed image requests: none.

The pre-existing repository-wide lint, asset, and dependency failures were resolved in the production cleanup on 2026-10-04. Full `npm run check`, `npm run build`, and backend tests now pass. See `production-cleanup.md` for the changes and browser verification. No Projects asset violates the 4 MB source-asset budget.
