export default function WatchPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#eef2f7]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bg-blob bg-blob-1" />
        <div className="bg-blob bg-blob-2" />
        <div className="bg-blob bg-blob-3" />
        <div className="bg-blob bg-blob-4" />
        <div className="bg-blob bg-blob-5" />
        <div className="bg-blob bg-blob-6" />
        <div className="bg-blob bg-blob-7" />
        <div className="bg-ring bg-ring-1" />
        <div className="bg-ring bg-ring-2" />
        <div className="bg-ring bg-ring-3" />
        <div className="bg-ring bg-ring-4" />
        <div className="bg-dots" />
      </div>
      {/* Video — fluid on mobile, stepped on desktop */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-4 pt-[68px] pb-6 sm:px-6 sm:pt-[80px] sm:pb-8 md:p-0">
        <iframe
          className="
            player-frame
            rounded-lg md:rounded-xl
            shadow-[0_4px_30px_-8px_rgba(0,0,0,0.12)]
            md:shadow-[0_8px_60px_-12px_rgba(0,0,0,0.15)]
          "
          src="https://vimeo.com/event/1646883/embed/d175f00f9b"
          width="1920"
          height="1080"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
