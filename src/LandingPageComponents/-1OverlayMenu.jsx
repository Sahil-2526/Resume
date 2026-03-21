import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";

const HobbiesOverlay = ({ isOpen }) => {
  const containerRef = useRef(null);
  const linksRef = useRef([]);
  const petalsRef = useRef([]);
  const detailBoxRef = useRef(null);
  
  const tlRef = useRef(null); 
  const [activeHobby, setActiveHobby] = useState(0);

  const hobbies = [
    { 
      id: "01", 
      label: "Problem Solving", 
      desc: "ALGORITHMIC LOGIC", 
      details: "Tackled over 100+ problems on LeetCode. I enjoy breaking down complex logic and optimizing solutions using Data Structures and Algorithms.",
      accent: "#E6A4B4" 
    },
    { 
      id: "02", 
      label: "Basketball", 
      desc: "TEAM SYNERGY", 
      details: "An active player and fan. Basketball keeps me physically fit and teaches me the value of split-second decision-making and team coordination.",
      accent: "#D88A98" 
    },
    { 
      id: "03", 
      label: "Drawing", 
      desc: "VISUAL CONCEPTS", 
      details: "Focused on concept sketching and UI/UX drafting. Translating abstract ideas into visual forms helps me build more intuitive digital interfaces.",
      accent: "#E6A4B4"
    },
    { 
      id: "04", 
      label: "Reading", 
      desc: "KNOWLEDGE ACQUISITION", 
      details: "Deep-diving into tech blogs, documentation, and non-fiction. Constant reading fuels my curiosity for emerging technologies.",
      accent: "#D88A98"
    },
    { 
      id: "05", 
      label: "Traveling", 
      desc: "GLOBAL PERSPECTIVE", 
      details: "Exploring different cultures and environments. Traveling inspires my creative aesthetics and influences the themes of my projects.",
      accent: "#E6A4B4"
    }
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      gsap.set(linksRef.current, { x: 50, opacity: 0 });
      gsap.set(containerRef.current, { x: "100%" });

      tl.to(containerRef.current, { x: "0%", duration: 0.8, ease: "power4.out" }, 0)
        .to(linksRef.current, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "-=0.3");

      tlRef.current = tl;
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (tlRef.current) {
      if (isOpen) {
        tlRef.current.play();
        petalsRef.current.forEach((petal) => {
          if(!petal) return;
          gsap.set(petal, { x: gsap.utils.random(0, window.innerWidth), y: -50, opacity: gsap.utils.random(0.4, 0.7), scale: gsap.utils.random(0.5, 1.2) });
          gsap.to(petal, { 
            y: window.innerHeight + 100, 
            x: "+=150", 
            rotation: "+=360", 
            duration: gsap.utils.random(6, 12), 
            ease: "none", 
            repeat: -1, 
            delay: gsap.utils.random(0, 5) 
          });
        });
      } else {
        tlRef.current.reverse();
      }
    }
  }, [isOpen]);

  const handleHobbyClick = (index) => {
    if (index === activeHobby) return;
    gsap.to(detailBoxRef.current, {
      opacity: 0, x: 15, duration: 0.2, ease: "power2.in",
      onComplete: () => {
        setActiveHobby(index);
        gsap.fromTo(detailBoxRef.current, { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" });
      }
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed top-0 right-0 h-full w-full z-[40] bg-[#2D2426] flex flex-col md:flex-row items-center justify-between overflow-hidden [clip-path:polygon(0_0,100%_0,100%_100%,0%_100%)] md:[clip-path:polygon(10%_0,100%_0,100%_100%,0%_100%)]"
    >
      {/* Background Soft Gradients - Mid Dark Tones */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#5C4B4E] blur-[120px] rounded-full opacity-60"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#423638] blur-[100px] rounded-full opacity-70"></div>
      </div>


      {/* --- LEFT SIDE: HOBBY LIST --- */}
      <div className="flex flex-col gap-3 md:gap-4 items-start z-50 px-10 md:pl-[15%] pt-28 md:pt-0 w-full md:w-auto">
        <h2 className="text-[#E6A4B4] font-['Orbitron'] tracking-[0.5em] text-[8px] md:text-[10px] mb-2 opacity-50 uppercase font-bold">Interests // Database</h2>
        {hobbies.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (linksRef.current[index] = el)}
            onClick={() => handleHobbyClick(index)}
            className="group relative flex items-center gap-3 cursor-pointer"
          >
            <span className={`font-mono text-[8px] md:text-[10px] border px-1.5 py-0.5 transition-colors ${activeHobby === index ? "bg-[#E6A4B4] text-[#2D2426]" : "text-[#E6A4B4] border-[#E6A4B4]/40"}`}>
              {item.id}
            </span>
            <span className={`text-2xl md:text-4xl font-['Orbitron'] font-black uppercase transition-all duration-300 ${activeHobby === index ? "text-white" : "text-transparent"} hover:translate-x-2`}
                  style={{ WebkitTextStroke: activeHobby === index ? "0px" : "1px rgba(230,164,180,0.4)" }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* --- RIGHT SIDE: DETAILS PANEL --- */}
      <div className="w-full md:w-[42%] h-full flex items-center justify-center p-8 md:pr-[12%] z-50">
        <div ref={detailBoxRef} className="bg-[#3D3133]/60 backdrop-blur-2xl border border-white/10 p-5 md:p-8 rounded-xl relative overflow-hidden w-full max-w-sm shadow-2xl">
          {/* Accent Bar */}
          <div className="absolute top-0 left-0 w-full h-0.5 transition-colors duration-500 shadow-[0_0_10px_rgba(230,164,180,0.4)]" style={{ backgroundColor: hobbies[activeHobby].accent }}></div>
          
          <div className="flex items-center gap-2 mb-3 opacity-40">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: hobbies[activeHobby].accent }}></div>
              <span className="text-[#E6A4B4] font-mono text-[7px] tracking-widest uppercase font-bold">Sector_Entry_{hobbies[activeHobby].id}</span>
          </div>

          <h3 className="text-xl md:text-2xl font-['Orbitron'] font-bold text-white mb-1 tracking-tight">{hobbies[activeHobby].label}</h3>
          <p className="text-[7px] md:text-[9px] tracking-[0.3em] font-mono mb-4 font-bold" style={{ color: hobbies[activeHobby].accent }}>{hobbies[activeHobby].desc}</p>
          
          <p className="text-[#D1C2C5] leading-relaxed font-sans text-[11px] md:text-[13px] border-l border-white/10 pl-3">
            {hobbies[activeHobby].details}
          </p>

          <div className="mt-8 flex justify-between items-center opacity-30">
              <div className="font-mono text-[6px] tracking-widest text-[#E6A4B4]">STATUS: SYNCED</div>
              <div className="font-mono text-[6px] tracking-widest text-[#E6A4B4]">MEM_{new Date().getFullYear()}</div>
          </div>
        </div>
      </div>

      {/* Falling Sakura Petals */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div 
          key={i} 
          ref={(el) => (petalsRef.current[i] = el)} 
          className="absolute w-1.5 h-3 bg-[#E6A4B4] opacity-0 pointer-events-none rounded-full"
          style={{ borderRadius: "50% 0% 50% 50%", boxShadow: "0 0 5px rgba(230,164,180,0.2)" }}
        ></div>
      ))}
    </div>
  );
};

export default HobbiesOverlay;