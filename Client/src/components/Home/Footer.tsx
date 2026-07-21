import { Link } from "react-router-dom";
import { Bird } from "lucide-react";

const footerLinks = {
    Product: ["Features", "How it works", "Pricing", "Changelog"],
    Company: ["About", "Blog", "Careers", "Press"],
    Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

export default function Footer() {
    return (
        <footer className="bg-[#18181c] border-t border-[#242429] text-zinc-300">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link to="/" onClick={() => scrollTo(0, 0)} className="inline-flex items-center gap-3 mb-5 group">
                            <div className="p-2 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                                <Bird className="size-5" />
                            </div>
                            <span className="font-bold text-xl text-white tracking-wide">
                                Social<span className="text-orange-500">Sparrow</span>
                            </span>
                        </Link>
                        <p className="text-xs text-zinc-400 leading-relaxed max-w-xs">
                            The AI-powered social media scheduler that helps creators and teams grow faster with less effort.
                        </p>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <div className="text-xs font-bold uppercase tracking-wider mb-4 text-orange-400">{category}</div>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#242429]">
                    <p className="text-xs text-zinc-500">© {new Date().getFullYear()} SocialSparrow. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-xs text-zinc-400 hover:text-white transition-colors">
                            Terms of Service
                        </a>
                        <Link to="/login" className="text-xs text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

