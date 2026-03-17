import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const stampRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
        }
      });

      tl.fromTo(".scroll-edge", 
        { scaleX: 0 }, 
        { scaleX: 1, duration: 1.2, ease: "power3.inOut" }
      )
      .fromTo(stampRef.current, 
        { y: 30, opacity: 0, scale: 1.5 }, 
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2)" },
        "-=0.4"
      )
      .fromTo(".footer-link", 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
        "-=0.2"
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative w-full bg-[#050505] border-t border-white/5 pt-16 pb-8 overflow-hidden text-white"
    >
      {/* Subtle Screentone Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#fff 1px, transparent 0)`, backgroundSize: '20px 20px' }} 
      />

      {/* The Animated Top Line */}
      <div className="scroll-edge absolute top-0 left-0 w-full h-[2px] bg-orange-700 origin-left" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          
          {/* LEFT: Logo Area */}
          <div className="flex items-center gap-5">
            <div ref={stampRef} className="w-12 h-12 bg-orange-700 flex items-center justify-center rounded-sm shadow-2xl border border-white/10">
              <span className="text-white font-serif font-black text-2xl leading-none">秘</span>
            </div>
            <div>
              <h2 className="text-2xl font-serif font-black tracking-tighter text-white">AHOUBA</h2>
              <p className="text-[9px] font-mono tracking-[0.4em] text-orange-600 uppercase">Classified Access</p>
            </div>
          </div>

          {/* CENTER: Links */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {['HOME', 'ABOUT', 'EVENT', 'PEOPLE', 'SPONSORS'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="footer-link group relative text-[11px] font-black tracking-[0.2em] text-zinc-400 transition-colors duration-300 hover:text-white"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-orange-700 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* RIGHT: Socials */}
          <div className="flex gap-4">
            {['TW', 'IG', 'YT'].map((social) => (
              <div key={social} className="footer-link w-9 h-9 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 cursor-pointer text-[10px] font-black">
                {social}
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM: Copyright */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center opacity-40">
          <p className="text-[9px] font-mono tracking-widest uppercase text-zinc-500">
            © 2026 AHOUBA STUDIO — ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-500">Node Explorer v1.0</span>
            <div className="w-1.5 h-1.5 bg-orange-700 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Background Kanji Shadow */}
      <div className="absolute -bottom-6 -right-6 opacity-[0.02] pointer-events-none select-none">
        <span className="text-[15rem] font-black leading-none text-white">完</span>
      </div>
    </footer>
  );
};

export default Footer;