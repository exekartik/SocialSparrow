import { useEffect, useState } from 'react';
import { 
  Users, 
  Send, 
  Sparkles, 
  ArrowUpRight, 
  Clock, 
  CheckCircle2, 
  Calendar,
  Trash2
} from 'lucide-react';
import SpecularButton from '../components/SpecularButton';
import { useNavigate } from 'react-router-dom';
import apiFetch from '../api';
import toast from 'react-hot-toast';

import CoolLoadingSpinner from '../components/CoolLoadingSpinner';

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [activities, setActivities] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load stored user or fetch profile
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {}
    }

    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const [actData, postData, accData] = await Promise.allSettled([
          apiFetch('/activity'),
          apiFetch('/posts'),
          apiFetch('/accounts/get-account'),
        ]);

        if (actData.status === 'fulfilled' && actData.value.data) {
          setActivities(actData.value.data);
        }
        if (postData.status === 'fulfilled') {
          const fetchedPosts = Array.isArray(postData.value) ? postData.value : (postData.value.data || []);
          setPosts(fetchedPosts);
        }
        if (accData.status === 'fulfilled' && accData.value.data) {
          setAccounts(accData.value.data);
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleDeleteActivity = async (id: string) => {
    try {
      await apiFetch(`/activity/${id}`, { method: 'DELETE' });
      setActivities(prev => prev.filter(act => act._id !== id));
      toast.success("Activity item deleted");
    } catch (err: any) {
      console.error("Delete activity error:", err);
      toast.error(err?.message || "Failed to delete activity item");
    }
  };

  if (loading) {
    return <CoolLoadingSpinner text="Syncing Dashboard Metrics..." subtext="Fetching recent activities and connected platforms..." />;
  }

  const scheduledCount = posts.filter(p => p.status === 'scheduled').length;
  const publishedCount = posts.filter(p => p.status === 'published').length;

  const stats = [
    { label: 'Scheduled Posts', value: String(scheduledCount), change: 'Upcoming queue', isPositive: true, icon: Calendar },
    { label: 'Posts Published', value: String(publishedCount), change: 'Live across platforms', isPositive: true, icon: Send },
    { label: 'Connected Accounts', value: String(accounts.length), change: 'Active profiles', isPositive: true, icon: Users },
    { label: 'AI Time Saved', value: '18.4 hrs', change: 'Top 5%', isPositive: true, icon: Sparkles },
  ];

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
              Welcome back, <span className="text-orange-500">{user?.name || "Kartik"}</span> 👋
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
              className="px-6 py-3 font-semibold text-sm shadow-lg shadow-orange-500/20 cursor-pointer"
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
        {/* Recent Posts & Live Activity Feed (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#1a1a1e] border border-[#2c2c33] space-y-5 shadow-lg">
          <div className="flex items-center justify-between border-b border-[#2c2c33] pb-4">
            <div>
              <h3 className="text-base font-bold text-white">Upcoming Queue & Activity Log</h3>
              <p className="text-xs text-zinc-400">Live events & publication history</p>
            </div>
            <button 
              onClick={() => navigate('/scheduler')}
              className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>View Schedule</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {activities.length > 0 ? (
              activities.slice(0, 5).map((act) => (
                <div 
                  key={act._id}
                  className="p-4 rounded-xl bg-[#202025] border border-[#2c2c33] hover:border-zinc-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/20">
                        {act.platform || act.actionType}
                      </span>
                      <span className="text-xs text-zinc-500">•</span>
                      <span className="text-xs text-zinc-400">{new Date(act.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-zinc-100 truncate">{act.description}</h4>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-1 text-xs text-zinc-400">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{new Date(act.createdAt).toLocaleDateString()}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteActivity(act._id)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-[#2c2c33] transition-colors cursor-pointer"
                      title="Delete activity log"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : posts.length > 0 ? (
              posts.slice(0, 5).map((post) => (
                <div 
                  key={post._id}
                  className="p-4 rounded-xl bg-[#202025] border border-[#2c2c33] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-orange-500/15 text-orange-400 border border-orange-500/20">
                        {Array.isArray(post.platforms) ? post.platforms.join(', ') : post.platform || 'Multi'}
                      </span>
                      <span className="text-xs text-zinc-500">•</span>
                      <span className="text-xs text-zinc-400 capitalize">{post.status}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-zinc-100 truncate">{post.content}</h4>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-zinc-400">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{new Date(post.scheduledFor || post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-zinc-500 text-xs">
                No activity logged yet. Schedule a post or compose with AI to see live events here!
              </div>
            )}
          </div>
        </div>

        {/* Quick Launch & Platform Health Plate (1 col) */}
        <div className="p-6 rounded-2xl bg-[#1a1a1e] border border-[#2c2c33] space-y-5 shadow-lg">
          <div className="border-b border-[#2c2c33] pb-4">
            <h3 className="text-base font-bold text-white">Platform Status</h3>
            <p className="text-xs text-zinc-400">Connected social accounts</p>
          </div>

          <div className="space-y-3">
            {accounts.length > 0 ? (
              accounts.map((acc, i) => (
                <div key={acc._id || i} className="p-3.5 rounded-xl bg-[#202025] border border-[#2c2c33] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#2a2a30] flex items-center justify-center text-base">
                      {acc.platform?.includes('twitter') ? '🐦' : acc.platform?.includes('linkedin') ? '💼' : '📸'}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-200 capitalize">{acc.platform}</p>
                      <p className="text-[11px] text-zinc-500">{acc.handle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-xl bg-[#202025] border border-[#2c2c33] text-center space-y-2">
                <p className="text-xs text-zinc-400">No platforms connected yet.</p>
                <button 
                  onClick={() => navigate('/accounts')}
                  className="px-3 py-1.5 rounded-lg bg-orange-500/20 text-orange-400 text-xs font-semibold hover:bg-orange-500/30 transition-colors cursor-pointer"
                >
                  Connect Platforms
                </button>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button 
              onClick={() => navigate('/accounts')}
              className="w-full py-2.5 rounded-xl bg-[#242429] hover:bg-[#2c2c33] border border-[#2c2c33] text-xs font-semibold text-zinc-200 hover:text-white transition-colors cursor-pointer"
            >
              Manage Accounts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}