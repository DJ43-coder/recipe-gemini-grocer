import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CheckoutDialog } from "./CheckoutDialog";

export function Cart() {
  const { 
    items, 
    isOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice 
  } = useCartStore();
  
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  
  if (!isOpen) return null;
  
  const totalPrice = getTotalPrice();
  
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
        <div className="bg-white w-full max-w-md h-full flex flex-col animate-slide-in-right">
          <div className="bg-green-500 text-white p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={closeCart}
              className="text-white hover:bg-green-600"
            >
              <X size={20} />
            </Button>
          </div>
          
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6">
              <ShoppingBag size={64} className="text-gray-300 mb-4" />
              <p className="text-xl font-medium text-gray-400">Your cart is empty</p>
            </div>
          ) : (
            <div className="flex-1 overflow-auto p-4">
              {items.map((item) => (
                <div key={item.id} className="py-3">
                  <div className="flex items-center mb-2">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-md mr-3"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.unit}</p>
                      <p className="font-semibold text-green-600">₹{item.price.toFixed(2)}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-gray-400 hover:text-red-500"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex items-center border rounded-md ml-auto">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus size={14} />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </Button>
                    </div>
                  </div>
                  <Separator className="mt-3" />
                </div>
              ))}
            </div>
          )}
          
          <div className="border-t p-4">
            <div className="flex justify-between font-bold mb-4">
              <span>Total:</span>
              <span className="text-green-600">₹{totalPrice.toFixed(2)}</span>
            </div>
            
            <Button 
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              disabled={items.length === 0}
              onClick={() => setCheckoutOpen(true)}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>

      <CheckoutDialog 
        open={checkoutOpen} 
        onOpenChange={setCheckoutOpen}
      />
    </>
  );
}
