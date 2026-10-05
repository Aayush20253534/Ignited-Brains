# Projects, About, Home and Blog update

Implemented from main at `c25f480` on 5 October 2026. Changes retain the existing content, shared Earth CTA, typography, colours, project filters and dialogs, page motion, navigation, forms, and backend.

## Pages

- Projects combines distinct archive photographs with educational visuals. The showcase rover uses a real lab demonstration; the rocket shows a student-scale cardboard model. The featured rover is a new test-bench composition based on the real student prototype. The five build-stage illustrations and three editorial student portraits remain distinct and keep their existing content. Four gallery images now show separate archive photographs. Project dialogs display complete images using `object-fit: contain`.
- About replaces only the cartoon hero with a square, naturally lit optics and sensor experiment. The square is preserved on desktop, tablet, and mobile. Existing orbit decorations and page animation continue.
- Home uses an image-generation edit of the existing `media/car.jpeg`, removing the Redmi branding and underlying paper text while preserving the red chassis, yellow wheel, exposed wiring, motors, and bottle attachment. The original asset remains available for other existing references.
- Blog has a searchable, filterable journal, a featured article, six complete original guides, and static `/blog/[slug]` pages. Content lives in `data/blog.ts`. Categories derive from posts; reading times derive from article word counts. The featured article is excluded from the default grid and becomes a normal result when filtering, so no cover appears twice on the landing page.
- Article pages include a contents menu, full photographs, author attribution to Ignited Brains, practical takeaways, primary-source further reading, related articles, and a shared Earth CTA. Unknown slugs return 404. Canonicals, article Open Graph/Twitter cards, Blog/BlogPosting and breadcrumb structured data, and sitemap entries are supplied.

## Asset provenance

All supplied photographs came from `Scan documents20260815_200256.zip`. Numbered sources refer to its filename suffix. Similar frames were reviewed together; separate crops of one source were not treated as new images. Photographs receive only orientation correction and WebP encoding. New generated assets used the built-in image-generation tool, then proportionate resizing and WebP encoding. No new public image exceeds 400 KB.

| Public path | Source | Purpose |
| --- | --- | --- |
| `about/hero-inquiry.webp` | Generated | Square optics and electronics collaboration |
| `home/mars-rover-clean.webp` | Generated edit of `media/car.jpeg` | Clean original rover, same framing |
| `projects-v2/rover-terrain-test.webp` | Generated using the cleaned prototype as hardware reference | New wide terrain-test composition |
| `projects-v2/rocket-design-workbench.webp` | Generated | Small cardboard rocket, fin alignment |
| `projects-v2/rover-field-demo.webp` | Supplied photo 8 | Real robotics demonstration |
| `projects-v2/gallery-lab-overview.webp` | Supplied photo 77 | Full learning-space view |
| `projects-v2/gallery-robotics-exhibits.webp` | Supplied photo 82 | Electronic exhibits |
| `projects-v2/gallery-space-costumes.webp` | Supplied photo 87 | Space exploration activity |
| `projects-v2/gallery-stem-experiments.webp` | Supplied photo 96 | STEM exhibit models |
| `blog/hands-on-bridge.webp` | Generated | Bridge load investigation |
| `blog/ai-object-sorting.webp` | Generated | Camera and servo sorting investigation |
| `blog/space-lab-models.webp` | Supplied photo 83 | Space learning models |
| `blog/stem-learning-wall.webp` | Supplied photo 79 | STEM equipment and learning wall |
| `blog/student-project-demonstration.webp` | Supplied photo 46 | Engineering prototype presentation |
| `blog/school-community.webp` | Supplied photo 73 | School community participation |

## Generation specifications

All new generations requested photorealistic, mature editorial educational photography with restrained blue/orange cues and credible school equipment. Prompts excluded visible text, fake logos, watermarks, phone branding, cartoons, holograms, magical effects, humanoid robots, and fictional NASA machinery.

- **About:** 1:1, three Indian teenage learners investigating a sensor circuit and optics rail at a workbench, natural window daylight, real apparatus and skin texture, faces and hands safely within the frame. Designed for the existing right-hand hero column.
- **Home rover:** edit target was the actual `media/car.jpeg`; preserve the red chassis, black tyre and yellow hub, jumper wires, blue servo, sensor circuit, motor, clear bottle, orange desk, classroom background, perspective, and original approximately 2.22:1 frame. Remove the four camera dots, Redmi text, readable paper text, and device branding; improve clarity slightly without redesigning the vehicle.
- **Projects rover:** 2:1, new wide low-angle photograph of the same student hardware on a modest rock tray and plywood ramp. Rover on the right, naturally quiet navy workshop on the left for existing white copy. Learners observe the test. No space landscape and no recreation/crop of the original photograph.
- **Rocket:** final 4:3 landscape, two learners checking fin alignment on an unpowered approximately 40 cm cardboard rocket, white unlettered body, orange nose, real workshop and natural light. Both faces, the entire rocket, and its stand are retained. The image uses containment in the showcase and dialog, including the narrow mobile card. No giant launch or powered exhaust. The first portrait composition was discarded after visual review.
- **Hands-on blog:** 16:9, three learners testing a small craft-stick bridge with a suspended cup of metal washers, one adding a weight, another recording observations without readable text. Natural light, credible bridge and visible apparatus.
- **AI blog:** 16:9, compact servo gripper, small camera and microcontroller with exposed wiring, plain blue/orange geometric objects, learner introducing an object while another observes. Real school-scale hardware rather than a futuristic robot.

Generated photographs are described as educational visuals where appropriate; archive photographs are not presented as evidence for fabricated event reports. All guides were authored on 5 October 2026, and no fictional named authors or historical publication dates were introduced.

## Verification

- `npm run check` passed asset validation, production checks, TypeScript, and ESLint. ESLint retains one existing unused `Status` import warning in `app/shop/page.tsx`; no new warning or error was introduced.
- `npm run build` passed and generated all six article routes.
- Production-browser checks passed for 38 page/viewport combinations at 360, 390, 768, 1024, and 1440 pixels. Desktop and mobile screenshots were visually reviewed. No horizontal overflow, runtime errors, failed image responses, or broken loaded images were found.
- Blog category/search combinations, empty-state reset, article links, contents anchors, unknown-article 404, canonical metadata, structured data, and six sitemap entries passed. Mobile navigation to Blog closes the menu.
- All project filters and four project dialogs passed, including full-image display, Escape close, focus return, and restored page scrolling. Home's mobile solution viewers and image lightbox passed. Existing About and Projects motion observers still enter their sections; each affected page retains its final shared Earth CTA.
- Pixel-hash and decode checks found 28 distinct editorial source images: 20 on Projects, six Blog covers, and the new About/Home assets. Card-to-dialog and post-to-article reuse is intentional. All referenced image paths resolve, and all 15 new WebP assets are below 400 KB.
- `git diff --check` passed.
