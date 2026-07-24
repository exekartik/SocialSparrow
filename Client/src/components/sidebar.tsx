import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sparkles, 
  Calendar, 
  Users, 
  X,
  Bird,
  Plus
} from 'lucide-react';
import SpecularButton from './SpecularButton';

import toast from 'react-hot-toast';

interface SidebarProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  setisOpen?: (open: boolean) => void;
}

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'AI Composer', path: '/AIcomposer', icon: Sparkles },
  { name: 'Scheduler', path: '/scheduler', icon: Calendar },
  { name: 'Accounts', path: '/accounts', icon: Users },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, setIsOpen, setisOpen }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    if (setIsOpen) setIsOpen(false);
    if (setisOpen) setisOpen(false);
  };

  const handleCreatePost = () => {
    handleClose();
    navigate('/AIcomposer');
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#18181c] border-r border-[#242429] text-zinc-200 flex flex-col transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Header / Logo */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-[#242429]">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <Bird className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg text-white tracking-wide">
            Social<span className="text-orange-500">Sparrow</span>
          </span>
        </NavLink>
        <button
          onClick={handleClose}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#242429] md:hidden transition-colors"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* CTA Button Section */}
      <div className="px-4 pt-5 pb-2">
        <SpecularButton
          size="sm"
          radius={14}
          tint="#ff6b00"
          tintOpacity={0.2}
          blur={4}
          textColor="#ffffff"
          lineColor="#ff9d42"
          baseColor="#7c2d12"
          intensity={1.3}
          shineSize={14}
          shineFade={35}
          thickness={1.2}
          speed={0.4}
          followMouse
          proximity={200}
          autoAnimate={false}
          className="w-full justify-center gap-2 py-2.5 shadow-orange-500/10 font-semibold"
          onClick={handleCreatePost}
        >
          <Plus className="w-4 h-4 text-orange-400" />
          <span>Create Post</span>
        </SpecularButton>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 pb-2 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
          Menu
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30 shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-[#242429]'
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Profile badge / workspace info */}
      <div className="p-4 border-t border-[#242429] space-y-2">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#202025] border border-[#2c2c33]">
          <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-bold text-xs">
            SS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-zinc-200 truncate">SocialSparrow Workspace</p>
            <p className="text-[10px] text-orange-400 font-medium truncate">Pro Plan</p>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast.success("Signed out of workspace");
            navigate('/login');
          }}
          className="w-full text-center py-2 text-xs font-semibold text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

