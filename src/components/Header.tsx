
import { MapPin, Search, ShoppingCart, LogOut, Package, Home, ChefHat, Shield } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useProductStore } from "@/store/productStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocation } from "@/hooks/useLocation";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useLocation as useRouterLocation } from "react-router-dom";

export function Header() {
  const { openCart, getTotalItems } = useCartStore();
  const { searchQuery, setSearchQuery } = useProductStore();
  const { logout, user } = useAuth();
  const cartItemCount = getTotalItems();
  const { address, loading, error } = useLocation();
  const navigate = useNavigate();
  const location = useRouterLocation();
  
  const isAdmin = user?.role === 'admin';
  
  return (
    <header className="bg-white p-4 shadow-sm">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          <div className="flex items-center mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-green-600 cursor-pointer" onClick={() => navigate('/')}>
              GroceryScout
            </h1>
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
            <MapPin size={18} className="text-green-500 flex-shrink-0" />
            <div className="max-w-[250px] truncate">
              {loading ? (
                <Skeleton className="h-4 w-[150px]" />
              ) : error ? (
                <span className="text-sm text-red-500">Location unavailable</span>
              ) : (
                <span className="text-sm" title={address}>
                  {address}
                </span>
              )}
            </div>
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
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={logout}
            title="Logout"
          >
            <LogOut size={20} />
          </Button>
        </div>
        </div>
        
        <nav className="flex items-center gap-2 border-t pt-4">
          <Button 
            variant={location.pathname === '/' ? 'default' : 'ghost'}
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <Home size={18} />
            <span>Home</span>
          </Button>
          <Button 
            variant={location.pathname === '/recipes' ? 'default' : 'ghost'}
            onClick={() => navigate('/recipes')}
            className="gap-2"
          >
            <ChefHat size={18} />
            <span>Recipes</span>
          </Button>
          <Button 
            variant={location.pathname === '/orders' ? 'default' : 'ghost'}
            onClick={() => navigate('/orders')}
            className="gap-2"
          >
            <Package size={18} />
            <span>My Orders</span>
          </Button>
          {isAdmin && (
            <Button 
              variant={location.pathname === '/admin' ? 'default' : 'ghost'}
              onClick={() => navigate('/admin')}
              className="gap-2"
            >
              <Shield size={18} />
              <span>Admin</span>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
