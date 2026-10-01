import React from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  ChefHat,
  Truck,
  MapPin,
  Phone,
  MessageCircle,
  ShoppingBag,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatIndoDateTime, formatRupiah } from '../utils/formatters';

export const OrderTrackerModal: React.FC = () => {
  const {
    currentOrder,
    isOrderTrackerOpen,
    setIsOrderTrackerOpen,
    advanceOrderStatus,
    cancelOrder,
  } = useCart();

  if (!isOrderTrackerOpen || !currentOrder) return null;

  const steps = [
    {
      title: 'Pesanan Diterima',
      desc: 'Dapur Sahl telah menerima dan memverifikasi pesananmu.',
      icon: CheckCircle2,
    },
    {
      title: 'Sedang Dimasak Chef',
      desc: 'Bahan segar sedang diracik dan dimasak hangat sesuai pesanan.',
      icon: ChefHat,
    },
    {
      title: 'Dalam Pengantaran',
      desc: 'Kurir Sahl Express sedang meluncur ke alamat tujuan.',
      icon: Truck,
    },
    {
      title: 'Pesanan Selesai',
      desc: 'Makanan telah tiba. Selamat menikmati hidangan Sahl!',
      icon: Sparkles,
    },
  ];

  const currentStep = currentOrder.statusStep;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#EDE2D5] my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#FAF7F2] border-b border-[#E8DFD4] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#9E472A] text-white flex items-center justify-center shadow-xs">
              <Clock className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg font-bold text-[#271E18]">
                  Pelacak Pesanan
                </h2>
                <span className="font-mono text-xs font-semibold text-[#8F3E22] bg-[#FAF1EC] px-2 py-0.5 rounded-md border border-[#EACEC3]">
                  #{currentOrder.id}
                </span>
              </div>
              <p className="text-xs text-[#7A6D61]">
                Dibuat: {formatIndoDateTime(currentOrder.createdAt)}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOrderTrackerOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B5D52] hover:bg-[#EFE8DF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[72vh] overflow-y-auto">
          
          {/* Estimated Time Card */}
          <div className="bg-gradient-to-br from-[#FAF3EA] to-[#F5EAD9] p-4 rounded-2xl border border-[#E5D7C5] flex items-center justify-between">
            <div>
              <span className="text-xs text-[#706050] font-medium block">
                Estimasi Pengantaran:
              </span>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#2A2018]">
                {currentStep === 3 ? 'Telah Tiba 🎉' : '20 - 30 Menit'}
              </span>
            </div>

            <div className="text-right">
              <span className="text-xs text-[#706050] block">Metode:</span>
              <span className="text-xs font-bold text-[#8F3E22] uppercase">
                {currentOrder.paymentMethod === 'qris'
                  ? 'QRIS Digital'
                  : currentOrder.paymentMethod === 'bank_transfer'
                  ? 'Transfer Bank'
                  : 'Tunai COD'}
              </span>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#2A2018]">
              Status Proses Langsung
            </h3>

            <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E8DFD4]">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isPassed = idx < currentStep;
                const isCurrent = idx === currentStep;
                const isPending = idx > currentStep;

                return (
                  <div key={step.title} className="relative flex items-start gap-3">
                    <div
                      className={`absolute -left-6 top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all ${
                        isPassed
                          ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                          : isCurrent
                          ? 'bg-[#9E472A] text-white ring-4 ring-[#F6ECE6] animate-pulse'
                          : 'bg-[#EDE4D8] text-[#8C7D71]'
                      }`}
                    >
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Icon className="w-3.5 h-3.5" />
                      )}
                    </div>

                    <div className="pl-3">
                      <h4
                        className={`text-xs sm:text-sm font-bold ${
                          isCurrent
                            ? 'text-[#9E472A]'
                            : isPassed
                            ? 'text-emerald-800'
                            : 'text-[#8C7D71]'
                        }`}
                      >
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#6B5E52] mt-0.5 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Driver Info Card (when delivering or done) */}
          {currentStep >= 2 && currentOrder.deliveryType === 'delivery' && (
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DFD4] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#EAE0D3] text-[#7A6A5C] flex items-center justify-center font-bold text-sm">
                  RP
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2A2018]">
                    {currentOrder.driverName}
                  </h4>
                  <p className="text-[11px] text-[#7A6D61]">
                    Kurir Sahl Express · {currentOrder.driverPlate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${currentOrder.driverPhone}`}
                  className="p-2 rounded-xl bg-white border border-[#D9CFC4] text-[#4A3D32] hover:text-[#9E472A] transition-colors"
                  title="Telepon Kurir"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/6281399218840?text=Halo%20Mas%20${currentOrder.driverName},%20saya%20pemesan%20Sahl%20#${currentOrder.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-colors"
                  title="WhatsApp Kurir"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* Delivery Destination Address */}
          <div className="text-xs text-[#524439] bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E8DFD4] space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-[#2A2018]">
              <MapPin className="w-3.5 h-3.5 text-[#9E472A]" />
              Tujuan Pengantaran:
            </span>
            <p className="pl-5 text-[#6B5E52] leading-relaxed">
              {currentOrder.customerAddress}
            </p>
            {currentOrder.addressNote && (
              <p className="pl-5 italic text-[11px] text-[#8C7A6B]">
                Patokan: "{currentOrder.addressNote}"
              </p>
            )}
          </div>

          {/* Items Summary in this Order */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2A2018]">
              Menu Yang Dipesan ({currentOrder.items.length})
            </h4>
            <div className="divide-y divide-[#EFE7DE] border border-[#E8DFD4] rounded-2xl bg-white overflow-hidden">
              {currentOrder.items.map((cartItem) => (
                <div
                  key={cartItem.cartItemId}
                  className="p-3 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="min-w-0">
                    <p className="font-bold text-[#2A2018] truncate">
                      {cartItem.quantity}x {cartItem.item.name}
                    </p>
                    {cartItem.selectedSpiceLevel && (
                      <p className="text-[11px] text-[#8C7D71]">
                        Level: {cartItem.selectedSpiceLevel}
                      </p>
                    )}
                    {cartItem.selectedOptions.length > 0 && (
                      <p className="text-[11px] text-[#8C7D71]">
                        + {cartItem.selectedOptions.map((o) => o.name).join(', ')}
                      </p>
                    )}
                  </div>
                  <span className="font-semibold text-[#8F3E22] shrink-0">
                    {formatRupiah(cartItem.unitTotalPrice * cartItem.quantity)}
                  </span>
                </div>
              ))}
              <div className="p-3 bg-[#FAF7F2] flex items-center justify-between font-bold text-xs">
                <span>Total Bayar ({currentOrder.paymentMethod.toUpperCase()})</span>
                <span className="text-[#8F3E22] text-sm">
                  {formatRupiah(currentOrder.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Simulation Helper Button */}
          <div className="p-3 bg-[#F4EFEB] rounded-2xl border border-[#DFD3C4] text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[#6E6053]">
                🛠 Kontrol Simulasi Status (Demo)
              </span>
              {currentStep < 3 && (
                <button
                  type="button"
                  onClick={advanceOrderStatus}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#9E472A] hover:underline"
                >
                  <span>Lanjut ke Status Berikutnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <p className="text-[10px] text-[#8C7D71]">
              Klik tombol di atas untuk menyimulasikan perkembangan status pesanan dari dimasak hingga selesai diantar.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-[#FAF7F2] border-t border-[#E8DFD4] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={cancelOrder}
            className="text-xs font-semibold text-[#8C7D71] hover:text-red-700 transition-colors"
          >
            Tutup & Bikin Pesanan Baru
          </button>

          <button
            type="button"
            onClick={() => setIsOrderTrackerOpen(false)}
            className="bg-[#9E472A] hover:bg-[#863B21] text-white px-5 py-2.5 rounded-xl font-semibold text-xs shadow-md transition-all"
          >
            Kembali ke Beranda Sahl
          </button>
        </div>

      </div>
    </div>
  );
};
