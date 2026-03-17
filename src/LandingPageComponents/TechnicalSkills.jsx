import React, { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SummerSection = () => {
  const sectionRef = useRef(null);
  const sunRef = useRef(null);
  const raysRef = useRef(null);
  const bigDivRef = useRef(null);
  
  // State to track which skill category is currently active
  const [activeIndex, setActiveIndex] = useState(0);

  // Technical Skills Data populated from your Resume
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
      // 1. Sun & Rays Animation
      gsap.to(sunRef.current, { scale: 1.1, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(raysRef.current, { rotation: 360, duration: 60, repeat: -1, ease: "none" });

      // 2. Menu Entrance
      gsap.from(".side-item-wrapper", { 
        x: -50, 
        opacity: 0, 
        stagger: 0.1, 
        duration: 0.8, 
        ease: "power2.out",
        scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center", 
        }
      });

      // 3. WIND LINES ANIMATION
      const windLines = gsap.utils.toArray(".wind-line");
      windLines.forEach((line) => {
        gsap.to(line, {
            x: "130vw", 
            duration: gsap.utils.random(4, 8), 
            repeat: -1,
            ease: "none", 
            delay: gsap.utils.random(0, 5)
        });
        gsap.to(line, {
            y: gsap.utils.random(-30, 30), 
            duration: gsap.utils.random(1.5, 3), 
            repeat: -1,
            yoyo: true, 
            ease: "sine.inOut"
        });
        gsap.to(line, {
            opacity: 0,
            duration: gsap.utils.random(2, 4),
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
      });

      // 4. LEAVES ANIMATION
      const leaves = gsap.utils.toArray(".floating-leaf");
      leaves.forEach((leaf) => {
        gsap.set(leaf, { rotation: gsap.utils.random(0, 360) });
        gsap.to(leaf, {
            x: "130vw", 
            duration: gsap.utils.random(10, 20), 
            repeat: -1,
            ease: "none",
            delay: gsap.utils.random(0, 10)
        });
        gsap.to(leaf, {
            rotation: "+=360",
            duration: gsap.utils.random(5, 10),
            repeat: -1,
            ease: "none"
        });
        gsap.to(leaf, {
            y: gsap.utils.random(-50, 50),
            duration: gsap.utils.random(2, 4),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // --- FIXED CLICK HANDLER ---
  const handleItemClick = (index) => {
    if (index === activeIndex) return;

    const direction = index > activeIndex ? 1 : -1;

    // 1. Animate Out
    gsap.to(bigDivRef.current, { 
      x: direction * -30, 
      opacity: 0, 
      duration: 0.2, 
      ease: "power2.in",
      onComplete: () => {
        // 2. Update React State
        setActiveIndex(index);
        
        // 3. Wait for React to render the new data, then Animate In
        setTimeout(() => {
          gsap.fromTo(bigDivRef.current, 
            { x: direction * 30, opacity: 0 }, 
            { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
          );
        }, 50);
      }
    });
  };

  return (
    <div ref={sectionRef} className="relative w-full min-h-[100dvh] overflow-hidden flex items-center justify-center px-4 md:px-10 py-20 md:py-0">
      
      {/* 1. BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff9e6] via-[#ffe0b2] to-[#ffcc80] -z-20"></div>
      
      {/* 2. ATMOSPHERE LAYER (WIND + LEAVES) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
            <div 
                key={`wind-${i}`} 
                className="wind-line absolute rounded-full shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                style={{
                    height: '3px',
                    background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.9), transparent)",
                    top: `${Math.random() * 100}%`, 
                    left: '-20%', 
                    width: `${Math.random() * 250 + 150}px`, 
                    opacity: Math.random() * 0.7 + 0.3 
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
                    width: `${Math.random() * 20 + 20}px`, 
                    height: `${Math.random() * 20 + 20}px`,
                    opacity: Math.random() * 0.6 + 0.4,
                    filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.1))"
                }}
            >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-orange-400/60">
                    <path d="M12,2C12,2 12,22 12,22C12,22 2,16 2,10C2,4 12,2 12,2ZM12,2C12,2 12,22 12,22C12,22 22,16 22,10C22,4 12,2 12,2Z" />
                </svg>
            </div>
        ))}
      </div>

      {/* 3. SUN */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 z-0 opacity-40 pointer-events-none">
        <div ref={sunRef} className="w-[300px] h-[300px] rounded-full" style={{ background: 'radial-gradient(circle, #fff9e6 0%, #ffe082 100%)', filter: 'blur(40px)' }}></div>
        <div ref={raysRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="absolute top-1/2 left-1/2 w-[400px] h-[2px] origin-left" style={{ background: 'linear-gradient(90deg, rgba(255,167,38,0.3), transparent)', transform: `rotate(${i * 30}deg)` }}></div>
          ))}
        </div>
      </div>

      {/* 4. MAIN CONTENT CONTAINER */}
      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-6xl h-full md:h-[85vh] gap-6 md:gap-12 justify-center items-center">
        
        {/* --- LEFT SIDE: MENU LIST --- */}
        <div className="order-2 md:order-1 flex flex-col justify-center gap-3 md:gap-4 w-full md:w-[35%] z-50 md:pl-10">
          
          <div className="mb-2 md:mb-4 hidden md:block select-none pointer-events-none">
             <h2 className="text-orange-600 tracking-[0.3em] text-sm md:text-lg font-bold font-['Orbitron']">
                TECHNICAL SKILLS
             </h2>
             <div className="w-12 h-[2px] bg-orange-500 mt-2 opacity-50"></div>
          </div>

          {data.map((item, i) => {
            const isActive = activeIndex === i;

            return (
              <div key={item.id} className="side-item-wrapper relative z-50"> 
                {/* Changed to native <button> tag for guaranteed clickability */}
                <button
                    type="button"
                    onClick={() => handleItemClick(i)}
                    className={`group w-full text-left relative cursor-pointer p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all duration-300 ease-out flex items-center gap-4 md:gap-5 backdrop-blur-md focus:outline-none pointer-events-auto
                    ${isActive 
                        ? "bg-white/90 border-orange-500 md:scale-105 shadow-2xl z-50 md:translate-x-4 translate-x-2 ring-2 ring-orange-400/30" 
                        : "bg-white/20 border-white/30 hover:bg-white/40 hover:scale-105 hover:shadow-lg hover:border-orange-200 hover:translate-x-2"
                    }`}
                >
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black text-lg md:text-xl flex-shrink-0 transition-all duration-300
                    ${isActive 
                        ? "bg-orange-500 text-white shadow-md scale-110" 
                        : "bg-white/40 text-orange-900/40 group-hover:bg-orange-400 group-hover:text-white group-hover:scale-110"
                    }`}>
                    {item.id}
                    </div>
                    
                    <div className="flex flex-col overflow-hidden">
                        <h4 className={`font-bold text-xs md:text-sm uppercase tracking-wider transition-colors duration-300
                            ${isActive ? "text-orange-800" : "text-orange-900/50 group-hover:text-orange-800"}`}>
                            {item.title}
                        </h4>
                        <span className={`text-[9px] md:text-[10px] font-semibold uppercase tracking-tight transition-colors duration-300
                            ${isActive ? "text-orange-600" : "text-orange-900/30 group-hover:text-orange-600"}`}>
                            {item.desc}
                        </span>
                    </div>

                    {isActive && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:block">
                            <span className="relative flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                            </span>
                        </div>
                    )}
                </button>
              </div>
            );
          })}
        </div>

        {/* --- RIGHT SIDE: DISPLAY --- */}
        <div className="order-1 md:order-2 w-full md:w-[65%] flex items-center justify-center z-10 md:pr-10 mt-8 md:mt-0">
          <div
            ref={bigDivRef}
            className="relative w-full h-[45vh] md:h-[70vh] bg-white/40 backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] border border-white/40 shadow-xl p-6 md:p-12 flex flex-col justify-center overflow-hidden"
          >
            {/* Background Bloom */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-400/20 rounded-full blur-[100px] pointer-events-none"></div>

            {/* --- IMAGE CONTAINER --- */}
            <div className="absolute top-4 right-4 md:top-10 md:right-10 w-28 h-28 md:w-40 md:h-40 rounded-full border-2 border-orange-500/20 shadow-lg overflow-hidden z-20 pointer-events-none hidden sm:block">
                <img 
                    src={data[activeIndex].img} 
                    alt={data[activeIndex].title} 
                    className="w-full h-full object-cover opacity-80 mix-blend-overlay transition-opacity duration-500"
                />
            </div>

            <div className="relative z-10 mt-2 md:mt-0 flex flex-col h-full pointer-events-auto">
              
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-6 opacity-80 select-none pointer-events-none">
                <span className="w-6 md:w-8 h-[2px] md:h-[3px] bg-orange-500"></span>
                <span className="text-orange-800 font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] md:text-xs">
                  CATEGORY // {data[activeIndex].id}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-600 to-orange-900 mb-3 md:mb-6 uppercase leading-tight drop-shadow-sm select-text selection:bg-orange-200 selection:text-orange-900">
                {data[activeIndex].title}
              </h2>
              
              <p className="text-sm sm:text-base md:text-xl text-gray-800 leading-relaxed font-medium border-l-4 border-orange-400/50 pl-4 md:pl-6 py-1 md:py-2 italic select-text selection:bg-orange-200 selection:text-orange-900 md:pr-40">
                {data[activeIndex].bio}
              </p>

              {/* SKILLS BADGE GRID */}
              <div className="mt-auto pt-6 flex flex-wrap gap-2 md:gap-3">
                {data[activeIndex].skills.map((skill, idx) => (
                  <div 
                    key={idx} 
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-orange-100/50 border border-orange-300 rounded-lg shadow-sm flex items-center gap-2"
                  >
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    <span className="text-orange-900 font-bold text-[10px] md:text-sm tracking-wide select-none">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>

            </div>

            <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 opacity-30 pointer-events-none select-none hidden sm:block">
                <div className="text-[8px] md:text-[10px] font-mono text-orange-900 tracking-widest">DATA_SYNC_COMPLETE</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SummerSection;