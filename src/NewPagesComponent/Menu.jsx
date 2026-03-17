import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";

const MENU_ITEMS = [
  { label: "HOME", id: "home", path: "/", kanji: "帰巣", chapter: "壱" },
  { label: "EVENTS", id: "events", path: "/EventPage", kanji: "祭事", chapter: "弐" },
  { label: "PEOPLE", id: "people", path: "/ComingSoon", kanji: "一族", chapter: "参" },
  { label: "WORKSHOP", id: "workshop", path: "/ComingSoon", kanji: "工房", chapter: "四" },
  { label: "MERCHANDISE", id: "merchandise", path: "/ComingSoon", kanji: "商品", chapter: "五" },
];

const MangaMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const containerRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const parchmentRef = useRef(null);
  const tlRef = useRef(null); 

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      
      tl.set(containerRef.current, { visibility: 'visible' });
      tl.set([leftPanelRef.current, rightPanelRef.current], { scaleX: 1, opacity: 0 });
      tl.set(parchmentRef.current, { opacity: 0 });

      tl.to([leftPanelRef.current, rightPanelRef.current], {
        opacity: 1, duration: 0.5, ease: "power2.inOut",
      })
      .set(parchmentRef.current, { opacity: 1 })
      .to([leftPanelRef.current, rightPanelRef.current], {
        scaleX: 0, duration: 0.8, ease: "power3.inOut", stagger: 0, force3D: true 
      });

      tlRef.current = tl;
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const toggleMenu = () => {
    if (!tlRef.current) return;
    if (isOpen) {
      tlRef.current.reverse();
    } else {
      tlRef.current.play();
    }
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (item) => {
    if (location.pathname === item.path || (item.id === "home" && location.pathname === "/")) {
      toggleMenu();
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 800);
      return;
    }

    if (isOpen) {
      tlRef.current.reverse();
      setIsOpen(false);
    }

    setTimeout(() => {
      if (item.id === "home") {
        navigate("/");
        window.scrollTo(0, 0);
      } 
      else if (item.path) {
        navigate(item.path);
        window.scrollTo(0, 0);
      } 
    }, 800); 
  };

  return (
    <div ref={containerRef} className={`fixed inset-0 z-[150] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      
      {/* --- MENU TOGGLE BUTTON (1.2x Scale + Yellow Hover) --- */}
      <button 
        onClick={toggleMenu}
        className="fixed top-8 right-6 z-[160] group cursor-pointer pointer-events-auto transition-all duration-300 outline-none"
      >
        <div className="relative w-16 h-16 flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.2] transform-gpu">
          {/* Animated Dashed Ring */}
          <div className={`absolute inset-0 border-2 rounded-full border-dashed animate-[spin_10s_linear_infinite] transition-all duration-300
            ${isOpen ? 'opacity-0' : 'border-orange-700 group-hover:border-yellow-400 opacity-100'}`} 
          />
          
          {/* Core Stamp Square */}
          <div className={`relative w-12 h-12 rounded-sm flex items-center justify-center shadow-xl transition-all duration-500
            ${isOpen 
              ? 'rotate-180 bg-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
              : 'rotate-0 bg-orange-700 group-hover:bg-yellow-400 group-hover:shadow-[0_0_20px_rgba(250,204,21,0.6)]'
            }`}
          >
            <span className={`font-serif font-black text-xl leading-none writing-vertical-rl select-none transition-colors duration-300
              ${isOpen ? 'text-white' : 'text-white group-hover:text-black'}`}>
                {isOpen ? "閉" : "開"}
            </span>
          </div>
        </div>
      </button>

      <div className="absolute inset-0 flex overflow-hidden">
        {/* Left Gate */}
        <div ref={leftPanelRef} className="absolute left-0 top-0 w-[51%] h-full bg-[#050505] z-30 origin-left border-r border-white/10 flex items-center justify-end pr-10 opacity-0 scale-x-100 will-change-transform">
           <span className="text-white/20 font-black text-9xl vertical-rl opacity-50 hidden md:block uppercase tracking-tighter italic">巻物の秘</span>
        </div>
        
        {/* Right Gate */}
        <div ref={rightPanelRef} className="absolute right-0 top-0 w-[51%] h-full bg-[#050505] z-30 origin-right border-l border-white/10 opacity-0 scale-x-100 will-change-transform" />

        {/* Parchment Area */}
        <div ref={parchmentRef} className="absolute inset-0 bg-[#F2E8CF] z-10 flex flex-col items-center justify-center opacity-0 overflow-hidden">
           <div className="relative z-20 flex flex-col items-center justify-center gap-16 md:gap-14 w-full max-w-4xl px-10 h-full">
              {MENU_ITEMS.map((item, index) => (
                <div 
                  key={item.label}
                  onClick={() => handleLinkClick(item)}
                  className="group relative w-full cursor-pointer flex items-center justify-between border-b border-black/10 pb-4 transition-all duration-300"
                >
                  {/* Chapter Label (1.2x Scale on Hover) */}
                  <div className="flex items-center gap-4 transition-transform duration-300 group-hover:scale-[1.2] transform-gpu origin-left">
                     <div className="w-10 h-10 border border-black flex items-center justify-center group-hover:bg-yellow-400 group-hover:border-black transition-colors duration-300">
                        <span className="font-serif text-sm font-bold text-black">{item.chapter}</span>
                     </div>
                     <span className="text-xs font-mono tracking-widest text-orange-700 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
                        CHAPTER {index + 1}
                     </span>
                  </div>
                  
                  {/* Main Link Text (1.2x Scale + Skew on Hover) */}
                  <h2 className="absolute left-1/2 -translate-x-1/2 text-5xl md:text-7xl font-serif font-black tracking-tighter text-[#1a1a1a] transition-all duration-300 uppercase italic 
                                 group-hover:text-orange-700 group-hover:-skew-x-12 group-hover:scale-[1.2] transform-gpu">
                    {item.label}
                  </h2>
                  
                  {/* Kanji Shadow (1.2x Scale on Hover) */}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 transition-all duration-500 origin-right pointer-events-none group-hover:opacity-100 group-hover:scale-[1.2] transform-gpu">
                      <span className="text-6xl md:text-8xl font-black text-orange-900 mix-blend-multiply writing-vertical-rl select-none group-hover:text-yellow-600 transition-colors">
                         {item.kanji}
                      </span>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default MangaMenu;