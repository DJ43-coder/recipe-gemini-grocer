
import { ShoppingCart, Search, MapPin } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useProductStore } from "@/store/productStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  const { openCart, getTotalItems } = useCartStore();
  const { searchQuery, setSearchQuery } = useProductStore();
  const cartItemCount = getTotalItems();
  
  return (
    <header className="bg-white p-4 shadow-sm">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-green-600">GroceryScout</h1>
          <p className="ml-4 text-sm text-gray-500">Your AI-Powered Grocery Assistant</p>
        </div>
        
        <div className="flex items-center w-full md:w-auto space-x-4">
          <div className="relative flex-grow md:w-80">
            <Input
              type="text"
              placeholder="Search for groceries..."
              className="w-full pl-3 pr-10 py-2 border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 h-full text-gray-400 hover:text-gray-600"
            >
              <Search size={18} />
            </Button>
          </div>
          
          <div className="flex items-center space-x-2 text-gray-700">
            <MapPin size={18} className="text-green-500" />
            <span className="hidden md:inline">Mumbai</span>
          </div>
          
          <Button 
            variant="ghost" 
            size="icon"
            className="relative" 
            onClick={openCart}
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
