import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, Phone, Send, Camera } from 'lucide-react';
import { ActiveNavTab } from '../types';

interface HeaderProps {
  activeTab: ActiveNavTab;
  onSelectTab: (tab: ActiveNavTab) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenPhotoSync?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenPhotoSync,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const announcements = [
    'НОВА КОЛЕКЦІЯ ОСІНЬ/ЗИМА ВЖЕ У ПРОДАЖУ',
    'ОФОРМЛЕННЯ ЗАМОВЛЕНЬ ТА КОНСУЛЬТАЦІЯ: 097 339 75 76',
    'ШВИДКА ВІДПРАВКА НОВОЮ ПОШТОЮ ПО ВСІЙ УКРАЇНІ',
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const navItems: { label: string; tab: ActiveNavTab }[] = [
    { label: 'Головна', tab: 'home' },
    { label: 'Новинки', tab: 'new-in' },
    { label: 'Костюми', tab: 'sets' },
    { label: 'Верхній одяг', tab: 'jackets' },
    { label: 'Худі та світшоти', tab: 'tops' },
    { label: 'Весь каталог', tab: 'catalog' },
    { label: 'Контакти', tab: 'contacts' },
  ];

  const handleNavClick = (tab: ActiveNavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);

    if (tab === 'contacts') {
      const el = document.getElementById('contacts-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    if (tab !== 'home') {
      const el = document.getElementById('catalog-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Рядок оголошень */}
      <div className="bg-[#111111] text-[#F5F5F0] py-2 px-4 text-[11px] font-medium tracking-wider text-center border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span className="transition-all duration-500 ease-out">{announcements[announcementIndex]}</span>
        </div>
      </div>

      {/* Головна навігаційна панель */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-200/80 py-3'
            : 'bg-white/90 backdrop-blur-xs border-b border-neutral-200/50 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Мобільна кнопка меню */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-800 hover:text-black rounded-lg transition-colors"
              aria-label="Меню"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              onClick={onOpenSearch}
              className="p-2 text-neutral-600 hover:text-neutral-900 rounded-lg transition-colors"
              aria-label="Пошук"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Бренд логотип: SL великими та Collection поруч або знизу */}
          <div className="flex-1 lg:flex-initial text-center lg:text-left">
            <button
              onClick={() => handleNavClick('home')}
              className="inline-flex items-baseline gap-2 cursor-pointer group text-left"
            >
              <span className="text-2xl sm:text-3xl font-black tracking-tighter text-neutral-950 font-serif group-hover:opacity-85 transition-opacity">
                SL
              </span>
              <span className="text-xs sm:text-sm font-light tracking-[0.25em] text-neutral-600 uppercase font-sans">
                Collection
              </span>
            </button>
          </div>

          {/* Десктоп меню */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`text-xs font-semibold tracking-wider uppercase transition-all duration-200 relative py-1 cursor-pointer ${
                  activeTab === item.tab
                    ? 'text-neutral-950 font-bold'
                    : 'text-neutral-500 hover:text-neutral-950'
                }`}
              >
                {item.label}
                {activeTab === item.tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-950 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Дії справа: Контакти, Пошук, Кошик */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Швидкий зв'язок */}
            <a
              href="tel:+380973397576"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 transition-colors border border-neutral-200"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>097 339 75 76</span>
            </a>

            <button
              onClick={onOpenSearch}
              className="hidden lg:flex p-2 text-neutral-600 hover:text-neutral-950 rounded-full hover:bg-neutral-100 transition-colors"
              aria-label="Пошук"
            >
              <Search className="w-5 h-5" />
            </button>

            {onOpenPhotoSync && (
              <button
                onClick={onOpenPhotoSync}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors"
                title="Оновити фото товарів"
              >
                <Camera className="w-4 h-4" />
                <span className="text-[11px]">Фото</span>
              </button>
            )}

            {/* Кошик */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 bg-neutral-950 text-white rounded-full hover:bg-neutral-800 transition-all cursor-pointer shadow-sm active:scale-95"
              aria-label="Кошик"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-neutral-950 text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Мобільне меню */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 shadow-xl px-6 py-6 space-y-4 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 gap-2">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`text-left py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between ${
                  activeTab === item.tab
                    ? 'bg-neutral-100 text-neutral-950 font-bold'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                <span>{item.label}</span>
                {activeTab === item.tab && <span className="w-1.5 h-1.5 rounded-full bg-neutral-950"></span>}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-100 flex flex-col gap-2.5">
            <a
              href="tel:+380973397576"
              className="flex items-center justify-center gap-2 py-3 bg-neutral-900 text-white rounded-xl text-xs font-bold"
            >
              <Phone className="w-4 h-4" />
              <span>Зателефонувати: 097 339 75 76</span>
            </a>
            <a
              href="https://t.me/+380973397576"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 py-3 bg-[#2AABEE] text-white rounded-xl text-xs font-bold"
            >
              <Send className="w-4 h-4" />
              <span>Написати в Telegram</span>
            </a>
            {onOpenPhotoSync && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPhotoSync();
                }}
                className="flex items-center justify-center gap-2 py-2.5 border border-neutral-200 text-neutral-700 rounded-xl text-xs font-semibold"
              >
                <Camera className="w-4 h-4" />
                <span>Завантажити фото товарів</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
