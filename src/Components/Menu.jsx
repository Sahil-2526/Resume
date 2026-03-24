import React from "react";

const Menu = React.memo(({ onClick, isOpen }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Menu"
      className="
        fixed md:top-8 top-6 md:right-8 right-[1px]
        z-[1100]
        group
        flex flex-col items-end gap-[6px]
        p-1
        cursor-pointer
        focus:outline-none
        touch-manipulation
      "
    >
      {/* Top Bar */}
      <span
        className={`
          h-[4px] bg-[#00F3FF]
          transition-transform transition-opacity duration-300
          ${isOpen ? "w-8 rotate-45 translate-y-[10px]" : "w-10"}
          group-hover:bg-[#00F3FF]
          group-hover:shadow-[0_0_10px_#00F3FF]
          glitch-anim-1
        `}
      />

      {/* Middle Bar (Turns Purple on hover) */}
      <span
        className={`
          h-[4px] bg-[#00F3FF]
          transition-all duration-300
          ${isOpen ? "w-0 opacity-0" : "w-7"}
          group-hover:bg-[#A855F7]
          group-hover:shadow-[0_0_10px_#A855F7]
          glitch-anim-2
        `}
      />

      {/* Bottom Bar */}
      <span
        className={`
          h-[4px] bg-[#00F3FF]
          transition-transform transition-opacity duration-300
          ${isOpen ? "w-8 -rotate-45 -translate-y-[10px]" : "w-10"}
          group-hover:bg-[#00F3FF]
          group-hover:shadow-[0_0_10px_#00F3FF]
          glitch-anim-1-reverse
        `}
      />

      {/* MENU Label */}
      <span
        className="
          text-[10px] font-['Orbitron'] tracking-widest
          text-[#00F3FF]
          opacity-0 group-hover:opacity-100
          transition-opacity duration-200
          absolute -bottom-4 right-1
          drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]
          pointer-events-none
        "
      >
        MENU
      </span>
    </button>
  );
});

export default Menu;