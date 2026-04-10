import React, { useState, useRef, useCallback, memo, useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// --- EXTERNAL COMPONENTS ---
import Navbar from './Components/NavBar';
import Menu from './Components/Menu';
import OverlayMenu from './Components/OverlayMenu';
import About from './Components/AboutPage';
import TechSkills from './Components/TechnicalSkills'; 
import Projects from './Components/Projects';
import Experience from './Components/ExperienceAndAcadamics';
import PageTransition from './Components/PageTransition'; 
import Footer from './Components/Footer'; 
import Home from './Components/Home.jsx'; 

gsap.registerPlugin(ScrollTrigger);

const fixedPageStyle = {
  position: 'fixed', inset: 0, width: '100%', height: '100vh',
  willChange: 'opacity, transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden',
};

// --- MEMOIZED SECTIONS ---
const GokuPage = memo(({ sectionRef }) => (
  <div ref={sectionRef} style={{ ...fixedPageStyle, zIndex: 10, opacity: 1, backgroundColor: '#030712' }}>
    <div className="absolute inset-0 bg-blue-600/5 mix-blend-screen pointer-events-none" />
    <Home />
  </div>
));

const SpringPage = memo(({ sectionRef }) => (
  <div ref={sectionRef} style={{ ...fixedPageStyle, zIndex: 1, opacity: 0, backgroundColor: '#020617' }}>
    <About />
  </div>
));

const WinterPage = memo(({ sectionRef }) => (
  <div ref={sectionRef} style={{ ...fixedPageStyle, zIndex: 1, opacity: 0, backgroundColor: '#0f172a' }}>
    <Experience />
  </div>
));

const SummerPage = memo(({ sectionRef }) => (
  <div ref={sectionRef} style={{ ...fixedPageStyle, zIndex: 1, opacity: 0, backgroundColor: '#020617' }}>
    <TechSkills />
  </div>
));

const AutumnPage = memo(({ sectionRef }) => (
  <div ref={sectionRef} style={{ ...fixedPageStyle, zIndex: 1, opacity: 0, backgroundColor: '#030712' }}>
    <Projects />
  </div>
));

// --- SCROLL RESET HELPER ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }, [pathname]);
  return null;
};

// --- MAIN APP ---
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => setIsMenuOpen(v => !v), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Refs for ScrollTriggers and Sections
  const sectionRefs = {
    goku: useRef(null),
    spring: useRef(null),
    winter: useRef(null),
    summer: useRef(null),
    autumn: useRef(null)
  };

  const transitionRefs = {
    t1: useRef(null),
    t2: useRef(null),
    t3: useRef(null),
    t4: useRef(null),
    t5: useRef(null)
  };

  return (
    <>
      <ScrollToTop />
      
      {/* 1. TOP UI LAYER (Always on top of everything) */}
      <div className="fixed top-0 left-0 right-0 z-[1000] pointer-events-auto">
        <Navbar toggleMenu={toggleMenu} />
        <Menu onClick={toggleMenu} isOpen={isMenuOpen} />
      </div>

      {/* 2. OVERLAY MENU LAYER (Moved here, given z-[999] so it sits perfectly under the Navbar) */}
      <div className="relative z-[999]">
        <OverlayMenu isOpen={isMenuOpen} />
      </div>

      {/* 3. SCROLLING PAGES & TRANSITIONS LAYER */}
      <div className="relative">
        
        {/* SECTION LAYERS */}
        <GokuPage sectionRef={sectionRefs.goku} />
        <SpringPage sectionRef={sectionRefs.spring} />
        <WinterPage sectionRef={sectionRefs.winter} />
        <SummerPage sectionRef={sectionRefs.summer} />
        <AutumnPage sectionRef={sectionRefs.autumn} />

        {/* CLONE TRACKS FOR SCROLLING */}
        <div className="relative z-0 pointer-events-none">
          <div id="home" ref={transitionRefs.t1} className="h-[300vh]" />
          <div id="about" ref={transitionRefs.t2} className="h-[300vh]" />
          <div id="academics" ref={transitionRefs.t3} className="h-[300vh]" />
          <div id="skills" ref={transitionRefs.t4} className="h-[300vh]" />
          <div id="projects" ref={transitionRefs.t5} className="h-[300vh]" />
        </div>

        {/* TRANSITION LOGIC */}
        <PageTransition
          color1="#3B82F6" triggerRef={transitionRefs.t1}
          currentSectionRef={sectionRefs.goku} nextSectionRef={sectionRefs.spring}
          originPosition="top-left"
        />
        
        <PageTransition
          color1="#A855F7" triggerRef={transitionRefs.t2}
          currentSectionRef={sectionRefs.spring} nextSectionRef={sectionRefs.winter}
          originPosition="bottom-right"
        />

        <PageTransition
          color1="#00F3FF" triggerRef={transitionRefs.t3}
          currentSectionRef={sectionRefs.winter} nextSectionRef={sectionRefs.summer}
          originPosition="top-right"
        />
        
        <PageTransition
          color1="#10B981" triggerRef={transitionRefs.t4}
          currentSectionRef={sectionRefs.summer} nextSectionRef={sectionRefs.autumn}
          originPosition="bottom-left"
        />

        <Footer triggerRef={transitionRefs.t5} />
      </div>
    </>
  );
}