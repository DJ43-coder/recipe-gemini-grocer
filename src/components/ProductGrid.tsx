
import { useProductStore } from "@/store/productStore";
import { ProductCard } from "@/components/ProductCard";

export function ProductGrid() {
  const { selectedCategory, getFilteredProducts } = useProductStore();
  const products = getFilteredProducts();
  
  const categoryTitle = selectedCategory === 'All' ? 'All Products' : `${selectedCategory}`;
  
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold mb-6">{categoryTitle}</h2>
      
      {products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No products found. Try a different search or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
