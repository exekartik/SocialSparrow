import { Link } from "react-router-dom";
import { ArrowRightIcon, Bird } from "lucide-react";

export default function Navbar() {
    const { user } = { user: false };

    return (
        <nav className="sticky top-0 z-50 bg-[#18181c]/80 backdrop-blur-lg border-b border-[#242429]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <Link to="/" onClick={() => scrollTo(0, 0)} className="flex items-center gap-3 group">
                    <div className="p-2 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                        <Bird className="size-5" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-wide">
                        Social<span className="text-orange-500">Sparrow</span>
                    </span>
                </Link>
                <div className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                    <a href="#features" className="hover:text-orange-400 transition-colors">
                        Features
                    </a>
                    <a href="#how-it-works" className="hover:text-orange-400 transition-colors">
                        How it works
                    </a>
                    <a href="#pricing" className="hover:text-orange-400 transition-colors">
                        Pricing
                    </a>
                </div>

                {user ? (
                    <Link to="/dashboard" className="flex items-center gap-1.5 text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl shadow-md shadow-orange-500/20 transition-colors">
                        Go to Dashboard <ArrowRightIcon className="size-3.5" />
                    </Link>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="text-xs font-semibold text-zinc-300 hover:text-white hidden sm:block transition-colors">
                            Sign In
                        </Link>
                        <Link to="/login" className="flex items-center gap-1.5 text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl shadow-md shadow-orange-500/20 transition-colors">
                            Get Started <ArrowRightIcon className="size-3.5" />
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

