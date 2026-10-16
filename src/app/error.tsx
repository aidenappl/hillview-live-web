"use client";

import { useEffect } from "react";
import { reportError } from "@/services/monitor.service";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    reportError("client.error.boundary", error, {
      reason: "render_error",
      outcome: "the route's error page was shown; the user can retry",
    });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4 pt-24">
      <div className="max-w-md text-center">
        <h1 className="mb-2 text-xl font-semibold text-[#1a2533]">
          Something went wrong
        </h1>
        <p className="mb-6 text-sm leading-relaxed text-[#4a5568]">
          The error has been reported. Try again, or reload the page if it keeps
          happening.
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-[#197bff] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0d6efd]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
