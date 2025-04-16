
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { CategoryNav } from "@/components/CategoryNav";
import { ProductGrid } from "@/components/ProductGrid";
import { Cart } from "@/components/Cart";
import { Footer } from "@/components/Footer";
import { RecipeButton } from "@/components/RecipeButton";
import { ChatBot } from "@/components/ChatBot";
import { useCartStore } from "@/store/cartStore";

// Add Zustand dependency
import { create } from "zustand";

const Index = () => {
  const { isOpen: isCartOpen } = useCartStore();
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-2 animate-pulse">GroceryScout</h1>
          <p className="text-gray-600">Loading your AI grocery experience...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <CategoryNav />
      
      <main className="flex-1">
        <ProductGrid />
      </main>
      
      <Footer />
      
      {/* Cart Overlay */}
      {isCartOpen && <Cart />}
      
      {/* Recipe Assistant Button */}
      <RecipeButton />
      
      {/* Chat Bot */}
      <ChatBot />
    </div>
  );
};

export default Index;
