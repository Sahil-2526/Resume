import React, { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TechnicalSkills = () => {
  const sectionRef = useRef(null);
  const sunRef = useRef(null);
  const raysRef = useRef(null);
  const bigDivRef = useRef(null);
  
  const [activeIndex, setActiveIndex] = useState(0);

  const data = [
    { 
      id: "01", 
      title: "LANGUAGES", 
      desc: "Core Logic & Scripts", 
      bio: "Proficient in foundational and scripting languages. Leveraging these for competitive programming and complex problem-solving (100+ LeetCode problems).",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=500&auto=format&fit=crop", 
      skills: ["C", "C++", "Python", "JavaScript"]
    },
    { 
      id: "02", 
      title: "FRONTEND", 
      desc: "UI Frameworks", 
      bio: "Specializing in building responsive, modern web applications. Utilizing component-driven architecture for scalability and utility-first frameworks for rapid, pixel-perfect styling.",
      img: "https://images.unsplash.com/photo-1618477388954-7852f32655cb?q=80&w=500&auto=format&fit=crop", 
      skills: ["React.js", "TailwindCSS", "HTML5", "CSS3"]
    },
    { 
      id: "03", 
      title: "ANIMATION", 
      desc: "Motion & Interactivity", 
      bio: "Crafting smooth, high-performance web animations and interactive user experiences. Capable of manipulating the DOM to create seamless transitions and scroll-driven effects.",
      img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=500&auto=format&fit=crop", 
      skills: ["GSAP", "ScrollTrigger", "CSS Transitions"]
    },
    { 
      id: "04", 
      title: "CS CORE", 
      desc: "Fundamentals", 
      bio: "Strong academic foundation in Computer Science, maintaining an 8.63 CPI. Focused on writing optimized, scalable, and secure software architectures.",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=500&auto=format&fit=crop", 
      skills: ["Data Structures", "Algorithms", "OOP", "DBMS"]
    },
    { 
      id: "05", 
      title: "TOOLS", 
      desc: "Dev Environment", 
      bio: "Efficient workflow management utilizing modern version control systems and development environments to maintain, debug, and collaborate on codebases.",
      img: "https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?q=80&w=500&auto=format&fit=crop", 
      skills: ["Git", "GitHub", "VS Code", "Responsive Design"]
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(sunRef.current, { scale: 1.1, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(raysRef.current, { rotation: 360, duration: 60, repeat: -1, ease: "none" });

      gsap.from(".side-item-wrapper", { 
        x: -30, 
        opacity: 0, 
        stagger: 0.1, 
        duration: 0.8, 
        ease: "power2.out",
        scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center", 
        }
      });

      const windLines = gsap.utils.toArray(".wind-line");
      windLines.forEach((line) => {
        gsap.to(line, { x: "130vw", duration: gsap.utils.random(4, 8), repeat: -1, ease: "none", delay: gsap.utils.random(0, 5) });
        gsap.to(line, { y: gsap.utils.random(-30, 30), duration: gsap.utils.random(1.5, 3), repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(line, { opacity: 0, duration: gsap.utils.random(2, 4), repeat: -1, yoyo: true, ease: "power1.inOut" });
      });

      const leaves = gsap.utils.toArray(".floating-leaf");
      leaves.forEach((leaf) => {
        gsap.set(leaf, { rotation: gsap.utils.random(0, 360) });
        gsap.to(leaf, { x: "130vw", duration: gsap.utils.random(10, 20), repeat: -1, ease: "none", delay: gsap.utils.random(0, 10) });
        gsap.to(leaf, { rotation: "+=360", duration: gsap.utils.random(5, 10), repeat: -1, ease: "none" });
        gsap.to(leaf, { y: gsap.utils.random(-50, 50), duration: gsap.utils.random(2, 4), repeat: -1, yoyo: true, ease: "sine.inOut" });
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleItemClick = (index) => {
    if (index === activeIndex) return;
    const direction = index > activeIndex ? 1 : -1;

    gsap.to(bigDivRef.current, { 
      x: direction * -20, 
      opacity: 0, 
      duration: 0.2, 
      ease: "power2.in",
      onComplete: () => {
        setActiveIndex(index);
        setTimeout(() => {
          gsap.fromTo(bigDivRef.current, 
            { x: direction * 20, opacity: 0 }, 
            { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
          );
        }, 50);
      }
    });
  };

  return (
    <div ref={sectionRef} className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-center px-4 md:px-8 py-16 md:py-0 bg-[#0B0F19]">
      
      {/* 1. BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F19] via-[#0F172A] to-[#0B0F19] -z-20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.03)_0%,transparent_70%)] pointer-events-none -z-10" />
      
      {/* 2. ATMOSPHERE LAYER (DATA STREAMS + HOLOGRAM LEAVES) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
            <div 
                key={`wind-${i}`} 
                className="wind-line absolute rounded-full shadow-[0_0_8px_rgba(0,243,255,0.6)]"
                style={{
                    height: '2px',
                    background: "linear-gradient(90deg, transparent, rgba(0, 243, 255, 0.8), transparent)",
                    top: `${Math.random() * 100}%`, 
                    left: '-20%', 
                    width: `${Math.random() * 200 + 100}px`, 
                    opacity: Math.random() * 0.5 + 0.1 
                }}
            />
        ))}
        {[...Array(12)].map((_, i) => (
            <div
                key={`leaf-${i}`}
                className="floating-leaf absolute"
                style={{
                    top: `${Math.random() * 90 + 5}%`, 
                    left: '-10%',
                    width: `${Math.random() * 16 + 16}px`, 
                    height: `${Math.random() * 16 + 16}px`,
                    opacity: Math.random() * 0.6 + 0.2,
                    filter: "drop-shadow(0 0 5px rgba(0,243,255,0.4))" 
                }}
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-[#00F3FF]/40">
                    <path d="M12,2C12,2 12,22 12,22C12,22 2,16 2,10C2,4 12,2 12,2ZM12,2C12,2 12,22 12,22C12,22 22,16 22,10C22,4 12,2 12,2Z" />
                </svg>
            </div>
        ))}
      </div>

      {/* 3. DIGITAL CORE */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 z-0 opacity-30 pointer-events-none">
        <div ref={sunRef} className="w-[200px] h-[200px] rounded-full" style={{ background: 'radial-gradient(circle, #00F3FF 0%, transparent 70%)', filter: 'blur(40px)' }}></div>
        <div ref={raysRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px]">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="absolute top-1/2 left-1/2 w-[250px] h-[1px] origin-left" style={{ background: 'linear-gradient(90deg, rgba(0,243,255,0.4), transparent)', transform: `rotate(${i * 30}deg)` }}></div>
          ))}
        </div>
      </div>

      {/* 4. MAIN CONTENT CONTAINER */}
      {/* INCREASED GAP HERE: gap-8 md:gap-16 lg:gap-24 and expanded max-w-6xl */}
      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-6xl h-full md:h-[75vh] gap-8 md:gap-16 lg:gap-24 justify-center items-center">
        
        {/* --- LEFT SIDE: MENU LIST --- */}
        {/* Width slightly reduced to w-[30%] to leave room for the gap */}
        <div className="order-2 md:order-1 flex flex-col justify-center gap-2 md:gap-3 w-full md:w-[35%] lg:w-[30%] z-50 md:pl-6">
          
          <div className="mb-2 hidden md:block select-none pointer-events-none">
             <h2 className="text-[#00F3FF] tracking-[0.2em] text-xs md:text-sm font-bold font-['Orbitron'] drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]">
                TECHNICAL SKILLS
             </h2>
             <div className="w-8 h-[2px] bg-[#00F3FF] mt-1.5 opacity-50"></div>
          </div>

          {data.map((item, i) => {
            const isActive = activeIndex === i;

            return (
              <div key={item.id} className="side-item-wrapper relative z-50"> 
                <button
                    type="button"
                    onClick={() => handleItemClick(i)}
                    className={`group w-full text-left relative cursor-pointer p-2 md:p-3 rounded-lg md:rounded-xl border transition-all duration-300 ease-out flex items-center gap-3 md:gap-4 backdrop-blur-md focus:outline-none pointer-events-auto
                    ${isActive 
                        ? "bg-[#0F172A]/90 border-[#00F3FF]/50 md:scale-105 shadow-[0_5px_15px_rgba(0,0,0,0.5)] z-50 md:translate-x-3 translate-x-1.5 ring-1 ring-[#00F3FF]/30" 
                        : "bg-white/5 border-white/10 hover:bg-white/10 hover:scale-[1.02] hover:border-[#00F3FF]/30 hover:translate-x-1"
                    }`}
                >
                    <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-black text-sm md:text-base flex-shrink-0 transition-all duration-300
                    ${isActive 
                        ? "bg-[#00F3FF] text-[#0B0F19] shadow-[0_0_10px_#00F3FF] scale-110" 
                        : "bg-white/10 text-slate-500 group-hover:bg-[#00F3FF]/20 group-hover:text-[#00F3FF] group-hover:scale-110"
                    }`}>
                    {item.id}
                    </div>
                    
                    <div className="flex flex-col overflow-hidden">
                        <h4 className={`font-bold text-[10px] md:text-xs uppercase tracking-wider transition-colors duration-300
                            ${isActive ? "text-[#00F3FF]" : "text-slate-400 group-hover:text-[#00F3FF]"}`}>
                            {item.title}
                        </h4>
                        <span className={`text-[8px] md:text-[9px] font-semibold uppercase tracking-tight transition-colors duration-300
                            ${isActive ? "text-blue-300" : "text-slate-500 group-hover:text-blue-300"}`}>
                            {item.desc}
                        </span>
                    </div>

                    {isActive && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:block">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F3FF] opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F3FF]"></span>
                            </span>
                        </div>
                    )}
                </button>
              </div>
            );
          })}
        </div>

        {/* --- RIGHT SIDE: DISPLAY --- */}
        {/* Width slightly reduced to w-[55%] to leave room for the gap */}
        <div className="order-1 md:order-2 w-full md:w-[60%] lg:w-[55%] flex items-center justify-center z-10 md:pr-6 mt-6 md:mt-0">
          <div
            ref={bigDivRef}
            className="relative w-full h-[40vh] md:h-[60vh] bg-[#0F172A]/70 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2rem] border border-[#00F3FF]/20 shadow-[0_5px_25px_rgba(0,0,0,0.6)] p-5 md:p-8 flex flex-col justify-center overflow-hidden"
          >
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-[#A855F7]/20 rounded-full blur-[80px] pointer-events-none"></div>

            {/* --- IMAGE CONTAINER --- */}
            <div className="absolute top-4 right-4 md:top-8 md:right-8 w-16 h-16 md:w-24 md:h-24 rounded-full border border-[#00F3FF]/30 shadow-[0_0_15px_rgba(0,243,255,0.1)] overflow-hidden z-20 pointer-events-none hidden sm:block bg-slate-900">
                <img 
                    src={data[activeIndex].img} 
                    alt={data[activeIndex].title} 
                    className="w-full h-full object-cover opacity-60 mix-blend-overlay transition-opacity duration-500"
                />
            </div>

            <div className="relative z-10 mt-2 flex flex-col h-full pointer-events-auto">
              
              <div className="flex items-center gap-2 mb-2 md:mb-4 opacity-80 select-none pointer-events-none">
                <span className="w-4 md:w-6 h-[2px] bg-[#00F3FF]"></span>
                <span className="text-[#00F3FF] font-mono font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase text-[8px] md:text-[10px]">
                  CATEGORY // {data[activeIndex].id}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-[#00F3FF] to-[#3B82F6] mb-2 md:mb-4 uppercase leading-tight drop-shadow-sm select-text selection:bg-cyan-500/30 selection:text-cyan-100">
                {data[activeIndex].title}
              </h2>
              
              <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-medium border-l-2 border-[#00F3FF]/50 pl-3 md:pl-4 py-1 select-text selection:bg-cyan-500/30 selection:text-cyan-100 md:pr-24 lg:pr-32">
                {data[activeIndex].bio}
              </p>

              {/* SKILLS BADGE GRID */}
              <div className="mt-auto pt-4 flex flex-wrap gap-1.5 md:gap-2">
                {data[activeIndex].skills.map((skill, idx) => (
                  <div 
                    key={idx} 
                    className="px-2.5 py-1 md:px-3 md:py-1.5 bg-blue-900/30 border border-[#00F3FF]/30 rounded-md shadow-sm flex items-center gap-1.5 backdrop-blur-sm"
                  >
                    <div className="w-1 h-1 bg-[#00F3FF] rounded-full shadow-[0_0_3px_#00F3FF]"></div>
                    <span className="text-cyan-100 font-bold text-[9px] md:text-[11px] tracking-wide select-none font-mono">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>

            </div>

            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 opacity-30 pointer-events-none select-none hidden sm:block">
                <div className="text-[7px] md:text-[8px] font-mono text-[#00F3FF] tracking-widest">DATA_SYNC_COMPLETE</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TechnicalSkills;