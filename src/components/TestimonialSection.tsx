import React from 'react';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/menuData';

export const TestimonialSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9E472A]">
          <span>Ulasan Pelanggan Setia</span>
          <span aria-hidden="true">·</span>
          <span>4.9 / 5 dari 1.200+ Pesanan</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2A2018] tracking-tight">
          Cerita Kelezatan di Meja Mereka
        </h2>
        <p className="text-xs sm:text-sm text-[#6E6155]">
          Simak apa kata para penikmat kuliner Sahl tentang rasa, porsi, dan kecepatan pengantaran kami.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="bg-white p-6 rounded-3xl border border-[#E8DFD4] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-[11px] text-[#8C7E72]">{t.date}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#4E4137] italic leading-relaxed">
                "{t.review}"
              </p>
            </div>

            <div className="pt-3 border-t border-[#F2ECE3] flex items-center gap-3">
              <img
                src={t.avatar}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#EDE2D5]"
              />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[#2A2018]">
                  {t.name}
                </h4>
                <p className="text-[11px] text-[#7A6D61]">{t.role}</p>
                <p className="text-[10px] text-[#8F3E22] font-semibold mt-0.5">
                  Menu Favorit: {t.favoriteDish}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
