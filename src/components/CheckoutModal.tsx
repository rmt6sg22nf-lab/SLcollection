import React, { useState } from 'react';
import { X, Phone, Send, Copy, Check, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { ProductImage } from './ProductImage';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
}) => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedOrder, setCopiedOrder] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');

  if (!isOpen) return null;

  const totalAmount = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const phoneNumber = '097 339 75 76';
  const phoneTel = '+380973397576';
  const telegramUsername = 'sl_collection';
  const telegramLink = `https://t.me/${phoneTel.replace('+', '')}`;

  const orderSummaryText = `Замовлення в SL Collection:
${items.map((i, idx) => `${idx + 1}. ${i.product.name} (колір: ${i.selectedColor}, розмір: ${i.selectedSize}) — ${i.quantity} шт. x ${i.product.price} грн = ${i.product.price * i.quantity} грн`).join('\n')}
Загальна сума: ${totalAmount.toLocaleString('uk-UA')} грн
${customerName ? `Клієнт: ${customerName}` : ''}
${customerCity ? `Місто: ${customerCity}` : ''}`.trim();

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('0973397576');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyOrder = () => {
    navigator.clipboard.writeText(orderSummaryText);
    setCopiedOrder(true);
    setTimeout(() => setCopiedOrder(false), 2000);
  };

  const handleOpenTelegram = () => {
    const encoded = encodeURIComponent(`Вітаю! Хочу оформити замовлення в SL Collection:\n\n${orderSummaryText}`);
    window.open(`https://t.me/+380973397576?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Затемнення фону */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="min-h-full flex items-center justify-center p-3 sm:p-6 text-center">
        <div className="w-full max-w-xl bg-white shadow-2xl rounded-2xl overflow-hidden text-left relative z-10 border border-neutral-200">
          
          {/* Заголовок */}
          <div className="p-5 sm:p-6 border-b border-neutral-100 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900 uppercase tracking-tight">
                  Оформлення замовлення
                </h3>
                <p className="text-xs text-neutral-500">
                  SL Collection • Прямий зв'язок
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 sm:p-7 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* Підсумок замовлених товарів */}
            <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-200/70">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-neutral-200/60">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Ваші товари ({totalItemsCount} шт.)
                </span>
                <span className="text-sm font-extrabold text-neutral-900">
                  {totalAmount.toLocaleString('uk-UA')} ₴
                </span>
              </div>

              <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 text-xs">
                    <div className="w-12 h-14 rounded-md overflow-hidden bg-neutral-200 flex-shrink-0">
                      <ProductImage
                        photoName={item.product.photoName}
                        primarySrc={item.product.primaryImage}
                        fallbackSrc={item.product.fallbackImage}
                        alt={item.product.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-neutral-900 truncate">{item.product.name}</p>
                      <p className="text-neutral-500 mt-0.5">
                        {item.selectedColor} • Розмір: {item.selectedSize} • {item.quantity} шт.
                      </p>
                    </div>
                    <div className="text-right font-bold text-neutral-900">
                      {(item.product.price * item.quantity).toLocaleString('uk-UA')} ₴
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-200/60 flex items-center justify-between">
                <span className="text-sm font-bold text-neutral-800">Разом до сплати:</span>
                <span className="text-2xl font-black text-neutral-900">
                  {totalAmount.toLocaleString('uk-UA')} ₴
                </span>
              </div>
            </div>

            {/* Блок з обов'язковими контактними даними відповідно до вимог */}
            <div className="bg-neutral-900 text-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-base sm:text-lg font-bold tracking-tight text-white mb-2">
                Для оформлення замовлення зв'яжіться зі мною:
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 mb-6 leading-relaxed">
                Повідомте обрані позиції, розміри та зручний спосіб доставки для підтвердження замовлення.
              </p>

              <div className="space-y-3">
                {/* Телефон */}
                <div className="bg-neutral-800/80 border border-neutral-700 rounded-xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-neutral-400 block uppercase tracking-wider font-semibold">
                        Телефон
                      </span>
                      <a
                        href={`tel:${phoneTel}`}
                        className="text-base sm:text-lg font-bold text-white hover:text-neutral-200 transition-colors"
                      >
                        {phoneNumber}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleCopyPhone}
                      className="px-3 py-1.5 bg-neutral-700 hover:bg-neutral-600 text-xs font-medium rounded-lg text-white transition-colors flex items-center gap-1"
                    >
                      {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedPhone ? 'Скопійовано' : 'Копіювати'}</span>
                    </button>
                    <a
                      href={`tel:${phoneTel}`}
                      className="px-3 py-1.5 bg-white text-neutral-900 hover:bg-neutral-100 text-xs font-bold rounded-lg transition-colors"
                    >
                      Дзвінок
                    </a>
                  </div>
                </div>

                {/* Telegram */}
                <div className="bg-neutral-800/80 border border-neutral-700 rounded-xl p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#2AABEE]/20 flex items-center justify-center text-[#2AABEE]">
                      <Send className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] text-neutral-400 block uppercase tracking-wider font-semibold">
                        Telegram
                      </span>
                      <span className="text-base sm:text-lg font-bold text-white">
                        097 339 75 76
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleOpenTelegram}
                    className="px-4 py-2 bg-[#2AABEE] hover:bg-[#229ED9] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-[#2AABEE]/20 cursor-pointer"
                  >
                    <span>Написати</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Швидке копіювання замовлення для месенджера */}
              <div className="mt-5 pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-neutral-400 text-center sm:text-left">
                  Скопіюйте список товарів одним кліком для відправки:
                </span>
                <button
                  onClick={handleCopyOrder}
                  className="w-full sm:w-auto px-3.5 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-neutral-700"
                >
                  {copiedOrder ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300">Текст замовлення скопійовано!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Скопіювати деталі замовлення</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Додаткові поля для зручності (за бажанням клієнта) */}
            <div className="border-t border-neutral-100 pt-4">
              <p className="text-xs text-neutral-500 mb-3">
                Ви також можете вказати ваше ім'я та місто, щоб вони додалися до тексту замовлення:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Ваше ім'я"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900"
                />
                <input
                  type="text"
                  placeholder="Місто доставки (Нова Пошта)"
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-900"
                />
              </div>
            </div>

          </div>

          {/* Футер модального вікна */}
          <div className="p-4 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
            <span>SL Collection • Жіночий одяг преміум якості</span>
            <button
              onClick={onClose}
              className="text-neutral-800 font-semibold hover:underline"
            >
              Закрити
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
