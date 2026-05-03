export const dynamic = "force-dynamic";

const EMBED_URL = "https://vimeo.com/event/1646883/embed/d175f00f9b";

export async function GET() {
  try {
    const res = await fetch(EMBED_URL, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!res.ok) {
      return Response.json({ live: false });
    }

    const html = await res.text();

    // When a Vimeo live event is actively streaming, the embed page
    // contains player config with live stream data. When offline,
    // it shows an "ended" / "not started" state.
    const isLive =
      html.includes('"live_event"') &&
      html.includes('"streaming"') &&
      !html.includes('"ended"') &&
      !html.includes('"scheduled"');

    return Response.json({ live: isLive });
  } catch {
    return Response.json({ live: false });
  }
}
