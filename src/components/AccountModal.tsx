import React, { useState } from 'react';
import { X, User, Crown, Package, MapPin, Sparkles, Check } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 text-center">
        <div className="w-full max-w-xl bg-[#FAF9F6] shadow-2xl rounded-xs overflow-hidden text-left relative z-10 border border-neutral-300">
          
          {/* Header */}
          <div className="p-6 border-b border-neutral-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-neutral-900 text-white rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold tracking-[0.2em] uppercase font-display text-neutral-900">
                  SL PRIVATE CLIENT CLUB
                </h3>
                <span className="text-[10px] tracking-widest uppercase text-emerald-600 font-semibold flex items-center gap-1">
                  <Crown className="w-3 h-3 text-amber-500" /> TIER: NOIR MEMBER
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-black transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-neutral-200 bg-[#F5F3EF]">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-3 text-xs font-bold tracking-[0.2em] uppercase transition-colors ${
                activeTab === 'profile'
                  ? 'bg-white text-black border-b-2 border-black'
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              PROFILE & PERKS
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-3 text-xs font-bold tracking-[0.2em] uppercase transition-colors ${
                activeTab === 'orders'
                  ? 'bg-white text-black border-b-2 border-black'
                  : 'text-neutral-500 hover:text-black'
              }`}
            >
              ORDER HISTORY
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {activeTab === 'profile' ? (
              <div className="space-y-6">
                
                {/* Rewards Balance Banner */}
                <div className="p-5 bg-[#121212] text-[#FAF9F6] rounded-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] tracking-[0.25em] text-[#D5CCBF] uppercase block">
                      AVAILABLE SL REWARDS POINTS
                    </span>
                    <span className="text-2xl font-bold font-display tracking-tight text-white">
                      1,250 PTS
                    </span>
                    <span className="text-[11px] text-neutral-400 block pt-0.5">
                      Equivalent to $125 towards your next drop.
                    </span>
                  </div>
                  <div className="p-2 border border-neutral-700 text-xs font-bold tracking-widest uppercase text-[#D5CCBF]">
                    TIER NOIR
                  </div>
                </div>

                {/* VIP Perks */}
                <div className="space-y-2">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 block">
                    ACTIVE NOIR PRIVILEGES
                  </span>
                  <div className="grid grid-cols-2 gap-3 text-xs text-neutral-700">
                    <div className="p-3 bg-white border border-neutral-200 rounded-xs flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span>24-Hour Early Drop Access</span>
                    </div>
                    <div className="p-3 bg-white border border-neutral-200 rounded-xs flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      <span>Complimentary Alterations</span>
                    </div>
                  </div>
                </div>

                {/* Quick Profile form */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 block">
                    DEFAULT DELIVERY ADDRESS
                  </span>
                  <div className="p-4 bg-white border border-neutral-200 rounded-xs text-xs text-neutral-700 space-y-1">
                    <div className="font-semibold text-neutral-900">Elena Rostova</div>
                    <div>742 Evergreen Fashion Way, Apt 4B</div>
                    <div>New York, NY 10012, United States</div>
                    <div className="text-neutral-500 font-mono pt-1">+1 (555) 382-9014</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsSaved(true);
                    setTimeout(() => setIsSaved(false), 2000);
                  }}
                  className="w-full py-3 bg-neutral-900 hover:bg-black text-white text-xs font-bold tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2"
                >
                  {isSaved ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      SAVED PREFERENCES
                    </>
                  ) : (
                    'UPDATE CONCIERGE PREFERENCES'
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-white border border-neutral-200 rounded-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                    <div>
                      <span className="font-bold text-xs text-neutral-900">ORDER #SL-2026-9812</span>
                      <span className="text-[11px] text-neutral-400 block">Placed Sept 18, 2026</span>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full uppercase tracking-wider">
                      DELIVERED
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-600">Heavyweight Oversized Hoodie (Oatmeal, M)</span>
                    <span className="font-bold text-neutral-900 font-mono">$145.00</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-600">Tailored Flow Wide-Leg Trousers (Oatmeal, S)</span>
                    <span className="font-bold text-neutral-900 font-mono">$165.00</span>
                  </div>
                </div>

                <div className="p-4 bg-white border border-neutral-200 rounded-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                    <div>
                      <span className="font-bold text-xs text-neutral-900">ORDER #SL-2026-7491</span>
                      <span className="text-[11px] text-neutral-400 block">Placed August 24, 2026</span>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-neutral-100 text-neutral-700 rounded-full uppercase tracking-wider">
                      ARCHIVED
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-600">SL Signature Velour Tracksuit Set (Espresso, S)</span>
                    <span className="font-bold text-neutral-900 font-mono">$260.00</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
