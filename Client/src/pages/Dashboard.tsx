import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Send, 
  Sparkles, 
  ArrowUpRight, 
  Clock, 
  MoreHorizontal,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import SpecularButton from '../components/SpecularButton';
import { useNavigate } from 'react-router-dom';

const stats = [
  { label: 'Total Engagement', value: '48.2k', change: '+14.5%', isPositive: true, icon: TrendingUp },
  { label: 'Audience Reach', value: '124.8k', change: '+22.1%', isPositive: true, icon: Users },
  { label: 'Posts Published', value: '142', change: '+8 this week', isPositive: true, icon: Send },
  { label: 'AI Time Saved', value: '18.4 hrs', change: 'Top 5%', isPositive: true, icon: Sparkles },
];

const recentPosts = [
  {
    id: 1,
    title: 'Launching our new AI Social Scheduling Suite 🚀',
    platform: 'Twitter / X',
    status: 'Scheduled',
    time: 'Today at 5:00 PM',
    likes: '---',
    category: 'Product Updates',
  },
  {
    id: 2,
    title: 'Top 5 growth hacks for organic reach in 2026',
    platform: 'LinkedIn',
    status: 'Published',
    time: 'Yesterday at 2:30 PM',
    likes: '1,284',
    category: 'Growth Tips',
  },
  {
    id: 3,
    title: 'Behind the scenes: How we built SocialSparrow v2',
    platform: 'Instagram',
    status: 'Draft',
    time: 'Tomorrow at 10:00 AM',
    likes: '---',
    category: 'Behind The Scenes',
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner Plate */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1c1c20] via-[#24242b] to-[#1c1c20] p-6 md:p-8 border border-[#2c2c33] shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Engine Active</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Welcome back, <span className="text-orange-500">Kartik</span> 👋
            </h2>
            <p className="text-zinc-400 text-xs md:text-sm max-w-xl">
              Your scheduled posts are performing 22% better this week. Ready to craft your next viral campaign?
            </p>
          </div>
          <div className="shrink-0">
            <SpecularButton
              size="md"
              radius={14}
              tint="#ff6b00"
              tintOpacity={0.25}
              lineColor="#ff9d42"
              baseColor="#7c2d12"
              speed={0.4}
              intensity={1.3}
              onClick={() => navigate('/AIcomposer')}
              className="px-6 py-3 font-semibold text-sm shadow-lg shadow-orange-500/20"
            >
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>Compose with AI</span>
            </SpecularButton>
          </div>
        </div>
      </div>

      {/* Metric Cards Plate Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-[#1a1a1e] border border-[#2c2c33] hover:border-orange-500/40 transition-all duration-200 group hover:-translate-y-1 shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-400">{stat.label}</span>
                <div className="p-2 rounded-xl bg-[#242429] text-orange-400 group-hover:bg-orange-500/15 transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-bold text-white tracking-tight">{stat.value}</span>
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5">
                  {stat.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Plates Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Posts Plate (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#1a1a1e] border border-[#2c2c33] space-y-5 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#2c2c33] pb-4">
            <div>
              <h3 className="text-base font-bold text-white">Upcoming & Recent Posts</h3>
              <p className="text-xs text-zinc-400">Manage your queue across all platforms</p>
            </div>
            <button 
              onClick={() => navigate('/scheduler')}
              className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors"
            >
              <span>View Schedule</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {recentPosts.map((post) => (
              <div 
                key={post.id}
                className="p-4 rounded-xl bg-[#202025] border border-[#2c2c33] hover:border-zinc-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/20">
                      {post.platform}
                    </span>
                    <span className="text-xs text-zinc-500">•</span>
                    <span className="text-xs text-zinc-400">{post.category}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-100 truncate">{post.title}</h4>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 border-[#2c2c33] pt-3 sm:pt-0">
                  <div className="text-left sm:text-right">
                    <div className="flex items-center gap-1 text-xs text-zinc-400">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{post.time}</span>
                    </div>
                  </div>
                  <button className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-[#2c2c33] transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Launch & Platform Health Plate (1 col) */}
        <div className="p-6 rounded-2xl bg-[#1a1a1e] border border-[#2c2c33] space-y-5 shadow-lg">
          <div className="border-b border-[#2c2c33] pb-4">
            <h3 className="text-base font-bold text-white">Platform Status</h3>
            <p className="text-xs text-zinc-400">Connected social accounts</p>
          </div>

          <div className="space-y-3">
            {[
              { name: 'Twitter / X', status: 'Connected', handle: '@socialsparrow', icon: '🐦' },
              { name: 'LinkedIn', status: 'Connected', handle: 'SocialSparrow Inc.', icon: '💼' },
              { name: 'Instagram', status: 'Connected', handle: '@socialsparrow_app', icon: '📸' },
            ].map((acc, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-[#202025] border border-[#2c2c33] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#2a2a30] flex items-center justify-center text-base">
                    {acc.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-200">{acc.name}</p>
                    <p className="text-[11px] text-zinc-500">{acc.handle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Active</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button 
              onClick={() => navigate('/accounts')}
              className="w-full py-2.5 rounded-xl bg-[#242429] hover:bg-[#2c2c33] border border-[#2c2c33] text-xs font-semibold text-zinc-200 hover:text-white transition-colors"
            >
              Manage Accounts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;