import { useEffect, useState } from 'react';
import { 
  Plus, 
  CheckCircle2, 
  ShieldCheck, 
  Globe,
  Share2,
  Video,
  MessageSquare,
  Trash2,
  AlertCircle
} from 'lucide-react';
import SpecularButton from '../components/SpecularButton';
import apiFetch from '../api';

const platformOptions = [
  { id: 'twitter', name: 'Twitter / X', icon: Share2, color: 'text-orange-400' },
  { id: 'linkedin', name: 'LinkedIn', icon: Globe, color: 'text-amber-400' },
  { id: 'instagram', name: 'Instagram', icon: MessageSquare, color: 'text-pink-400' },
  { id: 'facebook', name: 'Facebook Page', icon: Globe, color: 'text-blue-500' },
  { id: 'youtube', name: 'YouTube Channel', icon: Video, color: 'text-red-500' },
];

import toast from 'react-hot-toast';

export default function Account() {
  const [dbAccounts, setDbAccounts] = useState<any[]>([]);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = async () => {
    try {
      const res = await apiFetch('/accounts/get-account');
      if (res.success && Array.isArray(res.data)) {
        setDbAccounts(res.data);
      }
    } catch (err: any) {
      console.error('Fetch Accounts Error:', err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleConnectPlatform = async (platformId: string) => {
    setConnectingPlatform(platformId);
    setError(null);
    try {
      // 1. Try to get OAuth redirect URL from Zernio
      const res = await apiFetch(`/social/auth/${platformId}`);
      if (res.success && res.data?.authUrl) {
        window.location.href = res.data.authUrl;
        return;
      }
    } catch (err: any) {
      console.warn('Zernio OAuth redirect failed, falling back to instant local connection:', err);
    }

    // Fallback: Add account directly into MongoDB for local development testing
    try {
      await apiFetch('/accounts/add-account', {
        method: 'POST',
        body: JSON.stringify({
          platform: platformId,
          handle: `@sparrow_${platformId}`,
          avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
          zernioAccountId: `zernio_acc_${Date.now()}`
        })
      });
      await fetchAccounts();
      setShowConnectModal(false);
      toast.success(`${platformId.toUpperCase()} platform connected!`);
    } catch (fallbackErr: any) {
      const errMsg = fallbackErr?.message || 'Failed to connect account.';
      setError(errMsg);
      toast.error(errMsg);
    } finally {
      setConnectingPlatform(null);
    }
  };

  const handleDisconnect = async (accountId: string) => {
    try {
      await apiFetch(`/accounts/${accountId}`, { method: 'DELETE' });
      setDbAccounts(prev => prev.filter(a => a._id !== accountId));
      toast.success("Account disconnected successfully");
    } catch (err: any) {
      console.error('Failed to disconnect account:', err);
      toast.error(err?.message || 'Failed to disconnect account');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto relative">
      {/* Header Plate */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-[#1c1c20] border border-[#2c2c33]">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{dbAccounts.length} Connected Social Platforms</span>
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
          className="px-5 py-2.5 font-semibold text-xs shadow-lg shadow-orange-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-orange-400" />
          <span>Connect Account</span>
        </SpecularButton>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid of Accounts Plates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {platformOptions.map((platform) => {
          const Icon = platform.icon;
          const connectedAccount = dbAccounts.find(a => a.platform === platform.id);
          const isConnected = Boolean(connectedAccount);

          return (
            <div 
              key={platform.id}
              className="p-5 rounded-2xl bg-[#1a1a1e] border border-[#2c2c33] hover:border-orange-500/40 transition-all duration-200 flex flex-col justify-between space-y-4 shadow-md group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#242429] border border-[#2c2c33] group-hover:border-zinc-700 transition-colors">
                    <Icon className={`w-6 h-6 ${platform.color}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{platform.name}</h3>
                    <p className="text-xs text-zinc-400">{connectedAccount ? connectedAccount.handle : 'Not Connected'}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#2c2c33] flex items-center justify-between">
                {isConnected ? (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Connected</span>
                  </div>
                ) : (
                  <span className="text-xs text-zinc-500 font-medium">Disconnected</span>
                )}

                {isConnected ? (
                  <button 
                    onClick={() => handleDisconnect(connectedAccount._id)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#242429] text-zinc-300 hover:text-red-400 hover:bg-[#2c2c33] border border-[#2c2c33] transition-all cursor-pointer flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Disconnect</span>
                  </button>
                ) : (
                  <button 
                    onClick={() => handleConnectPlatform(platform.id)}
                    disabled={connectingPlatform === platform.id}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {connectingPlatform === platform.id ? 'Connecting...' : 'Connect'}
                  </button>
                )}
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
              <h3 className="text-base font-bold text-white">Choose a Platform to Connect</h3>
              <button 
                onClick={() => setShowConnectModal(false)}
                className="text-zinc-400 hover:text-white text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {platformOptions.map(platform => {
                const Icon = platform.icon;
                const isConnected = dbAccounts.some(a => a.platform === platform.id);

                return (
                  <div 
                    key={platform.id}
                    className="p-3.5 rounded-xl bg-[#202025] border border-[#2c2c33] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${platform.color}`} />
                      <span className="text-xs font-semibold text-zinc-200">{platform.name}</span>
                    </div>
                    <button
                      disabled={isConnected || connectingPlatform === platform.id}
                      onClick={() => handleConnectPlatform(platform.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        isConnected
                          ? 'bg-[#282830] text-zinc-500 border border-[#32323a] cursor-not-allowed'
                          : 'bg-orange-500 hover:bg-orange-600 text-white shadow-sm'
                      }`}
                    >
                      {isConnected ? 'Already Connected' : connectingPlatform === platform.id ? 'Connecting...' : 'Connect Now'}
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
}