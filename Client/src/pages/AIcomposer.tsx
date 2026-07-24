import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Copy, 
  RefreshCw, 
  Check, 
  Image as ImageIcon, 
  Wand2,
  Share2,
  Globe,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import SpecularButton from '../components/SpecularButton';
import apiFetch from '../api';

const tones = ['Professional', 'Casual & Friendly', 'Viral / Hype', 'Educational', 'Storytelling'];
const platforms = [
  { id: 'twitter', name: 'Twitter / X', icon: Share2, color: 'text-orange-400' },
  { id: 'linkedin', name: 'LinkedIn', icon: Globe, color: 'text-amber-400' },
  { id: 'instagram', name: 'Instagram', icon: MessageSquare, color: 'text-pink-400' },
];

import toast from 'react-hot-toast';
import CoolLoadingSpinner from '../components/CoolLoadingSpinner';

export default function AIcomposer() {
  const [prompt, setPrompt] = useState('');
  const [selectedTone, setSelectedTone] = useState('Casual & Friendly');
  const [selectedPlatform, setSelectedPlatform] = useState('twitter');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState('');
  const [generatedMediaUrl, setGeneratedMediaUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('2026-07-25');
  const [scheduleTime, setScheduleTime] = useState('14:30');
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduledSuccess, setScheduledSuccess] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);
    const toastId = toast.loading("Generating post copy & graphics with AI...");

    try {
      const res = await apiFetch('/posts/generate', {
        method: 'POST',
        body: JSON.stringify({
          prompt,
          tone: selectedTone,
          generateImage: false,
        }),
      });

      if (res.success && res.data) {
        setGeneratedPost(res.data.content || '');
        setGeneratedMediaUrl(res.data.mediaUrl || null);
        toast.success("AI Post & Image generated successfully!", { id: toastId });
      }
    } catch (err: any) {
      console.error('AI Generation Error:', err);
      const errMsg = err?.message || 'Failed to generate post using AI.';
      setError(errMsg);
      toast.error(errMsg, { id: toastId });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedPost) return;
    navigator.clipboard.writeText(generatedPost);
    setCopied(true);
    toast.success("Post copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!generatedPost) return;

    setIsScheduling(true);
    try {
      await apiFetch('/posts/schedule', {
        method: 'POST',
        body: JSON.stringify({
          content: generatedPost,
          platforms: [selectedPlatform],
          scheduledFor: new Date(`${scheduleDate}T${scheduleTime}`).toISOString(),
          mediaUrl: generatedMediaUrl || undefined,
          mediaType: generatedMediaUrl ? 'image' : undefined,
          status: 'scheduled',
        }),
      });

      setScheduledSuccess(true);
      toast.success("Post scheduled successfully!");
      setTimeout(() => {
        setScheduledSuccess(false);
        setShowScheduleModal(false);
      }, 1500);
    } catch (err: any) {
      console.error('Schedule generated post error:', err);
      toast.error(err?.message || 'Failed to schedule post');
    } finally {
      setIsScheduling(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto relative">
      {/* Header Plate */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#1c1c20] border border-[#2c2c33]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Content Studio</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white">AI Post Composer</h2>
          <p className="text-xs md:text-sm text-zinc-400">Generate high-converting posts tailored for any social platform in seconds.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form Plate (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#1a1a1e] border border-[#2c2c33] space-y-5 shadow-lg">
          {/* Platform Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Target Platform</label>
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

          {/* Prompt Input */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">What would you like to post about?</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Announce our new AI scheduling feature with an engaging call-to-action for product updates..."
              rows={4}
              className="w-full bg-[#202025] border border-[#2c2c33] rounded-xl p-3.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-orange-500/70 focus:ring-1 focus:ring-orange-500/40 transition-colors resize-none"
            />
          </div>

          {/* Tone Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Voice & Tone</label>
            <div className="flex flex-wrap gap-2">
              {tones.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTone(t)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                    selectedTone === t
                      ? 'bg-orange-500/20 text-orange-400 border-orange-500/40'
                      : 'bg-[#202025] border-[#2c2c33] text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
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
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full justify-center py-3 font-semibold text-sm shadow-lg shadow-orange-500/20 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-orange-400" />
                  <span>Generating Content & Image...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 text-orange-400" />
                  <span>Generate Post</span>
                </>
              )}
            </SpecularButton>
          </div>
        </div>

        {/* Right Output Plate (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#1a1a1e] border border-[#2c2c33] flex flex-col justify-between space-y-4 shadow-lg min-h-[360px]">
          <div>
            <div className="flex items-center justify-between border-b border-[#2c2c33] pb-3 mb-4">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-orange-500" />
                Live Post Preview
              </span>
              {generatedPost && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="p-1.5 text-xs text-zinc-400 hover:text-white bg-[#202025] hover:bg-[#2c2c33] border border-[#2c2c33] rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </div>

            {isGenerating ? (
              <CoolLoadingSpinner text="Generating AI Content & Media..." subtext="Synthesizing copy with Gemini AI & uploading graphic to Cloudinary..." />
            ) : generatedPost ? (
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#202025] border border-[#2c2c33] text-xs text-zinc-200 leading-relaxed whitespace-pre-wrap font-sans">
                  {generatedPost}
                </div>
                {generatedMediaUrl && (
                  <div className="relative rounded-xl overflow-hidden border border-[#2c2c33] bg-[#202025] group">
                    <img 
                      src={generatedMediaUrl} 
                      alt="AI generated social media graphic"
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] text-zinc-300 flex items-center gap-1">
                      <ImageIcon className="w-3 h-3 text-orange-400" />
                      <span>Cloudinary Verified Media</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-56 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-[#2c2c33] rounded-xl bg-[#18181c]/50">
                <Wand2 className="w-8 h-8 text-zinc-600 mb-2" />
                <p className="text-xs font-semibold text-zinc-400">No content generated yet</p>
                <p className="text-[11px] text-zinc-500 mt-1 max-w-xs">Enter your topic on the left and click "Generate Post" to create AI content.</p>
              </div>
            )}
          </div>

          {generatedPost && (
            <div className="pt-3 border-t border-[#2c2c33] flex gap-3">
              <button 
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex-1 py-2.5 rounded-xl bg-[#202025] hover:bg-[#2c2c33] border border-[#2c2c33] text-xs font-semibold text-zinc-300 hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Regenerate</span>
              </button>
              <button 
                type="button"
                onClick={() => setShowScheduleModal(true)}
                className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-xs font-semibold text-white shadow-md shadow-orange-500/20 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Schedule Now</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Schedule Modal Dialog */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#1a1a1e] border border-[#2c2c33] rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#2c2c33] pb-3">
              <h3 className="text-base font-bold text-white">Schedule Generated Post</h3>
              <button 
                type="button"
                onClick={() => setShowScheduleModal(false)}
                className="text-zinc-400 hover:text-white text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block mb-1.5 font-semibold text-zinc-300">Target Date</label>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full bg-[#202025] border border-[#2c2c33] rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-orange-500/70"
                />
              </div>

              <div>
                <label className="block mb-1.5 font-semibold text-zinc-300">Publication Time</label>
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full bg-[#202025] border border-[#2c2c33] rounded-xl px-3 py-2 text-zinc-200 focus:outline-none focus:border-orange-500/70"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowScheduleModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#202025] text-zinc-300 hover:text-white border border-[#2c2c33] font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isScheduling}
                  className="flex-1 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md shadow-orange-500/20 cursor-pointer disabled:opacity-50"
                >
                  {isScheduling ? 'Scheduling...' : scheduledSuccess ? 'Post Scheduled!' : 'Confirm Schedule'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}