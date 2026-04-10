import React, { useRef } from "react";

const Navbar = ({ toggleMenu }) => {
  const navRef = useRef(null);

  const navItems = [
    { name: "HOME", link: "#home" },
    { name: "ABOUT", link: "#about" },
    { name: "ACADEMICS", link: "#academics" },
    { name: "SKILLS", link: "#skills" },
    { name: "PROJECTS", link: "#projects" },
  ];

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center z-50 pointer-events-none drop-shadow-[0_0_15px_rgba(0,243,255,0.3)]">
      <nav
        ref={navRef}
        className="pointer-events-auto md:w-[75%] h-16 md:h-20 relative w-[95%]    
                   bg-[#0F172A]/90 backdrop-blur-xl 
                   border-b-4 border-[#00F3FF]
                   shadow-[0_10px_30px_rgba(0,0,0,0.5)]
                   [clip-path:polygon(0_0,100%_0,95%_100%,5%_100%)]
                   flex items-center justify-center transition-colors"
      >
        {/* Added overflow-x-auto and no-scrollbar so it's swipable on small phones without squishing */}
        <ul className="flex flex-row items-center justify-start md:justify-center gap-4 sm:gap-6 md:gap-[5vw] list-none m-0 px-6 pb-2 w-full overflow-x-auto no-scrollbar">
          {navItems.map((item, index) => (
            <li key={index} className="shrink-0">
              <a
                href={item.link}
                onClick={(e) => handleNavClick(e, item.link)}
                // Sized up for mobile: text-xs/sm on phones, scaling up to text-xl on desktop
                className="text-slate-200 text-xs sm:text-sm md:text-base lg:text-xl font-['Orbitron'] font-bold tracking-[0.15em] md:tracking-[0.2em] cursor-pointer 
                           block transition-all duration-300 ease-out whitespace-nowrap
                           hover:text-[#00F3FF] hover:scale-110 
                           hover:drop-shadow-[0_0_10px_rgba(0,243,255,0.8)]"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Inline styles to hide the scrollbar for the swipable menu */}
      <style jsx="true">{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default Navbar;