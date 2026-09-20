import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Flame } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface TrendingCarouselProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
}

export const TrendingCarousel: React.FC<TrendingCarouselProps> = ({
  products,
  onQuickView,
  onAddToCart,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter bestselling or highlight products
  const trendingProducts = products.filter((p) => p.isBestseller || p.isNew);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FAF9F6] border-t border-neutral-200/80 overflow-hidden" id="trending-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Заголовок із кнопками прокрутки */}
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>ХІТИ ПРОДАЖУ ТА НОВИНКИ</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-serif text-neutral-950">
              Популярні моделі
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll('left')}
              className="w-10 h-10 border border-neutral-300 hover:border-black bg-white hover:bg-neutral-950 hover:text-white transition-all flex items-center justify-center cursor-pointer rounded-xl"
              aria-label="Вліво"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-10 h-10 border border-neutral-300 hover:border-black bg-white hover:bg-neutral-950 hover:text-white transition-all flex items-center justify-center cursor-pointer rounded-xl"
              aria-label="Вправо"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Горизонтальна стрічка товарів */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
        >
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="min-w-[280px] sm:min-w-[320px] max-w-[320px] flex-shrink-0 snap-start"
            >
              <ProductCard
                product={product}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
