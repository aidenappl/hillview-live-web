"use client";

import { useEffect, useState } from "react";

export default function LiveBadge() {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await fetch("/api/live-status");
        const data = await res.json();
        setIsLive(data.live);
      } catch {
        setIsLive(false);
      }
    }

    checkStatus();
    const interval = setInterval(checkStatus, 30_000);
    return () => clearInterval(interval);
  }, []);

  if (!isLive) return null;

  return (
    <span className="flex shrink-0 items-center gap-1 rounded-full border border-red-200 bg-red-50 px-2 py-0.5 sm:gap-1.5 sm:px-2.5 sm:py-1">
      <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 sm:h-2 sm:w-2" />
      <span className="text-[0.6rem] font-bold uppercase tracking-wider text-red-600 sm:text-xs">Live</span>
    </span>
  );
}
