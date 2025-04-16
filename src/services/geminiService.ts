
import { GoogleGenerativeAI } from "@google/generative-ai";

// Use the provided API key
const API_KEY = "AIzaSyD-dbOMgzALwH8mXvUvOJPLXjLElMTcQAU"; 

// Initialize the Gemini API
const getGenAI = () => {
  if (!API_KEY) {
    throw new Error("Please set your Gemini API key in geminiService.ts");
  }
  return new GoogleGenerativeAI(API_KEY);
};

export interface RecipeIngredient {
  name: string;
  quantity: string;
  price: number;
}

export interface Recipe {
  name: string;
  prepTime: string;
  difficulty: string;
  servings: number;
  ingredients: RecipeIngredient[];
  instructions: string[];
  totalPrice: number;
}

export async function generateRecipe(dishName: string, servings: number): Promise<Recipe> {
  try {
    const genAI = getGenAI();
    // Use the gemini-2.0-flash model as specified
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    
    const prompt = `
      Generate a detailed recipe for ${dishName} that serves ${servings} people.
      Format the response as a JSON object with the following structure:
      {
        "name": "Recipe Name",
        "prepTime": "30 mins + 25 mins",
        "difficulty": "Medium/Easy/Hard",
        "servings": ${servings},
        "ingredients": [
          {"name": "ingredient name", "quantity": "quantity with units"},
          ...
        ],
        "instructions": [
          "Step 1 instruction",
          "Step 2 instruction",
          ...
        ]
      }
      
      Only include the JSON in your response, no other text.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log("Raw Gemini response:", text);
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) {
      throw new Error("Could not extract JSON from the response");
    }
    
    const recipeData = JSON.parse(jsonMatch[0]);
    
    // Assign random prices to ingredients
    const ingredients = recipeData.ingredients.map((ingredient: any) => ({
      ...ingredient,
      price: Math.floor(Math.random() * 100) + 20 // Random price between 20-120
    }));
    
    // Calculate total price
    const totalPrice = ingredients.reduce((total: number, ing: RecipeIngredient) => total + ing.price, 0);
    
    return {
      ...recipeData,
      ingredients,
      totalPrice
    };
    
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error(`Failed to generate recipe: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function handleNoApiKey(): Promise<Recipe> {
  // Fallback recipe when API key is not available
  return {
    name: "Butter Chicken",
    prepTime: "30 mins + 25 mins",
    difficulty: "Medium",
    servings: 4,
    ingredients: [
      { name: "Chicken breast", quantity: "500 g", price: 150 },
      { name: "Tomato puree", quantity: "1 cup", price: 50 },
      { name: "Heavy cream", quantity: "0.5 cup", price: 50 },
      { name: "Butter", quantity: "2 tbsp", price: 50 },
      { name: "Garam masala", quantity: "1 tbsp", price: 50 },
      { name: "Ginger paste", quantity: "1 tbsp", price: 50 },
      { name: "Garlic paste", quantity: "1 tbsp", price: 50 }
    ],
    instructions: [
      "Marinate chicken with yogurt, ginger, garlic, and spices for 1 hour.",
      "In a pan, heat butter and cook onions until golden brown.",
      "Add tomato puree and cook for 5 minutes.",
      "Add marinated chicken and cook until done.",
      "Stir in cream and simmer for 5 minutes."
    ],
    totalPrice: 450
  };
}
