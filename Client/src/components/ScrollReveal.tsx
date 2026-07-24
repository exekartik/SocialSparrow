import { type ReactNode } from "react";
import { motion } from "motion/react";

export type AnimationVariant = "grow" | "flipUp" | "fadeUp" | "fadeIn";

interface ScrollRevealProps {
    children: ReactNode;
    variant?: AnimationVariant;
    delay?: number;
    duration?: number;
    className?: string;
    once?: boolean;
}

export default function ScrollReveal({
    children,
    variant = "grow",
    delay = 0,
    duration = 0.6,
    className = "",
    once = true,
}: ScrollRevealProps) {
    const getVariants = (): any => {
        switch (variant) {
            case "grow":
                return {
                    hidden: { opacity: 0, scale: 0.6 },
                    visible: {
                        opacity: 1,
                        scale: 1,
                        transition: {
                            duration,
                            delay,
                            ease: "easeInOut",
                        },
                    },
                };

            case "flipUp":
                return {
                    hidden: {
                        opacity: 0,
                        rotateX: -90,
                        transformPerspective: 2500,
                        transformStyle: "preserve-3d",
                        backfaceVisibility: "hidden",
                    },
                    visible: {
                        opacity: 1,
                        rotateX: 0,
                        transformPerspective: 2500,
                        transformStyle: "preserve-3d",
                        transition: {
                            duration,
                            delay,
                            ease: "easeOut",
                        },
                    },
                };

            case "fadeUp":
                return {
                    hidden: { opacity: 0, y: 45 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration,
                            delay,
                            ease: "easeOut",
                        },
                    },
                };

            case "fadeIn":
            default:
                return {
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            duration,
                            delay,
                        },
                    },
                };
        }
    };

    const variants = getVariants();

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: "-60px" }}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
}
