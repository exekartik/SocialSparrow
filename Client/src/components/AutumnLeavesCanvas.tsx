import { useEffect, useRef } from "react";

interface Leaf {
    x: number;
    y: number;
    size: number;
    speedY: number;
    speedX: number;
    oscillationSpeed: number;
    oscillationAmp: number;
    angle: number;
    rotationSpeed: number;
    opacity: number;
    color: string;
    type: 'momiji' | 'ginkgo';
}

const LEAF_COLORS = [
    "#ff6b00", // Brand Electric Orange
    "#f97316", // Bright Orange
    "#ea580c", // Deep Autumn Orange
    "#dc2626", // Crimson Red
    "#b91c1c", // Dark Maple Red
    "#f59e0b", // Amber Gold
    "#d97706", // Golden Autumn
];

export default function AutumnLeavesCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        // Generate leaves
        const leafCount = Math.min(Math.floor((width * height) / 25000), 45);
        const leaves: Leaf[] = Array.from({ length: leafCount }, () => createLeaf(width, height, true));

        function createLeaf(w: number, h: number, initialRandomY = false): Leaf {
            return {
                x: Math.random() * w,
                y: initialRandomY ? Math.random() * h : -30 - Math.random() * 50,
                size: 10 + Math.random() * 16,
                speedY: 0.15 + Math.random() * 0.35,
                speedX: (Math.random() - 0.5) * 0.2,
                oscillationSpeed: 0.005 + Math.random() * 0.01,
                oscillationAmp: 0.8 + Math.random() * 1.2,
                angle: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.006,
                opacity: 0.35 + Math.random() * 0.5,
                color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
                type: Math.random() > 0.3 ? 'momiji' : 'ginkgo'
            };
        }

        // Draw Japanese Maple Leaf
        function drawMomiji(ctx: CanvasRenderingContext2D, size: number, color: string) {
            ctx.beginPath();
            ctx.fillStyle = color;
            const lobes = 5;
            ctx.moveTo(0, size * 0.5);
            ctx.lineTo(0, size * 0.8);
            
            ctx.moveTo(0, size * 0.4);
            for (let i = 0; i < lobes; i++) {
                const angle = ((i - 2) * Math.PI) / 3.8 - Math.PI / 2;
                const lobeLength = i === 2 ? size : (i === 1 || i === 3 ? size * 0.8 : size * 0.55);
                const tipX = Math.cos(angle) * lobeLength;
                const tipY = Math.sin(angle) * lobeLength;
                
                const ctrlAngle1 = angle - 0.25;
                const ctrlAngle2 = angle + 0.25;
                const ctrlLen = lobeLength * 0.5;

                ctx.quadraticCurveTo(
                    Math.cos(ctrlAngle1) * ctrlLen,
                    Math.sin(ctrlAngle1) * ctrlLen,
                    tipX,
                    tipY
                );
                ctx.quadraticCurveTo(
                    Math.cos(ctrlAngle2) * ctrlLen,
                    Math.sin(ctrlAngle2) * ctrlLen,
                    0,
                    0
                );
            }
            ctx.fill();
        }

        // Draw Ginkgo Leaf
        function drawGinkgo(ctx: CanvasRenderingContext2D, size: number, color: string) {
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.moveTo(0, size * 0.6);
            ctx.lineTo(0, 0);
            ctx.arc(0, 0, size * 0.7, -Math.PI * 0.85, -Math.PI * 0.15);
            ctx.closePath();
            ctx.fill();
        }

        let time = 0;

        const render = () => {
            time += 1;
            ctx.clearRect(0, 0, width, height);

            // Render Leaves
            leaves.forEach((leaf, idx) => {
                leaf.y += leaf.speedY;
                leaf.x += Math.sin(time * leaf.oscillationSpeed + idx) * leaf.oscillationAmp + leaf.speedX;
                leaf.angle += leaf.rotationSpeed;

                if (leaf.y > height + 40) {
                    leaves[idx] = createLeaf(width, height, false);
                }

                ctx.save();
                ctx.translate(leaf.x, leaf.y);
                ctx.rotate(leaf.angle);
                ctx.globalAlpha = leaf.opacity;

                ctx.shadowColor = leaf.color;
                ctx.shadowBlur = 8;

                if (leaf.type === 'momiji') {
                    drawMomiji(ctx, leaf.size, leaf.color);
                } else {
                    drawGinkgo(ctx, leaf.size, leaf.color);
                }

                ctx.restore();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-10 w-full h-full"
        />
    );
}
