import { ArrowRight, Boxes, PackageMinus, PackagePlus } from "lucide-react";

export function FlowArtwork() {
  return (
    <div className="relative overflow-hidden border border-dashed border-neutral-300 bg-[#faf9f6] px-4 py-8 sm:px-8">
      <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(#ddd6ce_1px,transparent_1px)] [background-size:18px_18px]" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-[440px] items-center justify-center gap-1 py-12 sm:gap-4">
        <div data-motion="flow-left" className="flex h-28 min-w-0 flex-1 -rotate-6 flex-col items-center justify-center gap-2 border-2 border-neutral-900 bg-white p-2 sm:gap-3 sm:p-3 shadow-[6px_6px_0_#fdba74] transition-[rotate,translate,box-shadow] duration-300 hover:-translate-y-2 hover:rotate-0 hover:shadow-[10px_10px_0_#fdba74] sm:h-40 sm:w-32 motion-reduce:transform-none">
          <PackagePlus className="size-7 sm:size-9 text-orange-600" strokeWidth={1.4} aria-hidden="true" />
          <span className="font-mono text-[9px] font-bold tracking-wide sm:text-[10px]">INBOUND</span>
        </div>
        <ArrowRight data-motion="fade" data-motion-delay="145" className="size-4 shrink-0 text-neutral-800 sm:size-6" aria-hidden="true" />
        <div data-motion="flow-center" data-motion-delay="210" className="z-10 flex h-32 min-w-0 flex-[1.2] flex-col items-center justify-center gap-2 border-2 border-neutral-900 bg-[#ffcc6a] p-2 sm:gap-3 sm:p-3 shadow-[7px_7px_0_#ea580c] transition-[translate,box-shadow] duration-300 hover:-translate-y-2 hover:shadow-[10px_10px_0_#ea580c] sm:h-44 sm:w-36 motion-reduce:transform-none">
          <Boxes className="size-8 sm:size-10" strokeWidth={1.3} aria-hidden="true" />
          <span className="font-mono text-[9px] font-bold tracking-wide sm:text-[10px]">INVENTORY</span>
        </div>
        <ArrowRight data-motion="fade" data-motion-delay="355" className="size-4 shrink-0 text-neutral-800 sm:size-6" aria-hidden="true" />
        <div data-motion="flow-right" data-motion-delay="420" className="flex h-28 min-w-0 flex-1 rotate-6 flex-col items-center justify-center gap-2 border-2 border-neutral-900 bg-white p-2 sm:gap-3 sm:p-3 shadow-[6px_6px_0_#f87171] transition-[rotate,translate,box-shadow] duration-300 hover:-translate-y-2 hover:rotate-0 hover:shadow-[10px_10px_0_#f87171] sm:h-40 sm:w-32 motion-reduce:transform-none">
          <PackageMinus className="size-7 sm:size-9 text-red-600" strokeWidth={1.4} aria-hidden="true" />
          <span className="font-mono text-[9px] font-bold tracking-wide sm:text-[10px]">OUTBOUND</span>
        </div>
      </div>
      <span data-motion="fade" data-motion-delay="535" className="relative block font-mono text-[10px] font-bold tracking-[0.22em] text-neutral-500">
        FIG. 01 / INVENTORY FLOW
      </span>
    </div>
  );
}
