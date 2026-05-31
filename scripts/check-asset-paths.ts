import { readdir, readFile } from "fs/promises";
import { join, extname } from "path";

const DIST_DIR = join(process.cwd(), "dist");
// Match HTML attributes src= and href= that contain relative paths (not absolute)
const RELATIVE_PATH_PATTERN = /\b(?:src|href)\s*=\s*["'](?!(?:https?:|\/\/|\/|#|data:|mailto:|tel:))[^"'\s>]+["']/gi;
const IGNORED_EXTENSIONS = new Set([".js", ".json", ".map", ".txt", ".xml"]);

interface PathViolation {
  file: string;
  line: number;
  match: string;
}

async function getHtmlFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await getHtmlFiles(fullPath);
      files.push(...nested);
    } else if (entry.isFile() && !IGNORED_EXTENSIONS.has(extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

async function checkFile(filePath: string): Promise<PathViolation[]> {
  const content = await readFile(filePath, "utf-8");
  const lines = content.split("\n");
  const violations: PathViolation[] = [];

  lines.forEach((line, index) => {
    const matches = line.matchAll(RELATIVE_PATH_PATTERN);
    for (const match of matches) {
      violations.push({
        file: filePath.replace(DIST_DIR, "dist"),
        line: index + 1,
        match: match[0]!,
      });
    }
  });

  return violations;
}

async function main() {
  console.log("🔍 Checking for relative asset paths in build output...\n");

  let allFiles: string[];
  try {
    allFiles = await getHtmlFiles(DIST_DIR);
  } catch {
    console.error("❌ dist/ directory not found. Run `npm run build` first.");
    process.exit(1);
  }

  const htmlFiles = allFiles.filter((f) => f.endsWith(".html"));
  console.log(`Checking ${htmlFiles.length} HTML files...\n`);

  let totalViolations = 0;

  for (const file of htmlFiles) {
    const violations = await checkFile(file);
    if (violations.length > 0) {
      totalViolations += violations.length;
      for (const v of violations) {
        console.error(`❌  ${v.file}:${v.line}  →  ${v.match.trim()}`);
      }
    }
  }

  if (totalViolations === 0) {
    console.log("✅ All asset paths are absolute. Build is clean.");
    process.exit(0);
  } else {
    console.error(`\n❌ Found ${totalViolations} relative path violation(s). Fix before deploying.`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
