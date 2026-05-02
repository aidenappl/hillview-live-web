export default function WatchPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div>
        <iframe
          className="
            shadow-[0_0_15px_0px_rgba(0,0,0,0.5)]
            w-[calc(16px*90)] h-[calc(9px*90)]
            2xl:w-[calc(16px*90)] 2xl:h-[calc(9px*90)]
            max-[1600px]:w-[calc(16px*75)] max-[1600px]:h-[calc(9px*75)]
            max-[1500px]:w-[calc(16px*70)] max-[1500px]:h-[calc(9px*70)]
            max-[1400px]:w-[calc(16px*60)] max-[1400px]:h-[calc(9px*60)]
            max-[1000px]:w-[calc(16px*50)] max-[1000px]:h-[calc(9px*50)]
            max-[800px]:w-[calc(16px*40)] max-[800px]:h-[calc(9px*40)]
            max-[700px]:w-[calc(16px*30)] max-[700px]:h-[calc(9px*30)]
            max-[450px]:w-[calc(16px*20)] max-[450px]:h-[calc(9px*20)]
          "
          src="https://vimeo.com/event/1646883/embed/d175f00f9b"
          width="1920"
          height="1080"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
        <div className="relative w-full h-0" />
      </div>
    </div>
  );
}
