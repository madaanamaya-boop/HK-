import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

const here = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(here, "..");

export const PATHS = {
  brandbook: path.join(ROOT, "brand", "brandbook.yml"),
  topics: path.join(ROOT, "content", "topics.yml"),
  history: path.join(ROOT, "content", "history.json"),
  out: path.join(ROOT, "out"),
  published: path.join(ROOT, "published"),
};

export function loadBrandbook() {
  return YAML.parse(fs.readFileSync(PATHS.brandbook, "utf8"));
}

export function loadTopics() {
  if (!fs.existsSync(PATHS.topics)) return [];
  const doc = YAML.parse(fs.readFileSync(PATHS.topics, "utf8"));
  return doc?.topics ?? [];
}

export function loadHistory() {
  if (!fs.existsSync(PATHS.history)) return { posts: [] };
  return JSON.parse(fs.readFileSync(PATHS.history, "utf8"));
}

export function saveHistory(history) {
  fs.writeFileSync(PATHS.history, JSON.stringify(history, null, 2) + "\n");
}

export function todayStamp() {
  return new Date().toISOString().slice(0, 10);
}

export function outDirFor(date = todayStamp()) {
  const dir = path.join(PATHS.out, date);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

/**
 * Base URL under which the rendered slides are publicly reachable.
 * Instagram and Threads fetch images by URL, so slides must be hosted
 * somewhere public. Default: raw.githubusercontent.com for this repo's
 * default branch (works when the repo is public). Override with
 * PUBLIC_IMAGE_BASE_URL for S3/CDN/anything else.
 */
export function publicImageBaseUrl() {
  if (process.env.PUBLIC_IMAGE_BASE_URL) {
    return process.env.PUBLIC_IMAGE_BASE_URL.replace(/\/$/, "");
  }
  const repo = process.env.GITHUB_REPOSITORY; // e.g. "owner/repo", set in Actions
  const branch = process.env.PUBLISH_BRANCH || "main";
  if (repo) return `https://raw.githubusercontent.com/${repo}/${branch}`;
  return null;
}

export function requireEnv(names) {
  const missing = names.filter((n) => !process.env[n]);
  if (missing.length) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
  }
}
