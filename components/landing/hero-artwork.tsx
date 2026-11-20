import { ArrowRight, Boxes, PackageMinus, PackagePlus } from "lucide-react";

export function FlowArtwork() {
  return (
    <div className="relative overflow-hidden border border-dashed border-neutral-300 bg-[#faf9f6] px-4 py-8 sm:px-8">
      <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(#ddd6ce_1px,transparent_1px)] [background-size:18px_18px]" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-[440px] items-center justify-center gap-2 py-12 sm:gap-4">
        <div className="flex h-32 w-24 -rotate-6 flex-col items-center justify-center gap-3 border-2 border-neutral-900 bg-white p-3 shadow-[6px_6px_0_#fdba74] sm:h-40 sm:w-32">
          <PackagePlus className="size-9 text-orange-600" strokeWidth={1.4} aria-hidden="true" />
          <span className="font-mono text-[9px] font-bold tracking-widest sm:text-[10px]">INBOUND</span>
        </div>
        <ArrowRight className="size-6 shrink-0 text-neutral-800" aria-hidden="true" />
        <div className="z-10 flex h-36 w-28 flex-col items-center justify-center gap-3 border-2 border-neutral-900 bg-[#ffcc6a] p-3 shadow-[7px_7px_0_#ea580c] sm:h-44 sm:w-36">
          <Boxes className="size-10" strokeWidth={1.3} aria-hidden="true" />
          <span className="font-mono text-[9px] font-bold tracking-widest sm:text-[10px]">INVENTORY</span>
        </div>
        <ArrowRight className="size-6 shrink-0 text-neutral-800" aria-hidden="true" />
        <div className="flex h-32 w-24 rotate-6 flex-col items-center justify-center gap-3 border-2 border-neutral-900 bg-white p-3 shadow-[6px_6px_0_#f87171] sm:h-40 sm:w-32">
          <PackageMinus className="size-9 text-red-600" strokeWidth={1.4} aria-hidden="true" />
          <span className="font-mono text-[9px] font-bold tracking-widest sm:text-[10px]">OUTBOUND</span>
        </div>
      </div>
      <span className="relative font-mono text-[10px] font-bold tracking-[0.22em] text-neutral-500">
        FIG. 01 / INVENTORY FLOW
      </span>
    </div>
  );
}
