import React, { useState, useEffect } from 'react';
import { useMarketplace } from '../context/MarketplaceContext.tsx';
import { CategoryId, LahoreLocality } from '../types/index.ts';
import {
  X,
  Sparkles,
  ShieldCheck,
  Plus,
  Check,
  ChevronRight,
  ChevronLeft,
  Camera,
  Car,
  Home,
  Smartphone,
  Zap,
  TrendingDown,
  Calendar,
  FileCheck,
} from 'lucide-react';

export const CreateListingModal: React.FC = () => {
  const { isCreateListingOpen, setIsCreateListingOpen, addListing, showToast } = useMarketplace();

  // 5-Step Flow State (0: Category, 1: Core Details, 2: Specs, 3: Photos, 4: Pricing & Locality, 5: Review)
  const [currentStep, setCurrentStep] = useState<number>(0);

  // Form Fields
  const [category, setCategory] = useState<CategoryId>('property');
  const [title, setTitle] = useState('');
  const [pricePKR, setPricePKR] = useState<number>(19500000);
  const [locality, setLocality] = useState<LahoreLocality>('DHA Phase 1-8');
  const [description, setDescription] = useState('');
  const [scheduleViewing, setScheduleViewing] = useState(true);

  // Motors Specific
  const [make, setMake] = useState('Honda');
  const [carModel, setCarModel] = useState('Civic RS');
  const [carYear, setCarYear] = useState(2022);
  const [mileageKm, setMileageKm] = useState(32000);
  const [transmission, setTransmission] = useState<'Automatic' | 'Manual'>('Automatic');
  const [assembly, setAssembly] = useState<'Local' | 'Imported'>('Local');

  // Property Specific (Blueprint v2.0)
  const [propertyType, setPropertyType] = useState<'House' | 'Flat' | 'Plot' | 'Shop'>('House');
  const [areaValue, setAreaValue] = useState<number>(1);
  const [areaUnit, setAreaUnit] = useState<'Marla' | 'Kanal' | 'Sq. Yd.'>('Kanal');
  const [societyName, setSocietyName] = useState('DHA Phase 6');
  const [bedrooms, setBedrooms] = useState<number>(5);
  const [possessionStatus, setPossessionStatus] = useState<'Ready' | 'Under Construction'>('Ready');

  // Mobiles Specific
  const [brand, setBrand] = useState('Apple');
  const [deviceModel, setDeviceModel] = useState('iPhone 15 Pro');
  const [storage, setStorage] = useState('256 GB');
  const [ptaStatus, setPtaStatus] = useState<'PTA Official Approved' | 'Non-PTA / Passport 60-Day' | 'Geared / Patch'>('PTA Official Approved');
  const [batteryHealth, setBatteryHealth] = useState(94);

  // Electronics
  const [tonnage, setTonnage] = useState('1.5 Ton DC Inverter');
  const [energyRating, setEnergyRating] = useState('A+++ 66% Energy Saving');

  // Autosave indicator simulator (every 20 seconds)
  const [lastSaved, setLastSaved] = useState('Saved to draft');

  useEffect(() => {
    const timer = setInterval(() => {
      setLastSaved(`Autosaved at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`);
    }, 20000);
    return () => clearInterval(timer);
  }, []);

  if (!isCreateListingOpen) return null;

  const handleNext = () => {
    if (currentStep === 0 && !title) {
      if (category === 'property') setTitle(`${areaValue} ${areaUnit} ${propertyType} in ${societyName}`);
      else if (category === 'motors') setTitle(`${make} ${carModel} ${carYear} Automatic`);
      else if (category === 'mobiles') setTitle(`${brand} ${deviceModel} ${storage} PTA Approved`);
      else setTitle('Haier 1.5 Ton DC Inverter Series');
    }
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let attributes: any = {};
    if (category === 'property') {
      attributes = {
        propertyType,
        purpose: 'For Sale',
        areaValue: Number(areaValue),
        areaUnit,
        societyName,
        bedrooms: propertyType === 'House' || propertyType === 'Flat' ? bedrooms : undefined,
        possessionStatus,
        ownershipDocuments: ['Registry / Transfer Letter', 'NOC Cleared', 'Approved Drawing'],
        scheduleViewingAvailable: scheduleViewing,
      };
    } else if (category === 'motors') {
      attributes = {
        make,
        model: carModel,
        year: Number(carYear),
        mileageKm: Number(mileageKm),
        transmission,
        assembly,
        registrationCity: 'Lahore (LE)',
        documentsAvailable: ['Registration Book', 'Excise Tax Token', 'Biometric Form'],
      };
    } else if (category === 'mobiles') {
      attributes = {
        brand,
        deviceModel,
        storage,
        ptaStatus,
        batteryHealth: Number(batteryHealth),
      };
    } else {
      attributes = {
        tonnage,
        energyRating,
        inverterTechnology: true,
      };
    }

    addListing({
      title: title || `${areaValue} ${areaUnit} ${propertyType} in ${societyName}`,
      category,
      pricePKR: Number(pricePKR),
      locality,
      addressSnippet: `${societyName || locality}, Lahore`,
      description: description || `Verified listing published via multi-step workflow in ${locality}, Lahore.`,
      attributes,
    });

    setIsCreateListingOpen(false);
    setCurrentStep(0);
  };

  const stepLabels = [
    'Category',
    'Core Details',
    'Specifications',
    'Photos & Media',
    'Price & Location',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[94vh] flex flex-col">
        {/* Step Progress Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-teal-400">
              <span>Step {currentStep + 1} of 5</span>
              <span>·</span>
              <span className="text-slate-300 font-sans">{stepLabels[currentStep]}</span>
            </div>
            <h3 className="text-base font-bold text-white mt-0.5">
              Post Verified Listing (Blueprint v2.0 Multi-Step)
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">{lastSaved}</span>
            <button
              onClick={() => setIsCreateListingOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="grid grid-cols-5 bg-slate-100 border-b border-slate-200 text-center text-[11px] font-medium text-slate-500">
          {stepLabels.map((label, idx) => (
            <div
              key={idx}
              className={`py-2 border-b-2 transition-colors ${
                currentStep === idx
                  ? 'border-teal-600 text-teal-900 font-bold bg-white'
                  : currentStep > idx
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent'
              }`}
            >
              {idx + 1}. {label}
            </div>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 text-xs flex-1">
          {/* STEP 0: Category Picker */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <div>
                <label className="font-bold text-slate-800 uppercase tracking-wider block mb-1">
                  Step 0: Select Department & Vertical (Lahore)
                </label>
                <p className="text-slate-500 text-[11px] mb-3">
                  Foot-in-the-door UX: Choose your category first to trigger tailored specification fields.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: 'property', name: 'Real Estate', sub: 'Houses, Plots & Projects', icon: <Home className="w-5 h-5 text-amber-600" /> },
                  { id: 'motors', name: 'Motors', sub: 'Cars, Bikes & Parts', icon: <Car className="w-5 h-5 text-teal-600" /> },
                  { id: 'mobiles', name: 'Mobiles', sub: 'Phones & Tablets (PTA)', icon: <Smartphone className="w-5 h-5 text-indigo-600" /> },
                  { id: 'electronics', name: 'Appliances', sub: 'Inverters & Home Gadgets', icon: <Zap className="w-5 h-5 text-emerald-600" /> },
                ].map(cat => (
                  <div
                    key={cat.id}
                    onClick={() => setCategory(cat.id as CategoryId)}
                    className={`p-3.5 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-between gap-2 ${
                      category === cat.id
                        ? 'bg-teal-50 border-teal-600 ring-2 ring-teal-600 text-teal-950 font-bold shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="p-2.5 rounded-full bg-slate-100/80">{cat.icon}</div>
                    <div>
                      <span className="block text-xs font-bold">{cat.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{cat.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <label className="font-medium text-slate-700 block mb-1">Listing Headline Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 1 Kanal Brand New Spanish Villa in DHA Phase 6"
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-800 text-xs focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                />
              </div>
            </div>
          )}

          {/* STEP 1: Core Details (Trimmed 7-8 fields) */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-xs">
                Step 1: Core Identity Details
              </h4>

              {category === 'property' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-600 font-medium block mb-1">Property Type</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value as any)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                    >
                      <option value="House">House / Bungalow</option>
                      <option value="Plot">Residential Plot</option>
                      <option value="Flat">Apartment / Flat</option>
                      <option value="Shop">Commercial Shop / Office</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-600 font-medium block mb-1">Housing Society / Project</label>
                    <input
                      type="text"
                      value={societyName}
                      onChange={(e) => setSocietyName(e.target.value)}
                      placeholder="e.g. DHA Phase 6 or Bahria Town"
                      className="w-full p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>

                  <div>
                    <label className="text-slate-600 font-medium block mb-1">Area Measure & Unit (Pakistan)</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="1"
                        value={areaValue}
                        onChange={(e) => setAreaValue(Number(e.target.value))}
                        className="w-1/2 p-2.5 rounded-lg border border-slate-300 font-mono"
                      />
                      <select
                        value={areaUnit}
                        onChange={(e) => setAreaUnit(e.target.value as any)}
                        className="w-1/2 p-2.5 rounded-lg border border-slate-300 bg-white"
                      >
                        <option value="Marla">Marla</option>
                        <option value="Kanal">Kanal</option>
                        <option value="Sq. Yd.">Sq. Yd.</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-600 font-medium block mb-1">Bedrooms</label>
                    <input
                      type="number"
                      min="1"
                      max="12"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(Number(e.target.value))}
                      className="w-full p-2.5 rounded-lg border border-slate-300 font-mono"
                    />
                  </div>
                </div>
              )}

              {category === 'motors' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-600 font-medium block mb-1">Make</label>
                    <input
                      type="text"
                      value={make}
                      onChange={(e) => setMake(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 font-medium block mb-1">Model</label>
                    <input
                      type="text"
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 font-medium block mb-1">Year</label>
                    <input
                      type="number"
                      value={carYear}
                      onChange={(e) => setCarYear(Number(e.target.value))}
                      className="w-full p-2.5 rounded-lg border border-slate-300 font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 font-medium block mb-1">Mileage (km)</label>
                    <input
                      type="number"
                      value={mileageKm}
                      onChange={(e) => setMileageKm(Number(e.target.value))}
                      className="w-full p-2.5 rounded-lg border border-slate-300 font-mono"
                    />
                  </div>
                </div>
              )}

              {category === 'mobiles' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-600 font-medium block mb-1">Brand</label>
                    <input
                      type="text"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 font-medium block mb-1">Model</label>
                    <input
                      type="text"
                      value={deviceModel}
                      onChange={(e) => setDeviceModel(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 font-medium block mb-1">Storage</label>
                    <input
                      type="text"
                      value={storage}
                      onChange={(e) => setStorage(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>
                </div>
              )}

              {category === 'electronics' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-600 font-medium block mb-1">Tonnage / Capacity</label>
                    <input
                      type="text"
                      value={tonnage}
                      onChange={(e) => setTonnage(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 font-medium block mb-1">Energy Rating</label>
                    <input
                      type="text"
                      value={energyRating}
                      onChange={(e) => setEnergyRating(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Pakistan Specifications */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-xs">
                Step 2: Technical Specifications & Verification Signals
              </h4>

              {category === 'property' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-600 font-medium block mb-1">Possession Status</label>
                      <select
                        value={possessionStatus}
                        onChange={(e) => setPossessionStatus(e.target.value as any)}
                        className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                      >
                        <option value="Ready">Ready / Possession Paid</option>
                        <option value="Under Construction">Under Construction / Grey Structure</option>
                      </select>
                    </div>

                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-amber-950 block">Allow Video / Physical Tour</span>
                        <span className="text-[10px] text-amber-800">Buyers can schedule a viewing</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={scheduleViewing}
                        onChange={(e) => setScheduleViewing(e.target.checked)}
                        className="w-4 h-4 text-amber-600 rounded"
                      />
                    </div>
                  </div>
                </div>
              )}

              {category === 'motors' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-600 font-medium block mb-1">Transmission</label>
                    <select
                      value={transmission}
                      onChange={(e) => setTransmission(e.target.value as any)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                    >
                      <option value="Automatic">Automatic</option>
                      <option value="Manual">Manual</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-600 font-medium block mb-1">Assembly (Resale Value)</label>
                    <select
                      value={assembly}
                      onChange={(e) => setAssembly(e.target.value as any)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                    >
                      <option value="Local">Local (Indus/Atlas Honda)</option>
                      <option value="Imported">Imported (Japanese CBU)</option>
                    </select>
                  </div>
                </div>
              )}

              {category === 'mobiles' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-600 font-medium block mb-1">PTA DIRBS Approval Status</label>
                    <select
                      value={ptaStatus}
                      onChange={(e) => setPtaStatus(e.target.value as any)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                    >
                      <option value="PTA Official Approved">Official FBR PTA Approved</option>
                      <option value="Non-PTA / Passport 60-Day">Non-PTA / Visitor Passport</option>
                      <option value="Geared / Patch">Geared / CPID Patch</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-slate-600 font-medium block mb-1">Battery Health %</label>
                    <input
                      type="number"
                      min="50"
                      max="100"
                      value={batteryHealth}
                      onChange={(e) => setBatteryHealth(Number(e.target.value))}
                      className="w-full p-2.5 rounded-lg border border-slate-300 font-mono"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Guided Photos & Media */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider text-xs">
                    Step 3: Guided Photo Audit (Camera-First)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    High-trust listings require verified angles. On-device compression active.
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                  4 Required Slots
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { name: '1. Exterior Front', desc: 'Main Hero view' },
                  { name: '2. Rear Angle', desc: 'Plates / Sealer' },
                  { name: '3. Interior / Dashboard', desc: 'Odometer / IMEI' },
                  { name: '4. Documents / Box', desc: 'Excise / Warranty' },
                ].map((slot, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-teal-500 bg-slate-50 hover:bg-teal-50/30 transition-all flex flex-col items-center justify-center text-center gap-2 cursor-pointer"
                  >
                    <Camera className="w-5 h-5 text-slate-400" />
                    <div>
                      <span className="block font-bold text-slate-800 text-[11px]">{slot.name}</span>
                      <span className="text-[10px] text-slate-400">{slot.desc}</span>
                    </div>
                    <span className="text-[10px] text-teal-700 font-medium">✓ Uploaded</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Pricing, Price Intelligence & Locality */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-xs">
                Step 4: Pricing & Lahore Locality
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-600 font-medium block mb-1">Asking Price (PKR)</label>
                  <input
                    type="number"
                    required
                    step="1000"
                    value={pricePKR}
                    onChange={(e) => setPricePKR(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-slate-300 font-mono font-bold text-sm text-slate-900 focus:border-teal-600"
                  />
                </div>

                <div>
                  <label className="text-slate-600 font-medium block mb-1">Lahore Neighborhood</label>
                  <select
                    value={locality}
                    onChange={(e) => setLocality(e.target.value as LahoreLocality)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="DHA Phase 1-8">DHA Phase 1-8</option>
                    <option value="Gulberg II & III">Gulberg II & III</option>
                    <option value="Johar Town">Johar Town</option>
                    <option value="Bahria Town">Bahria Town</option>
                    <option value="Model Town">Model Town</option>
                    <option value="Cantt">Cantt</option>
                    <option value="Lake City">Lake City</option>
                    <option value="Wapda Town">Wapda Town</option>
                  </select>
                </div>
              </div>

              {/* Price Intelligence Meter */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700 flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                    <span>AI Price Intelligence Guidance</span>
                  </span>
                  <span className="font-mono text-emerald-700 font-bold">Optimal Fair Value</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Similar {category} listings in {locality} are currently transacting between PKR {(pricePKR * 0.95).toLocaleString()} and PKR {(pricePKR * 1.08).toLocaleString()}.
                </p>
              </div>

              <div>
                <label className="text-slate-600 font-medium block mb-1">Detailed Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="State ownership, documentation, and condition specifics..."
                  className="w-full p-2.5 rounded-lg border border-slate-300"
                />
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            {currentStep > 0 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <span>Continue to {stepLabels[currentStep + 1]}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#002f34] hover:bg-[#002226] text-white font-bold rounded-xl transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Publish to Lahore Marketplace</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
