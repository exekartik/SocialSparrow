import { Sparkles, MapPin, Briefcase, Heart, Globe } from "lucide-react";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import ScrollReveal from "../components/ScrollReveal";
import SpotlightCard from "../components/SpotlightCard";

const values = [
    {
        title: "Remote-First Team",
        desc: "We work asynchronously across continents. You design your own hours, workspace, and balance.",
        icon: <Globe className="size-6 text-orange-500" />
    },
    {
        title: "Ownership Mentality",
        desc: "We don't micro-manage. We agree on the roadmap goals and let you architect the details autonomously.",
        icon: <Briefcase className="size-6 text-orange-500" />
    },
    {
        title: "Healthy Work-Life",
        desc: "No forced night shifts or weekend crunches. We built a scheduler so we could enjoy our free time, and we expect you to do the same.",
        icon: <Heart className="size-6 text-orange-500" />
    }
];

const jobs = [
    {
        title: "Senior Full-Stack Engineer (Node.js/React)",
        department: "Engineering",
        location: "Remote (Global)",
        type: "Full-Time"
    },
    {
        title: "Product Designer (UI/UX)",
        department: "Design",
        location: "Remote (Global)",
        type: "Full-Time"
    },
    {
        title: "Growth & Content Marketing Lead",
        department: "Growth",
        location: "Remote (Global)",
        type: "Contract / Full-Time"
    }
];

export default function Careers() {
    return (
        <div className="min-h-screen bg-[#121214] text-zinc-100 font-sans overflow-hidden relative">
            <Navbar />

            {/* Background design elements */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.06)_0%,transparent_70%)] pointer-events-none" />

            {/* Hero */}
            <section className="relative pt-24 pb-16 text-center">
                <div className="max-w-4xl mx-auto px-5 sm:px-8">
                    <ScrollReveal variant="grow" delay={0.1}>
                        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-8">
                            <Sparkles className="size-3.5 text-orange-400" />
                            <span>Work at SocialSparrow</span>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal variant="fadeUp" delay={0.2}>
                        <h1 className="font-sans font-extrabold text-5xl sm:text-6xl text-white tracking-tight leading-tight">
                            Build the future of
                            <br />
                            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent italic">social media tools.</span>
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal variant="fadeUp" delay={0.3}>
                        <p className="mt-8 text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                            Join a highly focused team building tools that creators, agencies, and small businesses use every day to escape context fatigue.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Values */}
            <section className="py-20 border-t border-[#242429] bg-[#141417]/40 relative">
                <div className="max-w-5xl mx-auto px-5 sm:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <ScrollReveal variant="grow" delay={0.1}>
                            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Our Culture</span>
                        </ScrollReveal>
                        <ScrollReveal variant="fadeUp" delay={0.2}>
                            <h2 className="font-sans font-extrabold text-3xl text-white tracking-tight mt-2">
                                Values we live and code by
                            </h2>
                        </ScrollReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((v, idx) => (
                            <ScrollReveal key={v.title} variant="fadeUp" delay={0.1 * (idx + 1)}>
                                <SpotlightCard spotlightColor="rgba(255, 107, 0, 0.15)" className="p-8 rounded-2xl bg-[#1a1a1e] border border-[#2c2c33] hover:border-orange-500/20 transition-all duration-300">
                                    <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl w-fit mb-6">
                                        {v.icon}
                                    </div>
                                    <h3 className="font-sans font-bold text-lg text-white mb-3">{v.title}</h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">{v.desc}</p>
                                </SpotlightCard>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-24 border-t border-[#242429] relative">
                <div className="max-w-4xl mx-auto px-5 sm:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <ScrollReveal variant="grow" delay={0.1}>
                            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">Apply Today</span>
                        </ScrollReveal>
                        <ScrollReveal variant="fadeUp" delay={0.2}>
                            <h2 className="font-sans font-extrabold text-3xl text-white tracking-tight mt-2">
                                Open Opportunities
                            </h2>
                        </ScrollReveal>
                    </div>

                    <div className="space-y-4">
                        {jobs.map((job, idx) => (
                            <ScrollReveal key={job.title} variant="fadeUp" delay={0.1 * (idx + 1)}>
                                <SpotlightCard spotlightColor="rgba(255, 107, 0, 0.2)" className="p-6 rounded-2xl bg-[#1c1c20] border border-[#2c2c33] hover:border-orange-500/30 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="font-sans font-bold text-lg text-white group-hover:text-orange-400 transition-colors">
                                            {job.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-zinc-500 mt-2 font-medium">
                                            <span className="flex items-center gap-1">
                                                <Briefcase className="size-3.5" />
                                                {job.department}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="size-3.5" />
                                                {job.location}
                                            </span>
                                        </div>
                                    </div>
                                    <a
                                        href="mailto:careers@socialsparrow.app"
                                        className="bg-[#242429] hover:bg-[#2c2c33] text-zinc-200 hover:text-white border border-[#2c2c33] rounded-xl font-semibold text-xs px-5 py-2.5 transition-all text-center shrink-0 w-full sm:w-auto"
                                    >
                                        Apply Now
                                    </a>
                                </SpotlightCard>
                            </ScrollReveal>
                        ))}

                        <ScrollReveal variant="grow" delay={0.4}>
                            <SpotlightCard spotlightColor="rgba(255, 107, 0, 0.1)" className="p-8 rounded-2xl bg-[#1a1a1e]/40 border border-dashed border-[#2c2c33] text-center max-w-xl mx-auto mt-12">
                                <h4 className="font-sans font-bold text-white mb-2">Don't see your role?</h4>
                                <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                                    We are always looking for exceptional engineers, marketers, and creators who care about building tools that save people busywork.
                                </p>
                                <a
                                    href="mailto:careers@socialsparrow.app"
                                    className="text-xs font-bold text-orange-400 hover:text-orange-300 transition-colors"
                                >
                                    Get in touch ➔
                                </a>
                            </SpotlightCard>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
