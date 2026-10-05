# Solutions and authentic project photography

The five Solutions pages follow the approved page compositions while retaining the site's header, footer, typography, brand colours, buttons, API forms and shared Earth CTA. The existing Projects content, filters, facts, impact figures and testimonials remain available. Home, About and Blog retain their previously verified real-photo and editorial updates.

## Routes and components

| Route | Main experience |
| --- | --- |
| `/solutions` | Real lab ecosystem hero, four linked photo cards, seven-step learning cycle, accessible comparison table, existing impact figures and principal quote |
| `/solutions/space-lab` | Dark real-photo hero, observation and model equipment, activities, project archive, existing introduction video and six skills |
| `/solutions/stem-lab` | Bright real-photo hero, practical experiments, an actual engineering demonstration with five callouts, six project challenges and skills |
| `/solutions/ai-robotics-lab` | Actual robotics lab, nine exploration topics, interactive five-part robot system, six project challenges and seven skills |
| `/solutions/science-park` | Outdoor learning concept, eight science fields, seven interactive map zones, real exhibition interaction and six benefits |

The shared `components/solutions/learning-space.tsx` composes these experiences without duplicating whole sections. Only the robot system and park map require client state. All major equipment, project and archive photographs use the existing native image-dialog component, with full-image containment, Escape, backdrop and close-button support, scroll locking and focus restoration. The same component continues to serve Home.

Every page uses exactly one unchanged `EarthCta` component immediately before the footer, including the existing `final-earth.webp` image and India/network SVG animation. Text and actions differ by programme. Reveal and connector motion reuse the existing observer and respect reduced motion. Full-image viewers serve the already optimized WebP originals directly, preserving their full quality; page thumbnails continue to use Next image optimization.

## Photography and source integrity

All 98 supplied archive photographs and the repository's relevant assets were inspected before selecting images. `solutions-image-audit.json` records the original source, scanner margin removal, output dimensions, byte size and SHA-256 checksum for every new export: **28 real photographs and three generated outdoor concepts**.

Photographs are oriented correctly, exported as WebP at a maximum 1600-pixel long edge and trimmed only where the document scanner added a blank white border. People and equipment have not been synthesized or cosmetically replaced. Existing suitable real assets are referenced directly rather than exported a second time.

| Existing asset | Use |
| --- | --- |
| `/media/build.webp` | Overview detail showing a physical lunar lander explanation |
| `/blog/stem-learning-wall.webp` | Overview STEM card |
| `/blog/space-lab-models.webp` | Projects rocket programme card |
| `/media-v2/field/lab-conversation.webp` | Space Lab archive photograph |
| `/media-v2/students/exhibition-team.webp` | STEM exhibition photograph |
| `/media/tele.jpeg` | Actual visitor interacting with a telescope; caption explicitly identifies the science exhibition |
| `/home/mars-rover-clean.webp` | Existing authentic rover photograph in the robot-system explainer |
| Existing Projects gallery photographs | Individual real STEM, robotics, space and lab exhibits |

Projects now has **17 real content photographs and one labelled outdoor concept**. Earth and the conceptual India network remain intentional brand illustrations. Prototype descriptions and testimonials retain the repository's original facts; archive portraits are explicitly not claimed to identify quoted contributors. Equipment or example challenges without a matching authentic photograph use topic icons and useful descriptions.

Source duplication was checked beyond filenames: the original `media/v.jpeg` corresponds to supplied photo 80, `media/stem.jpeg` to 84, and `media-v2/students/learning-together.webp` to 8. Their equivalent exports are not used as different photographs on the affected pages. Perceptual comparisons also identified three separately captured but very similar scenes; unused supplied photos 1, 5 and 67 replaced those selections. All **42 content images across the six pages** are now distinct, with no exact or near-duplicate candidates at the reviewed threshold. Deliberate reuse of a photo inside its own viewer is excluded.

## Generated outdoor concepts

No suitable real Science Park installation photograph was present in the supplied archive or repository. These are the only newly generated gaps and are visibly labelled as illustrative concepts, rather than completed client installations. They were generated with the built-in image-generation tool in text-to-image mode, with an opaque background. No reference photograph was altered.

| Web output | Generation brief | Output ratio |
| --- | --- | --- |
| `/learning-spaces/park-outdoor-concept.webp` | Realistic, restrained outdoor science-learning scene at an ordinary Indian school, teenagers and a teacher investigating believable gears, a wheel and a lever; natural campus and daylight, no futuristic laboratory, text, logos or branding. Compose a wide hero with usable space for the existing left-hand text. | 3:1, 2000 × 667 |
| `/learning-spaces/park-sound-concept.webp` | Realistic school-campus sound demonstration with opposing acoustic dishes and a pendulum, students investigating physical science in ordinary outdoor surroundings; credible equipment, natural light, no text, branding, holograms or glossy science-fiction treatment. | 4:3, 1448 × 1086 |
| `/projects-v2/solar-system-concept.webp` | Believable Indian school courtyard with students and a mentor exploring a physical solar-system teaching model; authentic scale and materials, natural photographic treatment, no lettering, logos, impossible equipment or watermarks. An illustrative programme concept. | 4:3, 1448 × 1086 |

The outputs were inspected, resized only for web delivery and encoded as WebP. Their full compositions are available through the image viewers. The image audit preserves file checksums; `npm run assets:check` rejects missing, empty, duplicated or changed audited exports.

## Verification

Production verification covers all five Solutions pages and Projects at 360, 768, 1024, 1440 and 1920 pixels, along with Home, About, Blog and all six individual articles as regression checks. It checks routing, metadata, image loading, meaningful alt text, horizontal overflow, the exact shared Earth visual, page-specific CTA copy, duplicate imagery, robot callout clearance, accessible image dialogs, project filters, map/robot keyboard controls, media playback, forms remaining available, and normal/reduced motion.

The approved references are compared with rendered desktop, tablet and mobile pages. The comparison table keeps scrolling within its own labelled region on small screens; diagrams and content columns stack for mobile. Existing API endpoints and form submission behaviour are unchanged.

Required commands are `npm run check` (assets, production checks, typecheck, lint), `npm run build`, and `git diff --check`. Lint retains one pre-existing unused `Status` import warning on the unrelated Shop page.

Final checks passed: all 31 exports decoded and matched their checksums; all 42 content images passed filename and perceptual duplication checks; 37 interaction/navigation/media/form/motion checks passed, including 70 photo viewers and both nested project-image viewers. All five viewport sizes were reviewed. Projects image readiness was rechecked at every viewport size after waiting for the optimizer to finish; there were no broken images, overflow, runtime errors or failed image responses. The final production build generated all 28 routes successfully.
