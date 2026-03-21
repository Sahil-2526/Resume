import React, { useRef, useLayoutEffect, useState, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- PROJECT DATA ---
const PROJECT_DATA = [
  { 
    id: 1, 
    title: "Interactive CV Portfolio", 
    desc: "A multi-seasonal, highly animated 3D web experience.",
    tech: ["React.js", "GSAP", "Tailwind"],
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 2, 
    title: "3D Basketball Court", 
    desc: "An immersive, interactive WebGL basketball environment.",
    tech: ["Three.js", "JavaScript", "WebGL"],
    img: "https://images.unsplash.com/photo-1519861531473-92002607333e?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 3, 
    title: "Ahouba Techfest Portal", 
    desc: "Official interactive web platform for the university tech festival.",
    tech: ["Frontend", "UI/UX", "CSS3"],
    img: "https://images.unsplash.com/photo-1514477917009-389c76a86b68?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 4, 
    title: "Developer README", 
    desc: "Dynamic GitHub profile showcasing automated stats and skills.",
    tech: ["Markdown", "APIs", "Design"],
    img: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 5, 
    title: "Algorithmic Vault", 
    desc: "Optimized solutions repository for 100+ LeetCode problems.",
    tech: ["C++", "Python", "DSA"],
    img: "https://images.unsplash.com/photo-1509565840034-3c385bed64f3?auto=format&fit=crop&q=80&w=600" 
  }
];

const AutumnSection = () => {
  const sectionRef = useRef(null);
  const fadeOverlayRef = useRef(null);
  const leavesRef = useRef([]);
  const windLinesRef = useRef([]);
  const cardsRef = useRef([]);
  
  // --- STATE ---
  const [activeIndex, setActiveIndex] = useState(0); 
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // --- 1. RESPONSIVE CHECK ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- 2. AUTO-PLAY ENGINE ---
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % PROJECT_DATA.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + PROJECT_DATA.length) % PROJECT_DATA.length);
  }, []);

  useEffect(() => {
    let interval;
    let timeout;

    if (!isPaused) {
      interval = setInterval(handleNext, 3000); 
    } else {
      timeout = setTimeout(() => {
        setIsPaused(false);
      }, 3000);
    }

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isPaused, handleNext]);

  const manualInteraction = (action) => {
    setIsPaused(true);
    if (action === 'next') handleNext();
    if (action === 'prev') handlePrev();
  };

  // --- 3. CAROUSEL ANIMATION (GSAP) ---
  useEffect(() => {
    const cards = cardsRef.current;
    const len = PROJECT_DATA.length;

    cards.forEach((card, index) => {
      let dist = (index - activeIndex) % len;
      if (dist > len / 2) dist -= len;
      if (dist < -len / 2) dist += len;

      let config = {
        overwrite: "auto",
        duration: 0.9,
        ease: "expo.out",
      };

      if (dist === 0) {
        config = { ...config, xPercent: 0, scale: 1, height: isMobile ? "55vh" : "65vh", opacity: 1, zIndex: 20, filter: "blur(0px) brightness(1)" };
      } else if (Math.abs(dist) === 1) {
        const spacing = isMobile ? 65 : 120; 
        config = { ...config, xPercent: dist * spacing, scale: 0.85, height: isMobile ? "45vh" : "50vh", opacity: 0.5, zIndex: 10, filter: "blur(4px) brightness(0.8)" };
      } else if (Math.abs(dist) === 2 && !isMobile) {
        config = { ...config, xPercent: dist * 180, scale: 0.7, height: "35vh", opacity: 0.2, zIndex: 5, filter: "blur(6px) brightness(0.6)" };
      } else {
        config = { ...config, xPercent: dist * 50, scale: 0, height: "0vh", opacity: 0, zIndex: 0 };
      }

      gsap.to(card, config);
    });
  }, [activeIndex, isMobile]);

  // --- 4. BACKGROUND EFFECTS ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(fadeOverlayRef.current, { opacity: 1 }, {
        opacity: 0,
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "top 30%", scrub: 1 }
      });

      // Holographic Tech Leaves Animation
      leavesRef.current.forEach((leaf) => {
        // Randomize initial position above screen
        gsap.set(leaf, { 
          x: gsap.utils.random(-100, window.innerWidth + 100), 
          y: -100, 
          rotation: gsap.utils.random(0, 360), 
          scale: gsap.utils.random(0.4, 0.9) 
        });
        
        // Falling animation
        gsap.to(leaf, { 
          y: window.innerHeight + 150, 
          x: `+=${gsap.utils.random(-300, 300)}`, // Sway left/right
          rotation: `+=${gsap.utils.random(360, 720)}`, // Twirl
          duration: gsap.utils.random(12, 25), // Slow, drifting fall
          repeat: -1, 
          ease: "none", 
          delay: gsap.utils.random(0, 10) 
        });
      });

      // Data Stream (Wind) Lines Animation
      windLinesRef.current.forEach((line, index) => {
        gsap.fromTo(line, { x: -window.innerWidth * 0.5, opacity: 0 }, { x: window.innerWidth * 1.5, opacity: 0.3, duration: gsap.utils.random(4, 8), repeat: -1, ease: "sine.inOut", delay: index * 0.5 });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    // Background updated to Obsidian Tech Theme (#0B0F19)
    <div ref={sectionRef} className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#0B0F19]">
      
      {/* --- BACKGROUNDS & AMBIENT GLOWS --- */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19] via-[#0F172A] to-[#0B0F19] -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.03)_0%,transparent_70%)] pointer-events-none -z-10" />
      
      {/* Glowing Orbs matching your Home transitions */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[35vw] h-[35vw] bg-purple-900/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-[20%] left-[20%] w-[45vw] h-[45vw] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Transition Fade Overlay */}
      <div ref={fadeOverlayRef} className="absolute inset-0 bg-[#0B0F19] z-10 pointer-events-none" />

      {/* --- WIND / DATA STREAM LAYER --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div 
            key={`wind-${i}`} 
            ref={(el) => (windLinesRef.current[i] = el)} 
            className="absolute h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#00F3FF]/80 to-transparent blur-[1px]" 
            style={{ top: `${20 + i * 10}%`, width: '120vw' }} 
          />
        ))}
      </div>
      
      {/* --- HOLOGRAPHIC TECH LEAVES LAYER --- */}
      <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
        {[...Array(40)].map((_, i) => {
           // Assign tech-themed glowing colors to leaves (Cyan, Blue, Purple)
           const leafColors = ['#00F3FF', '#3B82F6', '#A855F7', '#8B5CF6', '#06B6D4', '#2DD4BF'];
           const leafColor = leafColors[i % leafColors.length];

           return (
            <div 
              key={`leaf-${i}`} 
              ref={(el) => (leavesRef.current[i] = el)} 
              className="absolute opacity-60" 
              style={{ filter: `drop-shadow(0 0 8px ${leafColor})`, width: '35px', height: '35px' }}
            >
              <svg viewBox="0 0 28 28" className="w-full h-full opacity-70">
                <path d="M14 2 L16 8 L20 6 L18 12 L24 14 L18 16 L20 22 L16 20 L14 26 L12 20 L8 22 L10 16 L4 14 L10 12 L8 6 L12 8 Z" fill={leafColor} />
              </svg>
            </div>
          );
        })}
      </div>

      {/* --- GALLERY SECTION --- */}
      <div className="relative z-40 w-full h-full flex flex-col items-center justify-center pointer-events-none">
        
        {/* Title */}
        <div className="absolute top-8 md:top-12 text-center z-50 pointer-events-auto">
            <h2 className="text-[#00F3FF] tracking-[0.4em] text-sm md:text-base font-black uppercase drop-shadow-[0_0_8px_rgba(0,243,255,0.5)] font-['Orbitron']">FEATURED PROJECTS</h2>
            <div className="w-12 h-[2px] bg-[#00F3FF] mx-auto mt-3 opacity-50"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full h-[70vh] flex items-center justify-center perspective-1000 mt-6 md:mt-0 pointer-events-auto">
          {PROJECT_DATA.map((item, index) => {
            const isActive = activeIndex === index;
            
            return (
            <div
              key={item.id}
              ref={(el) => (cardsRef.current[index] = el)}
              onClick={() => {
                setActiveIndex(index);
                manualInteraction(); 
              }}
              // Glassmorphism Card matched to Obsidian/Slate tech theme
              className="absolute w-[80vw] md:w-[22vw] rounded-xl md:rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden bg-[#0F172A]/80 backdrop-blur-md border border-[#00F3FF]/20 cursor-pointer will-change-transform group"
              style={{ 
                left: '50%',
                marginLeft: isMobile ? '-40vw' : '-11vw',
              }}
            >
              {/* Project Image */}
              <div className="relative w-full h-full">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" loading="eager" />
                
                {/* Dark tech overlay on the image */}
                <div className="absolute inset-0 bg-[#0B0F19]/40 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500"></div>
              </div>
              
              {/* Slate Blended Project Details Overlay */}
              <div className={`absolute bottom-0 left-0 right-0 p-5 md:p-6 bg-gradient-to-t from-[#0B0F19] via-[#0F172A]/95 to-transparent transition-all duration-500 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                
                <h3 className="text-white font-bold text-lg md:text-xl font-['Orbitron'] mb-2 leading-tight drop-shadow-md group-hover:text-[#00F3FF] transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-slate-300 text-xs md:text-sm font-medium mb-4 leading-relaxed">
                  {item.desc}
                </p>

                {/* Glassy Tech Stack Pills (Cyan tinted) */}
                <div className="flex flex-wrap gap-2">
                  {item.tech.map((techItem, idx) => (
                    <span key={idx} className="bg-[#00F3FF]/10 backdrop-blur-sm border border-[#00F3FF]/30 text-cyan-100 text-[10px] md:text-xs px-2 py-1 rounded">
                      {techItem}
                    </span>
                  ))}
                </div>

              </div>
            </div>
            );
          })}
        </div>

        {/* CONTROLS */}
        <div className="absolute bottom-6 md:bottom-10 flex gap-8 md:gap-12 z-[100] pointer-events-auto">
          <button 
            onClick={() => manualInteraction('prev')}
            className="group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#00F3FF]/30 bg-[#0F172A]/50 backdrop-blur-md hover:bg-[#00F3FF]/20 hover:border-[#00F3FF]/60 active:scale-95 transition-all duration-200 shadow-[0_0_15px_rgba(0,243,255,0.1)] touch-manipulation"
            aria-label="Previous Slide"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-[#00F3FF] group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>

          <button 
            onClick={() => manualInteraction('next')}
            className="group flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#00F3FF]/30 bg-[#0F172A]/50 backdrop-blur-md hover:bg-[#00F3FF]/20 hover:border-[#00F3FF]/60 active:scale-95 transition-all duration-200 shadow-[0_0_15px_rgba(0,243,255,0.1)] touch-manipulation"
            aria-label="Next Slide"
          >
            <svg className="w-5 h-5 md:w-6 md:h-6 text-[#00F3FF] group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default AutumnSection;