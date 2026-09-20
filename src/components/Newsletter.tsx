import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
    }
  };

  return (
    <section className="py-20 sm:py-24 bg-[#111111] text-[#FAF9F6] relative overflow-hidden" id="newsletter-section">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/15 rounded-full text-xs font-semibold tracking-wider uppercase text-amber-300 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>СПІЛЬНОТА БРЕНДУ</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif text-white mb-3">
          Приєднуйтесь до SL Collection
        </h2>
        
        <p className="text-neutral-400 text-sm sm:text-base font-normal max-w-lg mx-auto mb-8 leading-relaxed">
          Дізнавайтесь першими про надходження нових колекцій, обмежені серії та закриті сезонні пропозиції.
        </p>

        {isSubscribed ? (
          <div className="p-6 sm:p-8 bg-neutral-900 border border-neutral-700 max-w-md mx-auto rounded-2xl text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-950 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">
              Дякуємо за підписку!
            </h3>
            <p className="text-xs text-neutral-300">
              Ми надіслали підтвердження на <span className="text-white font-mono">{email}</span>.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-3"
            id="newsletter-form"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введіть ваш Email..."
              className="flex-grow bg-neutral-900/90 border border-neutral-700 focus:border-white px-4 py-3.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none transition-all rounded-xl"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-bold uppercase tracking-wider transition-all rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Підписатися</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

      </div>
    </section>
  );
};
