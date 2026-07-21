import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Globe,
  Share2,
  Video,
  MessageSquare,
  Trash2
} from 'lucide-react';
import SpecularButton from '../components/SpecularButton';

interface AccountItem {
  id: number;
  name: string;
  handle: string;
  icon: any;
  status: string;
  color: string;
  isConnected: boolean;
}

const initialAccounts: AccountItem[] = [
  { id: 1, name: 'Twitter / X', handle: '@socialsparrow', icon: Share2, status: 'Connected', color: 'text-orange-400', isConnected: true },
  { id: 2, name: 'LinkedIn Company', handle: 'SocialSparrow Inc.', icon: Globe, status: 'Connected', color: 'text-amber-400', isConnected: true },
  { id: 3, name: 'Instagram Creator', handle: '@socialsparrow_app', icon: MessageSquare, status: 'Connected', color: 'text-pink-400', isConnected: true },
  { id: 4, name: 'Facebook Page', handle: 'SocialSparrow', icon: Globe, status: 'Not Connected', color: 'text-blue-500', isConnected: false },
  { id: 5, name: 'YouTube Channel', handle: 'SocialSparrow Tech', icon: Video, status: 'Not Connected', color: 'text-red-500', isConnected: false },
];

const Account = () => {
  const [accounts, setAccounts] = useState<AccountItem[]>(initialAccounts);
  const [showConnectModal, setShowConnectModal] = useState(false);

  const toggleConnect = (id: number) => {
    setAccounts(prev => prev.map(acc => {
      if (acc.id === id) {
        return {
          ...acc,
          isConnected: !acc.isConnected,
          status: !acc.isConnected ? 'Connected' : 'Not Connected'
        };
      }
      return acc;
    }));
  };

  const connectedCount = accounts.filter(a => a.isConnected).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto relative">
      {/* Header Plate */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#1c1c20] border border-[#2c2c33]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{connectedCount} of {accounts.length} Platforms Connected</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white">Social Accounts</h2>
          <p className="text-xs md:text-sm text-zinc-400">Manage and automate your social presence across all connected networks.</p>
        </div>

        <SpecularButton
          size="sm"
          radius={12}
          tint="#ff6b00"
          tintOpacity={0.25}
          lineColor="#ff9d42"
          baseColor="#7c2d12"
          speed={0.4}
          intensity={1.3}
          onClick={() => setShowConnectModal(true)}
          className="px-5 py-2.5 font-semibold text-xs shadow-lg shadow-orange-500/20"
        >
          <Plus className="w-4 h-4 text-orange-400" />
          <span>Connect Account</span>
        </SpecularButton>
      </div>

      {/* Grid of Accounts Plates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {accounts.map((acc) => {
          const Icon = acc.icon;
          return (
            <div 
              key={acc.id}
              className="p-5 rounded-2xl bg-[#1a1a1e] border border-[#2c2c33] hover:border-orange-500/40 transition-all duration-200 flex flex-col justify-between space-y-4 shadow-md group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#242429] border border-[#2c2c33] group-hover:border-zinc-700 transition-colors">
                    <Icon className={`w-6 h-6 ${acc.color}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{acc.name}</h3>
                    <p className="text-xs text-zinc-400">{acc.handle}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#2c2c33] flex items-center justify-between">
                {acc.isConnected ? (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Connected</span>
                  </div>
                ) : (
                  <span className="text-xs text-zinc-500 font-medium">Disconnected</span>
                )}

                <button 
                  onClick={() => toggleConnect(acc.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    acc.isConnected
                      ? 'bg-[#242429] text-zinc-300 hover:text-red-400 hover:bg-[#2c2c33] border border-[#2c2c33]'
                      : 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20'
                  }`}
                >
                  {acc.isConnected ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Connect Account Modal */}
      {showConnectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#1a1a1e] border border-[#2c2c33] rounded-2xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#2c2c33] pb-3">
              <h3 className="text-base font-bold text-white">Choose a Platform</h3>
              <button 
                onClick={() => setShowConnectModal(false)}
                className="text-zinc-400 hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {accounts.map(acc => {
                const Icon = acc.icon;
                return (
                  <div 
                    key={acc.id}
                    className="p-3.5 rounded-xl bg-[#202025] border border-[#2c2c33] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${acc.color}`} />
                      <span className="text-xs font-semibold text-zinc-200">{acc.name}</span>
                    </div>
                    <button
                      disabled={acc.isConnected}
                      onClick={() => {
                        toggleConnect(acc.id);
                        setShowConnectModal(false);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        acc.isConnected
                          ? 'bg-[#282830] text-zinc-500 border border-[#32323a] cursor-not-allowed'
                          : 'bg-orange-500 hover:bg-orange-600 text-white shadow-sm'
                      }`}
                    >
                      {acc.isConnected ? 'Already Connected' : 'Connect Now'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;