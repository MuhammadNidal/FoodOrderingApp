# FoodOrderingApp

A React Native application for ordering food with a beautiful and intuitive user interface.

## Features

- 📱 Cross-platform support (iOS and Android)
- 🍕 Browse menu items with categories
- 🔍 Search functionality to find your favorite meals
- 🛒 Shopping cart with quantity management
- 💰 Real-time total price calculation
- 🎨 Modern and clean UI design

## Menu Items

The app includes a variety of food items:
- Margherita Pizza
- Cheeseburger
- Caesar Salad
- Sushi Roll
- Pad Thai
- Tacos

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- React Native CLI
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and Android SDK

### Setup

1. Clone the repository:
```bash
git clone https://github.com/MuhammadNidal/FoodOrderingApp.git
cd FoodOrderingApp
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. For iOS, install CocoaPods dependencies:
```bash
cd ios && pod install && cd ..
```

## Running the App

### Android

```bash
npm run android
# or
yarn android
```

### iOS

```bash
npm run ios
# or
yarn ios
```

### Start Metro Bundler

```bash
npm start
# or
yarn start
```

## Project Structure

```
FoodOrderingApp/
├── App.js              # Main application component
├── index.js            # Entry point
├── package.json        # Dependencies and scripts
├── app.json            # App configuration
├── babel.config.js     # Babel configuration
├── metro.config.js     # Metro bundler configuration
└── README.md          # Project documentation
```

## Key Components

### App.js

The main component that includes:
- **Menu Display**: Shows all available food items with details
- **Search Bar**: Filter food items by name
- **Cart Management**: Add/remove items and adjust quantities
- **Price Calculation**: Automatic total calculation
- **Checkout Button**: Ready for checkout integration

## Technologies Used

- React Native 0.72.0
- React 18.2.0
- React Navigation (for future multi-screen support)
- React Native Gesture Handler
- React Native Reanimated

## Development

### Linting

```bash
npm run lint
# or
yarn lint
```

### Testing

```bash
npm test
# or
yarn test
```

## Future Enhancements

- User authentication
- Order history
- Payment integration
- Real-time order tracking
- User reviews and ratings
- Multiple restaurant support
- Delivery address management
- Push notifications

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

Muhammad Nidal

## Support

For issues and questions, please open an issue on GitHub.