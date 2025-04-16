
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cart } from "@/components/Cart";
import { RecipeButton } from "@/components/RecipeButton";
import { ChatBot } from "@/components/ChatBot";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleNoApiKey } from "@/services/geminiService";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecipesPage = () => {
  const navigate = useNavigate();
  const { isOpen: isCartOpen } = useCartStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [savedRecipes, setSavedRecipes] = useState([
    {
      id: "1",
      name: "Butter Chicken",
      prepTime: "30 mins + 25 mins",
      difficulty: "Medium",
      imageUrl: "https://source.unsplash.com/random/300x200/?butter-chicken"
    },
    {
      id: "2",
      name: "Palak Paneer",
      prepTime: "45 mins",
      difficulty: "Easy",
      imageUrl: "https://source.unsplash.com/random/300x200/?paneer"
    },
    {
      id: "3",
      name: "Vegetable Biryani",
      prepTime: "60 mins",
      difficulty: "Medium",
      imageUrl: "https://source.unsplash.com/random/300x200/?biryani"
    }
  ]);
  
  const filteredRecipes = savedRecipes.filter(
    recipe => recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            className="mr-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
          <h1 className="text-2xl font-bold">My Saved Recipes</h1>
        </div>
        
        <div className="mb-6 max-w-md">
          <Input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No saved recipes found.</p>
            <Button 
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={() => setSearchQuery("")}
            >
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map(recipe => (
              <div 
                key={recipe.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={recipe.imageUrl} 
                    alt={recipe.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{recipe.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <span className="mr-4">{recipe.prepTime}</span>
                    <span>{recipe.difficulty}</span>
                  </div>
                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                  >
                    View Recipe
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
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

export default RecipesPage;
