import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import gsap from "gsap";

const TRIBAL_PATHS = {
  S: "M90 20 L90 5 L10 5 L10 45 L80 45 L80 95 L10 95 L10 80 L25 80 L25 80 L80 80 L80 60 L10 60 L10 20 L90 20 Z",
  A: "M50 2 L65 30 L95 90 L75 80 L65 55 L35 55 L25 80 L5 90 L35 30 Z M40 45 L60 45 L50 25 Z",
  H: "M5 5 L30 15 L25 45 L75 35 L70 15 L95 5 L90 95 L65 85 L70 55 L30 65 L25 85 L10 95 Z",
  I: "M30 5 L70 5 L70 20 L60 20 L60 80 L70 80 L70 95 L30 95 L30 80 L40 80 L40 20 L30 20 Z",
  L: "M20 5 L40 5 L40 75 L80 75 L80 95 L20 95 Z"
};

const TribalLetter = ({ char }) => (
  <div className="relative w-[8vh] h-[8vh] md:w-[10vh] md:h-[10vh] flex justify-center items-center pointer-events-auto hover:scale-110 transition-transform duration-300">
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" style={{ filter: "drop-shadow(0 0 8px rgba(0, 243, 255, 0.6))" }}>
      <path d={TRIBAL_PATHS[char] || ""} fill="transparent" stroke="#00F3FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={TRIBAL_PATHS[char] || ""} fill="transparent" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
    </svg>
  </div>
);

const CVHero = React.forwardRef((props, ref) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  
  const notificationRef = useRef(null); 
  const notificationBoxRef = useRef(null);
  const toggleBtnRef = useRef(null); 

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useLayoutEffect(() => {
    if (!notificationBoxRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      gsap.to(notificationRef.current, { y: -15, duration: 2.5, ease: "sine.inOut", yoyo: true, repeat: -1 });

      if (isExpanded) {
        tl.to(notificationBoxRef.current, {
          width: isMobile ? 320 : 420, height: "auto", borderRadius: "0px", 
          backgroundColor: "rgba(5, 11, 20, 0.85)", borderColor: "rgba(0, 243, 255, 0.5)",
          boxShadow: "0 0 40px rgba(0, 243, 255, 0.15)", duration: 0.6, ease: "back.out(1.1)"
        })
        .to(toggleBtnRef.current, { top: "24px", left: "24px", xPercent: 0, yPercent: 0, duration: 0.5 }, "<")
        .to(".content-wrapper", { opacity: 1, visibility: "visible", duration: 0.2 })
      } else {
        tl.to(".content-wrapper", { opacity: 0, duration: 0.2 })
        .to(notificationBoxRef.current, {
          width: 50, height: 50, borderRadius: "50%", 
          backgroundColor: "rgba(0, 0, 0, 0.8)", borderColor: "rgba(0, 243, 255, 0.8)", 
          boxShadow: "0 0 15px rgba(0, 243, 255, 0.6)", duration: 0.4
        }, "<")
        .to(toggleBtnRef.current, { top: "50%", left: "50%", xPercent: -50, yPercent: -50, duration: 0.4, scale: 1.2 }, "<");
      }
    }, notificationRef);
    return () => ctx.revert();
  }, [isExpanded, isMobile]);

  return (
    <div ref={ref} className="fixed inset-0 w-full h-screen bg-[#030712] overflow-hidden" style={{ zIndex: 10, opacity: 1 }}>
      
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10" style={{ backgroundImage: 'linear-gradient(#00F3FF 1px, transparent 1px), linear-gradient(90deg, #00F3FF 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-[#00F3FF] rounded-full mix-blend-screen filter blur-[150px] opacity-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] bg-[#A855F7] rounded-full mix-blend-screen filter blur-[150px] opacity-10" />

      {/* Side Typography */}
      <div className="absolute right-[5vw] top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-4 z-[55] pointer-events-none">
        {['S','A','H','I','L'].map((char, i) => ( <TribalLetter key={i} char={char} /> ))}
      </div>

      {/* Profile Box */}
      <div className="absolute inset-0 flex items-center justify-start px-[6vw] md:px-[10vw] z-20 pointer-events-none">
        <div ref={notificationRef} className="font-sans pointer-events-auto">
            <div ref={notificationBoxRef} className="relative overflow-hidden border backdrop-blur-md w-[380px] min-h-[50px] rounded-[50px]">
              
              <div className="relative p-6 md:p-8 flex flex-col w-full h-full justify-between">
                <div className="flex items-center w-full min-h-[32px]">
                  <div ref={toggleBtnRef} onClick={() => setIsExpanded(!isExpanded)} className="absolute flex items-center justify-center w-[30px] h-[30px] md:w-8 md:h-8 rounded-full border border-[#00F3FF] text-[#00F3FF] cursor-pointer hover:bg-[#00F3FF] hover:text-black transition-colors z-[60] bg-black/40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="text-lg font-bold">!</span>
                  </div>
                  <div className="content-wrapper opacity-0 invisible w-full ml-10 mt-1">
                      <h2 className="text-[#00F3FF] tracking-[0.2em] border-b border-[#00F3FF]/30 pb-2 text-base font-bold">SYSTEM_PROFILE.EXE</h2>
                  </div>
                </div>

                <div className="content-wrapper opacity-0 invisible mt-6">
                  <div className="text-sm md:text-base text-gray-300 mb-8 font-mono">
                      <p className="text-[#00F3FF]/80 animate-pulse">{'>'} STATUS: ONLINE</p>
                      <p className="mt-4 text-gray-100">SOFTWARE ENGINEER SPECIALIZING IN <br/><span className="text-purple-400 font-bold">REACT.JS</span> & <span className="text-[#00F3FF] font-bold">GSAP</span></p>
                      <p className="mt-2 text-gray-400 text-xs md:text-sm">[ C++ | Python | Data Structures ]</p>
                  </div>
                  <div className="flex gap-4 w-full">
                      <button className="flex-1 py-3 border border-[#00F3FF] text-[#00F3FF] text-xs font-bold uppercase hover:bg-[#00F3FF] hover:text-black transition-all">Init Demo</button>
                      <button className="flex-1 py-3 border border-purple-500 text-purple-500 text-xs font-bold uppercase hover:bg-purple-500 hover:text-white transition-all">Resume</button>
                  </div>
                </div>
              </div>

            </div>
        </div> 
      </div>
    </div>
  );
});

export default CVHero;