import React, { useState, useRef } from 'react';
import {
  X,
  Lock,
  KeyRound,
  Eye,
  EyeOff,
  ArrowLeft,
  ChefHat,
  UtensilsCrossed,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Plus,
  Edit3,
  Trash2,
  RotateCcw,
  Search,
  Upload,
  Image as ImageIcon,
  Flame,
  Coffee,
  Crown,
  Sparkles,
  Check,
  ExternalLink,
  LogOut,
  Clock,
  ShoppingBag,
  Truck,
  Copy,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../data/menuData';
import { CategoryId, FoodItem, FoodOption, LogoIconType } from '../types/food';
import { formatRupiah, formatIndoDateTime } from '../utils/formatters';
import { BrandLogo } from '../components/BrandLogo';

export const DapurPage: React.FC = () => {
  const {
    navigateTo,
    isAdminAuthenticated,
    adminPassword,
    loginAdmin,
    logoutAdmin,
    changeAdminPassword,
    menuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    resetMenuToDefault,
    brandSettings,
    updateBrandSettings,
    resetBrandSettings,
    currentOrder,
    advanceOrderStatus,
    showToast,
    replayLoadingScreen,
  } = useCart();


  // Login Form States
  const [inputUsername, setInputUsername] = useState('dapur@sahlfood.id');
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState<'menu' | 'logo' | 'orders' | 'security'>('menu');

  // Menu Search & Filter
  const [menuSearch, setMenuSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<CategoryId>('all');

  // Edit / Add Modal inside Dapur
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

  // Logo Settings States
  const [logoName, setLogoName] = useState(brandSettings.name);
  const [logoSubtitle, setLogoSubtitle] = useState(brandSettings.subtitle);
  const [logoSlogan, setLogoSlogan] = useState(brandSettings.slogan);
  const [logoType, setLogoType] = useState<'icon' | 'image'>(brandSettings.logoType);
  const [logoIcon, setLogoIcon] = useState<LogoIconType>(brandSettings.logoIcon);
  const [logoImageUrl, setLogoImageUrl] = useState(brandSettings.logoImageUrl);
  const [logoBgColor, setLogoBgColor] = useState(brandSettings.logoBgColor);
  const [logoTextColor, setLogoTextColor] = useState(brandSettings.logoTextColor);

  // Security Form States (Change Password)
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [securityFeedback, setSecurityFeedback] = useState<{ text: string; error: boolean } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const foodImageInputRef = useRef<HTMLInputElement>(null);

  // Color presets
  const colorPresets = [
    { name: 'Terracotta Sahl (Klasik)', color: '#9E472A' },
    { name: 'Saffron Amber (Hangat)', color: '#D97706' },
    { name: 'Emerald Arabika (Segar)', color: '#15803D' },
    { name: 'Deep Royal Navy (Elegan)', color: '#1E3A8A' },
    { name: 'Espresso Dark (Premium)', color: '#291F18' },
    { name: 'Crimson Red (Gourmet)', color: '#B91C1C' },
  ];

  // Preset food images
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

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    const res = loginAdmin(inputPassword);
    if (!res.success) {
      setLoginError(res.message);
    } else {
      setInputPassword('');
    }
  };

  const handleAutofillDemo = () => {
    setInputPassword(adminPassword);
    setLoginError(null);
  };

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

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityFeedback(null);

    if (newPwd !== confirmPwd) {
      setSecurityFeedback({ text: 'Konfirmasi password baru tidak cocok!', error: true });
      return;
    }

    const res = changeAdminPassword(currentPwd, newPwd);
    setSecurityFeedback({ text: res.message, error: !res.success });
    if (res.success) {
      setCurrentPwd('');
      setNewPwd('');
      setConfirmPwd('');
    }
  };

  // Filtered menu
  const filteredMenuList = menuItems.filter((item) => {
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesSearch =
      !menuSearch.trim() ||
      item.name.toLowerCase().includes(menuSearch.toLowerCase().trim()) ||
      item.description.toLowerCase().includes(menuSearch.toLowerCase().trim());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F6F1EA] text-[#241B15] flex flex-col font-sans">
      
      {/* Top Browser URL Simulation Bar */}
      <div className="bg-[#211710] text-[#D8CDC2] px-4 py-2 border-b border-[#38281D] text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-[#AFA194]">Halaman Khusus Dapur:</span>
            <span className="font-mono bg-[#322319] text-amber-300 px-2 py-0.5 rounded border border-[#4A3527] font-bold">
              SahlFoods.com/Dapur
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                navigateTo('store');
                setTimeout(() => replayLoadingScreen(), 50);
              }}
              className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors"
              title="Lihat animasi loading intro Sahl Foods"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lihat Animasi Loading</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('store')}
              className="inline-flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Lihat Toko (Etalase Publik)</span>
            </button>

            {isAdminAuthenticated && (
              <button
                type="button"
                onClick={logoutAdmin}
                className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 font-semibold"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* STATE 1: JIKA BELUM LOGIN (HALAMAN LOGIN KHUSUS DAPUR) */}
      {!isAdminAuthenticated ? (
        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 py-12">
          <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-[#E8DFD4] p-6 sm:p-8 space-y-6">
            
            {/* Header Login */}
            <div className="text-center space-y-3">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-[#9E472A] text-white flex items-center justify-center shadow-md">
                <ChefHat className="w-7 h-7 text-amber-200" />
              </div>

              <div>
                <h1 className="font-serif text-2xl font-bold text-[#2A2018]">
                  Portal Dapur & Pengelola Sahl
                </h1>
                <p className="text-xs text-[#7A6D61] mt-1">
                  Akses khusus manajemen menu, harga, pesanan masuk & pergantian logo
                </p>
              </div>
            </div>

            {/* Error Message */}
            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#524438] mb-1">
                  Email / Akun Petugas Dapur
                </label>
                <div className="relative">
                  <ChefHat className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8B7D]" />
                  <input
                    type="text"
                    required
                    value={inputUsername}
                    onChange={(e) => setInputUsername(e.target.value)}
                    placeholder="dapur@sahlfood.id"
                    className="w-full text-xs sm:text-sm bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl pl-9 pr-3 py-2.5 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#524438] mb-1">
                  Password PIN Dapur
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8B7D]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    placeholder="Masukkan password dapur..."
                    className="w-full text-xs sm:text-sm bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl pl-9 pr-10 py-2.5 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C7D71] hover:text-[#2A2018]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Demo Helper Box */}
              <div className="bg-[#FAF3EA] border border-[#E8DEC7] p-3 rounded-xl text-xs text-[#524439] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#2A2018]">🔑 Kredensial Default Dapur:</span>
                  <button
                    type="button"
                    onClick={handleAutofillDemo}
                    className="text-[#9E472A] hover:underline font-bold text-[11px]"
                  >
                    Isi Otomatis (Demo)
                  </button>
                </div>
                <p className="text-[11px] text-[#7A6D61]">
                  Password Bawaan: <code className="bg-white px-1.5 py-0.5 rounded border border-[#E0D5C7] font-bold text-[#8F3E22]">{adminPassword}</code>
                </p>
                <p className="text-[10px] text-[#998A7D]">
                  (Password dapat diubah setelah Anda login pada tab Keamanan Dapur)
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#9E472A] hover:bg-[#863B21] text-white py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Buka Panel Dapur Sahl</span>
              </button>
            </form>

            {/* Back to Customer Store link */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => navigateTo('store')}
                className="text-xs text-[#7A6D61] hover:text-[#9E472A] font-semibold inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Kembali ke Halaman Menu Pembeli</span>
              </button>
            </div>

          </div>
        </div>
      ) : (

        /* STATE 2: JIKA SUDAH LOGIN (DASHBOARD DAPUR & PENGELOLA SAHL) */
        <div className="flex-1 flex flex-col">
          
          {/* Top Dashboard Nav */}
          <div className="bg-white border-b border-[#E8DFD4] shadow-2xs">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              
              <div className="flex items-center gap-3">
                <BrandLogo size="md" showSlogan={false} />
                <span className="text-xs font-bold uppercase tracking-wider bg-[#FAF1EC] text-[#9E472A] border border-[#DEBEB2] px-2.5 py-1 rounded-lg">
                  KDS & Dashboard Dapur
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigateTo('store')}
                  className="inline-flex items-center gap-1.5 bg-[#FAF7F2] hover:bg-[#F2ECE3] text-[#3D3024] border border-[#D9CFC4] px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Kunjungi Toko Publik</span>
                </button>

                <button
                  type="button"
                  onClick={logoutAdmin}
                  className="inline-flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Kunci / Logout</span>
                </button>
              </div>

            </div>

            {/* Dashboard Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 scrollbar-none pt-1">
              <button
                type="button"
                onClick={() => setActiveTab('menu')}
                className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
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
                className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'logo'
                    ? 'border-[#9E472A] text-[#9E472A]'
                    : 'border-transparent text-[#6B5E52] hover:text-[#2A2018]'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Ganti Logo & Brand Identitas</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'orders'
                    ? 'border-[#9E472A] text-[#9E472A]'
                    : 'border-transparent text-[#6B5E52] hover:text-[#2A2018]'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Pesanan Masuk Dapur {currentOrder ? '(1 Aktif)' : ''}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('security')}
                className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'security'
                    ? 'border-[#9E472A] text-[#9E472A]'
                    : 'border-transparent text-[#6B5E52] hover:text-[#2A2018]'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Keamanan & Password Dapur</span>
              </button>
            </div>
          </div>

          {/* Main Dashboard Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
            
            {/* TAB 1: KELOLA MENU MAKANAN */}
            {activeTab === 'menu' && (
              <div className="space-y-6">
                
                {/* Metrics Summary Header */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white p-4 rounded-2xl border border-[#E8DFD4] shadow-2xs">
                    <span className="text-[11px] text-[#7A6D61] block">Total Variasi Menu</span>
                    <span className="font-serif text-2xl font-bold text-[#2A2018]">{menuItems.length}</span>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-[#E8DFD4] shadow-2xs">
                    <span className="text-[11px] text-[#7A6D61] block">Menu Best Seller</span>
                    <span className="font-serif text-2xl font-bold text-amber-700">
                      {menuItems.filter((i) => i.isBestSeller).length}
                    </span>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-[#E8DFD4] shadow-2xs">
                    <span className="text-[11px] text-[#7A6D61] block">Menu Pedas</span>
                    <span className="font-serif text-2xl font-bold text-red-700">
                      {menuItems.filter((i) => i.isSpicy).length}
                    </span>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-[#E8DFD4] shadow-2xs">
                    <span className="text-[11px] text-[#7A6D61] block">Signature Chef</span>
                    <span className="font-serif text-2xl font-bold text-[#9E472A]">
                      {menuItems.filter((i) => i.isChefSpecial).length}
                    </span>
                  </div>
                </div>

                {/* Filter and Add Controls */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E8DFD4] shadow-2xs">
                  <div className="flex items-center gap-2 flex-1 max-w-lg">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8B7D]" />
                      <input
                        type="text"
                        placeholder="Cari hidangan untuk diedit / dihapus..."
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
                      className="p-2 text-[#7A6D61] hover:text-[#9E472A] hover:bg-[#F2ECE3] rounded-xl transition-colors border border-[#DDD3C7]"
                      title="Reset ke Menu Bawaan"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Menu Items Table */}
                <div className="border border-[#E8DFD4] rounded-2xl overflow-hidden bg-white divide-y divide-[#F2ECE3] shadow-xs">
                  {filteredMenuList.length === 0 ? (
                    <div className="p-8 text-center text-xs text-[#7A6D61] space-y-2">
                      <p>Tidak ada hidangan yang cocok dengan pencarian.</p>
                    </div>
                  ) : (
                    filteredMenuList.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FAF7F2] transition-colors"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-xl object-cover shrink-0 bg-[#EFE8DC]"
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
                                · {item.portion} · {item.prepTimeMinutes} mnt masak
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <button
                            type="button"
                            onClick={() => handleOpenEditForm(item)}
                            className="inline-flex items-center gap-1 bg-[#FAF1EC] text-[#9E472A] border border-[#DEBEB2] hover:bg-[#F3E2D8] px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors"
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
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
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
              <div className="space-y-6 max-w-4xl mx-auto">
                {/* Live Preview */}
                <div className="bg-white p-5 rounded-2xl border border-[#E8DFD4] shadow-xs space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#7A6D61] block">
                    Pratinjau Langsung Tampilan Logo Website:
                  </span>
                  
                  <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#DDD3C7] flex items-center justify-between">
                    <BrandLogo size="md" showSlogan={true} />
                    <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      ✓ Desain Aktif
                    </span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-[#E8DFD4] shadow-xs space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Brand Name & Texts */}
                    <div className="space-y-4">
                      <h3 className="font-serif text-sm font-bold text-[#2A2018]">
                        Identitas Teks Brand
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
                          Subtitle / Label
                        </label>
                        <input
                          type="text"
                          value={logoSubtitle}
                          onChange={(e) => setLogoSubtitle(e.target.value)}
                          placeholder="Contoh: Food, Resto, Kitchen"
                          className="w-full text-xs sm:text-sm bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl px-3 py-2 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#54463C] mb-1">
                          Slogan
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

                    {/* Logo Graphic Options */}
                    <div className="space-y-4">
                      <h3 className="font-serif text-sm font-bold text-[#2A2018]">
                        Simbol / Gambar Logo
                      </h3>

                      {/* Mode Segmented Button */}
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
                          Upload Logo Sendiri
                        </button>
                      </div>

                      {logoType === 'icon' ? (
                        <div className="space-y-2.5">
                          <label className="block text-xs font-semibold text-[#54463C]">
                            Pilih Ikon:
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
                                  className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                                    isSel
                                      ? 'border-[#9E472A] bg-[#FAF1EC] text-[#9E472A] ring-1 ring-[#9E472A]'
                                      : 'border-[#DDD3C7] bg-[#FAF7F2] text-[#524439]'
                                  }`}
                                >
                                  <IconComp className="w-4 h-4" />
                                  <span className="text-[10px] font-semibold">{ic.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <label className="block text-xs font-semibold text-[#54463C]">
                            Upload File Gambar Logo:
                          </label>
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#F2ECE3] border-2 border-dashed border-[#CFC2B4] text-[#3D3025] p-4 rounded-xl text-xs font-bold transition-colors"
                          >
                            <Upload className="w-4 h-4" />
                            <span>Pilih File Logo PNG / JPG dari Perangkat</span>
                          </button>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleLogoFileUpload}
                            className="hidden"
                          />

                          <input
                            type="url"
                            value={logoImageUrl}
                            onChange={(e) => setLogoImageUrl(e.target.value)}
                            placeholder="Atau masukkan URL logo online..."
                            className="w-full text-xs bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl px-3 py-2 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                          />
                        </div>
                      )}

                      {/* Color Palette */}
                      <div className="space-y-2 pt-2 border-t border-[#EDE2D5]">
                        <label className="block text-xs font-semibold text-[#54463C]">
                          Warna Aksen Logo:
                        </label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {colorPresets.map((preset) => (
                            <button
                              key={preset.color}
                              type="button"
                              onClick={() => setLogoBgColor(preset.color)}
                              className={`p-1.5 rounded-lg border text-left flex items-center gap-2 text-[10px] transition-all ${
                                logoBgColor === preset.color
                                  ? 'border-[#9E472A] bg-[#FAF1EC] font-bold ring-1 ring-[#9E472A]'
                                  : 'border-[#DDD3C7] bg-[#FAF7F2]'
                              }`}
                            >
                              <span
                                className="w-3.5 h-3.5 rounded-full shrink-0"
                                style={{ backgroundColor: preset.color }}
                              />
                              <span className="truncate">{preset.name.split(' ')[0]}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>

                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#EDE2D5] flex items-center justify-between">
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
                      Kembalikan ke Bawaan Sahl
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

              </div>
            )}

            {/* TAB 3: PESANAN MASUK DAPUR (KDS) */}
            {activeTab === 'orders' && (
              <div className="space-y-6 max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-2xl border border-[#E8DFD4] shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#2A2018]">
                        Antrean Pesanan Dapur Langsung
                      </h3>
                      <p className="text-xs text-[#7A6D61]">
                        Pesanan dari pembeli yang masuk ke sistem restoran Sahl
                      </p>
                    </div>

                    <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Dapur Aktif Menerima Pesanan
                    </span>
                  </div>

                  {currentOrder ? (
                    <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E5DCD1] space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8DFD4] pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-bold text-[#9E472A] bg-[#FAF1EC] px-2.5 py-0.5 rounded-md border border-[#E8CBBF]">
                              #{currentOrder.id}
                            </span>
                            <span className="text-xs font-bold text-[#2A2018]">
                              a.n. {currentOrder.customerName}
                            </span>
                            <span className="text-xs text-[#7A6D61]">
                              ({currentOrder.customerPhone})
                            </span>
                          </div>
                          <p className="text-[11px] text-[#7A6D61] mt-1">
                            {formatIndoDateTime(currentOrder.createdAt)} · {currentOrder.deliveryType === 'delivery' ? '🛵 Pengantaran' : '🛍 Ambil di Tempat'}
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="text-xs font-bold text-[#8F3E22] bg-white px-2.5 py-1 rounded-lg border border-[#DDD3C7] block sm:inline">
                            Status: {currentOrder.status.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      {/* Item Details for Chef */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#2A2018] block">
                          Menu Yang Harus Dimasak Chef:
                        </span>
                        <div className="divide-y divide-[#EFE7DE] bg-white rounded-xl border border-[#E5DCD1] overflow-hidden">
                          {currentOrder.items.map((cartItem) => (
                            <div key={cartItem.cartItemId} className="p-3 text-xs flex justify-between items-center">
                              <div>
                                <span className="font-bold text-[#2A2018] text-sm">
                                  {cartItem.quantity}x {cartItem.item.name}
                                </span>
                                {cartItem.selectedSpiceLevel && (
                                  <p className="text-[#8F3E22] font-semibold text-[11px]">
                                    🌶 Level Kepedasan: {cartItem.selectedSpiceLevel}
                                  </p>
                                )}
                                {cartItem.selectedOptions.length > 0 && (
                                  <p className="text-[#6B5E52] text-[11px]">
                                    + Tambahan: {cartItem.selectedOptions.map((o) => o.name).join(', ')}
                                  </p>
                                )}
                                {cartItem.specialNote && (
                                  <p className="italic text-amber-800 text-[11px] bg-amber-50 p-1 rounded mt-0.5">
                                    Catatan Dapur: "{cartItem.specialNote}"
                                  </p>
                                )}
                              </div>
                              <span className="font-semibold text-stone-700">
                                {formatRupiah(cartItem.unitTotalPrice * cartItem.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Advance Stage Control */}
                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-[#DDD3C7]">
                        <div className="text-xs text-[#6B5E52]">
                          Langkah Status Saat Ini:{' '}
                          <strong className="text-[#2A2018]">
                            Tahap {currentOrder.statusStep + 1} dari 4
                          </strong>
                        </div>

                        {currentOrder.statusStep < 3 && (
                          <button
                            type="button"
                            onClick={advanceOrderStatus}
                            className="bg-[#9E472A] hover:bg-[#863B21] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
                          >
                            Update Status: Lanjut ke Tahap Berikutnya →
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-10 space-y-2">
                      <ShoppingBag className="w-10 h-10 text-[#C9BEB2] mx-auto" />
                      <p className="text-xs font-semibold text-[#7A6D61]">
                        Belum ada pesanan aktif saat ini.
                      </p>
                      <p className="text-[11px] text-[#A69788]">
                        Pesanan baru dari pembeli di website akan otomatis muncul di layar ini.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 4: KEAMANAN & GANTI PASSWORD DAPUR */}
            {activeTab === 'security' && (
              <div className="max-w-md mx-auto space-y-6">
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFD4] shadow-xs space-y-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF1EC] text-[#9E472A] flex items-center justify-center">
                      <KeyRound className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-base font-bold text-[#2A2018]">
                        Ubah Password Dapur
                      </h3>
                      <p className="text-xs text-[#7A6D61]">
                        Perbarui kata sandi untuk melindungi halaman /Dapur
                      </p>
                    </div>
                  </div>

                  {securityFeedback && (
                    <div
                      className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                        securityFeedback.error
                          ? 'bg-red-50 border border-red-200 text-red-700'
                          : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                      }`}
                    >
                      {securityFeedback.error ? (
                        <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                      )}
                      <span>{securityFeedback.text}</span>
                    </div>
                  )}

                  <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#54463C] mb-1">
                        Password Saat Ini *
                      </label>
                      <input
                        type="password"
                        required
                        value={currentPwd}
                        onChange={(e) => setCurrentPwd(e.target.value)}
                        placeholder="Masukkan password lama"
                        className="w-full text-xs sm:text-sm bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl px-3 py-2 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#54463C] mb-1">
                        Password Baru * (Min. 4 Karakter)
                      </label>
                      <input
                        type="password"
                        required
                        value={newPwd}
                        onChange={(e) => setNewPwd(e.target.value)}
                        placeholder="Buat password baru"
                        className="w-full text-xs sm:text-sm bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl px-3 py-2 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#54463C] mb-1">
                        Ulangi Password Baru *
                      </label>
                      <input
                        type="password"
                        required
                        value={confirmPwd}
                        onChange={(e) => setConfirmPwd(e.target.value)}
                        placeholder="Ketik ulang password baru"
                        className="w-full text-xs sm:text-sm bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl px-3 py-2 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#9E472A] hover:bg-[#863B21] text-white py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all"
                    >
                      Perbarui Password Dapur
                    </button>
                  </form>
                </div>
              </div>
            )}

          </main>
        </div>
      )}

      {/* SUB-MODAL: TAMBAH / EDIT MENU MAKANAN */}
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
  );
};
