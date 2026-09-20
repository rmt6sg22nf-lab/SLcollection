import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (product: Product) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF9F6] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-current" />
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase font-display text-neutral-900">
                SAVED FAVORITES ({wishlistProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-black transition-colors rounded-xs"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-neutral-200">
            {wishlistProducts.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto text-rose-400">
                  <Heart className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-base font-bold font-display uppercase tracking-wider text-neutral-900">
                  NO SAVED PIECES YET
                </h3>
                <p className="text-xs text-neutral-500 font-light max-w-xs mx-auto">
                  Click the heart icon on any garment to curate your personal wish list.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#121212] text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-neutral-800 transition-colors inline-block"
                >
                  DISCOVER NEW ARRIVALS
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div key={product.id} className="py-4 flex gap-4 items-start">
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    className="w-20 h-24 object-cover object-center bg-neutral-200 flex-shrink-0"
                  />
                  <div className="flex-grow space-y-1">
                    <div className="flex items-start justify-between">
                      <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">
                        {product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveWishlist(product)}
                        className="text-neutral-400 hover:text-rose-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs font-bold font-display text-neutral-950">
                      ${product.price}.00
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={() => {
                          onAddToCart(
                            product,
                            product.colors[0]?.name || 'Standard',
                            product.sizes[0] || 'S'
                          );
                        }}
                        className="w-full py-2 bg-[#121212] text-white hover:bg-neutral-800 text-[10px] font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        MOVE TO BAG
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Bar */}
          {wishlistProducts.length > 0 && (
            <div className="p-6 bg-white border-t border-neutral-200">
              <button
                onClick={() => {
                  wishlistProducts.forEach((p) => {
                    onAddToCart(p, p.colors[0]?.name || 'Standard', p.sizes[0] || 'S');
                  });
                }}
                className="w-full py-3.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold tracking-[0.2em] uppercase transition-colors"
              >
                MOVE ALL TO SHOPPING BAG
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
