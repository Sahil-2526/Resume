import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PageTransition = ({ 
  color1, 
  triggerRef, 
  currentSectionRef,
  nextSectionRef,
  originPosition = "center"
}) => {
  const colorLayerRef = useRef(null);
  const blockerRef = useRef(null);

  const getOriginCoordinates = (position) => {
    const positions = {
      "top-left": { x: 5, y: 5 },
      "bottom-right": { x: 95, y: 95 },
      "top-right": { x: 95, y: 5 },
      "bottom-left": { x: 5, y: 95 },
      "center": { x: 50, y: 50 },
    };
    return positions[position] || positions.center;
  };

  useLayoutEffect(() => {
    if (!triggerRef?.current || !nextSectionRef?.current) return;

    const ctx = gsap.context(() => {
      const origin = getOriginCoordinates(originPosition);
      const clipFrom = `circle(0% at ${origin.x}% ${origin.y}%)`;
      const clipTo = `circle(150% at ${origin.x}% ${origin.y}%)`;
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1, // The timeline now automatically syncs visibility with this 1-second delay
        }
      });

      // 1. START: Turn on the shield, color layer, and prepare the next section
      tl.set([colorLayerRef.current, blockerRef.current], { display: "block" })
        .set(colorLayerRef.current, { zIndex: 40 })
        .set(nextSectionRef.current, { 
          display: "block", 
          opacity: 1, 
          zIndex: 41, 
          visibility: "visible" 
        });

      // 2. ANIMATE: Expand the clip-path
      tl.fromTo([colorLayerRef.current, nextSectionRef.current], 
        { clipPath: clipFrom, webkitClipPath: clipFrom },
        { clipPath: clipTo, webkitClipPath: clipTo, ease: "none" },
        "<" // Starts at the exact same time as the setup above
      );

      // 3. END: Turn off the color layer and the invisible shield once the circle is fully expanded
      tl.set([colorLayerRef.current, blockerRef.current], { display: "none" });
      
    });
    
    return () => ctx.revert();
  }, [originPosition, triggerRef, nextSectionRef]);

  return (
    <>
      {/* INVISIBLE SHIELD: Blocks clicks/hovers during animation */}
      <div 
        ref={blockerRef}
        className="fixed inset-0 z-50 pointer-events-auto"
        style={{ display: "none", background: "transparent" }}
      />

      {/* COLOR WALL: Reveals the next page */}
      <div 
        ref={colorLayerRef}
        className="fixed inset-0 pointer-events-none"
        style={{ 
          backgroundColor: color1,
          display: "none",
          willChange: "clip-path"
        }}
      />
    </>
  );
};

export default PageTransition;