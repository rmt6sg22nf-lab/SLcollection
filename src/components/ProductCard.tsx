import React, { useState } from 'react';
import { Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'S');
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor, selectedSize);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div
      className="group relative flex flex-col bg-white border border-neutral-200/80 rounded-2xl overflow-hidden hover:shadow-xl hover:border-neutral-400 transition-all duration-300"
      id={`product-card-${product.id}`}
    >
      {/* Область фотографії товару */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <ProductImage
          photoName={product.photoName}
          primarySrc={product.primaryImage}
          fallbackSrc={product.fallbackImage}
          alt={product.name}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Бейджі зліва зверху */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="bg-neutral-900/90 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md backdrop-blur-xs">
            Фото {product.photoNumber}
          </span>
          {product.isNew && (
            <span className="bg-amber-400 text-neutral-950 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md">
              Новинка
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-neutral-100 text-neutral-800 text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border border-neutral-200">
              Хіт
            </span>
          )}
        </div>

        {/* Кнопка швидкого перегляду по наведенню */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full py-2.5 bg-white/95 hover:bg-white text-neutral-900 text-xs font-bold rounded-xl shadow-md backdrop-blur-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Швидкий перегляд</span>
          </button>
        </div>
      </div>

      {/* Опис та ціна */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Категорія */}
          <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-1">
            <span className="uppercase font-semibold tracking-wider">{product.categoryLabel}</span>
            <span className="text-[10px] text-neutral-400">{product.photoName}</span>
          </div>

          {/* Назва товару */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-sm sm:text-base font-bold text-neutral-900 line-clamp-2 hover:text-neutral-700 cursor-pointer leading-snug transition-colors mb-2"
          >
            {product.name}
          </h3>

          {/* Вибір кольору */}
          <div className="flex items-center gap-1.5 mb-3">
            <span className="text-[11px] text-neutral-400 mr-1">Колір:</span>
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`w-4.5 h-4.5 rounded-full border transition-all ${
                  selectedColor === color.name
                    ? 'ring-2 ring-neutral-900 ring-offset-1 scale-110 border-neutral-900'
                    : 'border-neutral-300 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={color.name}
              />
            ))}
            <span className="text-[11px] text-neutral-600 font-medium ml-1 truncate max-w-[120px]">
              {selectedColor}
            </span>
          </div>

          {/* Вибір розміру */}
          <div className="flex items-center gap-1.5 mb-4">
            <span className="text-[11px] text-neutral-400 mr-1">Розмір:</span>
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                  selectedSize === size
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Ціна та кнопка додавання в кошик */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-neutral-400 block">Ціна</span>
            <span className="text-lg sm:text-xl font-black text-neutral-950">
              {product.price.toLocaleString('uk-UA')} ₴
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-900 hover:bg-neutral-800 text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Додано!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>В кошик</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
