import React, { useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gintoki from "../assets/gintoki.webp";
import cosplay from "../assets/events/cosplay.png"

// --- REGISTER GSAP ---
gsap.registerPlugin(ScrollTrigger);

// --- 1. MOCK DATA ---
const EVENTS_DATA = [
  {
    id: 1,
    date: "30.02.2026",
    title: "TECH EVENTS",
    tags: ["BRAIN-ROTATING", "FOR NERDS"],
    color: "bg-orange-500",
    image: "https://images.unsplash.com/photo-1612152605347-f932c6f655ae?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    date: "30.02.2026",
    title: "CULTURAL EVENTS",
    tags: ["FUN", "ENTERTAINMENT"],
    color: "bg-blue-500",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    date: "30.02.2026",
    title: "E-BLITZ",
    tags: ["GAMING", "COMPETE"],
    color: "bg-red-500",
    image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    date: "30.02.2026",
    title: "COSPLAY",
    tags: ["CHARM", "GLAMOUR"],
    color: "bg-yellow-500",
    image: cosplay
  }
];

// --- 2. MANGA BUTTON COMPONENT ---
const MangaButton = ({ direction, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 z-50 group outline-none
                  ${direction === 'left' ? '-left-8 md:-left-12' : '-right-8 md:-right-12'}`}
    >
      <div className="relative w-14 h-14 md:w-20 md:h-20 flex items-center justify-center transition-transform duration-200 group-hover:scale-125 group-active:scale-95">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-black drop-shadow-xl animate-[spin_12s_linear_infinite_reverse] group-hover:animate-none">
          <path fill="currentColor" d="M50 0 L61 30 L95 15 L70 45 L100 50 L70 55 L95 85 L61 70 L50 100 L39 70 L5 85 L30 55 L0 50 L30 45 L5 15 L39 30 Z" />
        </svg>
        <div className="absolute w-7 h-7 md:w-10 md:h-10 bg-yellow-400 rounded-full border-[3px] border-black z-10" />
        <svg 
          viewBox="0 0 24 24" 
          className={`relative z-20 w-4 h-4 md:w-6 md:h-6 text-black fill-current
                      ${direction === 'left' ? 'mr-1' : 'ml-1'}`}
        >
          {direction === 'left' ? <path d="M16 4l-10 8 10 8V4z" /> : <path d="M8 4l10 8-10 8V4z" />}
        </svg>
      </div>
    </button>
  );
};

// --- 3. EVENT CAROUSEL COMPONENT ---
const EventCarousel = () => {
  const navigate = useNavigate(); // Hook for redirection
  const [currIndex, setCurrIndex] = useState(0);
  const slideRef = useRef(null);
  const contentRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    animateSlide(1);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    animateSlide(-1);
  };

  const animateSlide = (dir) => {
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrIndex((prev) => {
          if (dir === 1) return prev === EVENTS_DATA.length - 1 ? 0 : prev + 1;
          return prev === 0 ? EVENTS_DATA.length - 1 : prev - 1;
        });
        gsap.set(slideRef.current, { x: dir === 1 ? '100%' : '-100%', skewX: dir === 1 ? 20 : -20 });
        gsap.set(contentRef.current, { opacity: 0, y: 20 });
        gsap.to(slideRef.current, { x: '0%', skewX: 0, duration: 0.5, ease: "power4.out" });
        gsap.to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          delay: 0.1,
          ease: "power2.out",
          onComplete: () => setIsAnimating(false)
        });
      }
    });

    tl.to(slideRef.current, {
      x: dir === 1 ? '-100%' : '100%',
      skewX: dir === 1 ? -20 : 20,
      duration: 0.4,
      ease: "power3.in"
    });
    tl.to(contentRef.current, { opacity: 0, duration: 0.2 }, "<");
  };

  const currentEvent = EVENTS_DATA[currIndex];

  return (
    <div className="relative w-full h-full group">
      <MangaButton direction="left" onClick={handlePrev} />
      <MangaButton direction="right" onClick={handleNext} />
      
      <div className="relative w-full h-full bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 z-0"
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
        
        <div ref={slideRef} className="relative w-full h-full flex flex-col z-10">
          <div className="h-[60%] w-full relative overflow-hidden border-b-4 border-black">
             <img src={currentEvent.image} alt="Event" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
             <div className="absolute top-0 right-0 p-2 flex gap-1">
               {currentEvent.tags.map(tag => (
                 <span key={tag} className="bg-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider">{tag}</span>
               ))}
             </div>
          </div>

          <div ref={contentRef} className="h-[40%] p-4 bg-white flex flex-col justify-between relative">
            <div>
              <p className="font-mono text-2xs font-bold text-gray-500 mb-1 tracking-widest">{currentEvent.date}</p>
              <h3 className="font-black text-xl md:text-3xl leading-none uppercase line-clamp-2">{currentEvent.title}</h3>
            </div>

            {/* --- REDIRECT BUTTON --- */}
            <button 
              onClick={() => navigate('/EventPage')}
              className="mt-2 w-full py-3 bg-black text-white font-black italic tracking-tighter uppercase text-sm skew-x-[-15deg] border-2 border-black hover:bg-yellow-400 hover:text-black transition-colors duration-200 active:scale-95"
            >
              <span className="inline-block skew-x-[15deg]">EXPLORE MORE ➔</span>
            </button>

            <div className={`absolute bottom-0 left-0 h-1.5 w-full ${currentEvent.color}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 4. MAIN PAGE SECTION ---
const EventSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const carouselWrapperRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 80%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(textRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out" })
        .fromTo(carouselWrapperRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.5)" }, "-=0.5")
        .fromTo(imageRef.current, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" }, "-=0.6");
    }, sectionRef);

    return () => ctx.revert(); 
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="event" 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gray-50/60"
    >
      <div className="relative w-full bg-white/80 shadow-2xl z-10 flex items-end justify-end border-y-4 border-black h-[55vh] !overflow-visible">
        
        {/* CAROUSEL WRAPPER */}
        <div 
          ref={carouselWrapperRef}
          className="absolute z-50 top-1/2 -translate-y-1/2
                     left-[50%] -translate-x-1/2 w-[85%] h-[115%]
                     min-[390px]:left-[60%] min-[390px]:w-[60%] min-[390px]:h-[125%]
                     min-[950px]:left-[20%] min-[950px]:translate-x-0 min-[950px]:w-[35%] min-[950px]:h-[135%]"
        >
          <EventCarousel />
        </div>

        {/* GINTOKI IMAGE */}
        <div 
          ref={imageRef}
          className="absolute bottom-0 right-0 z-20 pointer-events-none hidden min-[950px]:block w-[60%] h-[135%]"
          style={{ 
            backgroundImage: `url(${gintoki})`,
            backgroundSize: 'contain',
            backgroundPosition: 'right bottom', 
            backgroundRepeat: 'no-repeat'
          }}
        />
      </div>

      {/* EVENTS TEXT */}
      <h2 
        ref={textRef}
        className="absolute z-30 font-bold text-black uppercase leading-none select-none tracking-tight drop-shadow-md
                   [writing-mode:horizontal-tb] top-10 left-0 w-full text-center text-7xl
                   min-[390px]:[writing-mode:vertical-rl] min-[390px]:text-8xl min-[390px]:left-10 min-[390px]:top-[15%] min-[390px]:w-auto 
                   min-[950px]:text-9xl min-[950px]:left-5 min-[950px]:top-[12%]"
        style={{ textOrientation: 'mixed' }}
      >
        EVENTS 
      </h2>
    </section>
  );
};

export default EventSection;