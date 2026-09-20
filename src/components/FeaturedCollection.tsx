import React, { useState } from 'react';
import { ArrowRight, Sparkles, Check, ShoppingBag, Eye } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ProductImage } from './ProductImage';

interface FeaturedCollectionProps {
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
}

export const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({
  onQuickView,
  onAddToCart,
}) => {
  // Highlight top representative looks from our 15 products
  const looks = [
    {
      id: 'look-1',
      title: 'Стильний міський пуховик',
      subtitle: 'Образ 01: Тепло та мінімалізм',
      description: 'Стьобаний пуховик прямого крою у комбінації зі зручними широкими штанами. Ідеальне рішення для прохолодних днів.',
      productId: 'sl-002', // 2800 ₴
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85',
    },
    {
      id: 'look-2',
      title: 'В\'язаний преміум сет',
      subtitle: 'Образ 02: Елегантний затишок',
      description: 'Ніжна фактурна в\'язка з вовною та кашеміром. Широкі штани палаццо та вільний джемпер створюють бездоганний силует.',
      productId: 'sl-001', // 2300 ₴
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    },
    {
      id: 'look-3',
      title: 'Спортивний оверсайз костюм',
      subtitle: 'Образ 03: Стрітвеар естетика',
      description: 'Щільний турецький трикотаж тринитка з начосом. Худі з подвійним капюшоном та джогери на високій посадці.',
      productId: 'sl-08',
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    },
  ];

  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const currentLook = looks[activeLookIndex];
  const featuredProduct = PRODUCTS.find((p) => p.id === currentLook.productId) || PRODUCTS[0];

  return (
    <section className="py-20 sm:py-24 bg-[#141414] text-white relative overflow-hidden" id="featured-collection">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Заголовок */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold tracking-widest uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SL COLLECTION • ОБРАЗИ СЕЗОНУ</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-serif tracking-tight">
              Капсульний гардероб
            </h2>
          </div>

          <div className="mt-4 lg:mt-0 flex items-center gap-2">
            {looks.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveLookIndex(idx)}
                className={`px-4 py-2 text-xs font-bold rounded-xl uppercase transition-all duration-300 cursor-pointer ${
                  activeLookIndex === idx
                    ? 'bg-white text-neutral-950 shadow-md'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                Образ 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Двоколонковий блок образу */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Фото образу зліва */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl bg-neutral-900">
              <img
                src={currentLook.image}
                alt={currentLook.title}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs uppercase tracking-widest text-amber-300 font-semibold block mb-1">
                  {currentLook.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {currentLook.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Картка товару з прайсу справа */}
          <div className="lg:col-span-5 bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 rounded-2xl space-y-6">
            <div>
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">
                Товар із цього образу • Фото {featuredProduct.photoNumber}
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {featuredProduct.name}
              </h4>
              <p className="text-2xl font-black text-amber-400 mt-2">
                {featuredProduct.price.toLocaleString('uk-UA')} ₴
              </p>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed">
              {currentLook.description}
            </p>

            <div className="text-xs text-neutral-400 space-y-1 bg-neutral-800/60 p-3 rounded-xl">
              <div>Тканина: <span className="text-neutral-200 font-semibold">{featuredProduct.fabric}</span></div>
              <div>Посадка: <span className="text-neutral-200 font-semibold">{featuredProduct.fit}</span></div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => onAddToCart(featuredProduct, featuredProduct.colors[0]?.name || '', 'M')}
                className="flex-1 py-3.5 px-4 bg-white text-neutral-950 hover:bg-neutral-200 font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>В кошик</span>
              </button>

              <button
                onClick={() => onQuickView(featuredProduct)}
                className="py-3.5 px-4 border border-neutral-700 hover:border-white text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Деталі</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
