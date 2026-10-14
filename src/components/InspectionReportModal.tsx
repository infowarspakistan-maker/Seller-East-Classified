import React from 'react';
import { useMarketplace } from '../context/MarketplaceContext.tsx';
import {
  X,
  Award,
  CheckCircle2,
  FileText,
  Printer,
  ShieldCheck,
  Check,
  Calendar,
  BadgeCheck,
} from 'lucide-react';

export const InspectionReportModal: React.FC = () => {
  const { inspectionModalReport, setInspectionModalReport, showToast } = useMarketplace();

  if (!inspectionModalReport) return null;

  const handlePrintCertificate = () => {
    showToast('🖨️ Generating PDF verification certificate for download...');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Certificate Header Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 relative overflow-hidden">
          <div className="relative z-10 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-300">
                  olx.com.pk Certified Inspection Certificate
                </span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-white">
                200-Point Physical Diagnostic Audit
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-300 font-mono pt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Date: {inspectionModalReport.inspectionDate}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="truncate max-w-[200px]">Hash: {inspectionModalReport.verificationHash}</span>
              </div>
            </div>

            {/* Big Grade Badge */}
            <div className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-3 shadow-lg">
              <span className="text-3xl font-black text-emerald-400 block font-mono">
                {inspectionModalReport.grade}
              </span>
              <span className="text-[11px] font-mono uppercase text-slate-300 font-bold">
                {inspectionModalReport.overallScore}/100 Score
              </span>
            </div>
          </div>

          <button
            onClick={() => setInspectionModalReport(null)}
            className="absolute top-4 right-4 text-slate-300 hover:text-white p-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Audit Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Inspector Credential Strip */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
                <BadgeCheck className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">{inspectionModalReport.inspectorName}</span>
                <span className="text-slate-500 font-mono text-[11px]">
                  Government & Association ID: {inspectionModalReport.inspectorBadgeNumber}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrintCertificate}
                className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Export Official PDF</span>
              </button>
            </div>
          </div>

          {/* Audit Summary Card */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Auditor Executive Summary
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
              {inspectionModalReport.summary}
            </p>

            {/* Highlighted Verified Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs">
              {inspectionModalReport.odometerVerified !== undefined && (
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                  <span className="text-slate-400 block text-[11px]">Odometer Tamper Check</span>
                  <span className="font-bold text-slate-800 font-mono">{inspectionModalReport.odometerVerified.toLocaleString()} km Genuine</span>
                </div>
              )}
              {inspectionModalReport.paintCondition && (
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                  <span className="text-slate-400 block text-[11px]">Paint Thickness Gauge</span>
                  <span className="font-bold text-slate-800">{inspectionModalReport.paintCondition}</span>
                </div>
              )}
              {inspectionModalReport.engineHealth && (
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                  <span className="text-slate-400 block text-[11px]">Compression PSI</span>
                  <span className="font-bold text-slate-800 font-mono">{inspectionModalReport.engineHealth}</span>
                </div>
              )}
              {inspectionModalReport.ptaStatusVerified && (
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                  <span className="text-slate-400 block text-[11px]">PTA DIRBS Check</span>
                  <span className="font-bold text-indigo-700">{inspectionModalReport.ptaStatusVerified}</span>
                </div>
              )}
              {inspectionModalReport.batteryHealthVerified && (
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                  <span className="text-slate-400 block text-[11px]">Battery Diagnostics</span>
                  <span className="font-bold text-emerald-700 font-mono">{inspectionModalReport.batteryHealthVerified}% Tested</span>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Diagnostic Checklist Groups */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Itemized 200-Point Subsystem Checklist
            </h4>

            {inspectionModalReport.groups.map((group, idx) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-4 border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-xs text-slate-900">{group.name}</h5>
                  <span className="text-xs font-mono font-semibold text-emerald-700 tabular-nums">
                    Score: {group.score}/{group.maxScore}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {group.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="p-2.5 bg-white rounded-lg border border-slate-200/60 flex items-center justify-between gap-2"
                    >
                      <span className="text-slate-700">{item.title}</span>
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 shrink-0">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>PASSED</span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span className="truncate">
            Legal Disclaimer: Inspected under SBP Consumer Protection guidelines & Pakistan Quality Standards.
          </span>
          <button
            onClick={() => setInspectionModalReport(null)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-medium rounded-lg transition-colors shrink-0"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
