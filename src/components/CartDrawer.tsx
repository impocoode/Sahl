import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  Truck,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatRupiah } from '../utils/formatters';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discountAmount,
    deliveryFee,
    packagingFee,
    total,
    appliedPromo,
    applyPromo,
    removePromo,
    freeDeliveryThreshold,
    amountNeededForFreeDelivery,
    deliveryType,
    setDeliveryType,
    setIsCheckoutOpen,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ text: string; error: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (codeToApply?: string) => {
    const code = codeToApply || promoInput;
    if (!code) return;
    const res = applyPromo(code);
    setPromoFeedback({ text: res.message, error: !res.success });
    if (res.success) {
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const percentFreeDelivery = Math.min(
    100,
    Math.round((subtotal / freeDeliveryThreshold) * 100)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col border-l border-[#E5DCD1] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-white border-b border-[#E8DFD4] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#F6ECE6] text-[#9E472A] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-lg font-bold text-[#292019]">
                  Keranjang Makanan
                </h2>
                <p className="text-xs text-[#7A6E63]">
                  {items.length} ragam menu dipilih
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {items.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs text-[#9E472A] hover:underline font-medium px-2 py-1"
                >
                  Kosongkan
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B5E53] hover:bg-[#F2ECE3] transition-colors"
                aria-label="Tutup keranjang"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Delivery Threshold Progress Banner */}
          {deliveryType === 'delivery' && (
            <div className="bg-[#FAF3EA] border-b border-[#EADFD4] px-4 py-3">
              <div className="flex items-center justify-between text-xs mb-1.5 font-medium text-[#4D3F35]">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#9E472A]" />
                  {amountNeededForFreeDelivery > 0
                    ? `Tambah ${formatRupiah(amountNeededForFreeDelivery)} lagi untuk Gratis Ongkir`
                    : '🎉 Selamat! Anda berhak mendapatkan Gratis Ongkir'}
                </span>
                <span className="font-bold text-[#8F3E22]">
                  {percentFreeDelivery}%
                </span>
              </div>
              <div className="w-full bg-[#E5DCD1] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#9E472A] h-full rounded-full transition-all duration-300"
                  style={{ width: `${percentFreeDelivery}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Main Item List or Empty State */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-20 h-20 rounded-full bg-[#F2ECE3] flex items-center justify-center text-[#A69788]">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2E241D]">
                    Keranjangmu Masih Kosong
                  </h3>
                  <p className="text-xs text-[#7A6D61] mt-1 max-w-xs">
                    Pilih aneka hidangan lezat Sahl seperti Nasi Mandhi Kambing, Sate Maranggi atau Roti Maryam.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#9E472A] text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#863B21] transition-all"
                >
                  Mulai Pilih Menu
                </button>
              </div>
            ) : (
              items.map((cartItem) => (
                <div
                  key={cartItem.cartItemId}
                  className="bg-white p-3.5 rounded-2xl border border-[#E9DFD3] shadow-2xs space-y-2.5"
                >
                  <div className="flex gap-3">
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-[#EFE8DC]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-sm font-bold text-[#2A2018] truncate">
                          {cartItem.item.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeFromCart(cartItem.cartItemId)}
                          className="text-[#9E9084] hover:text-[#9E472A] p-0.5"
                          title="Hapus menu ini"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs font-semibold text-[#8F3E22]">
                        {formatRupiah(cartItem.unitTotalPrice)}
                      </p>

                      {/* Customization Details */}
                      {(cartItem.selectedSpiceLevel ||
                        cartItem.selectedOptions.length > 0 ||
                        cartItem.specialNote) && (
                        <div className="text-[11px] text-[#6E6155] space-y-0.5 mt-1 bg-[#FAF6F0] p-1.5 rounded-lg border border-[#EFE8DF]">
                          {cartItem.selectedSpiceLevel && (
                            <p>🌶 Level: {cartItem.selectedSpiceLevel}</p>
                          )}
                          {cartItem.selectedOptions.length > 0 && (
                            <p>
                              + {cartItem.selectedOptions.map((o) => o.name).join(', ')}
                            </p>
                          )}
                          {cartItem.specialNote && (
                            <p className="italic text-[#8C7A6B]">
                              Catatan: "{cartItem.specialNote}"
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Quantity & Item Subtotal */}
                  <div className="flex items-center justify-between pt-1 border-t border-[#F3EDE4]">
                    <div className="flex items-center bg-[#FAF6F0] border border-[#E0D5C7] rounded-lg p-0.5">
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(cartItem.cartItemId, cartItem.quantity - 1)
                        }
                        className="w-6 h-6 rounded flex items-center justify-center text-[#55473B] hover:bg-white transition-colors"
                        aria-label="Kurangi"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-7 text-center font-bold text-xs text-[#2A2018]">
                        {cartItem.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(cartItem.cartItemId, cartItem.quantity + 1)
                        }
                        className="w-6 h-6 rounded flex items-center justify-center text-[#55473B] hover:bg-white transition-colors"
                        aria-label="Tambah"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-bold text-[#2A2018]">
                      {formatRupiah(cartItem.unitTotalPrice * cartItem.quantity)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Calculations & Checkout */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-[#E8DFD4] space-y-3">
              
              {/* Delivery Type Option Selector */}
              <div className="grid grid-cols-2 gap-2 bg-[#F3EDE4] p-1 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setDeliveryType('delivery')}
                  className={`py-1.5 rounded-lg transition-all ${
                    deliveryType === 'delivery'
                      ? 'bg-white text-[#9E472A] shadow-xs'
                      : 'text-[#6E6155]'
                  }`}
                >
                  Antar (Delivery)
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryType('takeaway')}
                  className={`py-1.5 rounded-lg transition-all ${
                    deliveryType === 'takeaway'
                      ? 'bg-white text-[#9E472A] shadow-xs'
                      : 'text-[#6E6155]'
                  }`}
                >
                  Ambil di Resto
                </button>
              </div>

              {/* Promo Code Input or Applied Badge */}
              {appliedPromo ? (
                <div className="flex items-center justify-between bg-[#F1F8F1] border border-emerald-300 text-emerald-800 p-2.5 rounded-xl text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>
                      Voucher <strong>{appliedPromo.code}</strong> aktif (-
                      {formatRupiah(discountAmount)})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removePromo}
                    className="text-emerald-700 hover:text-emerald-950 font-semibold"
                  >
                    Hapus
                  </button>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#998A7C]" />
                      <input
                        type="text"
                        placeholder="Masukkan kode promo (e.g. SAHLHEMAT)"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                        className="w-full text-xs bg-[#FAF7F2] border border-[#D9CFC4] rounded-xl pl-8 pr-3 py-2 text-[#2A2018] uppercase focus:outline-none focus:border-[#9E472A]"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleApplyPromo()}
                      className="bg-[#EDE4D8] hover:bg-[#E2D6C7] text-[#4A3C31] px-3.5 py-2 rounded-xl text-xs font-bold transition-colors"
                    >
                      Terapkan
                    </button>
                  </div>

                  {promoFeedback && (
                    <p
                      className={`text-[11px] flex items-center gap-1 ${
                        promoFeedback.error ? 'text-red-600' : 'text-emerald-600'
                      }`}
                    >
                      {promoFeedback.error ? (
                        <AlertCircle className="w-3 h-3" />
                      ) : (
                        <CheckCircle className="w-3 h-3" />
                      )}
                      {promoFeedback.text}
                    </p>
                  )}
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#5C4F44] pt-1">
                <div className="flex justify-between">
                  <span>Subtotal Menu</span>
                  <span className="font-semibold text-[#292019]">{formatRupiah(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Diskon Promo</span>
                    <span>-{formatRupiah(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Biaya Pengantaran</span>
                  <span>{deliveryFee === 0 ? 'GRATIS' : formatRupiah(deliveryFee)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Biaya Kemasan Higienis</span>
                  <span>{formatRupiah(packagingFee)}</span>
                </div>

                <div className="pt-2 border-t border-[#E8DFD4] flex justify-between items-baseline">
                  <span className="font-serif text-sm font-bold text-[#2A2018]">
                    Total Pembayaran
                  </span>
                  <span className="font-serif text-base font-bold text-[#8F3E22]">
                    {formatRupiah(total)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA Button */}
              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#9E472A] hover:bg-[#863B21] text-white py-3 px-4 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all"
              >
                <span>Lanjut ke Pembayaran</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
