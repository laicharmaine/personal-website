import { requireAdmin } from "@/lib/admin-auth";
import { listVersions } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  return Response.json({ versions: await listVersions(30) });
}
