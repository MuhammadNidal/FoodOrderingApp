import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import { useCart, FoodItem } from '../context/CartContext';
import { getFoodById } from '../data/foodData';

const { height } = Dimensions.get('window');

interface FoodDetailsScreenProps {
  route: any;
  navigation: any;
}

export default function FoodDetailsScreen({ route, navigation }: FoodDetailsScreenProps) {
  const { foodId } = route.params;
  const [food, setFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  
  const { addToCart, getCartItem, updateQuantity: updateCartQuantity } = useCart();

  useEffect(() => {
    const loadFoodDetails = async () => {
      try {
        setLoading(true);
        const foodData = await getFoodById(foodId);
        setFood(foodData);
        
        // Set initial quantity based on cart item if exists
        const cartItem = getCartItem(foodId);
        if (cartItem) {
          setQuantity(cartItem.quantity);
        }
      } catch (error) {
        console.error('Error loading food details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFoodDetails();
  }, [foodId, getCartItem]);

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, quantity + change);
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (!food) return;
    
    const cartItem = getCartItem(foodId);
    if (cartItem) {
      // Update existing cart item
      updateCartQuantity(foodId, quantity);
      Toast.show({
        type: 'success',
        text1: 'Cart Updated',
        text2: `${food.name} quantity updated to ${quantity}!`,
        position: 'bottom',
        visibilityTime: 2000,
      });
    } else {
      // Add new item to cart
      for (let i = 0; i < quantity; i++) {
        addToCart(food);
      }
      Toast.show({
        type: 'success',
        text1: 'Added to Cart',
        text2: `${quantity}x ${food.name} added to your cart!`,
        position: 'bottom',
        visibilityTime: 2000,
      });
    }
  };

  if (loading) {
    return (
      <LinearGradient colors={['#ff6b6b', '#ee5a24']} style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading delicious details...</Text>
        </View>
      </LinearGradient>
    );
  }

  if (!food) {
    return (
      <LinearGradient colors={['#ff6b6b', '#ee5a24']} style={styles.container}>
        <View style={styles.errorContainer}>
          <Icon name="exclamation-triangle" size={50} color="#fff" />
          <Text style={styles.errorText}>Food item not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#ff6b6b', '#ee5a24']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Food Details</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.headerButton}>
          <Icon name="shopping-cart" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Food Image */}
        <View style={styles.imageContainer}>
          <Text style={styles.foodImage}>{food.image}</Text>
          {food.isVeg && (
            <View style={styles.vegBadge}>
              <Text style={styles.vegText}>VEG</Text>
            </View>
          )}
        </View>

        {/* Food Info */}
        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.foodName}>{food.name}</Text>
            <View style={styles.rating}>
              <Icon name="star" size={16} color="#ffd700" />
              <Text style={styles.ratingText}>{food.rating}</Text>
            </View>
          </View>

          <Text style={styles.foodDescription}>{food.description}</Text>

          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Icon name="clock-o" size={16} color="#ff6b6b" />
              <Text style={styles.metaText}>{food.prepTime}</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="fire" size={16} color="#ff6b6b" />
              <Text style={styles.metaText}>{food.calories} cal</Text>
            </View>
            <View style={styles.metaItem}>
              <Icon name="dollar" size={16} color="#ff6b6b" />
              <Text style={styles.metaText}>{food.price}</Text>
            </View>
          </View>

          {/* Ingredients */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsContainer}>
              {food.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientTag}>
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Nutritional Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nutritional Information</Text>
            <View style={styles.nutritionContainer}>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Calories</Text>
                <Text style={styles.nutritionValue}>{food.calories}</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Category</Text>
                <Text style={styles.nutritionValue}>{food.category}</Text>
              </View>
              <View style={styles.nutritionItem}>
                <Text style={styles.nutritionLabel}>Type</Text>
                <Text style={styles.nutritionValue}>{food.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomContainer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(-1)}
          >
            <Icon name="minus" size={18} color="#ff6b6b" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(1)}
          >
            <Icon name="plus" size={18} color="#ff6b6b" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Text style={styles.addToCartText}>
            Add to Cart - ${(food.price * quantity).toFixed(2)}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    position: 'relative',
  },
  foodImage: {
    fontSize: 120,
  },
  vegBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  vegText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    minHeight: height * 0.6,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  foodName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  foodDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    paddingVertical: 15,
  },
  metaItem: {
    alignItems: 'center',
  },
  metaText: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ingredientTag: {
    backgroundColor: '#ff6b6b',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  ingredientText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  nutritionContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
  },
  nutritionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  nutritionLabel: {
    fontSize: 16,
    color: '#666',
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  bottomContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    paddingHorizontal: 5,
    marginRight: 20,
  },
  quantityButton: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#ff6b6b',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
  },
  backButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  backButtonText: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: 'bold',
  },
});