import React, { useEffect, useState } from 'react';

export const LeafCursorIcon = ({ isHovered }: { isHovered?: boolean }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`transition-transform duration-200 ease-out ${
      isHovered ? 'scale-135 rotate-[-12deg]' : 'scale-100 rotate-0'
    }`}
    style={{
      filter: 'drop-shadow(0px 0px 10px rgba(255, 107, 0, 0.85)) drop-shadow(0px 4px 10px rgba(0, 0, 0, 0.5))'
    }}
  >
    <defs>
      <linearGradient id="leafBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff8c00" />
        <stop offset="60%" stopColor="#ff5500" />
        <stop offset="100%" stopColor="#c23b00" />
      </linearGradient>
      
      <linearGradient id="leaf3DEdgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d94800" />
        <stop offset="100%" stopColor="#7a1f00" />
      </linearGradient>

      <linearGradient id="leafVeinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffd080" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#ff8800" stopOpacity="0.4" />
      </linearGradient>
    </defs>

    {/* 3D Bottom/Side Thickness Shadow Base */}
    <path
      d="M20 18 C 50 5, 88 28, 92 68 C 88 88, 68 95, 58 88 C 65 96, 75 92, 70 80 Z"
      fill="url(#leaf3DEdgeGrad)"
    />

    {/* Main Leaf Body */}
    <path
      d="M18 15 C 48 2, 85 24, 88 65 C 72 90, 42 85, 25 65 C 14 50, 10 32, 18 15 Z"
      fill="url(#leafBodyGrad)"
      stroke="#ff9d42"
      strokeWidth="1.5"
    />

    {/* Leaf Stem & Main Center Vein */}
    <path
      d="M18 15 C 32 35, 52 56, 76 78"
      stroke="url(#leafVeinGrad)"
      strokeWidth="3.5"
      strokeLinecap="round"
    />

    {/* Side Veins */}
    <path
      d="M32 32 C 45 28, 56 26, 64 28"
      stroke="url(#leafVeinGrad)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M44 46 C 58 41, 70 39, 78 42"
      stroke="url(#leafVeinGrad)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M56 60 C 68 56, 76 54, 82 56"
      stroke="url(#leafVeinGrad)"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide custom cursor on mobile touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer')
        );
        setIsHovered(isInteractive);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        transform: `translate3d(${position.x - 5}px, ${position.y - 4}px, 0)`
      }}
    >
      <LeafCursorIcon isHovered={isHovered} />
    </div>
  );
}
