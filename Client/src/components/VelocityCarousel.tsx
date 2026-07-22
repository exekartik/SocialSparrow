import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "motion/react";

interface VelocityCarouselProps {
  children: React.ReactNode;
  baseVelocity?: number;
  className?: string;
}

// Helper to calculate infinite modulo wrap
function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export default function VelocityCarousel({ children, baseVelocity = 2, className = "" }: VelocityCarouselProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const velocityFactor = useTransform(smoothVelocity, [-1000, 1000], [-5, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -40, v)}%`);

  const directionFactor = useRef<number>(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`overflow-hidden flex flex-nowrap select-none ${className}`}>
      <motion.div className="flex flex-nowrap shrink-0 gap-6 py-4" style={{ x }}>
        {children}
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}
