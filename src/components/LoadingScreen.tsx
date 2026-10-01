import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import {
  UtensilsCrossed,
  Flame,
  ChefHat,
  Coffee,
  Crown,
  Sparkles,
} from 'lucide-react';
import { LogoIconType } from '../types/food';

interface LoadingScreenProps {
  onFinish?: () => void;
  replayTrigger?: number; // whenever this increments, replay the animation
}

type AnimationPhase =
  | 'spawn'       // 0 - 500ms: Logo pops into center
  | 'sway'        // 500ms - 1700ms: Mutar sedikit ke kanan & miring bergoyang
  | 'pause'       // 1700ms - 2200ms: Diam di tengah sejenak
  | 'shift-text'  // 2200ms - 3600ms: Logo geser ke kiri, teks SahlFoods & -Ala Rumahan- muncul
  | 'wipe-text'   // 3600ms - 4400ms: Logo menyapu ke kanan menghapus teks
  | 'pop-scale'   // 4400ms - 4900ms: Logo membesar sedikit
  | 'shrink-exit' // 4900ms - 5500ms: Logo mengecil & background hilang
  | 'done';       // Finished, screen removed

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onFinish,
  replayTrigger = 0,
}) => {
  const { brandSettings } = useCart();
  const [phase, setPhase] = useState<AnimationPhase>('spawn');
  const [isVisible, setIsVisible] = useState(true);

  const renderIcon = (iconType: LogoIconType) => {
    switch (iconType) {
      case 'flame':
        return <Flame className="w-9 h-9" />;
      case 'chef':
        return <ChefHat className="w-9 h-9" />;
      case 'coffee':
        return <Coffee className="w-9 h-9" />;
      case 'crown':
        return <Crown className="w-9 h-9" />;
      case 'sparkles':
        return <Sparkles className="w-9 h-9" />;
      case 'utensils':
      default:
        return <UtensilsCrossed className="w-9 h-9" />;
    }
  };

  useEffect(() => {
    setIsVisible(true);
    setPhase('spawn');

    // 1. Muncul di tengah
    const t1 = setTimeout(() => {
      setPhase('sway');
    }, 450);

    // 2. Diam sejenak
    const t2 = setTimeout(() => {
      setPhase('pause');
    }, 1750);

    // 3. Logo bergeser ke kiri dan teks SahlFoods + -Ala Rumahan- muncul
    const t3 = setTimeout(() => {
      setPhase('shift-text');
    }, 2250);

    // 4. Logo menghapus teks tab (menyapu teks)
    const t4 = setTimeout(() => {
      setPhase('wipe-text');
    }, 3750);

    // 5. Logo membesar sedikit
    const t5 = setTimeout(() => {
      setPhase('pop-scale');
    }, 4550);

    // 6. Logo mengecil dan background hilang memperlihatkan website
    const t6 = setTimeout(() => {
      setPhase('shrink-exit');
    }, 5050);

    // 7. Selesai dan unmount
    const t7 = setTimeout(() => {
      setPhase('done');
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 5700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, [replayTrigger, onFinish]);

  if (!isVisible || phase === 'done') {
    return null;
  }

  const handleSkip = () => {
    setPhase('done');
    setIsVisible(false);
    if (onFinish) onFinish();
  };

  const brandTitle = brandSettings.name
    ? `${brandSettings.name}${brandSettings.subtitle || 'Foods'}`
    : 'SahlFoods';

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-all duration-700 select-none ${
        phase === 'shrink-exit'
          ? 'opacity-0 pointer-events-none scale-105'
          : 'opacity-100 bg-[#1E1510]'
      }`}
      style={{
        backgroundImage:
          'radial-gradient(circle at center, #2C1D15 0%, #170F0B 100%)',
      }}
    >
      {/* Background ambient warm sparks/glow */}
      <div className="absolute w-[500px] h-[500px] bg-[#9E472A]/20 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"></div>

      {/* Main Container */}
      <div className="relative flex items-center justify-center min-w-[320px] sm:min-w-[420px] h-48">
        
        {/* LOGO BOX CONTAINER with dynamic keyframe states */}
        <div
          className={`relative z-20 flex items-center justify-center shadow-2xl transition-all ${
            // Phase 1: Spawn & Pop in center
            phase === 'spawn'
              ? 'scale-0 opacity-0 rotate-0 translate-x-0'
              : // Phase 2: Mutar sedikit ke kanan & miring bergoyang (sway)
              phase === 'sway'
              ? 'scale-100 opacity-100 translate-x-0 animate-[sahlSway_1.3s_ease-in-out_infinite]'
              : // Phase 3: Diam di tengah
              phase === 'pause'
              ? 'scale-100 opacity-100 translate-x-0 rotate-0 duration-300'
              : // Phase 4: Geser ke kiri sehingga ada ruang untuk teks SahlFoods
              phase === 'shift-text'
              ? '-translate-x-24 sm:-translate-x-32 scale-100 opacity-100 rotate-0 duration-700 ease-out'
              : // Phase 5: Menyapu ke kanan menghapus teks
              phase === 'wipe-text'
              ? 'translate-x-20 sm:translate-x-24 scale-105 rotate-6 duration-700 ease-in-out'
              : // Phase 6: Membesar sedikit di tengah
              phase === 'pop-scale'
              ? 'translate-x-0 scale-135 rotate-0 duration-400 ease-out shadow-[0_0_50px_rgba(224,122,95,0.6)]'
              : // Phase 7: Mengecil sampai hilang
              phase === 'shrink-exit'
              ? 'translate-x-0 scale-0 rotate-180 opacity-0 duration-600 ease-in'
              : ''
          } w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl shrink-0 overflow-hidden`}
          style={{
            backgroundColor: brandSettings.logoBgColor || '#9E472A',
            color: brandSettings.logoTextColor || '#FED7AA',
            boxShadow:
              phase === 'pop-scale'
                ? '0 0 60px rgba(224, 122, 95, 0.7), 0 20px 30px rgba(0,0,0,0.5)'
                : '0 15px 35px rgba(0, 0, 0, 0.45)',
          }}
        >
          {brandSettings.logoType === 'image' && brandSettings.logoImageUrl ? (
            <img
              src={brandSettings.logoImageUrl}
              alt={brandSettings.name}
              className="w-full h-full object-cover"
            />
          ) : (
            renderIcon(brandSettings.logoIcon)
          )}
        </div>

        {/* TEXT CONTAINER: SahlFoods & -Ala Rumahan- */}
        <div
          className={`absolute left-[54%] sm:left-[53%] flex flex-col justify-center transition-all ${
            // Text is hidden initially
            phase === 'spawn' || phase === 'sway' || phase === 'pause'
              ? 'opacity-0 -translate-x-6 scale-90 pointer-events-none'
              : // Text appears gracefully when logo shifts to left
              phase === 'shift-text'
              ? 'opacity-100 translate-x-0 scale-100 duration-600 ease-out pointer-events-auto'
              : // Text gets erased / wiped out when logo moves over it
              phase === 'wipe-text'
              ? 'opacity-0 scale-95 blur-sm -translate-x-4 duration-500 ease-in pointer-events-none'
              : // Otherwise hidden
                'opacity-0 scale-50 pointer-events-none duration-300'
          }`}
        >
          <div className="overflow-hidden py-1">
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none drop-shadow-md">
              {brandTitle}
            </h1>
          </div>

          <div className="overflow-hidden mt-1">
            <span className="font-serif italic text-amber-300 text-sm sm:text-base font-semibold tracking-wider block drop-shadow-sm">
              -Ala Rumahan-
            </span>
          </div>

          <div className="flex items-center gap-1.5 mt-2">
            <span className="h-0.5 w-6 bg-[#C45B36] rounded-full"></span>
            <span className="text-[10px] uppercase font-bold text-[#C8B8AB] tracking-widest">
              Otentik & Hangat
            </span>
          </div>
        </div>

      </div>

      {/* Skip Button */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute bottom-8 right-8 text-xs font-semibold text-stone-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-xs transition-all tracking-wide"
      >
        Lewati Animasi →
      </button>

      {/* Custom Keyframes in inline style */}
      <style>{`
        @keyframes sahlSway {
          0% {
            transform: rotate(0deg) scale(1);
          }
          20% {
            transform: rotate(15deg) scale(1.05);
          }
          40% {
            transform: rotate(-12deg) scale(1.03);
          }
          60% {
            transform: rotate(8deg) scale(1.02);
          }
          80% {
            transform: rotate(-4deg) scale(1.01);
          }
          100% {
            transform: rotate(0deg) scale(1);
          }
        }
      `}</style>
    </div>
  );
};
