import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext.tsx';
import { Listing } from '../types/index.ts';
import {
  Car,
  Search,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Gauge,
  SlidersHorizontal,
  ArrowRight,
  FileText,
  Scale,
  Award,
  Sparkles,
  Heart,
} from 'lucide-react';

interface MotorsHubViewProps {
  onBackToMain: () => void;
}

export const MotorsHubView: React.FC<MotorsHubViewProps> = ({ onBackToMain }) => {
  const {
    listings,
    setSelectedListing,
    setCheckoutListing,
    setInspectionModalReport,
    showToast,
  } = useMarketplace();

  const motorListings = listings.filter(l => l.category === 'motors');

  const [selectedMake, setSelectedMake] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedKms, setSelectedKms] = useState('');

  const makes = [
    { name: 'Suzuki', letter: 'S', color: 'bg-red-50 text-red-600' },
    { name: 'Toyota', letter: 'T', color: 'bg-red-50 text-red-700' },
    { name: 'Honda', letter: 'H', color: 'bg-blue-50 text-blue-800' },
    { name: 'Daihatsu', letter: 'D', color: 'bg-red-50 text-red-500' },
    { name: 'Nissan', letter: 'N', color: 'bg-slate-100 text-slate-700' },
    { name: 'Hyundai', letter: 'H', color: 'bg-blue-50 text-blue-600' },
    { name: 'KIA', letter: 'K', color: 'bg-red-50 text-red-700' },
    { name: 'Haval', letter: 'H6', color: 'bg-teal-50 text-teal-800' },
    { name: 'MG', letter: 'MG', color: 'bg-red-50 text-red-800' },
    { name: 'Changan', letter: 'C', color: 'bg-blue-50 text-blue-700' },
    { name: 'Mercedes', letter: '★', color: 'bg-slate-100 text-slate-800' },
  ];

  const filteredMotors = motorListings.filter(item => {
    if (selectedMake !== 'All' && item.attributes.make !== selectedMake) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!item.title.toLowerCase().includes(q) && !(item.attributes.model?.toLowerCase().includes(q))) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Secondary Motors Navigation Bar */}
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
            <li><span className="text-[#002f34] font-bold border-b-2 border-[#002f34] pb-2">Used Cars</span></li>
            <li><button onClick={() => showToast('Listing newest 2026 Pakistani car launches...')} className="hover:text-[#002f34] transition cursor-pointer">New Cars</button></li>
            <li><button onClick={() => showToast('Opening side-by-side fuel & safety comparator...')} className="hover:text-[#002f34] transition cursor-pointer">Car Comparison</button></li>
            <li><button onClick={() => showToast('Fetching Lahore automotive road test reviews...')} className="hover:text-[#002f34] transition cursor-pointer">Expert Reviews</button></li>
            <li>
              <button
                onClick={() => {
                  const sample = listings.find(l => l.inspectionReport);
                  if (sample?.inspectionReport) setInspectionModalReport(sample.inspectionReport);
                }}
                className="inline-flex items-center text-teal-800 font-bold hover:underline transition cursor-pointer"
              >
                <span>Car Inspection</span>
                <span className="ml-1 px-1.5 py-0.2 bg-teal-100 text-teal-900 text-[10px] rounded uppercase font-bold">200-Pt</span>
              </button>
            </li>
            <li><button onClick={() => showToast('Calculating comprehensive Takaful car insurance...')} className="hover:text-[#002f34] transition cursor-pointer">Car Takaful</button></li>
          </ul>
        </div>
      </div>

      {/* Hero Search Section */}
      <section className="relative rounded-2xl bg-gradient-to-r from-slate-950 via-[#0b242e] to-slate-900 text-white min-h-[420px] flex flex-col justify-between overflow-hidden shadow-md p-6 sm:p-8">
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-400/30 text-teal-300 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest">
            <Car className="w-3.5 h-3.5 text-teal-400" />
            <span>PakClassifieds Motors • Lahore Certified Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
            Find Cars for Sale in Pakistan
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Browse verified vehicles with 200-Point Inspection, genuine paint certification, and SBP Raast Escrow protection.
          </p>
        </div>

        {/* Floating Integrated Search Console */}
        <div className="relative z-10 w-full max-w-4xl mx-auto mt-6 bg-white rounded-2xl shadow-xl p-4 text-[#002f34]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center text-xs">
            {/* Keyword Input */}
            <div className="md:col-span-7 relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Honda Civic, Toyota Yaris, Alto, Haval..."
                className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#002f34] text-xs text-slate-800"
              />
            </div>

            {/* Location */}
            <div className="md:col-span-5 relative">
              <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <select
                className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl bg-white text-xs font-semibold text-slate-800 cursor-pointer"
              >
                <option value="lahore">Lahore (DHA, Gulberg, Model Town)</option>
                <option value="karachi">Karachi (Clifton, DHA)</option>
                <option value="islamabad">Islamabad & Rawalpindi</option>
              </select>
            </div>

            {/* Filters Row */}
            <div className="md:col-span-4">
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="w-full py-2 px-3 border border-slate-300 rounded-lg text-xs bg-white text-slate-700 cursor-pointer"
              >
                <option value="">Price Range (PKR)</option>
                <option value="20">Under 20 Lacs</option>
                <option value="40">20 - 40 Lacs</option>
                <option value="70">40 - 70 Lacs</option>
                <option value="100">Above 70 Lacs</option>
              </select>
            </div>

            <div className="md:col-span-4">
              <select
                value={selectedKms}
                onChange={(e) => setSelectedKms(e.target.value)}
                className="w-full py-2 px-3 border border-slate-300 rounded-lg text-xs bg-white text-slate-700 cursor-pointer"
              >
                <option value="">Kms Driven</option>
                <option value="25000">Under 25,000 km</option>
                <option value="50000">Under 50,000 km</option>
                <option value="100000">Under 100,000 km</option>
              </select>
            </div>

            <div className="md:col-span-4">
              <button
                type="button"
                onClick={() => showToast(`Filtering ${filteredMotors.length} verified cars in Lahore`)}
                className="w-full py-2.5 bg-[#002f34] hover:bg-[#004750] text-white font-bold text-xs rounded-lg shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search Vehicles ({filteredMotors.length})</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Used Cars by Make */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#002f34]">Browse Used Cars by Make</h2>
            <p className="text-xs text-slate-500">Official Japanese and local Pakistani brand assemblies</p>
          </div>
          <button
            onClick={() => setSelectedMake('All')}
            className="text-xs font-semibold text-teal-800 hover:underline cursor-pointer"
          >
            {selectedMake === 'All' ? 'Showing All Makes' : 'Reset to All Makes'}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-2.5">
          {makes.map((mk, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedMake(selectedMake === mk.name ? 'All' : mk.name)}
              className={`flex items-center gap-2 p-2 rounded-xl border text-left transition cursor-pointer ${
                selectedMake === mk.name
                  ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-600'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${mk.color}`}>
                {mk.letter}
              </div>
              <span className="text-xs font-semibold text-slate-800 truncate">{mk.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Explore PakClassifieds Motors Services (5-Grid) */}
      <section className="space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-[#002f34]">Explore PakClassifieds Motors Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-xs">
          {/* New Cars */}
          <div
            onClick={() => showToast('Opening New Cars catalog with official ex-factory prices...')}
            className="p-4 bg-gradient-to-b from-[#f0f9f8] to-white border border-teal-100 rounded-xl hover:shadow-xs transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="p-2 w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center mb-2">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#002f34]">New Cars</h3>
              <p className="text-slate-500 text-[11px] mt-1">Ex-factory prices, specs & reviews of newest Pakistan launches.</p>
            </div>
            <span className="text-[11px] font-bold text-teal-800 mt-3 flex items-center gap-1">Explore New →</span>
          </div>

          {/* Car Comparison */}
          <div
            onClick={() => showToast('Comparing Civic vs Yaris fuel economy & safety...')}
            className="p-4 bg-gradient-to-b from-blue-50/50 to-white border border-blue-100 rounded-xl hover:shadow-xs transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="p-2 w-9 h-9 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center mb-2">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#002f34]">Car Comparison</h3>
              <p className="text-slate-500 text-[11px] mt-1">Side-by-side fuel, safety, turbo, and ground clearance checks.</p>
            </div>
            <span className="text-[11px] font-bold text-blue-800 mt-3 flex items-center gap-1">Compare Cars →</span>
          </div>

          {/* Expert Reviews */}
          <div
            onClick={() => showToast('Loading Lahore road-test expert video reviews...')}
            className="p-4 bg-gradient-to-b from-amber-50/40 to-white border border-amber-100 rounded-xl hover:shadow-xs transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="p-2 w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center mb-2">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#002f34]">Car Reviews</h3>
              <p className="text-slate-500 text-[11px] mt-1">Read honest verified owner experiences & highway mileage stats.</p>
            </div>
            <span className="text-[11px] font-bold text-amber-800 mt-3 flex items-center gap-1">Read Reviews →</span>
          </div>

          {/* 200-Pt Inspection */}
          <div
            onClick={() => {
              const sample = listings.find(l => l.inspectionReport);
              if (sample?.inspectionReport) setInspectionModalReport(sample.inspectionReport);
            }}
            className="p-4 bg-gradient-to-b from-emerald-50/70 to-white border border-emerald-300 rounded-xl hover:shadow-xs transition cursor-pointer flex flex-col justify-between ring-1 ring-emerald-400/30"
          >
            <div>
              <div className="p-2 w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-[#002f34]">Car Inspection</h3>
                <span className="bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.2 rounded">200-Pt</span>
              </div>
              <p className="text-slate-500 text-[11px] mt-1">Digital diagnostic check: paint thickness gauge & ECU prober.</p>
            </div>
            <span className="text-[11px] font-bold text-emerald-800 mt-3 flex items-center gap-1">View Sample Report →</span>
          </div>

          {/* Auction Sheet Verification */}
          <div
            onClick={() => showToast('Japanese auction sheet verification portal is active.')}
            className="p-4 bg-gradient-to-b from-purple-50/40 to-white border border-purple-100 rounded-xl hover:shadow-xs transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="p-2 w-9 h-9 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center mb-2">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#002f34]">Auction Sheet</h3>
              <p className="text-slate-500 text-[11px] mt-1">Verify Japanese imported chassis numbers and genuine auction grades.</p>
            </div>
            <span className="text-[11px] font-bold text-purple-800 mt-3 flex items-center gap-1">Verify Sheet →</span>
          </div>
        </div>
      </section>

      {/* Verified Cars Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-xl font-bold text-[#002f34]">Verified Used Cars in Lahore & Beyond</h2>
            <p className="text-xs text-slate-500">Thoroughly inspected vehicles with clean registration & instant biometric transfer</p>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-600">{filteredMotors.length} Vehicles Available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMotors.map(car => (
            <article
              key={car.id}
              onClick={() => setSelectedListing(car)}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="relative h-44 bg-gradient-to-br from-slate-900 to-teal-950 p-3 flex flex-col justify-between overflow-hidden">
                  <div className="flex items-start justify-between z-10">
                    <div className="flex flex-col gap-1">
                      {car.inspectionReport && (
                        <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                          200-Pt Inspected {car.inspectionReport.overallScore}/100
                        </span>
                      )}
                      <span className="bg-[#002f34] text-teal-300 text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs">
                        {car.attributes.assembly || 'Local Assembly'}
                      </span>
                    </div>
                  </div>

                  <div className="text-white z-10 text-xs font-semibold line-clamp-1">
                    {car.title}
                  </div>
                </div>

                <div className="p-4 space-y-2 text-xs">
                  <div className="text-xl font-bold text-[#002f34] font-mono tabular-nums">
                    PKR {car.pricePKR.toLocaleString()}
                  </div>

                  <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-teal-800 transition">
                    {car.title}
                  </h3>

                  <p className="text-slate-500 text-[11px]">{car.locality} • Lahore Biometric Ready</p>

                  <div className="flex items-center justify-between text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span>{car.attributes.year}</span>
                    <span>•</span>
                    <span>{car.attributes.mileageKm?.toLocaleString()} km</span>
                    <span>•</span>
                    <span>{car.attributes.transmission}</span>
                    <span>•</span>
                    <span>{car.attributes.fuelType}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Raast Escrow</span>
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCheckoutListing(car);
                    }}
                    className="px-3 py-1.5 bg-[#002f34] text-white text-xs font-semibold rounded-lg hover:bg-teal-900 transition cursor-pointer"
                  >
                    View & Buy with Escrow
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
