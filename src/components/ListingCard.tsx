import React from 'react';
import { Listing } from '../types/index.ts';
import { useMarketplace } from '../context/MarketplaceContext.tsx';
import { ItemImageFallback } from './ItemImageFallback.tsx';
import { ShieldCheck, MapPin, CheckCircle2, Award } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { setSelectedListing, setCheckoutListing, language } = useMarketplace();

  const isInspected = Boolean(listing.inspectionReport);
  const grade = listing.inspectionReport?.grade;

  return (
    <div
      onClick={() => setSelectedListing(listing)}
      className="group bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Visual Slot */}
        <div className="relative">
          <ItemImageFallback
            category={listing.category}
            title={listing.title}
            hasInspection={isInspected}
            grade={grade}
            className="h-44 sm:h-48"
          />

          {/* Featured Banner Indicator if applicable */}
          {listing.isFeatured && (
            <div className="absolute top-2.5 left-2.5 z-20 bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-xs">
              Featured Lahore
            </div>
          )}

          {/* Quick Escrow Trust Stamp */}
          <div className="absolute bottom-2 right-2 z-20 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-teal-400" />
            <span>Raast Escrow</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-2">
          {/* Price with tabular numerals */}
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xl font-bold text-slate-900 tracking-tight font-mono tabular-nums">
              PKR {listing.pricePKR.toLocaleString()}
            </span>
            {listing.priceDeltaPercent < 0 && (
              <span className="text-xs font-medium text-emerald-700 tabular-nums">
                {Math.abs(listing.priceDeltaPercent)}% below Lahore avg
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-slate-900 line-clamp-2 group-hover:text-teal-700 transition-colors leading-snug">
            {language === 'ur' ? listing.titleUrdu : listing.title}
          </h3>

          {/* Zero-Pill Unboxed Metadata with · separator */}
          <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span>{listing.locality}</span>
            </span>
            <span aria-hidden="true">·</span>
            {listing.attributes.year && (
              <>
                <span>{listing.attributes.year}</span>
                <span aria-hidden="true">·</span>
              </>
            )}
            {listing.attributes.storage && (
              <>
                <span>{listing.attributes.storage}</span>
                <span aria-hidden="true">·</span>
              </>
            )}
            {listing.attributes.tonnage && (
              <>
                <span>{listing.attributes.tonnage}</span>
                <span aria-hidden="true">·</span>
              </>
            )}
            {listing.attributes.areaValue && (
              <>
                <span className="font-semibold text-amber-900">{listing.attributes.areaValue} {listing.attributes.areaUnit}</span>
                <span aria-hidden="true">·</span>
              </>
            )}
            <span>{listing.createdAt}</span>
          </div>

          {/* Specific Trust Markers (PTA / Mileage / Marla / Condition) */}
          <div className="text-xs text-slate-600 pt-1 border-t border-slate-100 flex items-center justify-between">
            {listing.category === 'property' && (
              <span className="text-amber-950 font-medium">
                {listing.attributes.propertyType} · {listing.attributes.societyName || listing.locality} {listing.attributes.bedrooms ? `· ${listing.attributes.bedrooms} Beds` : ''}
              </span>
            )}

            {listing.category === 'mobiles' && (
              <span className="text-indigo-900 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                <span>{listing.attributes.ptaStatus || 'PTA Verified'}</span>
              </span>
            )}

            {listing.category === 'motors' && (
              <span className="text-slate-700 font-medium">
                {listing.attributes.mileageKm?.toLocaleString()} km · {listing.attributes.transmission}
              </span>
            )}

            {listing.category === 'electronics' && (
              <span className="text-slate-700 font-medium">
                {listing.attributes.energyRating || 'Inverter Series'}
              </span>
            )}

            {isInspected && (
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <Award className="w-3 h-3 text-emerald-600" />
                <span>Score: {listing.inspectionReport?.overallScore}/100</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer with Seller Trust Level & Fast Escrow Action */}
      <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-1.5 truncate">
          <span className="truncate font-medium text-slate-800">{listing.seller.name}</span>
          {listing.seller.tier === 'cnic_verified' && (
            <span className="text-[10px] text-teal-800 font-medium shrink-0">
              [CNIC Verified]
            </span>
          )}
          {listing.seller.tier === 'business_ntn' && (
            <span className="text-[10px] text-indigo-800 font-medium shrink-0">
              [FBR NTN Verified]
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setCheckoutListing(listing);
          }}
          className="px-2.5 py-1 text-xs font-semibold text-teal-900 bg-teal-100/80 hover:bg-teal-200/90 rounded transition-colors whitespace-nowrap shrink-0"
        >
          Buy with Escrow
        </button>
      </div>
    </div>
  );
};
