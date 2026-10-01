import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { MenuSection } from './components/MenuSection';
import { PromoBanner } from './components/PromoBanner';
import { AboutSahl } from './components/AboutSahl';
import { TestimonialSection } from './components/TestimonialSection';
import { Footer } from './components/Footer';
import { FoodDetailModal } from './components/FoodDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AdminModal } from './components/AdminModal';
import { LoadingScreen } from './components/LoadingScreen';
import { DapurPage } from './pages/DapurPage';
import { FoodItem } from './types/food';
import { MessageCircle, CheckCircle2, ChevronUp, ChefHat } from 'lucide-react';

function SahlAppContent() {
  const {
    selectedDetailItem,
    openDetailModal,
    closeDetailModal,
    toastMessage,
    favorites,
    menuItems,
    currentRoute,
    navigateTo,
    loadingTrigger,
  } = useCart();


  const [searchQuery, setSearchQuery] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  // If user navigates to /Dapur or /dapur
  if (currentRoute === 'dapur') {
    return (
      <>
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#291F18]/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#443328] flex items-center gap-2.5 text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
        <DapurPage />
      </>
    );
  }

  const handleExploreMenu = () => {
    setFavoritesOnly(false);
    const el = document.getElementById('menu-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSpecial = () => {
    const specialItem = menuItems.find((i) => i.id === 'sahl-01') || menuItems[0];
    if (specialItem) {
      openDetailModal(specialItem);
    }
  };

  const handleOpenFavorites = () => {
    setFavoritesOnly(true);
    const el = document.getElementById('menu-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#241B15] relative">
      
      {/* Cinematic Opening Loading Screen */}
      <LoadingScreen replayTrigger={loadingTrigger} />

      {/* Toast Notification Pill */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#291F18]/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#443328] flex items-center gap-2.5 text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenFavorites={handleOpenFavorites}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <HeroBanner
          onExploreMenu={handleExploreMenu}
          onSelectSpecial={handleSelectSpecial}
        />

        {/* Highlight Deal / Promo Banner */}
        <PromoBanner />

        {/* Menu Section with categories & products */}
        <MenuSection
          searchQuery={searchQuery}
          onOpenDetail={openDetailModal}
          favoritesOnly={favoritesOnly}
          onClearFavoritesOnly={() => setFavoritesOnly(false)}
          favorites={favorites}
        />

        {/* Story, Philosophy & Outlets */}
        <AboutSahl />

        {/* Customer Reviews */}
        <TestimonialSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href="https://wa.me/6281234567890?text=Halo%20Sahl%20Food!%20Saya%20ingin%20tanya%20seputar%20menu%20dan%20pemesanan"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#1EBE5D] text-white p-3.5 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2 group"
        title="Hubungi CS Sahl di WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold pr-1">
          Chat CS Sahl
        </span>
      </a>

      {/* Modals & Drawers */}
      <FoodDetailModal
        item={selectedDetailItem}
        onClose={closeDetailModal}
      />
      <CartDrawer />
      <CheckoutModal />
      <OrderTrackerModal />
      <AdminModal />

      {/* Floating Admin Control Button on Bottom Left */}
      <button
        type="button"
        onClick={() => navigateTo('dapur')}
        className="fixed bottom-6 left-6 z-40 bg-[#2C211A] hover:bg-[#443328] text-[#FED7AA] px-4 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2.5 border border-[#523F32] group"
        title="Buka Halaman Khusus Dapur: SahlFoods.com/Dapur (Perlu Password)"
      >
        <ChefHat className="w-5 h-5 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
        <div className="flex flex-col text-left leading-none">
          <span className="text-[10px] text-amber-200/80 font-mono">/Dapur</span>
          <span className="text-xs font-bold text-white tracking-wide">
            Portal Admin
          </span>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
      </button>

    </div>
  );
}



export default function App() {
  return (
    <CartProvider>
      <SahlAppContent />
    </CartProvider>
  );
}
