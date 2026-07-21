import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailIcon, LockIcon, ArrowRightIcon, User2Icon, Bird } from "lucide-react";

export default function Login() {
    const [loginState, setLoginState] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate("/dashboard");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#121214] text-zinc-100 flex items-center justify-center p-4">
            <div className="relative w-full max-w-md">
                <div className="bg-[#1a1a1e] border border-[#2c2c33] rounded-2xl shadow-2xl p-8">
                    <div className="flex flex-col items-center mb-8">
                        <Link to="/" className="flex items-center gap-3 group mb-2">
                            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
                                <Bird className="size-6" />
                            </div>
                            <span className="font-bold text-xl text-white tracking-wide">
                                Social<span className="text-orange-500">Sparrow</span>
                            </span>
                        </Link>
                        <p className="text-zinc-400 text-xs mt-1">
                            {loginState ? "Sign in to your SocialSparrow Workspace" : "Create your SocialSparrow account"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                        {!loginState && (
                            <div>
                                <label className="block mb-1.5 font-medium text-zinc-300">Name</label>
                                <div className="relative">
                                    <User2Icon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                                    <input 
                                        type="text" 
                                        required 
                                        placeholder="Enter your name" 
                                        className="w-full pl-10 pr-4 py-2.5 bg-[#202025] border border-[#2c2c33] text-zinc-100 placeholder-zinc-500 rounded-xl focus:outline-none focus:border-orange-500/70 focus:ring-1 focus:ring-orange-500/40 transition-colors" 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block mb-1.5 font-medium text-zinc-300">Email</label>
                            <div className="relative">
                                <MailIcon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                                <input 
                                    type="email" 
                                    required 
                                    placeholder="you@company.com" 
                                    className="w-full pl-10 pr-4 py-2.5 bg-[#202025] border border-[#2c2c33] text-zinc-100 placeholder-zinc-500 rounded-xl focus:outline-none focus:border-orange-500/70 focus:ring-1 focus:ring-orange-500/40 transition-colors" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-1.5 font-medium text-zinc-300">Password</label>
                            <div className="relative">
                                <LockIcon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                                <input 
                                    type="password" 
                                    required 
                                    placeholder="••••••••" 
                                    className="w-full pl-10 pr-4 py-2.5 bg-[#202025] border border-[#2c2c33] text-zinc-100 placeholder-zinc-500 rounded-xl focus:outline-none focus:border-orange-500/70 focus:ring-1 focus:ring-orange-500/40 transition-colors" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white font-semibold rounded-xl text-xs transition-all shadow-lg shadow-orange-500/20 disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                        >
                            {loading ? (
                                "Authenticating..."
                            ) : (
                                <>
                                    {loginState ? "Sign In to Workspace" : "Create Free Account"} <ArrowRightIcon className="size-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-xs text-zinc-400">
                        {loginState ? (
                            <>
                                Don't have an account?{" "}
                                <button onClick={() => setLoginState(false)} className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                                    Create one free
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <button onClick={() => setLoginState(true)} className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                                    Sign In
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

