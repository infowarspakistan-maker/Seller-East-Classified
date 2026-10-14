import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext.tsx';
import { InspectionReport } from '../types/index.ts';
import {
  Wrench,
  Award,
  CheckCircle2,
  FileCheck2,
  Car,
  Smartphone,
  Zap,
  Search,
  DollarSign,
  ClipboardList,
} from 'lucide-react';

export const InspectorPortalView: React.FC = () => {
  const { listings, addInspectionReport, setInspectionModalReport, showToast } = useMarketplace();

  // Find listing that doesn't have an inspection report yet
  const uninspectedListings = listings.filter(l => !l.inspectionReport);
  const [selectedListingId, setSelectedListingId] = useState(
    uninspectedListings[0]?.id || listings[0]?.id || ''
  );

  const selectedListing = listings.find(l => l.id === selectedListingId);

  // Diagnostic Checklist Interactive State
  const [odometerKm, setOdometerKm] = useState(21000);
  const [paintGaugeCheck, setPaintGaugeCheck] = useState(true);
  const [chassisFrameCheck, setChassisFrameCheck] = useState(true);
  const [engineCompressionCheck, setEngineCompressionCheck] = useState(true);
  const [ecuScanCheck, setEcuScanCheck] = useState(true);
  const [ptaDirbsCheck, setPtaDirbsCheck] = useState(true);
  const [screenGenuineCheck, setScreenGenuineCheck] = useState(true);
  const [batteryHealthCheck, setBatteryHealthCheck] = useState(true);
  const [inspectorNotes, setInspectorNotes] = useState(
    'Detailed physical diagnostics conducted in Lahore. No non-factory weld marks found. All OBD sensors functioning normally.'
  );

  // Dynamic Score Calculation
  const totalChecks = [
    paintGaugeCheck,
    chassisFrameCheck,
    engineCompressionCheck,
    ecuScanCheck,
    ptaDirbsCheck,
    screenGenuineCheck,
    batteryHealthCheck,
  ];
  const passedCount = totalChecks.filter(Boolean).length;
  const calculatedScore = Math.round(75 + (passedCount / totalChecks.length) * 23);
  const calculatedGrade = calculatedScore >= 95 ? 'A+' : calculatedScore >= 88 ? 'A' : calculatedScore >= 80 ? 'B' : 'C';

  const handleIssueCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedListing) return;

    const newReport: InspectionReport = {
      id: `IR-${Math.floor(100 + Math.random() * 900)}`,
      listingId: selectedListing.id,
      inspectorName: 'Engr. Noman Babar (SAE Certified Auditor)',
      inspectorBadgeNumber: 'PK-MTR-9024',
      inspectionDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      overallScore: calculatedScore,
      grade: calculatedGrade as any,
      verificationHash: `SHA256:${Math.random().toString(36).substring(2, 14)}`,
      odometerVerified: selectedListing.category === 'motors' ? odometerKm : undefined,
      paintCondition: paintGaugeCheck ? '100% Genuine Factory Seal & Clearcoat' : 'Minor touchup detected on rear fender',
      engineHealth: engineCompressionCheck ? 'Compression 170 psi balanced across cylinders' : 'Minor valve wear',
      ptaStatusVerified: ptaDirbsCheck ? 'Official FBR PTA Approval Active' : 'Unregistered',
      batteryHealthVerified: batteryHealthCheck ? 98 : 82,
      summary: inspectorNotes,
      groups: [
        {
          name: 'Mechanical & Structural Integrity',
          score: 38,
          maxScore: 40,
          items: [
            { title: 'Chassis & Structural Frame Welds', passed: chassisFrameCheck },
            { title: 'Paint Depth Gauge Under 120 Microns', passed: paintGaugeCheck },
            { title: 'Engine Compression & Turbo Seals', passed: engineCompressionCheck },
          ],
        },
        {
          name: 'Electronics, PTA & ECU Diagnostic Scan',
          score: 56,
          maxScore: 60,
          items: [
            { title: 'ECU OBD-II Error Code Prober', passed: ecuScanCheck },
            { title: 'DIRBS PTA Official Tax Registration Check', passed: ptaDirbsCheck },
            { title: 'Screen Original Serial Match', passed: screenGenuineCheck },
            { title: 'Battery Health Diagnostic', passed: batteryHealthCheck },
          ],
        },
      ],
    };

    addInspectionReport(newReport);
    setInspectionModalReport(newReport);
  };

  return (
    <div className="space-y-6">
      {/* Inspector Hero Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Award className="w-5 h-5 text-emerald-700" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Certified Inspector Command Portal (Lahore Network)
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Freelance & Workshop Diagnostic Network · Earn PKR 2,000–5,000 split per verified vehicle/device audit.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl text-xs">
          <DollarSign className="w-4 h-4 text-emerald-700" />
          <div>
            <span className="text-slate-500 block text-[10px]">Your Inspector Balance</span>
            <span className="font-bold text-slate-900 font-mono tabular-nums">PKR 24,500</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Pending Inspection Queue (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Lahore Assigned Queue ({listings.length})
              </h3>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {listings.map(item => (
                <div
                  key={item.id}
                  onClick={() => setSelectedListingId(item.id)}
                  className={`p-3.5 cursor-pointer transition-colors ${
                    selectedListingId === item.id
                      ? 'bg-emerald-50/80 border-l-4 border-emerald-600'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-slate-400">{item.id}</span>
                    {item.inspectionReport ? (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded">
                        Grade {item.inspectionReport.grade} Certified
                      </span>
                    ) : (
                      <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded">
                        Audit Pending
                      </span>
                    )}
                  </div>
                  <h4 className="font-semibold text-slate-900 line-clamp-1 mt-1">{item.title}</h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                    <span>{item.locality}</span>
                    <span className="font-mono tabular-nums font-medium text-slate-700">
                      PKR {item.pricePKR.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Live 200-Point Diagnostic Audit Suite (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {selectedListing ? (
            <form onSubmit={handleIssueCertificate} className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-5 text-xs">
              {/* Target Item Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-xs font-mono uppercase text-slate-400">Auditing Item</span>
                  <h3 className="text-base font-bold text-slate-900">{selectedListing.title}</h3>
                  <span className="text-slate-500 text-xs">{selectedListing.locality} · Asking: PKR {selectedListing.pricePKR.toLocaleString()}</span>
                </div>

                {/* Score Projection */}
                <div className="text-right bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-xl">
                  <span className="text-[11px] font-bold text-emerald-900 block">Projected Grade</span>
                  <div className="text-2xl font-black text-emerald-700 font-mono">
                    {calculatedGrade} ({calculatedScore}/100)
                  </div>
                </div>
              </div>

              {/* Vehicle / Mobile Diagnostic Tests */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-xs flex items-center gap-1.5">
                  <ClipboardList className="w-4 h-4 text-emerald-600" />
                  <span>Physical Diagnostic Checklist (200-Point Standard)</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100/70">
                    <div>
                      <span className="font-bold text-slate-800 block">Paint Depth & Body Sealer</span>
                      <span className="text-[11px] text-slate-500">Gauge reads &lt;120 microns; no body filler</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={paintGaugeCheck}
                      onChange={(e) => setPaintGaugeCheck(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                  </label>

                  <label className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100/70">
                    <div>
                      <span className="font-bold text-slate-800 block">Chassis & Pillar Frame Welds</span>
                      <span className="text-[11px] text-slate-500">Factory spot-welds intact, no accident pulling</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={chassisFrameCheck}
                      onChange={(e) => setChassisFrameCheck(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                  </label>

                  <label className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100/70">
                    <div>
                      <span className="font-bold text-slate-800 block">Engine Compression PSI Test</span>
                      <span className="text-[11px] text-slate-500">Balanced compression across all cylinders</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={engineCompressionCheck}
                      onChange={(e) => setEngineCompressionCheck(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                  </label>

                  <label className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100/70">
                    <div>
                      <span className="font-bold text-slate-800 block">ECU & OBD-II Fault Codes</span>
                      <span className="text-[11px] text-slate-500">Zero hidden fault codes or check-engine masking</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={ecuScanCheck}
                      onChange={(e) => setEcuScanCheck(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                  </label>

                  <label className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100/70">
                    <div>
                      <span className="font-bold text-slate-800 block">PTA DIRBS Tax Verification</span>
                      <span className="text-[11px] text-slate-500">Verified official FBR tax status on DIRBS</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={ptaDirbsCheck}
                      onChange={(e) => setPtaDirbsCheck(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                  </label>

                  <label className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between cursor-pointer hover:bg-slate-100/70">
                    <div>
                      <span className="font-bold text-slate-800 block">Original Display & FaceID/Touch</span>
                      <span className="text-[11px] text-slate-500">TrueTone functional, genuine OEM panel</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={screenGenuineCheck}
                      onChange={(e) => setScreenGenuineCheck(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                  </label>
                </div>
              </div>

              {/* Inspector Remarks */}
              <div>
                <label className="font-medium text-slate-700 block mb-1">
                  Inspector Professional Remarks (Tamper-Proof)
                </label>
                <textarea
                  rows={2}
                  value={inspectorNotes}
                  onChange={(e) => setInspectorNotes(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-800 text-xs"
                />
              </div>

              {/* Issue Certificate CTA */}
              <div className="pt-2 flex items-center justify-end gap-3">
                {selectedListing.inspectionReport && (
                  <button
                    type="button"
                    onClick={() => setInspectionModalReport(selectedListing.inspectionReport!)}
                    className="px-4 py-2.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors cursor-pointer"
                  >
                    View Existing Certificate
                  </button>
                )}
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Certify & Attach Digital Report (Grade {calculatedGrade})</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-white p-8 text-center rounded-xl border border-slate-200 text-slate-500">
              Select an item from the queue to start diagnostic audit.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
