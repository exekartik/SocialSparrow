import { Sparkles, Calendar } from "lucide-react";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import ScrollReveal from "../components/ScrollReveal";

const changelogData = [
    {
        version: "v1.2.0",
        date: "July 2026",
        title: "Stability Update & Serverless Optimizations",
        tags: [
            { label: "Improved", type: "improved" },
            { label: "Fixed", type: "fixed" }
        ],
        bullets: [
            "Fixed Mongoose model compilation checks to prevent database connection resets in serverless environments.",
            "Optimized Axios response interceptors to catch expired JWT sessions and prompt login seamlessly.",
            "Upgraded CORS origin validation regex to securely allow localhost variants in dev environments.",
            "Migrated server modules to modern CommonJS formatting to ensure zero downtime on serverless Vercel function deployments."
        ]
    },
    {
        version: "v1.1.0",
        date: "June 2026",
        title: "Google Gemini Composer Integration",
        tags: [
            { label: "Added", type: "added" },
            { label: "Improved", type: "improved" }
        ],
        bullets: [
            "Implemented AI Composer tab powered natively by the Google Gemini SDK for rapid post drafting.",
            "Added tone configurations allowing users to shift writing styles between Casual, Professional, Hype, and Witty.",
            "Refined post timeline view to update metrics in real-time when new posts are scheduled or modified."
        ]
    },
    {
        version: "v1.0.0",
        date: "May 2026",
        title: "SocialSparrow Official Launch",
        tags: [
            { label: "Added", type: "added" }
        ],
        bullets: [
            "Launch of multi-platform post scheduler supporting Twitter/X, LinkedIn, Facebook, and Instagram.",
            "Integrated secure OAuth profile linking and status management powered by Zernio integrations.",
            "Built drag-and-drop media uploads supported by Cloudinary CDN storage."
        ]
    }
];

export default function Changelog() {
    return (
        <div className="min-h-screen bg-[#121214] text-zinc-100 font-sans overflow-hidden relative">
            <Navbar />

            {/* Background design elements */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.06)_0%,transparent_70%)] pointer-events-none" />

            <section className="relative pt-24 pb-20">
                <div className="max-w-3xl mx-auto px-5 sm:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <ScrollReveal variant="grow" delay={0.1}>
                            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                                <Sparkles className="size-3.5 text-orange-400" />
                                <span>Product Updates</span>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal variant="fadeUp" delay={0.2}>
                            <h1 className="font-sans font-extrabold text-5xl text-white tracking-tight leading-tight">
                                Changelog
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal variant="fadeUp" delay={0.3}>
                            <p className="mt-4 text-zinc-400 text-base max-w-lg mx-auto">
                                Here's what's new in SocialSparrow. We regularly ship features, performance upgrades, and stability fixes.
                            </p>
                        </ScrollReveal>
                    </div>

                    {/* Timeline */}
                    <div className="relative border-l border-zinc-800 ml-4 sm:ml-6 space-y-12">
                        {changelogData.map((item, idx) => (
                            <ScrollReveal key={item.version} variant="fadeUp" delay={0.1 * (idx + 1)}>
                                <div className="relative pl-8 sm:pl-10">
                                    {/* Circle dot on vertical line */}
                                    <div className="absolute -left-[9px] top-1.5 size-4 rounded-full bg-[#121214] border-2 border-orange-500 flex items-center justify-center">
                                        <div className="size-1.5 rounded-full bg-orange-500" />
                                    </div>

                                    {/* Version Card */}
                                    <div className="p-6 sm:p-8 rounded-2xl bg-[#1c1c20] border border-[#2c2c33] hover:border-orange-500/20 transition-all duration-300">
                                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                            <div className="flex items-center gap-3">
                                                <span className="font-sans font-black text-xl text-white">{item.version}</span>
                                                <div className="flex gap-1.5">
                                                    {item.tags.map((t) => (
                                                        <span
                                                            key={t.label}
                                                            className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                                                t.type === "added"
                                                                    ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                                                                    : t.type === "improved"
                                                                    ? "bg-blue-500/10 border border-blue-500/20 text-blue-400"
                                                                    : "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                                                            }`}
                                                        >
                                                            {t.label}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                                                <Calendar className="size-3.5" />
                                                <span>{item.date}</span>
                                            </div>
                                        </div>

                                        <h3 className="font-sans font-bold text-lg text-white mb-4">{item.title}</h3>

                                        <ul className="space-y-3">
                                            {item.bullets.map((b, bIdx) => (
                                                <li key={bIdx} className="flex items-start gap-2.5 text-sm text-zinc-400 leading-relaxed">
                                                    <span className="mt-1.5 shrink-0 size-1.5 rounded-full bg-orange-500" />
                                                    <span>{b}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
