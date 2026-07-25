import { Sparkles, ArrowRight } from "lucide-react";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import ScrollReveal from "../components/ScrollReveal";
import SpotlightCard from "../components/SpotlightCard";

const featuredPost = {
    title: "10 AI Prompts That Will Write Your Social Media Copy For The Next Month",
    excerpt: "Stuck staring at a blank composer? We built 10 prompts that adapt to your tone, handle target audience constraints, and optimize for X, LinkedIn, and Instagram automatically.",
    category: "Strategy",
    author: "Kartik Singh",
    date: "July 24, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    link: "https://medium.com/@kartikvskumarsingh/10-ai-prompts-that-will-write-your-social-media-copy-for-the-next-month-c95fe4ef78d2"
};

const blogPosts = [
    {
        title: "How to Hack the LinkedIn Algorithm in 2026",
        excerpt: "Formatting, dwell time, and quick replies. Learn how the ranking weights have shifted toward professional value and how to adapt your scheduling structure.",
        category: "Growth",
        author: "Sarah Jenkins",
        date: "July 18, 2026",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
        link: "https://medium.com/@kartikvskumarsingh/the-2026-guide-to-hacking-the-linkedin-algorithm-what-actually-works-now-bf6d314abf28"
    },
    {
        title: "Tab Fatigue: The Silent Performance Killer in Social Agencies",
        excerpt: "Context-switching between 20 client accounts can drain copywriters' output. Here's a breakdown of client workspace partitioning systems that fix it.",
        category: "Productivity",
        author: "Devon Reed",
        date: "July 10, 2026",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&q=80"
    },
    {
        title: "Micro-Videos vs. Image Carousel Posts: Engagement Data Analyzed",
        excerpt: "We tracked 10,000 published media events across various verticals. The results show a surprising shift in reach dynamics on Instagram and TikTok.",
        category: "Analytics",
        author: "Marc DuPont",
        date: "July 02, 2026",
        readTime: "8 min read",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80"
    }
];

export default function Blog() {
    return (
        <div className="min-h-screen bg-[#121214] text-zinc-100 font-sans overflow-hidden relative">
            <Navbar />

            {/* Background design glows */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.06)_0%,transparent_70%)] pointer-events-none" />

            <section className="relative pt-24 pb-20">
                <div className="max-w-6xl mx-auto px-5 sm:px-8">
                    {/* Header */}
                    <div className="text-center mb-16 max-w-2xl mx-auto">
                        <ScrollReveal variant="grow" delay={0.1}>
                            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                                <Sparkles className="size-3.5 text-orange-400" />
                                <span>Resources & Strategy</span>
                            </div>
                        </ScrollReveal>
                        <ScrollReveal variant="fadeUp" delay={0.2}>
                            <h1 className="font-sans font-extrabold text-5xl text-white tracking-tight leading-tight">
                                SocialSparrow Blog
                            </h1>
                        </ScrollReveal>
                        <ScrollReveal variant="fadeUp" delay={0.3}>
                            <p className="mt-4 text-zinc-400 text-base">
                                Tips, updates, algorithms, and workflows for community managers aiming to scale.
                            </p>
                        </ScrollReveal>
                    </div>

                    {/* Featured Post */}
                    <ScrollReveal variant="flipUp" delay={0.2} duration={0.8} className="mb-16">
                        <a 
                            href={featuredPost.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block focus:outline-none group"
                        >
                            <SpotlightCard 
                                spotlightColor="rgba(255, 107, 0, 0.25)" 
                                className="rounded-3xl overflow-hidden bg-[#1c1c20] border border-[#2c2c33] hover:border-orange-500/30 transition-all duration-300 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8 cursor-pointer"
                            >
                                <div className="h-64 sm:h-80 lg:h-full rounded-2xl overflow-hidden relative block group-hover:opacity-95 transition-opacity">
                                    <img
                                        src={featuredPost.image}
                                        alt={featuredPost.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/20 text-orange-400 w-fit mb-4">
                                        {featuredPost.category}
                                    </span>
                                    <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-snug group-hover:text-orange-400 transition-colors block">
                                        {featuredPost.title}
                                    </h2>
                                    <p className="mt-4 text-sm text-zinc-400 leading-relaxed">
                                        {featuredPost.excerpt}
                                    </p>
                                    <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-6">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs text-zinc-300 font-bold font-sans">
                                                KS
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-white">{featuredPost.author}</div>
                                                <div className="flex items-center gap-2 text-[10px] text-zinc-500 mt-0.5">
                                                    <span>{featuredPost.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-orange-400 group-hover:text-orange-300 transition-colors">
                                            <span>Read Post</span>
                                            <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </SpotlightCard>
                        </a>
                    </ScrollReveal>

                    {/* Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {blogPosts.map((post, idx) => {
                            const postLink = post.link || "https://medium.com/@kartikvskumarsingh";
                            return (
                                <ScrollReveal key={post.title} variant="fadeUp" delay={0.1 * (idx + 1)}>
                                    <a 
                                        href={postLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="block h-full focus:outline-none group"
                                    >
                                        <SpotlightCard 
                                            spotlightColor="rgba(255, 107, 0, 0.15)" 
                                            className="rounded-2xl overflow-hidden bg-[#1c1c20] border border-[#2c2c33] hover:border-orange-500/30 hover:-translate-y-1 transition-all duration-300 shadow-lg flex flex-col h-full cursor-pointer"
                                        >
                                            <div className="h-48 overflow-hidden relative block group-hover:opacity-95 transition-opacity">
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="p-6 flex flex-col flex-1">
                                                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-400 w-fit mb-3">
                                                    {post.category}
                                                </span>
                                                <h3 className="font-sans font-bold text-lg text-white mb-2 leading-snug group-hover:text-orange-400 transition-colors block">
                                                    {post.title}
                                                </h3>
                                                <p className="text-zinc-400 text-xs leading-relaxed mb-6 flex-1">
                                                    {post.excerpt}
                                                </p>
                                                <div className="flex items-center justify-between border-t border-zinc-800/60 pt-4 mt-auto">
                                                    <div className="flex items-center gap-2">
                                                        <div className="size-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] text-zinc-400 font-bold font-sans">
                                                            {post.author.split(' ').map(n=>n[0]).join('')}
                                                        </div>
                                                        <div className="text-[10px] font-bold text-zinc-300">{post.author}</div>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs font-bold text-orange-400 group-hover:text-orange-300 transition-colors">
                                                        <span>Read Post</span>
                                                        <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </SpotlightCard>
                                    </a>
                                </ScrollReveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
