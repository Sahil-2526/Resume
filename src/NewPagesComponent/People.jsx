import React, { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Added for navigation
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import notFound from "../assets/sponsors/not-found.png";

gsap.registerPlugin(ScrollTrigger);

const PEOPLE_DATA = [
  { id: 1, kanji: "壱", name: "CHEIF GUEST", role: "Mr. X", image: notFound },
  { id: 2, kanji: "弐", name: "DIRECTOR", role: "Prof. Krishnan Baskar", image: notFound },
  { id: 3, kanji: "参", name: "REGISTRAR", role: "Dr Nongmeikapam Kishorjit Singh", image: notFound },
  { id: 4, kanji: "四", name: "STUDENT AFFAIRS", role: "Dr. Akoijam Malemnganbi", image: notFound }
];

const People = () => {
  const navigate = useNavigate(); // 2. Initialize navigate
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const cardsRef = useRef([]);
  const btnRef = useRef(null);
  
  const [activeId, setActiveId] = useState(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      gsap.fromTo(titleRef.current,
        { y: -50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
      );

      // Animation for the button
      gsap.fromTo(btnRef.current,
        { x: 50, opacity: 0 },
        { 
          x: 0, opacity: 1, 
          duration: 0.8, 
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: btnRef.current, start: "top bottom-=50" } 
        }
      );

      mm.add("(min-width: 800px)", () => {
        gsap.fromTo(cardsRef.current,
          { y: 100, opacity: 0, rotateY: 30, z: -100 },
          { 
            y: 0, opacity: 1, rotateY: 0, z: 0,
            duration: 0.8, stagger: 0.15, ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top bottom" }
          }
        );
      });

      mm.add("(max-width: 799px)", () => {
        gsap.fromTo(cardsRef.current,
          { y: 50, opacity: 0 },
          { 
            y: 0, opacity: 1, 
            duration: 0.6, stagger: 0.1, ease: "power2.out",
            scrollTrigger: { trigger: gridRef.current, start: "top bottom" }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardClick = (id) => {
    setActiveId(prev => prev === id ? null : id);
  };

  return (
    <section 
      ref={sectionRef} 
      id="people" 
      className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-gray-50/30 perspective-2000 py-20 mt-[-30vw] lg:mt-0"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" 
           style={{
             backgroundImage: 'repeating-conic-gradient(#000 0% 0.0025%, transparent 0.0025% 0.005%, transparent 0.5%)',
             backgroundPosition: 'center',
           }} 
      />

      {/* Header */}
      <div ref={titleRef} className="relative z-20 mb-20 text-center">
        <h2 className="font-bs text-6xl md:text-8xl font-black text-black uppercase tracking-tighter leading-none mix-blend-multiply">
          PEOPLE
        </h2>
        <div className="h-2 w-20 bg-black mt-2 mx-auto" />
      </div>

      {/* Grid */}
      <div 
        ref={gridRef}
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-15 w-[85%] max-w-7xl group/grid perspective-1000 mb-20"
      >
        {PEOPLE_DATA.map((person, index) => (
          <div
            key={person.id}
            ref={el => cardsRef.current[index] = el}
            onClick={() => handleCardClick(person.id)}
            className={`group relative h-[320px] w-full cursor-pointer perspective-1000 transition-all duration-500 will-change-transform
                       ${activeId === person.id ? 'active' : ''} 
                       group-hover/grid:blur-[2px] group-hover/grid:scale-95 group-hover/grid:opacity-60
                       hover:!blur-none hover:!scale-110 hover:!opacity-100 hover:!z-50
                       [&.active]:!blur-none [&.active]:!scale-110 [&.active]:!opacity-100 [&.active]:!z-50`}
          >
            <div className="relative w-full h-full bg-white border-4 border-black transition-all duration-300
                            shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
                            group-hover:shadow-[20px_20px_0px_0px_#fbbf24] group-[.active]:shadow-[20px_20px_0px_0px_#fbbf24]
                            group-hover:-translate-y-4 group-[.active]:-translate-y-4
                            group-hover:-rotate-2 group-[.active]:-rotate-2"
            >
              <div className="absolute inset-0 z-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/20/Halftone_Gaussian_Blur.svg')] bg-[length:6px_6px] opacity-20 pointer-events-none group-hover:opacity-0 transition-opacity duration-300" />

              <div className="w-full h-[75%] relative overflow-hidden border-b-4 border-black bg-black">
                <img 
                  src={person.image} 
                  alt={person.name} 
                  className="w-full h-full object-cover grayscale contrast-125 brightness-110 transition-all duration-500 group-hover:grayscale-0 group-hover:scale-110"
                />
                <div className="absolute top-0 left-0 font-black text-4xl px-3 py-2 z-30 text-white mix-blend-difference pointer-events-none opacity-0 group-hover:opacity-50 transition-opacity duration-300">
                  {person.kanji}
                </div>
              </div>

              <div className="h-[25%] relative bg-white flex flex-col justify-center px-4 overflow-hidden">
                <div className="absolute inset-0 bg-black transform translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                <div className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  <h3 className="font-black text-xl uppercase leading-none tracking-tighter truncate">
                    {person.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="h-[2px] w-4 bg-black transition-colors group-hover:bg-yellow-400" />
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest">
                      {person.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. REDIRECT BUTTON - Manga Style */}
      <div className="w-[85%] max-w-7xl flex justify-end items-center relative z-30">
        <button 
          ref={btnRef}
          onClick={() => navigate('/PeoplePage')}
          className="relative group flex items-center gap-4 transition-transform active:scale-95 outline-none"
        >
          <div className="text-right">
            <span className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase leading-none text-black group-hover:text-yellow-500 transition-colors">
              EXPLORE MORE ➔
            </span>
          </div>
          
          {/* Decorative skewed box behind text on hover */}
          <div className="absolute -inset-x-4 -inset-y-2 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right -z-10 skew-x-[-15deg]" />
        </button>
      </div>
    </section>
  );
};

export default People;