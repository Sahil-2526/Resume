import React, { useState, useRef, useCallback, memo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// --- EXTERNAL COMPONENTS (Original File Names Kept) ---
import Navbar from './LandingPageComponents/-1NavBar';
import GlitchMenu from './LandingPageComponents/-1GlitchMenu';
import OverlayMenu from './LandingPageComponents/-1OverlayMenu';
import SpringSection from './LandingPageComponents/AboutPage.jsx';
import SummerSection from './LandingPageComponents/TechnicalSkills.jsx'; 
import AutumnSection from './LandingPageComponents/Projects.jsx';
import SecondSection from './LandingPageComponents/ExperienceAndAcadamics.jsx';
import CircleRevealTransition from './LandingPageComponents/-1PageTransition.jsx'; 
import AnimatedWaveFooter from './LandingPageComponents/Footer.jsx'; 

gsap.registerPlugin(ScrollTrigger);

const fixedPageStyle = {
  position: 'fixed', inset: 0, width: '100%', height: '100vh',
  willChange: 'opacity, transform', transform: 'translateZ(0)', backfaceVisibility: 'hidden',
};

// --- MEMOIZED SECTIONS ---
// GokuPage now acts as a pure CSS dark container for your new Hero component
const GokuPage = memo(({ sectionRef }) => (
  <div ref={sectionRef} style={{ ...fixedPageStyle, zIndex: 10, opacity: 1, backgroundColor: '#030712' }}>
    <div className="absolute inset-0 bg-blue-600/10 mix-blend-screen pointer-events-none" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
    {/* You can mount your new Hero Page component inside here if it's external */}
  </div>
));

const SpacePage = memo(({ sectionRef, parent }) => (
  <div ref={sectionRef} style={{ ...fixedPageStyle, zIndex: 8, opacity: 0 }}>
    <SecondSection father={parent} />
  </div>
));

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
      {/* SCROLLABLE TRACK (Heights reduced slightly for better CV flow) */}
      <div ref={PARENT} className="relative w-full" style={{ height: 'auto', minHeight: '1500vh' }}>
        <div id="home" className="h-screen" /> 
        
        <div ref={transitionRefs.t1} className="h-[300vh]" />
        <div id="events" className="h-[300vh] bg-transparent" />

        <div ref={transitionRefs.t2} className="h-[300vh]" />
        <div id="about" className="h-[100vh]" />
        
        <div ref={transitionRefs.t3} className="h-[300vh]" />
        <div id="people" className="h-[100vh]" />

        <div ref={transitionRefs.t4} className="h-[300vh]" />
        <div id="sponsors" className="h-[100vh]" />

        <div ref={transitionRefs.t5} className="h-[150vh]" />
      </div>

      {/* VISUAL LAYERS */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none">
        
        <GokuPage sectionRef={sectionRefs.goku} />
        <SpacePage sectionRef={sectionRefs.space} parent={PARENT} />
        
        <PageWrapper sectionRef={sectionRefs.spring}><SpringSection /></PageWrapper>
        <PageWrapper sectionRef={sectionRefs.summer}><SummerSection /></PageWrapper>
        <PageWrapper sectionRef={sectionRefs.autumn}><AutumnSection /></PageWrapper>

        {/* CIRCLE REVEAL TRANSITIONS (Updated to neon tech colors) */}
        <CircleRevealTransition
          color1="#00F3FF" triggerRef={transitionRefs.t1}
          currentSectionRef={sectionRefs.goku} nextSectionRef={sectionRefs.space}
          originPosition="top-left"
        />
        <CircleRevealTransition
          color1="#A855F7" triggerRef={transitionRefs.t2}
          currentSectionRef={sectionRefs.space} nextSectionRef={sectionRefs.spring}
          originPosition="bottom-right"
        />
        <CircleRevealTransition
          color1="#3B82F6" triggerRef={transitionRefs.t3}
          currentSectionRef={sectionRefs.spring} nextSectionRef={sectionRefs.summer}
          originPosition="top-right"
        />
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
      
      {/* Navbar & Menus (Gatekeeper removed, always accessible) */}
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