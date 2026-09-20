import React, { useState, useMemo } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const trendingSearches = [
    'Костюми',
    'Пуховик',
    'Жилетка',
    'Худі',
    'В\'язаний костюм',
    'Бомбер',
    'Шоколадний',
    'Вівсянка',
  ];

  const results = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const term = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term) ||
        p.categoryLabel.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.colors.some(c => c.name.toLowerCase().includes(term)) ||
        p.photoName.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-start justify-center p-3 sm:p-6 pt-16">
        <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl overflow-hidden text-left relative z-10 border border-neutral-200">
          
          {/* Поле пошуку */}
          <div className="p-4 sm:p-5 border-b border-neutral-100 bg-white flex items-center gap-3">
            <Search className="w-5 h-5 text-neutral-400" />
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Пошук костюмів, пуховиків, худі..."
              className="flex-grow text-sm sm:text-base font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none bg-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-xs text-neutral-400 hover:text-black uppercase tracking-wider font-semibold"
              >
                Очистити
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-black transition-colors rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Популярні запити */}
          {!searchTerm && (
            <div className="p-6 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                Популярні категорії та кольори
              </span>
              <div className="flex flex-wrap gap-2">
                {trendingSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchTerm(term)}
                    className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-700 text-xs font-medium transition-colors rounded-lg border border-neutral-200/60"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Результати пошуку */}
          {searchTerm && (
            <div className="p-4 sm:p-6 max-h-[60vh] overflow-y-auto divide-y divide-neutral-100">
              <span className="text-xs font-bold text-neutral-400 block mb-3 uppercase tracking-wider">
                Знайдено {results.length} товарів
              </span>

              {results.length === 0 ? (
                <div className="text-center py-10 text-neutral-500">
                  <p className="text-sm">За запитом «{searchTerm}» нічого не знайдено</p>
                  <p className="text-xs mt-1 text-neutral-400">Спробуйте перевірити написання або перегляньте весь каталог</p>
                </div>
              ) : (
                results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="py-3 flex items-center gap-3 cursor-pointer group hover:bg-neutral-50 p-2 rounded-xl transition-colors"
                  >
                    <div className="w-12 h-16 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                      <ProductImage
                        photoName={product.photoName}
                        primarySrc={product.primaryImage}
                        fallbackSrc={product.fallbackImage}
                        alt={product.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-neutral-400 uppercase">
                          {product.categoryLabel}
                        </span>
                        <span className="text-[10px] bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-600 font-semibold">
                          Фото {product.photoNumber}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-neutral-900 truncate group-hover:text-amber-800 transition-colors">
                        {product.name}
                      </h4>
                      <p className="text-xs font-black text-neutral-950 mt-0.5">
                        {product.price.toLocaleString('uk-UA')} ₴
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
