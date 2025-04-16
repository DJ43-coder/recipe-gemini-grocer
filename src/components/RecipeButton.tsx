
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChefHat } from "lucide-react";
import { RecipeAssistant } from "@/components/RecipeAssistant";

export function RecipeButton() {
  const [isRecipeAssistantOpen, setIsRecipeAssistantOpen] = useState(false);
  
  return (
    <>
      <Button
        className="fixed bottom-20 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg"
        onClick={() => setIsRecipeAssistantOpen(true)}
      >
        <ChefHat size={24} />
      </Button>
      
      <RecipeAssistant 
        isOpen={isRecipeAssistantOpen} 
        onClose={() => setIsRecipeAssistantOpen(false)} 
      />
    </>
  );
}
