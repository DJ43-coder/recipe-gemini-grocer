
import { create } from 'zustand';
import { products as initialProducts } from '@/data/products';

interface ProductStore {
  products: typeof initialProducts;
  selectedCategory: string;
  searchQuery: string;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  getFilteredProducts: () => typeof initialProducts;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: initialProducts,
  selectedCategory: 'All',
  searchQuery: '',
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  getFilteredProducts: () => {
    const { products, selectedCategory, searchQuery } = get();
    
    return products
      .filter(product => 
        selectedCategory === 'All' || product.category === selectedCategory
      )
      .filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }
}));
