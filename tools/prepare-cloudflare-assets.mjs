import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const output = join(root, "dist");
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
]);

const allowedRootFiles = new Set([
  "robots.txt",
  "sitemap.xml",
  "site.webmanifest",
  "manifest.webmanifest",
  "manifest.json",
]);

function copyDirectory(source, destination, rootLevel = false) {
  mkdirSync(destination, { recursive: true });

  for (const entry of readdirSync(source, { withFileTypes: true })) {
    if (entry.isSymbolicLink()) continue;

    const sourcePath = join(source, entry.name);
    const destinationPath = join(destination, entry.name);

    if (entry.isDirectory()) {
      if (rootLevel && entry.name !== "assets") continue;
      copyDirectory(sourcePath, destinationPath);
      continue;
    }

    const allowed =
      allowedExtensions.has(extname(entry.name).toLowerCase()) ||
      (rootLevel && allowedRootFiles.has(entry.name));

    if (allowed) cpSync(sourcePath, destinationPath);
  }
}

if (!existsSync(join(root, "index.html"))) {
  throw new Error("Run this script from the portfolio repository root; index.html is missing.");
}

rmSync(output, { recursive: true, force: true });
copyDirectory(root, output, true);

if (!existsSync(join(output, "index.html"))) {
  throw new Error("Cloudflare asset preparation did not include index.html.");
}

const htmlPages = readdirSync(output).filter((name) => name.endsWith(".html"));
if (htmlPages.length < 2) {
  throw new Error("Cloudflare asset preparation found too few HTML pages.");
}

console.log(
  `Prepared ${htmlPages.length} HTML pages and static assets in ${relative(root, output)}.`,
);
