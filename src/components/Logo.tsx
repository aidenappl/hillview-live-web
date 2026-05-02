import Image from "next/image";
import Link from "next/link";
import LiveBadge from "./LiveBadge";

export default function Logo() {
  return (
    <Link href="https://hillview.tv" className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 group">
      <Image
        src="/logos/sun.png"
        alt="HillviewTV"
        width={44}
        height={44}
        className="h-7 w-7 sm:h-9 sm:w-9 md:h-11 md:w-11 transition-transform duration-300 group-hover:scale-110"
      />
      <span className="text-base sm:text-lg md:text-[1.35rem] font-semibold tracking-[-0.01em] text-[#1a2533]">
        Hillview<span className="text-[#1368d6]">TV</span>
      </span>
      <LiveBadge />
    </Link>
  );
}
