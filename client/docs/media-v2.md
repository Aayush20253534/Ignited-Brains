# Editorial Media redesign

Implemented from main `165c9cb` on 2026-10-04, using the supplied `1111.png` as the composition and rhythm reference.

The page alternates immersive navy sections with light editorial layouts: cinematic hero, photographic learning strip, lab feature, asymmetric story summaries, visual stories, a six-moment sequence, masonry photo journal, student composition, community update, press clipping, photographic manifesto, and final CTA.

## Content and imagery

The supplied files contained ten photographs, one press clipping, and the full-page mockup. No video or standalone cinematic hero image was attached. A clean concept illustration was created from the mockup's first hero, labelled as an illustration, and animated with CSS. All documentary photography uses the supplied files. The original mockup is not rendered as a webpage image.

Every supplied photograph has one optimized WebP file, reused by reference. No real photograph was replaced with generated imagery or upscaled. `public/media-v2/ASSETS.md` records the source mapping, creation method, and exact hero prompt. The complete new asset directory is about 2.9 MiB.

Existing article titles, descriptions, categories, and dates remain sourced from `data/media.ts`. Articles have no full detail content, so they display as summaries with no fake article links. The Science Parks summary has no supplied matching photograph and remains a text entry. The supplied press clipping provides the factual community update and press entry. Photo captions remain descriptive; no student identities, quotes, project outcomes, or extra events are invented.

There are no supplied playable videos, so visual stories open photographs and have no play controls. The timeline uses numbered moments rather than false durations or timestamps. The Media page's form that navigated to Contact is replaced with Projects and Contact CTAs. The shared footer's existing real newsletter remains unchanged.

## Behavior

- Story filters derive from categories with published articles; search has a clear/reset action.
- One shared native image dialog supports every photograph and the press clipping, full-size links, previous/next, Arrow keys, Escape, backdrop dismissal, focus containment/restoration, and scroll restoration.
- The six-moment strip supports native horizontal scrolling and previous/next controls.
- `MediaMotion` coordinates one-time reveals and continuous ambience. Ambient animation pauses offscreen, in hidden tabs, and with the page motion control. Reduced motion renders a static presentation.
- Styles are scoped to Media. Shared navigation, footer, other pages, and backend behavior are not redesigned.
- Metadata retains `Media & Insights` and the `/media` canonical.

## Verification

- Asset checks, production checks, TypeScript, ESLint, and production build pass.
- Widths 360, 390, 430, 768, 1024, 1280, 1440, and 1920 were checked in Chromium: no horizontal overflow or clipped text/controls; all Media images load from `media-v2`.
- All eleven supplied images open in the dialog. Keyboard focus, dismissal, navigation, full-size links, and body-scroll restoration pass.
- Populated filters, search, empty-search recovery, moment controls, mobile swipe, anchors, Projects/Contact links, and Home/Projects navigation pass.
- Reduced motion, pause/resume, offscreen pause, and hidden-document pause pass.
- Core content and all three article summaries render without JavaScript.
- No application runtime errors or failed image requests were observed. A reused browser session stalled on a lazy image at 1920px; the same width passed in a fresh session. Browser cleanup was adjusted for the test environment's single-process Chromium.
