import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Phone, Send } from 'lucide-react';

interface HeroProps {
  onShopNewArrivals: () => void;
  onExploreLookbook: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNewArrivals, onExploreLookbook }) => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center pt-24 sm:pt-28 pb-12 overflow-hidden bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Текстовий блок зліва */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-neutral-900/5 border border-neutral-300/80 rounded-full text-xs font-semibold tracking-wider text-neutral-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>НОВА КОЛЕКЦІЯ 2026 • SPORT & ELEGANCE</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-[#121212] leading-[1.05]">
                <span className="block font-serif tracking-tighter">SL</span>
                <span className="block text-2xl sm:text-3xl font-light tracking-[0.2em] text-neutral-700 uppercase font-sans mt-1">
                  Collection
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl font-serif italic text-neutral-800">
                Сучасний жіночий одяг, що поєднує елегантність та спорт
              </p>
            </div>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
              Авторська добірка костюмів, теплих стьобаних пуховиків, в'язаних сетів та оверсайз худі.
              Високоякісні тканини, ідеальна посадка та комфорт на кожен день.
            </p>

            {/* Кнопки дій */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={onShopNewArrivals}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#121212] text-white text-xs font-bold tracking-widest uppercase transition-all duration-300 hover:bg-neutral-800 hover:shadow-xl active:scale-[0.99] rounded-xl cursor-pointer"
              >
                <span>Переглянути каталог</span>
                <ArrowRight className="w-4 h-4 ml-2.5" />
              </button>

              <button
                onClick={onExploreLookbook}
                className="inline-flex items-center justify-center px-7 py-4 border border-neutral-300 bg-white text-neutral-900 text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-neutral-50 hover:border-neutral-900 rounded-xl cursor-pointer"
              >
                <span>Контакти бренду</span>
              </button>
            </div>

            {/* Переваги бренду українською */}
            <div className="pt-6 border-t border-neutral-200/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="block text-sm font-bold text-neutral-900">
                  100%
                </span>
                <span className="text-xs text-neutral-500">Преміум матеріали</span>
              </div>
              <div>
                <span className="block text-sm font-bold text-neutral-900">
                  1-2 ДНІ
                </span>
                <span className="text-xs text-neutral-500">Швидка відправка</span>
              </div>
              <div>
                <span className="block text-sm font-bold text-neutral-900">
                  ПРЯМИЙ
                </span>
                <span className="text-xs text-neutral-500">Зв'язок та примірка</span>
              </div>
            </div>
          </div>

          {/* Фото справа */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative aspect-[3/4] sm:aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-200 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=90"
                  alt="SL Collection — сучасний жіночий одяг"
                  className="w-full h-full object-cover object-center transform hover:scale-103 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                {/* Картка швидкого замовлення внизу банера */}
                <div className="absolute bottom-5 left-5 right-5 p-4 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-white/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-neutral-500 uppercase block">
                      Швидке замовлення
                    </span>
                    <a
                      href="tel:+380973397576"
                      className="text-sm sm:text-base font-bold text-neutral-900 hover:text-amber-800 transition-colors"
                    >
                      097 339 75 76
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="tel:+380973397576"
                      className="w-9 h-9 rounded-lg bg-neutral-900 text-white flex items-center justify-center hover:bg-neutral-800 transition-colors"
                      title="Зателефонувати"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    <a
                      href="https://t.me/+380973397576"
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-lg bg-[#2AABEE] text-white flex items-center justify-center hover:bg-[#229ED9] transition-colors"
                      title="Написати в Telegram"
                    >
                      <Send className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
