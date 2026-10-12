import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
} from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const root = process.cwd();
const output = join(root, "dist");
const customDomain = readFileSync(join(root, "CNAME"), "utf8").trim();
const allowedExtensions = new Set([
  ".html",
  ".css",
  ".js",
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".avif",
  ".svg",
  ".ico",
  ".pdf",
  ".txt",
  ".xml",
  ".json",
  ".webmanifest",
]);

const allowedRootFiles = new Set([
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "manifest.webmanifest",
  "manifest.json",
]);

function findLocalReferences(source) {
  const references = new Set();
  const attributePattern = /\b(?:src|href|poster|srcset|data-[\w-]*src)\s*=\s*(["'])(.*?)\1/gi;
  const cssUrlPattern = /url\(\s*(["']?)(.*?)\1\s*\)/gi;

  for (const match of source.matchAll(attributePattern)) {
    const values = match[2].split(",").map((value) => value.trim().split(/\s+/)[0]);
    for (const value of values) references.add(value);
  }

  const openGraphImageTag = /<meta\b[^>]*\b(?:property|name)\s*=\s*(["'])(?:og:image|twitter:image)\1[^>]*>/gi;
  for (const match of source.matchAll(openGraphImageTag)) {
    const content = match[0].match(/\bcontent\s*=\s*(["'])(.*?)\1/i);
    if (content) references.add(content[2]);
  }

  for (const match of source.matchAll(cssUrlPattern)) references.add(match[2]);
  return references;
}

function copyReferencedAsset(reference) {
  if (reference.includes("${")) return;

  let assetUrl;
  try {
    assetUrl = new URL(reference, "https://portfolio-assets.invalid/");
  } catch {
    throw new Error(`Invalid local asset reference: ${reference}`);
  }

  if (
    assetUrl.origin !== "https://portfolio-assets.invalid" &&
    assetUrl.hostname !== customDomain
  ) {
    return;
  }

  const assetPath = decodeURIComponent(assetUrl.pathname.replace(/^\//, ""));
  if (!assetPath || extname(assetPath) === ".html") return;

  const sourcePath = resolve(root, assetPath);
  if (!sourcePath.startsWith(`${root}/`)) {
    throw new Error(`Local asset reference escapes the repository: ${reference}`);
  }
  if (!existsSync(sourcePath)) {
    throw new Error(`Referenced site asset is missing: ${reference}`);
  }
  if (!allowedExtensions.has(extname(sourcePath).toLowerCase())) return;

  const outputPath = join(output, assetPath);
  mkdirSync(join(outputPath, ".."), { recursive: true });
  cpSync(sourcePath, outputPath);
}

if (!existsSync(join(root, "index.html"))) {
  throw new Error("Run this script from the portfolio repository root; index.html is missing.");
}

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

const rootEntries = readdirSync(root, { withFileTypes: true });
const htmlPages = rootEntries
  .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
  .map((entry) => entry.name);

for (const page of htmlPages) cpSync(join(root, page), join(output, page));
for (const fileName of allowedRootFiles) {
  const filePath = join(root, fileName);
  if (existsSync(filePath)) cpSync(filePath, join(output, fileName));
}

const siteSources = ["script.js", "styles.css", "critical.css"];
for (const fileName of siteSources) {
  const sourcePath = join(root, fileName);
  if (existsSync(sourcePath)) cpSync(sourcePath, join(output, fileName));
}

const referenceSources = [...htmlPages, "styles.css", "critical.css"]
  .map((fileName) => join(root, fileName))
  .filter(existsSync);

for (const sourcePath of referenceSources) {
  const source = readFileSync(sourcePath, "utf8");
  for (const reference of findLocalReferences(source)) copyReferencedAsset(reference);
}

if (!existsSync(join(output, "index.html"))) {
  throw new Error("Cloudflare asset preparation did not include index.html.");
}

const preparedHtmlPages = readdirSync(output).filter((name) => name.endsWith(".html"));
if (preparedHtmlPages.length < 2) {
  throw new Error("Cloudflare asset preparation found too few HTML pages.");
}

console.log(
  `Prepared ${preparedHtmlPages.length} HTML pages and referenced static assets in ${relative(root, output)}.`,
);
