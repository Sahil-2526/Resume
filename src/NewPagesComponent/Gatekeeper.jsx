// Gatekeeper.jsx
import React, { useState, useEffect } from 'react';
import './Gatekeeper.css';

const Gatekeeper = ({ onSelect }) => {
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (timeLeft === 0) {
      onSelect('2d');
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onSelect]);

  return (
    /* Updated Class: 
       - fixed inset-0: Locks to screen
       - z-[200]: Highest possible index (above Menu's 160)
       - bg-black: Ensures no transparency leakage
    */
    <div className="manga-gate fixed inset-0 z-[200] bg-black overflow-hidden">
      {/* Speed lines reused from your AnimeHero component */}
      <div className="speed-lines"></div> 
      
      <div className="choice-stage">
        {/* 3D / Anime Cover Side */}
        <div className="manga-panel p-3d" onClick={() => onSelect('3d')}>
          <div className="panel-image anime-bg"></div>
          <div className="panel-overlay blue-tint"></div>
          <div className="panel-content">
            <h2 className="panel-text italic font-black">DIGITAL</h2>
            <span className="sub-text font-mono tracking-widest">ENTER 3D WORLD</span>
          </div>
        </div>

        {/* 2D / Manga Cover Side */}
        <div className="manga-panel p-2d" onClick={() => onSelect('2d')}>
          <div className="panel-image manga-bg"></div>
          <div className="panel-overlay orange-tint"></div>
          <div className="panel-content">
            <h2 className="panel-text italic font-black">UNIVERSE</h2>
            <span className="sub-text font-mono tracking-widest">ENTER 2D MANGA</span>
          </div>
        </div>
      </div>

      <div className="impact-zone">
        <div className="logo-seal bg-orange-700 border-4 border-black shadow-[4px_4px_0px_0px_white]">AHOUBA</div>
        <h1 className="vs-title font-black italic">CHOOSE<br/><span>YOUR SIDE</span></h1>
        
        <div className="gate-timer border-2 border-white/20">
          <div className="timer-progress bg-orange-700 shadow-[0_0_15px_#C2410C]" style={{ width: `${timeLeft * 10}%` }}></div>
          <span className="timer-count font-mono tracking-tighter">INITIALIZING IN {timeLeft}S</span>
        </div>
      </div>
    </div>
  );
};

export default Gatekeeper;