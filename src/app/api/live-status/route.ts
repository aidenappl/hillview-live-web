export const dynamic = "force-dynamic";

const STATUS_URL = "https://vimeo.com/live_event/1646883/status?h=d175f00f9b";

export async function GET() {
  try {
    const res = await fetch(STATUS_URL, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!res.ok) {
      return Response.json({ live: false });
    }

    const data = await res.json();
    const isLive = data?.next_live_clip?.is_live === true;

    return Response.json({ live: isLive });
  } catch {
    return Response.json({ live: false });
  }
}
