import React from "react";

// 1. Import SVGs as React Components
import LaptopBg from "../assets/about_section.svg?react"; 
import TabletBg from "../assets/tablet_about_ahouba.svg?react"; 
import MobileBg from "../assets/phone_about_ahouba.svg?react";

const About = () => {
  return (
    <section
      id="about"
      className="relative w-full h-screen overflow-hidden flex items-center justify-center lg:mt-0"
    >
      {/* --- TOP RIGHT HEADING --- */}
      <div className="absolute top-10 right-6 md:top-40 md:right-35 z-20 flex flex-col items-end pointer-events-none select-none">
        <div className="flex items-center gap-3">
          <span className="text-orange-700 font-black text-xl md:text-2xl tracking-[0.3em]">概要</span>
          <div className="h-[2px] w-8 md:w-12 bg-orange-700 shadow-[0_0_10px_#E46A9F]" />
        </div>
        
        <h1 className=" font-black text-3xl md:text-5xl lg:text-6xl text-white mt-1 tracking-tighter drop-shadow-[4px_4px_0px_rgba(228,106,159,0.4)]">
          ABOUT <span className="text-orange-700">AHOUBA</span>
        </h1>
        
        <p className="text-[10px] md:text-xs  text-orange-700 mt-1 tracking-[0.5em] uppercase">
          Technical Revelation // Node 02
        </p>
      </div>

      {/* --- TEXT OVERLAY CONTAINER (Main Description) --- */}
      <div className="absolute z-10 w-full max-w-[85%] md:max-w-[70%] lg:max-w-[50%] pointer-events-none px-6
                      top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2
                      min-[572px]:top-[48%]
                      min-[808px]:top-[55%] lg:top-[60%]">
        
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#F1ECF7]/90 leading-relaxed  text-justify md:text-center pointer-events-auto bg-black/40 backdrop-blur-[4px] p-6 border-l-2 border-orange-700/50 rounded-r-xl">
          <span className="text-orange-700 font-bold drop-shadow-[0_0_8px_rgba(228,106,159,0.5)]">Ahouba</span> is the annual technical fest of 
          <span className="text-orange-700 font-bold"> IIIT Manipur</span>, organized by its students. 
          The fest features technical competitions such as coding contests, quizzes, and problem-solving challenges, along with workshops and talks. 
          Students from various colleges participate in both team and individual events. 
          Designed for different skill levels, Ahouba promotes practical, hands-on learning while encouraging engagement.
        </p>
      </div>

      {/* ------------------------------------------------------
          1. MOBILE VIEW
          ------------------------------------------------------ */}
      <MobileBg
        className={`block min-[572px]:hidden w-[95vw] h-[95vh] object-contain object-center
          [&_#aboutahouba]:opacity-0 
          [&_#aboutahouba]:[transform-box:fill-box] 
          [&_#aboutahouba]:origin-center
          [&_#aboutahouba]:translate-y-[-180%] 
          [&_#aboutahouba]:translate-x-[-49%] 
          [&_#aboutahouba]:scale-[0.1]
        `}
      />

      {/* ------------------------------------------------------
          2. TABLET VIEW
          ------------------------------------------------------ */}
      <TabletBg
        className={`hidden min-[572px]:block min-[808px]:hidden w-full h-full object-contain object-center
          [&_#aboutahouba]:opacity-0 
          [&_#aboutahouba]:[transform-box:fill-box] 
          [&_#aboutahouba]:origin-center
          [&_#aboutahouba]:translate-y-[-145%]
          [&_#aboutahouba]:translate-x-[-43%]
          [&_#aboutahouba]:scale-[0.2]
        `}
      />

      {/* ------------------------------------------------------
          3. LAPTOP VIEW
          ------------------------------------------------------ */}
      <LaptopBg
        className="hidden min-[808px]:block w-full h-full object-contain object-center relative top-[-28vh] lg:top-0 
          [&_#aboutahouba]:opacity-0 
          [&_#aboutahouba]:scale-[0.7]
          [&_#aboutahouba]:translate-y-[5%]
          [&_#aboutahouba]:translate-x-[3%]"
      />
    </section>
  );
};

export default About;