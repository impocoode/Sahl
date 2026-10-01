import React, { useState, useRef } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit3,
  Settings,
  Image as ImageIcon,
  UtensilsCrossed,
  Flame,
  ChefHat,
  Coffee,
  Crown,
  Sparkles,
  Upload,
  RotateCcw,
  Check,
  Search,
  CheckCircle2,
  AlertCircle,
  Copy,
  DollarSign,
  Tag,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../data/menuData';
import { CategoryId, FoodItem, FoodOption, LogoIconType } from '../types/food';
import { formatRupiah } from '../utils/formatters';
import { BrandLogo } from './BrandLogo';

export const AdminModal: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    resetMenuToDefault,
    brandSettings,
    updateBrandSettings,
    resetBrandSettings,
    showToast,
  } = useCart();

  const [activeTab, setActiveTab] = useState<'menu' | 'logo'>('menu');
  const [menuSearch, setMenuSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<CategoryId>('all');

  // Edit / Add modal state
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  // Form states for menu item
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<CategoryId>('nasi-utama');
  const [formPrice, setFormPrice] = useState<number>(45000);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number | undefined>(undefined);
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80');
  const [formDesc, setFormDesc] = useState('');
  const [formPortion, setFormPortion] = useState('1 Porsi Lengkap');
  const [formPrepTime, setFormPrepTime] = useState<number>(15);
  const [formCalories, setFormCalories] = useState<number | undefined>(500);
  const [formIsHalal, setFormIsHalal] = useState(true);
  const [formIsBestSeller, setFormIsBestSeller] = useState(false);
  const [formIsChefSpecial, setFormIsChefSpecial] = useState(false);
  const [formIsSpicy, setFormIsSpicy] = useState(false);
  const [formSpiceAvailable, setFormSpiceAvailable] = useState(false);
  const [formOptions, setFormOptions] = useState<FoodOption[]>([]);
  const [newOptionName, setNewOptionName] = useState('');
  const [newOptionPrice, setNewOptionPrice] = useState<number>(5000);

  // Logo settings form state
  const [logoName, setLogoName] = useState(brandSettings.name);
  const [logoSubtitle, setLogoSubtitle] = useState(brandSettings.subtitle);
  const [logoSlogan, setLogoSlogan] = useState(brandSettings.slogan);
  const [logoType, setLogoType] = useState<'icon' | 'image'>(brandSettings.logoType);
  const [logoIcon, setLogoIcon] = useState<LogoIconType>(brandSettings.logoIcon);
  const [logoImageUrl, setLogoImageUrl] = useState(brandSettings.logoImageUrl);
  const [logoBgColor, setLogoBgColor] = useState(brandSettings.logoBgColor);
  const [logoTextColor, setLogoTextColor] = useState(brandSettings.logoTextColor);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const foodImageInputRef = useRef<HTMLInputElement>(null);

  if (!isAdminOpen) return null;

  // Preset food image recommendations for easy picking
  const presetFoodImages = [
    { label: 'Nasi Mandhi / Daging', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' },
    { label: 'Nasi Kebuli Berempah', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80' },
    { label: 'Sate Maranggi Bakar', url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80' },
    { label: 'Rendang Sapi Empuk', url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80' },
    { label: 'Roti Maryam Keju Madu', url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80' },
    { label: 'Dimsum Mentai Mozzarella', url: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=800&q=80' },
    { label: 'Es Kopi Aren Segar', url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80' },
    { label: 'Es Cincau Pandan Segar', url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80' },
  ];

  const colorPresets = [
    { name: 'Terracotta Sahl (Klasik)', color: '#9E472A' },
    { name: 'Saffron Amber (Hangat)', color: '#D97706' },
    { name: 'Emerald Arabika (Segar)', color: '#15803D' },
    { name: 'Deep Royal Navy (Elegan)', color: '#1E3A8A' },
    { name: 'Espresso Dark (Premium)', color: '#291F18' },
    { name: 'Crimson Red (Gourmet)', color: '#B91C1C' },
  ];

  const handleOpenAddForm = () => {
    setEditingItemId(null);
    setFormName('');
    setFormCategory('nasi-utama');
    setFormPrice(45000);
    setFormOriginalPrice(undefined);
    setFormImage('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80');
    setFormDesc('');
    setFormPortion('1 Porsi Lengkap');
    setFormPrepTime(15);
    setFormCalories(500);
    setFormIsHalal(true);
    setFormIsBestSeller(false);
    setFormIsChefSpecial(false);
    setFormIsSpicy(false);
    setFormSpiceAvailable(false);
    setFormOptions([]);
    setIsEditingItem(true);
  };

  const handleOpenEditForm = (item: FoodItem) => {
    setEditingItemId(item.id);
    setFormName(item.name);
    setFormCategory(item.category);
    setFormPrice(item.price);
    setFormOriginalPrice(item.originalPrice);
    setFormImage(item.image);
    setFormDesc(item.description);
    setFormPortion(item.portion);
    setFormPrepTime(item.prepTimeMinutes);
    setFormCalories(item.calories);
    setFormIsHalal(item.isHalal);
    setFormIsBestSeller(!!item.isBestSeller);
    setFormIsChefSpecial(!!item.isChefSpecial);
    setFormIsSpicy(!!item.isSpicy);
    setFormSpiceAvailable(!!item.spiceLevelsAvailable);
    setFormOptions(item.availableOptions ? [...item.availableOptions] : []);
    setIsEditingItem(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert('Nama menu wajib diisi.');
      return;
    }

    const payload = {
      name: formName.trim(),
      category: formCategory,
      price: Number(formPrice) || 0,
      originalPrice: formOriginalPrice ? Number(formOriginalPrice) : undefined,
      image: formImage.trim() || 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      description: formDesc.trim() || 'Hidangan lezat dan otentik khas Sahl.',
      portion: formPortion.trim() || '1 Porsi',
      prepTimeMinutes: Number(formPrepTime) || 15,
      calories: formCalories ? Number(formCalories) : undefined,
      isHalal: formIsHalal,
      isBestSeller: formIsBestSeller,
      isChefSpecial: formIsChefSpecial,
      isSpicy: formIsSpicy,
      spiceLevelsAvailable: formSpiceAvailable,
      availableOptions: formOptions,
    };

    if (editingItemId) {
      updateMenuItem(editingItemId, payload);
    } else {
      addMenuItem(payload);
    }

    setIsEditingItem(false);
  };

  const handleAddOption = () => {
    if (!newOptionName.trim()) return;
    setFormOptions((prev) => [
      ...prev,
      {
        id: `opt-${Date.now()}`,
        name: newOptionName.trim(),
        price: Number(newOptionPrice) || 0,
      },
    ]);
    setNewOptionName('');
    setNewOptionPrice(5000);
  };

  const handleRemoveOption = (id: string) => {
    setFormOptions((prev) => prev.filter((o) => o.id !== id));
  };

  // Upload logo image file as Data URL
  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLogoImageUrl(event.target.result as string);
          setLogoType('image');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload food photo as Data URL
  const handleFoodPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveBrandSettings = () => {
    updateBrandSettings({
      name: logoName.trim() || 'Sahl',
      subtitle: logoSubtitle.trim(),
      slogan: logoSlogan.trim(),
      logoType,
      logoIcon,
      logoImageUrl,
      logoBgColor,
      logoTextColor,
    });
  };

  // Filtered list inside admin
  const filteredMenuList = menuItems.filter((item) => {
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesSearch =
      !menuSearch.trim() ||
      item.name.toLowerCase().includes(menuSearch.toLowerCase().trim()) ||
      item.description.toLowerCase().includes(menuSearch.toLowerCase().trim());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#EDE2D5] my-auto flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#FAF7F2] border-b border-[#E8DFD4] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#9E472A] text-white flex items-center justify-center shadow-xs">
              <Settings className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg font-bold text-[#271E18]">
                  Panel Admin Sahl Food
                </h2>
                <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-md">
                  Pengelola Resto
                </span>
              </div>
              <p className="text-xs text-[#7A6D61]">
                Atur menu makanan, tambah/kurang/edit harga & gonta-ganti logo brand Sahl
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAdminOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B5D52] hover:bg-[#EFE8DF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E8DFD4] bg-[#FAF5EE] px-4 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'menu'
                ? 'border-[#9E472A] text-[#9E472A]'
                : 'border-transparent text-[#6B5E52] hover:text-[#2A2018]'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Kelola Menu Makanan ({menuItems.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('logo')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'logo'
                ? 'border-[#9E472A] text-[#9E472A]'
                : 'border-transparent text-[#6B5E52] hover:text-[#2A2018]'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Ganti Logo & Brand Identitas</span>
          </button>
        </div>

        {/* Main Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: KELOLA MENU MAKANAN */}
          {activeTab === 'menu' && (
            <div className="space-y-5">
              
              {/* Top Controls: Add Button & Search */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 max-w-md">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8B7D]" />
                    <input
                      type="text"
                      placeholder="Cari menu untuk diedit / dihapus..."
                      value={menuSearch}
                      onChange={(e) => setMenuSearch(e.target.value)}
                      className="w-full text-xs bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl pl-9 pr-3 py-2 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                    />
                  </div>

                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value as CategoryId)}
                    className="bg-[#FAF7F2] text-xs text-[#2A2018] border border-[#DDD3C7] rounded-xl px-2.5 py-2 focus:outline-none focus:border-[#9E472A]"
                  >
                    <option value="all">Semua Kategori</option>
                    {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleOpenAddForm}
                    className="inline-flex items-center gap-1.5 bg-[#9E472A] hover:bg-[#863B21] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Menu Baru</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Kembalikan seluruh daftar menu ke standar awal Sahl?')) {
                        resetMenuToDefault();
                      }
                    }}
                    className="p-2 text-[#7A6D61] hover:text-[#9E472A] hover:bg-[#F2ECE3] rounded-xl transition-colors"
                    title="Reset ke Menu Bawaan"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Menu Items Table / Cards */}
              <div className="border border-[#E8DFD4] rounded-2xl overflow-hidden bg-white divide-y divide-[#F2ECE3]">
                {filteredMenuList.length === 0 ? (
                  <div className="p-8 text-center text-xs text-[#7A6D61] space-y-2">
                    <p>Tidak ada menu yang sesuai dengan filter.</p>
                  </div>
                ) : (
                  filteredMenuList.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAF7F2] transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0 bg-[#EFE8DC]"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-serif text-sm font-bold text-[#2A2018] truncate">
                              {item.name}
                            </h4>
                            {item.isBestSeller && (
                              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                                Best Seller
                              </span>
                            )}
                            {item.isChefSpecial && (
                              <span className="text-[10px] font-bold text-orange-800 bg-orange-100 px-1.5 py-0.5 rounded">
                                Chef Special
                              </span>
                            )}
                            {item.isSpicy && (
                              <span className="text-[10px] font-bold text-red-800 bg-red-100 px-1.5 py-0.5 rounded">
                                🌶 Pedas
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-[#6B5E52] line-clamp-1 mt-0.5">
                            {item.description}
                          </p>

                          <div className="flex items-center gap-2 text-xs font-semibold text-[#8F3E22] mt-1">
                            <span>{formatRupiah(item.price)}</span>
                            {item.originalPrice && (
                              <span className="line-through text-[#998A7D] text-[11px]">
                                {formatRupiah(item.originalPrice)}
                              </span>
                            )}
                            <span className="text-[10px] font-normal text-[#8A7C6E]">
                              · {item.portion}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions: Edit & Delete */}
                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          type="button"
                          onClick={() => handleOpenEditForm(item)}
                          className="inline-flex items-center gap-1 bg-[#FAF1EC] text-[#9E472A] border border-[#DEBEB2] hover:bg-[#F3E2D8] px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Menu</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Hapus hidangan "${item.name}" dari menu?`)) {
                              deleteMenuItem(item.id);
                            }
                          }}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus Menu"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          )}

          {/* TAB 2: GONTA GANTI LOGO & IDENTITAS */}
          {activeTab === 'logo' && (
            <div className="space-y-6">
              
              {/* Real-time Preview Banner */}
              <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8DFD4] space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A6D61] block">
                  Pratinjau Langsung Tampilan Logo Website:
                </span>
                
                <div className="p-4 bg-white rounded-xl border border-[#DDD3C7] flex items-center justify-between">
                  <BrandLogo size="md" showSlogan={true} />
                  <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-1 rounded-md">
                    ✓ Pratinjau Desain
                  </span>
                </div>
              </div>

              {/* Form Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Brand Text Fields */}
                <div className="space-y-4">
                  <h3 className="font-serif text-sm font-bold text-[#2A2018]">
                    Teks Nama & Slogan Brand
                  </h3>

                  <div>
                    <label className="block text-xs font-semibold text-[#54463C] mb-1">
                      Nama Utama Toko / Resto
                    </label>
                    <input
                      type="text"
                      value={logoName}
                      onChange={(e) => setLogoName(e.target.value)}
                      placeholder="Contoh: Sahl, Resto Sahl"
                      className="w-full text-xs sm:text-sm bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl px-3 py-2 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#54463C] mb-1">
                      Subtitle / Label Kategori
                    </label>
                    <input
                      type="text"
                      value={logoSubtitle}
                      onChange={(e) => setLogoSubtitle(e.target.value)}
                      placeholder="Contoh: Food, Kuliner, Kitchen"
                      className="w-full text-xs sm:text-sm bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl px-3 py-2 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#54463C] mb-1">
                      Slogan / Motto
                    </label>
                    <input
                      type="text"
                      value={logoSlogan}
                      onChange={(e) => setLogoSlogan(e.target.value)}
                      placeholder="Contoh: Mudah, Lezat & Berkah"
                      className="w-full text-xs sm:text-sm bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl px-3 py-2 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Logo Type & Visuals */}
                <div className="space-y-4">
                  <h3 className="font-serif text-sm font-bold text-[#2A2018]">
                    Visual Logo (Ikon atau Gambar/Foto)
                  </h3>

                  {/* Mode Selector */}
                  <div className="grid grid-cols-2 gap-2 bg-[#F3ECE1] p-1 rounded-xl text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => setLogoType('icon')}
                      className={`py-2 rounded-lg transition-all ${
                        logoType === 'icon'
                          ? 'bg-white text-[#9E472A] shadow-xs'
                          : 'text-[#615448]'
                      }`}
                    >
                      Gunakan Ikon Kuliner
                    </button>
                    <button
                      type="button"
                      onClick={() => setLogoType('image')}
                      className={`py-2 rounded-lg transition-all ${
                        logoType === 'image'
                          ? 'bg-white text-[#9E472A] shadow-xs'
                          : 'text-[#615448]'
                      }`}
                    >
                      Unggah Foto / Logo Sendiri
                    </button>
                  </div>

                  {logoType === 'icon' ? (
                    <div className="space-y-3">
                      <label className="block text-xs font-semibold text-[#54463C]">
                        Pilih Simbol Ikon Restoran:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'utensils', label: 'Sendok Garpu', icon: UtensilsCrossed },
                          { id: 'flame', label: 'Api Bakaran', icon: Flame },
                          { id: 'chef', label: 'Topi Koki', icon: ChefHat },
                          { id: 'coffee', label: 'Cangkir Kopi', icon: Coffee },
                          { id: 'crown', label: 'Mahkota Sultan', icon: Crown },
                          { id: 'sparkles', label: 'Bintang Berkah', icon: Sparkles },
                        ].map((ic) => {
                          const IconComp = ic.icon;
                          const isSel = logoIcon === ic.id;
                          return (
                            <button
                              key={ic.id}
                              type="button"
                              onClick={() => setLogoIcon(ic.id as LogoIconType)}
                              className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                                isSel
                                  ? 'border-[#9E472A] bg-[#FAF1EC] text-[#9E472A] ring-1 ring-[#9E472A]'
                                  : 'border-[#DDD3C7] bg-white text-[#524439] hover:bg-[#FAF7F2]'
                              }`}
                            >
                              <IconComp className="w-5 h-5" />
                              <span className="text-[11px] font-semibold">{ic.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <label className="block text-xs font-semibold text-[#54463C]">
                        Unggah File Logo atau Masukkan URL:
                      </label>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-1.5 bg-[#EDE4D8] hover:bg-[#E2D6C7] text-[#3D3025] px-3 py-2 rounded-xl text-xs font-bold transition-colors"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>Pilih File dari HP / Laptop</span>
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleLogoFileUpload}
                          className="hidden"
                        />
                      </div>

                      <div>
                        <span className="text-[11px] text-[#786C5F] block mb-1">
                          Atau tempelkan link URL gambar:
                        </span>
                        <input
                          type="url"
                          value={logoImageUrl}
                          onChange={(e) => setLogoImageUrl(e.target.value)}
                          placeholder="https://contoh.com/logo-sahl.png"
                          className="w-full text-xs bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl px-3 py-2 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  {/* Color Palette Selector */}
                  <div className="space-y-2 pt-2 border-t border-[#EDE2D5]">
                    <label className="block text-xs font-semibold text-[#54463C]">
                      Warna Latar Belakang Logo:
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {colorPresets.map((preset) => (
                        <button
                          key={preset.color}
                          type="button"
                          onClick={() => setLogoBgColor(preset.color)}
                          className={`p-1.5 rounded-lg border text-left flex items-center gap-2 text-[11px] transition-all ${
                            logoBgColor === preset.color
                              ? 'border-[#9E472A] bg-[#FAF1EC] font-bold ring-1 ring-[#9E472A]'
                              : 'border-[#DDD3C7] bg-white'
                          }`}
                        >
                          <span
                            className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                            style={{ backgroundColor: preset.color }}
                          />
                          <span className="truncate">{preset.name.split(' ')[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#E8DFD4] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Reset logo & nama ke standar awal Sahl?')) {
                      resetBrandSettings();
                      setLogoName('Sahl');
                      setLogoSubtitle('Food');
                      setLogoSlogan('Mudah, Lezat & Berkah');
                      setLogoType('icon');
                      setLogoIcon('utensils');
                      setLogoImageUrl('');
                      setLogoBgColor('#9E472A');
                    }
                  }}
                  className="text-xs text-[#7A6D61] hover:text-[#9E472A] font-semibold"
                >
                  Kembalikan ke Logo Bawaan Sahl
                </button>

                <button
                  type="button"
                  onClick={handleSaveBrandSettings}
                  className="inline-flex items-center gap-2 bg-[#9E472A] hover:bg-[#863B21] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>Simpan Perubahan Logo & Brand</span>
                </button>
              </div>

            </div>
          )}

        </div>

        {/* SUB-MODAL: FORM TAMBAH / EDIT MENU MAKANAN */}
        {isEditingItem && (
          <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
            <div
              className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#EDE2D5] my-auto flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 bg-[#FAF7F2] border-b border-[#E8DFD4] flex items-center justify-between">
                <h3 className="font-serif text-base font-bold text-[#2A2018]">
                  {editingItemId ? 'Edit Data Menu Makanan' : 'Tambah Menu Baru Sahl'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsEditingItem(false)}
                  className="p-1 rounded-lg text-[#7A6D61] hover:bg-[#EDE4D8]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveItem} className="p-5 overflow-y-auto space-y-4 flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#54463C] mb-1">
                      Nama Hidangan Makanan *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Contoh: Nasi Mandhi Ayam Bakar Rempah"
                      className="w-full text-xs sm:text-sm bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl px-3 py-2 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#54463C] mb-1">
                      Kategori Menu *
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as CategoryId)}
                      className="w-full text-xs sm:text-sm bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl px-3 py-2 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                    >
                      {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#54463C] mb-1">
                      Porsi & Kelengkapan
                    </label>
                    <input
                      type="text"
                      value={formPortion}
                      onChange={(e) => setFormPortion(e.target.value)}
                      placeholder="Contoh: 1 Porsi Lengkap + Sambal & Acar"
                      className="w-full text-xs sm:text-sm bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl px-3 py-2 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#54463C] mb-1">
                      Harga Jual (Rp) *
                    </label>
                    <input
                      type="number"
                      required
                      min={0}
                      step={1000}
                      value={formPrice}
                      onChange={(e) => setFormPrice(Number(e.target.value))}
                      className="w-full text-xs sm:text-sm bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl px-3 py-2 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#54463C] mb-1">
                      Harga Asli / Coret (Rp, Opsional)
                    </label>
                    <input
                      type="number"
                      min={0}
                      step={1000}
                      value={formOriginalPrice || ''}
                      onChange={(e) => setFormOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                      placeholder="Contoh: 55000"
                      className="w-full text-xs sm:text-sm bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl px-3 py-2 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#54463C] mb-1">
                      Foto Makanan (URL atau Upload File) *
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="url"
                        required
                        value={formImage}
                        onChange={(e) => setFormImage(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="flex-1 text-xs bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl px-3 py-2 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => foodImageInputRef.current?.click()}
                        className="bg-[#EDE4D8] hover:bg-[#E2D6C7] text-[#3D3025] px-3 py-2 rounded-xl text-xs font-bold transition-colors shrink-0"
                      >
                        Upload Foto
                      </button>
                      <input
                        ref={foodImageInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFoodPhotoUpload}
                        className="hidden"
                      />
                    </div>

                    {/* Presets */}
                    <div className="space-y-1">
                      <span className="text-[11px] text-[#7A6D61]">Atau pilih dari foto template siap pakai:</span>
                      <div className="flex gap-1.5 overflow-x-auto pb-1">
                        {presetFoodImages.map((p) => (
                          <button
                            key={p.label}
                            type="button"
                            onClick={() => setFormImage(p.url)}
                            className="text-[10px] bg-[#FAF5EE] border border-[#DDD3C7] hover:border-[#9E472A] px-2 py-1 rounded-md shrink-0 text-[#4D4036]"
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-[#54463C] mb-1">
                      Deskripsi Menggugah Selera
                    </label>
                    <textarea
                      rows={2}
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      placeholder="Jelaskan aroma, kelembutan daging, bumbu rempah dan keunikan menu ini..."
                      className="w-full text-xs sm:text-sm bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl px-3 py-2 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#54463C] mb-1">
                      Waktu Masak / Siap (Menit)
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={formPrepTime}
                      onChange={(e) => setFormPrepTime(Number(e.target.value))}
                      className="w-full text-xs sm:text-sm bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl px-3 py-2 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#54463C] mb-1">
                      Estimasi Kalori (kkal, Opsional)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={formCalories || ''}
                      onChange={(e) => setFormCalories(e.target.value ? Number(e.target.value) : undefined)}
                      placeholder="Contoh: 540"
                      className="w-full text-xs sm:text-sm bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl px-3 py-2 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Badges and Attributes Checkboxes */}
                <div className="pt-2 border-t border-[#EDE2D5] space-y-2">
                  <span className="text-xs font-bold text-[#2A2018] block">
                    Label & Atribut Tambahan
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-[#4A3D33]">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formIsHalal}
                        onChange={(e) => setFormIsHalal(e.target.checked)}
                        className="rounded text-[#9E472A] focus:ring-[#9E472A]"
                      />
                      <span>100% Halal Thayyib</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formIsBestSeller}
                        onChange={(e) => setFormIsBestSeller(e.target.checked)}
                        className="rounded text-[#9E472A] focus:ring-[#9E472A]"
                      />
                      <span>Menu Best Seller ⭐</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formIsChefSpecial}
                        onChange={(e) => setFormIsChefSpecial(e.target.checked)}
                        className="rounded text-[#9E472A] focus:ring-[#9E472A]"
                      />
                      <span>Signature Chef</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formIsSpicy}
                        onChange={(e) => setFormIsSpicy(e.target.checked)}
                        className="rounded text-[#9E472A] focus:ring-[#9E472A]"
                      />
                      <span>Cita Rasa Pedas 🌶</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formSpiceAvailable}
                        onChange={(e) => setFormSpiceAvailable(e.target.checked)}
                        className="rounded text-[#9E472A] focus:ring-[#9E472A]"
                      />
                      <span>Bisa Pilih Level Pedas</span>
                    </label>
                  </div>
                </div>

                {/* Dynamic Options / Topping add-ons */}
                <div className="pt-3 border-t border-[#EDE2D5] space-y-2">
                  <span className="text-xs font-bold text-[#2A2018] block">
                    Opsi Topping / Tambahan (Opsional)
                  </span>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Nama opsi (e.g. Sambal Ekstra, Keju)"
                      value={newOptionName}
                      onChange={(e) => setNewOptionName(e.target.value)}
                      className="flex-1 text-xs bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl px-3 py-2 text-[#2A2018]"
                    />
                    <input
                      type="number"
                      step={1000}
                      min={0}
                      placeholder="Harga (Rp)"
                      value={newOptionPrice}
                      onChange={(e) => setNewOptionPrice(Number(e.target.value))}
                      className="w-28 text-xs bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl px-3 py-2 text-[#2A2018]"
                    />
                    <button
                      type="button"
                      onClick={handleAddOption}
                      className="bg-[#FAF1EC] border border-[#DEBEB2] text-[#9E472A] px-3 py-2 rounded-xl text-xs font-bold"
                    >
                      + Tambah
                    </button>
                  </div>

                  {formOptions.length > 0 && (
                    <div className="space-y-1 pt-1">
                      {formOptions.map((opt) => (
                        <div
                          key={opt.id}
                          className="flex items-center justify-between bg-[#FAF7F2] px-3 py-1.5 rounded-lg border border-[#E8DFD4] text-xs"
                        >
                          <span>{opt.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-[#8F3E22]">
                              +{formatRupiah(opt.price)}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveOption(opt.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer Save Button */}
                <div className="pt-4 border-t border-[#E8DFD4] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingItem(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-[#6B5E52] hover:bg-[#FAF7F2]"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-[#9E472A] hover:bg-[#863B21] text-white px-5 py-2 rounded-xl text-xs font-bold shadow-md"
                  >
                    {editingItemId ? 'Simpan Perubahan' : 'Terbitkan Menu'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
