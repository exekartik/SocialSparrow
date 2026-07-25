import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import ScrollReveal from "../components/ScrollReveal";

export default function Terms() {
    return (
        <div className="min-h-screen bg-[#121214] text-zinc-100 font-sans overflow-hidden relative">
            <Navbar />

            {/* Background design elements */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

            <section className="relative pt-24 pb-20">
                <div className="max-w-3xl mx-auto px-5 sm:px-8">
                    {/* Legal Notice */}
                    <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs mb-10 text-center">
                        ⚠️ <strong>Disclaimer:</strong> These Terms of Service are a mock template only and must be reviewed by legal counsel before launch.
                    </div>

                    <ScrollReveal variant="fadeUp" delay={0.1}>
                        <h1 className="font-sans font-black text-4xl text-white tracking-tight mb-2">Terms of Service</h1>
                        <p className="text-zinc-500 text-xs mb-8">Last Updated: July 25, 2026</p>
                    </ScrollReveal>

                    <ScrollReveal variant="fadeUp" delay={0.2}>
                        <div className="prose prose-invert text-zinc-300 text-sm space-y-6 leading-relaxed">
                            <p>
                                Welcome to SocialSparrow! These Terms of Service govern your access to and use of our social scheduling platform, automated publication utilities, and AI composing engine.
                            </p>

                            <h2 className="font-sans font-bold text-lg text-white pt-4 border-t border-zinc-800/80">1. Acceptance of Terms</h2>
                            <p>
                                By creating an account or logging in to SocialSparrow, you agree to comply with and be bound by these terms. If you do not agree to these terms, you must not access or utilize our platform.
                            </p>

                            <h2 className="font-sans font-bold text-lg text-white pt-4 border-t border-zinc-800/80">2. Service Description</h2>
                            <p>
                                SocialSparrow is a multi-platform utility permitting users to plan, write, schedule, and publish posts to linked accounts on third-party networks (such as Instagram, Facebook, LinkedIn, Twitter/X). Availability and formatting capabilities depend heavily on the public API policies of these networks, which may change without notice.
                            </p>

                            <h2 className="font-sans font-bold text-lg text-white pt-4 border-t border-zinc-800/80">3. User Responsibilities & Rules</h2>
                            <p>
                                Users must comply with standard rules of conduct:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                                <li>You are responsible for keeping your credentials and active JWT sessions secure.</li>
                                <li>You must not use our scheduler to distribute spam, coordinate phishing schemes, or execute mass automated actions violating third-party platform terms.</li>
                                <li>You retain full ownership of media and text submitted; however, you grant SocialSparrow the authorization to process, transpile, and publish assets on your behalf.</li>
                            </ul>

                            <h2 className="font-sans font-bold text-lg text-white pt-4 border-t border-zinc-800/80">4. Subscriptions & Billing</h2>
                            <p>
                                Pricing plans and details are documented in our dashboard options. Subscription plans renew automatically on a recurring monthly or annual basis unless cancelled prior to the billing date.
                            </p>

                            <h2 className="font-sans font-bold text-lg text-white pt-4 border-t border-zinc-800/80">5. Limitation of Liability</h2>
                            <p>
                                SocialSparrow is provided "as is". We make no warranties regarding continuous publishing success, server uptime, or third-party API API modifications which are beyond our control.
                            </p>

                            <h2 className="font-sans font-bold text-lg text-white pt-4 border-t border-zinc-800/80">6. Termination</h2>
                            <p>
                                We reserve the right to suspend or terminate accounts that engage in platform abuse, malicious automation, or default on subscription balances.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <Footer />
        </div>
    );
}
