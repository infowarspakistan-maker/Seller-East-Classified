import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext.tsx';
import { Listing } from '../types/index.ts';
import {
  Home,
  Building,
  Search,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  SlidersHorizontal,
  ArrowRight,
  FileText,
  Lock,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface PropertiesHubViewProps {
  onBackToMain: () => void;
}

export const PropertiesHubView: React.FC<PropertiesHubViewProps> = ({ onBackToMain }) => {
  const {
    listings,
    setSelectedListing,
    setCheckoutListing,
    setInspectionModalReport,
    showToast,
  } = useMarketplace();

  const propertyListings = listings.filter(l => l.category === 'property');

  const [intent, setIntent] = useState<'buy' | 'rent'>('buy');
  const [propertyType, setPropertyType] = useState('Houses & Villas');
  const [selectedAreaSize, setSelectedAreaSize] = useState('10 Marla');
  const [areaUnit, setAreaUnit] = useState('Marla');
  const [selectedPriceRange, setSelectedPriceRange] = useState('1.5 - 6.0 Crore');

  const propertyTypes = [
    { name: 'Houses', count: '24.5k ads', icon: '🏡' },
    { name: 'Apartments & Flats', count: '8.1k ads', icon: '🏢' },
    { name: 'Portions & Floors', count: '4.3k ads', icon: '🏠' },
    { name: 'Shops', count: '3.9k ads', icon: '🏪' },
    { name: 'Commercial Plots', count: '12.1k ads', icon: '🏗️' },
    { name: 'Residential Plots', count: '38.4k ads', icon: '📍' },
    { name: 'Industrial Plots', count: '1.4k ads', icon: '🏭' },
    { name: 'Agricultural Land', count: '5.6k ads', icon: '🌾' },
    { name: 'Files', count: '9.2k ads', icon: '📂' },
    { name: 'Plot Form', count: '2.1k ads', icon: '📜' },
    { name: 'Building', count: '1.8k ads', icon: '🏛️' },
    { name: 'Office', count: '6.7k ads', icon: '💼' },
    { name: 'Factory', count: '850 ads', icon: '🏗️' },
    { name: 'Warehouse', count: '1.2k ads', icon: '🏬' },
  ];

  return (
    <div className="space-y-8">
      {/* Secondary Properties Navigation Bar */}
      <div className="bg-white border-b border-slate-200 -mt-6 -mx-4 sm:-mx-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-semibold py-2.5 overflow-x-auto">
          <ul className="flex items-center space-x-6 text-slate-700 whitespace-nowrap">
            <li>
              <button
                onClick={onBackToMain}
                className="text-slate-500 hover:text-slate-900 transition flex items-center gap-1 cursor-pointer"
              >
                <span>← Main Portal</span>
              </button>
            </li>
            <li><span className="text-[#002f34] font-bold border-b-2 border-[#002f34] pb-2">Buy</span></li>
            <li><button onClick={() => setIntent(intent === 'buy' ? 'rent' : 'buy')} className="hover:text-[#002f34] transition cursor-pointer">Rent</button></li>
            <li><button onClick={() => showToast('Filtering commercial plazas & shops in Gulberg...')} className="hover:text-[#002f34] transition cursor-pointer">Commercial</button></li>
            <li><button onClick={() => showToast('Opening DHA & Bahria Town New Housing Projects...')} className="hover:text-[#002f34] transition cursor-pointer">Projects</button></li>
            <li><button onClick={() => showToast('Exploring Under-Construction Developments...')} className="hover:text-[#002f34] transition cursor-pointer">New Launches</button></li>
            <li><button onClick={() => showToast('Filtering solid ground residential plots in Lahore...')} className="hover:text-[#002f34] transition cursor-pointer">Land & Plots</button></li>
            <li>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 mr-1">
                NEW
              </span>
              <button onClick={() => showToast('Filtering LDA & DHA verified title deeds...')} className="text-emerald-800 font-bold hover:underline transition cursor-pointer">
                NOC Vetted
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Hero Search Banner */}
      <section className="relative rounded-2xl bg-gradient-to-r from-slate-950 via-stone-900 to-slate-900 text-white min-h-[420px] flex flex-col justify-between overflow-hidden shadow-md p-6 sm:p-8">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-400/30 text-amber-300 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest">
            <Home className="w-3.5 h-3.5 text-amber-400" />
            <span>PakClassifieds Properties • Lahore Verified Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
            Find Properties for Sale in Pakistan
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            100% Registry Verified • DHA, Bahria & LDA Approved Societies • Instant Escrow Token.
          </p>

          {/* Buy / Rent Filter Pill */}
          <div className="inline-flex p-1 mt-2 bg-white/95 rounded-xl shadow-md">
            <button
              onClick={() => setIntent('buy')}
              className={`px-7 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                intent === 'buy'
                  ? 'bg-[#002f34] text-white shadow-xs'
                  : 'text-[#002f34] hover:bg-slate-100'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setIntent('rent')}
              className={`px-7 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                intent === 'rent'
                  ? 'bg-[#002f34] text-white shadow-xs'
                  : 'text-[#002f34] hover:bg-slate-100'
              }`}
            >
              Rent
            </button>
          </div>
        </div>

        {/* Floating Multi-Parameter Search Filter Console */}
        <div className="relative z-10 w-full max-w-4xl mx-auto mt-6 bg-white rounded-2xl shadow-xl p-4 text-[#002f34]">
          <div className="space-y-3 text-xs">
            {/* Row 1: Property Type & Search Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="border border-slate-300 rounded-xl px-3 py-2 bg-slate-50/50">
                <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Property Type</span>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full bg-transparent border-0 p-0 text-xs font-bold text-[#002f34] cursor-pointer"
                >
                  <option value="Houses & Villas">Houses & Villas</option>
                  <option value="Land & Plots">Land & Plots</option>
                  <option value="Apartments & Flats">Apartments & Flats</option>
                  <option value="Commercial Buildings & Plazas">Commercial Buildings & Plazas</option>
                </select>
              </div>

              <div className="border border-slate-300 rounded-xl px-3 py-2 bg-slate-50/50">
                <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">City / Locality</span>
                <input
                  type="text"
                  readOnly
                  value="Lahore (DHA, Bahria Town, Gulberg)"
                  className="w-full bg-transparent border-0 p-0 text-xs font-semibold text-slate-800"
                />
              </div>
            </div>

            {/* Row 2: Area Size with Unit Selector, Price, and Submit CTA */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-5 flex items-center border border-slate-300 rounded-xl px-3 py-1.5 bg-slate-50/50">
                <div className="flex-1">
                  <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Area Size</span>
                  <select
                    value={selectedAreaSize}
                    onChange={(e) => setSelectedAreaSize(e.target.value)}
                    className="w-full bg-transparent border-0 p-0 text-xs font-bold text-[#002f34] cursor-pointer"
                  >
                    <option value="5 Marla">5 Marla</option>
                    <option value="10 Marla">10 Marla</option>
                    <option value="1 Kanal">1 Kanal</option>
                    <option value="2 Kanal">2 Kanal</option>
                  </select>
                </div>
                <div className="border-l border-slate-300 pl-2 ml-2">
                  <select
                    value={areaUnit}
                    onChange={(e) => setAreaUnit(e.target.value)}
                    className="bg-slate-100 rounded-md px-2 py-1 text-xs font-semibold text-slate-700 cursor-pointer"
                  >
                    <option value="Marla">Marla</option>
                    <option value="Kanal">Kanal</option>
                    <option value="Sq. Ft">Sq. Ft</option>
                    <option value="Sq. Yd">Sq. Yd</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-4 border border-slate-300 rounded-xl px-3 py-1.5 bg-slate-50/50">
                <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Price Range (PKR)</span>
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full bg-transparent border-0 p-0 text-xs font-semibold text-[#002f34] cursor-pointer"
                >
                  <option value="0 - 50 Lacs">0 - 50 Lacs</option>
                  <option value="50 Lacs - 1.5 Crore">50 Lacs - 1.5 Crore</option>
                  <option value="1.5 - 6.0 Crore">1.5 Crore - 6.0 Crore</option>
                  <option value="6.0+ Crore">6.0+ Crore</option>
                </select>
              </div>

              <div className="md:col-span-3">
                <button
                  type="button"
                  onClick={() => showToast(`Filtered ${propertyListings.length} verified properties in Lahore`)}
                  className="w-full py-2.5 bg-[#002f34] hover:bg-[#001f22] text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search Properties</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search by Property Type Grid */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base sm:text-lg font-extrabold text-[#002f34]">Search by Property Type</h2>
          <p className="text-xs text-slate-500">Explore Pakistani verified residential, commercial, industrial and agricultural land</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {propertyTypes.map((pt, idx) => (
            <button
              key={idx}
              onClick={() => showToast(`Filtering ${pt.name} in Lahore...`)}
              className="flex flex-col items-center p-3 bg-slate-50/60 rounded-xl border border-slate-200 hover:border-teal-700/40 hover:bg-white hover:shadow-xs transition text-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center mb-1.5 text-xl shadow-xs">
                {pt.icon}
              </div>
              <span className="text-xs font-bold text-slate-800 leading-tight">{pt.name}</span>
              <span className="text-[10px] text-slate-400 mt-0.5">{pt.count}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Trust Verification Ribbon */}
      <section className="bg-gradient-to-r from-[#002f34] via-[#003b41] to-[#004f58] rounded-2xl p-5 sm:p-6 text-white shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 border-l-8 border-yellow-400 text-xs">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
            <ShieldCheck className="w-7 h-7 text-yellow-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-bold">Property SafeLock Escrow & NOC Patwari Registry Guarantee</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-yellow-400 text-slate-900 uppercase font-mono">
                Govt Verified
              </span>
            </div>
            <p className="text-slate-300 text-xs mt-0.5">
              100% scam-free dealings. All deeds vetted directly against LDA, DHA Lahore, and CDA land registries.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => showToast('Site verification requested with DHA Lahore Land Registry Desk.')}
            className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-bold text-xs rounded-lg shadow-xs transition cursor-pointer"
          >
            Book Site Verification
          </button>
          <button
            onClick={() => {
              const sample = listings.find(l => l.category === 'property' && l.inspectionReport);
              if (sample?.inspectionReport) setInspectionModalReport(sample.inspectionReport);
            }}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-lg border border-white/20 transition cursor-pointer"
          >
            View Verified Title Deed
          </button>
        </div>
      </section>

      {/* Houses & Real Estate Showcase Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl font-bold text-[#002f34]">Houses for Sale in Lahore</h2>
            <p className="text-xs text-slate-500">Handpicked premium verified inventory in DHA, Bahria Town & Model Town</p>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-600">{propertyListings.length} Listings Available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {propertyListings.map(prop => (
            <article
              key={prop.id}
              onClick={() => setSelectedListing(prop)}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative h-44 bg-gradient-to-br from-stone-900 to-amber-950 p-3 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-start justify-between z-10">
                    <span className="bg-yellow-400 text-[#002f34] text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-xs font-mono">
                      FEATURED
                    </span>
                    <span className="bg-[#002f34]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-xs">
                      100% NOC Cleared
                    </span>
                  </div>

                  <div className="text-white z-10 text-xs font-semibold line-clamp-1">
                    {prop.title}
                  </div>
                </div>

                <div className="p-4 space-y-2 text-xs">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-black text-[#002f34] font-mono tabular-nums">
                      PKR {prop.pricePKR.toLocaleString()}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      Registry Done
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-teal-800 transition">
                    {prop.title}
                  </h3>

                  <p className="text-slate-500 text-[11px] flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{prop.addressSnippet}</span>
                  </p>

                  <div className="flex items-center space-x-4 border-t border-slate-100 pt-3 text-slate-600 font-medium text-[11px]">
                    {prop.attributes.bedrooms && <span>🛏️ {prop.attributes.bedrooms} Beds</span>}
                    {prop.attributes.bathrooms && <span>🚿 {prop.attributes.bathrooms} Baths</span>}
                    <span className="font-bold text-amber-900">📐 {prop.attributes.areaValue} {prop.attributes.areaUnit}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCheckoutListing(prop);
                  }}
                  className="w-full py-2 bg-slate-50 hover:bg-[#002f34] text-[#002f34] hover:text-white font-bold text-xs rounded-lg border border-slate-200 hover:border-[#002f34] transition cursor-pointer"
                >
                  SafeLock Escrow Token & Inquiry
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
