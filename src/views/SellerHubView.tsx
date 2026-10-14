import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext.tsx';
import { SellerTier } from '../types/index.ts';
import {
  Store,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Calendar,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  ArrowUpRight,
  Eye,
  MessageSquare,
  Plus,
  Building,
  UserCheck,
} from 'lucide-react';

export const SellerHubView: React.FC = () => {
  const {
    listings,
    escrowTransactions,
    verifyDeliveryWithOtp,
    sellerTier,
    upgradeSellerTier,
    setIsCreateListingOpen,
    setIsWhatsAppModalOpen,
    showToast,
  } = useMarketplace();

  const [otpInput, setOtpInput] = useState('');
  const [selectedTxId, setSelectedTxId] = useState(
    escrowTransactions.find(t => t.status === 'holding' || t.status === 'inspection_scheduled')?.id || ''
  );
  const [verifying, setVerifying] = useState(false);

  // CNIC verification modal state
  const [showCnicModal, setShowCnicModal] = useState(false);
  const [cnicInput, setCnicInput] = useState('35202-7194021-5');
  const [ntnInput, setNtnInput] = useState('9102481-4');

  // Compute stats
  const totalSellerEarnings = escrowTransactions
    .filter(t => t.status === 'delivered' || t.status === 'payout_released')
    .reduce((sum, t) => sum + (t.itemPricePKR - t.platformFeePKR), 0);

  const pendingEscrowBalance = escrowTransactions
    .filter(t => t.status === 'holding' || t.status === 'inspection_scheduled' || t.status === 'delivered')
    .reduce((sum, t) => sum + (t.itemPricePKR - t.platformFeePKR), 0);

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTxId || !otpInput.trim()) return;

    setVerifying(true);
    setTimeout(() => {
      const res = verifyDeliveryWithOtp(selectedTxId, otpInput);
      setVerifying(false);
      if (res.success) {
        setOtpInput('');
      } else {
        showToast(`❌ ${res.message}`);
      }
    }, 800);
  };

  const handleUpgradeTier = (tier: SellerTier) => {
    upgradeSellerTier(tier, { cnic: cnicInput, ntn: ntnInput });
    setShowCnicModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Welcome & Weekly Payout Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Seller Studio & Escrow Hub</h2>
            <span className="text-xs bg-teal-100 text-teal-800 font-semibold px-2.5 py-0.5 rounded-full">
              Lahore Verified Merchant
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Guaranteed 7-day Tuesday payouts via SBP Raast · 1% flat transparent platform fee.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsWhatsAppModalOpen(true)}
            className="px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors cursor-pointer"
          >
            Upload via WhatsApp
          </button>
          <button
            onClick={() => setIsCreateListingOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#002f34] hover:bg-[#002226] rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Ad</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* Next Weekly Payout */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span>Next Payout Cycle</span>
            <Calendar className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-lg font-bold text-slate-900 font-mono">
            Tuesday, 20 Oct 2026
          </div>
          <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>100% On-Time SLA Guarantee</span>
          </p>
        </div>

        {/* Escrow Cleared Balance */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span>Escrow Funds Pending Release</span>
            <DollarSign className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-lg font-bold text-teal-900 font-mono tabular-nums">
            PKR {pendingEscrowBalance.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400">
            Auto-transfers via SBP Raast Direct to IBAN
          </p>
        </div>

        {/* Total Cleared Earnings */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span>Historical Cleared Earnings</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-lg font-bold text-slate-900 font-mono tabular-nums">
            PKR {totalSellerEarnings.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400">
            Net of 1% platform fee (PKR {(totalSellerEarnings * 0.01).toFixed(0)})
          </p>
        </div>

        {/* Verification Tier */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span>Identity Trust Tier</span>
            <ShieldCheck className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-base font-bold text-slate-900 capitalize flex items-center gap-1">
            <span>{sellerTier.replace('_', ' ')}</span>
          </div>
          <button
            onClick={() => setShowCnicModal(true)}
            className="text-[11px] text-teal-700 font-semibold hover:underline block"
          >
            Upgrade to FBR NTN / NADRA Tier →
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Handover OTP Tool & Verification Status (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Handover OTP Redemption Tool */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                <KeyRound className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Verify Delivery Handover OTP
                </h3>
                <p className="text-[11px] text-slate-500">
                  Enter buyer's 6-digit code upon physical inspection to release escrow funds.
                </p>
              </div>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-600 font-medium block mb-1">
                  Select Order in Handover
                </label>
                <select
                  value={selectedTxId}
                  onChange={(e) => setSelectedTxId(e.target.value)}
                  className="w-full p-2 bg-slate-50 rounded-lg border border-slate-300 text-slate-800"
                >
                  <option value="">Select an escrow transaction...</option>
                  {escrowTransactions.map(tx => (
                    <option key={tx.id} value={tx.id}>
                      {tx.id} — {tx.listingTitle.slice(0, 30)}... (Status: {tx.status})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">
                  Enter 6-Digit Buyer Handover OTP
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 749216"
                  className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-300 text-slate-900 font-mono text-center text-lg tracking-widest font-bold focus:bg-white focus:border-teal-600"
                />
              </div>

              <button
                type="submit"
                disabled={verifying || !otpInput || !selectedTxId}
                className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-lg transition-colors shadow-xs cursor-pointer disabled:opacity-50"
              >
                {verifying ? 'Validating SBP Handover OTP...' : 'Confirm Handover & Clear Payout'}
              </button>
            </form>
          </div>

          {/* Pakistan Trust Architecture Explanation */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 space-y-3 text-xs">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Why Sellers Win on olx.com.pk 2.0</span>
            </h4>
            <ul className="space-y-2 text-slate-600 text-[11px] list-disc list-inside">
              <li>
                <strong>No 30-Day Waiting Period:</strong> Legacy OLX routinely delays seller disbursements beyond 30 days. We settle every Tuesday without exception.
              </li>
              <li>
                <strong>Zero Cash-on-Delivery Theft:</strong> Escrow guarantees the buyer has pre-funded via Raast or wallet before item is dispatched.
              </li>
              <li>
                <strong>Transparent 1% Fee:</strong> Complete tax invoices issued with FBR sales tax registration numbers.
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Active Listings & Escrow Ledger (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Listings Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Your Lahore Listings</h3>
                <span className="text-xs text-slate-500">Live visibility and price performance</span>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-600">
                {listings.length} Active Listings
              </span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {listings.slice(0, 4).map(item => (
                <div key={item.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 line-clamp-1">{item.title}</span>
                      {item.inspectionReport && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-semibold shrink-0">
                          Grade {item.inspectionReport.grade}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                      <span>{item.locality}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>{item.viewsCount} views</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        <span>{item.inquiriesCount} chats</span>
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-bold font-mono text-slate-900 text-sm block tabular-nums">
                      PKR {item.pricePKR.toLocaleString()}
                    </span>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded capitalize ${
                      item.status === 'in_escrow'
                        ? 'bg-amber-100 text-amber-800'
                        : item.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-teal-50 text-teal-800'
                    }`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Escrow Orders & Weekly Payout Tracking */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Escrow Transaction Ledger</h3>
                <span className="text-xs text-slate-500">Track holding funds and release status</span>
              </div>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {escrowTransactions.map(tx => (
                <div key={tx.id} className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-800">{tx.id}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-medium text-slate-900">{tx.buyerName}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase ${
                      tx.status === 'delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : tx.status === 'holding'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-indigo-100 text-indigo-800'
                    }`}>
                      {tx.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-500 text-[11px]">
                    <span className="truncate max-w-xs">{tx.listingTitle}</span>
                    <span className="font-mono text-slate-800 font-semibold tabular-nums">
                      Net: PKR {(tx.itemPricePKR - tx.platformFeePKR).toLocaleString()} (1% fee deducted)
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 pt-1.5">
                    <span>Payment: {tx.paymentMethod.toUpperCase()} {tx.raastReferenceId ? `(${tx.raastReferenceId.slice(0, 16)}...)` : ''}</span>
                    <span className="text-teal-700 font-medium">Payout Due: {tx.scheduledWeeklyPayout}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Identity Modal */}
      {showCnicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-teal-600" />
              <span>NADRA & FBR Seller Tier Upgrade</span>
            </h3>
            <p className="text-slate-500 leading-relaxed">
              Verify your CNIC and Federal Board of Revenue (NTN) to unlock high-ticket escrow sales (&gt; PKR 50,000) and receive the Verified Merchant badge.
            </p>

            <div className="space-y-3">
              <div>
                <label className="font-medium text-slate-700 block mb-1">NADRA CNIC Number</label>
                <input
                  type="text"
                  value={cnicInput}
                  onChange={(e) => setCnicInput(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-xs"
                  placeholder="35202-XXXXXXX-X"
                />
              </div>

              <div>
                <label className="font-medium text-slate-700 block mb-1">FBR Sales Tax NTN (Optional for SME)</label>
                <input
                  type="text"
                  value={ntnInput}
                  onChange={(e) => setNtnInput(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-xs"
                  placeholder="7491024-8"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCnicModal(false)}
                className="px-3 py-2 text-slate-600 hover:text-slate-900 font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleUpgradeTier('cnic_verified')}
                className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Verify NADRA CNIC
              </button>
              <button
                type="button"
                onClick={() => handleUpgradeTier('business_ntn')}
                className="px-4 py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Verify Business NTN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
