export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  image: string;
  popular?: boolean;
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
  },
  {
    id: "21",
    name: "Bell Peppers",
    category: "Fruits & Vegetables",
    price: 60.00,
    unit: "250g",
    image: "https://source.unsplash.com/random/100x100/?bell-peppers"
  },
  {
    id: "22",
    name: "Carrots",
    category: "Fruits & Vegetables",
    price: 35.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?carrots"
  },
  {
    id: "23",
    name: "Cucumber",
    category: "Fruits & Vegetables",
    price: 20.00,
    unit: "piece",
    image: "https://source.unsplash.com/random/100x100/?cucumber"
  },
  {
    id: "24",
    name: "Cauliflower",
    category: "Fruits & Vegetables",
    price: 40.00,
    unit: "head",
    image: "https://source.unsplash.com/random/100x100/?cauliflower"
  },
  {
    id: "25",
    name: "Broccoli",
    category: "Fruits & Vegetables",
    price: 50.00,
    unit: "head",
    image: "https://source.unsplash.com/random/100x100/?broccoli"
  },
  {
    id: "26",
    name: "Spinach",
    category: "Fruits & Vegetables",
    price: 30.00,
    unit: "bunch",
    image: "https://source.unsplash.com/random/100x100/?spinach"
  },
  {
    id: "27",
    name: "Coriander",
    category: "Fruits & Vegetables",
    price: 15.00,
    unit: "bunch",
    image: "https://source.unsplash.com/random/100x100/?coriander"
  },
  {
    id: "28",
    name: "Mint",
    category: "Fruits & Vegetables",
    price: 15.00,
    unit: "bunch",
    image: "https://source.unsplash.com/random/100x100/?mint"
  },
  {
    id: "29",
    name: "Green Chillies",
    category: "Fruits & Vegetables",
    price: 10.00,
    unit: "50g",
    image: "https://source.unsplash.com/random/100x100/?green-chillies"
  },
  {
    id: "30",
    name: "Lemons",
    category: "Fruits & Vegetables",
    price: 20.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?lemons"
  },
  {
    id: "31",
    name: "Apples",
    category: "Fruits & Vegetables",
    price: 180.00,
    unit: "kg",
    image: "https://source.unsplash.com/random/100x100/?apples"
  },
  {
    id: "32",
    name: "Bananas",
    category: "Fruits & Vegetables",
    price: 60.00,
    unit: "dozen",
    image: "https://source.unsplash.com/random/100x100/?bananas"
  },
  {
    id: "33",
    name: "Mangoes",
    category: "Fruits & Vegetables",
    price: 200.00,
    unit: "kg",
    image: "https://source.unsplash.com/random/100x100/?mangoes"
  },
  {
    id: "34",
    name: "Grapes",
    category: "Fruits & Vegetables",
    price: 100.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?grapes"
  },
  {
    id: "35",
    name: "Oranges",
    category: "Fruits & Vegetables",
    price: 80.00,
    unit: "kg",
    image: "https://source.unsplash.com/random/100x100/?oranges"
  },
  {
    id: "36",
    name: "Strawberries",
    category: "Fruits & Vegetables",
    price: 120.00,
    unit: "250g",
    image: "https://source.unsplash.com/random/100x100/?strawberries"
  },
  {
    id: "37",
    name: "Watermelon",
    category: "Fruits & Vegetables",
    price: 90.00,
    unit: "piece",
    image: "https://source.unsplash.com/random/100x100/?watermelon"
  },
  {
    id: "38",
    name: "Eggs",
    category: "Dairy & Eggs",
    price: 70.00,
    unit: "dozen",
    image: "https://source.unsplash.com/random/100x100/?eggs"
  },
  {
    id: "39",
    name: "Cheese Slices",
    category: "Dairy & Eggs",
    price: 120.00,
    unit: "pack",
    image: "https://source.unsplash.com/random/100x100/?cheese-slices"
  },
  {
    id: "40",
    name: "Mozzarella Cheese",
    category: "Dairy & Eggs",
    price: 220.00,
    unit: "200g",
    image: "https://source.unsplash.com/random/100x100/?mozzarella-cheese"
  },
  {
    id: "41",
    name: "Cheddar Cheese",
    category: "Dairy & Eggs",
    price: 250.00,
    unit: "200g",
    image: "https://source.unsplash.com/random/100x100/?cheddar-cheese"
  },
  {
    id: "42",
    name: "Yogurt",
    category: "Dairy & Eggs",
    price: 45.00,
    unit: "400g",
    image: "https://source.unsplash.com/random/100x100/?yogurt"
  },
  {
    id: "43",
    name: "Butter",
    category: "Dairy & Eggs",
    price: 60.00,
    unit: "100g",
    image: "https://source.unsplash.com/random/100x100/?butter"
  },
  {
    id: "44",
    name: "Ghee",
    category: "Dairy & Eggs",
    price: 450.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?ghee"
  },
  {
    id: "45",
    name: "Cumin Seeds",
    category: "Spices & Masalas",
    price: 60.00,
    unit: "100g",
    image: "https://source.unsplash.com/random/100x100/?cumin-seeds"
  },
  {
    id: "46",
    name: "Coriander Seeds",
    category: "Spices & Masalas",
    price: 55.00,
    unit: "100g",
    image: "https://source.unsplash.com/random/100x100/?coriander-seeds"
  },
  {
    id: "47",
    name: "Mustard Seeds",
    category: "Spices & Masalas",
    price: 50.00,
    unit: "100g",
    image: "https://source.unsplash.com/random/100x100/?mustard-seeds"
  },
  {
    id: "48",
    name: "Fenugreek Seeds",
    category: "Spices & Masalas",
    price: 40.00,
    unit: "100g",
    image: "https://source.unsplash.com/random/100x100/?fenugreek-seeds"
  },
  {
    id: "49",
    name: "Cinnamon Sticks",
    category: "Spices & Masalas",
    price: 70.00,
    unit: "50g",
    image: "https://source.unsplash.com/random/100x100/?cinnamon-sticks"
  },
  {
    id: "50",
    name: "Cardamom",
    category: "Spices & Masalas",
    price: 120.00,
    unit: "50g",
    image: "https://source.unsplash.com/random/100x100/?cardamom"
  },
  {
    id: "51",
    name: "Cloves",
    category: "Spices & Masalas",
    price: 80.00,
    unit: "50g",
    image: "https://source.unsplash.com/random/100x100/?cloves"
  },
  {
    id: "52",
    name: "Bay Leaves",
    category: "Spices & Masalas",
    price: 30.00,
    unit: "20g",
    image: "https://source.unsplash.com/random/100x100/?bay-leaves"
  },
  {
    id: "53",
    name: "Black Pepper",
    category: "Spices & Masalas",
    price: 90.00,
    unit: "100g",
    image: "https://source.unsplash.com/random/100x100/?black-pepper"
  },
  {
    id: "54",
    name: "Kashmiri Red Chilli",
    category: "Spices & Masalas",
    price: 110.00,
    unit: "100g",
    image: "https://source.unsplash.com/random/100x100/?kashmiri-chilli"
  },
  {
    id: "55",
    name: "Chicken Curry Cut",
    category: "Meat & Seafood",
    price: 180.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?chicken-curry"
  },
  {
    id: "56",
    name: "Mutton",
    category: "Meat & Seafood",
    price: 550.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?mutton"
  },
  {
    id: "57",
    name: "Fish (Rohu)",
    category: "Meat & Seafood",
    price: 200.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?fish"
  },
  {
    id: "58",
    name: "Prawns",
    category: "Meat & Seafood",
    price: 350.00,
    unit: "250g",
    image: "https://source.unsplash.com/random/100x100/?prawns"
  },
  {
    id: "59",
    name: "Pomfret",
    category: "Meat & Seafood",
    price: 400.00,
    unit: "piece",
    image: "https://source.unsplash.com/random/100x100/?pomfret"
  },
  {
    id: "60",
    name: "Eggs",
    category: "Dairy & Eggs",
    price: 70.00,
    unit: "dozen",
    image: "https://source.unsplash.com/random/100x100/?eggs"
  },
  {
    id: "61",
    name: "Moong Dal",
    category: "Rice & Grains",
    price: 100.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?moong-dal"
  },
  {
    id: "62",
    name: "Masoor Dal",
    category: "Rice & Grains",
    price: 90.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?masoor-dal"
  },
  {
    id: "63",
    name: "Urad Dal",
    category: "Rice & Grains",
    price: 110.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?urad-dal"
  },
  {
    id: "64",
    name: "Chana Dal",
    category: "Rice & Grains",
    price: 95.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?chana-dal"
  },
  {
    id: "65",
    name: "Brown Rice",
    category: "Rice & Grains",
    price: 100.00,
    unit: "kg",
    image: "https://source.unsplash.com/random/100x100/?brown-rice"
  },
  {
    id: "66",
    name: "Quinoa",
    category: "Rice & Grains",
    price: 250.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?quinoa"
  },
  {
    id: "67",
    name: "Oats",
    category: "Rice & Grains",
    price: 120.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?oats"
  },
  {
    id: "68",
    name: "Sooji/Semolina",
    category: "Rice & Grains",
    price: 40.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?semolina"
  },
  {
    id: "69",
    name: "Poha",
    category: "Rice & Grains",
    price: 50.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?poha"
  },
  {
    id: "70",
    name: "Corn Flakes",
    category: "Breakfast & Cereal",
    price: 150.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?corn-flakes"
  },
  {
    id: "71",
    name: "Muesli",
    category: "Breakfast & Cereal",
    price: 220.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?muesli"
  },
  {
    id: "72",
    name: "Bread",
    category: "Bakery",
    price: 40.00,
    unit: "pack",
    image: "https://source.unsplash.com/random/100x100/?bread"
  },
  {
    id: "73",
    name: "Burger Buns",
    category: "Bakery",
    price: 35.00,
    unit: "pack",
    image: "https://source.unsplash.com/random/100x100/?burger-buns"
  },
  {
    id: "74",
    name: "Pav",
    category: "Bakery",
    price: 30.00,
    unit: "pack",
    image: "https://source.unsplash.com/random/100x100/?pav"
  },
  {
    id: "75",
    name: "Cake",
    category: "Bakery",
    price: 350.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?cake"
  },
  {
    id: "76",
    name: "Cookies",
    category: "Bakery",
    price: 80.00,
    unit: "pack",
    image: "https://source.unsplash.com/random/100x100/?cookies"
  },
  {
    id: "77",
    name: "Cashews",
    category: "Dry Fruits & Nuts",
    price: 550.00,
    unit: "250g",
    image: "https://source.unsplash.com/random/100x100/?cashews"
  },
  {
    id: "78",
    name: "Almonds",
    category: "Dry Fruits & Nuts",
    price: 500.00,
    unit: "250g",
    image: "https://source.unsplash.com/random/100x100/?almonds"
  },
  {
    id: "79",
    name: "Walnuts",
    category: "Dry Fruits & Nuts",
    price: 600.00,
    unit: "250g",
    image: "https://source.unsplash.com/random/100x100/?walnuts"
  },
  {
    id: "80",
    name: "Raisins",
    category: "Dry Fruits & Nuts",
    price: 180.00,
    unit: "200g",
    image: "https://source.unsplash.com/random/100x100/?raisins"
  },
  {
    id: "81",
    name: "Dates",
    category: "Dry Fruits & Nuts",
    price: 200.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?dates"
  },
  {
    id: "82",
    name: "Sunflower Oil",
    category: "Oils & Ghee",
    price: 140.00,
    unit: "1L",
    image: "https://source.unsplash.com/random/100x100/?sunflower-oil"
  },
  {
    id: "83",
    name: "Olive Oil",
    category: "Oils & Ghee",
    price: 550.00,
    unit: "500ml",
    image: "https://source.unsplash.com/random/100x100/?olive-oil"
  },
  {
    id: "84",
    name: "Mustard Oil",
    category: "Oils & Ghee",
    price: 180.00,
    unit: "1L",
    image: "https://source.unsplash.com/random/100x100/?mustard-oil"
  },
  {
    id: "85",
    name: "Coconut Oil",
    category: "Oils & Ghee",
    price: 250.00,
    unit: "500ml",
    image: "https://source.unsplash.com/random/100x100/?coconut-oil"
  },
  {
    id: "86",
    name: "Sugar",
    category: "Staples",
    price: 45.00,
    unit: "kg",
    image: "https://source.unsplash.com/random/100x100/?sugar"
  },
  {
    id: "87",
    name: "Salt",
    category: "Staples",
    price: 20.00,
    unit: "kg",
    image: "https://source.unsplash.com/random/100x100/?salt"
  },
  {
    id: "88",
    name: "Jaggery",
    category: "Staples",
    price: 60.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?jaggery"
  },
  {
    id: "89",
    name: "Tea",
    category: "Beverages",
    price: 140.00,
    unit: "250g",
    image: "https://source.unsplash.com/random/100x100/?tea"
  },
  {
    id: "90",
    name: "Coffee",
    category: "Beverages",
    price: 180.00,
    unit: "200g",
    image: "https://source.unsplash.com/random/100x100/?coffee"
  },
  {
    id: "91",
    name: "Fruit Juice",
    category: "Beverages",
    price: 120.00,
    unit: "1L",
    image: "https://source.unsplash.com/random/100x100/?fruit-juice"
  },
  {
    id: "92",
    name: "Soft Drinks",
    category: "Beverages",
    price: 80.00,
    unit: "2L",
    image: "https://source.unsplash.com/random/100x100/?soft-drinks"
  },
  {
    id: "93",
    name: "Pasta",
    category: "International Cuisine",
    price: 80.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?pasta"
  },
  {
    id: "94",
    name: "Spaghetti",
    category: "International Cuisine",
    price: 90.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?spaghetti"
  },
  {
    id: "95",
    name: "Noodles",
    category: "International Cuisine",
    price: 40.00,
    unit: "pack",
    image: "https://source.unsplash.com/random/100x100/?noodles"
  },
  {
    id: "96",
    name: "Pasta Sauce",
    category: "International Cuisine",
    price: 160.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?pasta-sauce"
  },
  {
    id: "97",
    name: "Soy Sauce",
    category: "International Cuisine",
    price: 120.00,
    unit: "200ml",
    image: "https://source.unsplash.com/random/100x100/?soy-sauce"
  },
  {
    id: "98",
    name: "Vinegar",
    category: "International Cuisine",
    price: 80.00,
    unit: "200ml",
    image: "https://source.unsplash.com/random/100x100/?vinegar"
  },
  {
    id: "99",
    name: "Honey",
    category: "Staples",
    price: 220.00,
    unit: "250g",
    image: "https://source.unsplash.com/random/100x100/?honey"
  },
  {
    id: "100",
    name: "Peanut Butter",
    category: "Spreads",
    price: 150.00,
    unit: "200g",
    image: "https://source.unsplash.com/random/100x100/?peanut-butter"
  },
  {
    id: "101",
    name: "Jam",
    category: "Spreads",
    price: 120.00,
    unit: "200g",
    image: "https://source.unsplash.com/random/100x100/?jam"
  },
  {
    id: "102",
    name: "Nutella",
    category: "Spreads",
    price: 280.00,
    unit: "350g",
    image: "https://source.unsplash.com/random/100x100/?nutella"
  },
  {
    id: "103",
    name: "Chocolate Syrup",
    category: "Spreads",
    price: 150.00,
    unit: "200ml",
    image: "https://source.unsplash.com/random/100x100/?chocolate-syrup"
  },
  {
    id: "104",
    name: "Maple Syrup",
    category: "Spreads",
    price: 450.00,
    unit: "250ml",
    image: "https://source.unsplash.com/random/100x100/?maple-syrup"
  },
  {
    id: "105",
    name: "Coconut Milk",
    category: "International Cuisine",
    price: 80.00,
    unit: "400ml",
    image: "https://source.unsplash.com/random/100x100/?coconut-milk"
  },
  {
    id: "106",
    name: "Tofu",
    category: "International Cuisine",
    price: 120.00,
    unit: "400g",
    image: "https://source.unsplash.com/random/100x100/?tofu"
  },
  {
    id: "107",
    name: "Mushrooms",
    category: "Fruits & Vegetables",
    price: 60.00,
    unit: "200g",
    image: "https://source.unsplash.com/random/100x100/?mushrooms"
  },
  {
    id: "108",
    name: "Coconut Water",
    category: "Beverages",
    price: 55.00,
    unit: "500ml",
    image: "https://source.unsplash.com/random/100x100/?coconut-water"
  },
  {
    id: "109",
    name: "Fresh Cream",
    category: "Dairy & Eggs",
    price: 75.00,
    unit: "200ml",
    image: "https://source.unsplash.com/random/100x100/?fresh-cream"
  },
  {
    id: "110",
    name: "Condensed Milk",
    category: "Dairy & Eggs",
    price: 120.00,
    unit: "400g",
    image: "https://source.unsplash.com/random/100x100/?condensed-milk"
  },
  {
    id: "111",
    name: "Ice Cream (Vanilla)",
    category: "Frozen Foods",
    price: 220.00,
    unit: "500ml",
    image: "https://source.unsplash.com/random/100x100/?ice-cream"
  },
  {
    id: "112",
    name: "Frozen Peas",
    category: "Frozen Foods",
    price: 80.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?frozen-peas"
  },
  {
    id: "113",
    name: "Frozen Mixed Vegetables",
    category: "Frozen Foods",
    price: 120.00,
    unit: "500g",
    image: "https://source.unsplash.com/random/100x100/?frozen-vegetables"
  },
  {
    id: "114",
    name: "Frozen Pizza",
    category: "Frozen Foods",
    price: 220.00,
    unit: "piece",
    image: "https://source.unsplash.com/random/100x100/?frozen-pizza"
  },
  {
    id: "115",
    name: "Basil",
    category: "Herbs",
    price: 30.00,
    unit: "bunch",
    image: "https://source.unsplash.com/random/100x100/?basil"
  },
  {
    id: "116",
    name: "Rosemary",
    category: "Herbs",
    price: 40.00,
    unit: "bunch",
    image: "https://source.unsplash.com/random/100x100/?rosemary"
  },
  {
    id: "117",
    name: "Thyme",
    category: "Herbs",
    price: 35.00,
    unit: "bunch",
    image: "https://source.unsplash.com/random/100x100/?thyme"
  },
  {
    id: "118",
    name: "Oregano",
    category: "Herbs",
    price: 25.00,
    unit: "10g",
    image: "https://source.unsplash.com/random/100x100/?oregano"
  },
  {
    id: "119",
    name: "Mixed Herbs",
    category: "Herbs",
    price: 120.00,
    unit: "50g",
    image: "https://source.unsplash.com/random/100x100/?mixed-herbs"
  },
  {
    id: "120",
    name: "Bean Sprouts",
    category: "International Cuisine",
    price: 40.00,
    unit: "200g",
    image: "https://source.unsplash.com/random/100x100/?bean-sprouts"
  }
];

export const categories = [
  "All",
  "Fruits & Vegetables",
  "Dairy & Eggs",
  "Spices & Masalas",
  "Rice & Grains",
  "Meat & Seafood",
  "Bakery",
  "Dry Fruits & Nuts",
  "Oils & Ghee",
  "Staples",
  "Beverages",
  "International Cuisine",
  "Spreads",
  "Frozen Foods",
  "Herbs",
  "Breakfast & Cereal",
  "Snacks"
];
