import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CategorySectionProps {
  onSelectCategory: (categorySlug: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'cat-sets',
      slug: 'sets',
      name: 'Спортивні костюми',
      subtitle: 'Трикотажні та в\'язані сети',
      itemCount: 8,
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'cat-jackets',
      slug: 'jackets',
      name: 'Куртки та жилети',
      subtitle: 'Стьобані пуховики та бомбери',
      itemCount: 5,
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=900&q=80',
    },
    {
      id: 'cat-tops',
      slug: 'tops',
      name: 'Худі та світшоти',
      subtitle: 'Оверсайз та акцентний крій',
      itemCount: 2,
      image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FAF9F6] border-t border-neutral-200/80" id="category-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Заголовок */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-neutral-400 block mb-2">
              SL Collection • Категорії
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-neutral-950 font-serif">
              Оберіть категорію
            </h2>
          </div>
          <p className="text-neutral-500 text-sm max-w-md mt-2 md:mt-0">
            Зручна навігація за основними напрямками нової колекції: від легких світшотів до теплих стьобаних курток.
          </p>
        </div>

        {/* Картки 3 основних категорій */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => onSelectCategory(category.slug)}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-95"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white/90">
                <span className="text-[11px] font-bold tracking-wider uppercase bg-white/20 backdrop-blur-xs px-2.5 py-1 rounded-md">
                  {category.itemCount} моделей
                </span>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center transform group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-xs text-neutral-300 font-light mb-1">
                  {category.subtitle}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
