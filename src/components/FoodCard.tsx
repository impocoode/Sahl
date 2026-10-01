import React from 'react';
import { Plus, Star, Heart, Flame, Clock } from 'lucide-react';
import { FoodItem } from '../types/food';
import { formatRupiah } from '../utils/formatters';
import { useCart } from '../context/CartContext';

interface FoodCardProps {
  item: FoodItem;
  onOpenDetail: (item: FoodItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onOpenDetail }) => {
  const { addToCart, toggleFavorite, isFavorite } = useCart();
  const favorite = isFavorite(item.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // If the food has customizable options, open the detail modal instead so user can customize
    if ((item.availableOptions && item.availableOptions.length > 0) || item.spiceLevelsAvailable) {
      onOpenDetail(item);
    } else {
      addToCart(item, 1);
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  return (
    <article
      onClick={() => onOpenDetail(item)}
      className="group cursor-pointer bg-white rounded-2xl border border-[#E8DFD4] hover:border-[#D1B8A8] hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden h-full"
    >
      {/* Food Photography Container */}
      <div className="relative aspect-[4/3] bg-[#EFE8DC] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={handleToggleFavorite}
          aria-label={favorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#55493F] hover:text-[#9E472A] hover:bg-white shadow-xs transition-colors"
        >
          <Heart
            className={`w-4 h-4 ${favorite ? 'text-[#9E472A] fill-[#9E472A]' : ''}`}
          />
        </button>

        {/* Subtle Top Highlights (Quiet unboxed overlay kicker) */}
        {item.isChefSpecial && (
          <div className="absolute top-3 left-3 bg-[#241A14]/85 backdrop-blur-sm text-amber-200 text-[11px] font-medium px-2.5 py-1 rounded-lg">
            Signature Chef
          </div>
        )}
      </div>

      {/* Card Content & Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div className="space-y-1.5">
          {/* Unboxed Metadata Line with typographic separators (anti-slop rule) */}
          <div className="flex items-center gap-1.5 text-xs text-[#786C5E]">
            <span className="flex items-center gap-1 font-semibold text-[#8F3E22]">
              <Star className="w-3.5 h-3.5 fill-[#E9A03B] text-[#E9A03B]" />
              {item.rating.toFixed(1)}
            </span>
            <span aria-hidden="true" className="text-[#C2B5A5]">·</span>
            <span>({item.reviewCount} ulasan)</span>
            <span aria-hidden="true" className="text-[#C2B5A5]">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#998B7C]" />
              {item.prepTimeMinutes} mnt
            </span>
            {item.isSpicy && (
              <>
                <span aria-hidden="true" className="text-[#C2B5A5]">·</span>
                <span className="text-red-700 font-medium flex items-center">
                  <Flame className="w-3 h-3 mr-0.5 inline" /> Pedas
                </span>
              </>
            )}
          </div>

          {/* Dish Title */}
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#241C16] group-hover:text-[#9E472A] transition-colors line-clamp-1 leading-snug">
            {item.name}
          </h3>

          {/* Appetite Description */}
          <p className="text-xs text-[#6B5E52] line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-[#F2ECE3] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-bold text-[#241C16]">
                {formatRupiah(item.price)}
              </span>
              {item.originalPrice && (
                <span className="text-xs line-through text-[#9E9082]">
                  {formatRupiah(item.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[11px] text-[#8C7E72] block">
              {item.portion.length > 25 ? `${item.portion.slice(0, 25)}...` : item.portion}
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className="inline-flex items-center gap-1.5 bg-[#F6ECE6] hover:bg-[#9E472A] text-[#9E472A] hover:text-white px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 shadow-2xs group/btn"
          >
            <Plus className="w-3.5 h-3.5 group-hover/btn:rotate-90 transition-transform duration-200" />
            <span>{(item.availableOptions && item.availableOptions.length > 0) || item.spiceLevelsAvailable ? 'Pilih' : 'Tambah'}</span>
          </button>
        </div>

      </div>
    </article>
  );
};
