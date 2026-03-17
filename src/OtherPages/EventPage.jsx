import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';

// ==========================================
// 1. ANIME-THEMED EVENT DATA (26 Events)
// ==========================================
const EVENT_DATA = [
  // --- CODING & TECH ---
  { id: 0, nodeId: "01", chapter: "EVENT 01", title: "COMPETITIVE PROGRAMMING", desc: "Test your algorithmic prowess in a high-stakes race against the clock.", bgImg: "https://images4.alphacoders.com/206/206489.jpg" }, // Serial Experiments Lain (Code/Wires)
  { id: 1, nodeId: "02", chapter: "EVENT 02", title: "TECH ART", desc: "Where creativity meets circuitry. Design visual masterpieces using code and hardware.", bgImg: "https://images3.alphacoders.com/813/813083.jpg" }, // Shelter (Virtual Art)
  { id: 2, nodeId: "03", chapter: "EVENT 03", title: "HACKATHON [OFFLINE]", desc: "24-48 hours of intense building, coffee, and innovation in a physical workspace.", bgImg: "https://images5.alphacoders.com/694/694247.png" }, // New Game! (Office Dev)
  { id: 3, nodeId: "04", chapter: "EVENT 04", title: "HACKATHON [ONLINE]", desc: "Global collaboration from your own desk. Build the future of software and web.", bgImg: "https://images2.alphacoders.com/712/712032.jpg" }, // Summer Wars (Cyber World)
  { id: 4, nodeId: "05", chapter: "EVENT 05", title: "CODE-HUNT", desc: "Solve riddles hidden within source code to find the ultimate treasure.", bgImg: "https://images.alphacoders.com/229/229683.jpg" }, // Steins;Gate (Computer Lab)
  { id: 5, nodeId: "06", chapter: "EVENT 06", title: "CTF (CAPTURE THE FLAG)", desc: "Navigate through vulnerabilities and secure the system in this cybersecurity challenge.", bgImg: "https://images.alphacoders.com/197/197828.jpg" }, // Ghost in the Shell (Hacking)
  
  // --- CREATIVE ---
  { id: 6, nodeId: "07", chapter: "EVENT 07", title: "TYPING TEST", desc: "Speed and accuracy are your only weapons. Reach the highest WPM to win.", bgImg: "https://images5.alphacoders.com/906/906316.jpg" }, // Violet Evergarden (Typewriter)
  { id: 7, nodeId: "08", chapter: "EVENT 08", title: "AUDIO EDITING", desc: "Master the waves. Create immersive soundscapes and crystal clear mixes.", bgImg: "https://images.alphacoders.com/832/83283.jpg" }, // K-On! (Music/Gear)
  { id: 8, nodeId: "09", chapter: "EVENT 09", title: "VIDEO EDITING", desc: "Stitch reality together. Tell a story through motion, cuts, and color grading.", bgImg: "https://images8.alphacoders.com/106/1066497.jpg" }, // Eizouken (Animation/Film)
  { id: 9, nodeId: "10", chapter: "EVENT 10", title: "UI/UX DESIGN", desc: "Craft seamless user journeys and beautiful interfaces that define the digital age.", bgImg: "https://images8.alphacoders.com/545/545909.jpg" }, // SAO (HUD Interface)
  { id: 10, nodeId: "11", chapter: "EVENT 11", title: "APP DEVELOPMENT", desc: "Build functional mobile solutions that solve real-world problems in real time.", bgImg: "https://images2.alphacoders.com/555/55556.jpg" }, // Eden of the East (Phone/UI)
  { id: 11, nodeId: "12", chapter: "EVENT 12", title: "3-D DESIGN", desc: "Model three-dimensional worlds and characters from a blank digital canvas.", bgImg: "https://images5.alphacoders.com/335/335899.jpg" }, // Evangelion (Geofront/Structures)
  
  // --- GAMING ---
  { id: 12, nodeId: "13", chapter: "EVENT 13", title: "VALORANT [ONLINE]", desc: "Tactical precision meets supernatural abilities. Secure the website with your team.", bgImg: "https://images6.alphacoders.com/124/1249764.jpg" }, // Lycoris Recoil (Guns/Action)
  { id: 13, nodeId: "14", chapter: "EVENT 14", title: "BGMI [ONLINE]", desc: "Drop into the battlegrounds and be the last squad standing in this tactical shooter.", bgImg: "https://images.alphacoders.com/516/516662.jpg" }, // SAO GGO (Sniper)
  { id: 14, nodeId: "15", chapter: "EVENT 15", title: "FREE FIRE [ONLINE]", desc: "Fast-paced survival. Outwit and outgun your opponents in the ultimate showdown.", bgImg: "https://images.alphacoders.com/228/228543.jpg" }, // Black Lagoon (Dual Wield)
  { id: 15, nodeId: "16", chapter: "EVENT 16", title: "CHESS [ON-SITE]", desc: "The ultimate game of strategy. Outmaneuver the grandmasters in physical combat.", bgImg: "https://images3.alphacoders.com/549/549929.jpg" }, // No Game No Life (Chess Piece)
  { id: 16, nodeId: "17", chapter: "EVENT 17", title: "GAME-Y [ON-SITE]", desc: "A mystery gaming challenge designed to test your reflexes across multiple genres.", bgImg: "https://images6.alphacoders.com/861/861596.jpg" }, // Kakegurui (Gambling/Intensity)
  { id: 17, nodeId: "18", chapter: "EVENT 18", title: "ARCADE", desc: "Relive the classics. High scores and flashing lights await the arcade king.", bgImg: "https://images.alphacoders.com/985/985149.png" }, // High Score Girl (Retro Cab)
  
  // --- ROBOTICS & HARDWARE ---
  { id: 18, nodeId: "19", chapter: "EVENT 19", title: "ROBOWAR", desc: "Sparks will fly. Metal-on-metal destruction in the ultimate bot arena.", bgImg: "https://images.alphacoders.com/604/604770.jpg" }, // Gurren Lagann (Mecha Drill)
  { id: 19, nodeId: "20", chapter: "EVENT 20", title: "LINE FOLLOWER", desc: "Precision engineering. Program your bot to navigate the path with zero error.", bgImg: "https://images5.alphacoders.com/434/434604.jpg" }, // Robotics;Notes (Small Robot)
  { id: 20, nodeId: "21", chapter: "EVENT 21", title: "ROBO RACE", desc: "Built for speed. Drag race your robotic creations to the finish line.", bgImg: "https://images8.alphacoders.com/476/476698.jpg" }, // Redline (Speed/Racing)
  { id: 21, nodeId: "22", chapter: "EVENT 22", title: "CIRCUIT DESIGN", desc: "Logic gates and electron flows. Bridge the gap between components.", bgImg: "https://images7.alphacoders.com/105/1059424.jpg" }, // Dr. Stone (Lightbulb/Science)
  { id: 22, nodeId: "23", chapter: "EVENT 23", title: "PCB DESIGN", desc: "The architecture of hardware. Lay out the traces that power modern devices.", bgImg: "https://images3.alphacoders.com/211/211925.jpg" }, // Lain (Hardware/Chips)
  { id: 23, nodeId: "24", chapter: "EVENT 24", title: "DRONE RACE", desc: "Aero-dynamic dominance. Navigate the air gates at blistering speeds.", bgImg: "https://images5.alphacoders.com/105/1053787.jpg" }, // Weathering With You (Sky/Clouds)
  { id: 24, nodeId: "25", chapter: "EVENT 25", title: "SUMO FIGHT", desc: "Pure power. Push the opponent out of the ring using clever weight distribution.", bgImg: "https://images.alphacoders.com/956/956461.jpg" }, // Hinomaru Sumo (Impact)
  { id: 25, nodeId: "26", chapter: "EVENT 26", title: "SCRAP TECH", desc: "Innovation from waste. Build functional tech using only recycled materials.", bgImg: "https://images6.alphacoders.com/913/913251.jpg" }  // Megalo Box (Junk Gear)
].map(event => ({
  ...event,
  titleSize: "text-3xl md:text-5xl lg:text-7xl",
  descSize: "text-[11px] md:text-sm lg:text-base"
}));

const EventPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimating = useRef(false);
  const stringPathRef = useRef(null);
  
  const TOTAL_EVENTS = EVENT_DATA.length;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const stringPath = stringPathRef.current;
      const waveConfig = { p1: 0, p2: 0, p3: 0, amp: 80 };
      gsap.to(waveConfig, {
        p1: Math.PI * 4, p2: Math.PI * 2, p3: Math.PI * 3,
        amp: 180, repeat: -1, duration: 15, yoyo: true, ease: "sine.inOut",
        onUpdate: () => {
          const a = waveConfig.amp;
          const y1 = 500 + Math.sin(waveConfig.p1) * a;
          const y2 = 500 + Math.cos(waveConfig.p2) * (a * 1.3); 
          const y3 = 500 + Math.sin(waveConfig.p3) * (a * 0.8);
          const newPath = `M-200,500 C200,200 500,${y2} 720,${y3} C940,${y2} 1300,${y1} 1700,500`;
          if(stringPath) stringPath.setAttribute("d", newPath);
        }
      });
    });
    return () => ctx.revert();
  }, []);

  const getShortestDiff = (index) => {
    let diff = (index - activeIndex) % TOTAL_EVENTS;
    if (diff < 0) diff += TOTAL_EVENTS;
    if (diff > TOTAL_EVENTS / 2) diff -= TOTAL_EVENTS;
    return diff;
  };

  const handleWheel = (e) => {
    if (isAnimating.current) return;
    if (e.deltaY > 10) nextEvent();
    else if (e.deltaY < -10) prevEvent();
  };

  const nextEvent = () => {
    isAnimating.current = true;
    setActiveIndex((prev) => (prev + 1) % TOTAL_EVENTS);
    setTimeout(() => { isAnimating.current = false; }, 650); 
  };

  const prevEvent = () => {
    isAnimating.current = true;
    setActiveIndex((prev) => (prev - 1 + TOTAL_EVENTS) % TOTAL_EVENTS);
    setTimeout(() => { isAnimating.current = false; }, 650);
  };

  const goToEvent = (index) => {
    if (isAnimating.current || activeIndex === index) return;
    isAnimating.current = true;
    setActiveIndex(index);
    setTimeout(() => { isAnimating.current = false; }, 650);
  };

  const touchStartY = useRef(0);
  const handleTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; };
  const handleTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;
    if (Math.abs(diff) > 20) {
      if (diff > 0) nextEvent();
      else prevEvent();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") nextEvent();
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") prevEvent();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getContainerStyles = (index) => {
    const diff = getShortestDiff(index);
    let style = {
      clipPath: 'polygon(35% 60%, 35% 60%, 35% 60%)', 
      opacity: 0, zIndex: 0, pointerEvents: 'none',
      backgroundColor: '#3f3f46', transitionDuration: '800ms', 
    };

    if (diff === 0) {
      style = { ...style, clipPath: 'polygon(1% 1%, 99% 1%, 35% 56%)', opacity: 1, zIndex: 40, pointerEvents: 'auto', backgroundColor: '#52525b' };
    } else if (diff === 1) {
      style = { ...style, clipPath: 'polygon(99% 3%, 99% 99%, 38% 60%)', opacity: 0.8, zIndex: 30, pointerEvents: 'auto', backgroundColor: '#3f3f46' };
    } else if (diff === 2) {
      style = { ...style, clipPath: 'polygon(97% 99%, 1% 99%, 35% 64%)', opacity: 0.5, zIndex: 20, pointerEvents: 'none', backgroundColor: '#27272a' };
    } else if (diff === -1) {
      style = { ...style, clipPath: 'polygon(1% 97%, 1% 3%, 32% 60%)', opacity: 0.25, zIndex: 10, pointerEvents: 'auto', backgroundColor: '#18181b' };
    } else if (diff === 3) {
      style = { ...style, clipPath: 'polygon(100% 100%, 100% 100%, 35% 60%)', opacity: 0, zIndex: 5 };
    } else if (diff === -2) {
      style = { ...style, clipPath: 'polygon(0% 0%, 0% 0%, 35% 60%)', opacity: 0, zIndex: 5 };
    }
    return style;
  };

  const getContentStyles = (index) => {
    const diff = getShortestDiff(index);
    if (diff === 0) return { top: '22%', left: '45%', transform: 'translate(-50%, -50%) scale(1)' }; 
    if (diff === 1) return { top: '50%', left: '75%', transform: 'translate(-50%, -50%) scale(0.85)' }; 
    if (diff === 2) return { top: '82%', left: '45%', transform: 'translate(-50%, -50%) scale(0.6)' }; 
    if (diff === -1) return { top: '50%', left: '15%', transform: 'translate(-50%, -50%) scale(0.4)' }; 
    return { top: '50%', left: '50%', transform: 'translate(-50%, -50%) scale(0.1)' };
  };

  return (
    <div 
      className="fixed inset-0 w-full h-full bg-zinc-950 overflow-hidden select-none font-sans touch-none overscroll-none"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-multiply" style={{ backgroundImage: `radial-gradient(#111 1px, transparent 0)`, backgroundSize: '16px 16px' }} />
      
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80 mix-blend-screen filter drop-shadow-[0_0_15px_rgba(255,51,0,0.8)]">
        <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
            <path ref={stringPathRef} d="M-200,500 C200,200 400,800 720,500 C1040,100 1240,700 1700,500" stroke="#ff3300" strokeWidth="6" strokeLinecap="round" />
        </svg>
      </div>

      <div className="absolute top-4 left-4 md:top-8 md:left-8 z-50 pointer-events-none">
         <h1 className="text-white text-3xl md:text-6xl font-black italic tracking-tighter uppercase drop-shadow-[3px_3px_0px_rgba(194,65,12,1)]">
           EVENTS
         </h1>
         <div className="text-orange-600 font-bold tracking-[0.2em] text-[8px] md:text-[10px] mt-1 uppercase">{TOTAL_EVENTS} EVENTS IN TOTAL</div>
      </div>

      {/* RIGHT SIDE TIMELINE INDEX */}
      <div className="absolute right-1 md:right-6 top-1/2 -translate-y-1/2 z-50 h-[60vh] w-12 md:w-32 flex flex-col justify-center pointer-events-auto">
        <div className="h-full w-full overflow-y-auto no-scrollbar mask-fade-y flex flex-col gap-2 md:gap-4 py-10">
          {EVENT_DATA.map((event, index) => {
            const isActive = index === activeIndex;
            return (
              <div key={event.id} onClick={() => goToEvent(index)} className={`group flex items-center justify-end gap-1 md:gap-3 cursor-pointer transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-20 hover:opacity-100'}`}>
                <span className={`text-[8px] md:text-xs font-black transition-all duration-300 ${isActive ? 'text-orange-500 scale-125 origin-right' : 'text-white'}`}>
                  {event.nodeId}
                </span>
                <div className={`h-[2px] transition-all duration-300 ${isActive ? 'w-4 md:w-8 bg-orange-600 shadow-[0_0_10px_rgba(234,88,12,0.8)]' : 'w-1 md:w-3 bg-white'}`} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        {EVENT_DATA.map((event, index) => {
          const diff = getShortestDiff(index);
          const isVisible = (diff >= -1 && diff <= 2);
          const isNearby = (diff >= -2 && diff <= 3);
          const styles = getContainerStyles(index);
          
          return (
            <div key={event.id} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: styles.zIndex }}>
              <div 
                className={`group absolute inset-0 w-full h-full overflow-hidden transition-all ease-[cubic-bezier(0.25,1,0.5,1)] hover:!duration-150 ${isVisible ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none'}`}
                style={{ clipPath: styles.clipPath, opacity: styles.opacity, backgroundColor: styles.backgroundColor, transitionDuration: styles.transitionDuration }}
                onClick={() => { if (diff === 1) nextEvent(); if (diff === -1) prevEvent(); }}
              >
                {isNearby && (
                  <>
                    <img src={event.bgImg} alt="" loading="lazy" className={`absolute inset-0 w-full h-full object-cover transition-all duration-[400ms] group-hover:scale-110 ${diff === 0 ? 'grayscale-[20%] contrast-100 scale-100 opacity-90' : 'grayscale contrast-150 brightness-50 opacity-30'} group-hover:grayscale-0 group-hover:opacity-100`} />
                    <div className="absolute inset-0 bg-zinc-950/40 mix-blend-multiply transition-opacity group-hover:opacity-0 pointer-events-none" />

                    <div 
                      className="absolute flex flex-col items-center justify-center text-center transition-all ease-[cubic-bezier(0.25,1,0.5,1)] w-[85vw] md:w-[65vw] lg:w-[45vw] pointer-events-none"
                      style={{ ...getContentStyles(index), transitionDuration: styles.transitionDuration }}
                    >
                      {isVisible && (
                        <div className="flex flex-col items-center w-full px-4 py-2">
                          <div className="flex items-center gap-2 mb-3 md:mb-6 transition-transform group-hover:-translate-y-1">
                            <div className={`w-6 md:w-8 h-1 skew-x-[-20deg] ${diff === 0 ? 'bg-orange-600' : 'bg-white/40'}`} />
                            <span className={`text-[10px] lg:text-xs font-black tracking-[0.2em] uppercase ${diff === 0 ? 'text-orange-500' : 'text-white/80'}`}>
                              {event.chapter}
                            </span>
                            <div className={`w-6 md:w-8 h-1 skew-x-[-20deg] ${diff === 0 ? 'bg-orange-600' : 'bg-white/40'}`} />
                          </div>
                          
                          <h2 className={`font-black italic tracking-tighter leading-[0.9] uppercase drop-shadow-[2px_2px_10px_rgba(0,0,0,0.8)] transition-all group-hover:text-white ${event.titleSize} ${diff === 0 ? 'text-white' : 'text-zinc-400'}`}>
                            {event.title}
                          </h2>
                          
                          <div className="mt-4 md:mt-8 relative w-full max-w-[90%] md:max-w-[80%]">
                            <p className={`text-zinc-200 font-medium italic px-4 py-2 md:py-4 bg-zinc-950/80 border-l-4 border-orange-600 backdrop-blur-md transition-opacity ${event.descSize} ${diff === 0 ? 'opacity-100' : 'opacity-0'}`}>
                              {event.desc}
                            </p>
                          </div>
                        </div>
                      )}
                      {isVisible && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] md:text-[30vw] lg:text-[25vw] font-black text-white/5 italic tracking-tighter select-none -z-10 mix-blend-overlay transition-all group-hover:text-white/10 group-hover:scale-105">
                          {event.nodeId}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style jsx="true">{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .mask-fade-y {
          mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </div>
  );
};

export default EventPage;