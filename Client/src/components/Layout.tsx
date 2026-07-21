import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './sidebar';
import { Menu, Bell, Search } from 'lucide-react';

const Layout: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const getPageTitle = (pathname: string) => {
        switch (pathname) {
            case '/dashboard':
                return 'Dashboard';
            case '/AIcomposer':
                return 'AI Composer';
            case '/scheduler':
                return 'Scheduler';
            case '/accounts':
                return 'Accounts';
            default:
                return 'SocialSparrow';
        }
    };

    return (
        <div className="flex h-screen w-full bg-[#121214] text-zinc-100 font-sans overflow-hidden">
            {/* Mobile backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md md:hidden transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar component */}
            <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} setisOpen={setIsMobileMenuOpen} />

            {/* Main view container */}
            <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[#121214]">
                {/* Top Header Plate */}
                <header className="h-16 border-b border-[#242429] bg-[#18181c]/80 backdrop-blur-md px-4 md:px-6 flex items-center justify-between z-10 shrink-0">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-[#242429] rounded-xl md:hidden transition-colors"
                            aria-label="Toggle Navigation"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h1 className="text-base md:text-lg font-semibold text-zinc-100 tracking-tight">
                            {getPageTitle(location.pathname)}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative hidden sm:block w-48 md:w-64">
                            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                className="w-full bg-[#202025] border border-[#2c2c33] rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-orange-500/70 focus:ring-1 focus:ring-orange-500/40 transition-colors"
                            />
                        </div>

                        <button className="p-2 text-zinc-400 hover:text-zinc-100 hover:bg-[#242429] rounded-xl transition-colors relative border border-transparent hover:border-[#2c2c33]">
                            <Bell className="w-4.5 h-4.5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full shadow-[0_0_8px_rgba(255,107,0,0.8)]"></span>
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 text-zinc-100 bg-[#121214]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;

