import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import ScrollReveal from "../components/ScrollReveal";
import SpotlightCard from "../components/SpotlightCard";

export default function Cookies() {
    return (
        <div className="min-h-screen bg-[#121214] text-zinc-100 font-sans overflow-hidden relative">
            <Navbar />

            {/* Background design elements */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

            <section className="relative pt-24 pb-20">
                <div className="max-w-3xl mx-auto px-5 sm:px-8">
                    {/* Legal Notice */}
                    <SpotlightCard spotlightColor="rgba(249, 115, 22, 0.25)" className="p-4 rounded-xl bg-[#1c1c20]/50 border border-orange-500/20 text-orange-400 text-xs mb-10 text-center">
                        ⚠️ <strong>Disclaimer:</strong> This Cookie Policy is a mock template only and must be reviewed by legal counsel before launch.
                    </SpotlightCard>

                    <ScrollReveal variant="fadeUp" delay={0.1}>
                        <h1 className="font-sans font-black text-4xl text-white tracking-tight mb-2">Cookie Policy</h1>
                        <p className="text-zinc-500 text-xs mb-8">Last Updated: July 25, 2026</p>
                    </ScrollReveal>

                    <ScrollReveal variant="fadeUp" delay={0.2}>
                        <div className="prose prose-invert text-zinc-300 text-sm space-y-6 leading-relaxed">
                            <p>
                                SocialSparrow uses cookies and tracking technologies to optimize authentication sessions and aggregate usage metrics. This Cookie Policy explains what cookies are, how we use them, and how you can manage your settings.
                            </p>

                            <h2 className="font-sans font-bold text-lg text-white pt-4 border-t border-zinc-800/80">1. What Are Cookies?</h2>
                            <p>
                                Cookies are small text files downloaded to your browser when you access websites. They are used to retain session information, keep you logged in across tabs, and document analytics preferences.
                            </p>

                            <h2 className="font-sans font-bold text-lg text-white pt-4 border-t border-zinc-800/80">2. Cookies We Utilize</h2>
                            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                                <li><strong>Essential Cookies</strong>: Vital for authentication. These keep your JWT session valid so you don't have to log in on every single navigation.</li>
                                <li><strong>Functional Cookies</strong>: Retain system preferences (like timezone or theme choice).</li>
                                <li><strong>Performance & Analytics Cookies</strong>: Track dashboard navigation events so we can find bottlenecks and improve page speed.</li>
                            </ul>

                            <h2 className="font-sans font-bold text-lg text-white pt-4 border-t border-zinc-800/80">3. Third-Party Cookies</h2>
                            <p>
                                Some external analytical tools and integration bridges (such as Google Analytics or Zernio login callbacks) may store third-party cookies on your device to validate external calls.
                            </p>

                            <h2 className="font-sans font-bold text-lg text-white pt-4 border-t border-zinc-800/80">4. Controlling Cookie Preferences</h2>
                            <p>
                                You can choose to reject or clear cookies through your browser settings. Be advised that disabling essential cookies will prevent you from logging in and scheduling content via the SocialSparrow dashboard.
                            </p>

                            <h2 className="font-sans font-bold text-lg text-white pt-4 border-t border-zinc-800/80">5. Contact</h2>
                            <p>
                                If you have questions regarding this Cookie Policy, reach out to us at: <a href="mailto:support@socialsparrow.app" className="text-orange-400 hover:text-orange-300 font-mono">support@socialsparrow.app</a>.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <Footer />
        </div>
    );
}
