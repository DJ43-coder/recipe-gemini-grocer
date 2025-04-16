
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Fresh Tomatoes",
    category: "Fruits & Vegetables",
    price: 40.00,
    unit: "kg",
    image: "/lovable-uploads/e7562586-56fb-4b70-9798-6b4859961b89.png"
  },
  {
    id: "2",
    name: "Onions",
    category: "Fruits & Vegetables",
    price: 30.00,
    unit: "kg",
    image: "/lovable-uploads/e2372449-59c9-4c1f-a292-15da93e1f45f.png"
  },
  {
    id: "3",
    name: "Potatoes",
    category: "Fruits & Vegetables",
    price: 25.00,
    unit: "kg",
    image: "/lovable-uploads/f80a3b4d-e2fc-4cee-9902-c07fa513aadf.png"
  },
  {
    id: "4",
    name: "Amul Butter",
    category: "Dairy & Eggs",
    price: 55.00,
    unit: "100g",
    image: "/lovable-uploads/01d45f20-f168-4a58-83d7-ffda01cc1c20.png"
  },
  {
    id: "5",
    name: "Paneer",
    category: "Dairy & Eggs",
    price: 80.00,
    unit: "200g",
    image: "/lovable-uploads/15cfd47f-7a06-4c0f-b47f-a9d6ace8f0de.png"
  },
  {
    id: "6",
    name: "Amul Milk",
    category: "Dairy & Eggs",
    price: 60.00,
    unit: "1L",
    image: "/lovable-uploads/e39d7000-4aea-4e2e-a7df-f30d3d6f0355.png"
  },
  {
    id: "7",
    name: "Organic Turmeric Powder",
    category: "Spices & Masalas",
    price: 45.00,
    unit: "100g",
    image: "https://source.unsplash.com/random/300x200/?turmeric"
  },
  {
    id: "8",
    name: "Red Chilli Powder",
    category: "Spices & Masalas",
    price: 50.00,
    unit: "100g",
    image: "https://source.unsplash.com/random/300x200/?chilli"
  },
  {
    id: "9",
    name: "Garam Masala",
    category: "Spices & Masalas",
    price: 65.00,
    unit: "100g",
    image: "https://source.unsplash.com/random/300x200/?spice"
  },
  {
    id: "10",
    name: "Basmati Rice Packet",
    category: "Rice & Grains",
    price: 120.00,
    unit: "kg",
    image: "https://source.unsplash.com/random/300x200/?rice"
  },
  {
    id: "11",
    name: "Toor Dal",
    category: "Rice & Grains",
    price: 110.00,
    unit: "kg",
    image: "https://source.unsplash.com/random/300x200/?lentils"
  },
  {
    id: "12",
    name: "Wheat Flour Packet",
    category: "Rice & Grains",
    price: 45.00,
    unit: "kg",
    image: "https://source.unsplash.com/random/300x200/?flour"
  },
  {
    id: "13",
    name: "Lays Chips",
    category: "Snacks",
    price: 30.00,
    unit: "pack",
    image: "https://source.unsplash.com/random/300x200/?chips"
  },
  {
    id: "14",
    name: "Hide & Seek",
    category: "Snacks",
    price: 25.00,
    unit: "pack",
    image: "https://source.unsplash.com/random/300x200/?cookies"
  },
  {
    id: "15",
    name: "Aloo Bhujia",
    category: "Snacks",
    price: 55.00,
    unit: "200g",
    image: "https://source.unsplash.com/random/300x200/?snack"
  },
  {
    id: "16",
    name: "Cream",
    category: "Dairy & Eggs",
    price: 70.00,
    unit: "200ml",
    image: "https://source.unsplash.com/random/300x200/?cream"
  },
  {
    id: "17",
    name: "Chicken Breast",
    category: "Meat & Seafood",
    price: 150.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/300x200/?chicken"
  },
  {
    id: "18",
    name: "Tomato Puree",
    category: "Fruits & Vegetables",
    price: 50.00,
    unit: "200g",
    image: "https://source.unsplash.com/random/300x200/?tomato-puree"
  },
  {
    id: "19",
    name: "Garlic Paste",
    category: "Spices & Masalas",
    price: 40.00,
    unit: "100g",
    image: "https://source.unsplash.com/random/300x200/?garlic"
  },
  {
    id: "20",
    name: "Ginger Paste",
    category: "Spices & Masalas",
    price: 40.00,
    unit: "100g",
    image: "https://source.unsplash.com/random/300x200/?ginger"
  }
];

export const categories = [
  "All",
  "Fruits & Vegetables",
  "Dairy & Eggs",
  "Spices & Masalas",
  "Rice & Grains",
  "Snacks",
  "Meat & Seafood"
];
