import { Link } from "react-router-dom";
import { ArrowRightIcon, DotIcon, Sparkles } from "lucide-react";
import SpecularButton from "../SpecularButton";
import TiltedCard from "../TiltedCard";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-[#121214] text-zinc-100">
            {/* Subtle grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

            {/* Orange soft radial glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.12)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-12 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-8">
                    <Sparkles className="size-3.5 text-orange-400" />
                    <span>AI-Powered Social Media Automation</span>
                </div>

                {/* Headline */}
                <h1 className="font-sans font-extrabold text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-white tracking-tight leading-none">
                    Schedule smarter.
                    <br />
                    <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent italic">Grow faster.</span>
                </h1>

                {/* Subheadline */}
                <p className="mt-7 text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                    SocialSparrow lets you create, schedule, and auto-engage across all your social platforms — powered by AI that writes high-converting posts for you.
                </p>

                {/* CTAs */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="/login" className="w-full sm:w-auto">
                        <SpecularButton
                            size="lg"
                            radius={16}
                            tint="#ff6b00"
                            tintOpacity={0.25}
                            lineColor="#ff9d42"
                            baseColor="#7c2d12"
                            speed={0.4}
                            intensity={1.3}
                            className="w-full sm:w-auto px-8 py-3.5 font-bold text-sm shadow-xl shadow-orange-500/20"
                        >
                            <span>Start for free</span>
                            <ArrowRightIcon className="size-4 text-orange-400" />
                        </SpecularButton>
                    </Link>
                    <a href="#how-it-works" className="bg-[#1c1c20] text-zinc-200 border border-[#2c2c33] hover:border-zinc-700 hover:text-white rounded-xl font-semibold inline-flex items-center gap-2 text-sm px-8 py-3.5 w-full sm:w-auto justify-center transition-all">
                        See how it works
                    </a>
                </div>

                <p className="mt-5 text-xs text-zinc-500">No credit card required · Free plan available</p>
            </div>

            {/* Dashboard Mockup Plate */}
            <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pb-12">
                <TiltedCard
                    rotateAmplitude={8}
                    scaleOnHover={1.02}
                    showMobileWarning={false}
                    showTooltip={false}
                >
                    <div className="rounded-2xl overflow-hidden border border-[#2c2c33] bg-[#1a1a1e] shadow-2xl">
                        {/* Browser chrome */}
                        <div className="flex items-center gap-2 px-4 py-3 bg-[#18181c] border-b border-[#242429]">
                            <div className="w-3 h-3 rounded-full bg-red-500/80" />
                            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                            <div className="flex-1 mx-4 rounded-lg h-5 max-w-xs bg-[#202025] border border-[#2c2c33] text-[10px] text-zinc-500 flex items-center px-3">
                                socialsparrow.app/dashboard
                            </div>
                        </div>

                        {/* Mock Content Plates */}
                        <div className="p-6 bg-[#121214] space-y-4">
                            {/* Stat row */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {[
                                    { val: "142", label: "Scheduled Posts" },
                                    { val: "48.2k", label: "Total Engagement" },
                                    { val: "4", label: "Connected Accounts" },
                                    { val: "18.4 hrs", label: "AI Time Saved" },
                                ].map((s) => (
                                    <div key={s.label} className="rounded-xl p-4 bg-[#1a1a1e] border border-[#2c2c33]">
                                        <div className="text-xl font-bold text-white tracking-tight">{s.val}</div>
                                        <div className="text-xs text-zinc-400 mt-1">{s.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Activity list */}
                            <div className="rounded-xl p-4 space-y-3 bg-[#1a1a1e] border border-[#2c2c33]">
                                <div className="text-[10px] font-semibold text-orange-400 uppercase tracking-widest mb-3">Live Feed Activity</div>
                                {[
                                    { text: "Post published to LinkedIn & Twitter", time: "2m ago" },
                                    { text: "AI generated 5 viral thread variations", time: "15m ago" },
                                    { text: "New campaign scheduled for tomorrow 9am", time: "1h ago" },
                                ].map((item) => (
                                    <div key={item.text} className="flex items-center gap-3">
                                        <DotIcon className="size-5 text-orange-500 shrink-0" />
                                        <span className="text-xs text-zinc-300 flex-1">{item.text}</span>
                                        <span className="text-[11px] text-zinc-500 shrink-0">{item.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </TiltedCard>
            </div>
        </section>
    );
}

