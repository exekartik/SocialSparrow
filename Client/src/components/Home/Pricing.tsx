import React, { useState } from "react";
import { CheckIcon, CircleCheckBigIcon, SparklesIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SpotlightCard from "../SpotlightCard";

const pricingPlans = [
    {
        name: "Starter",
        monthlyPrice: "$0",
        annualPrice: "$0",
        period: "/month",
        description: "Perfect for creators just getting started with social media automation.",
        features: [
            "2 connected social accounts",
            "10 scheduled posts/month",
            "AI content composer (5 credits/mo)",
            "Basic activity dashboard",
            "Standard community support"
        ],
        cta: "Get Started Free",
        highlight: false,
    },
    {
        name: "Pro Plan",
        monthlyPrice: "$29",
        annualPrice: "$23",
        period: "/month",
        description: "Everything you need to grow and automate your social presence at scale.",
        features: [
            "Unlimited social accounts",
            "Unlimited scheduled posts",
            "AI content composer (200 credits/mo)",
            "Auto hashtag optimizer",
            "Multi-platform thread composer",
            "Priority 24/7 customer support"
        ],
        cta: "Start 14-day Free Trial",
        highlight: true,
        badge: "MOST POPULAR"
    },
    {
        name: "Agency",
        monthlyPrice: "$79",
        annualPrice: "$63",
        period: "/month",
        description: "For growth teams and agencies managing multiple client brands.",
        features: [
            "Everything in Pro Plan",
            "Up to 5 team member seats",
            "Unlimited AI credits & generation",
            "Custom AI brand voice personas",
            "Dedicated account manager",
            "Custom API & webhook access"
        ],
        cta: "Contact Sales",
        highlight: false,
    },
];

export default function Pricing() {
    const [isAnnual, setIsAnnual] = useState(true);

    return (
        <section id="pricing" className="py-24 bg-[#121214] text-zinc-100 border-t border-[#242429]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-12">
                    <div className="mb-6 inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full">
                        <CircleCheckBigIcon className="size-3.5" />
                        <span>Simple &amp; Transparent</span>
                    </div>
                    <h2 className="font-sans font-extrabold text-4xl sm:text-5xl leading-tight text-white tracking-tight">
                        Plans for every stage
                        <br />
                        <span className="text-orange-500 italic">of growth</span>
                    </h2>
                    <p className="mt-5 text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
                        Start free, upgrade when you're ready. Cancel anytime — no hidden fees or contracts.
                    </p>

                    {/* Billing Toggle (Monthly / Annual) */}
                    <div className="mt-8 inline-flex items-center gap-3 p-1.5 bg-[#1a1a1e] border border-[#2c2c33] rounded-full select-none">
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                                !isAnnual ? "bg-[#282830] text-white shadow-sm" : "text-zinc-400 hover:text-zinc-200"
                            }`}
                        >
                            Monthly Billed
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                                isAnnual ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25" : "text-zinc-400 hover:text-zinc-200"
                            }`}
                        >
                            <span>Annual Billed</span>
                            <span className="bg-white/20 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded-full">
                                SAVE 20%
                            </span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pt-4">
                    {pricingPlans.map((plan) => {
                        const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
                        return (
                            <SpotlightCard
                                key={plan.name}
                                spotlightColor={plan.highlight ? "rgba(255, 107, 0, 0.35)" : "rgba(255, 107, 0, 0.15)"}
                                className={`rounded-3xl border p-8 flex flex-col justify-between relative transition-all duration-300 ${
                                    plan.highlight
                                        ? "bg-gradient-to-b from-[#22222a] via-[#1a1a1e] to-[#16161a] text-white border-orange-500/70 shadow-2xl shadow-orange-500/10"
                                        : "bg-[#1a1a1e] text-zinc-100 border-[#2c2c33] hover:border-zinc-700"
                                }`}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-4 h-7">
                                        <div className={`text-xs font-extrabold uppercase tracking-widest ${plan.highlight ? "text-orange-400" : "text-zinc-400"}`}>
                                            {plan.name}
                                        </div>
                                        {plan.highlight && (
                                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] font-extrabold uppercase tracking-widest shadow-md shadow-orange-500/20">
                                                <SparklesIcon className="size-3 text-white" />
                                                <span>{plan.badge}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-baseline gap-1.5 mb-3">
                                        <span className="text-5xl font-black text-white tracking-tight">{price}</span>
                                        {price !== "$0" && (
                                            <span className="text-xs text-zinc-400 font-medium">{plan.period}</span>
                                        )}
                                    </div>
                                    <p className="text-xs text-zinc-400 leading-relaxed mb-8 min-h-[36px]">{plan.description}</p>

                                    <div className="pt-6 border-t border-[#2c2c33] mb-8">
                                        <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-4">
                                            Included Features:
                                        </div>
                                        <ul className="space-y-3">
                                            {plan.features.map((f) => (
                                                <li key={f} className="flex items-start gap-3 text-xs text-zinc-300">
                                                    <div className="size-4 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/30 mt-0.5">
                                                        <CheckIcon className="w-2.5 h-2.5" />
                                                    </div>
                                                    <span className="leading-snug">{f}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Link
                                        to="/login"
                                        className={`block w-full text-center font-bold text-xs px-6 py-3.5 rounded-2xl transition-all shadow-md ${
                                            plan.highlight
                                                ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/25"
                                                : "bg-[#242429] hover:bg-[#2c2c33] text-zinc-200 border border-[#2c2c33] hover:text-white"
                                        }`}
                                    >
                                        {plan.cta}
                                    </Link>
                                </div>
                            </SpotlightCard>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

