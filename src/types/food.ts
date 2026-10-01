export type CategoryId = 'all' | 'nasi-utama' | 'daging-sate' | 'cemilan' | 'minuman' | 'paket-hemat' | 'dessert';

export interface FoodOption {
  id: string;
  name: string;
  price: number;
}

export interface FoodItem {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  portion: string;
  prepTimeMinutes: number;
  calories?: number;
  isHalal: boolean;
  isBestSeller?: boolean;
  isChefSpecial?: boolean;
  isSpicy?: boolean;
  spiceLevelsAvailable?: boolean;
  availableOptions?: FoodOption[];
}

export interface CartOptionSelection {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  cartItemId: string;
  item: FoodItem;
  quantity: number;
  selectedSpiceLevel?: string;
  selectedOptions: CartOptionSelection[];
  specialNote?: string;
  unitTotalPrice: number;
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase: number;
  description: string;
}

export type OrderStatus = 'confirmed' | 'cooking' | 'delivering' | 'completed';

export interface Order {
  id: string;
  items: CartItem[];
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  addressNote?: string;
  deliveryType: 'delivery' | 'takeaway';
  paymentMethod: 'qris' | 'bank_transfer' | 'cod';
  appliedPromo?: PromoCode;
  discountAmount: number;
  subtotal: number;
  deliveryFee: number;
  packagingFee: number;
  total: number;
  status: OrderStatus;
  statusStep: number; // 0, 1, 2, 3
  createdAt: string;
  estimatedDeliveryTime: string;
  driverName?: string;
  driverPhone?: string;
  driverPlate?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  review: string;
  favoriteDish: string;
  date: string;
}

export type LogoIconType = 'utensils' | 'flame' | 'chef' | 'coffee' | 'crown' | 'sparkles';

export interface BrandSettings {
  name: string;
  subtitle: string;
  slogan: string;
  logoType: 'icon' | 'image';
  logoIcon: LogoIconType;
  logoImageUrl: string;
  logoBgColor: string;
  logoTextColor: string;
}

