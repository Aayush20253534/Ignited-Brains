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
  "app/schools/page.tsx",
  "app/projects/page.tsx",
  "app/media/page.tsx",
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
for (const deadRoute of ["/solutions/stem-lab", "/solutions/ai-robotics", "/solutions/science-park"]) {
  if (sourceText.includes(`href: "${deadRoute}"`) || sourceText.includes(`href=\"${deadRoute}\"`)) {
    failures.push(`Source still points at unimplemented route: ${deadRoute}`);
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
  "public/home/hero-robotics.webp",
  "public/about/hero-robotics.webp",
  "public/solutions/hero-robotics.webp",
  "public/space-lab/hero-telescope.webp",
  "public/schools/hero-campus-robotics.webp",
  "public/projects/hero-students-rover.webp",
  "public/media/hero-robotics.webp",
  "public/contact/hero-student-rocket.webp",
];

for (const file of publicFilesToCheck) {
  const absolute = join(cwd, file);
  if (!existsSync(absolute)) {
    failures.push(`Missing hero asset: ${file}`);
    continue;
  }
  const size = statSync(absolute).size;
  if (size > 700_000) warnings.push(`Large hero asset (${Math.round(size / 1024)} KiB): ${file}`);
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
