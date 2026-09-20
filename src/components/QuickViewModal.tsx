import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, Check, Phone, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.name || '');
      setSelectedSize(product.sizes[0] || 'S');
      setJustAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedColor, selectedSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Затемнення фону */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-3 sm:p-6 text-center">
        <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden text-left relative z-10 border border-neutral-200">
          
          {/* Кнопка закриття */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 bg-white/90 hover:bg-white text-neutral-800 rounded-full shadow-md transition-colors"
            aria-label="Закрити"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Ліва колонка: Фотографія */}
            <div className="p-6 bg-neutral-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200">
              <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-neutral-200 shadow-sm relative">
                <ProductImage
                  photoName={product.photoName}
                  primarySrc={product.primaryImage}
                  fallbackSrc={product.fallbackImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-top"
                />

                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                  <span className="bg-neutral-900/90 text-white text-xs font-bold px-3 py-1 rounded-md backdrop-blur-xs">
                    Фото {product.photoNumber} • {product.photoName}
                  </span>
                  {product.isNew && (
                    <span className="bg-amber-400 text-neutral-950 text-xs font-extrabold px-2.5 py-0.5 rounded-md">
                      Нова колекція
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 p-3 bg-white rounded-xl border border-neutral-200 text-xs text-neutral-600 flex items-center justify-between">
                <span>Каталожний номер: <strong>SL-0{product.photoNumber}</strong></span>
                <span className="font-semibold text-neutral-900">{product.categoryLabel}</span>
              </div>
            </div>

            {/* Права колонка: Інформація та вибір */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                  SL Collection
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-neutral-950 mt-1 leading-snug">
                  {product.name}
                </h2>

                {/* Ціна */}
                <div className="mt-3 flex items-baseline gap-3">
                  <span className="text-3xl font-black text-neutral-950">
                    {product.price.toLocaleString('uk-UA')} ₴
                  </span>
                  <span className="text-xs text-neutral-500 font-medium">
                    (актуальна ціна)
                  </span>
                </div>

                <div className="my-5 h-px bg-neutral-100" />

                {/* Опис */}
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Тканина та посадка */}
                <div className="mt-4 space-y-2 text-xs bg-neutral-50 p-3.5 rounded-xl border border-neutral-200/60">
                  <div>
                    <span className="text-neutral-500 font-medium">Склад тканини: </span>
                    <span className="text-neutral-900 font-semibold">{product.fabric}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 font-medium">Силует та посадка: </span>
                    <span className="text-neutral-900 font-semibold">{product.fit}</span>
                  </div>
                </div>

                {/* Вибір кольору */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Колір: <span className="font-normal text-neutral-600">{selectedColor}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 border transition-all ${
                          selectedColor === color.name
                            ? 'border-neutral-900 bg-neutral-900 text-white'
                            : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full border border-black/20"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Вибір розміру */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                      Розмір:
                    </span>
                    <span className="text-[11px] text-neutral-500">Українська розмірна сітка</span>
                  </div>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-11 rounded-xl text-xs font-extrabold transition-all border ${
                          selectedSize === size
                            ? 'bg-neutral-950 text-white border-neutral-950 shadow-sm'
                            : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Дії: Додати в кошик та швидкий дзвінок */}
              <div className="space-y-3 pt-4 border-t border-neutral-100">
                <button
                  onClick={handleAdd}
                  className={`w-full py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-[0.99] ${
                    justAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-950 hover:bg-neutral-800 text-white'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Товар успішно додано до кошика!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Додати до кошика • {product.price.toLocaleString('uk-UA')} ₴</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href="tel:+380973397576"
                    className="flex-1 py-2.5 px-3 bg-neutral-100 hover:bg-neutral-200 rounded-xl text-xs font-bold text-neutral-900 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>097 339 75 76</span>
                  </a>
                  <a
                    href={`https://t.me/+380973397576?text=${encodeURIComponent(`Вітаю! Мене цікавить: ${product.name} (ціна ${product.price} грн)`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-3 bg-[#2AABEE]/15 hover:bg-[#2AABEE]/25 rounded-xl text-xs font-bold text-[#1E87BE] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Telegram</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
