# Projects, About, Home and Blog update

Implemented from main at `c25f480` on 5 October 2026. Changes retain the existing content, shared Earth CTA, typography, colours, project filters and dialogs, page motion, navigation, forms, and backend.

## Pages

- Projects combines distinct archive photographs with educational visuals. The showcase rover uses a real lab demonstration; the rocket shows a student-scale cardboard model. The featured rover is a new test-bench composition based on the real student prototype. The five build-stage illustrations and three editorial student portraits remain distinct and keep their existing content. Four gallery images now show separate archive photographs. Project dialogs display complete images using `object-fit: contain`.
- About uses a real archive photograph of the team and visitors inside Curiosity Corner. The complete 4:3 scene is preserved on desktop, tablet, and mobile. Existing orbit decorations and page animation continue.
- Home uses an image-generation edit of the existing `media/car.jpeg`, removing the Redmi branding and underlying paper text while preserving the red chassis, yellow wheel, exposed wiring, motors, and bottle attachment. The original asset remains available for other existing references.
- Blog has a searchable, filterable journal, a featured article, six complete original guides, and database-backed `/blog/[slug]` pages. Every Blog photograph comes from the supplied archive. Content is managed in the authenticated Blog CMS and stored in PostgreSQL. The six original guides are imported once from `server/data/legacy-blogs.json`; public pages have no hardcoded fallback. Categories derive from published records; reading times derive from article word counts. The featured article is excluded from the default grid and becomes a normal result when filtering, so no cover appears twice on the landing page.
- Article pages use a continuous reading column, with a compact contents menu above the text. This removes the unused sidebar column and large horizontal gap shown in the reported screenshot. Pages retain full photographs, author attribution to Ignited Brains, practical takeaways, primary-source further reading, related articles, and a shared Earth CTA. Unknown slugs return 404. Canonicals, article Open Graph/Twitter cards, Blog/BlogPosting and breadcrumb structured data, and sitemap entries are supplied.

## Asset provenance

All supplied photographs came from `Scan documents20260815_200256.zip`. Numbered sources refer to its filename suffix. Similar frames were reviewed together; separate crops of one source were not treated as new images. Photographs receive only orientation correction and WebP encoding. New generated assets used the built-in image-generation tool, then proportionate resizing and WebP encoding. No new public image exceeds 400 KB.

| Public path | Source | Purpose |
| --- | --- | --- |
| `about/hero-lab-visit.webp` | Supplied photo 60 | Team and visitors inside the learning lab |
| `home/mars-rover-clean.webp` | Generated edit of `media/car.jpeg` | Clean original rover, same framing |
| `projects-v2/rover-terrain-test.webp` | Generated using the cleaned prototype as hardware reference | New wide terrain-test composition |
| `projects-v2/rocket-design-workbench.webp` | Generated | Small cardboard rocket, fin alignment |
| `projects-v2/rover-field-demo.webp` | Supplied photo 8 | Real robotics demonstration |
| `projects-v2/gallery-lab-overview.webp` | Supplied photo 77 | Full learning-space view |
| `projects-v2/gallery-robotics-exhibits.webp` | Supplied photo 82 | Electronic exhibits |
| `projects-v2/gallery-space-costumes-isro.webp` | Supplied photo 87; costume chest patches edited to ISRO | Space exploration activity |
| `projects-v2/gallery-stem-experiments.webp` | Supplied photo 96 | STEM exhibit models |
| `blog/hands-on-lab-demonstration.webp` | Supplied photo 9 | Students watching a working lab demonstration |
| `blog/robotics-lab-equipment.webp` | Supplied photo 95 | Educator and robotics equipment |
| `blog/space-lab-models.webp` | Supplied photo 83 | Space learning models |
| `blog/stem-learning-wall.webp` | Supplied photo 79 | STEM equipment and learning wall |
| `blog/student-project-demonstration.webp` | Supplied photo 46 | Engineering prototype presentation |
| `blog/school-community.webp` | Supplied photo 73 | School community participation |

## Generation specifications

All new generations requested photorealistic, mature editorial educational photography with restrained blue/orange cues and credible school equipment. Prompts excluded visible text, fake logos, watermarks, phone branding, cartoons, holograms, magical effects, humanoid robots, and fictional NASA machinery.

- **Home rover:** edit target was the actual `media/car.jpeg`; preserve the red chassis, black tyre and yellow hub, jumper wires, blue servo, sensor circuit, motor, clear bottle, orange desk, classroom background, perspective, and original approximately 2.22:1 frame. Remove the four camera dots, Redmi text, readable paper text, and device branding; improve clarity slightly without redesigning the vehicle.
- **Projects rover:** 2:1, new wide low-angle photograph of the same student hardware on a modest rock tray and plywood ramp. Rover on the right, naturally quiet navy workshop on the left for existing white copy. Learners observe the test. No space landscape and no recreation/crop of the original photograph.
- **Rocket:** final 4:3 landscape, two learners checking fin alignment on an unpowered approximately 40 cm cardboard rocket, white unlettered body, orange nose, real workshop and natural light. Both faces, the entire rocket, and its stand are retained. The image uses containment in the showcase and dialog, including the narrow mobile card. No giant launch or powered exhaust. The first portrait composition was discarded after visual review.

Generated photographs are described as educational visuals where appropriate; archive photographs are not presented as evidence for fabricated event reports. All guides were authored on 5 October 2026, and no fictional named authors or historical publication dates were introduced.

## Verification

- `npm run check` passed asset validation, production checks, TypeScript, and ESLint. ESLint retains one existing unused `Status` import warning in `app/shop/page.tsx`; no new warning or error was introduced.
- `npm run build` passed and generated all six article routes.
- Production-browser checks passed for 38 page/viewport combinations at 360, 390, 768, 1024, and 1440 pixels. Desktop and mobile screenshots were visually reviewed. No horizontal overflow, runtime errors, failed image responses, or broken loaded images were found.
- Blog category/search combinations, empty-state reset, article links, contents anchors, unknown-article 404, canonical metadata, structured data, and six sitemap entries passed. Mobile navigation to Blog closes the menu.
- All project filters and four project dialogs passed, including full-image display, Escape close, focus return, and restored page scrolling. Home's mobile solution viewers and image lightbox passed. Existing About and Projects motion observers still enter their sections; each affected page retains its final shared Earth CTA.
- Pixel-hash and decode checks found 28 distinct editorial source images: 20 on Projects, six Blog covers, and the new About/Home assets. Card-to-dialog and post-to-article reuse is intentional. All referenced image paths resolve, and all 15 new WebP assets are below 400 KB.
- `git diff --check` passed.

### Real-photograph and article-spacing revision

The About hero and all six Blog covers now use real supplied photographs. The three superseded generated assets were removed. Pixel-difference checks confirmed that each of these seven WebP images matches its listed archive source, and all seven sources are distinct.

The revision passed `npm run check`, `npm run build`, and 40 production-browser page/viewport checks for About, Blog, and all six articles at 360, 768, 1024, 1440, and 1920 pixels. Desktop/mobile screenshots were reviewed, including the wide-screen article layout from the reported issue. Contents appear above an aligned reading column with no reserved sidebar. All category filters, search/reset, first/last contents links, article return links, mobile navigation, image metadata, the sitemap, unknown-slug 404, and the animated About hero passed. No runtime errors, image errors, or horizontal overflow were found. The existing Shop lint warning remains unchanged.
