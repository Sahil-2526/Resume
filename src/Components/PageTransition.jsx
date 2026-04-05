import React, { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PageTransition = ({ 
  triggerRef, 
  nextSectionRef,
  // Kept so App.jsx doesn't break
  currentSectionRef, 
  originPosition, 
  color1 
}) => {
  useLayoutEffect(() => {
    if (!triggerRef?.current || !nextSectionRef?.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true, 
        }
      });

      // 1. SETUP: Start next page down and invisible.
      // We set pointerEvents to "none" so it doesn't block your clicks while fading in.
      tl.set(nextSectionRef.current, { 
          display: "block", 
          visibility: "visible",
          zIndex: 41, 
          opacity: 0,
          y: "30vh", 
          scale: 0.95,
          pointerEvents: "none" 
        });

      // 2. ANIMATE: Hardware-accelerated glide up
      tl.to(nextSectionRef.current, { 
        opacity: 1,
        y: "0vh",
        scale: 1,
        ease: "none" 
      });

      // 3. END: Turn clicks back on ONLY once the page is fully on screen
      tl.set(nextSectionRef.current, { 
          pointerEvents: "auto" 
      });
      
    });
    
    return () => ctx.revert();
  }, [triggerRef, nextSectionRef]);

  // We completely deleted the HTML shield!
  // Returning null tells React this component only runs background GSAP logic.
  return null; 
};

export default PageTransition;