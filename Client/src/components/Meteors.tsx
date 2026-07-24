import { useEffect, useState } from "react";

export interface MeteorsProps {
  number?: number;
  className?: string;
}

export const Meteors = ({ number = 20, className = "" }: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<any[]>([]);

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      top: "-5px",
      left: Math.floor(Math.random() * 100) + "%",
      delay: Math.random() * 0.8 + 0.2 + "s",
      duration: Math.floor(Math.random() * 8 + 2) + "s",
    }));
    setMeteorStyles(styles);
  }, [number]);

  return (
    <>
      {meteorStyles.map((style, idx) => (
        <span
          key={"meteor" + idx}
          className={`absolute h-0.5 w-0.5 rounded-[9999px] bg-orange-500 rotate-[215deg] shadow-[0_0_0_1px_#ffffff10] before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-orange-500 before:to-transparent animate-meteor pointer-events-none ${className}`}
          style={{
            top: style.top,
            left: style.left,
            animationDelay: style.delay,
            animationDuration: style.duration,
          }}
        />
      ))}
    </>
  );
};

export default Meteors;
