
import { create } from 'zustand';
import { Product } from '@/data/products';
import { orderService } from '@/services/orderService';

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  syncWithBackend: () => Promise<void>;
  loadFromBackend: () => Promise<void>;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  
  addToCart: async (product) => {
    const { items } = get();
    const itemExists = items.find(item => item.id === product.id);
    
    const newQuantity = itemExists ? itemExists.quantity + 1 : 1;
    
    if (itemExists) {
      set({
        items: items.map(item => 
          item.id === product.id 
            ? { ...item, quantity: newQuantity } 
            : item
        )
      });
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] });
    }

    // Sync with backend
    try {
      await orderService.updateCart(product.id, newQuantity);
    } catch (error) {
      console.error('Failed to sync cart with backend:', error);
    }
  },
  
  removeFromCart: async (productId) => {
    const { items } = get();
    set({ items: items.filter(item => item.id !== productId) });

    try {
      await orderService.updateCart(productId, 0);
    } catch (error) {
      console.error('Failed to sync cart with backend:', error);
    }
  },
  
  updateQuantity: async (productId, quantity) => {
    const { items } = get();
    if (quantity <= 0) {
      set({ items: items.filter(item => item.id !== productId) });
    } else {
      set({
        items: items.map(item => 
          item.id === productId ? { ...item, quantity } : item
        )
      });
    }

    try {
      await orderService.updateCart(productId, quantity);
    } catch (error) {
      console.error('Failed to sync cart with backend:', error);
    }
  },
  
  clearCart: async () => {
    set({ items: [] });
    try {
      await orderService.clearCart();
    } catch (error) {
      console.error('Failed to clear cart on backend:', error);
    }
  },
  
  getTotalItems: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.quantity, 0);
  },
  
  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  syncWithBackend: async () => {
    const { items } = get();
    try {
      for (const item of items) {
        await orderService.updateCart(item.id, item.quantity);
      }
    } catch (error) {
      console.error('Failed to sync cart with backend:', error);
    }
  },

  loadFromBackend: async () => {
    try {
      const cartItems = await orderService.getCart();
      const items: CartItem[] = cartItems.map(item => ({
        id: item.product_id,
        name: item.name,
        price: Number(item.price),
        unit: item.unit,
        image: item.image,
        category: item.category,
        quantity: item.quantity,
      }));
      set({ items });
    } catch (error) {
      console.error('Failed to load cart from backend:', error);
    }
  },
}));
