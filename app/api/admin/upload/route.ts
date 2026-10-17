import { put } from "@vercel/blob";
import { requireAdmin } from "@/lib/admin-auth";
import { blobConfigured } from "@/lib/content-store";

export const dynamic = "force-dynamic";

const MAX_BYTES = 4 * 1024 * 1024; // 4 MB after in-browser compression
const TYPES: Record<
  string,
  { ext: string; magic: (b: Uint8Array) => boolean }
> = {
  "image/jpeg": {
    ext: "jpg",
    magic: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  },
  "image/png": {
    ext: "png",
    magic: (b) =>
      b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47,
  },
  "image/gif": {
    ext: "gif",
    magic: (b) => b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46,
  },
  "image/webp": {
    ext: "webp",
    magic: (b) =>
      b[0] === 0x52 &&
      b[1] === 0x49 &&
      b[2] === 0x46 &&
      b[3] === 0x46 &&
      b[8] === 0x57 &&
      b[9] === 0x45,
  },
};

/** Upload one image (raw bytes in the body, type in Content-Type). */
export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  if (!blobConfigured())
    return Response.json({ error: "Storage not configured" }, { status: 500 });

  const type = (request.headers.get("content-type") ?? "")
    .split(";")[0]
    .trim()
    .toLowerCase();
  const spec = TYPES[type];
  if (!spec)
    return Response.json(
      { error: "Use a JPG, PNG, WebP or GIF image." },
      { status: 415 },
    );

  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_BYTES)
    return Response.json(
      { error: "Image is too big (max 4 MB)." },
      { status: 413 },
    );
  const bytes = new Uint8Array(await request.arrayBuffer());
  if (bytes.byteLength === 0)
    return Response.json({ error: "Empty file" }, { status: 400 });
  if (bytes.byteLength > MAX_BYTES)
    return Response.json(
      { error: "Image is too big (max 4 MB)." },
      { status: 413 },
    );
  if (!spec.magic(bytes))
    return Response.json(
      { error: "That file doesn’t look like an image." },
      { status: 415 },
    );

  try {
    const blob = await put(`images/upload.${spec.ext}`, Buffer.from(bytes), {
      access: "public",
      addRandomSuffix: true,
      contentType: type,
      cacheControlMaxAge: 60 * 60 * 24 * 365,
    });
    return Response.json({ ok: true, url: blob.url });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Upload failed. Try again." },
      { status: 500 },
    );
  }
}
