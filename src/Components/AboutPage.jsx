import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- COMPONENT: TECH RING WITH SPIRIT ORBS ---
const TechRing = ({ className, color = "#00F3FF", id }) => (
  <svg 
    viewBox="0 0 400 400" 
    className={`${className} opacity-100 mix-blend-screen pointer-events-none`} 
    style={{ overflow: 'visible' }}
  >
    <defs>
      <radialGradient id={`spiritGradient-${id}`} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="white" stopOpacity="1" />
        <stop offset="40%" stopColor={color} stopOpacity="1" />
        <stop offset="100%" stopColor={color} stopOpacity="0" />
      </radialGradient>
      <filter id={`spiritGlow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    <circle cx="200" cy="200" r="190" fill="none" stroke={color} strokeWidth="1" strokeDasharray="10 20" opacity="0.6" />
    <path d="M 200 200 m -140, 0 a 140,140 0 1,0 280,0 a 140,140 0 1,0 -280,0" fill="none" stroke={color} strokeWidth="2" strokeDasharray="50 30 10 30" className="origin-center" opacity="0.9" />
    <path d="M 200 100 L 286 150 L 286 250 L 200 300 L 114 250 L 114 150 Z" fill="none" stroke={color} strokeWidth="3" opacity="0.5" />
    
    <g filter={`url(#spiritGlow-${id})`}>
      <circle cx="200" cy="10" r="12" fill={`url(#spiritGradient-${id})`} />
      <circle cx="200" cy="390" r="12" fill={`url(#spiritGradient-${id})`} />
      <circle cx="10" cy="200" r="12" fill={`url(#spiritGradient-${id})`} />
      <circle cx="390" cy="200" r="12" fill={`url(#spiritGradient-${id})`} />
    </g>
  </svg>
);

const AboutPage = () => {
  const sectionRef = useRef(null);
  const fadeOverlayRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardRef = useRef(null);
  const decorLineLeftRef = useRef(null);
  const decorLineRightRef = useRef(null);
  const petalsRef = useRef([]);
  
  const leftRingRef = useRef(null);
  const rightRingRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. DIGITAL "DATA" PETALS ANIMATION
      petalsRef.current.forEach((petal) => {
        gsap.set(petal, {
          x: gsap.utils.random(0, window.innerWidth),
          y: -50,
          rotation: gsap.utils.random(0, 360),
          opacity: gsap.utils.random(0.3, 0.7),
          scale: gsap.utils.random(0.3, 0.8) 
        });

        gsap.to(petal, {
          y: window.innerHeight + 100,
          x: "+=80",
          rotation: 360,
          duration: gsap.utils.random(8, 15),
          repeat: -1,
          ease: "none",
          delay: gsap.utils.random(0, 10)
        });
      });

      // 2. TECH RING ROTATION
      if(leftRingRef.current && rightRingRef.current) {
        gsap.to(leftRingRef.current, { rotation: -360, duration: 40, repeat: -1, ease: "none" });
        gsap.to(rightRingRef.current, { rotation: 360, duration: 50, repeat: -1, ease: "none" });
      }

      // 3. ENTRANCE & FADE
      gsap.fromTo(fadeOverlayRef.current, { opacity: 1 }, {
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 20%",
            scrub: 1,
          },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo([decorLineLeftRef.current, decorLineRightRef.current], { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.8, ease: "power3.out" });
      tl.fromTo(titleRef.current, { y: 20, opacity: 0, filter: "blur(8px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "power2.out" }, "-=0.6");
      tl.fromTo(subtitleRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.5");
      tl.fromTo(cardRef.current, { y: 30, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.2)" }, "-=0.6");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // Background changed to match Obsidian
    <div ref={sectionRef} className="relative w-full h-[100dvh] overflow-hidden bg-[#0B0F19] flex items-center justify-center p-8 sm:p-12 md:p-24 lg:p-32 xl:p-40">
      
      {/* 1. ATMOSPHERIC CIRCLE GRADIENTS (Tech Colors) */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        {/* Blue/Purple and Cyan glows */}
        <div className="absolute top-[10%] left-[10%] w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full bg-[#3B82F6] blur-[100px] mix-blend-screen opacity-50"></div>
        <div className="absolute bottom-[15%] right-[5%] w-[150px] h-[150px] md:w-[250px] md:h-[250px] rounded-full bg-[#00F3FF] blur-[80px] opacity-40 mix-blend-screen"></div>
      </div>

      {/* 2. DIGITAL "DATA" PETALS (Cyan) */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (petalsRef.current[i] = el)}
            className="absolute top-0 left-0 w-1.5 h-1.5 md:w-2 md:h-2 bg-[#00F3FF] opacity-0"
            style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
          />
        ))}
      </div>

      {/* --- RINGS (Tech Colors) --- */}
      <div className="absolute left-[-5%] md:left-[5%] top-1/2 -translate-y-1/2 h-[40vh] w-[40vh] z-10 hidden lg:block opacity-40">
         <div ref={leftRingRef} className="w-full h-full">
            <TechRing className="w-full h-full" color="#A855F7" id="left" /> {/* Purple Ring */}
         </div>
      </div>

      <div className="absolute right-[-5%] md:right-[5%] top-1/2 -translate-y-1/2 h-[40vh] w-[40vh] z-10 hidden lg:block opacity-40">
         <div ref={rightRingRef} className="w-full h-full">
            <TechRing className="w-full h-full" color="#00F3FF" id="right" /> {/* Cyan Ring */}
         </div>
      </div>

      {/* --- CONTENT WRAPPER --- */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-2xl h-full max-h-[70vh] text-center gap-6 md:gap-8">
        
        <div className="shrink-0 flex flex-col items-center w-full">
          {/* Title Color adjustments */}
          <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-['Orbitron'] font-bold mb-2 md:mb-4 opacity-0 tracking-tight leading-tight text-slate-100" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
            ABOUT <span className="text-[#00F3FF] font-['Orbitron'] font-bold block sm:inline">SAHIL</span>
          </h1>

          {/* Decors changed to Cyan */}
          <div className="flex items-center gap-2 md:gap-4 mb-3 md:mb-5">
            <div ref={decorLineLeftRef} className="w-8 sm:w-12 md:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#00F3FF] origin-left opacity-0"></div>
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 rotate-45 border border-[#00F3FF] bg-[#0B0F19]"></div>
            <div ref={decorLineRightRef} className="w-8 sm:w-12 md:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#00F3FF] origin-right opacity-0"></div>
          </div>

          {/* Subtitle adjusted for tech palette */}
          <p ref={subtitleRef} className="text-[10px] sm:text-xs md:text-sm lg:text-base text-slate-400 max-w-lg font-['Orbitron'] tracking-wide opacity-0 px-2">
            Computer Science Undergraduate at <span className="text-[#00F3FF]">IIIT Manipur</span>
          </p>
        </div>

        {/* --- MAIN CARD --- */}
        {/* Changed background to a dark slate with Cyan borders */}
        <div ref={cardRef} className="relative w-full max-w-xl bg-[#0F172A]/80 backdrop-blur-xl rounded-xl border border-[#00F3FF]/20 opacity-0 group transition-all duration-500 
                                     p-6 sm:p-8 flex flex-col justify-center shadow-lg">
          
          <div className="absolute inset-0 rounded-xl transition-all duration-500 opacity-0 group-hover:opacity-100 pointer-events-none" style={{ boxShadow: "0 0 20px rgba(0, 243, 255, 0.1)", border: "1px solid rgba(0, 243, 255, 0.3)" }}></div>
          
          {/* Corner Brackets (Purple) */}
          <div className="absolute top-0 left-0 w-4 h-4 md:w-6 md:h-6 border-l-[1.5px] border-t-[1.5px] border-[#A855F7]/50 rounded-tl-lg"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 md:w-6 md:h-6 border-r-[1.5px] border-b-[1.5px] border-[#A855F7]/50 rounded-br-lg"></div>

          {/* Paragraph Text adjustments */}
          <p className="text-xs sm:text-sm md:text-[15px] text-slate-300 leading-relaxed md:leading-loose font-['Orbitron'] text-left md:text-center px-1 md:px-4">
            I am a motivated Computer Science undergraduate maintaining an 8.63 CPI, with strong foundations in Data Structures, Algorithms, and modern web development. I specialize in building responsive web applications using <span className="text-[#00F3FF]">React.js</span>, <span className="text-[#A855F7]">TailwindCSS</span>, and JavaScript. Passionate about scalable software and continuous learning, I have honed my problem-solving skills by successfully tackling over 100 algorithmic problems on LeetCode.
          </p>
        </div>
      </div>

      {/* Fade overlay matches the new background color */}
      <div ref={fadeOverlayRef} className="absolute inset-0 bg-[#0B0F19] z-50 pointer-events-none"></div>
    </div>
  );
};

export default AboutPage;