import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { NewArrivalsGrid } from './components/NewArrivalsGrid';
import { FeaturedCollection } from './components/FeaturedCollection';
import { TrendingCarousel } from './components/TrendingCarousel';
import { AboutSection } from './components/AboutSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { PhotoSyncModal } from './components/PhotoSyncModal';
import { PRODUCTS } from './data/products';
import { Product, CartItem, ActiveNavTab } from './types';
import { Check, Camera, ShoppingBag, Phone } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveNavTab>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  
  // Кошик (демо-позиція для зручності попереднього перегляду)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: `${PRODUCTS[0].id}-${PRODUCTS[0].colors[0].name}-M`,
      product: PRODUCTS[0],
      selectedColor: PRODUCTS[0].colors[0].name,
      selectedSize: 'M',
      quantity: 1,
    }
  ]);

  // Стан модальних вікон
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPhotoSyncOpen, setIsPhotoSyncOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Спливаючі сповіщення
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToCart = (product: Product, color: string, size: string) => {
    const itemId = `${product.id}-${color}-${size}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [
          ...prev,
          {
            id: itemId,
            product,
            selectedColor: color,
            selectedSize: size,
            quantity: 1,
          },
        ];
      }
    });
    showToast(`«${product.name}» (${size}) додано в кошик`);
  };

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    );
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleSelectTab = (tab: ActiveNavTab) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setSelectedCategoryFilter('all');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'new-in') {
      setSelectedCategoryFilter('new-in');
    } else if (tab === 'catalog') {
      setSelectedCategoryFilter('all');
    } else if (['sets', 'jackets', 'tops'].includes(tab)) {
      setSelectedCategoryFilter(tab);
    }
  };

  const handleSelectCategory = (slug: string) => {
    setSelectedCategoryFilter(slug);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShopNewArrivals = () => {
    setSelectedCategoryFilter('all');
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreLookbook = () => {
    const contactsEl = document.getElementById('contacts-section');
    if (contactsEl) {
      contactsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121212] flex flex-col selection:bg-neutral-900 selection:text-white">
      
      {/* 1. ШАПКА САЙТУ */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenPhotoSync={() => setIsPhotoSyncOpen(true)}
      />

      {/* ОСНОВНИЙ ВМІСТ */}
      <main className="flex-grow">
        
        {/* 2. ГОЛОВНИЙ БАНЕР */}
        <Hero
          onShopNewArrivals={handleShopNewArrivals}
          onExploreLookbook={handleExploreLookbook}
        />

        {/* 3. КАТЕГОРІЇ */}
        <CategorySection
          onSelectCategory={handleSelectCategory}
        />

        {/* 4. КАТАЛОГ ТОВАРІВ З ОРИГІНАЛЬНИМИ ЦІНАМИ */}
        <NewArrivalsGrid
          products={PRODUCTS}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
          selectedCategoryFilter={selectedCategoryFilter}
          onFilterChange={(cat) => setSelectedCategoryFilter(cat)}
        />

        {/* 5. ОБРАЗИ СЕЗОНУ */}
        <FeaturedCollection
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
        />

        {/* 6. ПОПУЛЯРНІ МОДЕЛІ */}
        <TrendingCarousel
          products={PRODUCTS}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
        />

        {/* 7. ПРО БРЕНД SL COLLECTION */}
        <AboutSection />

        {/* 8. СПІЛЬНОТА / ПІДПИСКА */}
        <Newsletter />

      </main>

      {/* 9. ФУТЕР З ПРЯМИМИ КОНТАКТАМИ (097 339 75 76, TELEGRAM) */}
      <Footer onSelectTab={handleSelectTab} />

      {/* МОДАЛЬНІ ВІКНА ТА КОШИК */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderCompleted={() => setCartItems([])}
      />

      <PhotoSyncModal
        isOpen={isPhotoSyncOpen}
        onClose={() => setIsPhotoSyncOpen(false)}
      />

      {/* Кнопка швидкого оновлення фото товарів внизу зліва */}
      <div className="fixed bottom-5 left-5 z-30">
        <button
          onClick={() => setIsPhotoSyncOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-white/95 hover:bg-white text-neutral-900 rounded-full shadow-lg border border-neutral-200/90 text-xs font-semibold backdrop-blur-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Завантажити фото товарів"
        >
          <Camera className="w-4 h-4 text-neutral-700" />
          <span className="hidden sm:inline">Завантажити фото ({PRODUCTS.length} шт)</span>
          <span className="sm:hidden">Фото</span>
        </button>
      </div>

      {/* Плаваюча кнопка дзвінка справа внизу */}
      <div className="fixed bottom-5 right-5 z-30 flex items-center gap-2">
        <a
          href="tel:+380973397576"
          className="w-12 h-12 rounded-full bg-neutral-950 text-white flex items-center justify-center shadow-xl hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Зателефонувати: 097 339 75 76"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>

      {/* Спливаюче сповіщення Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 right-5 z-50 bg-[#121212] text-[#FAF9F6] px-5 py-3 rounded-xl shadow-2xl border border-neutral-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold">
            {toastMessage}
          </span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="text-xs underline text-amber-400 hover:text-white pl-2 font-bold cursor-pointer"
          >
            У кошик
          </button>
        </div>
      )}

    </div>
  );
}
