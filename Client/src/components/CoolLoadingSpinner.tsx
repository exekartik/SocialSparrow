import { Bird, Sparkles } from "lucide-react";

interface CoolLoadingSpinnerProps {
  text?: string;
  subtext?: string;
  fullScreen?: boolean;
}

export default function CoolLoadingSpinner({
  text = "Loading SocialSparrow Workspace...",
  subtext = "Preparing your AI-powered social engine...",
  fullScreen = false,
}: CoolLoadingSpinnerProps) {
  const content = (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {/* Outer Glowing Ring Container */}
      <div className="relative w-20 h-20 flex items-center justify-center mb-6">
        {/* Ambient Glow */}
        <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl animate-pulse" />
        
        {/* Outer Rotating Gradient Border */}
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-orange-500 border-r-amber-500 animate-spin" style={{ animationDuration: '1.2s' }} />
        
        {/* Inner Counter-Rotating Sub-ring */}
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-orange-400/60 border-l-amber-400/40 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }} />
        
        {/* Center Icon Badge */}
        <div className="relative p-3.5 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white shadow-lg shadow-orange-500/30 animate-bounce" style={{ animationDuration: '2s' }}>
          <Bird className="w-6 h-6" />
        </div>
      </div>

      {/* Loading Text */}
      <div className="space-y-1.5 max-w-xs">
        <h3 className="text-sm font-bold text-white tracking-wide flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
          <span>{text}</span>
        </h3>
        <p className="text-xs text-zinc-400 font-medium">{subtext}</p>
      </div>

      {/* Pulsing Dots */}
      <div className="flex items-center gap-1.5 mt-4">
        <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
        <div className="w-2 h-2 rounded-full bg-orange-400 animate-ping" style={{ animationDelay: '0.2s' }} />
        <div className="w-2 h-2 rounded-full bg-amber-500 animate-ping" style={{ animationDelay: '0.4s' }} />
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-[#121214]/90 backdrop-blur-xl flex items-center justify-center">
        <div className="p-8 rounded-3xl bg-[#1a1a1e] border border-[#2c2c33] shadow-2xl shadow-orange-950/40">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-16 flex items-center justify-center rounded-2xl bg-[#1a1a1e]/60 border border-[#2c2c33]/80 backdrop-blur-md">
      {content}
    </div>
  );
}
