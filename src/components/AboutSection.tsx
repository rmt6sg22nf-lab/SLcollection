import React from 'react';
import { Sparkles, Feather, Compass, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 bg-[#F5F3EF] border-t border-neutral-200/80 relative overflow-hidden" id="about-section">
      {/* Водяний знак SL */}
      <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] text-[260px] font-black font-serif leading-none text-neutral-900">
        SL
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Фотографії зліва */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-neutral-200 overflow-hidden rounded-2xl shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=85"
                  alt="SL Collection одяг"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 bg-white/80 rounded-2xl border border-neutral-200 text-center">
                <span className="text-[10px] tracking-widest uppercase text-neutral-400 block">ФІЛОСОФІЯ</span>
                <span className="font-bold text-xs text-neutral-900">Елегантність та спорт</span>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="p-4 bg-neutral-950 text-white rounded-2xl text-center">
                <span className="text-[10px] tracking-widest uppercase text-neutral-400 block">ПРЕМІУМ</span>
                <span className="font-serif italic text-xs text-amber-200">Бездоганний крій</span>
              </div>
              <div className="aspect-[3/4] bg-neutral-200 overflow-hidden rounded-2xl shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=85"
                  alt="SL Collection стиль"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Опис бренду українською */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-900/5 border border-neutral-300 rounded-full text-xs font-semibold uppercase tracking-wider text-neutral-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>ПРО БРЕНД • ФІЛОСОФІЯ ТА ЯКІСТЬ</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-neutral-950 font-serif">
                SL Collection
              </h2>
              
              <p className="font-serif text-xl sm:text-2xl italic text-neutral-800 leading-snug border-l-3 border-neutral-950 pl-5 py-1">
                «SL Collection — сучасний бренд жіночого одягу, створений для впевнених жінок, які поєднують стиль, комфорт та індивідуальність.»
              </p>
            </div>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
              Ми створюємо одяг, у якому кожна жінка відчуває себе невимушено та впевнено в будь-якому ритмі дня: від ранкової кави та ділових зустрічей до вечірніх прогулянок і подорожей. Наші моделі поєднують розкішний мінімалізм, приємні до тіла натуральні тканини та актуальний міський силует.
            </p>

            {/* 3 переваги */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-300">
              <div className="space-y-1.5">
                <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-900 shadow-2xs">
                  <Feather className="w-4 h-4 text-amber-700" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  М'якість та комфорт
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Натуральна бавовна, вовна та преміальний турецький трикотаж.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-900 shadow-2xs">
                  <Compass className="w-4 h-4 text-neutral-800" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Універсальний крій
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Продумана посадка для підкреслення жіночності без обмеження рухів.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-neutral-900 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Контроль якості
                </h4>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Ретельна перевірка кожного шва, фурнітури та тканини перед відправкою.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
