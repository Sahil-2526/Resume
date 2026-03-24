import React, { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import eva from "../assets/wintertree.png";

gsap.registerPlugin(ScrollTrigger);

// Data reordered chronologically
const educationData = [
  {
    degree: "Secondary School (Class X)",
    school: "Board of Secondary Education",
    grade: "87.6%",
    year: "Completed",
    location: "India"
  },
  {
    degree: "Senior Secondary (Class XII)",
    school: "Board of Secondary Education",
    grade: "86.6%",
    year: "Completed",
    location: "India"
  },
  {
    degree: "B.Tech in Computer Science & Engineering",
    school: "IIIT Manipur",
    grade: "8.63 CPI",
    year: "Aug 2024 - May 2028",
    location: "Imphal, India"
  }
];

const AcademicsPage = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null); 
  const ghostRef = useRef(null); 
  const snowContainerRef = useRef(null);
  
  const scrollTextRef = useRef(null); 
  const scrollIndicatorRef = useRef(null); // New ref for the floating animation
  
  // State to track if the user has scrolled down the container
  const [isScrolled, setIsScrolled] = useState(false);

  useLayoutEffect(() => {
    let mm = gsap.matchMedia();

    const ctx = gsap.context((self) => {
      // 1. DIGITAL SNOWFALL ANIMATION
      const flakes = gsap.utils.toArray(".snowflake", snowContainerRef.current);
      flakes.forEach((flake) => {
        gsap.set(flake, {
          x: Math.random() * window.innerWidth,
          y: -50,
          opacity: Math.random() * 0.8 + 0.2,
          scale: Math.random() * 0.5 + 0.3,
        });

        gsap.to(flake, {
          y: window.innerHeight + 100,
          x: `+=${Math.random() * 100 - 50}`, 
          rotation: Math.random() * 360,
          duration: Math.random() * 5 + 5,
          repeat: -1,
          delay: Math.random() * 5,
          ease: "none",
        });
      });

      // 2. SCROLL INDICATOR ANIMATIONS
      // Glowing pulse for the text
      gsap.to(scrollTextRef.current, {
        dropShadow: "0 0 20px rgba(0,243,255,1)",
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "sine.inOut"
      });

      // Smooth floating animation for the whole indicator (text + arrow)
      gsap.to(scrollIndicatorRef.current, {
        y: 12,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: "sine.inOut"
      });

      // 3. CARDS 3D ANIMATION
      const cards = gsap.utils.toArray(".card", containerRef.current);
      
      mm.add({
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      }, (context) => {
        let { isMobile } = context.conditions;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ghostRef.current,
            scroller: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          }
        });

        cards.forEach((card, i) => {
          tl.fromTo(card, 
            { z: -800, y: 250, x: 0, opacity: 0, scale: 0.5, force3D: true },
            { 
              z: 0, 
              y: isMobile ? 0 : 25, 
              x: isMobile ? 0 : -80 + (i % 2) * 160, 
              opacity: 1, 
              scale: 1, 
              ease: "power3.out", 
              duration: 4 
            },
            i * 5
          );

          if (i > 0) {
            tl.to(cards[i - 1], {
              opacity: 0, scale: 0.8, z: -100, duration: 3
            }, i * 5 + 1);
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Handler to toggle scroll indicator visibility
  const handleScroll = (e) => {
    // If scrolled down more than 20px, hide the text/arrow. If at the top, show it.
    if (e.target.scrollTop > 20) {
      if (!isScrolled) setIsScrolled(true);
    } else {
      if (isScrolled) setIsScrolled(false);
    }
  };

  return (
    // Replaced deep blue winter background with Obsidian/Slate tech background
    <div ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-[#0B0F19]">
      
      {/* --- TECH-WINTER BACKGROUND --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19] via-[#0F172A] to-[#0B0F19] -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* Ambient glows to match the Home Page Theme */}
      <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-[#3B82F6] rounded-full blur-[150px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[35vw] h-[35vw] bg-[#A855F7] rounded-full blur-[150px] opacity-15 pointer-events-none" />

      {/* --- DIGITAL SNOWFALL LAYER --- */}
      <div ref={snowContainerRef} className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i} 
            // Changed to a cyan-tinted glow for a tech-particle feel
            className="snowflake absolute w-2 h-2 bg-cyan-100/80 rounded-full blur-[1px]" 
            style={{ filter: "drop-shadow(0 0 6px rgba(0,243,255,0.8))" }}
          />
        ))}
      </div>

      {/* --- WINTER TREE IMAGE --- */}
      {/* Glow changed from icy white to cyan */}
      <div className="absolute left-0 w-[100vw] z-20 pointer-events-none opacity-[0.35] drop-shadow-[0_0_25px_rgba(0,243,255,0.3)] bottom-0 md:top-0 md:bottom-auto">
        <img src={eva} alt="Snowman Tree" className="w-full h-auto object-contain" />
      </div>

      {/* --- UI Container --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 max-w-[95vw] md:w-[60vw] w-[90vw] h-[70vh] opacity-95">
        
        {/* Decorative Frost Lines (Now Cyan) */}
        <div className="absolute inset-0 pointer-events-none z-50">
          <div className="absolute top-0 left-0 w-[2px] h-8 bg-[#00F3FF] shadow-[0_0_10px_#00F3FF]" />
          <div className="absolute top-0 left-0 w-20 h-[2px] bg-[#00F3FF] shadow-[0_0_10px_#00F3FF]" />
          <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-[#00F3FF] shadow-[0_0_10px_#00F3FF]" />
          <div className="absolute bottom-0 right-0 w-20 h-[2px] bg-[#00F3FF] shadow-[0_0_10px_#00F3FF]" />
        </div>

        {/* --- SCROLL INDICATOR OVERLAY --- */}
        {/* Outer container handles centering and fade out */}
        <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none z-[70] transition-opacity duration-500 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}>
          {/* Inner container handles the smooth GSAP floating animation */}
          <div ref={scrollIndicatorRef} className="flex flex-col items-center">
            {/* Text size reduced back to xs/sm */}
            <span 
              ref={scrollTextRef}
              className="text-[#00F3FF] font-['Orbitron'] text-xs md:text-sm tracking-[0.2em] uppercase mb-1 md:mb-2 text-center drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]"
            >
              Scroll inside to view
            </span>
            {/* SVG size reduced and animate-bounce removed so it uses GSAP float */}
            <svg 
              className="w-6 h-6 md:w-8 md:h-8 text-[#00F3FF] drop-shadow-[0_0_12px_rgba(0,243,255,0.9)] opacity-80" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>

        {/* SCROLLABLE WRAPPER */}
        {/* Background changed to Slate 900 to match glassmorphism of Home */}
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className="relative h-full w-full p-4 md:p-8 bg-[#0F172A]/70 backdrop-blur-xl border border-[#00F3FF]/20 shadow-[0_0_40px_rgba(0,243,255,0.05)] overflow-y-auto overflow-x-hidden pointer-events-auto no-scrollbar rounded-md"
        >
          
          <div className="sticky top-0 z-[60] pb-4 mb-4 border-b border-[#00F3FF]/20 w-full flex justify-center bg-[#0F172A]/80 backdrop-blur-xl">
              <h2 className="text-[#00F3FF] tracking-[0.4em] text-lg md:text-2xl font-bold drop-shadow-[0_0_10px_rgba(0,243,255,0.5)] uppercase font-['Orbitron']">
                ACADEMICS
              </h2>
          </div>

          <div ref={ghostRef} className="absolute top-0 left-0 w-full h-[250vh] -z-10 pointer-events-none" />

          {/* BASIC CARD VIEWPORT */}
          <div className="sticky top-[10%] md:top-[15%] h-[50vh] w-full perspective-[1200px] flex items-center justify-center pointer-events-none">
            {educationData.map((edu, i) => (
              <div 
                key={i} 
                className="card absolute bg-[#0B0F19]/95 backdrop-blur-md border border-[#00F3FF]/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] rounded-2xl p-6 md:p-10 w-[85vw] md:w-[45vw] flex flex-col pointer-events-auto"
              >
                {/* Main Title */}
                <h3 className="text-white text-xl md:text-2xl font-bold font-sans mb-1 leading-tight">
                  {edu.degree}
                </h3>
                
                {/* Subtitle changed to Purple to match Home accent */}
                <p className="text-[#A855F7] text-sm md:text-base font-medium mb-6">
                  {edu.school} &bull; {edu.year}
                </p>

                {/* Info Rows */}
                <div className="flex flex-col gap-3 font-mono text-sm md:text-base text-slate-300 mt-auto">
                  <div className="flex items-center gap-3 border-b border-[#00F3FF]/10 pb-2">
                    <span className="text-slate-500 min-w-[70px]">Score:</span>
                    {/* Score changed to Cyan */}
                    <span className="text-[#00F3FF] font-bold">{edu.grade}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 min-w-[70px]">Location:</span>
                    <span className="text-white">{edu.location}</span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx="true">{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AcademicsPage;