import Navbar from "../components/Home/Navbar";
import Hero from "../components/Home/Hero";
import Features from "../components/Home/Features";
import HowItWorks from "../components/Home/HowItWorks";
import Testimonials from "../components/Home/Testimonials";
import Pricing from "../components/Home/Pricing";
import CTA from "../components/Home/CTA";
import Footer from "../components/Home/Footer";
import LogoLoop from "../components/LogoLoop";
import { FaInstagram, FaLinkedin, FaFacebook, FaSnapchat, FaXTwitter } from "react-icons/fa6";

const socialLogos = [
    { node: <FaXTwitter className="text-zinc-400 hover:text-white transition-colors" />, title: "X (formerly Twitter)", href: "https://x.com" },
    { node: <FaLinkedin className="text-zinc-400 hover:text-[#0a66c2] transition-colors" />, title: "LinkedIn", href: "https://linkedin.com" },
    { node: <FaInstagram className="text-zinc-400 hover:text-[#e1306c] transition-colors" />, title: "Instagram", href: "https://instagram.com" },
    { node: <FaFacebook className="text-zinc-400 hover:text-[#1877f2] transition-colors" />, title: "Facebook", href: "https://facebook.com" },
    { node: <FaSnapchat className="text-zinc-400 hover:text-[#fffc00] transition-colors" />, title: "Snapchat", href: "https://snapchat.com" },
];

export default function Landing() {
    return (
        <div className="min-h-screen bg-[#121214] text-zinc-100 font-sans">
            <Navbar />
            <Hero />
            
            {/* Infinite Social Loop */}
            <div className="py-12 bg-[#16161a] border-y border-[#242429] overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 text-center mb-6">
                    <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                        Integrate & publish seamlessly across major networks
                    </p>
                </div>
                <div className="max-w-5xl mx-auto px-4">
                    <LogoLoop
                        logos={socialLogos}
                        speed={60}
                        direction="left"
                        logoHeight={32}
                        gap={80}
                        hoverSpeed={0}
                        scaleOnHover
                        fadeOut
                        fadeOutColor="#16161a"
                        ariaLabel="Supported Social Networks"
                    />
                </div>
            </div>

            <Features />
            <HowItWorks />
            <Testimonials />
            <Pricing />
            <CTA />
            <Footer />
        </div>
    );
}
