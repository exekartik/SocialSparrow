import { CalendarDaysIcon, Wand2Icon, Share2Icon, ZapIcon, BarChart3Icon, HashIcon } from "lucide-react";

const features = [
    {
        icon: CalendarDaysIcon,
        title: "Smart Scheduling",
        description: "Queue posts across all platforms with a single click. Set it once and let us handle the rest.",
    },
    {
        icon: Wand2Icon,
        title: "AI Content Generator",
        description: "Generate on-brand captions and stunning posts with built-in AI. Never stare at a blank page again.",
    },
    {
        icon: BarChart3Icon,
        title: "Activity Dashboard",
        description: "Get a bird's eye view of all published posts, scheduled content, and engagement activity in one place.",
    },
    {
        icon: Share2Icon,
        title: "Multi-Platform Sync",
        description: "Connect Twitter, LinkedIn, Facebook, and Instagram. Post everywhere from one unified workspace.",
    },
    {
        icon: ZapIcon,
        title: "Instant Publishing",
        description: "Need to go live now? Publish immediately or schedule for peak engagement times with timezone support.",
    },
    {
        icon: HashIcon,
        title: "Hashtag Optimizer",
        description: "Get AI-powered hashtag suggestions to maximize post organic reach and audience growth.",
    },
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-[#121214] text-zinc-100 border-t border-[#242429]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <div className="mb-6 inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full">
                        <ZapIcon className="size-3.5" />
                        <span>Everything you need</span>
                    </div>
                    <h2 className="font-sans text-4xl sm:text-5xl font-extrabold leading-tight text-white tracking-tight">
                        Automate your entire
                        <br />
                        <span className="text-orange-500 italic">social media workflow</span>
                    </h2>
                    <p className="mt-5 text-zinc-400 max-w-xl mx-auto text-sm leading-relaxed">From content creation to scheduling — SocialSparrow handles it all so you can focus on what matters most.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((f) => (
                        <div key={f.title} className="bg-[#1a1a1e] rounded-2xl border border-[#2c2c33] p-6 hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-200 group shadow-md">
                            <div className="size-10 rounded-xl bg-orange-500/15 border border-orange-500/25 text-orange-400 flex items-center justify-center mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                <f.icon className="size-5" />
                            </div>
                            <h3 className="text-white font-bold text-base mb-2">{f.title}</h3>
                            <p className="text-xs text-zinc-400 leading-relaxed">{f.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

