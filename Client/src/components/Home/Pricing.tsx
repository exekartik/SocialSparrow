import { CheckIcon, CircleCheckBigIcon } from "lucide-react";
import { Link } from "react-router-dom";

const pricingPlans = [
    {
        name: "Starter",
        price: "Free",
        period: "",
        description: "Perfect for creators just getting started with social media automation.",
        features: ["2 social accounts", "10 scheduled posts/month", "AI content (5 credits/mo)", "Basic dashboard"],
        cta: "Get Started Free",
        highlight: false,
    },
    {
        name: "Pro Plan",
        price: "$29",
        period: "/month",
        description: "Everything you need to grow and automate your social presence at scale.",
        features: ["Unlimited accounts", "Unlimited scheduling", "AI content (200 credits/mo)", "Priority support"],
        cta: "Start 14-day Free Trial",
        highlight: true,
    },
    {
        name: "Agency",
        price: "$79",
        period: "/month",
        description: "For teams and agencies managing multiple brands and client accounts.",
        features: ["Everything in Pro", "5 team members", "Unlimited AI credits", "Custom AI personas", "Dedicated support"],
        cta: "Contact Sales",
        highlight: false,
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-[#121214] text-zinc-100 border-t border-[#242429]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <div className="mb-6 inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full">
                        <CircleCheckBigIcon className="size-3.5" />
                        <span>Simple pricing</span>
                    </div>
                    <h2 className="font-sans font-extrabold text-4xl sm:text-5xl leading-tight text-white tracking-tight">
                        Plans for every stage
                        <br />
                        <span className="text-orange-500 italic">of growth</span>
                    </h2>
                    <p className="mt-5 text-zinc-400 text-sm max-w-md mx-auto">Start free, upgrade when you're ready. Cancel anytime — no hidden fees.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    {pricingPlans.map((plan) => (
                        <div 
                            key={plan.name} 
                            className={`rounded-2xl border p-7 flex flex-col justify-between relative transition-all duration-200 ${
                                plan.highlight 
                                    ? "bg-gradient-to-b from-[#24242b] to-[#1c1c20] text-white border-orange-500/60 shadow-xl shadow-orange-500/10 -translate-y-2" 
                                    : "bg-[#1a1a1e] text-zinc-100 border-[#2c2c33]"
                            }`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                                    Most Popular
                                </div>
                            )}

                            <div>
                                <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${plan.highlight ? "text-orange-400" : "text-zinc-400"}`}>
                                    {plan.name}
                                </div>
                                <div className="flex items-end gap-1 mb-3">
                                    <span className="text-4xl font-extrabold text-white tracking-tight">{plan.price}</span>
                                    <span className="text-xs text-zinc-400 mb-1">{plan.period}</span>
                                </div>
                                <p className="text-xs text-zinc-400 leading-relaxed mb-6">{plan.description}</p>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((f) => (
                                        <li key={f} className="flex items-center gap-2.5 text-xs text-zinc-300">
                                            <div className="size-4 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/30">
                                                <CheckIcon className="w-2.5 h-2.5" />
                                            </div>
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link 
                                to="/login" 
                                className={`w-full text-center font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md ${
                                    plan.highlight 
                                        ? "bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/25" 
                                        : "bg-[#242429] hover:bg-[#2c2c33] text-zinc-200 border border-[#2c2c33]"
                                }`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

