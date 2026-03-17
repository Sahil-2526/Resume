import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- IMAGE IMPORTS ---
import sbi from '../assets/sponsors/sbi.jpg';
import babina from '../assets/sponsors/babina.png';
import canara from '../assets/sponsors/canara.png';
import codexp from '../assets/sponsors/codexp.png';
import icici from '../assets/sponsors/icici.jpg';
import indianExpress from '../assets/sponsors/indian-express.jpg';
import mphc from '../assets/sponsors/mphc.jpg';
import shija from '../assets/sponsors/shija.png';
import unstop from '../assets/sponsors/unstop.png';
import notFound from "../assets/sponsors/not-found.png";

gsap.registerPlugin(ScrollTrigger);

// ===========================================================================
// CONFIGURATION
// ===========================================================================
const SPONSOR_DATA = [
  { id: 1,  kanji: "壱", name: "SBI",            image: sbi,            link: "https://onlinesbi.sbi.bank.in/" },
  { id: 2,  kanji: "弐", name: "BABINA",         image: babina,         link: "https://www.babinahospital.com/" },
  { id: 3,  kanji: "参", name: "CANARA",         image: canara,         link: "https://www.canarabank.bank.in/" },
  { id: 4,  kanji: "四", name: "CODEX",          image: codexp,         link: "https://www.codexp.in/" },
  { id: 5,  kanji: "五", name: "ICICI",          image: icici,          link: "https://www.icici.bank.in/" },
  { id: 6,  kanji: "六", name: "INDIAN EXPRESS", image: indianExpress,  link: "https://indianexpress.com/" },
  { id: 7,  kanji: "七", name: "MPHC",           image: mphc,           link: "https://manipur.mygov.in/group/manipur-police-housing-corporation-limited-mphc-ltd/" },
  { id: 8,  kanji: "八", name: "SHIJA",          image: shija,          link: "https://www.shijahospitals.com/" },
  { id: 9,  kanji: "九", name: "UNSTOP",         image: unstop,         link: "https://unstop.com/" },
  { id: 10, kanji: "十", name: "BALAJI",         image: notFound,       link: null },
  { id: 11, kanji: "拾", name: "SUPPER",         image: notFound,       link: null },
  { id: 12, kanji: "百", name: "D4",             image: notFound,       link: null },
  { id: 13, kanji: "千", name: "RISHAB",         image: notFound,       link: null },
];

const Sponsor = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      // 1. Title Entry
      gsap.fromTo(".section-title",
        { y: -100, opacity: 0, scale: 2 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );

      // 2. Grid Items Stagger
      ScrollTrigger.batch(".sponsor-card-item", {
        onEnter: batch => gsap.fromTo(batch, 
          { y: 100, opacity: 0, rotateX: 45 }, 
          { y: 0, opacity: 1, rotateX: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" }
        ),
        start: "top 90%"
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleCardClick = (link) => {
    if (link) window.open(link, "_blank");
  };

  return (
    <section 
      ref={sectionRef} 
      id="sponsors" 
      className="relative w-full min-h-screen bg-[#0a0a0a]/30 overflow-hidden flex flex-col items-center py-20 md:py-32"
    >
      
      {/* --- BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" />
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none mix-blend-overlay bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/20/Halftone_Gaussian_Blur.svg')] bg-cover" />

      {/* --- TITLE --- */}
      <div className="section-title relative z-20 text-center mb-20 pointer-events-none select-none">
        <h2 className="text-6xl md:text-9xl font-black italic text-white uppercase tracking-tighter leading-none mix-blend-difference">
          SPONSORS
        </h2>
        <div className="w-full h-2 bg-white mt-2 skew-x-[-20deg]" />
      </div>

      {/* --- GRID LAYOUT --- */}
      <div 
        ref={containerRef}
        className="relative z-10 w-full max-w-[1600px] px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 perspective-1000"
      >
        {SPONSOR_DATA.map((sponsor) => (
          <div 
            key={sponsor.id}
            onClick={() => handleCardClick(sponsor.link)}
            className="sponsor-card-item group relative h-[350px] w-full cursor-pointer bg-black/40 border border-white/20 transition-all duration-300 hover:border-white hover:z-20 hover:-translate-y-2"
            style={{ clipPath: "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)" }}
          >
            
            {/* 1. Image Layer */}
            <div className="absolute inset-0 overflow-hidden flex items-center justify-center bg-black/20">
               <img 
                 src={sponsor.image} 
                 alt={sponsor.name}
                 className="w-full h-full object-contain p-8 opacity-60 grayscale transition-all duration-500 
                            group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.8)_50%)] bg-[length:100%_4px] opacity-40 pointer-events-none group-hover:opacity-10" />
            </div>

            {/* 2. Content Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 pointer-events-none">
                
                {/* Header: Kanji & Badge */}
                <div className="flex justify-between items-start">
                    <span className="text-4xl font-black text-white/20 group-hover:text-white transition-colors duration-300">
                        {sponsor.kanji}
                    </span>
                    
                    {/* UPDATED BADGE: Changes color and text on hover */}
                    <div className="border border-white/30 px-2 py-1 bg-black/50 backdrop-blur-md transition-colors duration-300 group-hover:border-green-400 group-hover:bg-green-900/30">
                        <div className="relative overflow-hidden h-[10px] w-[60px] flex items-center justify-center">
                            {/* LOCKED STATE */}
                            <span className="absolute text-[8px] font-mono text-white/70 uppercase tracking-widest transition-transform duration-300 group-hover:-translate-y-full">
                                Sys.Locked
                            </span>
                            {/* UNLOCKED STATE */}
                            <span className="absolute text-[8px] font-mono text-green-400 font-bold uppercase tracking-widest translate-y-full transition-transform duration-300 group-hover:translate-y-0 group-hover:drop-shadow-[0_0_5px_rgba(74,222,128,0.8)]">
                                Sys.Unlckd
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer: Name Only */}
                <div className="relative">
                    <div className="w-8 h-1 bg-white/50 mb-2 transition-all duration-300 group-hover:w-full group-hover:bg-green-400 group-hover:shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
                    <h3 className="text-3xl font-black italic text-white uppercase leading-none tracking-tight mix-blend-difference group-hover:translate-x-2 transition-transform duration-300">
                        {sponsor.name}
                    </h3>
                </div>
            </div>

            {/* 3. Hover Flash */}
            <div className="absolute inset-0 z-30 bg-white translate-y-full transition-transform duration-300 ease-out mix-blend-overlay group-hover:translate-y-0 pointer-events-none opacity-20" />

          </div>
        ))}
      </div>

    </section>
  );
};

export default Sponsor;