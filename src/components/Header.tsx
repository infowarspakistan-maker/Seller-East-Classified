import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext.tsx';
import { Role } from '../types/index.ts';
import {
  ShieldCheck,
  Plus,
  ShoppingBag,
  Store,
  Search,
  Wrench,
  Languages,
  Car,
  Home,
  Smartphone,
  MapPin,
  MessageSquare,
  Lock,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    role,
    setRole,
    language,
    setLanguage,
    setIsCreateListingOpen,
    setIsWhatsAppModalOpen,
    escrowTransactions,
    activeHub,
    setActiveHub,
    showToast,
  } = useMarketplace();

  const totalEscrowLocked = escrowTransactions
    .filter(t => t.status === 'holding' || t.status === 'inspection_scheduled' || t.status === 'dispatched')
    .reduce((sum, t) => sum + t.totalPaidPKR, 0);

  const roles: { id: Role; label: string; labelUrdu: string; icon: React.ReactNode }[] = [
    { id: 'buyer', label: 'Buyer Marketplace', labelUrdu: 'خریدار مارکیٹ', icon: <ShoppingBag className="w-3.5 h-3.5" /> },
    { id: 'seller', label: 'Seller Studio & Payouts', labelUrdu: 'سیلر اسٹوڈیو و ادائیگیاں', icon: <Store className="w-3.5 h-3.5" /> },
    { id: 'inspector', label: 'Certified Inspector', labelUrdu: 'سرٹیفائیڈ معائنہ کار', icon: <Wrench className="w-3.5 h-3.5" /> },
    { id: 'admin', label: 'Trust & Admin Vault', labelUrdu: 'ٹرسٹ و ایڈمن والٹ', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* 1. TOP UTILITY BAR (STITCH EXPORT SPEC): SBP RAAST ESCROW PROTECTED + LIVE STATS + SAFEZONES */}
      <div className="bg-[#002F34] text-white px-4 lg:px-8 py-1.5 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Trust Guarantee & Live Stats */}
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center gap-1.5 bg-teal-800/60 text-emerald-300 font-bold px-2 py-0.5 rounded-full text-[11px] border border-emerald-400/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SBP RAAST ESCROW PROTECTED
            </span>
            <span className="hidden md:inline-flex items-center gap-2 text-slate-300">
              <span>24,180 Verified Lahore Ads</span>
              <span className="text-white/30">•</span>
              <span>200-Point Inspection Available</span>
            </span>
          </div>

          {/* Persona Switcher & Language Controls */}
          <div className="flex items-center space-x-3 text-slate-300">
            {/* Persona Switcher */}
            <div className="flex items-center gap-1 bg-slate-900/80 p-0.5 rounded border border-slate-700">
              {roles.map(r => (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    role === r.id
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {r.icon}
                  <span className="hidden sm:inline">{language === 'ur' ? r.labelUrdu : r.label}</span>
                </button>
              ))}
            </div>

            <span className="text-white/30">|</span>

            {/* Safe Exchange Zones Link */}
            <button
              onClick={() => showToast('📍 Safe Exchange Zones active at Gulberg Mall & DHA Phase 6 kiosks.')}
              className="hover:text-white flex items-center gap-1 transition text-[11px] cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" />
              <span className="hidden sm:inline">SafeZones</span>
            </button>

            <span className="text-white/30">|</span>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="hover:text-white font-semibold transition text-[11px] flex items-center gap-1 cursor-pointer"
            >
              <Languages className="w-3 h-3 text-teal-400" />
              <span>{language === 'en' ? 'Urdu (اردو)' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION & BRAND BAR WITH VERTICAL PILLS & SELL BUTTON */}
      <div className="px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Category Hub Switcher */}
          <div className="flex items-center space-x-6">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setRole('buyer');
                setActiveHub('portal');
              }}
              className="flex items-center gap-2 flex-shrink-0 group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#002F34] flex items-center justify-center text-white shadow-xs group-hover:bg-[#00474e] transition">
                <ShieldCheck className="w-5 h-5 text-yellow-400" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight text-[#002F34] leading-none">PakClassifieds</span>
                  <span className="text-[9px] font-black uppercase tracking-wider bg-yellow-400 text-[#002F34] px-1.5 py-0.5 rounded font-mono">
                    TRUST PK
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                  Verified Lahore Marketplace & Escrow
                </span>
              </div>
            </a>

            {/* Category Vertical Pills (Stitch Image 3 & Motors style) */}
            <nav className="hidden md:flex items-center space-x-2 pl-4 border-l border-slate-200 text-xs font-semibold">
              <button
                onClick={() => {
                  setRole('buyer');
                  setActiveHub('portal');
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition cursor-pointer ${
                  activeHub === 'portal'
                    ? 'bg-[#e9f7f7] border border-teal-500/50 text-[#002F34] shadow-xs'
                    : 'text-slate-600 hover:text-[#002F34] hover:bg-slate-100'
                }`}
              >
                <span>Marketplace Feed</span>
              </button>

              <button
                onClick={() => {
                  setRole('buyer');
                  setActiveHub('motors');
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition cursor-pointer ${
                  activeHub === 'motors'
                    ? 'bg-[#e9f7f7] border border-teal-500/50 text-[#002F34] shadow-xs font-bold'
                    : 'text-slate-600 hover:text-[#002F34] hover:bg-slate-100'
                }`}
              >
                <Car className="w-3.5 h-3.5 text-teal-700" />
                <span>Motors Hub</span>
              </button>

              <button
                onClick={() => {
                  setRole('buyer');
                  setActiveHub('properties');
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition cursor-pointer ${
                  activeHub === 'properties'
                    ? 'bg-[#e9f7f7] border border-teal-500/50 text-[#002F34] shadow-xs font-bold'
                    : 'text-slate-600 hover:text-[#002F34] hover:bg-slate-100'
                }`}
              >
                <Home className="w-3.5 h-3.5 text-amber-600" />
                <span>Properties Hub</span>
              </button>

              <button
                onClick={() => {
                  setRole('buyer');
                  setActiveHub('search');
                }}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full transition cursor-pointer ${
                  activeHub === 'search'
                    ? 'bg-[#e9f7f7] border border-teal-500/50 text-[#002F34] shadow-xs font-bold'
                    : 'text-slate-600 hover:text-[#002F34] hover:bg-slate-100'
                }`}
              >
                <Search className="w-3.5 h-3.5 text-indigo-600" />
                <span>Faceted Search</span>
              </button>
            </nav>
          </div>

          {/* Right: Auth, WhatsApp, and Multi-Border Sell Button */}
          <div className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0">
            <button
              onClick={() => setIsWhatsAppModalOpen(true)}
              className="hidden lg:inline-flex items-center gap-1.5 font-bold text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 py-1.5 px-3 rounded-lg transition cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>WhatsApp Quick-List</span>
            </button>

            {/* Distinctive Sell Button (Classic Multi-Border Pill from Export) */}
            <button
              onClick={() => setIsCreateListingOpen(true)}
              className="relative inline-flex items-center justify-center px-5 sm:px-6 py-2 text-xs sm:text-sm font-black text-[#002F34] uppercase tracking-wide bg-white rounded-full shadow-xs hover:shadow-md transition-all border-4 border-t-[#23e5db] border-r-[#002f34] border-b-[#ffce32] border-l-[#3a77ff] active:scale-95 cursor-pointer"
            >
              <span className="mr-1 text-base leading-none font-black text-[#002F34]">+</span>
              <span>SELL</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
