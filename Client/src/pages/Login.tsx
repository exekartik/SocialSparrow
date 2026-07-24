import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailIcon, LockIcon, ArrowRightIcon, User2Icon, Bird, Eye, EyeOff } from "lucide-react";
import AutumnLeavesCanvas from "../components/AutumnLeavesCanvas";
import TiltedCard from "../components/TiltedCard";
import api from "../api/axios";
import { useAuth } from "../context/authContext";

import toast from "react-hot-toast";

export default function Login() {
    const [loginState, setLoginState] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const endpoint = loginState ? "/auth/login" : "/auth/register";
            const payload = loginState ? { email, password } : { name, email, password };
            
            const res = await api.post(endpoint, payload);
            const data = res.data;
            const token = data.accessToken || data.token;

            if (token) {
                const userObj = data.user || { _id: "1", name: name || email.split("@")[0], email };
                authLogin(userObj, token);
                toast.success(loginState ? "Welcome back! Signed in successfully." : "Account created successfully!");
                navigate("/dashboard");
            }
        } catch (err: any) {
            console.error("Login Error:", err);
            const errMsg = err?.response?.data?.message || err?.message || "Authentication failed. Please check your credentials.";
            setError(errMsg);
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#121214] text-zinc-100 flex items-center justify-center p-4 overflow-hidden selection:bg-orange-500/30">
            {/* Background Japanese Autumn Wallpaper */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-35 scale-105 filter blur-[1px] transition-all duration-1000"
                style={{ backgroundImage: `url('/assets/japanese_autumn_bg.png')` }}
            />

            {/* Radial Gradient Overlays for Seamless Dark Blend */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-[#121214]/60 to-[#121214]/90 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-[#121214] pointer-events-none" />

            {/* Real-time Japanese Momiji & Ginkgo Falling Leaves Canvas */}
            <AutumnLeavesCanvas />

            {/* Glowing Ambient Background Lights */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Center Login Glassmorphism Card */}
            <div className="relative z-20 w-full max-w-md">
                <TiltedCard
                    rotateAmplitude={8}
                    scaleOnHover={1.02}
                    showMobileWarning={false}
                    showTooltip={false}
                >
                    <div className="relative bg-[#1a1a1e]/85 backdrop-blur-xl border border-[#2c2c33] hover:border-orange-500/30 rounded-2xl shadow-2xl shadow-orange-950/40 p-8 transition-all duration-300">
                    
                    <div className="flex flex-col items-center mb-8">
                        <Link to="/" className="flex items-center gap-3 group mb-2">
                            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform duration-300">
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

                    {error && (
                        <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium text-center">
                            {error}
                        </div>
                    )}

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
                                        className="w-full pl-10 pr-4 py-2.5 bg-[#202025]/90 border border-[#2c2c33] text-zinc-100 placeholder-zinc-500 rounded-xl focus:outline-none focus:border-orange-500/70 focus:ring-1 focus:ring-orange-500/40 transition-colors" 
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
                                    className="w-full pl-10 pr-4 py-2.5 bg-[#202025]/90 border border-[#2c2c33] text-zinc-100 placeholder-zinc-500 rounded-xl focus:outline-none focus:border-orange-500/70 focus:ring-1 focus:ring-orange-500/40 transition-colors" 
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
                                    type={showPassword ? "text" : "password"} 
                                    required 
                                    placeholder="••••••••" 
                                    className="w-full pl-10 pr-10 py-2.5 bg-[#202025]/90 border border-[#2c2c33] text-zinc-100 placeholder-zinc-500 rounded-xl focus:outline-none focus:border-orange-500/70 focus:ring-1 focus:ring-orange-500/40 transition-colors" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none cursor-pointer"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff className="size-4 text-orange-400" /> : <Eye className="size-4" />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-amber-500 text-white font-semibold rounded-xl text-xs transition-all shadow-lg shadow-orange-500/25 active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
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
                                <button onClick={() => { setError(null); setLoginState(false); }} className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                                    Create one free
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <button onClick={() => { setError(null); setLoginState(true); }} className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
                                    Sign In
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </TiltedCard>
        </div>
    </div>
);
}
