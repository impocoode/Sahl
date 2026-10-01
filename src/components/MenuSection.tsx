import React, { useState, useMemo } from 'react';
import {
  Utensils,
  Flame,
  Star,
  Sparkles,
  SlidersHorizontal,
  Search,
  Check,
} from 'lucide-react';
import { CATEGORIES } from '../data/menuData';
import { CategoryId, FoodItem } from '../types/food';
import { FoodCard } from './FoodCard';
import { useCart } from '../context/CartContext';

interface MenuSectionProps {
  searchQuery: string;
  onOpenDetail: (item: FoodItem) => void;
  favoritesOnly?: boolean;
  onClearFavoritesOnly?: () => void;
  favorites: string[];
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  searchQuery,
  onOpenDetail,
  favoritesOnly = false,
  onClearFavoritesOnly,
  favorites,
}) => {
  const { menuItems } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [activeTagFilter, setActiveTagFilter] = useState<'all' | 'bestseller' | 'chef' | 'spicy'>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');

  const filteredItems = useMemo(() => {
    let result = [...menuItems];

    // Favorites only filter
    if (favoritesOnly) {
      result = result.filter((item) => favorites.includes(item.id));
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Tag filter
    if (activeTagFilter === 'bestseller') {
      result = result.filter((item) => item.isBestSeller);
    } else if (activeTagFilter === 'chef') {
      result = result.filter((item) => item.isChefSpecial);
    } else if (activeTagFilter === 'spicy') {
      result = result.filter((item) => item.isSpicy);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.portion.toLowerCase().includes(q)
      );
    }


    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, activeTagFilter, searchQuery, sortBy, favoritesOnly, favorites]);

  return (
    <section id="menu-section" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9E472A] mb-1.5">
            <span>Daftar Hidangan Pilihan</span>
            <span aria-hidden="true">·</span>
            <span>Dibuat Segar Tiap Hari</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#241B15] tracking-tight">
            {favoritesOnly ? 'Menu Favorit Pilihan Anda' : 'Jelajahi Menu Sahl'}
          </h2>
          <p className="text-xs sm:text-sm text-[#695D51] mt-1 max-w-xl">
            {favoritesOnly
              ? `Menampilkan ${filteredItems.length} hidangan yang Anda simpan.`
              : 'Pilih hidangan utama basmati berempah, sate empuk, cemilan manis gurih hingga minuman segar pelepas dahaga.'}
          </p>
        </div>

        {favoritesOnly && onClearFavoritesOnly && (
          <button
            type="button"
            onClick={onClearFavoritesOnly}
            className="self-start md:self-auto text-xs font-bold text-[#9E472A] hover:underline bg-[#FAF1EC] border border-[#DEBEB2] px-3.5 py-2 rounded-xl"
          >
            ← Kembali ke Semua Menu Sahl
          </button>
        )}
      </div>

      {/* Category Tabs (Segmented Navigation) */}
      {!favoritesOnly && (
        <div className="mb-6 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-1.5 min-w-max p-1 bg-[#EFE8DD] rounded-2xl border border-[#E3D9CC]">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id as CategoryId)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isSelected
                      ? 'bg-white text-[#8F3E22] shadow-sm'
                      : 'text-[#5C4F44] hover:text-[#241B15] hover:bg-white/50'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Secondary Filter & Sort Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-8 bg-white p-3 rounded-2xl border border-[#E8DFD4] shadow-2xs">
        
        {/* Quick Tag Filters (Buttons with active states, not static pills) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTagFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTagFilter === 'all'
                ? 'bg-[#FAF1EC] text-[#9E472A] font-bold border border-[#DEBEB2]'
                : 'text-[#6B5E52] hover:text-[#241B15] hover:bg-[#F5EFE6]'
            }`}
          >
            Semua
          </button>
          
          <button
            type="button"
            onClick={() => setActiveTagFilter('bestseller')}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTagFilter === 'bestseller'
                ? 'bg-[#FAF1EC] text-[#9E472A] font-bold border border-[#DEBEB2]'
                : 'text-[#6B5E52] hover:text-[#241B15] hover:bg-[#F5EFE6]'
            }`}
          >
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>Paling Laris</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTagFilter('chef')}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTagFilter === 'chef'
                ? 'bg-[#FAF1EC] text-[#9E472A] font-bold border border-[#DEBEB2]'
                : 'text-[#6B5E52] hover:text-[#241B15] hover:bg-[#F5EFE6]'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#9E472A]" />
            <span>Signature Chef</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTagFilter('spicy')}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeTagFilter === 'spicy'
                ? 'bg-[#FAF1EC] text-[#9E472A] font-bold border border-[#DEBEB2]'
                : 'text-[#6B5E52] hover:text-[#241B15] hover:bg-[#F5EFE6]'
            }`}
          >
            <Flame className="w-3 h-3 text-red-600" />
            <span>Menu Pedas</span>
          </button>
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#7A6D61] hidden md:inline">Urutkan:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#FAF7F2] text-xs font-semibold text-[#241B15] border border-[#DDD3C7] rounded-xl px-3 py-1.5 focus:outline-none focus:border-[#9E472A]"
          >
            <option value="recommended">Rekomendasi Terbaik</option>
            <option value="rating">Rating Tertinggi ⭐</option>
            <option value="price-asc">Harga: Terendah ke Tertinggi</option>
            <option value="price-desc">Harga: Tertinggi ke Terendah</option>
          </select>
        </div>

      </div>

      {/* Grid of Dishes */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E8DFD4] p-10 text-center space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#FAF3EA] text-[#9E472A] flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#271E18]">
              Menu Tidak Ditemukan
            </h3>
            <p className="text-xs text-[#706255] mt-1">
              Tidak ada hidangan yang cocok dengan kata kunci "{searchQuery}" atau filter yang dipilih.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setActiveTagFilter('all');
            }}
            className="bg-[#9E472A] text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#863B21]"
          >
            Tampilkan Semua Menu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredItems.map((item) => (
            <FoodCard key={item.id} item={item} onOpenDetail={onOpenDetail} />
          ))}
        </div>
      )}

    </section>
  );
};
