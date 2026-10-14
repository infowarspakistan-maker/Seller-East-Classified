import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Role,
  Language,
  Listing,
  EscrowTransaction,
  DisputeTicket,
  SellerTier,
  PaymentMethod,
  InspectionReport,
} from '../types/index.ts';
import { initialListings, initialEscrowTransactions, initialDisputes, mockSellers } from '../data/mockData.ts';

interface MarketplaceContextType {
  role: Role;
  setRole: (role: Role) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  listings: Listing[];
  addListing: (listingData: Partial<Listing>) => void;
  escrowTransactions: EscrowTransaction[];
  createEscrowTransaction: (params: {
    listing: Listing;
    buyerName: string;
    buyerPhone: string;
    paymentMethod: PaymentMethod;
    includeInspection: boolean;
    deliveryAddress: string;
  }) => EscrowTransaction;
  verifyDeliveryWithOtp: (transactionId: string, otp: string) => { success: boolean; message: string };
  disputes: DisputeTicket[];
  resolveDispute: (disputeId: string, action: 'refunded_buyer' | 'released_seller') => void;
  sellerTier: SellerTier;
  upgradeSellerTier: (tier: SellerTier, details: { cnic?: string; ntn?: string }) => void;
  selectedListing: Listing | null;
  setSelectedListing: (listing: Listing | null) => void;
  checkoutListing: Listing | null;
  setCheckoutListing: (listing: Listing | null) => void;
  inspectionModalReport: InspectionReport | null;
  setInspectionModalReport: (report: InspectionReport | null) => void;
  isWhatsAppModalOpen: boolean;
  setIsWhatsAppModalOpen: (open: boolean) => void;
  isCreateListingOpen: boolean;
  setIsCreateListingOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  addInspectionReport: (report: InspectionReport) => void;
  activeHub: 'portal' | 'motors' | 'properties' | 'search';
  setActiveHub: (hub: 'portal' | 'motors' | 'properties' | 'search') => void;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role>('buyer');
  const [language, setLanguage] = useState<Language>('en');

  // Persistent listings
  const [listings, setListings] = useState<Listing[]>(() => {
    const saved = localStorage.getItem('olx_pk_listings');
    return saved ? JSON.parse(saved) : initialListings;
  });

  // Persistent escrow transactions
  const [escrowTransactions, setEscrowTransactions] = useState<EscrowTransaction[]>(() => {
    const saved = localStorage.getItem('olx_pk_escrow');
    return saved ? JSON.parse(saved) : initialEscrowTransactions;
  });

  // Persistent disputes
  const [disputes, setDisputes] = useState<DisputeTicket[]>(() => {
    const saved = localStorage.getItem('olx_pk_disputes');
    return saved ? JSON.parse(saved) : initialDisputes;
  });

  // Seller tier for current user
  const [sellerTier, setSellerTier] = useState<SellerTier>(() => {
    return (localStorage.getItem('olx_pk_seller_tier') as SellerTier) || 'cnic_verified';
  });

  // Active Modals
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [checkoutListing, setCheckoutListing] = useState<Listing | null>(null);
  const [inspectionModalReport, setInspectionModalReport] = useState<InspectionReport | null>(null);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [isCreateListingOpen, setIsCreateListingOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeHub, setActiveHub] = useState<'portal' | 'motors' | 'properties' | 'search'>('portal');

  useEffect(() => {
    localStorage.setItem('olx_pk_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('olx_pk_escrow', JSON.stringify(escrowTransactions));
  }, [escrowTransactions]);

  useEffect(() => {
    localStorage.setItem('olx_pk_disputes', JSON.stringify(disputes));
  }, [disputes]);

  useEffect(() => {
    localStorage.setItem('olx_pk_seller_tier', sellerTier);
  }, [sellerTier]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addListing = (listingData: Partial<Listing>) => {
    const newId = `L-${Date.now().toString().slice(-4)}`;
    const newListing: Listing = {
      id: newId,
      title: listingData.title || 'New Item in Lahore',
      titleUrdu: listingData.titleUrdu || listingData.title || 'لاہور میں نیا آئٹم',
      category: listingData.category || 'mobiles',
      department: (listingData.department || listingData.category || 'mobiles') as any,
      pricePKR: listingData.pricePKR || 50000,
      marketAveragePKR: (listingData.pricePKR || 50000) * 1.06,
      priceDeltaPercent: -5.7,
      locality: listingData.locality || 'Gulberg II & III',
      addressSnippet: listingData.addressSnippet || 'Gulberg Lahore',
      images: ['new_item'],
      description: listingData.description || 'Verified item for sale in Lahore.',
      descriptionUrdu: listingData.descriptionUrdu || 'تصدیق شدہ اشیاء برائے فروخت',
      seller: {
        ...mockSellers.s2,
        name: 'You (Current Seller)',
        tier: sellerTier,
      },
      attributes: listingData.attributes || {},
      escrowEligible: true,
      isFeatured: false,
      viewsCount: 1,
      inquiriesCount: 0,
      status: 'active',
      createdAt: 'Just now',
    };

    setListings(prev => [newListing, ...prev]);
    showToast(`✓ Listing "${newListing.title.slice(0, 32)}..." published successfully in Lahore!`);
  };

  const createEscrowTransaction = ({
    listing,
    buyerName,
    buyerPhone,
    paymentMethod,
    includeInspection,
    deliveryAddress,
  }: {
    listing: Listing;
    buyerName: string;
    buyerPhone: string;
    paymentMethod: PaymentMethod;
    includeInspection: boolean;
    deliveryAddress: string;
  }): EscrowTransaction => {
    const platformFee = Math.round(listing.pricePKR * 0.01); // 1% transparent fee
    const inspectionFee = includeInspection
      ? listing.category === 'motors'
        ? 5000
        : listing.category === 'mobiles'
        ? 2500
        : 1500
      : 0;
    const totalPaid = listing.pricePKR + platformFee + inspectionFee;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const newTx: EscrowTransaction = {
      id: `TX-${Date.now().toString().slice(-4)}`,
      listingId: listing.id,
      listingTitle: listing.title,
      category: listing.category,
      buyerName,
      buyerPhone,
      sellerId: listing.seller.id,
      sellerName: listing.seller.name,
      itemPricePKR: listing.pricePKR,
      platformFeePKR: platformFee,
      inspectionFeePKR: inspectionFee,
      totalPaidPKR: totalPaid,
      paymentMethod,
      raastReferenceId: paymentMethod === 'raast' ? `RAAST-SBP-${Math.floor(1000000000 + Math.random() * 9000000000)}` : undefined,
      handoverOtp: otp,
      status: includeInspection ? 'inspection_scheduled' : 'holding',
      createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      scheduledWeeklyPayout: 'Tuesday, 20 Oct 2026',
      deliveryAddress,
    };

    setEscrowTransactions(prev => [newTx, ...prev]);

    // Update listing status
    setListings(prev =>
      prev.map(l => (l.id === listing.id ? { ...l, status: 'in_escrow' } : l))
    );

    showToast(`🔒 Funds of PKR ${totalPaid.toLocaleString()} secured in Escrow! Delivery Handover OTP: ${otp}`);
    return newTx;
  };

  const verifyDeliveryWithOtp = (transactionId: string, otp: string) => {
    const tx = escrowTransactions.find(t => t.id === transactionId);
    if (!tx) return { success: false, message: 'Transaction not found' };

    if (tx.handoverOtp !== otp.trim()) {
      return { success: false, message: 'Invalid 6-digit OTP code. Please check with buyer.' };
    }

    setEscrowTransactions(prev =>
      prev.map(t =>
        t.id === transactionId
          ? { ...t, status: 'delivered' }
          : t
      )
    );

    // Update listing to completed
    setListings(prev =>
      prev.map(l => (l.id === tx.listingId ? { ...l, status: 'completed' } : l))
    );

    showToast(`✓ Handover Verified! Escrow cleared for weekly Tuesday payout to ${tx.sellerName}`);
    return { success: true, message: 'Delivery confirmed successfully!' };
  };

  const resolveDispute = (disputeId: string, action: 'refunded_buyer' | 'released_seller') => {
    setDisputes(prev =>
      prev.map(d => (d.id === disputeId ? { ...d, status: action, slaHoursLeft: 0 } : d))
    );

    const dispute = disputes.find(d => d.id === disputeId);
    if (dispute) {
      setEscrowTransactions(prev =>
        prev.map(t =>
          t.id === dispute.transactionId
            ? { ...t, status: action === 'refunded_buyer' ? 'disputed' : 'payout_released' }
            : t
        )
      );
    }

    showToast(`⚖️ Dispute ${disputeId} resolved: ${action === 'refunded_buyer' ? 'Refunded to Buyer via Raast' : 'Released to Seller'}`);
  };

  const upgradeSellerTier = (tier: SellerTier, details: { cnic?: string; ntn?: string }) => {
    setSellerTier(tier);
    showToast(`✓ Identity verification updated to: ${tier.replace('_', ' ').toUpperCase()}`);
  };

  const addInspectionReport = (report: InspectionReport) => {
    setListings(prev =>
      prev.map(l => (l.id === report.listingId ? { ...l, inspectionReport: report } : l))
    );
    showToast(`✓ Inspection Report issued for ${report.listingId}: Grade ${report.grade} (${report.overallScore}/100)`);
  };

  return (
    <MarketplaceContext.Provider
      value={{
        role,
        setRole,
        language,
        setLanguage,
        listings,
        addListing,
        escrowTransactions,
        createEscrowTransaction,
        verifyDeliveryWithOtp,
        disputes,
        resolveDispute,
        sellerTier,
        upgradeSellerTier,
        selectedListing,
        setSelectedListing,
        checkoutListing,
        setCheckoutListing,
        inspectionModalReport,
        setInspectionModalReport,
        isWhatsAppModalOpen,
        setIsWhatsAppModalOpen,
        isCreateListingOpen,
        setIsCreateListingOpen,
        toastMessage,
        showToast,
        addInspectionReport,
        activeHub,
        setActiveHub,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) throw new Error('useMarketplace must be used within MarketplaceProvider');
  return context;
};
