
import { create } from 'zustand';
import { products as initialProducts, categories as initialCategories } from '@/data/products';

interface ProductStore {
  products: typeof initialProducts;
  categories: typeof initialCategories;
  selectedCategory: string;
  searchQuery: string;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  getFilteredProducts: () => typeof initialProducts;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: initialProducts,
  categories: initialCategories,
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
