import { requireAdmin } from "@/lib/admin-auth";
import { getContent, saveContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

/** Current published content (editor only, bypasses nothing secret but kept private). */
export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  return Response.json({ content: await getContent() });
}

/** Save + publish a new version. */
export async function POST(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const text = await request.text();
  if (text.length > 400_000)
    return Response.json({ error: "Too large" }, { status: 413 });
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const content = (body as { content?: unknown })?.content;
  if (!content || typeof content !== "object")
    return Response.json({ error: "Missing content" }, { status: 400 });
  try {
    const saved = await saveContent(content, "edit");
    return Response.json({
      ok: true,
      content: saved,
      savedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Could not save. Try again." },
      { status: 500 },
    );
  }
}
