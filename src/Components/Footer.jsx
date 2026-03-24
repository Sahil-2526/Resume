import React, { memo, useRef, useLayoutEffect } from 'react';
import gsap from "gsap";
// Standard FontAwesome Icons
import { FaLinkedin, FaGithub } from "react-icons/fa"; 
// Special Icon for LeetCode from Si
import { SiLeetcode } from "react-icons/si"; 

const Footer = memo(({ triggerRef }) => {
  const topOverlayRef = useRef(null);
  const bottomFooterRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top center",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      // Animates the black blurring overlay
      tl.fromTo(topOverlayRef.current, 
        { opacity: 0 }, 
        { opacity: 1, ease: "none" }, 
      0);

      // --- ATTACHED TO BOTTOM ---
      // Container is now 50vh tall. Ending at 50vh means it perfectly touches the bottom edge (50 + 50 = 100vh).
      tl.fromTo(bottomFooterRef.current, 
        { y: "100vh" }, // Start: Off-screen
        { y: "50vh", ease: "none" }, // End: Perfectly attached to bottom
      0);
    });

    return () => ctx.revert();
  }, [triggerRef]);

  // Wave color: Slate 900
  const waveSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 1000 150' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cpath fill='%230F172A' d='M0,150 L0,75 Q250,150 500,75 T1000,75 L1000,150 Z'/%3E%3C/svg%3E")`;

  const socialLinks = [
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/sahil-b870593a4/", hoverColor: "hover:text-[#0077b5]" },
    { icon: <FaGithub />, url: "https://github.com/Sahil-2526", hoverColor: "hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" },
    { icon: <SiLeetcode />, url: "https://leetcode.com/u/suSEy99kOj/", hoverColor: "hover:text-[#ffa116]" }
  ];

  return (
    <div className="fixed inset-0 w-full h-screen z-[60] pointer-events-none">
      
      {/* Black/Blur Overlay */}
      <div ref={topOverlayRef} className="absolute top-0 left-0 w-full h-[100vh] bg-black/60 backdrop-blur-sm opacity-0 pointer-events-none" />

      {/* Footer Container - Increased to 50vh tall, flat bottom (rounded-t-[50px]) */}
      <div ref={bottomFooterRef} className="absolute top-25 left-0 w-full h-[50vh] flex flex-col pointer-events-auto shadow-[0_-20px_50px_rgba(0,0,0,0.4)] rounded-t-[50px] overflow-hidden" style={{ transform: 'translateY(100vh)' }}>
        
        {/* 1. THE WAVE DIV (UP) */}
        <div className="relative w-full h-[120px] shrink-0 overflow-hidden leading-[0] pointer-events-none z-10">
          <div className="absolute top-0 left-0 w-full h-full opacity-100 z-[10] wave-bg animate-wave1" style={{ backgroundImage: waveSvg }} />
          <div className="absolute top-0 left-0 w-full h-full opacity-50 z-[9] wave-bg animate-wave2" style={{ backgroundImage: waveSvg }} />
          <div className="absolute top-0 left-0 w-full h-full opacity-30 z-[8] wave-bg animate-wave3" style={{ backgroundImage: waveSvg }} />
          <div className="absolute top-0 left-0 w-full h-full opacity-70 z-[7] wave-bg animate-wave4" style={{ backgroundImage: waveSvg }} />
        </div>

        {/* 2. THE SOLID DIV (DOWN) - Slate 900 */}
        {/* Added pb-16 md:pb-24 to create a large gap at the bottom */}
        <div className="w-full flex-grow bg-[#0F172A] flex flex-col justify-end md:justify-center items-center pb-16 md:pb-20 pt-0 relative z-20">
          
          {/* Social Icons */}
          <ul className="relative flex justify-center items-center gap-6 md:gap-8 my-2 flex-wrap">
            {socialLinks.map((link, i) => (
              <li key={i} className="list-none">
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className={`text-slate-500 text-[1.8rem] md:text-[2rem] inline-block transition-all duration-300 hover:-translate-y-2 ${link.hoverColor}`}
                >
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>

          {/* Navigation Links */}
          <ul className="relative flex justify-center items-center gap-[10px] my-4 flex-wrap">
            {['Home', 'About', 'Academics', 'Skills', 'Projects'].map((item, i) => (
              <li key={i} className="list-none mx-[10px]">
                <a href={`#${item.toLowerCase()}`} className="text-slate-300 text-[0.85rem] md:text-[0.95rem] font-['Orbitron'] tracking-widest no-underline opacity-70 hover:opacity-100 hover:text-[#00F3FF] transition-all duration-300 inline-block uppercase">
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <div className="w-16 h-[1px] bg-slate-800 my-2"></div>

          {/* Copyright text */}
          <p className="text-slate-500 font-mono tracking-widest text-[0.6rem] md:text-[0.65rem] opacity-70 text-center">
            Thanks for visiting! &copy; {new Date().getFullYear()} Sahil. 
          </p>
        </div>

         <style>{`
          .wave-bg {
            background-size: 1000px 150px;
            background-repeat: repeat-x;
            background-position: 0 bottom;
          }
          @keyframes wave { 
            0% { background-position-x: 0px; } 
            100% { background-position-x: 1000px; } 
          }
          @keyframes wave-reverse { 
            0% { background-position-x: 1000px; } 
            100% { background-position-x: 0px; } 
          }
          .animate-wave1 { animation: wave 4s linear infinite; }
          .animate-wave2 { animation: wave-reverse 5s linear infinite; }
          .animate-wave3 { animation: wave 6s linear infinite; }
          .animate-wave4 { animation: wave-reverse 7s linear infinite; }
        `}</style>
      </div>
    </div>
  );
});

export default Footer;