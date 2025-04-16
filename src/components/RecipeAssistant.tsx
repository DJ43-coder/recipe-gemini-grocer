
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Clock, Users, ChefHat, Bookmark, ShoppingCart } from "lucide-react";
import { generateRecipe, handleNoApiKey, Recipe } from "@/services/geminiService";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store/cartStore";
import { products } from "@/data/products";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface RecipeAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RecipeAssistant({ isOpen, onClose }: RecipeAssistantProps) {
  const navigate = useNavigate();
  const [dishName, setDishName] = useState("");
  const [servings, setServings] = useState(4);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { addToCart } = useCartStore();
  
  const handleGenerateRecipe = async () => {
    if (!dishName.trim()) {
      setError("Please enter a dish name");
      return;
    }
    
    setIsLoading(true);
    setError("");
    
    try {
      // Use the generateRecipe function with the updated API key and model
      const generatedRecipe = await generateRecipe(dishName, servings);
      setRecipe(generatedRecipe);
      toast.success("Recipe generated successfully!");
    } catch (err) {
      console.error("Error generating recipe:", err);
      setError(`Failed to generate recipe: ${err instanceof Error ? err.message : 'Unknown error'}`);
      
      // Fallback to the demo recipe if the API call fails
      try {
        const fallbackRecipe = await handleNoApiKey();
        setRecipe(fallbackRecipe);
        toast.info("Using demo recipe. Please check your API key for real results.");
      } catch (fallbackErr) {
        console.error("Fallback error:", fallbackErr);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddAllIngredients = () => {
    if (!recipe) return;
    
    // Find matching products in the store and add them to cart
    recipe.ingredients.forEach(ingredient => {
      const matchingProduct = products.find(p => 
        p.name.toLowerCase().includes(ingredient.name.toLowerCase())
      );
      
      if (matchingProduct) {
        addToCart(matchingProduct);
      } else {
        // Create a product from the ingredient
        const newProduct = {
          id: `ing-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          name: ingredient.name,
          price: ingredient.price,
          image: `https://source.unsplash.com/random/100x100/?${ingredient.name.toLowerCase().replace(/\s+/g, '-')}`,
          category: "Recipe Ingredients",
          unit: ingredient.quantity,
          popular: false
        };
        addToCart(newProduct);
      }
    });
    
    toast.success("All ingredients added to cart!");
    // Close the recipe assistant
    onClose();
  };
  
  const handleSaveRecipe = () => {
    if (!recipe) return;
    
    // Get existing saved recipes
    const existingRecipesJson = localStorage.getItem('savedRecipes');
    let existingRecipes = [];
    
    if (existingRecipesJson) {
      try {
        existingRecipes = JSON.parse(existingRecipesJson);
      } catch (e) {
        console.error("Failed to parse saved recipes:", e);
      }
    }
    
    // Create a new recipe object with an ID and image
    const recipeToSave = {
      ...recipe,
      id: Date.now().toString(),
      imageUrl: `https://source.unsplash.com/random/300x200/?${recipe.name.toLowerCase().replace(/\s+/g, '-')}`
    };
    
    // Add the new recipe
    const updatedRecipes = [...existingRecipes, recipeToSave];
    
    // Save to localStorage
    localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
    
    toast.success("Recipe saved successfully!");
    
    // Optionally navigate to recipes page
    onClose();
    navigate('/recipes');
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-lg overflow-hidden animate-scale-in">
        <div className="bg-green-500 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">AI Recipe Assistant</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="text-white hover:bg-green-600"
          >
            <X size={20} />
          </Button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-64px)]">
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 text-lg">
              Tell me what dish you'd like to make and for how many people:
            </label>
            <Input
              type="text"
              placeholder="e.g. butter chicken, pasta carbonara, vegetable biryani"
              className="w-full mb-4"
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
            />
            
            <div className="flex items-center mb-4">
              <label className="text-gray-700 mr-4">Servings:</label>
              <Input
                type="number"
                min="1"
                max="10"
                className="w-20"
                value={servings}
                onChange={(e) => setServings(parseInt(e.target.value) || 1)}
              />
            </div>
            
            <Button 
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              onClick={handleGenerateRecipe}
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Recipe"}
            </Button>
            
            {error && <p className="mt-2 text-red-500">{error}</p>}
          </div>
          
          {recipe && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold mb-4">{recipe.name}</h2>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{recipe.prepTime}</span>
                </div>
                <div className="flex items-center text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  <ChefHat className="h-4 w-4 mr-1" />
                  <span>{recipe.difficulty}</span>
                </div>
                <div className="flex items-center text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{recipe.servings} servings</span>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <h3 className="text-xl font-semibold mb-4">Ingredients (₹{recipe.totalPrice.toFixed(2)})</h3>
              <div className="space-y-3 mb-6">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-800">{ingredient.name}</span>
                    <div className="flex items-center">
                      <span className="text-gray-600 mr-4">{ingredient.quantity}</span>
                      <span className="text-green-600 font-semibold w-20 text-right">₹{ingredient.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <h3 className="text-xl font-semibold mb-4">Instructions</h3>
              <ol className="list-decimal list-inside space-y-3 mb-8">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="text-gray-800">
                    {step}
                  </li>
                ))}
              </ol>
              
              <div className="flex gap-4 mt-4">
                <Button 
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                  onClick={handleAddAllIngredients}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add All Ingredients to Cart
                </Button>
                
                <Button 
                  variant="outline"
                  className="flex-1"
                  onClick={handleSaveRecipe}
                >
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save Recipe
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
