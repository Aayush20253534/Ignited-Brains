import { existsSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const publicDir = join(process.cwd(), "public");

const requiredDirectories = [
  "brand",
  "common",
  "home",
  "about",
  "solutions",
  "space-lab",
  "schools",
  "projects",
  "media",
  "contact",
  "icons",
  "decorative",
  "reference",
];

const supportedExtensions = new Set([
  ".avif",
  ".webp",
  ".png",
  ".jpg",
  ".jpeg",
  ".svg",
]);

const maxRecommendedBytes = 4 * 1024 * 1024;
const problems = [];

for (const directory of requiredDirectories) {
  const fullPath = join(publicDir, directory);
  if (!existsSync(fullPath)) {
    problems.push(`Missing public/${directory}/`);
  }
}

function walk(directory) {
  if (!existsSync(directory)) return [];

  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      return walk(fullPath);
    }

    return [fullPath];
  });
}

const files = walk(publicDir);

for (const file of files) {
  const rel = relative(publicDir, file).replaceAll("\\", "/");
  const extension = extname(file).toLowerCase();

  if (rel.includes(" ")) {
    problems.push(`${rel}: asset filenames must not contain spaces`);
  }

  if (!rel.endsWith(".md") && rel !== rel.toLowerCase()) {
    problems.push(`${rel}: use lowercase asset filenames`);
  }

  if (extension && !supportedExtensions.has(extension) && !rel.endsWith(".md")) {
    problems.push(`${rel}: unsupported public asset extension`);
  }

  if (statSync(file).size > maxRecommendedBytes) {
    problems.push(`${rel}: larger than the 4 MB source-asset budget`);
  }
}

if (problems.length) {
  console.error("\nAsset check failed:\n");
  for (const problem of problems) {
    console.error(`- ${problem}`);
  }
  process.exit(1);
}

console.log(`Asset check passed. ${files.length} public files inspected.`);
console.log(
  "Photography is populated for Home, About, Solutions, Space Lab, Schools, Projects, Media and Contact.",
);
