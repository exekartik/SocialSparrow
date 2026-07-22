import { Link } from "react-router-dom";
import { ArrowRightIcon, Sparkles } from "lucide-react";
import SpecularButton from "../SpecularButton";
import TiltedCard from "../TiltedCard";
import Meteors from "../Meteors";

export default function CTA() {
    return (
        <section className="py-20 bg-[#121214] text-zinc-100 border-t border-[#242429]">
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
                <TiltedCard
                    rotateAmplitude={5}
                    scaleOnHover={1.01}
                    showMobileWarning={false}
                    showTooltip={false}
                    className="w-full"
                >
                    <div className="relative rounded-3xl overflow-hidden p-12 sm:p-16 text-center bg-[#1c1c20] border border-[#2c2c33] shadow-2xl group transition-all duration-300 hover:border-orange-500/30 w-full">
                        {/* Orange glow blobs */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 group-hover:bg-orange-500/15" />
                        <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 group-hover:bg-amber-500/15" />

                        {/* Orange Meteors Effect */}
                        <Meteors number={25} />

                        <div className="relative z-10">
                            <div className="mb-6 inline-flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full">
                                <Sparkles className="size-3.5 text-orange-400" />
                                <span>Ready to grow?</span>
                            </div>
                            <h2 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl leading-tight text-white tracking-tight">
                                Automate your social
                                <br />
                                <span className="text-orange-500 italic">media today</span>
                            </h2>
                            <p className="mt-6 text-zinc-400 max-w-lg mx-auto text-sm leading-relaxed">
                                Join thousands of creators and marketers who trust SocialSparrow to grow their audience on autopilot.
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
                                        <span>Get Started Free</span>
                                        <ArrowRightIcon className="size-4 text-orange-400" />
                                    </SpecularButton>
                                </Link>
                                <a href="#pricing" className="bg-[#242429] text-zinc-200 border border-[#2c2c33] hover:bg-[#2c2c33] hover:text-white rounded-xl font-semibold inline-flex items-center gap-2 text-sm px-8 py-4 w-full sm:w-auto justify-center transition-all">
                                    View Pricing
                                </a>
                            </div>

                            <p className="mt-6 text-xs text-zinc-500">No credit card required · Cancel anytime</p>
                        </div>
                    </div>
                </TiltedCard>
            </div>
        </section>
    );
}

