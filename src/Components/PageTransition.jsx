import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PageTransition = ({ 
  triggerRef, 
  nextSectionRef,
  // Kept these props so your App.jsx doesn't break, even though they aren't used here
  currentSectionRef, 
  originPosition, 
  color1 
}) => {
  const blockerRef = useRef(null);

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

      // 1. SETUP: Start the next page slightly pushed down (y: 30vh), slightly shrunk (scale: 0.95), and invisible.
      // These properties cost almost 0 computing power to prepare.
      tl.set(blockerRef.current, { display: "block" })
        .set(nextSectionRef.current, { 
          display: "block", 
          visibility: "visible",
          zIndex: 41, 
          opacity: 0,
          y: "30vh", 
          scale: 0.95 
        });

      // 2. ANIMATE: Hardware-accelerated glide up to position, full scale, and full visibility.
      tl.to(nextSectionRef.current, { 
        opacity: 1,
        y: "0vh",
        scale: 1,
        ease: "none" 
      });

      // 3. END: Turn off the interaction shield
      tl.set(blockerRef.current, { display: "none" });
      
    });
    
    return () => ctx.revert();
  }, [triggerRef, nextSectionRef]);

  return (
    <>
      {/* INVISIBLE SHIELD: Blocks ghost clicks during the animation scroll */}
      <div 
        ref={blockerRef}
        className="fixed inset-0 z-50 pointer-events-auto"
        style={{ display: "none", background: "transparent" }}
      />
    </>
  );
};

export default PageTransition;