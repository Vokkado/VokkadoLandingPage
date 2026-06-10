import React from 'react';

/**
 * iPhone 14 Pro mockup with realistic proportions.
 *
 * Real device body: 71.5 × 147.5 mm  →  aspect ≈ 1 : 2.063
 * We use aspect-[393/812] (≈ 1 : 2.066) which is nearly identical.
 *
 * Border = bezel, rounded corners match the 7.85 mm radius scaled.
 * Dynamic Island: 36 × 11 mm scaled proportionally.
 * Home Indicator: centered bar at the bottom.
 *
 * All phones on the site share this component so they look identical.
 */

interface IPhoneMockupProps {
  children: React.ReactNode;
  className?: string;
}

const IPhoneMockup: React.FC<IPhoneMockupProps> = ({ children, className = '' }) => (
  <div className={`relative w-[260px] sm:w-[280px] lg:w-[300px] mx-auto ${className}`}>
    {/* Phone body */}
    <div
      className="relative mx-auto bg-neutral-darkest border-neutral-darkest border-[10px] sm:border-[12px] rounded-[40px] sm:rounded-[46px] w-full"
      style={{ boxShadow: '0 40px 80px -10px rgba(0,0,0,0.55), 0 20px 40px -15px rgba(0,0,0,0.35)', aspectRatio: '393 / 812' }}
    >
      {/* Screen area */}
      <div className="absolute inset-0 rounded-[30px] sm:rounded-[34px] overflow-hidden z-10">
        {children}
      </div>

      {/* Dynamic Island */}
      <div className="absolute top-[8px] sm:top-[10px] left-1/2 -translate-x-1/2 w-[80px] sm:w-[90px] h-[22px] sm:h-[25px] bg-black rounded-full z-20" />

      {/* Home Indicator */}
      <div className="absolute bottom-[6px] sm:bottom-[8px] left-1/2 -translate-x-1/2 w-[90px] sm:w-[100px] h-[4px] sm:h-[5px] bg-black/30 rounded-full z-20" />

      {/* Side buttons */}
      <div className="absolute -right-[11px] sm:-right-[13px] top-[25%] h-[12%] w-[2px] bg-neutral-dark/50 rounded-r-sm" />
      <div className="absolute -left-[11px] sm:-left-[13px] top-[18%] h-[7%] w-[2px] bg-neutral-dark/50 rounded-l-sm" />
      <div className="absolute -left-[11px] sm:-left-[13px] top-[28%] h-[7%] w-[2px] bg-neutral-dark/50 rounded-l-sm" />
      <div className="absolute -left-[11px] sm:-left-[13px] top-[38%] h-[7%] w-[2px] bg-neutral-dark/50 rounded-l-sm" />
    </div>
  </div>
);

export default IPhoneMockup;
