import { revalidateTag } from "next/cache";

export async function GET() {
  revalidateTag("lela"); // Menghapus semua cache dengan tag ini
  return Response.json({ revalidated: true, now: Date.now() });
}
