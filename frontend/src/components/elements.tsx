import { Hexagon } from "lucide-react";

export default function Elements() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-pulse-slow absolute -top-40 -right-40 h-80 w-80 rounded-full bg-[#F6851B]/20 blur-3xl"></div>
      <div className="animate-pulse-slow absolute top-1/3 -left-20 h-60 w-60 rounded-full bg-[#F6851B]/20 blur-3xl"></div>
      <div className="animate-pulse-slow absolute bottom-1/4 right-1/4 h-60 w-60 rounded-full bg-[#F6851B]/20 blur-3xl"></div>

      <div className="absolute top-1/4 left-1/2 h-40 w-40 -translate-x-1/2 border border-[#F6851B]/30 opacity-40">
        <div className="absolute inset-0 animate-spin-slow border-t border-[#F6851B]"></div>
      </div>

      <div className="absolute bottom-20 left-20 h-20 w-20 animate-float">
        <Hexagon className="h-full w-full text-[#F6851B]/20" />
      </div>
      <div className="absolute top-40 right-20 h-16 w-16 animate-float-delay">
        <Hexagon className="h-full w-full text-[#F6851B]/20" />
      </div>

      <div className="absolute inset-0 bg-grid-[#F6851B]/5 opacity-30"></div>

      <div className="absolute top-1/2 left-1/4 h-24 w-24 rounded-full border border-[#F6851B]/20 animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-1/4 h-16 w-16 rounded-full border border-[#F6851B]/20 animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 left-1/3 h-12 w-12 rounded-full border border-[#F6851B]/20 animate-pulse-slow"></div>

      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#F6851B]/30 to-transparent"></div>
      <div className="absolute top-0 left-1/4 h-full w-px bg-gradient-to-b from-transparent via-[#F6851B]/30 to-transparent"></div>
      <div className="absolute top-0 right-1/4 h-full w-px bg-gradient-to-b from-transparent via-[#F6851B]/30 to-transparent"></div>
    </div>
  );
}
