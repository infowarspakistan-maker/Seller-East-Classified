import React from 'react';
import { Car, Smartphone, Zap, Home, ShieldCheck } from 'lucide-react';
import { CategoryId } from '../types/index.ts';

interface ItemImageFallbackProps {
  category: CategoryId;
  title: string;
  className?: string;
  hasInspection?: boolean;
  grade?: string;
}

export const ItemImageFallback: React.FC<ItemImageFallbackProps> = ({
  category,
  title,
  className = 'h-48',
  hasInspection,
  grade,
}) => {
  // Property (Refined Blueprint v2.0)
  if (category === 'property') {
    return (
      <div className={`relative w-full overflow-hidden bg-gradient-to-br from-slate-950 via-stone-900 to-amber-950 flex flex-col justify-between p-4 ${className}`}>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[11px] font-mono tracking-wider uppercase text-amber-300 flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5" />
            <span>Lahore Real Estate</span>
          </span>
          {hasInspection && (
            <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-600/40">
              Grade {grade || 'A+'} Title Verified
            </span>
          )}
        </div>

        <div className="relative z-10 my-auto text-center py-2">
          <div className="w-16 h-16 mx-auto rounded-full bg-stone-800/80 border border-stone-700/60 flex items-center justify-center text-amber-400 mb-2 shadow-inner">
            <Home className="w-9 h-9" />
          </div>
          <p className="text-xs font-medium text-stone-200 line-clamp-1 px-4">{title}</p>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[11px] text-stone-400 border-t border-stone-700/50 pt-2">
          <span>DHA / Bahria Transfer NOC Verified</span>
          <span className="font-mono text-amber-300">Marla & Kanal Audit</span>
        </div>
      </div>
    );
  }

  // Motors
  if (category === 'motors') {
    return (
      <div className={`relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 flex flex-col justify-between p-4 ${className}`}>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[11px] font-mono tracking-wider uppercase text-teal-300 flex items-center gap-1.5">
            <Car className="w-3.5 h-3.5" />
            <span>Lahore Verified Motor</span>
          </span>
          {hasInspection && (
            <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-600/40">
              Grade {grade || 'A+'} Inspected
            </span>
          )}
        </div>

        <div className="relative z-10 my-auto text-center py-2">
          <div className="w-16 h-16 mx-auto rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-teal-400 mb-2 shadow-inner">
            <Car className="w-9 h-9" />
          </div>
          <p className="text-xs font-medium text-slate-200 line-clamp-1 px-4">{title}</p>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-700/50 pt-2">
          <span>Digital Paint Depth & ECU Verified</span>
          <span className="font-mono text-teal-300">Biometric Ready</span>
        </div>
      </div>
    );
  }

  // Mobiles
  if (category === 'mobiles') {
    return (
      <div className={`relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-zinc-800 to-indigo-950 flex flex-col justify-between p-4 ${className}`}>
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[11px] font-mono tracking-wider uppercase text-indigo-300 flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5" />
            <span>DIRBS PTA Verified</span>
          </span>
          {hasInspection && (
            <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-600/40">
              Grade {grade || 'A+'} Audit
            </span>
          )}
        </div>

        <div className="relative z-10 my-auto text-center py-2">
          <div className="w-16 h-16 mx-auto rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-indigo-400 mb-2 shadow-inner">
            <Smartphone className="w-9 h-9" />
          </div>
          <p className="text-xs font-medium text-slate-200 line-clamp-1 px-4">{title}</p>
        </div>

        <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-700/50 pt-2">
          <span>IMEI & Battery Seal Tested</span>
          <span className="font-mono text-indigo-300">Escrow Protected</span>
        </div>
      </div>
    );
  }

  // Electronics & Appliances
  return (
    <div className={`relative w-full overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 flex flex-col justify-between p-4 ${className}`}>
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#34d399_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[11px] font-mono tracking-wider uppercase text-emerald-300 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5" />
          <span>Inverter & Appliance</span>
        </span>
        {hasInspection && (
          <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-600/40">
            Grade {grade || 'A'} Tested
          </span>
        )}
      </div>

      <div className="relative z-10 my-auto text-center py-2">
        <div className="w-16 h-16 mx-auto rounded-full bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-emerald-400 mb-2 shadow-inner">
          <Zap className="w-9 h-9" />
        </div>
        <p className="text-xs font-medium text-slate-200 line-clamp-1 px-4">{title}</p>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-700/50 pt-2">
        <span>PCB & Gas Pressure Certified</span>
        <span className="font-mono text-emerald-300">100% Copper</span>
      </div>
    </div>
  );
};
