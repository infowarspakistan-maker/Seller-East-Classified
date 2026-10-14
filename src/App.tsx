import React, { useState } from 'react';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext.tsx';
import { Header } from './components/Header.tsx';
import { BuyerView } from './views/BuyerView.tsx';
import { SellerHubView } from './views/SellerHubView.tsx';
import { InspectorPortalView } from './views/InspectorPortalView.tsx';
import { AdminCommandCenterView } from './views/AdminCommandCenterView.tsx';
import { ListingDetailModal } from './components/ListingDetailModal.tsx';
import { EscrowCheckoutModal } from './components/EscrowCheckoutModal.tsx';
import { InspectionReportModal } from './components/InspectionReportModal.tsx';
import { WhatsAppListingModal } from './components/WhatsAppListingModal.tsx';
import { CreateListingModal } from './components/CreateListingModal.tsx';
import { RegulatoryPolicyModal } from './components/RegulatoryPolicyModal.tsx';
import { ShieldCheck, CheckCircle2, Scale } from 'lucide-react';

const MarketplaceContent: React.FC = () => {
  const { role, toastMessage, language } = useMarketplace();
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  return (
    <div
      dir={language === 'ur' ? 'rtl' : 'ltr'}
      className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans transition-all"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {role === 'buyer' && <BuyerView />}
        {(role === 'seller' || role === 'store_owner') && <SellerHubView />}
        {role === 'inspector' && <InspectorPortalView />}
        {role === 'admin' && <AdminCommandCenterView />}
      </main>

      {/* Footer with Blueprint v2.0 Policy and Compliance links */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">olx.com.pk</span>
            <span>—</span>
            <span>Trust Edition Pakistan (Blueprint v2.0 · Lahore Pilot)</span>
          </div>

          <div className="flex items-center flex-wrap justify-center gap-3 text-slate-600">
            <button
              onClick={() => setIsPolicyModalOpen(true)}
              className="text-teal-700 hover:text-teal-900 font-semibold underline underline-offset-2 flex items-center gap-1 cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Compliance & Policy Center</span>
            </button>
            <span aria-hidden="true">·</span>
            <span>SBP Raast Partner</span>
            <span aria-hidden="true">·</span>
            <span>NADRA CNIC Verified</span>
            <span aria-hidden="true">·</span>
            <span>Finance Act 2025 Form 181 Compliant</span>
          </div>

          <div className="text-slate-400">
            &copy; {new Date().getFullYear()} olx.com.pk. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ListingDetailModal />
      <EscrowCheckoutModal />
      <InspectionReportModal />
      <WhatsAppListingModal />
      <CreateListingModal />
      <RegulatoryPolicyModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <MarketplaceProvider>
      <MarketplaceContent />
    </MarketplaceProvider>
  );
}
