import Navbar from "../components/Home/Navbar";
import Footer from "../components/Home/Footer";
import ScrollReveal from "../components/ScrollReveal";
import SpotlightCard from "../components/SpotlightCard";

export default function Privacy() {
    return (
        <div className="min-h-screen bg-[#121214] text-zinc-100 font-sans overflow-hidden relative">
            <Navbar />

            {/* Background design elements */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />

            <section className="relative pt-24 pb-20">
                <div className="max-w-3xl mx-auto px-5 sm:px-8">
                    {/* Legal Notice */}
                    <SpotlightCard spotlightColor="rgba(249, 115, 22, 0.25)" className="p-4 rounded-xl bg-[#1c1c20]/50 border border-orange-500/20 text-orange-400 text-xs mb-10 text-center">
                        ⚠️ <strong>Disclaimer:</strong> This Privacy Policy is a mock template only and must be reviewed by legal counsel before launch.
                    </SpotlightCard>

                    <ScrollReveal variant="fadeUp" delay={0.1}>
                        <h1 className="font-sans font-black text-4xl text-white tracking-tight mb-2">Privacy Policy</h1>
                        <p className="text-zinc-500 text-xs mb-8">Last Updated: July 25, 2026</p>
                    </ScrollReveal>

                    <ScrollReveal variant="fadeUp" delay={0.2}>
                        <div className="prose prose-invert text-zinc-300 text-sm space-y-6 leading-relaxed">
                            <p>
                                At SocialSparrow, we care about the privacy of our users. This privacy policy describes the types of information we collect, how we process it, and how we keep it secure when you link your social media profiles to our platform.
                            </p>

                            <h2 className="font-sans font-bold text-lg text-white pt-4 border-t border-zinc-800/80">1. Information We Collect</h2>
                            <p>
                                We collect information that you directly provide to us, as well as data gathered automatically when you utilize our services:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                                <li><strong>Account Profile Data</strong>: Name, email address, password hash, and system preferences.</li>
                                <li><strong>Connected Accounts Permissions</strong>: OAuth access tokens, profile usernames, avatar images, and publishing authorizations for Twitter/X, Instagram, Facebook, and LinkedIn.</li>
                                <li><strong>Content Data</strong>: Draft post text, images, video assets, scheduling timestamps, and historical metrics.</li>
                            </ul>

                            <h2 className="font-sans font-bold text-lg text-white pt-4 border-t border-zinc-800/80">2. How We Use Your Information</h2>
                            <p>
                                The collected data is used exclusively to facilitate automated publishing services:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                                <li>Initiating API request calls to social network publishers on your scheduled dates.</li>
                                <li>Processing generation scripts in Google Gemini AI blocks for draft enhancements.</li>
                                <li>Documenting execution feed items on your dashboard's activity logs.</li>
                            </ul>

                            <h2 className="font-sans font-bold text-lg text-white pt-4 border-t border-zinc-800/80">3. Data Sharing & Third-Party APIs</h2>
                            <p>
                                SocialSparrow connects to third-party APIs (specifically Zernio and official social network developer portals). We only transfer post data to platforms you have explicitly connected and authorized. We do **not** sell, trade, or distribute your email or content credentials to third-party advertisements.
                            </p>

                            <h2 className="font-sans font-bold text-lg text-white pt-4 border-t border-zinc-800/80">4. Retention and Security</h2>
                            <p>
                                OAuth credentials and tokens are encrypted and handled using secure OAuth flow guidelines. Password inputs are encrypted using standard bcrypt hashing. You can revoke SocialSparrow access and delete your entire account history at any time from your settings panel.
                            </p>

                            <h2 className="font-sans font-bold text-lg text-white pt-4 border-t border-zinc-800/80">5. Contact Us</h2>
                            <p>
                                For inquiries about our data practices, please reach out to our team at: <a href="mailto:privacy@socialsparrow.app" className="text-orange-400 hover:text-orange-300 font-mono">privacy@socialsparrow.app</a>.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            <Footer />
        </div>
    );
}
