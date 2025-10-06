import React from 'react';
import {
  StyleSheet,
  Text,
  View,
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

const { width } = Dimensions.get('window');

export default function FavoritesScreen() {
  const { addToCart } = useCart();
  const { favorites, removeFromFavorites, clearFavorites } = useFavorites();

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

  const handleRemoveFromFavorites = (food: FoodItem) => {
    removeFromFavorites(food.id);
    Toast.show({
      type: 'info',
      text1: 'Removed from Favorites',
      text2: `${food.name} removed from your favorites`,
      position: 'bottom',
      visibilityTime: 1500,
    });
  };

  const handleClearAll = () => {
    if (favorites.length === 0) return;
    
    clearFavorites();
    Toast.show({
      type: 'info',
      text1: 'Favorites Cleared',
      text2: 'All favorites have been removed',
      position: 'bottom',
      visibilityTime: 1500,
    });
  };

  const renderFavoriteCard = ({ item }: { item: FoodItem }) => (
    <TouchableOpacity
      style={styles.favoriteCard}
      onPress={() => {
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
      <View style={styles.cardHeader}>
        <Text style={styles.foodImage}>{item.image}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveFromFavorites(item)}
        >
          <Icon name="heart" size={20} color="#ff6b6b" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.cardContent}>
        <Text style={styles.foodName} numberOfLines={1}>{item.name}</Text>
        {/* <Text style={styles.foodDescription} numberOfLines={2}>{item.description}</Text> */}
        
        <View style={styles.foodMeta}>
          <View style={styles.rating}>
            <Icon name="star" size={14} color="#ffd700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.prepTime}>{item.prepTime}</Text>
          {item.isVeg && <View style={styles.vegIndicator} />}
        </View>
        
        <View style={styles.cardFooter}>
          <Text style={styles.foodPrice}>${item.price}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleAddToCart(item)}
          >
            <Icon name="plus" size={14} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#688c5bff', '#63a055ff']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerButton}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Favorites</Text>
        {favorites.length > 0 && (
          <TouchableOpacity onPress={handleClearAll} style={styles.headerButton}>
            <Icon name="trash" size={20} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      {/* Favorites Count */}
      <View style={styles.countContainer}>
        <Icon name="heart" size={20} color="#fff" />
        <Text style={styles.countText}>
          {favorites.length} {favorites.length === 1 ? 'favorite' : 'favorites'}
        </Text>
      </View>

      {/* Content */}
      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="heart-o" size={80} color="rgba(255,255,255,0.6)" />
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptySubtitle}>
            Start adding your favorite foods by tapping the heart icon on any food item
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => router.push('/')}
          >
            <Text style={styles.exploreButtonText}>Explore Foods</Text>
            <Icon name="arrow-right" size={16} color="#ff6b6b" style={styles.exploreIcon} />
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <FlatList
            data={favorites}
            renderItem={renderFavoriteCard}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            contentContainerStyle={styles.listContainer}
          />
        </ScrollView>
      )}
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
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    minWidth: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 20,
    borderRadius: 15,
    paddingVertical: 12,
  },
  countText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  exploreButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  exploreButtonText: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  exploreIcon: {
    marginLeft: 5,
  },
  scrollContainer: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  row: {
    justifyContent: 'space-between',
  },
  favoriteCard: {
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
  cardHeader: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#fafafa',
    position: 'relative',
  },
  foodImage: {
    fontSize: 50,
  },
  removeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
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
  cardContent: {
    padding: 16,
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
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
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
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
  },
  vegIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  cardFooter: {
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
});