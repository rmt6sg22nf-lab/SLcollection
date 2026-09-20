import React, { useState, useMemo } from 'react';
import { ArrowUpDown, SlidersHorizontal, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface NewArrivalsGridProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
  selectedCategoryFilter: string;
  onFilterChange: (category: string) => void;
}

export const NewArrivalsGrid: React.FC<NewArrivalsGridProps> = ({
  products,
  onQuickView,
  onAddToCart,
  selectedCategoryFilter,
  onFilterChange,
}) => {
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const filterTabs = [
    { label: `Весь каталог (${products.length})`, key: 'all' },
    { label: 'Спортивні костюми', key: 'sets' },
    { label: 'Куртки та пуховики', key: 'jackets' },
    { label: 'Худі та світшоти', key: 'tops' },
    { label: 'Новинки', key: 'new-in' },
  ];

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (selectedCategoryFilter !== 'all') {
      if (selectedCategoryFilter === 'new-in') {
        list = list.filter((p) => p.isNew);
      } else {
        list = list.filter((p) => p.category === selectedCategoryFilter);
      }
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else {
      list.sort((a, b) => a.photoNumber - b.photoNumber);
    }

    return list;
  }, [products, selectedCategoryFilter, sortBy]);

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6] border-t border-neutral-200/60" id="catalog-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Заголовок секції */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900 text-white rounded-full text-[11px] font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>SL COLLECTION • ОРИГІНАЛЬНИЙ ПРАЙС-ЛИСТ</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-950 font-serif">
            Каталог одягу
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed">
            {products.length} актуальних моделей жіночого спортивного та міського гардероба. Усі ціни вказані в гривнях (₴) відповідно до офіційного прайсу.
          </p>
        </div>

        {/* Панель фільтрів та сортування */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-neutral-200">
          
          {/* Вкладки категорій */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => onFilterChange(tab.key)}
                className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategoryFilter === tab.key
                    ? 'bg-neutral-950 text-white shadow-sm'
                    : 'bg-white text-neutral-600 hover:text-black hover:bg-neutral-100 border border-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Сортування */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <span className="text-xs text-neutral-500 font-medium">Сортування:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-semibold bg-white border border-neutral-200 rounded-xl px-3 py-2 text-neutral-800 focus:outline-none focus:border-neutral-900 cursor-pointer shadow-2xs"
            >
              <option value="default">За порядком у прайсі</option>
              <option value="price-asc">Ціна: від меншої до більшої</option>
              <option value="price-desc">Ціна: від більшої до меншої</option>
            </select>
          </div>

        </div>

        {/* Сітка товарів (15 позицій) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {/* Інформаційний банер про замовлення */}
        <div className="mt-16 p-6 sm:p-8 bg-neutral-900 text-white rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold">Сподобалась річ або потрібна допомога з розміром?</h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Зв'яжіться безпосередньо за номером телефону або в Telegram для миттєвої консультації.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="tel:+380973397576"
              className="px-5 py-3 bg-white hover:bg-neutral-100 text-neutral-950 text-xs font-extrabold rounded-xl transition-colors"
            >
              097 339 75 76
            </a>
            <a
              href="https://t.me/+380973397576"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 bg-[#2AABEE] hover:bg-[#229ED9] text-white text-xs font-extrabold rounded-xl transition-colors shadow-md shadow-[#2AABEE]/20"
            >
              Telegram
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
