import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext.tsx';
import { PaymentMethod } from '../types/index.ts';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Smartphone,
  Building2,
  Wallet,
  Truck,
  Copy,
  Check,
} from 'lucide-react';

export const EscrowCheckoutModal: React.FC = () => {
  const { checkoutListing, setCheckoutListing, createEscrowTransaction, showToast } = useMarketplace();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('raast');
  const [includeInspection, setIncludeInspection] = useState(true);
  const [buyerName, setBuyerName] = useState('Zainab Fatima');
  const [buyerPhone, setBuyerPhone] = useState('03015521902');
  const [deliveryAddress, setDeliveryAddress] = useState('House 14-B, Cavalry Ground, Lahore Cantt');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedTx, setCompletedTx] = useState<{ id: string; otp: string; totalPaid: number } | null>(null);
  const [copiedOtp, setCopiedOtp] = useState(false);

  if (!checkoutListing) return null;

  const inspectionCost = includeInspection
    ? checkoutListing.category === 'motors'
      ? 5000
      : checkoutListing.category === 'mobiles'
      ? 2500
      : 1500
    : 0;

  const platformFee = Math.round(checkoutListing.pricePKR * 0.01); // 1% escrow fee
  const totalAmount = checkoutListing.pricePKR + platformFee + inspectionCost;

  const handleConfirmEscrowPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const tx = createEscrowTransaction({
        listing: checkoutListing,
        buyerName,
        buyerPhone,
        paymentMethod,
        includeInspection,
        deliveryAddress,
      });

      setIsProcessing(false);
      setCompletedTx({
        id: tx.id,
        otp: tx.handoverOtp,
        totalPaid: tx.totalPaidPKR,
      });
    }, 1200);
  };

  const copyOtpToClipboard = () => {
    if (completedTx) {
      navigator.clipboard.writeText(completedTx.otp);
      setCopiedOtp(true);
      showToast('✓ 6-Digit Delivery OTP copied to clipboard');
      setTimeout(() => setCopiedOtp(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-800 font-bold">
              <ShieldCheck className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Bharoosa Escrow Checkout (Lahore)
              </h3>
              <p className="text-xs text-slate-500">
                100% SBP Raast Protected Transaction · Funds held until delivery
              </p>
            </div>
          </div>

          <button
            onClick={() => setCheckoutListing(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-6">
          {completedTx ? (
            /* Post-Payment Success State with OTP */
            <div className="text-center space-y-6 py-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold">
                  Payment Secured in Escrow Vault
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  PKR {completedTx.totalPaid.toLocaleString()}
                </h3>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                  Transaction <strong className="font-mono text-slate-800">{completedTx.id}</strong> has been created.
                  Funds will remain frozen until you inspect the item and give the seller this Handover OTP.
                </p>
              </div>

              {/* 6-Digit Handover OTP Box */}
              <div className="bg-slate-50 border-2 border-dashed border-teal-500/80 rounded-2xl p-6 max-w-sm mx-auto space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                  Your 6-Digit Delivery Handover OTP
                </span>
                <div className="text-4xl font-black tracking-widest text-teal-800 font-mono">
                  {completedTx.otp}
                </div>
                <p className="text-[11px] text-slate-500 leading-tight">
                  Share this OTP code with the seller or courier <span className="underline font-semibold">ONLY AFTER</span> you have physically received and inspected the item in Lahore.
                </p>

                <button
                  onClick={copyOtpToClipboard}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-md transition-colors"
                >
                  {copiedOtp ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedOtp ? 'Copied!' : 'Copy Handover Code'}</span>
                </button>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => setCheckoutListing(null)}
                  className="px-6 py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-semibold text-sm rounded-xl transition-colors shadow-xs"
                >
                  Back to Marketplace
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleConfirmEscrowPayment} className="space-y-6">
              {/* Item Summary Strip */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono uppercase text-slate-500 block">Item Selected</span>
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{checkoutListing.title}</h4>
                  <span className="text-xs text-slate-500">{checkoutListing.locality} · Seller: {checkoutListing.seller.name}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-base font-bold text-slate-900 font-mono tabular-nums">
                    PKR {checkoutListing.pricePKR.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Payment Methods (Raast, JazzCash, Easypaisa, COD) */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5">
                  Select Trust-Protected Payment Gateway
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Raast */}
                  <label
                    onClick={() => setPaymentMethod('raast')}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      paymentMethod === 'raast'
                        ? 'bg-teal-50/70 border-teal-600 ring-1 ring-teal-600 text-slate-900'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'raast'}
                      onChange={() => setPaymentMethod('raast')}
                      className="mt-0.5 text-teal-600"
                    />
                    <div>
                      <div className="font-bold flex items-center gap-1.5 text-teal-950">
                        <Building2 className="w-4 h-4 text-teal-700" />
                        <span>Raast Instant Transfer</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        State Bank SBP interbank rails. Lowest friction, zero fee, instant hold.
                      </p>
                    </div>
                  </label>

                  {/* JazzCash */}
                  <label
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      paymentMethod === 'jazzcash'
                        ? 'bg-amber-50/70 border-amber-600 ring-1 ring-amber-600 text-slate-900'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'jazzcash'}
                      onChange={() => setPaymentMethod('jazzcash')}
                      className="mt-0.5 text-amber-600"
                    />
                    <div>
                      <div className="font-bold flex items-center gap-1.5 text-amber-950">
                        <Smartphone className="w-4 h-4 text-amber-700" />
                        <span>JazzCash Mobile Wallet</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Instant PIN authorization from your JazzCash mobile balance.
                      </p>
                    </div>
                  </label>

                  {/* Easypaisa */}
                  <label
                    onClick={() => setPaymentMethod('easypaisa')}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      paymentMethod === 'easypaisa'
                        ? 'bg-emerald-50/70 border-emerald-600 ring-1 ring-emerald-600 text-slate-900'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'easypaisa'}
                      onChange={() => setPaymentMethod('easypaisa')}
                      className="mt-0.5 text-emerald-600"
                    />
                    <div>
                      <div className="font-bold flex items-center gap-1.5 text-emerald-950">
                        <Wallet className="w-4 h-4 text-emerald-700" />
                        <span>Easypaisa Account</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Telenor Microfinance Bank secure escrow wallet gateway.
                      </p>
                    </div>
                  </label>

                  {/* COD Guaranteed */}
                  <label
                    onClick={() => setPaymentMethod('cod_guaranteed')}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                      paymentMethod === 'cod_guaranteed'
                        ? 'bg-indigo-50/70 border-indigo-600 ring-1 ring-indigo-600 text-slate-900'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={paymentMethod === 'cod_guaranteed'}
                      onChange={() => setPaymentMethod('cod_guaranteed')}
                      className="mt-0.5 text-indigo-600"
                    />
                    <div>
                      <div className="font-bold flex items-center gap-1.5 text-indigo-950">
                        <Truck className="w-4 h-4 text-indigo-700" />
                        <span>Guaranteed COD with OTP</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Pay cash upon delivery after physical inspection & OTP verification.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Inspection Add-on Checkbox */}
              <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    id="addInspection"
                    checked={includeInspection}
                    onChange={(e) => setIncludeInspection(e.target.checked)}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                  />
                  <label htmlFor="addInspection" className="text-xs text-teal-950 cursor-pointer">
                    <strong className="block font-semibold">Include 200-Point Third-Party Inspection</strong>
                    <span className="text-[11px] text-teal-800">
                      Certified inspector examines vehicle / device in Lahore before handover.
                    </span>
                  </label>
                </div>
                <span className="text-xs font-bold text-teal-900 font-mono shrink-0 tabular-nums">
                  + PKR {checkoutListing.category === 'motors' ? '5,000' : checkoutListing.category === 'mobiles' ? '2,500' : '1,500'}
                </span>
              </div>

              {/* Delivery Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-600 font-medium block mb-1">Buyer Full Name</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-800 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-xs"
                    placeholder="e.g. Zainab Fatima"
                  />
                </div>
                <div>
                  <label className="text-slate-600 font-medium block mb-1">Phone Number (SMS OTP)</label>
                  <input
                    type="text"
                    required
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-800 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-xs font-mono"
                    placeholder="0301-XXXXXXX"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-slate-600 font-medium block mb-1">Delivery / Handover Address (Lahore)</label>
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-800 focus:border-teal-600 focus:ring-1 focus:ring-teal-600 text-xs"
                    placeholder="House / Office, Area, Lahore"
                  />
                </div>
              </div>

              {/* Transparent Fee Breakdown */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-2 text-xs">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Transparent Transaction Accounting
                </h4>
                <div className="flex justify-between text-slate-600">
                  <span>Item Agreed Price</span>
                  <span className="font-mono tabular-nums">PKR {checkoutListing.pricePKR.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    <span>Platform Escrow Fee (1%)</span>
                    <span className="text-[10px] text-slate-400">(Trust-as-a-Service)</span>
                  </span>
                  <span className="font-mono tabular-nums">PKR {platformFee.toLocaleString()}</span>
                </div>
                {includeInspection && (
                  <div className="flex justify-between text-slate-600">
                    <span>Certified Lahore Inspection Audit</span>
                    <span className="font-mono tabular-nums">PKR {inspectionCost.toLocaleString()}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                  <span>Total Escrow Lock Amount</span>
                  <span className="font-mono text-teal-800 tabular-nums">PKR {totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing SBP Raast Escrow Freeze...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Confirm & Lock PKR {totalAmount.toLocaleString()} in Escrow</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
