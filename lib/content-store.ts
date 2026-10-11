import "server-only";
import { head, list, put } from "@vercel/blob";
import { revalidateTag, unstable_cache } from "next/cache";
import { defaultContent, type SiteContent } from "./content";
import { sanitizeContent } from "./content-schema";

/**
 * Live content lives in Vercel Blob as immutable, timestamped JSON files:
 *   content/versions/<inverted-timestamp>-<iso>-<random>.json
 * The inverted timestamp makes the newest version sort first, so the current
 * content is simply the first file in the folder. Every save writes a new file,
 * so every previous version stays available as a backup.
 */
const PREFIX = "content/versions/";
export const CONTENT_TAG = "site-content";
const MAX_VERSIONS_KEPT = 200;

export const blobConfigured = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

type Note = "edit" | "restore" | "reset";

function newVersionPath(note: Note, now = Date.now()) {
  const inverted = String(9_999_999_999_999 - now).padStart(13, "0");
  const iso = new Date(now).toISOString().replace(/[:.]/g, "-");
  return `${PREFIX}${inverted}-${iso}-${note}.json`;
}

function noteFrom(pathname: string): string {
  const m = pathname.match(/-(edit|restore|reset)(?:-[A-Za-z0-9]+)?\.json$/);
  return m ? m[1] : "edit";
}

export type VersionInfo = { pathname: string; uploadedAt: string; size: number; note: string };

async function readJson(url: string) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Blob fetch failed: ${res.status}`);
  return res.json();
}

async function readLatest(): Promise<SiteContent> {
  if (!blobConfigured()) return defaultContent;
  try {
    const { blobs } = await list({ prefix: PREFIX, limit: 1 });
    if (blobs.length === 0) return defaultContent;
    const data = await readJson(blobs[0].url);
    return sanitizeContent(data?.content ?? data);
  } catch (err) {
    console.error("[content] falling back to defaults:", err);
    return defaultContent;
  }
}

/** Cached read; invalidated whenever the editor saves (and daily as a safety net). */
export const getContent = unstable_cache(readLatest, ["site-content-v1"], {
  tags: [CONTENT_TAG],
  revalidate: 86400,
});

export async function saveContent(raw: unknown, note: Note = "edit"): Promise<SiteContent> {
  if (!blobConfigured()) throw new Error("Blob storage is not configured");
  const content = sanitizeContent(raw);
  const body = JSON.stringify({ savedAt: new Date().toISOString(), note, content });
  if (body.length > 400_000) throw new Error("Content is too large");
  await put(newVersionPath(note), body, {
    access: "public",
    addRandomSuffix: true,
    contentType: "application/json",
    cacheControlMaxAge: 60 * 60 * 24 * 365, // each version is immutable
  });
  revalidateTag(CONTENT_TAG, { expire: 0 });
  void pruneOldVersions();
  return content;
}

export async function listVersions(limit = 30): Promise<VersionInfo[]> {
  if (!blobConfigured()) return [];
  const { blobs } = await list({ prefix: PREFIX, limit });
  return blobs.map((b) => ({
    pathname: b.pathname,
    uploadedAt: b.uploadedAt.toISOString(),
    size: b.size,
    note: noteFrom(b.pathname),
  }));
}

export async function readVersion(pathname: string): Promise<SiteContent> {
  if (!pathname.startsWith(PREFIX) || pathname.includes("..")) throw new Error("Bad version");
  const meta = await head(pathname);
  const data = await readJson(meta.url);
  return sanitizeContent(data?.content ?? data);
}

async function pruneOldVersions() {
  try {
    const { blobs } = await list({ prefix: PREFIX, limit: 1000 });
    if (blobs.length <= MAX_VERSIONS_KEPT) return;
    const { del } = await import("@vercel/blob");
    await del(blobs.slice(MAX_VERSIONS_KEPT).map((b) => b.url));
  } catch (err) {
    console.error("[content] prune failed:", err);
  }
}
