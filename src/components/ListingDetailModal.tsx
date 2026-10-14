import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext.tsx';
import { ItemImageFallback } from './ItemImageFallback.tsx';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  TrendingDown,
  FileCheck2,
  MessageCircle,
  Phone,
  AlertTriangle,
  UserCheck,
  Award,
  Lock,
  ChevronRight,
} from 'lucide-react';

export const ListingDetailModal: React.FC = () => {
  const {
    selectedListing,
    setSelectedListing,
    setCheckoutListing,
    setInspectionModalReport,
    language,
    showToast,
  } = useMarketplace();

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  if (!selectedListing) return null;

  const { seller, attributes, inspectionReport } = selectedListing;

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent(
      `Assalam-o-Alaikum! I saw your listing for "${selectedListing.title}" on olx.com.pk (Listed: PKR ${selectedListing.pricePKR.toLocaleString()}). Is it still available for physical inspection in Lahore?`
    );
    window.open(`https://wa.me/923000592000?text=${text}`, '_blank');
    showToast('💬 Redirecting to WhatsApp with pre-filled inquiry...');
  };

  const handleCallMasked = () => {
    showToast(`📞 Dialing masked privacy number: ${seller.phoneMasked}`);
  };

  const handleReportScam = () => {
    if (!reportReason.trim()) return;
    setReportSubmitted(true);
    setTimeout(() => {
      setIsReportOpen(false);
      setReportSubmitted(false);
      setReportReason('');
      showToast('⚠️ Report filed to olx.com.pk Trust & Safety queue (Case #DSP-902).');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
              Listing ID: {selectedListing.id}
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-xs text-teal-800 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Bharoosa Escrow Guarantee</span>
            </span>
          </div>

          <button
            onClick={() => setSelectedListing(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Visuals & Specifications (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                <ItemImageFallback
                  category={selectedListing.category}
                  title={selectedListing.title}
                  hasInspection={Boolean(inspectionReport)}
                  grade={inspectionReport?.grade}
                  className="h-64 sm:h-72"
                />
              </div>

              {/* Title & Description */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 leading-snug">
                  {language === 'ur' ? selectedListing.titleUrdu : selectedListing.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{selectedListing.addressSnippet}</span>
                  <span aria-hidden="true">·</span>
                  <span>Posted {selectedListing.createdAt}</span>
                </div>
              </div>

              {/* Dynamic Attribute Grid */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Key Verified Specifications
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  {selectedListing.category === 'property' && (
                    <>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200/60">
                        <span className="text-slate-400 block text-[11px]">Area & Unit</span>
                        <span className="font-semibold text-amber-900 font-mono text-sm">{attributes.areaValue} {attributes.areaUnit}</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200/60">
                        <span className="text-slate-400 block text-[11px]">Property Type</span>
                        <span className="font-semibold text-slate-800">{attributes.propertyType}</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200/60">
                        <span className="text-slate-400 block text-[11px]">Society / Sector</span>
                        <span className="font-semibold text-slate-800">{attributes.societyName || selectedListing.locality}</span>
                      </div>
                      {attributes.bedrooms && (
                        <div className="p-2.5 bg-white rounded-lg border border-slate-200/60">
                          <span className="text-slate-400 block text-[11px]">Bedrooms & Baths</span>
                          <span className="font-semibold text-slate-800">{attributes.bedrooms} Beds · {attributes.bathrooms || 5} Baths</span>
                        </div>
                      )}
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200/60">
                        <span className="text-slate-400 block text-[11px]">Possession Status</span>
                        <span className="font-semibold text-emerald-700">{attributes.possessionStatus}</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200/60">
                        <span className="text-slate-400 block text-[11px]">Verified Documents</span>
                        <span className="font-semibold text-slate-800 truncate block">Transfer Letter / NOC</span>
                      </div>
                    </>
                  )}

                  {selectedListing.category === 'motors' && (
                    <>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200/60">
                        <span className="text-slate-400 block text-[11px]">Make & Model</span>
                        <span className="font-semibold text-slate-800">{attributes.make} {attributes.model}</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200/60">
                        <span className="text-slate-400 block text-[11px]">Model Year</span>
                        <span className="font-semibold text-slate-800">{attributes.year}</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200/60">
                        <span className="text-slate-400 block text-[11px]">Mileage</span>
                        <span className="font-semibold text-slate-800 font-mono">{attributes.mileageKm?.toLocaleString()} km</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200/60">
                        <span className="text-slate-400 block text-[11px]">Transmission</span>
                        <span className="font-semibold text-slate-800">{attributes.transmission}</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200/60">
                        <span className="text-slate-400 block text-[11px]">Registration Plate</span>
                        <span className="font-semibold text-slate-800 font-mono">{attributes.registeredPlate || 'Lahore (LE)'}</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200/60">
                        <span className="text-slate-400 block text-[11px]">Engine Capacity</span>
                        <span className="font-semibold text-slate-800">{attributes.engineCapacityCc} cc Turbo</span>
                      </div>
                    </>
                  )}

                  {selectedListing.category === 'mobiles' && (
                    <>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200/60">
                        <span className="text-slate-400 block text-[11px]">Device Brand</span>
                        <span className="font-semibold text-slate-800">{attributes.brand}</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200/60">
                        <span className="text-slate-400 block text-[11px]">Storage Capacity</span>
                        <span className="font-semibold text-slate-800">{attributes.storage}</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200/60">
                        <span className="text-slate-400 block text-[11px]">PTA Approval</span>
                        <span className="font-semibold text-indigo-700">{attributes.ptaStatus}</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200/60">
                        <span className="text-slate-400 block text-[11px]">Battery Health</span>
                        <span className="font-semibold text-emerald-700 font-mono">{attributes.batteryHealth}% Peak</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200/60">
                        <span className="text-slate-400 block text-[11px]">RAM</span>
                        <span className="font-semibold text-slate-800">{attributes.ram || '8 GB'}</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200/60">
                        <span className="text-slate-400 block text-[11px]">Warranty Status</span>
                        <span className="font-semibold text-slate-800">{attributes.warrantyRemaining || 'Brand Warranty'}</span>
                      </div>
                    </>
                  )}

                  {selectedListing.category === 'electronics' && (
                    <>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200/60">
                        <span className="text-slate-400 block text-[11px]">Tonnage / Size</span>
                        <span className="font-semibold text-slate-800">{attributes.tonnage}</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200/60">
                        <span className="text-slate-400 block text-[11px]">Efficiency</span>
                        <span className="font-semibold text-emerald-700">{attributes.energyRating}</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200/60">
                        <span className="text-slate-400 block text-[11px]">Inverter Technology</span>
                        <span className="font-semibold text-slate-800">{attributes.inverterTechnology ? 'DC T3 Inverter' : 'Standard'}</span>
                      </div>
                      <div className="p-2.5 bg-white rounded-lg border border-slate-200/60">
                        <span className="text-slate-400 block text-[11px]">Warranty</span>
                        <span className="font-semibold text-slate-800">{attributes.warrantyType}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Seller Description
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-100">
                  {language === 'ur' ? selectedListing.descriptionUrdu : selectedListing.description}
                </p>
              </div>

              {/* Inspection Certificate Banner */}
              {inspectionReport && (
                <div className="bg-emerald-50/80 rounded-xl p-4 border border-emerald-200 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-emerald-600" />
                      <span className="font-bold text-sm text-emerald-950">
                        Certified 200-Point Audit Passed (Grade {inspectionReport.grade})
                      </span>
                    </div>
                    <p className="text-xs text-emerald-900 leading-normal">
                      Inspected by {inspectionReport.inspectorName} ({inspectionReport.inspectorBadgeNumber}) on {inspectionReport.inspectionDate}.
                      Overall diagnostic score: <strong className="font-mono">{inspectionReport.overallScore}/100</strong>.
                    </p>
                  </div>
                  <button
                    onClick={() => setInspectionModalReport(inspectionReport)}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 shadow-xs"
                  >
                    <FileCheck2 className="w-3.5 h-3.5" />
                    <span>View Full Audit</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Pricing, Price Intelligence & Purchase Module (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              {/* Contiguous Price Box */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                <div>
                  <span className="text-xs text-slate-500 block">Listed Asking Price</span>
                  <div className="text-3xl font-black text-slate-900 font-mono tracking-tight tabular-nums">
                    PKR {selectedListing.pricePKR.toLocaleString()}
                  </div>
                </div>

                {/* Price Intelligence Meter */}
                <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium flex items-center gap-1">
                      <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Lahore Market Price Index</span>
                    </span>
                    <span className="font-mono text-emerald-700 font-semibold tabular-nums">
                      {selectedListing.priceDeltaPercent}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all"
                      style={{ width: `${Math.max(15, 50 + selectedListing.priceDeltaPercent * 2)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Fair Deal</span>
                    <span className="font-mono tabular-nums">Lahore Avg: PKR {selectedListing.marketAveragePKR.toLocaleString()}</span>
                  </div>
                </div>

                {/* Bharoosa Escrow Guarantee summary */}
                <div className="space-y-2 text-xs text-slate-600 bg-teal-50/70 p-3.5 rounded-xl border border-teal-200/70">
                  <div className="flex items-center gap-2 font-semibold text-teal-900">
                    <Lock className="w-4 h-4 text-teal-700" />
                    <span>Protected by Bharoosa Escrow</span>
                  </div>
                  <ul className="space-y-1 text-teal-950 text-[11px] list-disc list-inside">
                    <li>Your payment is securely held via State Bank Raast.</li>
                    <li>Funds are released only when you inspect & enter OTP.</li>
                    <li>Full refund guarantee if item does not match verified specs.</li>
                  </ul>
                </div>

                {/* Primary Buy with Escrow Action */}
                <button
                  onClick={() => {
                    setSelectedListing(null);
                    setCheckoutListing(selectedListing);
                  }}
                  className="w-full py-3.5 px-4 bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Buy with Bharoosa Escrow (Raast / Wallets)</span>
                </button>

                {/* Direct Contact Options */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={handleWhatsAppContact}
                    className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Chat</span>
                  </button>
                  <button
                    onClick={handleCallMasked}
                    className="py-2.5 px-3 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call (Masked)</span>
                  </button>
                </div>
              </div>

              {/* Seller Verification Card */}
              <div className="bg-white rounded-xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 text-sm">
                      {seller.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{seller.name}</h4>
                      <span className="text-[11px] text-slate-500">Member since {seller.memberSince}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-900 font-mono">⭐ {seller.rating}</span>
                    <span className="text-[10px] text-slate-400 block">{seller.totalDeals} verified deals</span>
                  </div>
                </div>

                {/* Seller Trust Badges */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2 text-[11px]">
                  {seller.tier === 'cnic_verified' && (
                    <span className="text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                      <UserCheck className="w-3 h-3 text-teal-600" />
                      <span>NADRA CNIC Verified ({seller.cnicMasked})</span>
                    </span>
                  )}
                  {seller.tier === 'business_ntn' && (
                    <span className="text-indigo-800 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                      <span>FBR Registered NTN #{seller.ntnNumber}</span>
                    </span>
                  )}
                  <span className="text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded font-mono">
                    Replies {seller.responseTime}
                  </span>
                </div>
              </div>

              {/* Report Listing link */}
              <div className="text-center">
                <button
                  onClick={() => setIsReportOpen(!isReportOpen)}
                  className="text-xs text-rose-600 hover:text-rose-700 font-medium inline-flex items-center gap-1"
                >
                  <AlertTriangle className="w-3 h-3" />
                  <span>Report misleading or fraudulent listing</span>
                </button>
              </div>

              {/* Inline Report Box if toggled */}
              {isReportOpen && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-2 text-xs">
                  <label className="font-semibold text-rose-950 block">Reason for complaint (CCP & Moderation):</label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full text-xs p-2 bg-white rounded border border-rose-300 text-slate-800"
                  >
                    <option value="">Select violation category...</option>
                    <option value="fake_pta">Fake PTA approval or temporary visitor patch</option>
                    <option value="meter_tamper">Odometer meter reversing / tampering</option>
                    <option value="counterfeit">Non-genuine refurbished item sold as box-pack</option>
                    <option value="advance_scam">Seller asking for direct Easypaisa advance</option>
                  </select>
                  <button
                    onClick={handleReportScam}
                    disabled={!reportReason || reportSubmitted}
                    className="w-full py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded transition-colors text-xs"
                  >
                    {reportSubmitted ? 'Submitting to Trust Admin...' : 'Submit to Compliance Officer'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
