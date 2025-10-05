# Food Ordering App - Structure Overview

## Application Features

### 1. Menu Display
- Displays 6 different food items with:
  - Name
  - Category (Pizza, Burgers, Salads, Japanese, Thai, Mexican)
  - Description
  - Price
  - Emoji icon
- Each item has an "Add to Cart" button

### 2. Search Functionality
- Real-time search filter
- Searches food items by name
- Updates menu display dynamically

### 3. Shopping Cart
- Add items to cart
- Increase/decrease item quantities
- Remove items from cart
- Displays quantity for each item
- Shows individual item prices

### 4. Price Calculation
- Automatically calculates total price
- Updates in real-time as cart changes
- Shows: `$[price] x [quantity]` for each item

### 5. Checkout Button
- Ready for payment integration
- Displays total amount
- Prominent call-to-action

## Component Structure

```
App (Main Component)
│
├── Header
│   ├── App Title
│   └── Subtitle
│
├── Search Bar
│   └── Search Input Field
│
├── Menu Section
│   └── FlatList of Food Cards
│       ├── Food Image (Emoji)
│       ├── Food Name
│       ├── Category Badge
│       ├── Description
│       ├── Price
│       └── Add to Cart Button
│
└── Cart Section (Conditional - shows when cart has items)
    ├── Cart Items List
    │   ├── Item Name
    │   ├── Price x Quantity
    │   └── +/- Buttons
    ├── Total Price Display
    └── Checkout Button
```

## State Management

The app uses React Hooks for state management:

### State Variables:
1. **cart**: Array of cart items with quantities
2. **searchQuery**: String for search filter

### Key Functions:
1. **addToCart(item)**: Adds item or increases quantity
2. **removeFromCart(itemId)**: Decreases quantity or removes item
3. **getTotalPrice()**: Calculates total cart value
4. **renderFoodItem({item})**: Renders each food card

## Styling

- Modern, clean design with rounded corners
- Color scheme: Red (#ff6b6b) primary color
- Card-based layout with shadows
- Responsive spacing and typography
- Touch-friendly button sizes

## Food Menu Items

1. **Margherita Pizza** - $12.99 (Pizza)
2. **Cheeseburger** - $9.99 (Burgers)
3. **Caesar Salad** - $8.99 (Salads)
4. **Sushi Roll** - $15.99 (Japanese)
5. **Pad Thai** - $11.99 (Thai)
6. **Tacos** - $10.99 (Mexican)

## Technical Stack

- **React Native**: 0.72.0
- **React**: 18.2.0
- **Navigation**: React Navigation ready
- **Gestures**: React Native Gesture Handler
- **Animations**: React Native Reanimated

## User Flow

1. User opens app → Sees menu with all food items
2. User searches (optional) → Menu filters by name
3. User clicks "Add to Cart" → Item added/quantity increased
4. Cart appears below menu → Shows all selected items
5. User adjusts quantities → Uses +/- buttons
6. User reviews total → Sees calculated price
7. User clicks "Checkout" → Ready for payment (to be implemented)

## Ready for Enhancement

The app is structured to easily add:
- User authentication
- Backend API integration
- Multiple restaurants
- Order history
- Payment processing
- Delivery tracking
- User reviews
- Push notifications
