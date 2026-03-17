import React from "react";

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black" />
      <div className="absolute w-[600px] h-[600px] bg-amber-600/20 rounded-full blur-[150px]" />

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight">
          COMING
        </h1>
        <h1 className="text-6xl md:text-8xl font-black text-amber-500 tracking-tight">
          SOON
        </h1>

        <p className="mt-6 text-zinc-400 max-w-md mx-auto text-lg">
          We’re crafting something legendary. Stay tuned.
        </p>

        <div className="mt-10">
          <button className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-black font-bold tracking-widest transition-all duration-300 rounded-sm shadow-lg hover:scale-105">
            NOTIFY ME
          </button>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="absolute bottom-6 text-zinc-600 text-xs tracking-[0.5em]">
        AHOUBA
      </div>
    </div>
  );
};

export default ComingSoon;
