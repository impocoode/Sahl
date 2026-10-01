import { CartItem, Order } from '../types/food';

/**
 * Format number to Indonesian Rupiah (Rp XX.XXX)
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format date string to Indonesian readable date
 */
export function formatIndoDateTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date) + ' WIB';
  } catch {
    return isoString;
  }
}

/**
 * Build WhatsApp order text URL
 */
export function buildWhatsAppOrderUrl(order: Order, whatsappNumber: string = '6281234567890'): string {
  const itemList = order.items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.item.name}* x${item.quantity} (${formatRupiah(item.unitTotalPrice * item.quantity)})` +
        (item.selectedSpiceLevel ? `\n   🌶 Level: ${item.selectedSpiceLevel}` : '') +
        (item.selectedOptions.length > 0
          ? `\n   ➕ Topping: ${item.selectedOptions.map((o) => o.name).join(', ')}`
          : '') +
        (item.specialNote ? `\n   📝 Catatan: "${item.specialNote}"` : '')
    )
    .join('\n\n');

  const text = `Halo Sahl Food! 👋 Saya ingin konfirmasi pesanan dari website:

*No. Pesanan:* #${order.id}
*Tipe:* ${order.deliveryType === 'delivery' ? '🛵 Pengantaran (Delivery)' : '🛍 Ambil Sendiri (Takeaway)'}
*Waktu Pemesanan:* ${formatIndoDateTime(order.createdAt)}

*Data Pemesan:*
👤 Nama: ${order.customerName}
📱 No. Telp/WA: ${order.customerPhone}
📍 Alamat: ${order.customerAddress || 'Ambil di Toko Sahl'}
${order.addressNote ? `📌 Patokan: ${order.addressNote}\n` : ''}
*Rincian Menu:*
${itemList}

------------------------
*Subtotal:* ${formatRupiah(order.subtotal)}
*Ongkos Kirim:* ${formatRupiah(order.deliveryFee)}
*Biaya Kemasan Higienis:* ${formatRupiah(order.packagingFee)}
${order.discountAmount > 0 ? `*Diskon Promo (${order.appliedPromo?.code}):* -${formatRupiah(order.discountAmount)}\n` : ''}*TOTAL BAYAR:* ${formatRupiah(order.total)}
*Metode Pembayaran:* ${
    order.paymentMethod === 'qris'
      ? 'QRIS (E-Wallet)'
      : order.paymentMethod === 'bank_transfer'
      ? 'Transfer Bank'
      : 'Bayar di Tempat (COD)'
  }

Mohon diproses ya min, terima kasih banyak! 🙏`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}
