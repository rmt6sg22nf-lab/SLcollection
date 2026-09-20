import React from 'react';
import { Phone, Send, ArrowUp } from 'lucide-react';
import { ActiveNavTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: ActiveNavTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contacts-section" className="bg-[#111111] text-[#ECE8E1] border-t border-neutral-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Головний блок футера */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Логотип та інформація */}
          <div className="lg:col-span-5 space-y-4">
            <div className="cursor-pointer select-none inline-block" onClick={scrollToTop}>
              <div className="flex items-baseline gap-2">
                <span className="font-serif font-black text-3xl sm:text-4xl text-white">
                  SL
                </span>
                <span className="text-sm sm:text-base tracking-[0.25em] uppercase text-neutral-400 font-light font-sans">
                  Collection
                </span>
              </div>
              <span className="text-xs text-neutral-400 block mt-1">
                Сучасний жіночий одяг • Елегантність та спорт
              </span>
            </div>

            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Колекція ретельно відібраних жіночих спортивних сетів, курток та оверсайз моделей для комфорту та бездоганного стилю.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="tel:+380973397576"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>097 339 75 76</span>
              </a>

              <a
                href="https://t.me/+380973397576"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2AABEE]/20 hover:bg-[#2AABEE]/30 text-[#2AABEE] text-xs font-bold transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Telegram</span>
              </a>
            </div>
          </div>

          {/* Розділи меню українською */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-xs">
            
            {/* Каталог */}
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase tracking-wider">
                Каталог
              </h4>
              <ul className="space-y-2.5 text-neutral-400">
                <li>
                  <button onClick={() => onSelectTab('new-in')} className="hover:text-white transition-colors">
                    Новинки сезону
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectTab('sets')} className="hover:text-white transition-colors">
                    Спортивні костюми
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectTab('jackets')} className="hover:text-white transition-colors">
                    Куртки та пуховики
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectTab('tops')} className="hover:text-white transition-colors">
                    Худі та світшоти
                  </button>
                </li>
                <li>
                  <button onClick={() => onSelectTab('catalog')} className="hover:text-white transition-colors">
                    Весь каталог
                  </button>
                </li>
              </ul>
            </div>

            {/* Контакти для замовлення */}
            <div className="space-y-3">
              <h4 className="font-bold text-white uppercase tracking-wider">
                Для замовлення
              </h4>
              <ul className="space-y-2 text-neutral-400">
                <li className="text-neutral-300 font-medium">
                  Телефон:
                </li>
                <li>
                  <a href="tel:+380973397576" className="text-white hover:underline font-bold">
                    097 339 75 76
                  </a>
                </li>
                <li className="text-neutral-300 font-medium pt-2">
                  Месенджер:
                </li>
                <li>
                  <a href="https://t.me/+380973397576" target="_blank" rel="noreferrer" className="text-[#2AABEE] hover:underline font-bold">
                    Написати в Telegram
                  </a>
                </li>
              </ul>
            </div>

            {/* Доставка та інформація */}
            <div className="space-y-3 col-span-2 sm:col-span-1">
              <h4 className="font-bold text-white uppercase tracking-wider">
                Сервіс
              </h4>
              <ul className="space-y-2.5 text-neutral-400">
                <li>Доставка Новою Поштою</li>
                <li>Відправка 1-2 робочих дні</li>
                <li>Консультація за розмірами</li>
                <li>Обмін/повернення за домовленістю</li>
              </ul>
            </div>

          </div>

        </div>

        {/* Нижній рядок */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} SL Collection. Всі права захищено.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
          >
            <span>Вгору</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
