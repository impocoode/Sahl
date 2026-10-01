import React from 'react';
import { PhoneCall, Mail, MapPin, ShieldCheck, Heart, Settings } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useCart();

  return (
    <footer className="bg-[#241A14] text-[#D8CDC2] pt-14 pb-8 border-t border-[#3B2C23]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" isLightText={true} />

            <p className="text-xs sm:text-sm text-[#A89A8D] leading-relaxed max-w-sm">
              Sahl menghadirkan kemudahan memesan aneka kuliner Nusantara dan Timur Tengah berkualitas tinggi. Dimasak segar dari bahan murni pilihan dengan cita rasa rempah otentik dan jaminan 100% Halal Thayyib.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-200 font-semibold bg-[#2F2119] p-3 rounded-xl border border-[#443125] max-w-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Sertifikat Halal No. ID3111000289410</span>
            </div>
          </div>

          {/* Quick Menu Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Menu Terpopuler
            </h4>
            <ul className="space-y-2 text-xs text-[#A89A8D]">
              <li><a href="#menu-section" className="hover:text-amber-300 transition-colors">Nasi Mandhi Kambing</a></li>
              <li><a href="#menu-section" className="hover:text-amber-300 transition-colors">Nasi Kebuli Sapi Rempah</a></li>
              <li><a href="#menu-section" className="hover:text-amber-300 transition-colors">Sate Maranggi Sapi Wagyu</a></li>
              <li><a href="#menu-section" className="hover:text-amber-300 transition-colors">Roti Maryam Madu Keju</a></li>
              <li><a href="#menu-section" className="hover:text-amber-300 transition-colors">Es Kopi Susu Gula Aren</a></li>
              <li><a href="#menu-section" className="hover:text-amber-300 transition-colors">Sahl Sultan Platter</a></li>
            </ul>
          </div>

          {/* Jam & Layanan */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Jam Operasional
            </h4>
            <ul className="space-y-2 text-xs text-[#A89A8D]">
              <li>Senin - Jumat: 09:00 - 22:00 WIB</li>
              <li>Sabtu - Minggu: 08:30 - 22:30 WIB</li>
              <li className="pt-2 text-amber-300 font-medium">Pengiriman Kilat:</li>
              <li>Kebayoran, Senopati, SCBD, Cilandak, Kemang, Menteng & sekitarnya</li>
            </ul>
          </div>

          {/* Kontak & CS & Admin */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Layanan & Pengelola
            </h4>
            <div className="space-y-2.5 text-xs text-[#A89A8D]">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp: 0812-3456-7890</span>
              </a>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>halo@sahlfood.id</span>
              </p>
              
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigateTo('dapur')}
                  className="inline-flex items-center gap-1.5 bg-[#3B2C23] hover:bg-[#4A392D] text-amber-300 px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#523F32] transition-colors"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Portal Dapur Sahl (/Dapur)</span>
                </button>
              </div>

            </div>
          </div>

        </div>


        {/* Bottom divider with payment logos & copyright */}
        <div className="pt-8 border-t border-[#3B2C23] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8F8174]">
          <p>© {new Date().getFullYear()} Sahl Food Indonesia. Seluruh hak cipta dilindungi.</p>
          
          <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#A89A8D]">
            <span>Metode Bayar:</span>
            <span className="bg-[#2E2018] px-2 py-0.5 rounded text-stone-300">QRIS</span>
            <span className="bg-[#2E2018] px-2 py-0.5 rounded text-stone-300">BCA</span>
            <span className="bg-[#2E2018] px-2 py-0.5 rounded text-stone-300">Mandiri</span>
            <span className="bg-[#2E2018] px-2 py-0.5 rounded text-stone-300">BSI</span>
            <span className="bg-[#2E2018] px-2 py-0.5 rounded text-stone-300">COD (Tunai)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
