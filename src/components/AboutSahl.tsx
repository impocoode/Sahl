import React from 'react';
import { ShieldCheck, HeartHandshake, Sparkles, Truck, MapPin, Clock, Phone } from 'lucide-react';
import { SAHL_OUTLETS } from '../data/menuData';

export const AboutSahl: React.FC = () => {
  return (
    <section className="bg-[#F3ECE1] border-y border-[#E4D9CC] py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Story Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9E472A]">
              <span>Filosofi Kami</span>
              <span aria-hidden="true">·</span>
              <span>Sahl (سَهْل) = Mudah & Mengalir</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#271E17] leading-tight">
              Menghadirkan Kehangatan Santapan Istimewa Tanpa Repot
            </h2>

            <p className="text-sm text-[#5C4F44] leading-relaxed">
              Nama <strong>Sahl</strong> terinspirasi dari kata bermakna <em>"kemudahan dan kelancaran"</em>. Kami percaya bahwa menikmati makanan lezat berkualitas tinggi—seperti Nasi Mandhi Yaman beraroma harum, olahan sate wagyu lumer, dan kudapan manis legit—tidak harus rumit atau menunggu momen khusus.
            </p>

            <p className="text-sm text-[#5C4F44] leading-relaxed">
              Setiap menu diracik dari bahan baku segar tanpa kompromi, bumbu rempah pilihan hasil sangrai tradisional, dan dimasak secara higienis dengan jaminan 100% Halal Thayyib.
            </p>

            {/* 4 Feature Columns */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#9E472A] flex items-center justify-center shrink-0 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2A2018]">100% Halal Thayyib</h4>
                  <p className="text-[11px] text-[#786C5F]">Daging potong resmi tersertifikasi</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#9E472A] flex items-center justify-center shrink-0 shadow-2xs">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2A2018]">Rempah Alami</h4>
                  <p className="text-[11px] text-[#786C5F]">Tanpa pengawet sintetis</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#9E472A] flex items-center justify-center shrink-0 shadow-2xs">
                  <HeartHandshake className="w-4 h-4 text-[#9E472A]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2A2018]">Dimasak Fresh</h4>
                  <p className="text-[11px] text-[#786C5F]">Selalu hangat saat disajikan</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] text-[#9E472A] flex items-center justify-center shrink-0 shadow-2xs">
                  <Truck className="w-4 h-4 text-[#9E472A]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2A2018]">Kurir Khusus Makanan</h4>
                  <p className="text-[11px] text-[#786C5F]">Kemasan thermal safe box</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-3 sm:space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80"
                  alt="Daging Panggang Sahl"
                  className="rounded-2xl object-cover aspect-[4/5] shadow-md border-2 border-white"
                />
                <img
                  src="https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80"
                  alt="Minuman Sahl"
                  className="rounded-2xl object-cover aspect-[4/3] shadow-md border-2 border-white"
                />
              </div>

              <div className="space-y-3 sm:space-y-4 pt-6">
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
                  alt="Nasi Kebuli Sahl"
                  className="rounded-2xl object-cover aspect-[4/3] shadow-md border-2 border-white"
                />
                <img
                  src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80"
                  alt="Roti Maryam Sahl"
                  className="rounded-2xl object-cover aspect-[4/5] shadow-md border-2 border-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Outlet Locations */}
        <div className="space-y-6 pt-4 border-t border-[#E0D5C7]">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="font-serif text-2xl font-bold text-[#2A2018]">
              Cabang Outlet Sahl
            </h3>
            <p className="text-xs text-[#706255]">
              Kunjungi langsung atau pesan online untuk pengantaran kilat ke rumah & kantor Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SAHL_OUTLETS.map((outlet) => (
              <div
                key={outlet.city}
                className="bg-white p-5 rounded-2xl border border-[#E3D8CC] shadow-2xs space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base font-bold text-[#2A2018]">
                    {outlet.city}
                  </h4>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    Buka Hari Ini
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-[#615448]">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#9E472A] shrink-0 mt-0.5" />
                    <span>{outlet.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#7A6C5F] shrink-0" />
                    <span>{outlet.hours}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#7A6C5F] shrink-0" />
                    <span>{outlet.phone}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
