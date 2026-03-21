import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import gsap from "gsap";

// Clean, Elegant Minimal Typography for the Side Name
const SeasonLetter = ({ char }) => (
  <div className="relative w-12 h-12 flex justify-center items-center font-serif text-3xl text-slate-400/80 hover:text-slate-100 transition-all duration-500 cursor-default group">
    <span className="select-none">{char}</span>
    <div className="absolute -bottom-1 w-0 h-[1px] bg-amber-200 transition-all duration-500 group-hover:w-full" />
  </div>
);

const CVHero = React.forwardRef((props, ref) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  
  const containerRef = useRef(null); 
  const contentBoxRef = useRef(null);
  const toggleBtnRef = useRef(null); 

  // Handle Responsive Sizing
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // GSAP Animations for the Profile Box
  useLayoutEffect(() => {
    if (!contentBoxRef.current) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Gentle floating animation for the whole container
      gsap.to(containerRef.current, { y: -10, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 });

      if (isExpanded) {
        // Expand Animation - Now slightly narrower (400px)
        tl.to(contentBoxRef.current, {
          width: isMobile ? "90vw" : 400, 
          height: "auto", 
          borderRadius: "24px", 
          backgroundColor: "rgba(255, 255, 255, 0.03)", 
          borderColor: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)", 
          duration: 0.8, 
          ease: "expo.out"
        })
        .to(toggleBtnRef.current, { rotation: 0, duration: 0.5 }, "<")
        .to(".content-wrapper", { opacity: 1, visibility: "visible", y: 0, duration: 0.4, stagger: 0.1 });
      } else {
        // Collapse Animation
        tl.to(".content-wrapper", { opacity: 0, y: 10, duration: 0.2 })
        .to(contentBoxRef.current, {
          width: 60, height: 60, borderRadius: "50%", 
          backgroundColor: "rgba(255, 255, 255, 0.1)", 
          borderColor: "rgba(255, 255, 255, 0.2)", 
          duration: 0.5,
          ease: "back.in(1.2)"
        }, "<")
        .to(toggleBtnRef.current, { rotation: 135, scale: 1.1, duration: 0.4 }, "<");
      }
    }, containerRef);
    
    return () => ctx.revert();
  }, [isExpanded, isMobile]);

  return (
    <div ref={ref} className="fixed inset-0 w-full h-screen bg-[#0a0a0c] overflow-hidden" style={{ zIndex: 10 }}>
      
      {/* --- ALL SEASON AMBIENT BACKGROUND --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-emerald-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-[35vw] h-[35vw] bg-amber-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[10%] w-[45vw] h-[45vw] bg-yellow-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] bg-slate-800/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* --- SIDE TYPOGRAPHY (S A H I L) --- */}
      <div className="absolute right-[6vw] top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-6 z-30 opacity-40 pointer-events-none">
        {['S','A','H','I','L'].map((char, i) => ( <SeasonLetter key={i} char={char} /> ))}
      </div>

      {/* --- MAIN INTERACTIVE PROFILE CARD --- */}
      <div className="absolute inset-0 flex items-center justify-start px-[8vw] md:px-[12vw] z-20 pointer-events-none">
        
        <div ref={containerRef} className="pointer-events-auto">
            <div ref={contentBoxRef} className="relative overflow-hidden border border-white/10 backdrop-blur-xl transition-all duration-300">
              
              {/* Expand/Collapse Toggle Button */}
              <div 
                ref={toggleBtnRef} 
                onClick={() => setIsExpanded(!isExpanded)} 
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 cursor-pointer hover:bg-white/10 hover:text-white transition-all z-50"
              >
                <span className="text-xl leading-none">{isExpanded ? '−' : '+'}</span>
              </div>

              {/* Card Content - Reduced Padding slightly for smaller div */}
              <div className="p-6 md:p-8">
                
                {/* Header Section with Image and Name */}
                <div className="content-wrapper opacity-0 invisible translate-y-4 flex items-start gap-4 mb-5 pb-5 border-b border-white/5">
                  
                  {/* --- SMALL IMAGE CONTAINER --- */}
                  <div className="w-16 h-16 rounded-full border border-white/10 overflow-hidden flex-shrink-0 mt-1 bg-white/5">
                    {/* 👇 REPLACE URL BELOW WITH YOUR IMAGE URL 👇 */}
                    <img 
                      src="https://via.placeholder.com/150" 
                      alt="Sahil Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name and Title */}
                  <div className="flex-1">
                    <h3 className="text-amber-200/70 font-mono text-[10px] tracking-[0.3em] uppercase mb-1">Academic & Growth Profile</h3>
                    {/* Reduced font size for smaller space */}
                    <h1 className="text-2xl md:text-[28px] font-serif text-white mb-3 leading-tight">
                      Sahil
                    </h1>
                    <div className="w-12 h-[1px] bg-amber-200/40" />
                  </div>
                </div>

                {/* Bio & Actions Section */}
                <div className="content-wrapper opacity-0 invisible translate-y-4">
                  
                  {/* Status Indicator */}
                  <p className="text-amber-200/60 font-mono text-[9px] tracking-[0.2em] animate-pulse mb-3">
                    {'>'} CURRENT_PATH: CS_STUDENT // EVOLVING
                  </p>

                  {/* Eager Student Bio - Text slightly condensed */}
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-light mb-6 max-w-sm">
                    A <span className="text-white font-normal">Computer Science Student</span> driven by curiosity. 
                    I study the craft, seeking 
                    challenges in React, Python, and the art of smooth motion.
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 w-full">
                    <button className="flex-1 py-2.5 rounded-full border border-white/10 bg-white/5 text-white text-[9px] tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500">
                      My Journey
                    </button>
                    <button className="flex-1 py-2.5 rounded-full bg-amber-200/90 text-black text-[9px] tracking-widest uppercase font-bold hover:bg-white transition-all duration-500">
                      Get Resume
                    </button>
                  </div>

                  {/* Learning Tags */}
                  <div className="mt-6 pt-5 border-t border-white/5">
                    <p className="text-[9px] text-slate-500 uppercase tracking-[0.2em] mb-3">Eagerly Learning:</p>
                    <div className="flex flex-wrap gap-2">
                      {['Advanced DSA', 'System Design', 'UI Physics'].map((skill, i) => (
                        <div key={i} className="px-2.5 py-0.5 bg-white/5 border border-white/5 rounded-full text-[9px] text-slate-400 font-mono">
                          {skill}
                        </div>
                      ))}
                    </div>
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