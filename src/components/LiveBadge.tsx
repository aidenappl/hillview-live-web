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
    <span className="flex items-center gap-1 sm:gap-1.5 rounded-full bg-red-500/10 px-1.5 sm:px-2 md:px-2.5 py-0.5 text-[0.55rem] sm:text-[0.6rem] md:text-[0.7rem] font-semibold uppercase tracking-wider text-red-600">
      <span className="inline-block h-1 w-1 sm:h-1.5 sm:w-1.5 animate-pulse rounded-full bg-red-500" />
      Live
    </span>
  );
}
