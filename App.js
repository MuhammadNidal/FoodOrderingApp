import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';

const App = () => {
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample food data
  const foodItems = [
    {
      id: '1',
      name: 'Margherita Pizza',
      price: 12.99,
      category: 'Pizza',
      description: 'Classic pizza with tomato sauce, mozzarella, and basil',
      image: '🍕',
    },
    {
      id: '2',
      name: 'Cheeseburger',
      price: 9.99,
      category: 'Burgers',
      description: 'Juicy beef patty with cheese, lettuce, and tomato',
      image: '🍔',
    },
    {
      id: '3',
      name: 'Caesar Salad',
      price: 8.99,
      category: 'Salads',
      description: 'Fresh romaine lettuce with Caesar dressing and croutons',
      image: '🥗',
    },
    {
      id: '4',
      name: 'Sushi Roll',
      price: 15.99,
      category: 'Japanese',
      description: 'Fresh sushi rolls with salmon and avocado',
      image: '🍣',
    },
    {
      id: '5',
      name: 'Pad Thai',
      price: 11.99,
      category: 'Thai',
      description: 'Stir-fried rice noodles with shrimp and peanuts',
      image: '🍜',
    },
    {
      id: '6',
      name: 'Tacos',
      price: 10.99,
      category: 'Mexican',
      description: 'Three soft tacos with beef, salsa, and guacamole',
      image: '🌮',
    },
  ];

  const addToCart = item => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map(cartItem =>
          cartItem.id === item.id
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem,
        ),
      );
    } else {
      setCart([...cart, {...item, quantity: 1}]);
    }
  };

  const removeFromCart = itemId => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(
        cart.map(cartItem =>
          cartItem.id === itemId
            ? {...cartItem, quantity: cartItem.quantity - 1}
            : cartItem,
        ),
      );
    } else {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    }
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const filteredFoodItems = foodItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderFoodItem = ({item}) => (
    <View style={styles.foodCard}>
      <View style={styles.foodImageContainer}>
        <Text style={styles.foodEmoji}>{item.image}</Text>
      </View>
      <View style={styles.foodInfo}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodCategory}>{item.category}</Text>
        <Text style={styles.foodDescription}>{item.description}</Text>
        <View style={styles.foodFooter}>
          <Text style={styles.foodPrice}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addToCart(item)}>
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Food Ordering App</Text>
        <Text style={styles.headerSubtitle}>Order your favorite meals</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for food..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Menu</Text>
        <FlatList
          data={filteredFoodItems}
          renderItem={renderFoodItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />

        {cart.length > 0 && (
          <View style={styles.cartSection}>
            <Text style={styles.sectionTitle}>Your Cart</Text>
            {cart.map(item => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.cartItemInfo}>
                  <Text style={styles.cartItemName}>{item.name}</Text>
                  <Text style={styles.cartItemPrice}>
                    ${item.price.toFixed(2)} x {item.quantity}
                  </Text>
                </View>
                <View style={styles.cartItemActions}>
                  <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => removeFromCart(item.id)}>
                    <Text style={styles.cartButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.cartButton}
                    onPress={() => addToCart(item)}>
                    <Text style={styles.cartButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalAmount}>${getTotalPrice()}</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ff6b6b',
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  searchContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  foodCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  foodImageContainer: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  foodEmoji: {
    fontSize: 60,
  },
  foodInfo: {
    padding: 15,
  },
  foodName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  foodCategory: {
    fontSize: 14,
    color: '#ff6b6b',
    marginBottom: 8,
    fontWeight: '600',
  },
  foodDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  foodFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  foodPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
  addButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cartSection: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 15,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#666',
  },
  cartItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButton: {
    backgroundColor: '#ff6b6b',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartItemQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 12,
    color: '#333',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 2,
    borderTopColor: '#e0e0e0',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
  checkoutButton: {
    backgroundColor: '#ff6b6b',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
