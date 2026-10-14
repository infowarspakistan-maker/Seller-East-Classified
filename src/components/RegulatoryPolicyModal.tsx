import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Scale, AlertOctagon, RotateCcw } from 'lucide-react';
import { PolicyPageId } from '../types/index.ts';

interface RegulatoryPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegulatoryPolicyModal: React.FC<RegulatoryPolicyModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<PolicyPageId>('consumer_protection');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-800">
              <Scale className="w-4 h-4 text-teal-700" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Pakistan Regulatory Compliance & Policy Center
              </h3>
              <p className="text-xs text-slate-500">
                Governed under SECP, SBP Escrow Directives, and Finance Act 2025
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 py-2 bg-slate-100 border-b border-slate-200 overflow-x-auto text-xs font-medium">
          {[
            { id: 'consumer_protection', label: 'Consumer Protection & SBP Escrow' },
            { id: 'refund_policy', label: '3-Day Electronics Refund Window' },
            { id: 'prohibited_items', label: 'Prohibited Items (24h SLA)' },
            { id: 'seller_code', label: 'Seller Code of Conduct (STRN)' },
            { id: 'terms', label: 'Terms & Conditions' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as PolicyPageId)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-teal-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Policy Content */}
        <div className="overflow-y-auto p-6 space-y-4 text-xs text-slate-700 leading-relaxed">
          {activeTab === 'consumer_protection' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                Consumer Protection & SBP Raast Custody Regulations
              </h4>
              <p>
                In compliance with the State Bank of Pakistan Payment Systems Operator (PSO) guidelines and the Ministry of Commerce E-Commerce Framework:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-600">
                <li>
                  <strong>Ring-Fenced Escrow:</strong> 100% of buyer advance payments are held in an authorized SBP partner trust account (1-Link connected). The platform cannot utilize customer deposits for operating expenses.
                </li>
                <li>
                  <strong>Handover OTP Protocol:</strong> Escrow disbursements to sellers require affirmative physical authorization via the buyer's 6-digit Delivery OTP.
                </li>
                <li>
                  <strong>48-Hour Acknowledgment SLA:</strong> Any reported grievance is acknowledged by our Lahore dispute team within 48 hours, with mandatory final resolution within 7 calendar days.
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'refund_policy' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                Refunds & Returns Policy (3-Day Inspection Window)
              </h4>
              <p>
                To eliminate fraudulent listing bait-and-switch:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-600">
                <li>
                  <strong>Mobiles & Electronics:</strong> Buyers maintain a 3-day window from OTP confirmation to report hidden motherboard repairs, non-DIRBS PTA lock triggers, or counterfeit components.
                </li>
                <li>
                  <strong>Motors:</strong> If a vehicle was sold with a certified inspection certificate and subsequent physical verification reveals unrecorded structural frame cut/joint welds, the full transaction price is held in dispute mediation.
                </li>
                <li>
                  <strong>Turnaround:</strong> Approved refunds are credited directly back to the buyer's Raast IBAN or original wallet within 24 business hours.
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'prohibited_items' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                Prohibited Items & Content Takedown (PECA 2016 Compliant)
              </h4>
              <p>
                Under Pakistan's Import Policy Order and PECA 2016 regulations, the following items are strictly prohibited from listing:
              </p>
              <div className="grid grid-cols-2 gap-2 p-3 bg-rose-50 rounded-xl border border-rose-200 text-rose-950 font-medium">
                <div>• Weapons, Ammunition & Replica Firearms</div>
                <div>• Counterfeit Currencies & MLM Schemes</div>
                <div>• CPID / IMEI Repair & Geared Patches</div>
                <div>• Stolen Electronics / iCloud Locked Devices</div>
                <div>• Narcotic Drugs & Unregistered Medicines</div>
                <div>• Adult Material & Pirated Software Keys</div>
              </div>
              <p className="text-[11px] text-slate-500">
                Mandatory 24-hour removal SLA upon notice by PTA, FIA, or community flag reports. Offending accounts are permanently blacklisted by CNIC.
              </p>
            </div>
          )}

          {activeTab === 'seller_code' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                Seller Code of Conduct & Finance Act 2025 (STRN)
              </h4>
              <p>
                Under the Finance Act 2025 enacted by the Federal Parliament:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-600">
                <li>
                  Every commercial seller and dealership operating on an online marketplace must possess an active National Tax Number (NTN) and Sales Tax Registration Number (STRN).
                </li>
                <li>
                  Monthly reporting of seller identities and transaction volume is submitted to the Federal Board of Revenue via Form 181.
                </li>
                <li>
                  Sellers agree to a 100% Genuineness Warranty. Supplying counterfeit goods incurs immediate account termination and legal forfeiture of held escrow balances.
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                Terms of Service & Governing Law
              </h4>
              <p>
                These terms are governed by and construed in accordance with the laws of the Islamic Republic of Pakistan, with exclusive jurisdiction in the Courts of Lahore.
              </p>
              <p className="text-slate-500">
                Platform fee of 1% is charged for providing trust verification, escrow holding, and dispute resolution infrastructure. Payouts are executed every Tuesday to verified bank accounts.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>Official Corporate Entity: olx.com.pk (Private) Limited · Lahore</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors cursor-pointer"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
