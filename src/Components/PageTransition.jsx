import React, { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PageTransition = ({ 
  triggerRef, 
  currentSectionRef, // We are now actively using this!
  nextSectionRef,
  originPosition, 
  color1 
}) => {
  useLayoutEffect(() => {
    if (!triggerRef?.current || !nextSectionRef?.current || !currentSectionRef?.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true, 
        }
      });

      // 1. SETUP: Start next page down, invisible, and crucially, UNCLICKABLE
      tl.set(nextSectionRef.current, { 
          display: "block", 
          visibility: "visible",
          zIndex: 40, // Put it on top
          opacity: 0,
          y: "15vh", // Shorter, cleaner glide
          scale: 0.95,
          pointerEvents: "none" // Don't steal clicks while fading
        });

      // 2. ANIMATE: Hardware-accelerated glide up
      tl.to(nextSectionRef.current, { 
        opacity: 1,
        y: "0vh",
        scale: 1,
        ease: "none" 
      });

      // 3. THE FIX: The exact moment the transition reaches 100%
      // - Make the NEW section fully interactive
      // - Completely disable and hide the OLD section so it can't block your scroll/clicks
      tl.set(nextSectionRef.current, { pointerEvents: "auto" });
      tl.set(currentSectionRef.current, { 
          pointerEvents: "none",
          visibility: "hidden", 
          opacity: 0 
      });
      
    });
    
    return () => ctx.revert();
  }, [triggerRef, nextSectionRef, currentSectionRef]);

  // No HTML rendered here, just clean GSAP logic
  return null; 
};

export default PageTransition;