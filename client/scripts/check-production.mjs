import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const cwd = process.cwd();
const failures = [];
const warnings = [];

const requiredRoutes = [
  "app/page.tsx",
  "app/about/page.tsx",
  "app/solutions/page.tsx",
  "app/solutions/space-lab/page.tsx",
  "app/solutions/stem-lab/page.tsx",
  "app/solutions/ai-robotics-lab/page.tsx",
  "app/solutions/science-park/page.tsx",
  "app/schools/page.tsx",
  "app/projects/page.tsx",
  "app/media/page.tsx",
  "app/blog/page.tsx",
  "app/blog/[slug]/page.tsx",
  "app/contact/page.tsx",
  "app/shop/page.tsx",
  "app/privacy/page.tsx",
  "app/terms/page.tsx",
];

for (const route of requiredRoutes) {
  if (!existsSync(join(cwd, route))) failures.push(`Missing route file: ${route}`);
}

for (const file of [
  "components/ui/milky-way.tsx",
  "components/layout/site-entry-loader.tsx",
]) {
  if (existsSync(join(cwd, file))) failures.push(`Obsolete experimental file still present: ${file}`);
}

const packageJson = JSON.parse(readFileSync(join(cwd, "package.json"), "utf8"));
const allDeps = { ...(packageJson.dependencies ?? {}), ...(packageJson.devDependencies ?? {}) };
for (const dependency of [
  "@react-three/drei",
  "@react-three/fiber",
  "@react-three/postprocessing",
  "postprocessing",
  "three",
  "@types/three",
]) {
  if (dependency in allDeps) failures.push(`Obsolete intro-animation dependency still installed: ${dependency}`);
}

const sourceFiles = [
  "data/navigation.ts",
  "data/home.ts",
  "data/solutions.ts",
  "app/solutions/page.tsx",
];
const sourceText = sourceFiles.map((file) => readFileSync(join(cwd, file), "utf8")).join("\n");
for (const obsoleteRoute of ["/solutions#stem-lab", "/solutions#ai-robotics-lab", "/solutions#science-park", "/solutions/ai-robotics"]) {
  if (sourceText.includes(`\"${obsoleteRoute}\"`)) failures.push(`Source points at obsolete Solutions route: ${obsoleteRoute}`);
}
for (const slug of ["space-lab", "stem-lab", "ai-robotics-lab", "science-park"]) {
  if (!readFileSync(join(cwd, "data/navigation.ts"), "utf8").includes(`href: "/solutions/${slug}"`)) {
    failures.push(`Solutions dropdown is missing dedicated route: ${slug}`);
  }
}

const navigationText = readFileSync(join(cwd, "data/navigation.ts"), "utf8");
if (navigationText.includes("How It Works") || navigationText.includes("how-it-works")) {
  failures.push("How It Works should no longer be exposed in navigation.");
}
if (!navigationText.includes('href: "/shop"')) {
  failures.push("Shop route is missing from navigation.");
}

const shopText = readFileSync(join(cwd, "app/shop/page.tsx"), "utf8");
if (!shopText.includes("Coming Soon")) failures.push("Shop page must display Coming Soon.");

const publicFilesToCheck = [
  "public/media/homeimg.mp4",
  "public/about/hero-lab-visit.webp",
  "public/learning-spaces/ecosystem-lab.webp",
  "public/learning-spaces/space-hero.webp",
  "public/learning-spaces/stem-hero.webp",
  "public/learning-spaces/robotics-hero.webp",
  "public/learning-spaces/park-outdoor-concept.webp",
  "public/schools/hero-campus-robotics.webp",
  "public/projects-v2/archive-students-hero.webp",
  "public/media-v2/hero-editorial.webp",
  "public/contact/design/hero.webp",
];

for (const file of publicFilesToCheck) {
  const absolute = join(cwd, file);
  if (!existsSync(absolute)) {
    failures.push(`Missing hero asset: ${file}`);
    continue;
  }
  const size = statSync(absolute).size;
  const budget = file.endsWith(".mp4") ? 4 * 1024 * 1024 : 700_000;
  if (size > budget) warnings.push(`Large hero asset (${Math.round(size / 1024)} KiB): ${file}`);
}

if (warnings.length) {
  console.warn("Production QA warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

if (failures.length) {
  console.error("Production QA failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Production QA passed. ${requiredRoutes.length} routes and ${publicFilesToCheck.length} hero assets checked.`);
