import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { ProductImage } from './ProductImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Затемнення фону */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Панель кошика */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Заголовок */}
          <div className="p-5 sm:p-6 border-b border-neutral-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-900">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold tracking-tight text-neutral-900 uppercase">
                  Кошик
                </h2>
                <p className="text-xs text-neutral-500">
                  {totalQuantity > 0 ? `${totalQuantity} позицій` : 'Порожній'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
              aria-label="Закрити кошик"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Список товарів */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4 divide-y divide-neutral-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4 text-neutral-400">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-1">
                  Ваш кошик порожній
                </h3>
                <p className="text-sm text-neutral-500 max-w-xs mb-6">
                  Оберіть вподобані речі з нової колекції SL Collection
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-medium rounded-xl transition-colors"
                >
                  Перейти до покупок
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemTotal = item.product.price * item.quantity;
                return (
                  <div key={item.id} className="pt-4 first:pt-0 flex gap-4 items-start">
                    {/* Фото товару */}
                    <div className="w-20 h-26 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0 relative border border-neutral-200/60">
                      <ProductImage
                        photoName={item.product.photoName}
                        primarySrc={item.product.primaryImage}
                        fallbackSrc={item.product.fallbackImage}
                        alt={item.product.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* Інформація про товар */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-neutral-900 leading-snug line-clamp-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-neutral-400 hover:text-red-500 transition-colors p-1"
                          aria-label="Видалити товар"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Обраний колір і розмір */}
                      <div className="flex items-center gap-2 mt-1 text-xs text-neutral-500">
                        {item.selectedColor && (
                          <span className="bg-neutral-100 px-2 py-0.5 rounded text-neutral-700 font-medium">
                            {item.selectedColor}
                          </span>
                        )}
                        {item.selectedSize && (
                          <span className="bg-neutral-100 px-2 py-0.5 rounded text-neutral-700 font-medium">
                            Розмір: {item.selectedSize}
                          </span>
                        )}
                      </div>

                      {/* Ціна за одиницю */}
                      <div className="mt-1 text-xs text-neutral-500">
                        Ціна: <span className="font-semibold text-neutral-800">{item.product.price.toLocaleString('uk-UA')} ₴</span>
                      </div>

                      {/* Кількість та сума по рядку */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-100">
                        <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden bg-white">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 hover:bg-neutral-100 text-neutral-600 transition-colors"
                            aria-label="Зменшити кількість"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-bold text-neutral-900 min-w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 hover:bg-neutral-100 text-neutral-600 transition-colors"
                            aria-label="Збільшити кількість"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-xs text-neutral-400 block">Разом:</span>
                          <span className="text-sm font-bold text-neutral-900">
                            {itemTotal.toLocaleString('uk-UA')} ₴
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Підсумок та кнопка оформлення */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 bg-neutral-50 border-t border-neutral-200/80 space-y-4">
              <div className="flex items-center justify-between text-base">
                <span className="font-semibold text-neutral-700">Загальна сума:</span>
                <span className="text-2xl font-extrabold text-neutral-900">
                  {totalPrice.toLocaleString('uk-UA')} ₴
                </span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-4 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all shadow-lg shadow-neutral-900/10 cursor-pointer active:scale-[0.99]"
              >
                <span>Оформити замовлення</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-neutral-500 leading-tight">
                Без передплати на сайті. Оформлення та підтвердження замовлення здійснюється напряму.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
