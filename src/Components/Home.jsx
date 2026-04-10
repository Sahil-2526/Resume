import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import gsap from "gsap";

import resumePDF from '../assets/Sahil_Resume.pdf'; 
import Sahil from '../assets/Sahil.jpeg'; 

// Clean, Elegant Minimal Typography for the Side Name
const SeasonLetter = ({ char }) => (
  <div className="relative w-12 h-12 flex justify-center items-center font-serif text-3xl text-slate-400/80 hover:text-slate-100 transition-all duration-500 cursor-default group">
    <span className="select-none">{char}</span>
    <div className="absolute -bottom-1 w-0 h-[1px] bg-cyan-400 transition-all duration-500 group-hover:w-full" />
  </div>
);

const Home = React.forwardRef((props, ref) => {
  const [isMobile, setIsMobile] = useState(false);
  
  // State to control the Resume Modal
  const [showResume, setShowResume] = useState(false);
  
  const containerRef = useRef(null); 
  const contentBoxRef = useRef(null);

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

      // Card intro animation (always expanded)
      tl.to(contentBoxRef.current, {
        // 👇 INCREASED SIZE: Desktop to 500, Mobile to 92vw
        width: isMobile ? "92vw" : 500, 
        height: "auto", 
        borderRadius: "24px", 
        backgroundColor: "rgba(255, 255, 255, 0.03)", 
        borderColor: "rgba(255, 255, 255, 0.1)",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)", 
        duration: 0.8, 
        ease: "expo.out"
      })
      .to(".content-wrapper", { opacity: 1, visibility: "visible", y: 0, duration: 0.4, stagger: 0.1 });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, [isMobile]);

  // --- CUSTOM SLOW SMOOTH SCROLL FUNCTION ---
  const handleScrollToAbout = (e) => {
    e.preventDefault(); 
    
    const target = document.getElementById('about');
    if (!target) return; 
    
    const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    const duration = 1500; 
    
    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };
    
    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      
      window.scrollTo(0, run);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };
    
    requestAnimationFrame(animation);
  };

  return (
    <div ref={ref} className="fixed inset-0 w-full h-screen bg-[#0B0F19] overflow-hidden" style={{ zIndex: 10 }}>
      
      {/* --- TECH AMBIENT BACKGROUND GLOWS --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-[35vw] h-[35vw] bg-purple-900/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[10%] w-[45vw] h-[45vw] bg-cyan-900/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] bg-emerald-900/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* --- SIDE TYPOGRAPHY (S A H I L) --- */}
      <div className="absolute right-[6vw] top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-6 z-30 opacity-40 pointer-events-none">
        {['S','A','H','I','L'].map((char, i) => ( <SeasonLetter key={i} char={char} /> ))}
      </div>

      {/* --- MAIN INTERACTIVE PROFILE CARD --- */}
      <div className="absolute inset-0 flex items-center justify-start px-[6vw] md:px-[12vw] z-20 pointer-events-none">
        
        <div ref={containerRef} className="pointer-events-auto">
            <div ref={contentBoxRef} className="relative overflow-hidden border border-white/10 backdrop-blur-xl transition-all duration-300">

              <div className="p-8 md:p-10">
                
                <div className="content-wrapper opacity-0 invisible translate-y-4 flex items-center gap-5 mb-6 pb-6 border-b border-white/5">
                  {/* 👇 Increased image container size to w-28 h-28 */}
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border border-white/10 overflow-hidden flex-shrink-0 bg-white/5 shadow-[0_0_15px_rgba(0,243,255,0.1)]">
                    <img src={Sahil} alt="Sahil Profile" className="w-full h-full object-cover object-top transition-transform duration-500 ease-in-out hover:scale-110" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-cyan-400/80 font-mono text-[11px] tracking-[0.3em] uppercase mb-1">Academic & Growth Profile</h3>
                    <h1 className="text-3xl md:text-4xl font-serif text-white mb-3 leading-tight">Sahil</h1>
                    <div className="w-16 h-[1px] bg-cyan-400/50" />
                  </div>
                </div>

                <div className="content-wrapper opacity-0 invisible translate-y-4">
                  <p className="text-cyan-400/80 font-mono text-[10px] tracking-[0.2em] animate-pulse mb-4">
                    {'>'} CURRENT_PATH: CS_STUDENT // EVOLVING
                  </p>
                  {/* Made the text slightly larger to fill the new width */}
                  <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light mb-8">
                    A <span className="text-white font-normal">Computer Science Student</span> driven by curiosity. 
                    I <span className="text-blue-300 font-normal italic">study the craft</span>, seeking 
                    challenges in React, Python, and the art of smooth motion.
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-4 w-full">
                    <a 
                      href="#about"
                      onClick={handleScrollToAbout}
                      className="flex-1 flex justify-center items-center py-3 rounded-full border border-white/10 bg-white/5 text-white text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500"
                    >
                      Know About Me
                    </a>
                    
                    <button 
                      onClick={() => setShowResume(true)}
                      className="flex-1 flex justify-center items-center py-3 rounded-full bg-[#00F3FF]/90 text-black text-[10px] tracking-widest uppercase font-bold hover:bg-white transition-all duration-500 shadow-[0_0_10px_rgba(0,243,255,0.3)]"
                    >
                      View Resume
                    </button>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/5">
                    <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-4">Eagerly Learning:</p>
                    <div className="flex flex-wrap gap-2.5">
                      {['Advanced DSA', 'System Design', 'UI Physics'].map((skill, i) => (
                        <div key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-slate-300 font-mono hover:border-cyan-400/50 transition-colors">
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

      {/* ========================================= */}
      {/* 🚀 NEW RESUME VIEWER MODAL 🚀 */}
      {/* ========================================= */}
      {showResume && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 pointer-events-auto">
          
          {/* Dark Blurred Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer transition-opacity"
            onClick={() => setShowResume(false)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-4xl h-[80vh] md:h-[85vh] mt-12 md:mt-20 bg-[#0B0F19] border border-[#00F3FF]/30 rounded-xl shadow-[0_0_40px_rgba(0,243,255,0.2)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            
            {/* Header Toolbar */}
            <div className="flex justify-between items-center p-3 md:p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00F3FF] animate-pulse" />
                <h2 className="text-[#00F3FF] font-['Orbitron'] tracking-[0.2em] text-xs md:text-sm font-bold uppercase">
                  MY RESUME
                </h2>
              </div>
              
              {/* Close Button */}
              <button 
                onClick={() => setShowResume(false)}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-white/5 hover:bg-red-500/80 text-white transition-colors"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Resume Viewer (PDF Embedded) */}
            <div className="flex-1 w-full bg-slate-800">
              <iframe 
                src={`${resumePDF}#view=FitH`} 
                className="w-full h-full border-none"
                title="Sahil CV Viewer"
              />
            </div>

            {/* Footer with Download Fallback */}
            <div className="p-3 border-t border-white/10 bg-white/5 flex justify-between items-center">
              <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">Status: Loaded</span>
              <a 
                href={resumePDF} 
                download="Sahil_Resume.pdf"
                className="text-[10px] text-[#00F3FF] hover:text-white tracking-widest uppercase font-mono transition-colors"
              >
                [ Download PDF ]
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
});

export default Home;