import React, { useState } from 'react';
import {
  X,
  MapPin,
  Phone,
  User,
  CreditCard,
  QrCode,
  Banknote,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Building2,
  MessageCircle,
  Copy,
  Check,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { buildWhatsAppOrderUrl, formatRupiah } from '../utils/formatters';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    items,
    subtotal,
    discountAmount,
    deliveryFee,
    packagingFee,
    total,
    appliedPromo,
    deliveryType,
    customerName,
    customerPhone,
    customerAddress,
    addressNote,
    setCustomerInfo,
    createOrder,
    showToast,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<'qris' | 'bank_transfer' | 'cod'>('qris');
  const [selectedBank, setSelectedBank] = useState<'bca' | 'mandiri' | 'bsi'>('bca');
  const [copiedVA, setCopiedVA] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [name, setName] = useState(customerName || '');
  const [phone, setPhone] = useState(customerPhone || '');
  const [address, setAddress] = useState(customerAddress || '');
  const [note, setNote] = useState(addressNote || '');
  const [formError, setFormError] = useState<string | null>(null);

  if (!isCheckoutOpen) return null;

  const vaNumbers = {
    bca: '8801 2345 6789 001',
    mandiri: '8910 9876 5432 002',
    bsi: '7722 4567 8901 003',
  };

  const handleCopyVA = () => {
    navigator.clipboard?.writeText(vaNumbers[selectedBank].replace(/\s/g, ''));
    setCopiedVA(true);
    showToast('Nomor Virtual Account disalin!');
    setTimeout(() => setCopiedVA(false), 2000);
  };

  const validateForm = () => {
    if (!name.trim()) {
      setFormError('Silakan masukkan nama pemesan.');
      return false;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setFormError('Silakan masukkan nomor telepon / WhatsApp yang valid.');
      return false;
    }
    if (deliveryType === 'delivery' && (!address.trim() || address.trim().length < 10)) {
      setFormError('Silakan isi alamat pengantaran lengkap dengan nomor rumah/jalan.');
      return false;
    }
    setFormError(null);
    return true;
  };

  const handleFinishOrder = (channel: 'web' | 'whatsapp') => {
    if (!validateForm()) return;

    // Save info
    setCustomerInfo({
      name,
      phone,
      address,
      note,
    });

    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder(paymentMethod);
      setIsSubmitting(false);

      if (channel === 'whatsapp') {
        const waUrl = buildWhatsAppOrderUrl(order);
        window.open(waUrl, '_blank');
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#EDE2D5] my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#FAF7F2] border-b border-[#E8DFD4] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#9E472A] text-white flex items-center justify-center shadow-xs">
              <Truck className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#271E18]">
                Konfirmasi Pesanan
              </h2>
              <p className="text-xs text-[#7A6D61]">
                {deliveryType === 'delivery' ? 'Pengantaran Kilat ke Alamat' : 'Ambil Sendiri di Outlet Sahl'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCheckoutOpen(false)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#6B5D52] hover:bg-[#EFE8DF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[72vh] overflow-y-auto">
          
          {/* Error Banner */}
          {formError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <span>⚠️</span>
              <span>{formError}</span>
            </div>
          )}

          {/* Section 1: Customer Info */}
          <div className="space-y-3.5">
            <h3 className="font-serif text-sm font-bold text-[#2A2018] flex items-center gap-2">
              <User className="w-4 h-4 text-[#9E472A]" />
              Data Pemesan
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#54463C] mb-1">
                  Nama Lengkap *
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8B7D]" />
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ahmad Fauzan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl pl-9 pr-3 py-2.5 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#54463C] mb-1">
                  Nomor WhatsApp / HP *
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8B7D]" />
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl pl-9 pr-3 py-2.5 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Address input (if Delivery) */}
            {deliveryType === 'delivery' ? (
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-[#54463C] mb-1">
                    Alamat Pengantaran Lengkap *
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 absolute left-3 top-3 text-[#9A8B7D]" />
                    <textarea
                      rows={2}
                      required
                      placeholder="Jalan, No. Rumah, RT/RW, Kelurahan, Kecamatan, Kota"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full text-xs sm:text-sm bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl pl-9 pr-3 py-2 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#54463C] mb-1">
                    Patokan / Catatan Alamat (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Pagar hitam seberang masjid, titip di satpam"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-[#FAF7F2] border border-[#DDD3C7] rounded-xl px-3 py-2 text-[#2A2018] focus:bg-white focus:border-[#9E472A] focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-[#FAF3EA] p-3 rounded-xl border border-[#E8DEC7] text-xs text-[#524439] space-y-1">
                <p className="font-semibold">📍 Lokasi Pengambilan:</p>
                <p>Outlet Utama Sahl: Jl. Senopati Raya No. 42, Kebayoran Baru, Jakarta Selatan</p>
                <p className="text-[11px] text-[#7A6D61]">Pesanan akan siap dalam waktu 15-20 menit setelah konfirmasi.</p>
              </div>
            )}
          </div>

          {/* Section 2: Payment Method */}
          <div className="space-y-3.5 pt-3 border-t border-[#EDE2D5]">
            <h3 className="font-serif text-sm font-bold text-[#2A2018] flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#9E472A]" />
              Metode Pembayaran
            </h3>

            {/* Segmented Payment Tabs */}
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('qris')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'qris'
                    ? 'border-[#9E472A] bg-[#FAF1EC] text-[#9E472A] ring-1 ring-[#9E472A]'
                    : 'border-[#E4D9CC] bg-white text-[#524439] hover:bg-[#FAF7F2]'
                }`}
              >
                <QrCode className="w-5 h-5" />
                <span className="text-xs font-bold">QRIS Instant</span>
                <span className="text-[10px] text-[#857567]">GoPay, OVO, BCA</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('bank_transfer')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'bank_transfer'
                    ? 'border-[#9E472A] bg-[#FAF1EC] text-[#9E472A] ring-1 ring-[#9E472A]'
                    : 'border-[#E4D9CC] bg-white text-[#524439] hover:bg-[#FAF7F2]'
                }`}
              >
                <Building2 className="w-5 h-5" />
                <span className="text-xs font-bold">Transfer Bank</span>
                <span className="text-[10px] text-[#857567]">BCA, BSI, Mandiri</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                  paymentMethod === 'cod'
                    ? 'border-[#9E472A] bg-[#FAF1EC] text-[#9E472A] ring-1 ring-[#9E472A]'
                    : 'border-[#E4D9CC] bg-white text-[#524439] hover:bg-[#FAF7F2]'
                }`}
              >
                <Banknote className="w-5 h-5" />
                <span className="text-xs font-bold">Bayar Tunai</span>
                <span className="text-[10px] text-[#857567]">COD saat sampai</span>
              </button>
            </div>

            {/* Payment Method Details */}
            {paymentMethod === 'qris' && (
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DFD4] flex flex-col sm:flex-row items-center gap-4">
                {/* Simulated QR Code Graphic */}
                <div className="w-32 h-32 bg-white p-2 rounded-xl border border-[#D9CFC4] shadow-2xs shrink-0 flex flex-col items-center justify-center relative">
                  <div className="w-full h-full bg-stone-900 rounded flex items-center justify-center p-1 text-white text-[8px] font-mono leading-none tracking-tighter text-center select-none overflow-hidden">
                    <div className="grid grid-cols-5 gap-0.5 w-full h-full opacity-90 p-1">
                      {Array.from({ length: 25 }).map((_, i) => (
                        <div
                          key={i}
                          className={`${
                            i % 2 === 0 || i % 7 === 0 || i === 0 || i === 4 || i === 20 || i === 24
                              ? 'bg-black'
                              : 'bg-white'
                          } rounded-xs`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-[#9E472A] mt-1 uppercase">
                    QRIS SAHL
                  </span>
                </div>

                <div className="text-xs text-[#524439] space-y-1.5 text-center sm:text-left">
                  <p className="font-bold text-[#2A2018]">
                    Scan QRIS melalui aplikasi e-wallet apa saja:
                  </p>
                  <p className="text-[11px] text-[#786C5F]">
                    GoPay, OVO, ShopeePay, Dana, LinkAja, BCA Mobile, Livin Mandiri, atau m-Banking lain.
                  </p>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verifikasi Otomatis & Bebas Biaya Admin</span>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'bank_transfer' && (
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DFD4] space-y-3">
                <div className="flex gap-2">
                  {(['bca', 'mandiri', 'bsi'] as const).map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setSelectedBank(b)}
                      className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold uppercase transition-all ${
                        selectedBank === b
                          ? 'bg-[#9E472A] text-white shadow-xs'
                          : 'bg-white border border-[#D9CFC4] text-[#4A3D32]'
                      }`}
                    >
                      Bank {b}
                    </button>
                  ))}
                </div>

                <div className="bg-white p-3 rounded-xl border border-[#E0D5C7] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#7A6C5F] block uppercase">
                      Nomor Virtual Account {selectedBank.toUpperCase()}
                    </span>
                    <span className="font-mono font-bold text-sm text-[#2A2018]">
                      {vaNumbers[selectedBank]}
                    </span>
                    <span className="text-[10px] text-[#8C7B6D] block">
                      a.n. SAHL FOOD OFFICIAL
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyVA}
                    className="flex items-center gap-1 bg-[#FAF4ED] hover:bg-[#F3E7D9] text-[#9E472A] px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors"
                  >
                    {copiedVA ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Disalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="bg-[#FAF5EE] p-3.5 rounded-2xl border border-[#E8DEC7] text-xs text-[#524439] space-y-1">
                <p className="font-bold text-[#2A2018]">💵 Bayar Tunai di Tempat (COD)</p>
                <p className="text-[11px] text-[#706254]">
                  Siapkan uang pas sebesar <strong>{formatRupiah(total)}</strong> untuk diserahkan ke kurir Sahl Express saat makanan diantar.
                </p>
              </div>
            )}
          </div>

          {/* Section 3: Order Summary Table */}
          <div className="space-y-2 pt-3 border-t border-[#EDE2D5]">
            <h3 className="font-serif text-sm font-bold text-[#2A2018]">
              Ringkasan Pembayaran
            </h3>

            <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E8DFD4] space-y-1.5 text-xs text-[#5C4F44]">
              <div className="flex justify-between">
                <span>Subtotal ({items.length} macam menu)</span>
                <span className="font-medium text-[#2A2018]">{formatRupiah(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Diskon Voucher ({appliedPromo?.code})</span>
                  <span>-{formatRupiah(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Ongkos Kirim</span>
                <span>{deliveryFee === 0 ? 'GRATIS' : formatRupiah(deliveryFee)}</span>
              </div>
              <div className="flex justify-between">
                <span>Kemasan Thermal & Eco-Box</span>
                <span>{formatRupiah(packagingFee)}</span>
              </div>
              <div className="pt-2 border-t border-[#E8DFD4] flex justify-between items-baseline">
                <span className="font-serif text-sm font-bold text-[#2A2018]">
                  Total Tagihan
                </span>
                <span className="font-serif text-lg font-bold text-[#8F3E22]">
                  {formatRupiah(total)}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 bg-[#FAF7F2] border-t border-[#E8DFD4] flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleFinishOrder('whatsapp')}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Pesan via WhatsApp Langsung</span>
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleFinishOrder('web')}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#9E472A] hover:bg-[#863B21] text-white py-3 px-4 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isSubmitting ? 'Memproses...' : 'Konfirmasi Pesanan Web'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
