import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react"; // Use this instead of useLayoutEffect

gsap.registerPlugin(ScrollTrigger);

const PageTransition = ({ 
  triggerRef, 
  currentSectionRef, 
  nextSectionRef 
}) => {
  
  useGSAP(() => {
    if (!triggerRef?.current || !nextSectionRef?.current || !currentSectionRef?.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        // Force refresh to ensure positions are calculated correctly
        invalidateOnRefresh: true, 
      }
    });

    // 1. SETUP: Prepare next section
    tl.set(nextSectionRef.current, { 
      display: "block", 
      visibility: "visible",
      zIndex: 40,
      opacity: 0,
      y: "15vh",
      scale: 0.95,
      pointerEvents: "all" // Keep this "all" if you want buttons clickable during transition
    });

    // 2. ANIMATE: Fade and Scale
    tl.to(nextSectionRef.current, { 
      opacity: 1,
      y: "0vh",
      scale: 1,
      ease: "none" 
    });

    // 3. THE CLEANUP: Clear the old section
    // Use 'onComplete' and 'onReverseComplete' for better reliability than tl.set
    tl.to(currentSectionRef.current, {
      opacity: 0,
      visibility: "hidden",
      pointerEvents: "none",
      duration: 0.1 // A tiny duration ensures it triggers at the end of scrub
    }, "<"); // Starts at the same time as the fade in

  }, { scope: triggerRef, dependencies: [triggerRef, nextSectionRef, currentSectionRef] });

  return null; 
};

export default PageTransition;