import React, { useState, useMemo } from 'react';
import { useMarketplace } from '../context/MarketplaceContext.tsx';
import { CategoryId, LahoreLocality } from '../types/index.ts';
import { ListingCard } from '../components/ListingCard.tsx';
import { MainPortalView } from './MainPortalView.tsx';
import { MotorsHubView } from './MotorsHubView.tsx';
import { PropertiesHubView } from './PropertiesHubView.tsx';
import {
  Search,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Award,
  ChevronLeft,
} from 'lucide-react';

export const BuyerView: React.FC = () => {
  const { listings, language, setIsWhatsAppModalOpen, activeHub, setActiveHub } = useMarketplace();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedLocality, setSelectedLocality] = useState<LahoreLocality>('All Lahore');
  const [onlyInspected, setOnlyInspected] = useState(false);
  const [onlyEscrow, setOnlyEscrow] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(100000000);

  const filteredListings = useMemo(() => {
    return listings.filter(item => {
      if (item.status === 'completed') return false;

      // Category
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

      // Locality
      if (selectedLocality !== 'All Lahore' && item.locality !== selectedLocality) return false;

      // Inspected only
      if (onlyInspected && !item.inspectionReport) return false;

      // Escrow only
      if (onlyEscrow && !item.escrowEligible) return false;

      // Price
      if (item.pricePKR > maxPrice) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q) || item.titleUrdu.includes(q);
        const matchesLocality = item.locality.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesLocality && !matchesCategory) return false;
      }

      return true;
    });
  }, [listings, selectedCategory, selectedLocality, onlyInspected, onlyEscrow, maxPrice, searchQuery]);

  // Route between Stitch-Exported Views
  if (activeHub === 'motors') {
    return <MotorsHubView onBackToMain={() => setActiveHub('portal')} />;
  }

  if (activeHub === 'properties') {
    return <PropertiesHubView onBackToMain={() => setActiveHub('portal')} />;
  }

  if (activeHub === 'portal') {
    return (
      <MainPortalView
        onSelectCategory={(cat) => {
          setSelectedCategory(cat as any);
          setActiveHub('search');
        }}
        onOpenMotorsHub={() => setActiveHub('motors')}
        onOpenPropertiesHub={() => setActiveHub('properties')}
      />
    );
  }

  // Full Faceted Search View (activeHub === 'search')
  return (
    <div className="space-y-6">
      {/* Return to Main Portal link */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setActiveHub('portal')}
          className="text-xs font-bold text-teal-800 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Main Marketplace Portal</span>
        </button>
        <span className="text-xs text-slate-500 font-mono">Faceted Lahore Search Engine</span>
      </div>

      {/* Discovery & Search Bar with Faceted Filters */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-4">
        {/* Main Search Row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2.5">
          {/* Locality Selector Dropdown */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl shrink-0 text-xs">
            <MapPin className="w-4 h-4 text-teal-700 shrink-0" />
            <select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value as LahoreLocality)}
              aria-label="Filter by Lahore neighborhood"
              className="bg-transparent font-semibold text-slate-800 focus:outline-hidden cursor-pointer"
            >
              <option value="All Lahore">All Lahore Locations</option>
              <option value="DHA Phase 1-8">DHA Phase 1-8</option>
              <option value="Gulberg II & III">Gulberg II & III</option>
              <option value="Johar Town">Johar Town</option>
              <option value="Bahria Town">Bahria Town</option>
              <option value="Model Town">Model Town</option>
              <option value="Cantt">Cantt</option>
              <option value="Lake City">Lake City</option>
              <option value="Wapda Town">Wapda Town</option>
            </select>
          </div>

          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Honda Civic, iPhone 15 Pro, 1 Kanal DHA House in Lahore..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-hidden focus:border-teal-600 focus:bg-white"
            />
          </div>

          {/* Quick WhatsApp Bot CTA */}
          <button
            onClick={() => setIsWhatsAppModalOpen(true)}
            className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>WhatsApp Search & Post</span>
          </button>
        </div>

        {/* Faceted Filter Strip */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {[
              { id: 'all', label: 'All Lahore Listings' },
              { id: 'property', label: '🏡 Property & Projects (DHA/Bahria)' },
              { id: 'motors', label: '🚗 Motors (Cars & Bikes)' },
              { id: 'mobiles', label: '📱 Mobiles & Tablets' },
              { id: 'electronics', label: '⚡ Electronics & ACs' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#002f34] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Trust Toggles */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyInspected}
                onChange={(e) => setOnlyInspected(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-teal-600 focus:ring-teal-500"
              />
              <span className="font-semibold text-emerald-800">Grade Inspected Only</span>
            </label>

            <label className="flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyEscrow}
                onChange={(e) => setOnlyEscrow(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-teal-600 focus:ring-teal-500"
              />
              <span className="font-semibold text-teal-900">Raast Escrow Eligible</span>
            </label>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-800 font-mono font-bold">{filteredListings.length}</strong> verified listings in <span className="text-teal-800 font-medium">{selectedLocality}</span>
        </span>
        <span className="hidden sm:inline">
          Prices verified against Lahore 30-day marketplace benchmarks
        </span>
      </div>

      {/* Listings Grid */}
      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-sm text-slate-900">No verified listings match your filter</h4>
          <p className="text-xs text-slate-500">
            Try adjusting your locality in Lahore or resetting the 200-point inspection requirement.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedLocality('All Lahore');
              setOnlyInspected(false);
              setOnlyEscrow(false);
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-teal-800 text-white rounded-lg text-xs font-semibold hover:bg-teal-900 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
