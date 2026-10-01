import React, { createContext, useContext, useEffect, useState } from 'react';
import { MENU_ITEMS, PROMO_CODES } from '../data/menuData';
import {
  BrandSettings,
  CartItem,
  CartOptionSelection,
  FoodItem,
  Order,
  OrderStatus,
  PromoCode,
} from '../types/food';

export const DEFAULT_BRAND_SETTINGS: BrandSettings = {
  name: 'Sahl',
  subtitle: 'Food',
  slogan: 'Mudah, Lezat & Berkah',
  logoType: 'icon',
  logoIcon: 'utensils',
  logoImageUrl: '',
  logoBgColor: '#9E472A',
  logoTextColor: '#FED7AA',
};

interface CartContextType {
  items: CartItem[];
  addToCart: (
    item: FoodItem,
    quantity?: number,
    selectedSpiceLevel?: string,
    selectedOptions?: CartOptionSelection[],
    specialNote?: string
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  totalItemCount: number;

  // Menu items management (Admin CRUD)
  menuItems: FoodItem[];
  addMenuItem: (item: Omit<FoodItem, 'id' | 'rating' | 'reviewCount'>) => void;
  updateMenuItem: (id: string, updated: Partial<FoodItem>) => void;
  deleteMenuItem: (id: string) => void;
  resetMenuToDefault: () => void;

  // Brand & Logo customization (Admin)
  brandSettings: BrandSettings;
  updateBrandSettings: (settings: Partial<BrandSettings>) => void;
  resetBrandSettings: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  // Pricing
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  packagingFee: number;
  total: number;
  freeDeliveryThreshold: number;
  amountNeededForFreeDelivery: number;

  // Promos
  appliedPromo: PromoCode | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;

  // Delivery & Customer
  deliveryType: 'delivery' | 'takeaway';
  setDeliveryType: (type: 'delivery' | 'takeaway') => void;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  addressNote: string;
  setCustomerInfo: (info: {
    name?: string;
    phone?: string;
    address?: string;
    note?: string;
  }) => void;

  // Modals & Drawers
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedDetailItem: FoodItem | null;
  openDetailModal: (item: FoodItem) => void;
  closeDetailModal: () => void;

  // Order & Tracking
  currentOrder: Order | null;
  isOrderTrackerOpen: boolean;
  setIsOrderTrackerOpen: (open: boolean) => void;
  createOrder: (paymentMethod: 'qris' | 'bank_transfer' | 'cod') => Order;
  advanceOrderStatus: () => void;
  cancelOrder: () => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;

  // Routing & Authentication for /dapur (Admin Kitchen Portal)
  currentRoute: 'store' | 'dapur';
  navigateTo: (route: 'store' | 'dapur') => void;
  isAdminAuthenticated: boolean;
  adminPassword: string;
  loginAdmin: (password: string) => { success: boolean; message: string };
  logoutAdmin: () => void;
  changeAdminPassword: (oldPwd: string, newPwd: string) => { success: boolean; message: string };

  // Loading screen control
  loadingTrigger: number;
  replayLoadingScreen: () => void;

  // Toast notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
}


const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_DELIVERY_THRESHOLD = 75000;
const STANDARD_DELIVERY_FEE = 12000;
const STANDARD_PACKAGING_FEE = 3000;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Routing State (/dapur or /)
  const getInitialRoute = (): 'store' | 'dapur' => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('/dapur') || hash.includes('/dapur') || hash.includes('#dapur')) {
        return 'dapur';
      }
    }
    return 'store';
  };

  const [currentRoute, setCurrentRoute] = useState<'store' | 'dapur'>(getInitialRoute);

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sahl_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const [adminPassword, setAdminPassword] = useState<string>(() => {
    try {
      return localStorage.getItem('sahl_admin_pwd') || 'sahl123';
    } catch {
      return 'sahl123';
    }
  });

  // Loading Screen Animation State
  const [loadingTrigger, setLoadingTrigger] = useState(1);
  const replayLoadingScreen = () => {
    setLoadingTrigger((prev) => prev + 1);
  };

  // Menu Items State (persisted in localStorage)

  const [menuItems, setMenuItems] = useState<FoodItem[]>(() => {
    try {
      const saved = localStorage.getItem('sahl_custom_menu');
      return saved ? JSON.parse(saved) : MENU_ITEMS;
    } catch {
      return MENU_ITEMS;
    }
  });


  // Brand Settings State (persisted in localStorage)
  const [brandSettings, setBrandSettings] = useState<BrandSettings>(() => {
    try {
      const saved = localStorage.getItem('sahl_brand_settings');
      return saved ? { ...DEFAULT_BRAND_SETTINGS, ...JSON.parse(saved) } : DEFAULT_BRAND_SETTINGS;
    } catch {
      return DEFAULT_BRAND_SETTINGS;
    }
  });

  // Admin Modal
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Load initial cart from localStorage
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('sahl_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });


  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'takeaway'>('delivery');
  const [customerName, setCustomerName] = useState(() => localStorage.getItem('sahl_cust_name') || '');
  const [customerPhone, setCustomerPhone] = useState(() => localStorage.getItem('sahl_cust_phone') || '');
  const [customerAddress, setCustomerAddress] = useState(() => localStorage.getItem('sahl_cust_address') || '');
  const [addressNote, setAddressNote] = useState('');

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedDetailItem, setSelectedDetailItem] = useState<FoodItem | null>(null);

  const [currentOrder, setCurrentOrder] = useState<Order | null>(() => {
    try {
      const saved = localStorage.getItem('sahl_current_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sahl_favorites');
      return saved ? JSON.parse(saved) : ['sahl-01', 'sahl-06'];
    } catch {
      return ['sahl-01', 'sahl-06'];
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sahl_cart', JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items]);

  // Sync custom menu to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sahl_custom_menu', JSON.stringify(menuItems));
    } catch (e) {
      console.error(e);
    }
  }, [menuItems]);

  // Sync brand settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sahl_brand_settings', JSON.stringify(brandSettings));
    } catch (e) {
      console.error(e);
    }
  }, [brandSettings]);

  const addMenuItem = (itemData: Omit<FoodItem, 'id' | 'rating' | 'reviewCount'>) => {
    const newId = `sahl-custom-${Date.now()}`;
    const newItem: FoodItem = {
      ...itemData,
      id: newId,
      rating: 5.0,
      reviewCount: 1,
    };
    setMenuItems((prev) => [newItem, ...prev]);
    showToast(`Menu "${newItem.name}" berhasil ditambahkan!`);
  };

  const updateMenuItem = (id: string, updated: Partial<FoodItem>) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
    showToast(`Menu berhasil diperbarui!`);
  };

  const deleteMenuItem = (id: string) => {
    const itemToDelete = menuItems.find((i) => i.id === id);
    setMenuItems((prev) => prev.filter((i) => i.id !== id));
    showToast(`Menu "${itemToDelete?.name || ''}" telah dihapus.`);
  };

  const resetMenuToDefault = () => {
    setMenuItems(MENU_ITEMS);
    localStorage.removeItem('sahl_custom_menu');
    showToast('Menu berhasil dikembalikan ke standar awal Sahl.');
  };

  const updateBrandSettings = (newSettings: Partial<BrandSettings>) => {
    setBrandSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Logo & identitas Sahl berhasil diperbarui!');
  };

  const resetBrandSettings = () => {
    setBrandSettings(DEFAULT_BRAND_SETTINGS);
    localStorage.removeItem('sahl_brand_settings');
    showToast('Logo & identitas dikembalikan ke bawaan Sahl.');
  };

  // Sync route with browser history (supports /dapur and #/dapur)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('/dapur') || hash.includes('/dapur') || hash.includes('#dapur')) {
        setCurrentRoute('dapur');
      } else {
        setCurrentRoute('store');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateTo = (route: 'store' | 'dapur') => {
    setCurrentRoute(route);
    try {
      if (route === 'dapur') {
        window.history.pushState({ page: 'dapur' }, '', '/Dapur');
      } else {
        window.history.pushState({ page: 'store' }, '', '/');
      }
    } catch {
      window.location.hash = route === 'dapur' ? '#/dapur' : '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loginAdmin = (passwordInput: string): { success: boolean; message: string } => {
    if (passwordInput.trim() === adminPassword) {
      setIsAdminAuthenticated(true);
      try {
        localStorage.setItem('sahl_admin_auth', 'true');
      } catch (e) {
        console.error(e);
      }
      showToast('Login berhasil! Selamat datang di Dapur Sahl.');
      return { success: true, message: 'Login berhasil!' };
    } else {
      return { success: false, message: 'Password salah! Silakan periksa kembali.' };
    }
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem('sahl_admin_auth');
    } catch (e) {
      console.error(e);
    }
    showToast('Anda telah keluar dari sesi Dapur Sahl.');
  };

  const changeAdminPassword = (oldPwd: string, newPwd: string): { success: boolean; message: string } => {
    if (oldPwd !== adminPassword) {
      return { success: false, message: 'Password lama tidak cocok!' };
    }
    if (!newPwd || newPwd.trim().length < 4) {
      return { success: false, message: 'Password baru minimal 4 karakter.' };
    }
    const cleanPwd = newPwd.trim();
    setAdminPassword(cleanPwd);
    try {
      localStorage.setItem('sahl_admin_pwd', cleanPwd);
    } catch (e) {
      console.error(e);
    }
    showToast('Password Dapur berhasil diperbarui!');
    return { success: true, message: 'Password berhasil diperbarui!' };
  };



  // Sync favorites
  useEffect(() => {
    try {
      localStorage.setItem('sahl_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  // Sync current order
  useEffect(() => {
    try {
      if (currentOrder) {
        localStorage.setItem('sahl_current_order', JSON.stringify(currentOrder));
      } else {
        localStorage.removeItem('sahl_current_order');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentOrder]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const openDetailModal = (item: FoodItem) => {
    setSelectedDetailItem(item);
  };

  const closeDetailModal = () => {
    setSelectedDetailItem(null);
  };

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Dihapus dari menu favorit');
        return prev.filter((item) => item !== id);
      } else {
        showToast('Ditambahkan ke menu favorit ❤️');
        return [...prev, id];
      }
    });
  };

  const isFavorite = (itemId: string) => favorites.includes(itemId);

  const setCustomerInfo = ({
    name,
    phone,
    address,
    note,
  }: {
    name?: string;
    phone?: string;
    address?: string;
    note?: string;
  }) => {
    if (name !== undefined) {
      setCustomerName(name);
      localStorage.setItem('sahl_cust_name', name);
    }
    if (phone !== undefined) {
      setCustomerPhone(phone);
      localStorage.setItem('sahl_cust_phone', phone);
    }
    if (address !== undefined) {
      setCustomerAddress(address);
      localStorage.setItem('sahl_cust_address', address);
    }
    if (note !== undefined) {
      setAddressNote(note);
    }
  };

  const addToCart = (
    item: FoodItem,
    quantity: number = 1,
    selectedSpiceLevel?: string,
    selectedOptions: CartOptionSelection[] = [],
    specialNote?: string
  ) => {
    const optionsPrice = selectedOptions.reduce((acc, opt) => acc + opt.price, 0);
    const unitTotalPrice = item.price + optionsPrice;

    // Create a unique key for grouping duplicate items with the same customizations
    const optionsKey = selectedOptions
      .map((o) => o.id)
      .sort()
      .join('-');
    const cartItemId = `${item.id}_${selectedSpiceLevel || 'default'}_${optionsKey}_${specialNote || ''}`;

    setItems((prev) => {
      const existingIdx = prev.findIndex((i) => i.cartItemId === cartItemId);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + quantity,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            item,
            quantity,
            selectedSpiceLevel,
            selectedOptions,
            specialNote,
            unitTotalPrice,
          },
        ];
      }
    });

    showToast(`${quantity}x "${item.name}" berhasil masuk keranjang!`);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity: newQty } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
  };

  const totalItemCount = items.reduce((acc, i) => acc + i.quantity, 0);

  const subtotal = items.reduce(
    (acc, i) => acc + i.unitTotalPrice * i.quantity,
    0
  );

  // Check if promo is still valid with current subtotal
  useEffect(() => {
    if (appliedPromo && subtotal < appliedPromo.minPurchase) {
      setAppliedPromo(null);
      showToast(`Promo ${appliedPromo.code} dibatalkan karena belanja kurang dari minimum`);
    }
  }, [subtotal, appliedPromo]);

  const discountAmount = appliedPromo
    ? appliedPromo.discountType === 'fixed'
      ? appliedPromo.discountValue
      : Math.round((subtotal * appliedPromo.discountValue) / 100)
    : 0;

  const deliveryFee =
    deliveryType === 'takeaway'
      ? 0
      : subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0
      ? 0
      : STANDARD_DELIVERY_FEE;

  const packagingFee = items.length > 0 ? STANDARD_PACKAGING_FEE : 0;

  const total = Math.max(0, subtotal - discountAmount + deliveryFee + packagingFee);

  const amountNeededForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const applyPromo = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const found = PROMO_CODES.find((p) => p.code === cleanCode);

    if (!found) {
      return { success: false, message: 'Kode promo tidak valid atau kadaluarsa.' };
    }

    if (subtotal < found.minPurchase) {
      return {
        success: false,
        message: `Minimal belanja untuk kode ini adalah ${found.minPurchase.toLocaleString('id-ID')} rupiah.`,
      };
    }

    setAppliedPromo(found);
    return {
      success: true,
      message: `Kode ${found.code} berhasil digunakan! Diskon diterapkan.`,
    };
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  const createOrder = (paymentMethod: 'qris' | 'bank_transfer' | 'cod'): Order => {
    const now = new Date();
    const orderNumber = Math.floor(100000 + Math.random() * 900000).toString();

    const newOrder: Order = {
      id: `SHL-${orderNumber}`,
      items: [...items],
      customerName: customerName || 'Pelanggan Setia Sahl',
      customerPhone: customerPhone || '081234567890',
      customerAddress:
        deliveryType === 'delivery'
          ? customerAddress || 'Alamat Belum Diisi'
          : 'Ambil Sendiri di Outlet Sahl Senopati',
      addressNote,
      deliveryType,
      paymentMethod,
      appliedPromo: appliedPromo || undefined,
      discountAmount,
      subtotal,
      deliveryFee,
      packagingFee,
      total,
      status: 'confirmed',
      statusStep: 0,
      createdAt: now.toISOString(),
      estimatedDeliveryTime: '25-35 Menit',
      driverName: 'Rian Pratama',
      driverPhone: '0813-9921-8840',
      driverPlate: 'B 4129 SHL',
    };

    setCurrentOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    setIsOrderTrackerOpen(true);
    showToast(`Pesanan #${newOrder.id} berhasil dibuat! Segera diproses.`);
    return newOrder;
  };

  const advanceOrderStatus = () => {
    if (!currentOrder) return;
    const steps: OrderStatus[] = ['confirmed', 'cooking', 'delivering', 'completed'];
    const currentStep = currentOrder.statusStep;
    if (currentStep < 3) {
      const nextStep = currentStep + 1;
      const updated: Order = {
        ...currentOrder,
        statusStep: nextStep,
        status: steps[nextStep],
      };
      setCurrentOrder(updated);
      const msgs = [
        'Pesanan Diterima oleh Dapur Sahl',
        'Chef Sahl sedang memasak hidangan hangatmu!',
        'Kurir Express sedang meluncur ke alamatmu 🛵',
        'Pesanan telah sampai! Selamat menikmati hidangan Sahl 🎉',
      ];
      showToast(msgs[nextStep]);
    }
  };

  const cancelOrder = () => {
    setCurrentOrder(null);
    setIsOrderTrackerOpen(false);
    showToast('Pesanan telah dibatalkan');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemCount,
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
        resetMenuToDefault,
        brandSettings,
        updateBrandSettings,
        resetBrandSettings,
        isAdminOpen,
        setIsAdminOpen,
        subtotal,
        discountAmount,
        deliveryFee,
        packagingFee,
        total,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
        amountNeededForFreeDelivery,
        appliedPromo,
        applyPromo,
        removePromo,
        deliveryType,
        setDeliveryType,
        customerName,
        customerPhone,
        customerAddress,
        addressNote,
        setCustomerInfo,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedDetailItem,
        openDetailModal,
        closeDetailModal,
        currentOrder,
        isOrderTrackerOpen,
        setIsOrderTrackerOpen,
        createOrder,
        advanceOrderStatus,
        cancelOrder,
        favorites,
        toggleFavorite,
        isFavorite,
        currentRoute,
        navigateTo,
        isAdminAuthenticated,
        adminPassword,
        loginAdmin,
        logoutAdmin,
        changeAdminPassword,
        loadingTrigger,
        replayLoadingScreen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
