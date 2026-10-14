export type Role = 'buyer' | 'seller' | 'store_owner' | 'inspector' | 'admin';

export type Language = 'en' | 'ur';

export type SellerTier = 'unverified' | 'phone_verified' | 'cnic_verified' | 'business_ntn';

export type DepartmentId = 'motors' | 'property' | 'mobiles' | 'electronics' | 'lifestyle';

export type CategoryId = 'mobiles' | 'motors' | 'electronics' | 'property' | 'services';

export type LahoreLocality =
  | 'All Lahore'
  | 'DHA Phase 1-8'
  | 'Gulberg II & III'
  | 'Johar Town'
  | 'Bahria Town'
  | 'Model Town'
  | 'Cantt'
  | 'Wapda Town'
  | 'Faisal Town'
  | 'Lake City'
  | 'New Lahore City';

export interface Seller {
  id: string;
  name: string;
  phoneMasked: string;
  tier: SellerTier;
  cnicMasked?: string;
  ntnNumber?: string;
  strnNumber?: string; // Sales Tax Registration Number
  rating: number;
  totalDeals: number;
  responseTime: string;
  memberSince: string;
  city: string;
  locality: string;
  isStoreSubscriber?: boolean;
  storeName?: string;
}

export interface InspectionChecklistGroup {
  name: string;
  score: number;
  maxScore: number;
  items: {
    title: string;
    passed: boolean;
    remark?: string;
  }[];
}

export interface InspectionReport {
  id: string;
  listingId: string;
  inspectorName: string;
  inspectorBadgeNumber: string;
  inspectionDate: string;
  overallScore: number; // 0 - 100
  grade: 'A+' | 'A' | 'B' | 'C' | 'Fail';
  verificationHash: string;
  odometerVerified?: number;
  paintCondition?: string;
  engineHealth?: string;
  ptaStatusVerified?: string;
  batteryHealthVerified?: number;
  propertyRegistryVerified?: boolean;
  summary: string;
  groups: InspectionChecklistGroup[];
}

export interface ListingAttributes {
  // Motors
  make?: string;
  model?: string;
  year?: number;
  mileageKm?: number;
  transmission?: 'Automatic' | 'Manual';
  fuelType?: 'Petrol' | 'Diesel' | 'Hybrid' | 'Electric';
  registrationCity?: string;
  registeredPlate?: string;
  engineCapacityCc?: number;
  assembly?: 'Local' | 'Imported';
  documentsAvailable?: string[];

  // Property (Refined Blueprint v2.0)
  propertyType?: 'House' | 'Flat' | 'Plot' | 'Shop' | 'Office' | 'Agricultural' | 'Project / New Launch';
  purpose?: 'For Sale' | 'For Rent';
  areaValue?: number;
  areaUnit?: 'Marla' | 'Kanal' | 'Sq. Yd.' | 'Sq. Ft.';
  societyName?: string;
  bedrooms?: number;
  bathrooms?: number;
  possessionStatus?: 'Ready' | 'Under Construction';
  ownershipDocuments?: string[];
  scheduleViewingAvailable?: boolean;

  // Mobiles & Electronics
  brand?: string;
  deviceModel?: string;
  storage?: string;
  ram?: string;
  ptaStatus?: 'PTA Official Approved' | 'Non-PTA / Passport 60-Day' | 'Geared / Patch';
  batteryHealth?: number;
  warrantyRemaining?: string;

  // Appliances
  energyRating?: string;
  tonnage?: string;
  inverterTechnology?: boolean;
  warrantyType?: string;
}

export interface Listing {
  id: string;
  title: string;
  titleUrdu: string;
  category: CategoryId;
  department: DepartmentId;
  pricePKR: number;
  marketAveragePKR: number;
  priceDeltaPercent: number; // e.g. -8 means 8% below market
  locality: LahoreLocality;
  addressSnippet: string;
  images: string[];
  description: string;
  descriptionUrdu: string;
  seller: Seller;
  attributes: ListingAttributes;
  inspectionReport?: InspectionReport;
  escrowEligible: boolean;
  isFeatured?: boolean;
  viewsCount: number;
  inquiriesCount: number;
  status: 'active' | 'in_escrow' | 'completed' | 'reported';
  createdAt: string;
}

export type PaymentMethod = 'raast' | 'jazzcash' | 'easypaisa' | 'cod_guaranteed';

export interface EscrowTransaction {
  id: string;
  listingId: string;
  listingTitle: string;
  category: CategoryId;
  buyerName: string;
  buyerPhone: string;
  sellerId: string;
  sellerName: string;
  itemPricePKR: number;
  platformFeePKR: number; // 1%
  inspectionFeePKR: number;
  totalPaidPKR: number;
  paymentMethod: PaymentMethod;
  raastReferenceId?: string;
  handoverOtp: string;
  status: 'holding' | 'dispatched' | 'inspection_scheduled' | 'delivered' | 'disputed' | 'payout_released';
  createdAt: string;
  scheduledWeeklyPayout: string; // e.g. "Tuesday, Oct 20"
  deliveryAddress: string;
  disputeReason?: string;
}

export interface DisputeTicket {
  id: string;
  transactionId: string;
  listingTitle: string;
  complainantName: string;
  complainantRole: 'buyer' | 'seller';
  amountPKR: number;
  reason: string;
  evidenceNotes: string;
  status: 'under_investigation' | 'refunded_buyer' | 'released_seller';
  openedAt: string;
  slaHoursLeft: number;
}

export interface FbrVendorReport {
  vendorId: string;
  vendorName: string;
  cnic: string;
  strn: string;
  ntn: string;
  monthlyGmvPKR: number;
  platformFeeChargedPKR: number;
  salesTaxWithheldPKR: number;
  status: 'Reported & Compliant' | 'Pending Verification';
}

export type PolicyPageId =
  | 'terms'
  | 'privacy'
  | 'consumer_protection'
  | 'refund_policy'
  | 'prohibited_items'
  | 'seller_code';
