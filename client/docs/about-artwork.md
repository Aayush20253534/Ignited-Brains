# About page artwork and motion

The About page follows the supplied eight-section reference. Its styles and playback controller are local to `/about`; the shared header, footer and Home page are unchanged.

## Assets

All artwork lives in `public/about/design/`. Each illustration has an animated GIF, a full-color animated WebP, and a still WebP poster. Browsers supporting animated WebP use it to preserve smooth color gradients; the image element retains the GIF fallback. The hero reuses the existing `about/ideas-in-motion.webp` illustration.

The controller switches both the WebP source and GIF fallback to posters when a section leaves the screen, the document is hidden, animation is paused, or reduced motion is requested. Entrance animations run once. The pause control is keyboard accessible.

The Earth animation uses spherical projection of a blue-and-ivory Earth texture, with changing longitude, hemisphere shading, atmosphere, and moving orbital planets. Its rotation completes a seamless 16-second loop. The other illustrations use restrained breathing motion and star twinkle. No numerical achievements or dates were added.

## Image-generation prompts

Generation used the built-in image-generation tool. The existing hero illustration was reused rather than regenerated.

### Story background

A cinematic realistic Earth horizon from low orbit, glowing electric blue atmospheric rim, orange city lights over India and Asia on the bottom right quarter. Upper two thirds and all left side are very dark deep navy black star-filled space with sparse subtle blue nebulas. Earth only along bottom edge curving upward on right. Premium polished science education page background. No words, spacecraft, logos or text. The darkest top and left hold real HTML story and timeline.

### Impact background

A very wide panoramic 3:1 banner. Match the white robot with a blue smiling face and orange accents. Far left 40% nearly empty dark navy starfield for HTML title and paragraph. On the right half, a complete full-body robot floating with a navy tablet above moon ground along the bottom 10%. Keep safe margins above the head and below the feet. Spread blue and orange planets and thin orbit rings around the robot, with Saturn at far right. Camera very wide; subject fully visible. Cinematic polished 3D illustration. No text, letters or watermark.

### Earth texture

A seamless 2:1 equirectangular Earth texture for a rotating globe. North America and South America on the left, Africa and Europe in the center, Asia and Australia on the right. Deep royal blue oceans and ivory land masses, subtle terrain relief, uniform illumination. Flat texture for spherical projection, not a sphere illustration. No clouds, shading, grid, borders, labels or text. Conceptual artwork, not a geographic reference.
