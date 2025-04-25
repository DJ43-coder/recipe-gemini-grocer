
import { create } from 'zustand';
import { products as initialProducts } from '@/data/products';

// Extract all unique categories from products
const extractCategories = (products: typeof initialProducts): string[] => {
  const categorySet = new Set<string>();
  products.forEach(product => categorySet.add(product.category));
  return ['All', ...Array.from(categorySet)];
};

interface ProductStore {
  products: typeof initialProducts;
  selectedCategory: string;
  searchQuery: string;
  setSelectedCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  getFilteredProducts: () => typeof initialProducts;
  categories: string[];
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: initialProducts,
  selectedCategory: 'All',
  searchQuery: '',
  categories: extractCategories(initialProducts),
  
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
