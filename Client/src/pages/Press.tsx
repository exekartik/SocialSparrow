import { Sparkles, Download, Mail, Copy } from "lucide-react";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import ScrollReveal from "../components/ScrollReveal";
import SpotlightCard from "../components/SpotlightCard";
import toast from "react-hot-toast";

const brandColors = [
    { name: "Electric Orange", hex: "#ff6b00", rgb: "rgb(255, 107, 0)" },
    { name: "Dark Graphite", hex: "#121214", rgb: "rgb(18, 18, 20)" },
    { name: "Slate Charcoal", hex: "#1c1c20", rgb: "rgb(28, 28, 32)" }
];

export default function Press() {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`Copied ${text} to clipboard!`);
    };

    return (
        <div className="min-h-screen bg-[#121214] text-zinc-100 font-sans overflow-hidden relative">
            <Navbar />

            {/* Background design elements */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.06)_0%,transparent_70%)] pointer-events-none" />

            <section className="relative pt-24 pb-20">
                <div className="max-w-4xl mx-auto px-5 sm:px-8">
                    {/* Header */}
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <ScrollReveal variant="grow" delay={0.1}>
                            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                                <Sparkles className="size-3.5 text-orange-400" />
                                <span>Media Relations</span>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal variant="fadeUp" delay={0.2}>
                            <h1 className="font-sans font-extrabold text-5xl text-white tracking-tight leading-tight">
                                Press Kit
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal variant="fadeUp" delay={0.3}>
                            <p className="mt-4 text-zinc-400 text-base">
                                Media assets, guidelines, and brand resources for SocialSparrow.
                            </p>
                        </ScrollReveal>
                    </div>

                    {/* Boilerplate */}
                    <ScrollReveal variant="fadeUp" delay={0.1}>
                        <SpotlightCard spotlightColor="rgba(255, 107, 0, 0.15)" className="p-8 rounded-2xl bg-[#1c1c20] border border-[#2c2c33] mb-12">
                            <h2 className="font-sans font-bold text-xl text-white mb-4">About SocialSparrow (Boilerplate)</h2>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                                SocialSparrow is an AI-powered social media scheduling and automation platform designed specifically for community managers, creators, and marketing agencies. It centralizes posting across Twitter/X, LinkedIn, Facebook, and Instagram into one calendar, leveraging native Google Gemini generative AI to write, adapt, and schedule engaging copy on autopilot.
                            </p>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Founded in 2026, SocialSparrow is remote-first and built by social media practitioners to eliminate tab fatigue, manual scheduling, and scheduling errors.
                            </p>
                        </SpotlightCard>
                    </ScrollReveal>

                    {/* Brand Assets */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {/* Logos */}
                        <ScrollReveal variant="fadeUp" delay={0.2}>
                            <SpotlightCard spotlightColor="rgba(255, 107, 0, 0.15)" className="p-8 rounded-2xl bg-[#1c1c20] border border-[#2c2c33] h-full flex flex-col justify-between">
                                <div>
                                    <h3 className="font-sans font-bold text-lg text-white mb-2">Logo Assets</h3>
                                    <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                                        Download high-resolution PNG and SVG files of the SocialSparrow logo, available in dark, light, and orange brand variations.
                                    </p>
                                </div>
                                <button
                                    onClick={() => toast.success("Logo pack download started (placeholder)!")}
                                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md shadow-orange-500/20"
                                >
                                    <Download className="size-4" />
                                    <span>Download Logo Pack (.zip)</span>
                                </button>
                            </SpotlightCard>
                        </ScrollReveal>

                        {/* Colors */}
                        <ScrollReveal variant="fadeUp" delay={0.3}>
                            <SpotlightCard spotlightColor="rgba(255, 107, 0, 0.15)" className="p-8 rounded-2xl bg-[#1c1c20] border border-[#2c2c33] h-full">
                                <h3 className="font-sans font-bold text-lg text-white mb-4">Brand Colors</h3>
                                <div className="space-y-4">
                                    {brandColors.map((color) => (
                                        <div key={color.hex} className="flex items-center justify-between border-b border-zinc-800/60 pb-3 last:border-b-0 last:pb-0">
                                            <div className="flex items-center gap-3">
                                                <div className="size-8 rounded-lg border border-[#2c2c33]" style={{ backgroundColor: color.hex }} />
                                                <div>
                                                    <div className="text-xs font-bold text-white">{color.name}</div>
                                                    <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{color.hex}</div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(color.hex)}
                                                className="p-1.5 bg-zinc-800/40 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors"
                                                title="Copy Hex"
                                            >
                                                <Copy className="size-3.5" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </SpotlightCard>
                        </ScrollReveal>
                    </div>

                    {/* Media Contact */}
                    <ScrollReveal variant="grow" delay={0.2}>
                        <SpotlightCard spotlightColor="rgba(255, 107, 0, 0.15)" className="p-8 rounded-2xl bg-[#1a1a1e] border border-[#2c2c33] text-center max-w-xl mx-auto">
                            <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-2xl w-fit mx-auto mb-6 text-orange-400">
                                <Mail className="size-6" />
                            </div>
                            <h3 className="font-sans font-bold text-lg text-white mb-2">Media & Press Inquiries</h3>
                            <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                                For inquiries, interviews, or additional press assets, please contact our relations team directly at:
                            </p>
                            <a
                                href="mailto:press@socialsparrow.app"
                                className="text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors font-mono"
                                onClick={() => copyToClipboard("press@socialsparrow.app")}
                            >
                                press@socialsparrow.app
                            </a>
                        </SpotlightCard>
                    </ScrollReveal>
                </div>
            </section>

            <Footer />
        </div>
    );
}
