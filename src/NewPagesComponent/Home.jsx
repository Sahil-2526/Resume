import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

// 1. Import all 3 SVGs
import LaptopBg from '../assets/hero_section.svg?react';
import TabletBg from '../assets/tablet_hero_section.svg?react';
import PhoneBg from '../assets/phone_hero_section.svg?react';

const Home = () => {
  const containerRef = useRef(null);

  // 2. Entrance Animation: "Mission Briefing" Style
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Slide in elements with a heavy "slam" feel
      tl.fromTo(".mission-data", 
        { y: 30, opacity: 0, filter: "blur(5px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, stagger: 0.1, ease: "power4.out" }
      )
      // Stamp the "Classified" mark
      .fromTo(".stamp-seal", 
        { scale: 2, opacity: 0, rotation: 45 },
        { scale: 1, opacity: 0.8, rotation: -12, duration: 0.4, ease: "elastic.out(1, 0.5)" },
        "-=0.2"
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // 3. Shared Logic for SVGs (Keep character responsive)
  const characterLogic = `
    w-full h-full object-contain relative 
    [&_*]:transition-all [&_*]:duration-500 [&_*]:ease-out
    [&_#orange-character]:cursor-pointer
    [&_#orange-character]:[transform-box:fill-box] 
    [&_#orange-character]:origin-center
    [&_#orange-character:hover]:scale-[1.1] 
    [&_#orange-character:hover]:-rotate-6
  `;

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative w-full h-[50vh] md:h-screen overflow-hidden flex items-center justify-center" 
    >
      
      {/* =========================================================
          MANGA MISSION DOSSIER (The Content Overlay)
      ========================================================= */}
      <div className="absolute z-20 flex flex-col items-start justify-center text-left pointer-events-none select-none
                      /* Positioning Logic to fit inside the screen */
                      w-[65%] top-[42%] left-[52%] -translate-x-1/2 -translate-y-1/2
                      md:w-[50%] md:top-[45%] md:left-[50%]
                      lg:w-[40%] lg:top-[48%]">
        
        {/* --- 1. HEADER DATA --- */}
        <div className="mission-data flex items-center justify-between w-full border-b-2 border-black/10 pb-0 mb-4 pt-10">
           <div className="flex flex-col">
              <span className="text-[8px] md:text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                Mission ID: <span className="text-orange-700">2026-AHB</span>
              </span>
              <span className="text-[10px] md:text-xs font-black text-black uppercase tracking-tighter">
                CLASSIFIED // LEVEL 5
              </span>
           </div>
           {/* CSS Barcode */}
           <div className="flex gap-[2px] h-4 md:h-6 opacity-60">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`w-[2px] md:w-[3px] bg-black ${i % 2 === 0 ? 'h-full' : 'h-2/3 self-end'}`} />
              ))}
           </div>
        </div>

        {/* --- 2. MAIN TITLE --- */}
        <h1 className="mission-data text-4xl md:text-6xl lg:text-6xl font-black  tracking-tighter text-black leading-[0.85] mix-blend-multiply">
          PROJECT <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-700 to-red-600">AHOUBA</span>
        </h1>
        
        {/* --- 3. SUBTITLE / KANJI --- */}
        <div className="mission-data flex items-center gap-3 mt-3">
           <div className="bg-black text-white text-[8px] md:text-[10px] font-bold px-2 py-0.5 uppercase skew-x-[-10deg]">
             Target: IIITM
           </div>
           <span className="text-xs md:text-sm font-black text-zinc-400 writing-vertical-lr">
             覚醒
           </span>
           <p className="text-[8px] md:text-xs font-bold text-zinc-500 uppercase tracking-wide max-w-[200px] leading-tight">
             Initiate sequence for the ultimate technical convergence.
           </p>
        </div>

        {/* --- 4. THE "STAMP" BUTTON --- */}
        <div className="mission-data mt-6 relative group pointer-events-auto cursor-pointer inline-block">
          {/* Button Shadow */}
          <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
          
          {/* Main Button */}
          <button className="relative px-6 py-2 md:px-10 md:py-3 bg-orange-700 text-white font-black italic text-xs md:text-lg uppercase tracking-widest border-2 border-black hover:bg-white hover:text-orange-700 transition-colors duration-300 flex items-center gap-2 overflow-hidden">
             {/* Hover Swipe Effect */}
             <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 mix-blend-difference"></div>
             
             <span className="relative z-10">Initialize</span>
             <svg className="relative z-10 w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </button>
        </div>

        {/* --- 5. DECORATIVE "TOP SECRET" STAMP --- */}
        <div className="stamp-seal absolute -right-4 top-10 md:-right-10 md:top-12 border-4 border-red-600/30 text-red-600/30 rounded-full w-20 h-20 md:w-28 md:h-28 flex items-center justify-center -rotate-12 pointer-events-none mix-blend-multiply">
           <div className="border border-red-600/30 rounded-full w-[90%] h-[90%] flex items-center justify-center">
              <span className="font-black text-[10px] md:text-xs uppercase tracking-widest opacity-80 animate-pulse">
                S-Rank <br/> Only
              </span>
           </div>
        </div>

      </div>


      {/* ------------------------------------------------------
          SVG BACKGROUNDS
          ------------------------------------------------------ */}
      
      {/* 1. Phone */}
      <PhoneBg 
        className={`block min-[324px]:hidden ${characterLogic}  
          [&_#orange-character]:scale-[1.1]
          [&_#white-div]:scale-y-[1.1] [&_#black-background]:scale-y-[1.1]
          [&_#white-div]:origin-bottom [&_#black-background]:origin-bottom
        `}
      />

      {/* 2. Tablet */}
      <TabletBg 
        className={`hidden min-[324px]:block min-[463px]:hidden ${characterLogic} top-0
          [&_#orange-character]:scale-[2]
          [&_#white-div]:scale-y-[1] [&_#black-background]:scale-y-[1.15]
          [&_#white-div]:origin-bottom [&_#black-background]:origin-bottom
        `}
      />

      {/* 3. Laptop */}
      <LaptopBg 
        className={`hidden min-[463px]:block ${characterLogic} scale-[1] top-0 lg:top-30
          [&_#orange-character]:scale-[1.9] 
          [&_#orange-character:hover]:scale-[2.1]
          [&_#white-div]:scale-y-[100%] [&_#black-background]:scale-y-[100%]
          [&_#white-div]:origin-center [&_#black-background]:origin-center
        `}
      />
    </section>
  );
};

export default Home;