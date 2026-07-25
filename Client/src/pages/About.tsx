import { Link } from "react-router-dom";
import { 
    ArrowRightIcon, 
    Sparkles, 
    Layers, 
    Target, 
    Users, 
    Calendar, 
    Zap, 
    CheckCircle2, 
    AlertCircle 
} from "lucide-react";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import SpecularButton from "../components/SpecularButton";
import TiltedCard from "../components/TiltedCard";
import ScrollReveal from "../components/ScrollReveal";
import SpotlightCard from "../components/SpotlightCard";

export default function About() {
    return (
        <div className="min-h-screen bg-[#121214] text-zinc-100 font-sans overflow-hidden relative">
            <Navbar />

            {/* Subtle background grid & glows */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.05)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.03)_0%,transparent_75%)] pointer-events-none" />

            {/* 1. HERO SECTION */}
            <section className="relative pt-24 pb-16 text-center">
                <div className="max-w-4xl mx-auto px-5 sm:px-8">
                    <ScrollReveal variant="grow" delay={0.1}>
                        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-8">
                            <Sparkles className="size-3.5 text-orange-400" />
                            <span>Behind the Sparrow</span>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal variant="fadeUp" delay={0.2}>
                        <h1 className="font-sans font-extrabold text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-tight">
                            We build for the people who
                            <br />
                            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent italic">keep the internet running.</span>
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal variant="fadeUp" delay={0.3}>
                        <p className="mt-8 text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                            SocialSparrow was created to rescue social media managers from tab fatigue, chaotic schedules, and manual midnight posting.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* 2. THE PROBLEM SECTION */}
            <section className="py-20 border-t border-[#242429] bg-[#141417]/40 relative">
                <div className="max-w-4xl mx-auto px-5 sm:px-8">
                    <ScrollReveal variant="fadeUp" delay={0.1}>
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-500 mb-3">
                            <AlertCircle className="size-4" />
                            <span>The Reality</span>
                        </div>
                        <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                            We know the grind because we've lived it.
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal variant="fadeUp" delay={0.2}>
                        <div className="mt-8 text-zinc-400 space-y-6 text-base sm:text-lg leading-relaxed">
                            <p>
                                If you manage social media, you know the routine. You're juggling five different platforms, switching tabs fifty times a day, and setting alarms for odd hours just to hit publish when your audience is active. 
                            </p>
                            <p>
                                There's no single view of what is going where, and the constant context-switching between different client accounts, brands, and tools drains your creative energy. You spend 80% of your time on manual busywork and only 20% on the strategy and content that actually moves the needle.
                            </p>
                            <p className="text-zinc-300 font-semibold italic border-l-2 border-orange-500 pl-4">
                                Social media management shouldn't feel like fighting a losing battle against copy-paste tabs. It should be about building connections.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* 3. OUR SOLUTION SECTION */}
            <section className="py-24 border-t border-[#242429] relative">
                <div className="max-w-5xl mx-auto px-5 sm:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <ScrollReveal variant="grow" delay={0.1}>
                            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">How it works</span>
                        </ScrollReveal>
                        <ScrollReveal variant="fadeUp" delay={0.2}>
                            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-2">
                                Composing & scheduling made elegant.
                            </h2>
                        </ScrollReveal>
                        <ScrollReveal variant="fadeUp" delay={0.3}>
                            <p className="text-zinc-400 text-sm sm:text-base mt-4">
                                SocialSparrow integrates all your accounts into one single dashboard, powered by local automation and smart AI.
                            </p>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Plan & Brainstorm",
                                desc: "Use our integrated Gemini AI generator to write hooks, full captions, and hashtag clusters in seconds, matching your brand's unique tone.",
                                icon: <Layers className="size-6 text-orange-500" />
                            },
                            {
                                step: "02",
                                title: "Visual Scheduler",
                                desc: "Schedule once and customize content for Instagram, X, Facebook, and LinkedIn. Drag-and-drop media with cloud processing handles the rest.",
                                icon: <Calendar className="size-6 text-orange-500" />
                            },
                            {
                                step: "03",
                                title: "Auto-Publish",
                                desc: "Sit back while our publisher pushes your content live at the absolute optimal windows for audience engagement, keeping your feed consistent.",
                                icon: <Target className="size-6 text-orange-500" />
                            }
                        ].map((s, idx) => (
                            <ScrollReveal key={s.title} variant="fadeUp" delay={0.1 * (idx + 1)}>
                                <SpotlightCard spotlightColor="rgba(255, 107, 0, 0.2)" className="p-8 rounded-2xl bg-[#1a1a1e] border border-[#2c2c33] hover:border-orange-500/20 transition-all duration-300 group relative">
                                    <div className="absolute top-4 right-6 text-6xl font-black text-zinc-800/30 group-hover:text-orange-500/10 transition-colors select-none font-sans">
                                        {s.step}
                                    </div>
                                    <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl w-fit mb-6">
                                        {s.icon}
                                    </div>
                                    <h3 className="font-sans font-bold text-xl text-white mb-3">{s.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{s.desc}</p>
                                </SpotlightCard>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. WHO IT'S FOR SECTION */}
            <section className="py-24 border-t border-[#242429] bg-[#141417]/40 relative">
                <div className="max-w-5xl mx-auto px-5 sm:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <ScrollReveal variant="grow" delay={0.1}>
                            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Tailored For You</span>
                        </ScrollReveal>
                        <ScrollReveal variant="fadeUp" delay={0.2}>
                            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-2">
                                Designed for every content workflow.
                            </h2>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            {
                                segment: "Solo Creators",
                                pain: "You are the writer, editor, designer, and publisher. We give you your time back.",
                                icon: <Zap className="size-5 text-orange-400" />
                            },
                            {
                                segment: "Social Media Managers",
                                pain: "Tired of tab fatigue and client reviews. Centralize everything in one layout.",
                                icon: <Users className="size-5 text-orange-400" />
                            },
                            {
                                segment: "Agencies & Teams",
                                pain: "Managing multiple brands is messy. Keep accounts segregated and organized.",
                                icon: <Layers className="size-5 text-orange-400" />
                            },
                            {
                                segment: "Small Business Owners",
                                pain: "You need an active online presence without taking hours away from running your shop.",
                                icon: <Target className="size-5 text-orange-400" />
                            }
                        ].map((item, idx) => (
                            <ScrollReveal key={item.segment} variant="grow" delay={0.05 * (idx + 1)}>
                                <SpotlightCard spotlightColor="rgba(255, 107, 0, 0.15)" className="p-6 rounded-2xl bg-[#1c1c20] border border-[#2c2c33] flex items-start gap-4 hover:border-orange-500/20 transition-all duration-300">
                                    <div className="p-2.5 bg-zinc-800/50 border border-[#2c2c33] rounded-xl text-orange-400 shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-sans font-bold text-base text-white">{item.segment}</h4>
                                        <p className="text-zinc-400 text-sm mt-1.5 leading-relaxed">{item.pain}</p>
                                    </div>
                                </SpotlightCard>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. OUR MISSION SECTION */}
            <section className="py-24 border-t border-[#242429] relative">
                <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center relative z-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

                    <ScrollReveal variant="grow" delay={0.1}>
                        <div className="size-12 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20 mx-auto mb-8">
                            <Zap className="size-6 text-white" />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal variant="fadeUp" delay={0.2}>
                        <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Our Mission</span>
                        <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-2 mb-6">
                            Less busywork, more strategy.
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal variant="fadeUp" delay={0.3}>
                        <p className="text-zinc-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
                            We believe that managing social media shouldn't feel like a second full-time job. The time you save should go back into your strategy, design, and creativity—not tedious copying and pasting.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* 6. WHY WE'RE DIFFERENT SECTION */}
            <section className="py-20 border-t border-[#242429] bg-[#141417]/40 relative">
                <div className="max-w-4xl mx-auto px-5 sm:px-8">
                    <ScrollReveal variant="fadeUp" delay={0.1}>
                        <span className="text-xs font-bold uppercase tracking-widest text-orange-500">The Difference</span>
                        <h2 className="font-sans font-extrabold text-3xl text-white tracking-tight mt-1 mb-6">
                            Why SocialSparrow?
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                        <ScrollReveal variant="fadeUp" delay={0.2}>
                            <SpotlightCard spotlightColor="rgba(255, 107, 0, 0.15)" className="p-6 rounded-2xl bg-[#1a1a1e] border border-[#2c2c33] hover:border-orange-500/20 transition-all duration-300 space-y-2">
                                <div className="flex items-center gap-2 font-bold text-white">
                                    <CheckCircle2 className="size-4 text-orange-500" />
                                    <span>AI-First, Not AI-Bolted-On</span>
                                </div>
                                <p className="text-zinc-400 leading-relaxed">
                                    We designed our AI Composer natively. Instead of a generic sidebar chatbot, our tool actively pre-fills templates, matches scheduling layouts, and saves you time in a single click.
                                </p>
                            </SpotlightCard>
                        </ScrollReveal>
                        <ScrollReveal variant="fadeUp" delay={0.3}>
                            <SpotlightCard spotlightColor="rgba(255, 107, 0, 0.15)" className="p-6 rounded-2xl bg-[#1a1a1e] border border-[#2c2c33] hover:border-orange-500/20 transition-all duration-300 space-y-2">
                                <div className="flex items-center gap-2 font-bold text-white">
                                    <CheckCircle2 className="size-4 text-orange-500" />
                                    <span>Built by Practitioners</span>
                                </div>
                                <p className="text-zinc-400 leading-relaxed">
                                    We didn't build a generic enterprise scheduler. We built the tool we wanted to use ourselves: lightning fast, intuitive, and focused purely on speed and execution.
                                </p>
                            </SpotlightCard>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* 7. CTA SECTION */}
            <section className="py-20 bg-[#121214] text-zinc-100 border-t border-[#242429]">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    <ScrollReveal variant="flipUp" delay={0.1} duration={0.8}>
                        <TiltedCard
                            rotateAmplitude={4}
                            scaleOnHover={1.01}
                            showMobileWarning={false}
                            showTooltip={false}
                            className="w-full"
                        >
                            <div className="relative rounded-3xl overflow-hidden p-12 sm:p-16 text-center bg-[#1c1c20] border border-[#2c2c33] shadow-2xl group transition-all duration-300 hover:border-orange-500/30 w-full">
                                {/* Orange glow blobs */}
                                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 group-hover:bg-orange-500/15" />
                                <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 group-hover:bg-amber-500/15" />

                                <div className="relative z-10">
                                    <h2 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl leading-tight text-white tracking-tight">
                                        Ready to escape the
                                        <br />
                                        <span className="text-orange-500 italic">context switching?</span>
                                    </h2>
                                    <p className="mt-6 text-zinc-400 max-w-lg mx-auto text-sm leading-relaxed">
                                        Try SocialSparrow today and save hours of posting busywork every single week.
                                    </p>

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
                                                className="w-full sm:w-auto px-10 py-4 font-bold text-sm shadow-xl shadow-orange-500/20"
                                            >
                                                <span>Try SocialSparrow Free</span>
                                                <ArrowRightIcon className="size-4 text-orange-400" />
                                            </SpecularButton>
                                        </Link>
                                    </div>
                                    <p className="mt-6 text-xs text-zinc-500">No credit card required · Setup in under 2 minutes</p>
                                </div>
                            </div>
                        </TiltedCard>
                    </ScrollReveal>
                </div>
            </section>

            <Footer />
        </div>
    );
}
