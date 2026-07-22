import { StarIcon } from "lucide-react";
import VelocityCarousel from "../VelocityCarousel";
import SpotlightCard from "../SpotlightCard";

const testimonialsRow1 = [
    {
        name: "Sarah K.",
        role: "Marketing Manager",
        avatar: "S",
        avatarBg: "from-orange-500 to-amber-500",
        text: "SocialSparrow has saved our team 10+ hours a week. The AI composer is genuinely impressive — it writes content that sounds authentic.",
    },
    {
        name: "Marcus L.",
        role: "Indie Creator",
        avatar: "M",
        avatarBg: "from-orange-600 to-amber-600",
        text: "I used to dread social media scheduling. Now I queue up a whole week of content in 20 minutes. The smart calendar feature alone is worth it.",
    },
    {
        name: "Priya D.",
        role: "Startup Founder",
        avatar: "P",
        avatarBg: "from-amber-500 to-orange-500",
        text: "Finally a scheduler that's beautiful AND powerful. The clean dark plate dashboard makes it easy to see exactly what's going out.",
    },
];

const testimonialsRow2 = [
    {
        name: "Alex Rivera",
        role: "Digital Strategist",
        avatar: "A",
        avatarBg: "from-orange-500 to-red-500",
        text: "Managing 8+ accounts across LinkedIn and X was chaos. SocialSparrow centralized everything in one crisp interface.",
    },
    {
        name: "Elena Rostova",
        role: "Content Lead",
        avatar: "E",
        avatarBg: "from-amber-600 to-orange-500",
        text: "The auto hashtag suggestions boost our organic reach by 35% on average. Highly recommended for growth teams!",
    },
    {
        name: "David Chen",
        role: "E-Commerce Founder",
        avatar: "D",
        avatarBg: "from-orange-400 to-amber-500",
        text: "Hands down the best social media automation tool I've used. Fast, reliable, and the visual feedback is top notch.",
    },
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-[#121214] text-zinc-100 border-t border-[#242429] overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12 text-center">
                <div className="mb-6 inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full">
                    <StarIcon className="size-3.5 fill-orange-500" />
                    <span>Testimonials</span>
                </div>
                <h2 className="font-sans font-extrabold text-4xl sm:text-5xl leading-tight text-white tracking-tight">
                    Loved by <span className="text-orange-500 italic">creators &amp; teams</span>
                </h2>
                <p className="mt-5 text-zinc-400 text-sm max-w-md mx-auto">Join thousands of creators who automate their social media with SocialSparrow.</p>
            </div>

            {/* Velocity Scroll Carousels */}
            <div className="space-y-4">
                {/* Row 1 - Scroll Left */}
                <VelocityCarousel baseVelocity={-1.5}>
                    {testimonialsRow1.map((t, i) => (
                        <SpotlightCard
                            key={i}
                            spotlightColor="rgba(255, 107, 0, 0.18)"
                            className="w-[340px] sm:w-[380px] bg-[#1a1a1e] rounded-2xl border border-[#2c2c33] hover:border-orange-500/40 p-6 flex flex-col justify-between space-y-4 shadow-md group shrink-0"
                        >
                            <p className="text-zinc-300 text-xs leading-relaxed italic">"{t.text}"</p>
                            <div className="flex items-center gap-3 pt-3 border-t border-[#2c2c33]">
                                <div className={`size-9 rounded-xl bg-gradient-to-tr ${t.avatarBg} text-white font-bold flex items-center justify-center text-xs shadow-md shrink-0`}>
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-white">{t.name}</div>
                                    <div className="text-[11px] text-zinc-400">{t.role}</div>
                                </div>
                            </div>
                        </SpotlightCard>
                    ))}
                </VelocityCarousel>

                {/* Row 2 - Scroll Right */}
                <VelocityCarousel baseVelocity={1.5}>
                    {testimonialsRow2.map((t, i) => (
                        <SpotlightCard
                            key={i}
                            spotlightColor="rgba(255, 107, 0, 0.18)"
                            className="w-[340px] sm:w-[380px] bg-[#1a1a1e] rounded-2xl border border-[#2c2c33] hover:border-orange-500/40 p-6 flex flex-col justify-between space-y-4 shadow-md group shrink-0"
                        >
                            <p className="text-zinc-300 text-xs leading-relaxed italic">"{t.text}"</p>
                            <div className="flex items-center gap-3 pt-3 border-t border-[#2c2c33]">
                                <div className={`size-9 rounded-xl bg-gradient-to-tr ${t.avatarBg} text-white font-bold flex items-center justify-center text-xs shadow-md shrink-0`}>
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="text-xs font-bold text-white">{t.name}</div>
                                    <div className="text-[11px] text-zinc-400">{t.role}</div>
                                </div>
                            </div>
                        </SpotlightCard>
                    ))}
                </VelocityCarousel>
            </div>
        </section>
    );
}
