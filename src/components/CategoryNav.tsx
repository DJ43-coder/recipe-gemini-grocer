
import { useProductStore } from "@/store/productStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CategoryNav() {
  const { categories, selectedCategory, setSelectedCategory } = useProductStore();
  
  return (
    <nav className="bg-white border-b border-gray-200 py-3 sticky top-0 z-10">
      <div className="container mx-auto overflow-x-auto">
        <ul className="flex space-x-2 min-w-max">
          {categories.map((category) => (
            <li key={category}>
              <Button
                variant="ghost"
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium",
                  selectedCategory === category 
                    ? "bg-green-500 text-white hover:bg-green-600" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
