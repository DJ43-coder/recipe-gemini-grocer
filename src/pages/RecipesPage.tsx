import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cart } from "@/components/Cart";
import { RecipeButton } from "@/components/RecipeButton";
import { ChatBot } from "@/components/ChatBot";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Recipe, RecipeIngredient } from "@/services/geminiService";
import { ArrowLeft, Plus, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const RecipesPage = () => {
  const navigate = useNavigate();
  const { isOpen: isCartOpen, addToCart } = useCartStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<Array<Recipe & { id: string, imageUrl: string }>>([
    {
      id: "1",
      name: "Butter Chicken",
      prepTime: "30 mins + 25 mins",
      difficulty: "Medium",
      servings: 4,
      imageUrl: "https://source.unsplash.com/random/300x200/?butter-chicken",
      instructions: [
        "Marinate chicken with yogurt, ginger, garlic, and spices for 1 hour.",
        "In a pan, heat butter and cook onions until golden brown.",
        "Add tomato puree and cook for 5 minutes.",
        "Add marinated chicken and cook until done.",
        "Stir in cream and simmer for 5 minutes."
      ],
      ingredients: [
        { name: "Chicken breast", quantity: "500 g", price: 150 },
        { name: "Tomato puree", quantity: "1 cup", price: 50 },
        { name: "Heavy cream", quantity: "0.5 cup", price: 50 },
        { name: "Butter", quantity: "2 tbsp", price: 50 },
        { name: "Garam masala", quantity: "1 tbsp", price: 50 },
        { name: "Ginger paste", quantity: "1 tbsp", price: 50 },
        { name: "Garlic paste", quantity: "1 tbsp", price: 50 }
      ],
      totalPrice: 450
    },
    {
      id: "2",
      name: "Palak Paneer",
      prepTime: "45 mins",
      difficulty: "Easy",
      servings: 4,
      imageUrl: "https://source.unsplash.com/random/300x200/?paneer",
      instructions: [
        "Blanch spinach leaves in hot water for 2-3 minutes.",
        "Blend the blanched spinach to make a puree.",
        "Saute cubed paneer until golden brown.",
        "In a separate pan, cook onions, ginger, and garlic until fragrant.",
        "Add spinach puree and spices, then simmer for 10 minutes.",
        "Add the paneer and cream, then cook for another 5 minutes."
      ],
      ingredients: [
        { name: "Spinach", quantity: "500 g", price: 60 },
        { name: "Paneer", quantity: "250 g", price: 120 },
        { name: "Onion", quantity: "1 medium", price: 20 },
        { name: "Ginger", quantity: "1 inch", price: 10 },
        { name: "Garlic", quantity: "4 cloves", price: 10 },
        { name: "Cream", quantity: "100 ml", price: 40 },
        { name: "Garam masala", quantity: "1 tsp", price: 10 }
      ],
      totalPrice: 270
    },
    {
      id: "3",
      name: "Vegetable Biryani",
      prepTime: "60 mins",
      difficulty: "Medium",
      servings: 6,
      imageUrl: "https://source.unsplash.com/random/300x200/?biryani",
      instructions: [
        "Soak basmati rice for 30 minutes, then partially cook it.",
        "In a separate pot, sauté onions until golden brown.",
        "Add vegetables and spices, cook for 10 minutes.",
        "Layer the partially cooked rice over the vegetable mixture.",
        "Cover and cook on low heat for 20 minutes.",
        "Garnish with fresh coriander and fried onions."
      ],
      ingredients: [
        { name: "Basmati rice", quantity: "2 cups", price: 120 },
        { name: "Mixed vegetables", quantity: "3 cups", price: 100 },
        { name: "Onions", quantity: "2 large", price: 40 },
        { name: "Ginger-garlic paste", quantity: "2 tbsp", price: 20 },
        { name: "Biryani masala", quantity: "2 tbsp", price: 30 },
        { name: "Coriander leaves", quantity: "1/2 cup", price: 20 },
        { name: "Ghee", quantity: "3 tbsp", price: 40 }
      ],
      totalPrice: 370
    }
  ]);
  
  useEffect(() => {
    const storedRecipes = localStorage.getItem('savedRecipes');
    if (storedRecipes) {
      try {
        const parsedRecipes = JSON.parse(storedRecipes);
        setSavedRecipes(prevRecipes => {
          const existingIds = new Set(prevRecipes.map(r => r.id));
          const newRecipes = parsedRecipes.filter((r: any) => !existingIds.has(r.id));
          return [...prevRecipes, ...newRecipes];
        });
      } catch (e) {
        console.error("Failed to parse saved recipes:", e);
      }
    }
  }, []);
  
  const saveRecipe = (recipe: Recipe) => {
    const recipeWithId = {
      ...recipe,
      id: Date.now().toString(),
      imageUrl: `https://source.unsplash.com/random/300x200/?${recipe.name.toLowerCase().replace(/\s+/g, '-')}`
    };
    
    const updatedRecipes = [...savedRecipes, recipeWithId];
    setSavedRecipes(updatedRecipes);
    
    localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
    
    toast.success("Recipe saved successfully!");
  };
  
  const handleViewRecipe = (recipe: typeof savedRecipes[0]) => {
    setSelectedRecipe(recipe);
  };
  
  const handleAddIngredientToCart = (ingredient: RecipeIngredient) => {
    const product = {
      id: `ing-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: ingredient.name,
      price: ingredient.price,
      image: `https://source.unsplash.com/random/100x100/?${ingredient.name.toLowerCase().replace(/\s+/g, '-')}`,
      category: "Recipe Ingredients",
      unit: ingredient.quantity,
      popular: false
    };
    
    addToCart(product);
    toast.success(`Added ${ingredient.name} to cart`);
  };
  
  const handleAddAllIngredientsToCart = (ingredients: RecipeIngredient[]) => {
    ingredients.forEach(ingredient => {
      handleAddIngredientToCart(ingredient);
    });
    
    toast.success("All ingredients added to cart");
  };
  
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
          <h1 className="text-2xl font-bold">My Recipes</h1>
        </div>
        
        <Tabs defaultValue="saved" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="saved">Saved Recipes</TabsTrigger>
            <TabsTrigger value="view">View Recipe</TabsTrigger>
          </TabsList>
          
          <TabsContent value="saved">
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
                        onClick={() => handleViewRecipe(recipe)}
                      >
                        View Recipe
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="view">
            {selectedRecipe ? (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedRecipe.name}</h2>
                    <div className="flex flex-wrap gap-3">
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">{selectedRecipe.prepTime}</span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">{selectedRecipe.difficulty}</span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">Serves {selectedRecipe.servings}</span>
                    </div>
                  </div>
                  <Button 
                    className="bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => handleAddAllIngredientsToCart(selectedRecipe.ingredients)}
                  >
                    Add All Ingredients to Cart
                  </Button>
                </div>
                
                <div className="md:flex gap-8">
                  <div className="md:w-1/2 mb-6 md:mb-0">
                    <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                    <div className="space-y-3">
                      {selectedRecipe.ingredients.map((ingredient, idx) => (
                        <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <div>
                            <span className="font-medium">{ingredient.name}</span>
                            <span className="text-sm text-gray-500 ml-2">({ingredient.quantity})</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-green-600 font-medium">₹{ingredient.price}</span>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="h-8 w-8 p-0"
                              onClick={() => handleAddIngredientToCart(ingredient)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-between items-center p-3 bg-green-50 rounded">
                      <span className="font-semibold">Total Cost</span>
                      <span className="text-green-700 font-bold">₹{selectedRecipe.totalPrice}</span>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2">
                    <h3 className="text-xl font-semibold mb-4">Instructions</h3>
                    <ol className="list-decimal list-inside space-y-3">
                      {selectedRecipe.instructions.map((step, idx) => (
                        <li key={idx} className="p-2 bg-gray-50 rounded">{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Select a recipe to view details</p>
                <Button 
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => document.querySelector('[data-value="saved"]')?.click()}
                >
                  Browse Recipes
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
      
      {isCartOpen && <Cart />}
      
      <RecipeButton />
      
      <ChatBot />
    </div>
  );
};

export default RecipesPage;
