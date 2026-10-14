import React, { useState } from 'react';
import { useMarketplace } from '../context/MarketplaceContext.tsx';
import {
  X,
  MessageSquare,
  Send,
  Sparkles,
  Camera,
  CheckCheck,
  Bot,
  ArrowRight,
} from 'lucide-react';

export const WhatsAppListingModal: React.FC = () => {
  const { isWhatsAppModalOpen, setIsWhatsAppModalOpen, addListing } = useMarketplace();

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Assalam-o-Alaikum! Welcome to olx.com.pk WhatsApp Quick-List. Send photos of your car, phone, or appliance along with a short voice note or text message, and our AI bot will draft your verified listing for Lahore!',
      time: '11:02 AM',
    },
  ]);

  const [inputMessage, setInputMessage] = useState(
    'Selling iPhone 14 Pro 128GB Deep Purple. Official PTA approved with original box. 89% battery health. Demand PKR 265,000. Located in DHA Phase 5 Lahore.'
  );

  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedPreview, setExtractedPreview] = useState<{
    title: string;
    category: 'mobiles' | 'motors' | 'electronics';
    pricePKR: number;
    locality: string;
    attributes: Record<string, any>;
  } | null>(null);

  if (!isWhatsAppModalOpen) return null;

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMsg = {
      sender: 'user',
      text: inputMessage,
      time: '11:04 AM',
    };

    setMessages(prev => [...prev, userMsg]);
    setIsProcessing(true);

    setTimeout(() => {
      // Simulate Bot parsing the Pakistani message
      const parsedData = {
        title: 'Apple iPhone 14 Pro 128GB Deep Purple — Official PTA Approved',
        category: 'mobiles' as const,
        pricePKR: 265000,
        locality: 'DHA Phase 1-8',
        attributes: {
          brand: 'Apple',
          deviceModel: 'iPhone 14 Pro',
          storage: '128 GB',
          ptaStatus: 'PTA Official Approved',
          batteryHealth: 89,
        },
      };

      setExtractedPreview(parsedData);

      const botReply = {
        sender: 'bot',
        text: '✓ Parsed your listing! We recognized an Apple iPhone 14 Pro 128GB, PTA Approved, asking PKR 265,000 in DHA Lahore. Click "Publish to Marketplace" below to push it live with Bharoosa Escrow protection.',
        time: '11:04 AM',
      };

      setMessages(prev => [...prev, botReply]);
      setIsProcessing(false);
    }, 1000);
  };

  const handlePublishListing = () => {
    if (!extractedPreview) return;

    addListing({
      title: extractedPreview.title,
      category: extractedPreview.category,
      pricePKR: extractedPreview.pricePKR,
      locality: extractedPreview.locality as any,
      addressSnippet: 'DHA Phase 5, Lahore',
      description: inputMessage,
      attributes: extractedPreview.attributes,
    });

    setIsWhatsAppModalOpen(false);
    setExtractedPreview(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* WhatsApp-Style Header */}
        <div className="bg-[#075E54] text-white px-5 py-3.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-800 border border-emerald-400/30 flex items-center justify-center text-white font-bold">
              <Bot className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-bold text-sm">
                <span>olx.com.pk Quick-List Bot</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
              <span className="text-[11px] text-emerald-200/90 font-mono">
                +92 300 0592000 · Verified Business
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsWhatsAppModalOpen(false)}
            className="p-1 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History Container */}
        <div className="overflow-y-auto p-4 bg-[#E5DDD5] min-h-[300px] max-h-[380px] space-y-3 font-sans">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed shadow-xs relative ${
                  msg.sender === 'user'
                    ? 'bg-[#DCF8C6] text-slate-900 rounded-tr-none'
                    : 'bg-white text-slate-900 rounded-tl-none'
                }`}
              >
                <p>{msg.text}</p>
                <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 mt-1">
                  <span>{msg.time}</span>
                  {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-blue-500" />}
                </div>
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-white rounded-lg p-3 text-xs text-slate-500 flex items-center gap-2 shadow-xs">
                <span className="w-3.5 h-3.5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                <span>AI Bot is analyzing device specifications & PTA database...</span>
              </div>
            </div>
          )}
        </div>

        {/* Extracted Structured Card Preview */}
        {extractedPreview && (
          <div className="p-4 bg-emerald-50 border-t border-emerald-200 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Structured Listing Ready to Deploy</span>
              </span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">
                PKR {extractedPreview.pricePKR.toLocaleString()}
              </span>
            </div>
            <p className="text-emerald-900 line-clamp-1">{extractedPreview.title}</p>
            <button
              onClick={handlePublishListing}
              className="w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <span>Publish to Lahore Marketplace Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Message Input Bar */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center gap-2">
          <button
            type="button"
            className="p-2 text-slate-500 hover:text-slate-800 transition-colors"
            title="Attach Photos"
          >
            <Camera className="w-5 h-5 text-slate-600" />
          </button>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type item details, demand in PKR, and Lahore area..."
            className="flex-1 p-2 text-xs bg-white rounded-lg border border-slate-300 focus:outline-hidden focus:border-emerald-600 text-slate-800"
          />
          <button
            onClick={handleSendMessage}
            disabled={isProcessing || !inputMessage.trim()}
            className="p-2 bg-[#075E54] hover:bg-[#064e46] text-white rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
