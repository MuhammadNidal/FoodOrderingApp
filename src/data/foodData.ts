import { FoodItem } from '../context/CartContext';

export const categories = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'pizza', name: 'Pizza', icon: '🍕' },
  { id: 'burgers', name: 'Burgers', icon: '🍔' },
  { id: 'salads', name: 'Salads', icon: '🥗' },
  { id: 'pasta', name: 'Pasta', icon: '🍝' },
  { id: 'mexican', name: 'Mexican', icon: '🌮' },
  { id: 'desserts', name: 'Desserts', icon: '🍰' },
  { id: 'drinks', name: 'Drinks', icon: '🥤' },
  { id: 'asian', name: 'Asian', icon: '🍜' },
];

export const foodItems: FoodItem[] = [
  // Pizza
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella, basil, olive oil",
    price: 12.99,
    category: "pizza",
    image: "🍕",
    rating: 4.5,
    prepTime: "15-20 min",
    ingredients: ["Tomatoes", "Mozzarella", "Basil", "Olive Oil", "Pizza Dough"],
    calories: 285,
    isVeg: true,
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    description: "Classic pepperoni with mozzarella and tomato sauce",
    price: 15.99,
    category: "pizza",
    image: "🍕",
    rating: 4.6,
    prepTime: "15-20 min",
    ingredients: ["Pepperoni", "Mozzarella", "Tomato Sauce", "Pizza Dough"],
    calories: 350,
    isVeg: false,
  },
  {
    id: 3,
    name: "Veggie Supreme",
    description: "Bell peppers, mushrooms, onions, olives, tomatoes",
    price: 14.99,
    category: "pizza",
    image: "🍕",
    rating: 4.4,
    prepTime: "18-22 min",
    ingredients: ["Bell Peppers", "Mushrooms", "Onions", "Olives", "Tomatoes", "Mozzarella"],
    calories: 290,
    isVeg: true,
  },

  // Burgers
  {
    id: 4,
    name: "Classic Beef Burger",
    description: "Juicy beef patty, lettuce, tomato, onion, pickles",
    price: 9.99,
    category: "burgers",
    image: "🍔",
    rating: 4.3,
    prepTime: "10-15 min",
    ingredients: ["Beef Patty", "Lettuce", "Tomato", "Onion", "Pickles", "Burger Bun"],
    calories: 540,
    isVeg: false,
  },
  {
    id: 5,
    name: "Chicken Deluxe",
    description: "Grilled chicken breast, avocado, bacon, swiss cheese",
    price: 11.99,
    category: "burgers",
    image: "🍔",
    rating: 4.7,
    prepTime: "12-16 min",
    ingredients: ["Chicken Breast", "Avocado", "Bacon", "Swiss Cheese", "Lettuce"],
    calories: 620,
    isVeg: false,
  },
  {
    id: 6,
    name: "Veggie Burger",
    description: "Plant-based patty, lettuce, tomato, vegan mayo",
    price: 10.99,
    category: "burgers",
    image: "🍔",
    rating: 4.2,
    prepTime: "8-12 min",
    ingredients: ["Plant-based Patty", "Lettuce", "Tomato", "Vegan Mayo", "Whole Grain Bun"],
    calories: 420,
    isVeg: true,
  },

  // Salads
  {
    id: 7,
    name: "Caesar Salad",
    description: "Romaine lettuce, croutons, parmesan, caesar dressing",
    price: 8.99,
    category: "salads",
    image: "🥗",
    rating: 4.2,
    prepTime: "5-8 min",
    ingredients: ["Romaine Lettuce", "Croutons", "Parmesan", "Caesar Dressing"],
    calories: 180,
    isVeg: true,
  },
  {
    id: 8,
    name: "Greek Salad",
    description: "Mixed greens, feta, olives, tomatoes, cucumber",
    price: 9.99,
    category: "salads",
    image: "🥗",
    rating: 4.5,
    prepTime: "5-8 min",
    ingredients: ["Mixed Greens", "Feta Cheese", "Olives", "Tomatoes", "Cucumber", "Red Onion"],
    calories: 220,
    isVeg: true,
  },

  // Pasta
  {
    id: 9,
    name: "Pasta Carbonara",
    description: "Creamy pasta with bacon, eggs, and parmesan",
    price: 14.99,
    category: "pasta",
    image: "🍝",
    rating: 4.6,
    prepTime: "15-20 min",
    ingredients: ["Pasta", "Bacon", "Eggs", "Parmesan", "Black Pepper", "Cream"],
    calories: 580,
    isVeg: false,
  },
  {
    id: 10,
    name: "Penne Arrabbiata",
    description: "Spicy tomato sauce with garlic and red peppers",
    price: 12.99,
    category: "pasta",
    image: "🍝",
    rating: 4.3,
    prepTime: "12-15 min",
    ingredients: ["Penne Pasta", "Tomatoes", "Garlic", "Red Peppers", "Olive Oil", "Basil"],
    calories: 420,
    isVeg: true,
  },

  // Mexican
  {
    id: 11,
    name: "Fish Tacos",
    description: "Grilled fish with fresh salsa and lime",
    price: 11.99,
    category: "mexican",
    image: "🌮",
    rating: 4.4,
    prepTime: "10-15 min",
    ingredients: ["Grilled Fish", "Corn Tortillas", "Cabbage", "Salsa", "Lime", "Cilantro"],
    calories: 320,
    isVeg: false,
  },
  {
    id: 12,
    name: "Chicken Quesadilla",
    description: "Grilled chicken, cheese, peppers in flour tortilla",
    price: 10.99,
    category: "mexican",
    image: "🌮",
    rating: 4.5,
    prepTime: "8-12 min",
    ingredients: ["Chicken", "Cheese", "Bell Peppers", "Flour Tortilla", "Onions"],
    calories: 480,
    isVeg: false,
  },

  // Desserts
  {
    id: 13,
    name: "Chocolate Cake",
    description: "Rich chocolate cake with cream frosting",
    price: 6.99,
    category: "desserts",
    image: "🍰",
    rating: 4.7,
    prepTime: "2-5 min",
    ingredients: ["Chocolate", "Flour", "Eggs", "Sugar", "Cream", "Butter"],
    calories: 450,
    isVeg: true,
  },
  {
    id: 14,
    name: "Cheesecake",
    description: "Creamy New York style cheesecake",
    price: 7.99,
    category: "desserts",
    image: "🍰",
    rating: 4.8,
    prepTime: "2-5 min",
    ingredients: ["Cream Cheese", "Graham Crackers", "Sugar", "Eggs", "Vanilla"],
    calories: 410,
    isVeg: true,
  },

  // Drinks
  {
    id: 15,
    name: "Fresh Orange Juice",
    description: "Freshly squeezed orange juice",
    price: 3.99,
    category: "drinks",
    image: "🥤",
    rating: 4.3,
    prepTime: "2-3 min",
    ingredients: ["Fresh Oranges"],
    calories: 110,
    isVeg: true,
  },
  {
    id: 16,
    name: "Iced Coffee",
    description: "Cold brew coffee with ice and milk",
    price: 4.99,
    category: "drinks",
    image: "☕",
    rating: 4.4,
    prepTime: "3-5 min",
    ingredients: ["Coffee Beans", "Milk", "Ice", "Sugar"],
    calories: 80,
    isVeg: true,
  },

  // Asian
  {
    id: 17,
    name: "Chicken Ramen",
    description: "Rich chicken broth with noodles and vegetables",
    price: 13.99,
    category: "asian",
    image: "🍜",
    rating: 4.6,
    prepTime: "15-20 min",
    ingredients: ["Ramen Noodles", "Chicken", "Eggs", "Green Onions", "Mushrooms", "Broth"],
    calories: 520,
    isVeg: false,
  },
  {
    id: 18,
    name: "Vegetable Fried Rice",
    description: "Wok-fried rice with mixed vegetables",
    price: 10.99,
    category: "asian",
    image: "🍚",
    rating: 4.2,
    prepTime: "10-15 min",
    ingredients: ["Rice", "Mixed Vegetables", "Soy Sauce", "Garlic", "Ginger", "Sesame Oil"],
    calories: 380,
    isVeg: true,
  },
];

// Mock API functions
export const getFoods = async (): Promise<FoodItem[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return foodItems;
};

export const getFoodById = async (id: number): Promise<FoodItem | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return foodItems.find(item => item.id === id) || null;
};

export const getFoodsByCategory = async (category: string): Promise<FoodItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  if (category === 'all') {
    return foodItems;
  }
  return foodItems.filter(item => item.category === category);
};

export const searchFoods = async (query: string): Promise<FoodItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  const lowercaseQuery = query.toLowerCase();
  return foodItems.filter(item =>
    item.name.toLowerCase().includes(lowercaseQuery) ||
    item.description.toLowerCase().includes(lowercaseQuery) ||
    item.category.toLowerCase().includes(lowercaseQuery)
  );
};

export const getPopularFoods = async (): Promise<FoodItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return foodItems.filter(item => item.rating >= 4.5).slice(0, 6);
};