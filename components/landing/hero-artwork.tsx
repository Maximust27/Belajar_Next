export function HeroArtwork() {
  return (
    <div className="relative mx-auto w-full max-w-[570px]" aria-hidden="true">
      <svg
        viewBox="0 0 560 460"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-auto w-full drop-shadow-[0_26px_18px_rgba(0,0,0,0.06)]"
      >
        <defs>
          <pattern id="inventraDots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#d6d3d1" />
          </pattern>
          <linearGradient id="inventraOrange" x1="95" y1="240" x2="375" y2="390" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ffca54" />
            <stop offset="1" stopColor="#ef5c29" />
          </linearGradient>
        </defs>

        <rect x="35" y="35" width="490" height="380" rx="10" fill="url(#inventraDots)" />
        <rect x="53" y="54" width="454" height="346" rx="10" stroke="#d6d3d1" strokeDasharray="4 7" />

        {/* Base platform */}
        <path d="M81 326L270 225L467 333L277 434L81 326Z" fill="#fff" stroke="#18181b" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M81 326L277 434V445L81 337V326Z" fill="#171717" stroke="#18181b" strokeWidth="2" />
        <path d="M277 434L467 333V344L277 445V434Z" fill="#77716e" stroke="#18181b" strokeWidth="2" />
        <path d="M119 325L269 246L428 334L278 413L119 325Z" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="1.5" />

        {/* Main warehouse module */}
        <path d="M178 145L282 90L392 150L287 206L178 145Z" fill="#fff" stroke="#171717" strokeWidth="3" strokeLinejoin="round" />
        <path d="M178 145L287 206V338L178 276V145Z" fill="#fff" stroke="#171717" strokeWidth="3" strokeLinejoin="round" />
        <path d="M287 206L392 150V282L287 338V206Z" fill="#f5f5f4" stroke="#171717" strokeWidth="3" strokeLinejoin="round" />
        <path d="M190 161L278 208V325L190 275V161Z" stroke="#a8a29e" strokeWidth="1.5" />
        <path d="M303 216L380 175V272L303 314V216Z" stroke="#c9c4bf" strokeWidth="1.5" />
        <path d="M227 171L331 116" stroke="#a8a29e" strokeWidth="1.5" strokeDasharray="5 7" />

        {/* Package mark on the enclosure */}
        <path d="M225 216L253 231V265L225 249V216Z" fill="#171717" />
        <path d="M225 216L244 206L272 221L253 231L225 216Z" fill="#fa7c2f" stroke="#171717" strokeWidth="1.5" />
        <path d="M253 231L272 221V255L253 265V231Z" fill="#ef5c29" stroke="#171717" strokeWidth="1.5" />
        <path d="M237 222L255 212" stroke="white" strokeWidth="2" />
        <path d="M210 275L261 304" stroke="#d6d3d1" strokeWidth="2" />
        <path d="M210 286L246 307" stroke="#d6d3d1" strokeWidth="2" />

        {/* Incoming small orange package */}
        <path d="M98 272L144 247L192 274L146 299L98 272Z" fill="#ffce67" stroke="#18181b" strokeWidth="2" />
        <path d="M98 272L146 299V355L98 328V272Z" fill="url(#inventraOrange)" stroke="#18181b" strokeWidth="2" />
        <path d="M146 299L192 274V330L146 355V299Z" fill="#d93920" stroke="#18181b" strokeWidth="2" />
        <path d="M120 260L169 286" stroke="#18181b" strokeWidth="2" />
        <path d="M119 286V308" stroke="#fff" strokeWidth="3" />

        {/* Floating status tile */}
        <path d="M376 86L414 65L453 86L414 108L376 86Z" fill="#fff" stroke="#18181b" strokeWidth="2" />
        <path d="M376 86L414 108V147L376 125V86Z" fill="#ff9d45" stroke="#18181b" strokeWidth="2" />
        <path d="M414 108L453 86V125L414 147V108Z" fill="#e2502d" stroke="#18181b" strokeWidth="2" />
        <path d="M395 102L412 112L431 101" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M414 112V130" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />

        {/* Motion / inventory guide details */}
        <path d="M129 211V141L182 111" stroke="#a8a29e" strokeWidth="1.5" strokeDasharray="6 6" />
        <circle cx="129" cy="211" r="5" fill="#f97316" stroke="#171717" strokeWidth="1.5" />
        <path d="M414 147V211" stroke="#a8a29e" strokeWidth="1.5" strokeDasharray="6 6" />
        <circle cx="414" cy="211" r="5" fill="#f97316" stroke="#171717" strokeWidth="1.5" />
        <path d="M326 363L363 343" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
        <path d="M333 374L371 354" stroke="#18181b" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="absolute bottom-[5%] right-[-1%] border border-neutral-900 bg-white px-3 py-2 font-mono text-[10px] font-bold tracking-[0.2em] shadow-[5px_5px_0_#171717] sm:right-[2%]">
        SYSTEM / INVENTRA
      </div>
    </div>
  );
}
