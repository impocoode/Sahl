import React, { useState } from 'react';
import {
  X,
  Star,
  Clock,
  Flame,
  ShieldCheck,
  Plus,
  Minus,
  Check,
} from 'lucide-react';
import { CartOptionSelection, FoodItem } from '../types/food';
import { formatRupiah } from '../utils/formatters';
import { useCart } from '../context/CartContext';

interface FoodDetailModalProps {
  item: FoodItem | null;
  onClose: () => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({ item, onClose }) => {
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedSpiceLevel, setSelectedSpiceLevel] = useState<string>('Sedang');
  const [selectedOptions, setSelectedOptions] = useState<CartOptionSelection[]>([]);
  const [specialNote, setSpecialNote] = useState('');

  if (!item) return null;

  const spiceLevels = ['Tidak Pedas', 'Sedang', 'Pedas Mantap', 'Ekstra Pedas 🔥'];

  const toggleOption = (opt: { id: string; name: string; price: number }) => {
    setSelectedOptions((prev) => {
      const exists = prev.some((o) => o.id === opt.id);
      if (exists) {
        return prev.filter((o) => o.id !== opt.id);
      } else {
        return [...prev, opt];
      }
    });
  };

  const optionsTotal = selectedOptions.reduce((acc, opt) => acc + opt.price, 0);
  const unitPrice = item.price + optionsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(
      item,
      quantity,
      item.spiceLevelsAvailable ? selectedSpiceLevel : undefined,
      selectedOptions,
      specialNote.trim() || undefined
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#EDE2D5] my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-[#4A3D33] hover:text-black flex items-center justify-center shadow-md transition-colors"
          aria-label="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-[#EDE4D8] overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-200 mb-1">
              <span className="flex items-center gap-1 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {item.rating.toFixed(1)} ({item.reviewCount} ulasan)
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {item.prepTimeMinutes} mnt masak
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Halal
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
              {item.name}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          
          {/* Description & Portion */}
          <div className="space-y-2">
            <p className="text-sm text-[#52453B] leading-relaxed">
              {item.description}
            </p>
            <div className="text-xs text-[#7A6C5F] bg-[#FAF5EE] p-3 rounded-xl border border-[#EDE2D5] flex items-center justify-between">
              <span><strong>Porsi:</strong> {item.portion}</span>
              {item.calories && (
                <span><strong>Kalori:</strong> ~{item.calories} kkal</span>
              )}
            </div>
          </div>

          {/* Spice Level Selector (if item allows) */}
          {item.spiceLevelsAvailable && (
            <div className="space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2E241E] flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#9E472A]" />
                Tingkat Kepedasan
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {spiceLevels.map((lvl) => {
                  const isSelected = selectedSpiceLevel === lvl;
                  return (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSelectedSpiceLevel(lvl)}
                      className={`px-3 py-2 rounded-xl text-xs font-medium border text-center transition-all ${
                        isSelected
                          ? 'border-[#9E472A] bg-[#FAF1EC] text-[#9E472A] font-semibold ring-1 ring-[#9E472A]'
                          : 'border-[#E4D9CC] bg-white text-[#4A3D33] hover:border-[#D1C2B2]'
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Options / Add-ons */}
          {item.availableOptions && item.availableOptions.length > 0 && (
            <div className="space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2E241E]">
                Pilihan Tambahan / Extra Topping (Opsional)
              </label>
              <div className="space-y-2">
                {item.availableOptions.map((opt) => {
                  const isSelected = selectedOptions.some((o) => o.id === opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => toggleOption(opt)}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#9E472A] bg-[#FAF1EC]'
                          : 'border-[#E4D9CC] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-[#9E472A] text-white'
                              : 'border border-[#C2B5A5] bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-[#2E241E]">
                          {opt.name}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-[#8F3E22]">
                        +{formatRupiah(opt.price)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Notes */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2E241E]">
              Catatan Khusus ke Koki (Opsional)
            </label>
            <input
              type="text"
              placeholder="Contoh: Sambal tolong dipisah, kuah dibanyakin, tanpa daun seledri"
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              className="w-full text-xs sm:text-sm bg-[#FAF7F2] border border-[#E4D9CC] rounded-xl px-3.5 py-2.5 text-[#2E241E] placeholder-[#9E9082] focus:bg-white focus:border-[#9E472A] focus:outline-none"
            />
          </div>

        </div>

        {/* Modal Footer with Quantity & Add to Cart button */}
        <div className="p-4 sm:p-6 bg-[#FAF7F2] border-t border-[#E8DFD4] flex items-center justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center bg-white border border-[#D9CFC4] rounded-xl p-1 shadow-2xs">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#55473B] hover:bg-[#F2ECE3] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              aria-label="Kurangi jumlah"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-9 text-center font-bold text-sm text-[#2E241E]">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-[#55473B] hover:bg-[#F2ECE3] transition-colors"
              aria-label="Tambah jumlah"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 inline-flex items-center justify-between bg-[#9E472A] hover:bg-[#863B21] text-white px-5 py-3 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all"
          >
            <span>Masukkan Keranjang</span>
            <span>{formatRupiah(totalPrice)}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
