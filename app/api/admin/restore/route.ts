import { requireAdmin } from "@/lib/admin-auth";
import { readVersion, saveContent } from "@/lib/content-store";
import { defaultContent } from "@/lib/content";

export const dynamic = "force-dynamic";

/**
 * Restore an earlier version (or the original built-in content). Restoring
 * never deletes anything: it publishes a copy of the old version as the newest.
 */
export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const body = (await request.json().catch(() => null)) as {
    pathname?: string;
    original?: boolean;
  } | null;
  try {
    if (body?.original) {
      const saved = await saveContent(defaultContent, "reset");
      return Response.json({ ok: true, content: saved });
    }
    if (!body?.pathname || typeof body.pathname !== "string") {
      return Response.json({ error: "Missing version" }, { status: 400 });
    }
    const old = await readVersion(body.pathname);
    const saved = await saveContent(old, "restore");
    return Response.json({ ok: true, content: saved });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Could not restore that version." },
      { status: 500 },
    );
  }
}
