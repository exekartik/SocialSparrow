import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Share2, 
  Globe, 
  MessageSquare,
  Upload,
  Send,
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';
import SpecularButton from '../components/SpecularButton';

const platforms = [
  { id: 'twitter', name: 'Twitter / X', icon: Share2, color: 'text-orange-400' },
  { id: 'linkedin', name: 'LinkedIn', icon: Globe, color: 'text-amber-400' },
  { id: 'instagram', name: 'Instagram', icon: MessageSquare, color: 'text-pink-400' },
];

interface QueueItem {
  id: number;
  title: string;
  platform: string;
  time: string;
  icon: any;
  color: string;
  status: 'Scheduled' | 'Published';
}

const initialScheduledItems: QueueItem[] = [
  { id: 1, title: 'Weekly SaaS Growth Masterclass Stream 🎙️', platform: 'Twitter / X', time: 'Today, 5:00 PM', icon: Share2, color: 'text-orange-400', status: 'Scheduled' },
  { id: 2, title: 'How we scaled SocialSparrow to 10k users in 3 months', platform: 'LinkedIn', time: 'Tomorrow, 10:30 AM', icon: Globe, color: 'text-amber-400', status: 'Scheduled' },
  { id: 3, title: 'New UI feature breakdown & dark mode walkthrough', platform: 'Instagram', time: 'Jul 24, 2:00 PM', icon: MessageSquare, color: 'text-pink-400', status: 'Scheduled' },
];

const Scheduler = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'scheduled' | 'published'>('all');
  const [selectedPlatform, setSelectedPlatform] = useState('twitter');
  const [postText, setPostText] = useState('');
  const [date, setDate] = useState('2026-07-25');
  const [time, setTime] = useState('17:00');
  const [mediaName, setMediaName] = useState<string | null>(null);
  const [queue, setQueue] = useState<QueueItem[]>(initialScheduledItems);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const MAX_CHARS = 280;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMediaName(e.target.files[0].name);
    }
  };

  const handleSchedulePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const activePlatformObj = platforms.find(p => p.id === selectedPlatform) || platforms[0];
      const newItem: QueueItem = {
        id: Date.now(),
        title: postText,
        platform: activePlatformObj.name,
        time: `${date} at ${time}`,
        icon: activePlatformObj.icon,
        color: activePlatformObj.color,
        status: 'Scheduled',
      };

      setQueue([newItem, ...queue]);
      setPostText('');
      setMediaName(null);
      setIsSubmitting(false);
    }, 800);
  };

  const filteredQueue = queue.filter(item => {
    if (activeTab === 'scheduled') return item.status === 'Scheduled';
    if (activeTab === 'published') return item.status === 'Published';
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Plate */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#1c1c20] border border-[#2c2c33]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Content Calendar</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white">Post Scheduler</h2>
          <p className="text-xs md:text-sm text-zinc-400">Compose, attach media, and schedule posts across all your social channels.</p>
        </div>
      </div>

      {/* Main Composer Plate */}
      <div className="p-6 rounded-2xl bg-[#1a1a1e] border border-[#2c2c33] space-y-5 shadow-lg">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">Compose & Schedule</h3>

        <form onSubmit={handleSchedulePost} className="space-y-4">
          {/* Target Channels */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300">Select Channels</label>
            <div className="grid grid-cols-3 gap-3">
              {platforms.map((p) => {
                const Icon = p.icon;
                const active = selectedPlatform === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedPlatform(p.id)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      active
                        ? 'bg-orange-500/15 border-orange-500/50 text-orange-400 shadow-sm'
                        : 'bg-[#202025] border-[#2c2c33] text-zinc-400 hover:text-white hover:bg-[#25252b]'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${p.color}`} />
                    <span>{p.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Post Text & Counter */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-zinc-300">Post Copy</label>
              <span className={`text-[11px] font-mono ${postText.length > MAX_CHARS ? 'text-red-400' : 'text-zinc-500'}`}>
                {postText.length} / {MAX_CHARS}
              </span>
            </div>
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="What's happening? Type your post here..."
              rows={4}
              maxLength={MAX_CHARS}
              className="w-full bg-[#202025] border border-[#2c2c33] rounded-xl p-3.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-orange-500/70 focus:ring-1 focus:ring-orange-500/40 transition-colors resize-none"
            />
          </div>

          {/* Media Upload Dropzone & Date/Time pickers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dropzone */}
            <div className="relative border-2 border-dashed border-[#2c2c33] hover:border-orange-500/40 rounded-xl p-4 flex items-center justify-center text-center bg-[#202025]/50 transition-colors">
              <input
                type="file"
                onChange={handleFileUpload}
                accept="image/*,video/*"
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <Upload className="w-4 h-4 text-orange-400 shrink-0" />
                <span>{mediaName ? `Attached: ${mediaName}` : 'Click to upload image or video'}</span>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#202025] border border-[#2c2c33] rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-orange-500/70"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-zinc-400 mb-1">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-[#202025] border border-[#2c2c33] rounded-xl px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-orange-500/70"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <SpecularButton
              size="md"
              radius={14}
              tint="#ff6b00"
              tintOpacity={0.25}
              lineColor="#ff9d42"
              baseColor="#7c2d12"
              speed={0.4}
              intensity={1.3}
              type="submit"
              disabled={isSubmitting || !postText.trim()}
              className="w-full justify-center py-3 font-semibold text-sm shadow-lg shadow-orange-500/20"
            >
              <Send className="w-4 h-4 text-orange-400" />
              <span>{isSubmitting ? 'Scheduling...' : 'Schedule Post'}</span>
            </SpecularButton>
          </div>
        </form>
      </div>

      {/* Queue Filter Tabs & Timeline Plate */}
      <div className="p-6 rounded-2xl bg-[#1a1a1e] border border-[#2c2c33] space-y-4 shadow-lg">
        <div className="flex items-center justify-between border-b border-[#2c2c33] pb-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Posts Feed</h3>
          <div className="flex items-center gap-2">
            {(['all', 'scheduled', 'published'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                  activeTab === tab
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                    : 'text-zinc-400 hover:text-white hover:bg-[#242429]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filteredQueue.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.id}
                className="p-4 rounded-xl bg-[#202025] border border-[#2c2c33] hover:border-orange-500/40 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all"
              >
                <div className="flex items-start md:items-center gap-3.5 flex-1 min-w-0">
                  <div className="p-2.5 rounded-xl bg-[#2a2a30] shrink-0">
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-semibold text-zinc-100 truncate">{item.title}</h4>
                    <p className="text-[11px] text-zinc-400">{item.platform}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-4 shrink-0">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#282830] border border-[#32323a] text-xs text-zinc-300">
                    <Clock className="w-3.5 h-3.5 text-orange-400" />
                    <span>{item.time}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[11px] font-semibold">
                    {item.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Scheduler;