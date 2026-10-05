import { closeSync, existsSync, openSync, readFileSync, readSync, readdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { extname, join, relative } from "node:path";

const publicDir = join(process.cwd(), "public");

const requiredDirectories = [
  "brand",
  "common",
  "home",
  "about",
  "solutions",
  "space-lab",
  "learning-spaces",
  "schools",
  "projects",
  "blog",
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
  // About uses GIF fallbacks; Home embeds real MP4 videos.
  ".gif",
  ".mp4",
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

  if (supportedExtensions.has(extension) && statSync(file).size === 0) {
    problems.push(`${rel}: empty asset file`);
  }

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

  if (extension === ".gif" || extension === ".mp4") {
    const header = Buffer.alloc(12);
    const descriptor = openSync(file, "r");
    try {
      readSync(descriptor, header, 0, header.length, 0);
    } finally {
      closeSync(descriptor);
    }
    const valid = extension === ".gif"
      ? ["GIF87a", "GIF89a"].includes(header.toString("ascii", 0, 6))
      : header.toString("ascii", 4, 8) === "ftyp";
    if (!valid) problems.push(`${rel}: file header does not match ${extension}`);
  }
}

const auditPath = join(process.cwd(), "docs", "solutions-image-audit.json");
if (!existsSync(auditPath)) {
  problems.push("Missing Solutions image-provenance manifest");
} else {
  const auditedImages = JSON.parse(readFileSync(auditPath, "utf8"));
  const imageHashes = new Set();
  for (const image of auditedImages) {
    const file = join(publicDir, image.asset.replace(/^\//, ""));
    if (!existsSync(file)) { problems.push(`${image.asset}: audited image is missing`); continue; }
    const content = readFileSync(file);
    const hash = createHash("sha256").update(content).digest("hex");
    if (content.length !== image.bytes || hash !== image.sha256) problems.push(`${image.asset}: image does not match the verified export`);
    if (imageHashes.has(hash)) problems.push(`${image.asset}: duplicate audited image`);
    imageHashes.add(hash);
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
