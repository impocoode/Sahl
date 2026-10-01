import React from 'react';
import {
  UtensilsCrossed,
  Flame,
  ChefHat,
  Coffee,
  Crown,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { LogoIconType } from '../types/food';

interface BrandLogoProps {
  showSlogan?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  isLightText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  showSlogan = true,
  size = 'md',
  className = '',
  isLightText = false,
}) => {
  const { brandSettings } = useCart();

  const renderIcon = (iconType: LogoIconType) => {
    switch (iconType) {
      case 'flame':
        return <Flame className="w-5 h-5" />;
      case 'chef':
        return <ChefHat className="w-5 h-5" />;
      case 'coffee':
        return <Coffee className="w-5 h-5" />;
      case 'crown':
        return <Crown className="w-5 h-5" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'utensils':
      default:
        return <UtensilsCrossed className="w-5 h-5" />;
    }
  };

  const containerSizes = {
    sm: 'w-8 h-8 rounded-lg text-xs',
    md: 'w-10 h-10 rounded-xl text-sm',
    lg: 'w-14 h-14 rounded-2xl text-base',
  };

  const nameSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl sm:text-4xl',
  };

  return (
    <div className={`flex items-center gap-2.5 group ${className}`}>
      {/* Logo Graphic or Custom Image */}
      <div
        className={`${containerSizes[size]} flex items-center justify-center shadow-sm overflow-hidden shrink-0 transition-transform group-hover:scale-105`}
        style={{
          backgroundColor: brandSettings.logoBgColor || '#9E472A',
          color: brandSettings.logoTextColor || '#FED7AA',
        }}
      >
        {brandSettings.logoType === 'image' && brandSettings.logoImageUrl ? (
          <img
            src={brandSettings.logoImageUrl}
            alt={brandSettings.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to icon if image fails to load
              e.currentTarget.style.display = 'none';
            }}
          />
        ) : (
          renderIcon(brandSettings.logoIcon)
        )}
      </div>

      {/* Brand Text & Slogan */}
      <div>
        <div className="flex items-baseline gap-1.5 leading-none">
          <span
            className={`font-serif font-bold tracking-tight ${nameSizes[size]} ${
              isLightText ? 'text-white' : 'text-[#2B2118]'
            }`}
          >
            {brandSettings.name || 'Sahl'}
          </span>
          {brandSettings.subtitle && (
            <span
              className="text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: brandSettings.logoBgColor || '#B45309' }}
            >
              {brandSettings.subtitle}
            </span>
          )}
        </div>
        {showSlogan && brandSettings.slogan && (
          <p
            className={`text-[11px] mt-0.5 leading-tight hidden sm:block ${
              isLightText ? 'text-[#D3C7BC]' : 'text-[#786C5E]'
            }`}
          >
            {brandSettings.slogan}
          </p>
        )}
      </div>
    </div>
  );
};
