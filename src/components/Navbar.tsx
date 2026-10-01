import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  MapPin,
  Clock,
  PhoneCall,
  Heart,
  ChevronDown,
  Truck,
  CheckCircle2,
  Settings,
  ChefHat,
  Sparkles,
} from 'lucide-react';

import { useCart } from '../context/CartContext';
import { formatRupiah } from '../utils/formatters';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onSearchChange: (q: string) => void;
  searchQuery: string;
  onOpenFavorites: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSearchChange,
  searchQuery,
  onOpenFavorites,
}) => {
  const {
    totalItemCount,
    subtotal,
    setIsCartOpen,
    deliveryType,
    setDeliveryType,
    customerAddress,
    currentOrder,
    setIsOrderTrackerOpen,
    favorites,
    navigateTo,
    replayLoadingScreen,
  } = useCart();


  return (
    <>
      {/* Top Banner Ribbon */}
      <div className="bg-[#8F3E22] text-[#FDF8F5] text-xs font-medium py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Restoran Buka Sekarang
            </span>
            <span className="hidden md:inline text-[#E8C4B8]">|</span>
            <span className="hidden md:inline text-[#F4DDD4]">
              09:00 - 22:00 WIB · 100% Halal Certified
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-[#FCEEE9] hidden sm:inline">
              Gratis Ongkir min. <strong>Rp 75.000</strong> (Kode:{' '}
              <strong className="underline underline-offset-2">SAHLHEMAT</strong>)
            </span>

            {/* Replay Intro Loading Animation */}
            <button
              type="button"
              onClick={replayLoadingScreen}
              className="hidden md:inline-flex items-center gap-1 text-[#FCEEE9] hover:text-white transition-colors"
              title="Putar ulang animasi intro Sahl Foods"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Animasi Intro</span>
            </button>

            {/* Quick Admin Access Button in Ribbon */}
            <button
              type="button"
              onClick={() => navigateTo('dapur')}
              className="inline-flex items-center gap-1.5 bg-[#752E17] hover:bg-[#60230F] text-[#FED7AA] px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide transition-colors border border-[#A65134]"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Dapur & Kelola Menu (/Dapur)</span>
            </button>
          </div>

        </div>
      </div>


      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD4] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            
            {/* Logo & Brand (Dynamically styled via BrandLogo) */}
            <div className="flex items-center gap-3">
              <a href="#" className="hover:opacity-95 transition-opacity">
                <BrandLogo size="md" showSlogan={true} />
              </a>

              {/* Delivery vs Takeaway Segmented Control */}
              <div className="hidden md:flex items-center bg-[#EDE4D8] p-0.5 rounded-lg text-xs font-medium text-[#4A3E36]">
                <button
                  type="button"
                  onClick={() => setDeliveryType('delivery')}
                  className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                    deliveryType === 'delivery'
                      ? 'bg-white text-[#9E472A] shadow-sm font-semibold'
                      : 'hover:text-[#1F1712]'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  Antar (Delivery)
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryType('takeaway')}
                  className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                    deliveryType === 'takeaway'
                      ? 'bg-white text-[#9E472A] shadow-sm font-semibold'
                      : 'hover:text-[#1F1712]'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  Ambil di Outlet
                </button>
              </div>
            </div>

            {/* Middle: Search input bar */}
            <div className="flex-1 max-w-md hidden sm:block">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C7E72]" />
                <input
                  type="text"
                  placeholder="Cari Nasi Mandhi, Sate Wagyu, Cemilan, Kopi..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full bg-[#F3ECE1] hover:bg-[#EFE7DC] focus:bg-white text-sm text-[#2B2118] placeholder-[#9E9084] pl-9 pr-4 py-2 rounded-xl border border-transparent focus:border-[#C48C74] focus:outline-none transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C7E72] hover:text-[#2B2118]"
                  >
                    Hapus
                  </button>
                )}
              </div>
            </div>

            {/* Right Action buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              
              {/* Admin Button on Header */}
              <button
                type="button"
                onClick={() => navigateTo('dapur')}
                className="hidden lg:inline-flex items-center gap-1.5 bg-[#FAF1EC] border border-[#DEBEB2] text-[#9E472A] hover:bg-[#F4DFD4] px-3 py-2 rounded-xl text-xs font-bold transition-colors"
                title="Buka Halaman Khusus Dapur & Admin Sahl (/Dapur)"
              >
                <ChefHat className="w-3.5 h-3.5" />
                <span>Dapur Resto (/Dapur)</span>
              </button>


              {/* Active Order Tracker Pill Button */}
              {currentOrder && (
                <button
                  type="button"
                  onClick={() => setIsOrderTrackerOpen(true)}
                  className="flex items-center gap-2 bg-[#F6ECE6] border border-[#DEBEB2] text-[#9E472A] px-3 py-2 rounded-xl text-xs font-semibold hover:bg-[#F0DFD7] transition-colors shadow-xs"
                  title="Lihat status pesanan aktif Anda"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9E472A]"></span>
                  </span>
                  <span className="hidden sm:inline">Pesanan #{currentOrder.id.slice(-4)}</span>
                  <span className="sm:hidden">Pesanan</span>
                </button>
              )}

              {/* Favorites Button */}
              <button
                type="button"
                onClick={onOpenFavorites}
                className="p-2.5 rounded-xl text-[#5C4F44] hover:text-[#9E472A] hover:bg-[#EFE7DC] transition-colors relative"
                title="Lihat Menu Favorit"
              >
                <Heart className={`w-5 h-5 ${favorites.length > 0 ? 'text-[#9E472A] fill-[#9E472A]/20' : ''}`} />
                {favorites.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#9E472A]"></span>
                )}
              </button>

              {/* Cart Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2.5 bg-[#9E472A] hover:bg-[#863B21] text-white px-3.5 sm:px-4 py-2 rounded-xl font-medium text-sm shadow-md hover:shadow-lg transition-all"
              >
                <div className="relative">
                  <ShoppingBag className="w-5 h-5" />
                  {totalItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-amber-400 text-[#3B1E08] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">
                      {totalItemCount}
                    </span>
                  )}
                </div>
                <div className="hidden sm:flex flex-col text-left leading-tight">
                  <span className="text-[11px] text-[#FCD3C1]">Keranjang</span>
                  <span className="font-semibold text-xs">{formatRupiah(subtotal)}</span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar row */}
          <div className="mt-3 sm:hidden">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7E72]" />
              <input
                type="text"
                placeholder="Cari makanan lezat Sahl..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-[#F3ECE1] text-sm text-[#2B2118] placeholder-[#9E9084] pl-9 pr-4 py-2 rounded-xl border border-transparent focus:border-[#C48C74] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

