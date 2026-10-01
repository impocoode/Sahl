import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Flame,
  ArrowRight,
  Copy,
  Check,
  Clock,
  Award,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatRupiah } from '../utils/formatters';

interface HeroBannerProps {
  onExploreMenu: () => void;
  onSelectSpecial: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreMenu,
  onSelectSpecial,
}) => {
  const { applyPromo, showToast, brandSettings } = useCart();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopyAndApply = (code: string) => {
    const res = applyPromo(code);
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    showToast(res.message);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F5EEE4] to-[#FAF7F2] border-b border-[#EADFD4]">
      {/* Decorative background subtle glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E07A5F]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#E9C46A]/15 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quiet text kicker / brand motto (anti-slop, no pill badges) */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9E472A]">
              <span>Kuliner Otentik</span>
              <span aria-hidden="true">·</span>
              <span>Rempah Pilihan</span>
              <span aria-hidden="true">·</span>
              <span>100% Halal Thayyib</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#261E17] leading-[1.15]">
                Kelezatan Istimewa, Dipesan Dengan{' '}
                <span className="italic text-[#9E472A] relative inline-block">
                  {brandSettings.name || 'Sahl'}.
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full text-[#DEBEB2] h-2"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0,8 Q50,0 100,8"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    />
                  </svg>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#5E5246] max-w-xl leading-relaxed">
                Nikmati perpaduan harum Nasi Basmati Mandhi Yaman, Sate Wagyu Maranggi lumer,
                dan cemilan manis legit buatan tangan. Diolah segar dari bahan premium setiap hari
                dan diantar masih mengepul hangat ke meja Anda.
              </p>
            </div>

            {/* CTAs & Promo Code Ribbon */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onExploreMenu}
                className="inline-flex items-center gap-2 bg-[#9E472A] hover:bg-[#863B21] text-white px-6 py-3.5 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all"
              >
                <span>Lihat Semua Menu</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onSelectSpecial}
                className="inline-flex items-center gap-2 bg-white hover:bg-[#F2ECE3] text-[#2D231B] border border-[#D9CFC4] px-5 py-3.5 rounded-xl font-medium text-sm transition-all"
              >
                <Flame className="w-4 h-4 text-amber-600" />
                <span>Menu Signature Chef</span>
              </button>
            </div>

            {/* Interactive Coupon Box */}
            <div className="pt-2">
              <div className="inline-flex flex-col sm:flex-row sm:items-center gap-3 bg-white p-3.5 rounded-2xl border border-[#E3D7CA] shadow-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#F8EFEA] text-[#9E472A] flex items-center justify-center font-bold text-xs">
                    %
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#2D231B]">
                      Voucher Pelanggan Baru: Potongan Rp 15.000
                    </p>
                    <p className="text-[11px] text-[#7A6E63]">
                      Gunakan kode saat checkout atau klik pasang otomatis
                    </p>
                  </div>
                </div>
                
                <button
                  type="button"
                  onClick={() => handleCopyAndApply('SAHLHEMAT')}
                  className="sm:ml-auto inline-flex items-center gap-1.5 bg-[#FAF4ED] hover:bg-[#F3E7D9] text-[#9E472A] border border-[#DEBEB2] px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-colors"
                >
                  {copiedCode === 'SAHLHEMAT' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Terpasang!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>SAHLHEMAT</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quality Badges */}
            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#E8DDD1]">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#9E472A] shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-[#2D231B]">25-35 Menit</h4>
                  <p className="text-[11px] text-[#7A6E63]">Estimasi kirim hangat</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-[#2D231B]">100% Halal</h4>
                  <p className="text-[11px] text-[#7A6E63]">Bahan murni thayyib</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold text-[#2D231B]">Rating 4.9/5</h4>
                  <p className="text-[11px] text-[#7A6E63]">Ribuan porsi terjual</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Gourmet Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-[1/1] bg-[#EDE4D8]">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85"
                  alt="Nasi Mandhi Kambing Oven Sahl"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Overlay Text Details */}
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white space-y-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
                    <span>Menu Paling Favorit Pekan Ini</span>
                    <span aria-hidden="true">·</span>
                    <span>⭐ 4.9 (340+ Ulasan)</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
                    Nasi Mandhi Kambing Oven Sahl
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-200 line-clamp-2">
                    Daging paha kambing muda super empuk lepas tulang berpadu basmati rempah kuning khas Yaman.
                  </p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <span className="text-xs text-stone-300 block">Mulai dari</span>
                      <span className="text-lg font-bold text-amber-300">
                        {formatRupiah(68000)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={onSelectSpecial}
                      className="bg-white/95 hover:bg-white text-[#2B2017] px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md"
                    >
                      Pesan Sekarang
                    </button>
                  </div>
                </div>
              </div>

              {/* Floating Review Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-[#EDE0D4] max-w-[210px] hidden sm:block">
                <div className="flex items-center gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Customer"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-amber-400"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#2D231B] leading-tight">
                      Farhan Alatas
                    </p>
                    <p className="text-[10px] text-amber-600 font-semibold">
                      ⭐⭐⭐⭐⭐ "Kambing terlembut!"
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Hot Delivery Reassurance */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-[#EDE0D4] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F6ECE6] text-[#9E472A] flex items-center justify-center">
                  <Flame className="w-5 h-5 text-[#9E472A]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#2D231B]">Kemasan Thermal Safe</p>
                  <p className="text-[11px] text-[#7A6E63]">Sampai dalam keadaan hangat</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
