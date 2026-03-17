import React, { useLayoutEffect, useRef, useState, useEffect, useMemo } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const navRef = useRef(null);
  const fullBarRef = useRef(null);
  const brandingRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = useMemo(() => [
    { label: 'HOME', id: 'home' },
    { label: 'ABOUT', id: 'about' },
    { label: 'EVENT', id: 'event' },
    { label: 'PEOPLE', id: 'people' }
  ], []);

  useEffect(() => {
    let ticking = false; 
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ['home', 'about', 'event', 'people', 'sponsors'];
          const scrollPosition = window.scrollY + window.innerHeight / 3; 

          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const { offsetTop, offsetHeight } = element;
              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveSection((prev) => (prev !== section ? section : prev));
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { force3D: true } });

      // 1. Bar expands from left
      tl.fromTo(fullBarRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 0.8, ease: "power4.inOut" }
      )
      // 2. Branding (Logo + Text) slides in immediately after bar is mostly visible
      .fromTo(brandingRef.current,
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.3"
      )
      // 3. Nav items ripple in with a "skew reveal" effect
      .fromTo(".nav-item",
        { x: -20, opacity: 0, skewX: 15 },
        { 
          x: 0, 
          opacity: 1, 
          skewX: 0, 
          stagger: 0.4, // Increased stagger for clearer sequence
          duration: 0.4, 
          ease: "power3.out" 
        },
        "-=0.2" // Starts while branding is finishing
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 w-full z-[100] pointer-events-none select-none">
      
      <div 
        ref={fullBarRef}
        className="absolute top-4 md:top-6 left-0 w-full h-12 md:h-20 bg-black border-y-4 border-black flex items-center justify-start px-1 md:px-10 pointer-events-auto shadow-[0px_10px_30px_rgba(0,0,0,0.5)] will-change-transform"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none"
             style={{ backgroundImage: `radial-gradient(white 1px, transparent 0)`, backgroundSize: '8px 8px' }} 
        />

        {/* Branding Area */}
        <div ref={brandingRef} className="flex items-center gap-4 md:gap-6 group cursor-pointer overflow-hidden h-full mr-4 md:mr-8 shrink-0">
          <div className="relative w-10 h-10 md:w-14 md:h-14 bg-orange-700 border-2 md:border-4 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_white] md:shadow-[4px_4px_0px_0px_white] z-20 group-hover:bg-white group-hover:shadow-[4px_4px_0px_0px_#b91c1c] transition-all duration-300">
            <span className="text-white group-hover:text-black font-serif font-black text-xl md:text-3xl select-none italic">秘</span>
          </div>
          
          <div className="hidden lg:block italic z-10 whitespace-nowrap">
            <h1 className="text-4xl font-black text-white tracking-tighter leading-none uppercase">Ahouba</h1>
            <p className="text-[10px] font-mono tracking-[0.5em] text-orange-700 font-bold">CHAPTER: REVELATION</p>
          </div>
        </div>

        {/* Nav Group */}
        <div className="flex items-center gap-1 md:gap-4 h-full w-full overflow-x-auto no-scrollbar flex-nowrap">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav-item shrink-0 group relative h-full flex items-center px-2 md:px-6 overflow-hidden transform-gpu"
            >
              <div className={`absolute inset-0 bg-orange-700 transition-transform duration-300 ease-out 
                ${activeSection === item.id ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}`} 
              />
              
              <span className={`relative z-10 text-xs md:text-xl font-black italic tracking-tighter transition-colors duration-300
                ${activeSection === item.id ? 'text-black' : 'text-white group-hover:text-black'}`}>
                {item.label}
              </span>
              
              <div className={`absolute bottom-1 md:bottom-2 left-0 w-full h-1 bg-white transition-transform duration-300 origin-left
                ${activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} 
              />
            </a>
          ))}

          {/* SPONSORS */}
          <a 
            href="#sponsors"
            className={`nav-item shrink-0 ml-1 md:ml-4 px-3 md:px-8 py-1 md:py-2 border-2 border-black transition-all duration-300 active:scale-95 whitespace-nowrap
            ${activeSection === 'sponsors' 
              ? 'bg-orange-700 text-white translate-y-[2px] shadow-none' 
              : 'bg-white text-black hover:bg-orange-700 hover:text-white shadow-[2px_2px_0px_0px_#b91c1c] md:shadow-[4px_4px_0px_0px_#b91c1c]'}`}
          >
            <span className="font-black italic tracking-tighter text-xs md:text-xl uppercase">
              SPONSORS
            </span>
          </a>
          
          <div className="w-10 shrink-0 md:hidden"></div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-2 bg-black" />
    </nav>
  );
};

export default Navbar;