export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  photoNumber: number; // 1 to 15
  photoName: string; // e.g. IMG_9879.jpeg
  name: string;
  price: number; // in UAH (грн)
  category: 'sets' | 'jackets' | 'tops';
  categoryLabel: string;
  colors: ProductColor[];
  primaryImage: string;
  fallbackImage: string;
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL')[];
  description: string;
  fabric: string;
  fit: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  id: string; // product id + color + size
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export type ActiveNavTab = 'home' | 'new-in' | 'sets' | 'jackets' | 'tops' | 'catalog' | 'contacts';
