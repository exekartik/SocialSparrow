import { useState } from "react";
import { CheckCircleIcon, ChevronDownIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import SpotlightCard from "../SpotlightCard";
import ScrollReveal from "../ScrollReveal";

const steps = [
    { 
        step: "01", 
        title: "Connect Your Accounts", 
        description: "Link your social profiles in seconds. We support Twitter, LinkedIn, Facebook, and Instagram.",
        details: "SocialSparrow is fully verified and uses official API integrations to ensure your account security and stable post delivery.",
        bullets: [
            "🔒 Verified OAuth API connections",
            "🚀 Instant sync for multiple profiles",
            "🛠️ Simple, secure credentials"
        ]
    },
    { 
        step: "02", 
        title: "Create or Generate Content", 
        description: "Write your own post or let our AI craft a caption and image based on your prompt.",
        details: "Write custom copy or prompt our AI engine. Adjust tone, format, and platform targets to compose high-quality posts optimized for higher organic outreach.",
        bullets: [
            "🧠 AI tone tuning (casual, viral)",
            "🎨 Easy media and link attachments",
            "🏷️ Auto hashtag auto-generation"
        ]
    },
    { 
        step: "03", 
        title: "Schedule & Publish", 
        description: "Pick a time, select your platforms, and hit schedule. We handle publishing automatically.",
        details: "Queue posts in your visual calendar. SocialSparrow publishes them on schedule, handles timezone offsets automatically, and saves recent logs to your dashboard.",
        bullets: [
            "⏰ Content calendar timeline view",
            "🌍 Advanced global timezone sync",
            "📊 Queue feeding and status reports"
        ]
    },
];

export default function HowItWorks() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleIndex = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="how-it-works" className="py-24 bg-[#121214] text-zinc-100 border-t border-[#242429]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
                <ScrollReveal variant="flipUp" delay={0.1}>
                    <div className="text-center mb-16">
                        <div className="mb-6 inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full">
                            <CheckCircleIcon className="size-3.5" />
                            <span>Simple setup</span>
                        </div>
                        <h2 className="font-sans font-extrabold text-4xl sm:text-5xl leading-tight text-white tracking-tight">
                            Up and running in <span className="text-orange-500 italic">minutes</span>
                        </h2>
                        <p className="mt-5 text-zinc-400 text-sm max-w-lg mx-auto leading-relaxed">No complicated onboarding, no steep learning curve. Just connect, create, and grow.</p>
                    </div>
                </ScrollReveal>

                <div className="space-y-4">
                    {steps.map((s, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <ScrollReveal key={s.step} variant="flipUp" delay={i * 0.15} duration={0.6}>
                                <SpotlightCard
                                    spotlightColor="rgba(255, 107, 0, 0.18)"
                                    className={`p-6 rounded-2xl bg-[#1a1a1e] border transition-all duration-300 cursor-pointer select-none ${
                                        isOpen ? 'border-orange-500/60 shadow-lg shadow-orange-500/5' : 'border-[#2c2c33] hover:border-zinc-700'
                                    }`}
                                    onClick={() => toggleIndex(i)}
                                >
                                    <div className="flex gap-5 items-center justify-between">
                                        <div className="flex gap-5 items-center">
                                            <div className={`shrink-0 size-10 rounded-xl flex items-center justify-center border transition-colors ${
                                                isOpen ? 'bg-orange-500/20 border-orange-500/40' : 'bg-[#202025] border-[#2c2c33]'
                                            }`}>
                                                <span className={`text-xs font-bold ${isOpen ? 'text-orange-400' : 'text-zinc-400'}`}>{s.step}</span>
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold text-sm sm:text-base">{s.title}</h3>
                                                <p className="text-zinc-400 text-xs mt-0.5">{s.description}</p>
                                            </div>
                                        </div>
                                        <div className="shrink-0 ml-4">
                                            <ChevronDownIcon className={`size-4 text-zinc-400 transition-transform duration-300 ${
                                                isOpen ? 'rotate-180 text-orange-400' : ''
                                            }`} />
                                        </div>
                                    </div>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-5 mt-4 border-t border-[#2c2c33] space-y-4">
                                                    <p className="text-zinc-350 text-[11px] sm:text-xs leading-relaxed">
                                                        {s.details}
                                                    </p>
                                                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                        {s.bullets.map((b) => (
                                                            <li key={b} className="p-3 rounded-xl bg-[#202025] border border-[#2c2c33] text-[10px] sm:text-xs text-zinc-300 font-medium">
                                                                {b}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </SpotlightCard>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
