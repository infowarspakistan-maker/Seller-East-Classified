import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext.tsx';
import { Listing } from '../types/index.ts';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  Search,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Plus,
  Car,
  Home,
  Smartphone,
  Laptop,
  Tv,
  Wrench,
  Briefcase,
  Cat,
  Armchair,
  Shirt,
  Trophy,
  Baby,
  Building,
} from 'lucide-react';

interface MainPortalViewProps {
  onSelectCategory: (cat: string) => void;
  onOpenMotorsHub: () => void;
  onOpenPropertiesHub: () => void;
}

export const MainPortalView: React.FC<MainPortalViewProps> = ({
  onSelectCategory,
  onOpenMotorsHub,
  onOpenPropertiesHub,
}) => {
  const {
    listings,
    setSelectedListing,
    setCheckoutListing,
    setIsCreateListingOpen,
    language,
    showToast,
  } = useMarketplace();

  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = { ...prev, [id]: !prev[id] };
      showToast(next[id] ? '❤️ Added to Saved Listings' : 'Removed from Saved');
      return next;
    });
  };

  const categories = [
    { id: 'mobiles', name: 'Mobiles', icon: <Smartphone className="w-5 h-5" />, action: () => onSelectCategory('mobiles') },
    { id: 'motors', name: 'Cars & Motors', icon: <Car className="w-5 h-5" />, action: onOpenMotorsHub },
    { id: 'bikes', name: 'Motorcycles', icon: <Car className="w-5 h-5" />, action: onOpenMotorsHub },
    { id: 'houses', name: 'Houses & Apts', icon: <Home className="w-5 h-5" />, action: onOpenPropertiesHub },
    { id: 'plots', name: 'Land & Plots', icon: <Building className="w-5 h-5" />, action: onOpenPropertiesHub },
    { id: 'laptops', name: 'Laptops & Tech', icon: <Laptop className="w-5 h-5" />, action: () => onSelectCategory('electronics') },
    { id: 'electronics', name: 'TV & Home App', icon: <Tv className="w-5 h-5" />, action: () => onSelectCategory('electronics') },
    { id: 'services', name: 'Services', icon: <Wrench className="w-5 h-5" />, action: () => onSelectCategory('all') },
    { id: 'jobs', name: 'Jobs in Lahore', icon: <Briefcase className="w-5 h-5" />, action: () => onSelectCategory('all') },
    { id: 'pets', name: 'Animals & Pets', icon: <Cat className="w-5 h-5" />, action: () => onSelectCategory('all') },
    { id: 'furniture', name: 'Furniture', icon: <Armchair className="w-5 h-5" />, action: () => onSelectCategory('all') },
    { id: 'fashion', name: 'Fashion', icon: <Shirt className="w-5 h-5" />, action: () => onSelectCategory('all') },
    { id: 'sports', name: 'Sports & Hobbies', icon: <Trophy className="w-5 h-5" />, action: () => onSelectCategory('all') },
    { id: 'kids', name: 'Kids & Baby', icon: <Baby className="w-5 h-5" />, action: () => onSelectCategory('all') },
  ];

  return (
    <div className="space-y-7">
      {/* 1. RESTRUCTURED COMPACT 2-LINE CATEGORY SECTION (14 PRIMARIES WITH MONOCHROME ICONS) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">Quick Exploration</span>
            <span className="text-slate-300">•</span>
            <h2 className="text-sm sm:text-base font-extrabold text-[#002F34]">All Marketplace Verticals</h2>
          </div>
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-0.5 cursor-pointer"
          >
            <span>Full Directory</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2-Line Grid: 7 cols on desktop = exactly 14 primary categories */}
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 sm:gap-2.5">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={cat.action}
              className="group flex flex-col items-center justify-center p-2 rounded-xl border border-transparent hover:border-teal-700/20 hover:bg-slate-50 transition text-center cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-[#002F34] group-hover:text-white text-[#002F34] flex items-center justify-center transition mb-1.5 shadow-xs">
                {cat.icon}
              </div>
              <span className="text-[11px] font-bold text-[#002F34] group-hover:text-blue-600 leading-tight truncate w-full">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 2. DISTINCTIVE HERO & FEATURE MODULE (SBP RAAST ESCROW + PHYSICAL INSPECTION STATS + FESTIVAL DEAL) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left: Dynamic Discovery Billboard with Escrow & Inspection Guarantee */}
        <div className="lg:col-span-8 rounded-2xl bg-gradient-to-br from-[#002F34] via-[#00474e] to-[#044c54] text-white p-6 sm:p-7 relative overflow-hidden flex flex-col justify-between shadow-sm">
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="space-y-3 relative z-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-yellow-400 text-[#002F34] text-[10px] font-black uppercase px-2.5 py-1 rounded-md shadow-xs">
                Direct Verified Marketplace
              </span>
              <span className="bg-white/10 text-white text-[10px] font-semibold px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>0% Escrow Fraud Guarantee</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              Buy & Sell in Lahore with <span className="text-yellow-300 underline decoration-yellow-400/40">Verified Confidence</span>.
            </h1>
            <p className="text-white/85 text-xs sm:text-sm font-medium max-w-xl leading-relaxed">
              Every high-ticket car, smartphone, and property can be purchased via safe exchange lockers and inspected by certified engineers before funds leave escrow.
            </p>
          </div>

          {/* Live Trust & Market Metrics Strip */}
          <div className="grid grid-cols-3 gap-3 pt-6 mt-6 border-t border-white/15 relative z-10 text-left">
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-yellow-300">200-Pt</div>
              <div className="text-[11px] text-white/75 font-medium">Car & Tech Inspection</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-emerald-300">Rs 0 Cost</div>
              <div className="text-[11px] text-white/75 font-medium">SafePay Escrow Release</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-white">4 SafeZones</div>
              <div className="text-[11px] text-white/75 font-medium">Gulberg, DHA & Johar Town</div>
            </div>
          </div>
        </div>

        {/* Right: Commercial Featured Partner Card */}
        <div className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-[#880e1b] to-[#5a0510] text-white p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="bg-yellow-400 text-[#002F34] text-[10px] font-black uppercase px-2 py-0.5 rounded font-mono">
                Verified Brand Festival
              </span>
              <span className="text-xs font-semibold text-white/80">Up to 25% OFF</span>
            </div>
            <h3 className="text-xl font-extrabold tracking-tight">MoltyFoam <span className="italic text-yellow-300 font-serif">‘Asli’ Foam</span></h3>
            <p className="text-xs text-white/85 leading-relaxed">
              Official Lahore warranty & express doorstep delivery across all town zones.
            </p>
          </div>

          <div className="mt-4 relative rounded-xl overflow-hidden border border-white/20 shadow-inner h-32 bg-slate-900/60 p-3 flex flex-col justify-end">
            <div className="text-xs font-bold text-yellow-200">Factory Certified Master Bed Series</div>
            <div className="text-[10px] text-white/80">Delivered within 24 hours in Lahore with COD protection.</div>
            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-xs text-[9px] text-white font-bold px-2 py-0.5 rounded">
              Guaranteed Genuine
            </div>
          </div>

          <div className="pt-3 flex items-center justify-between">
            <button
              onClick={() => showToast('Opening MoltyFoam Official Verified Store in Lahore...')}
              className="bg-yellow-400 hover:bg-yellow-300 text-[#002F34] font-extrabold text-xs px-4 py-2 rounded-lg transition shadow-xs cursor-pointer"
            >
              View Brand Deals
            </button>
            <span className="text-[11px] text-yellow-200 font-semibold">Lahore In-Stock</span>
          </div>
        </div>
      </section>

      {/* 3. VERIFIED HOT DEALS & PRIME SHOWCASE */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-6 bg-teal-700 rounded-full" />
              <h2 className="text-xl sm:text-2xl font-black text-[#002F34] tracking-tight">
                Verified Hot Deals & Prime Showcase
              </h2>
              <span className="bg-emerald-100 text-teal-800 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border border-emerald-300">
                PHYSICAL INSPECTION PASSED
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 ml-4.5">
              Hand-picked listings verified for genuine documents, clear ownership & battery/chassis health.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => onSelectCategory('all')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Explore All Prime →
            </button>
          </div>
        </div>

        {/* 4-Column Prime Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {listings.slice(0, 4).map(item => (
            <article
              key={item.id}
              onClick={() => setSelectedListing(item)}
              className="bg-white rounded-2xl border border-slate-200 hover:border-teal-700 overflow-hidden shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative h-44 bg-gradient-to-br from-slate-900 to-teal-950 p-3.5 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-start justify-between z-10">
                    <div className="flex flex-col gap-1">
                      {item.inspectionReport && (
                        <span className="bg-[#002F34] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow-xs">
                          Inspected: {item.inspectionReport.overallScore}/100
                        </span>
                      )}
                      <span className="bg-emerald-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-300" />
                        <span>Escrow Ready</span>
                      </span>
                    </div>

                    <button
                      onClick={(e) => toggleFavorite(e, item.id)}
                      className="p-1.5 bg-white/90 hover:bg-white rounded-full text-slate-700 hover:text-rose-600 shadow-xs transition cursor-pointer"
                    >
                      <Heart className={`w-3.5 h-3.5 ${favorites[item.id] ? 'fill-rose-600 text-rose-600' : ''}`} />
                    </button>
                  </div>

                  <div className="text-white z-10 text-xs font-semibold line-clamp-1">
                    {language === 'ur' ? item.titleUrdu : item.title}
                  </div>
                </div>

                <div className="p-3.5 space-y-1.5 text-xs">
                  <div className="flex items-baseline justify-between">
                    <div className="text-lg font-black text-[#002F34] font-mono tracking-tight tabular-nums">
                      PKR {item.pricePKR.toLocaleString()}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">{item.locality}</span>
                  </div>

                  <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600">
                    {item.title}
                  </h3>

                  <p className="text-slate-500 text-[11px] font-medium">
                    {item.attributes.year ? `${item.attributes.year} • ` : ''}
                    {item.attributes.mileageKm ? `${item.attributes.mileageKm.toLocaleString()} km • ` : ''}
                    {item.attributes.storage ? `${item.attributes.storage} • ` : ''}
                    {item.attributes.areaValue ? `${item.attributes.areaValue} ${item.attributes.areaUnit} • ` : ''}
                    {item.attributes.ptaStatus || item.attributes.possessionStatus || 'Verified Biometric'}
                  </p>
                </div>
              </div>

              <div className="p-3.5 pt-0">
                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <span className="text-[11px] text-slate-500 font-medium truncate">{item.seller.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCheckoutListing(item);
                    }}
                    className="bg-emerald-50 hover:bg-emerald-100 text-teal-900 border border-emerald-300 font-bold text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 transition cursor-pointer shrink-0"
                  >
                    <Lock className="w-3 h-3 text-teal-700" />
                    <span>SafePay</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. DISTINCTIVE TRUST RIBBON: SAFEZONE MEETING HUBS IN LAHORE */}
      <section className="bg-gradient-to-r from-[#002F34] via-teal-900 to-[#00474e] text-white rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-yellow-300 border border-white/20">
              <ShieldCheck className="w-6 h-6 text-yellow-300" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold tracking-tight">
                  Meet at PakClassifieds Safe Exchange Zones in Lahore
                </h3>
                <span className="bg-yellow-400 text-[#002F34] text-[10px] font-black uppercase px-2 py-0.5 rounded font-mono">Free</span>
              </div>
              <p className="text-slate-200 text-xs sm:text-sm max-w-2xl leading-relaxed">
                Never invite strangers to your home. Meet at our CCTV-monitored safe verification kiosks at Gulberg Mall & DHA Phase 6 with instant counterfeit currency checks & biometric transfer desks.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => showToast('📍 SafeZone desk reserved at Gulberg III Verification Kiosk.')}
              className="px-4 py-2.5 bg-white text-[#002F34] font-extrabold text-xs rounded-xl shadow-xs hover:bg-yellow-300 transition whitespace-nowrap cursor-pointer"
            >
              Book SafeZone Desk
            </button>
            <button
              onClick={() => showToast('Listing 4 SafeZones: DHA Phase 6, MM Alam Gulberg, Johar Town G-Block, Bahria Sector C')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/25 transition whitespace-nowrap cursor-pointer"
            >
              Find Nearby Zone
            </button>
          </div>
        </div>
      </section>

      {/* 5. SELLER VALUE PROPOSITION STRIP */}
      <section className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-12 h-12 rounded-2xl bg-[#002F34] text-yellow-300 flex items-center justify-center shrink-0 shadow-xs">
            <Plus className="w-6 h-6 text-yellow-300" />
          </div>
          <div className="space-y-1 text-xs">
            <span className="text-[11px] uppercase tracking-wider text-teal-700 font-extrabold">Instant Exposure in Lahore</span>
            <h3 className="text-xl font-black text-[#002F34] tracking-tight">Post Your Ad in Under 45 Seconds</h3>
            <p className="text-slate-600 max-w-xl text-xs">
              Zero listing fees. Chat directly with phone-verified buyers across Punjab or activate SafePay Escrow for 100% scam-free transactions.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsCreateListingOpen(true)}
          className="bg-[#002F34] hover:bg-[#001e22] text-white font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-xs hover:shadow-md transition flex items-center gap-2 whitespace-nowrap cursor-pointer"
        >
          <span>Start Free Selling</span>
          <ArrowRight className="w-4 h-4 text-yellow-300" />
        </button>
      </section>
    </div>
  );
};
