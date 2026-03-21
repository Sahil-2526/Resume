import React, { useState, useRef, useCallback, memo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// --- EXTERNAL COMPONENTS ---
import Navbar from './LandingPageComponents/-1NavBar';
import GlitchMenu from './LandingPageComponents/-1GlitchMenu';
import OverlayMenu from './LandingPageComponents/-1OverlayMenu';
import SpringSection from './LandingPageComponents/AboutPage.jsx';
import SummerSection from './LandingPageComponents/TechnicalSkills.jsx'; 
import AutumnSection from './LandingPageComponents/Projects.jsx';
import SecondSection from './LandingPageComponents/ExperienceAndAcadamics.jsx';
import CircleRevealTransition from './LandingPageComponents/-1PageTransition.jsx'; 
import AnimatedWaveFooter from './LandingPageComponents/Footer.jsx'; 

import Home from './LandingPageComponents/Home.jsx'; 

gsap.registerPlugin(ScrollTrigger);

const fixedPageStyle = {
  position: 'fixed', inset: 0, width: '100%', height: '100vh',
  willChange: 'opacity, transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden',
};

// --- MEMOIZED SECTIONS ---

// 1. HOME PAGE
const GokuPage = memo(({ sectionRef }) => (
  <div ref={sectionRef} style={{ ...fixedPageStyle, zIndex: 10, opacity: 1, backgroundColor: '#030712' }}>
    <div className="absolute inset-0 bg-blue-600/5 mix-blend-screen pointer-events-none" />
    <div className="relative z-20 w-full h-full pointer-events-auto">
      <Home H={true} /> 
    </div>
  </div>
));

// 3. ACADEMICS PAGE (Requires parent ref)
const SpacePage = memo(({ sectionRef, parent }) => (
  <div ref={sectionRef} style={{ ...fixedPageStyle, zIndex: 8, opacity: 0 }}>
    <SecondSection father={parent} />
  </div>
));

// GENERIC PAGE WRAPPER (Used for About, Skills, Projects)
const PageWrapper = memo(({ sectionRef, children }) => (
  <div ref={sectionRef} style={{ ...fixedPageStyle, zIndex: 1, opacity: 0 }}>
    {children}
  </div>
));

// --- LANDING PAGE COMPONENT ---
const LandingPage = () => {
  const PARENT = useRef(null);
  const transitionRefs = { 
    t1: useRef(null), t2: useRef(null), t3: useRef(null), t4: useRef(null), t5: useRef(null) 
  };
  const sectionRefs = { 
    goku: useRef(null), space: useRef(null), spring: useRef(null), summer: useRef(null), autumn: useRef(null) 
  };

  return (
    <>
      {/* --- SCROLL TRACK --- 
          IDs updated to match the new logical flow 
      */}
      <div ref={PARENT} className="relative w-full" style={{ height: 'auto', minHeight: '1500vh' }}>
        <div id="home" className="h-screen" /> 
        
        <div ref={transitionRefs.t1} className="h-[300vh]" />
        <div id="about" className="h-[300vh] bg-transparent" />
        
        <div ref={transitionRefs.t2} className="h-[300vh]" />
        <div id="academics" className="h-[100vh]" />
        
        <div ref={transitionRefs.t3} className="h-[300vh]" />
        <div id="skills" className="h-[100vh]" />
        
        <div ref={transitionRefs.t4} className="h-[300vh]" />
        <div id="projects" className="h-[100vh]" />
        
        <div ref={transitionRefs.t5} className="h-[150vh]" />
      </div>

      {/* --- VISUAL LAYERS --- */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none">
        
        {/* Render all sections (DOM order doesn't affect the GSAP sequence) */}
        <GokuPage sectionRef={sectionRefs.goku} /> {/* 1. Home */}
        <PageWrapper sectionRef={sectionRefs.spring}><SpringSection /></PageWrapper> {/* 2. About */}
        <SpacePage sectionRef={sectionRefs.space} parent={PARENT} /> {/* 3. Academics */}
        <PageWrapper sectionRef={sectionRefs.summer}><SummerSection /></PageWrapper> {/* 4. Skills */}
        <PageWrapper sectionRef={sectionRefs.autumn}><AutumnSection /></PageWrapper> {/* 5. Projects */}

        {/* --- TRANSITION SEQUENCES --- */}
        
        {/* T1: Home (Goku) -> About (Spring) */}
        <CircleRevealTransition
          color1="#00F3FF" triggerRef={transitionRefs.t1}
          currentSectionRef={sectionRefs.goku} nextSectionRef={sectionRefs.spring}
          originPosition="top-left"
        />
        
        {/* T2: About (Spring) -> Academics (Space) */}
        <CircleRevealTransition
          color1="#A855F7" triggerRef={transitionRefs.t2}
          currentSectionRef={sectionRefs.spring} nextSectionRef={sectionRefs.space}
          originPosition="bottom-right"
        />
        
        {/* T3: Academics (Space) -> Skills (Summer) */}
        <CircleRevealTransition
          color1="#3B82F6" triggerRef={transitionRefs.t3}
          currentSectionRef={sectionRefs.space} nextSectionRef={sectionRefs.summer}
          originPosition="top-right"
        />
        
        {/* T4: Skills (Summer) -> Projects (Autumn) */}
        <CircleRevealTransition
          color1="#10B981" triggerRef={transitionRefs.t4}
          currentSectionRef={sectionRefs.summer} nextSectionRef={sectionRefs.autumn}
          originPosition="bottom-left"
        />

        <AnimatedWaveFooter triggerRef={transitionRefs.t5} />
      </div>
    </>
  );
};

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

  return (
    <Router>
      <ScrollToTop />
      
      <div className="fixed top-0 left-0 right-0 z-[1000] pointer-events-auto">
        <Navbar toggleMenu={toggleMenu} />
        <GlitchMenu onClick={toggleMenu} isOpen={isMenuOpen} />
      </div>

      <div className="fixed inset-0 z-[999] pointer-events-none">
        <div className="pointer-events-auto">
          <OverlayMenu isOpen={isMenuOpen} closeMenu={closeMenu} />
        </div>
      </div>

      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}