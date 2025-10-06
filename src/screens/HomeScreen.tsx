import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import { router } from 'expo-router';
import { useCart, FoodItem } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useSearchHistory } from '../context/SearchHistoryContext';
import { categories, getFoods, getPopularFoods, getFoodsByCategory, searchFoods } from '../data/foodData';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [foods, setFoods] = useState<FoodItem[]>([]);
  const [popularFoods, setPopularFoods] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  const { addToCart, getCartItemCount } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addSearch } = useSearchHistory();

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    const searchAndFilter = async () => {
      if (searchQuery.trim()) {
        try {
          const searchResults = await searchFoods(searchQuery);
          setFoods(searchResults);
          // Save search query to history
          addSearch(searchQuery.trim());
        } catch (error) {
          console.error('Error searching foods:', error);
        }
      } else {
        loadFoodsByCategory(selectedCategory);
      }
    };
    
    searchAndFilter();
  }, [searchQuery, selectedCategory, addSearch]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [allFoods, popular] = await Promise.all([
        getFoods(),
        getPopularFoods()
      ]);
      setFoods(allFoods);
      setPopularFoods(popular);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadFoodsByCategory = async (category: string) => {
    try {
      const categoryFoods = await getFoodsByCategory(category);
      setFoods(categoryFoods);
    } catch (error) {
      console.error('Error loading category foods:', error);
    }
  };

  const handleAddToCart = (food: FoodItem) => {
    addToCart(food);
    Toast.show({
      type: 'success',
      text1: 'Added to Cart',
      text2: `${food.name} has been added to your cart!`,
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const renderFoodCard = ({ item }: { item: FoodItem }) => (
    <TouchableOpacity
      style={styles.foodCard}
      onPress={() => {
        // Navigate to food details screen with params
        router.push({
          pathname: '/food-details',
          params: { 
            id: item.id.toString(),
            name: item.name,
            description: item.description,
            price: item.price.toString(),
            image: item.image,
            rating: item.rating.toString(),
            prepTime: item.prepTime,
            category: item.category,
            calories: item.calories.toString(),
            isVeg: item.isVeg.toString()
          }
        });
      }}
      activeOpacity={0.8}
    >
      <View style={styles.foodImageContainer}>
        <Text style={styles.foodImage}>{item.image}</Text>
        {item.isVeg && <View style={styles.vegBadge} />}
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => {
            if (isFavorite(item.id)) {
              removeFromFavorites(item.id);
              Toast.show({
                type: 'info',
                text1: 'Removed from favorites',
                text2: `${item.name} removed from favorites`,
                position: 'bottom',
                visibilityTime: 1500,
              });
            } else {
              addToFavorites(item);
              Toast.show({
                type: 'success',
                text1: 'Added to favorites',
                text2: `${item.name} added to favorites`,
                position: 'bottom',
                visibilityTime: 1500,
              });
            }
          }}
        >
          <Icon 
            name={isFavorite(item.id) ? "heart" : "heart-o"} 
            size={16} 
            color={isFavorite(item.id) ? "#ff6b6b" : "#ccc"} 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.foodInfo}>
        <Text style={styles.foodName} numberOfLines={1}>{item.name}</Text>
        {/* <Text style={styles.foodDescription} numberOfLines={2}>{item.description}</Text> */}
        
        <View style={styles.foodMeta}>
          <View style={styles.rating}>
            <Icon name="star" size={14} color="#ffd700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.prepTime}>{item.prepTime}</Text>
        </View>
        
        <View style={styles.foodFooter}>
          <Text style={styles.foodPrice}>${item.price}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToCart(item)}
          >
            <Icon name="plus" size={12} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderPopularItem = ({ item }: { item: FoodItem }) => (
    <TouchableOpacity
      style={styles.popularCard}
      onPress={() => {
        // Navigate to food details screen with params
        router.push({
          pathname: '/food-details',
          params: { 
            id: item.id.toString(),
            name: item.name,
            description: item.description,
            price: item.price.toString(),
            image: item.image,
            rating: item.rating.toString(),
            prepTime: item.prepTime,
            category: item.category,
            calories: item.calories.toString(),
            isVeg: item.isVeg.toString()
          }
        });
      }}
      activeOpacity={0.8}
    >
      <TouchableOpacity
        style={styles.popularFavoriteButton}
        onPress={(e) => {
          e.stopPropagation();
          if (isFavorite(item.id)) {
            removeFromFavorites(item.id);
            Toast.show({
              type: 'info',
              text1: 'Removed from favorites',
              position: 'bottom',
              visibilityTime: 1500,
            });
          } else {
            addToFavorites(item);
            Toast.show({
              type: 'success',
              text1: 'Added to favorites',
              position: 'bottom',
              visibilityTime: 1500,
            });
          }
        }}
      >
        <Icon 
          name={isFavorite(item.id) ? "heart" : "heart-o"} 
          size={14} 
          color={isFavorite(item.id) ? "#ff6b6b" : "#ccc"} 
        />
      </TouchableOpacity>
      <Text style={styles.popularImage}>{item.image}</Text>
      <Text style={styles.popularName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.popularPrice}>${item.price}</Text>
      <TouchableOpacity
        style={styles.popularAddButton}
        onPress={(e) => {
          e.stopPropagation();
          handleAddToCart(item);
        }}
      >
        <Icon name="plus" size={12} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#688c5bff', '#63a055ff']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Hello! 👋</Text>
            <Text style={styles.title}>Muhammad Nidal</Text>
          </View>
          <TouchableOpacity 
            style={styles.cartButton}
            onPress={() => router.push('/(tabs)/cart')}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
              style={styles.cartButtonGradient}
            >
              <Icon name="shopping-cart" size={22} color="#fff" />
              {getCartItemCount() > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{getCartItemCount()}</Text>
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for food..."
              placeholderTextColor="#666"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Icon name="times" size={20} color="#666" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesContainer}
          >
            {categories.map(category => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.selectedCategoryButton
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.selectedCategoryText
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Popular Items */}
        {!searchQuery && selectedCategory === 'all' && (
          <View style={styles.popularSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Popular Items</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={popularFoods}
              renderItem={renderPopularItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.popularList}
            />
          </View>
        )}

        {/* Food Items */}
        <View style={styles.foodSection}>
          <Text style={styles.sectionTitle}>
            {searchQuery ? `Search Results (${foods.length})` : 
             selectedCategory === 'all' ? 'All Foods' : 
             categories.find(c => c.id === selectedCategory)?.name}
          </Text>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading delicious food...</Text>
            </View>
          ) : foods.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Icon name="search" size={50} color="#fff" />
              <Text style={styles.emptyText}>No food items found</Text>
              <Text style={styles.emptySubtext}>Try searching for something else</Text>
            </View>
          ) : (
            <FlatList
              data={foods}
              renderItem={renderFoodCard}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={styles.row}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
    marginBottom: 10,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    fontWeight: '500',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
    lineHeight: 30,
  },
  cartButton: {
    position: 'relative',
  },
  cartButtonGradient: {
    padding: 12,
    borderRadius: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#fff',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ff6b6b',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cartBadgeText: {
    color: '#ff6b6b',
    fontSize: 11,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  searchIcon: {
    marginRight: 15,
    opacity: 0.7,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  categoriesSection: {
    marginBottom: 25,
  },
  categoriesContainer: {
    paddingLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  seeAllText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  categoryButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 10,
    padding: 16,
    marginRight: 15,
    minWidth: 85,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  selectedCategoryButton: {
    backgroundColor: '#fff',
    elevation: 6,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  categoryIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  categoryText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: '#ff6b6b',
    fontWeight: 'bold',
  },
  popularSection: {
    marginBottom: 25,
  },
  popularList: {
    paddingLeft: 20,
  },
  popularCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginRight: 15,
    alignItems: 'center',
    width: 130,
    position: 'relative',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  popularImage: {
    fontSize: 45,
    marginBottom: 12,
  },
  popularName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 6,
    lineHeight: 18,
  },
  popularPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
  popularAddButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#ff6b6b',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  popularFavoriteButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  foodSection: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    width: '100%',
    minHeight: 300,
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
  },
  foodCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 18,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    width: (width - 60) / 2,
    overflow: 'hidden',
  },
  foodImageContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    position: 'relative',
    backgroundColor: '#fafafa',
  },
  foodImage: {
    fontSize: 55,
    marginBottom: 10,
  },
  vegBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  foodInfo: {
    padding: 18,
    backgroundColor: '#fff',
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
    lineHeight: 20,
  },
  foodDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    lineHeight: 16,
  },
  foodMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  prepTime: {
    fontSize: 11,
    color: '#666',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  foodFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  foodPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff6b6b',
  },
  addButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 14,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 50,
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.8,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 50,
  },
  emptyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
  },
  emptySubtext: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.7,
    marginTop: 5,
  },
});
