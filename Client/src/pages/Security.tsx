import { ShieldCheck, Key, Lock, Server, Mail } from "lucide-react";
import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import ScrollReveal from "../components/ScrollReveal";

const securityFeatures = [
    {
        title: "OAuth-Based Connections",
        desc: "We never ask for or store your social network passwords. All publishing integrations use secure, encrypted OAuth tokens via Zernio connections.",
        icon: <Key className="size-6 text-orange-500" />
    },
    {
        title: "Hashed Token Safeguards",
        desc: "Active refresh tokens are SHA256 hashed prior to storage in Mongoose, ensuring that even in a DB breach, tokens cannot be hijacked.",
        icon: <Lock className="size-6 text-orange-500" />
    },
    {
        title: "Encrypted Data in Transit",
        desc: "All HTTP payloads between client, serverless functions, and third-party APIs are encrypted with industry-standard TLS protocols.",
        icon: <ShieldCheck className="size-6 text-orange-500" />
    },
    {
        title: "Secure Infrastructure",
        desc: "SocialSparrow backend operations run in Vercel's sandboxed serverless environments, isolated from persistent threat vulnerabilities.",
        icon: <Server className="size-6 text-orange-500" />
    }
];

export default function Security() {
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
                            <ShieldCheck className="size-3.5 text-orange-400" />
                            <span>Security First</span>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal variant="fadeUp" delay={0.2}>
                        <h1 className="font-sans font-extrabold text-5xl sm:text-6xl text-white tracking-tight leading-tight">
                            Security is built into
                            <br />
                            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 bg-clip-text text-transparent italic">everything we do.</span>
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal variant="fadeUp" delay={0.3}>
                        <p className="mt-8 text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                            We implement strict encryption and OAuth protocols to keep your social accounts and media assets fully protected.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Grid Features */}
            <section className="py-20 border-t border-[#242429] bg-[#141417]/40 relative">
                <div className="max-w-5xl mx-auto px-5 sm:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {securityFeatures.map((f, idx) => (
                            <ScrollReveal key={f.title} variant="fadeUp" delay={0.1 * (idx + 1)}>
                                <div className="p-8 rounded-2xl bg-[#1a1a1e] border border-[#2c2c33] hover:border-orange-500/20 transition-all duration-300 flex gap-4">
                                    <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl w-fit h-fit text-orange-500 shrink-0">
                                        {f.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-sans font-bold text-lg text-white mb-2">{f.title}</h3>
                                        <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Responsible Disclosure */}
            <section className="py-24 border-t border-[#242429] relative">
                <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
                    <ScrollReveal variant="grow" delay={0.1}>
                        <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-2xl w-fit mx-auto mb-6 text-orange-400">
                            <Mail className="size-6" />
                        </div>
                    </ScrollReveal>

                    <ScrollReveal variant="fadeUp" delay={0.2}>
                        <h2 className="font-sans font-extrabold text-3xl text-white tracking-tight">
                            Responsible Disclosure Policy
                        </h2>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-xl mx-auto mt-4 mb-6">
                            If you believe you have discovered a security vulnerability in our application, please report it immediately to our security response team at:
                        </p>
                        <a
                            href="mailto:security@socialsparrow.app"
                            className="text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors font-mono"
                        >
                            security@socialsparrow.app
                        </a>
                    </ScrollReveal>
                </div>
            </section>

            <Footer />
        </div>
    );
}
