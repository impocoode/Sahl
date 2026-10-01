import React from 'react';
import { Flame, Clock, Plus, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatRupiah } from '../utils/formatters';
import { MENU_ITEMS } from '../data/menuData';
import { useCart } from '../context/CartContext';

export const PromoBanner: React.FC = () => {
  const { openDetailModal } = useCart();
  const platterItem = MENU_ITEMS.find((i) => i.id === 'sahl-16');

  if (!platterItem) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative overflow-hidden rounded-3xl bg-[#2A1E17] text-white shadow-xl border border-[#3E2F26]">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C85A32]/25 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>Paket Hemat Spesial Munggahan & Kumpul Keluarga</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
              Sahl Sultan Family Platter
            </h3>

            <p className="text-xs sm:text-sm text-[#D3C7BC] leading-relaxed max-w-xl">
              Nampan besar perjamuan sultan untuk 3-4 orang! Berisi perpaduan Nasi Mandhi & Kebuli Basmati,
              2 paha kambing muda oven empuk, 1/2 ekor ayam bakar madu, 4 tusuk sate maranggi sapi wagyu,
              sambal sahawi segar, acar sejuk, emping renyah, dan 4 es teh rempah.
            </p>

            <div className="flex flex-wrap items-baseline gap-3 pt-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-amber-300">
                {formatRupiah(platterItem.price)}
              </span>
              {platterItem.originalPrice && (
                <span className="text-sm line-through text-[#998777]">
                  {formatRupiah(platterItem.originalPrice)}
                </span>
              )}
              <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-700/50 px-2.5 py-1 rounded-lg">
                Hemat Rp 40.000
              </span>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => openDetailModal(platterItem)}
                className="inline-flex items-center gap-2 bg-[#9E472A] hover:bg-[#B35232] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <span>Pesan Paket Sultan Ini</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-[#998A7D]">
                ⚡ Stok harian terbatas untuk menjaga kualitas segar
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-stone-800 border-2 border-stone-700">
              <img
                src={platterItem.image}
                alt={platterItem.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-xs px-3 py-1.5 rounded-xl text-xs text-amber-200 font-medium">
                Porsi Puas 3-4 Orang
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
