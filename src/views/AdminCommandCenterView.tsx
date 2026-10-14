import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext.tsx';
import {
  ShieldAlert,
  ShieldCheck,
  Building2,
  FileSpreadsheet,
  AlertOctagon,
  Scale,
  Check,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';

export const AdminCommandCenterView: React.FC = () => {
  const { escrowTransactions, disputes, resolveDispute, showToast } = useMarketplace();

  // Escrow Vault Calculations
  const totalLockedPKR = escrowTransactions
    .filter(t => t.status === 'holding' || t.status === 'inspection_scheduled' || t.status === 'dispatched')
    .reduce((sum, t) => sum + t.totalPaidPKR, 0);

  const totalPlatformFeesCaptured = escrowTransactions.reduce((sum, t) => sum + t.platformFeePKR, 0);

  // Fraud alerts
  const [fraudAlerts] = useState([
    {
      id: 'FRD-109',
      risk: 'High Risk',
      title: 'Multi-City Rapid Vehicle Postings (Lahore / Rawalpindi)',
      detail: 'CNIC 38403-9182301-7 listed 4 Honda Civics at 35% below market within 3 hours using duplicate engine numbers.',
      actionTaken: 'Auto-suspended listing; flagged for Nadra biometric match',
      timestamp: '14 Oct 2026, 09:15 AM',
    },
    {
      id: 'FRD-108',
      risk: 'Medium Risk',
      title: 'PTA Patch / Non-DIRBS Keyword Match Triggered',
      detail: 'Listing in Gulberg flagged by AI moderation scanner for keywords "CPID patch IMEI 2 geared".',
      actionTaken: 'Held in quarantine; mandatory inspector DIRBS check required',
      timestamp: '13 Oct 2026, 08:40 PM',
    },
  ]);

  const handleExportFbrTaxReport = () => {
    showToast('📄 Exporting FBR Form 181 Marketplace Sales Tax Audit CSV...');
  };

  return (
    <div className="space-y-6">
      {/* Top Admin Summary Strip */}
      <div className="bg-[#002f34] text-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-xl font-bold">Trust, Safety & Escrow Vault (Central Console)</h2>
          </div>
          <p className="text-xs text-teal-200/90">
            State Bank Raast Settlement Gateway · FBR Sales Tax Compliance · CCP Fair Trading Radar
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportFbrTaxReport}
            className="px-3.5 py-2 text-xs font-semibold text-teal-900 bg-teal-100 hover:bg-teal-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export FBR Tax Audit</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* Total Escrow Vault Locked */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span>Escrow Vault (Raast / Wallets)</span>
            <Building2 className="w-4 h-4 text-teal-700" />
          </div>
          <div className="text-xl font-black text-slate-900 font-mono tabular-nums">
            PKR {totalLockedPKR.toLocaleString()}
          </div>
          <p className="text-[11px] text-teal-800 font-medium">
            100% Ring-fenced Trust Account
          </p>
        </div>

        {/* 1% Monetization Capture */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span>Captured 1% Platform Fees</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl font-black text-emerald-800 font-mono tabular-nums">
            PKR {totalPlatformFeesCaptured.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-400">
            Replaced unmonetized offline cash leakage
          </p>
        </div>

        {/* Dispute Resolution Rate */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span>Dispute Mediation Cases</span>
            <Scale className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-xl font-black text-slate-900 font-mono tabular-nums">
            {disputes.length} Active / 98.4% Solved
          </div>
          <p className="text-[11px] text-amber-700 font-medium">
            Average SLA: 4.2 Hours
          </p>
        </div>

        {/* CCP & Compliance Status */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span>CCP Compliance Grade</span>
            <ShieldCheck className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-base font-bold text-slate-900 font-mono">
            Grade A (Certified)
          </div>
          <p className="text-[11px] text-slate-400">
            FBR NTN #891024-3 Registered
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active Disputes & Mediation Queue (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-teal-700" />
                  <span>Dispute Resolution Case Management</span>
                </h3>
                <span className="text-xs text-slate-500">
                  Escrow arbitration with photographic evidence & SLA counter
                </span>
              </div>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {disputes.map(dispute => (
                <div key={dispute.id} className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">{dispute.id}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-semibold text-slate-800">{dispute.complainantName}</span>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      dispute.status === 'under_investigation'
                        ? 'bg-amber-100 text-amber-800'
                        : dispute.status === 'refunded_buyer'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {dispute.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900">{dispute.listingTitle}</h4>
                    <p className="text-slate-600 text-xs mt-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed">
                      <strong>Complaint:</strong> {dispute.reason}
                    </p>
                    <p className="text-slate-500 text-[11px] mt-1">
                      <strong>Auditor Evidence:</strong> {dispute.evidenceNotes}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2">
                    <span className="font-mono font-bold text-slate-800 tabular-nums">
                      Disputed Value: PKR {dispute.amountPKR.toLocaleString()}
                    </span>

                    {dispute.status === 'under_investigation' ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => resolveDispute(dispute.id, 'refunded_buyer')}
                          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          Refund Buyer (Raast)
                        </button>
                        <button
                          onClick={() => resolveDispute(dispute.id, 'released_seller')}
                          className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          Release to Seller
                        </button>
                      </div>
                    ) : (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Case Resolved & Closed</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Fraud Radar & FBR Compliance Log (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* AI Fraud Radar */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4 text-rose-600" />
                <span>NADRA & Scammer Detection Radar</span>
              </h3>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {fraudAlerts.map(alert => (
                <div key={alert.id} className="p-4 space-y-1.5 bg-rose-50/20">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-800 text-[11px] uppercase tracking-wide">
                      {alert.risk}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{alert.timestamp}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 leading-snug">{alert.title}</h4>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{alert.detail}</p>
                  <div className="text-[11px] text-slate-500 font-medium pt-1">
                    <span className="text-slate-400">Resolution:</span> {alert.actionTaken}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pakistan FBR Regulatory Status */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/80 space-y-3 text-xs">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Finance Act 2025 Compliance</span>
            </h4>
            <div className="space-y-2 text-[11px] text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span>SECP Corporation License</span>
                <span className="font-mono font-semibold text-slate-800">#0192841</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span>FBR Sales Tax Online Marketplace NTN</span>
                <span className="font-mono font-semibold text-slate-800">#7481920-5</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span>State Bank Raast PSP Gateway Partner</span>
                <span className="font-mono font-semibold text-emerald-700">1-Link & SBP Connected</span>
              </div>
              <div className="flex justify-between py-1">
                <span>PECA 2016 Content Takedown SLA</span>
                <span className="font-mono font-semibold text-slate-800">&lt; 2 Hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FBR Monthly Seller Reporting Table (Mandatory under Finance Act 2025) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden text-xs">
        <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50">
          <div>
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-teal-700" />
              <span>FBR Form 181 — Monthly Marketplace Seller Reporting Ledger</span>
            </h3>
            <p className="text-[11px] text-slate-500">
              Mandatory under Finance Act 2025: Submit vendor Name, CNIC, STRN & GMV to Federal Board of Revenue monthly.
            </p>
          </div>
          <button
            onClick={handleExportFbrTaxReport}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-teal-400" />
            <span>Download Form 181 CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left divide-y divide-slate-100">
            <thead className="bg-slate-50/80 text-[11px] font-bold uppercase text-slate-500 tracking-wider">
              <tr>
                <th className="px-4 py-3">Vendor / Store Name</th>
                <th className="px-4 py-3">NADRA CNIC</th>
                <th className="px-4 py-3">FBR STRN / NTN</th>
                <th className="px-4 py-3 text-right">Monthly GMV (PKR)</th>
                <th className="px-4 py-3 text-right">1% Platform Fee</th>
                <th className="px-4 py-3 text-right">Sales Tax Withheld</th>
                <th className="px-4 py-3 text-center">FBR Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50/50">
                <td className="px-4 py-3 font-semibold text-slate-900">AutoCraft Motors Lahore</td>
                <td className="px-4 py-3 font-mono text-[11px]">35202-4412098-1</td>
                <td className="px-4 py-3 font-mono text-[11px]">STRN: 32-77-9014-001-44</td>
                <td className="px-4 py-3 text-right font-mono font-bold tabular-nums">PKR 28,400,000</td>
                <td className="px-4 py-3 text-right font-mono tabular-nums">PKR 284,000</td>
                <td className="px-4 py-3 text-right font-mono tabular-nums text-emerald-700">PKR 45,440</td>
                <td className="px-4 py-3 text-center">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    Reported & Compliant
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="px-4 py-3 font-semibold text-slate-900">Al-Haram Real Estate & Builders</td>
                <td className="px-4 py-3 font-mono text-[11px]">35202-5501923-9</td>
                <td className="px-4 py-3 font-mono text-[11px]">STRN: 32-77-6102-003-88</td>
                <td className="px-4 py-3 text-right font-mono font-bold tabular-nums">PKR 104,500,000</td>
                <td className="px-4 py-3 text-right font-mono tabular-nums">PKR 1,045,000</td>
                <td className="px-4 py-3 text-right font-mono tabular-nums text-emerald-700">PKR 167,200</td>
                <td className="px-4 py-3 text-center">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    Reported & Compliant
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="px-4 py-3 font-semibold text-slate-900">Hamza Malik (Gadget Zone)</td>
                <td className="px-4 py-3 font-mono text-[11px]">35202-8924151-3</td>
                <td className="px-4 py-3 font-mono text-[11px]">STRN: 32-77-8761-002-19</td>
                <td className="px-4 py-3 text-right font-mono font-bold tabular-nums">PKR 4,620,000</td>
                <td className="px-4 py-3 text-right font-mono tabular-nums">PKR 46,200</td>
                <td className="px-4 py-3 text-right font-mono tabular-nums text-emerald-700">PKR 7,392</td>
                <td className="px-4 py-3 text-center">
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                    Reported & Compliant
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
