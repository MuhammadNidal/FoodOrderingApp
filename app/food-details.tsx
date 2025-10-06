import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { router, useLocalSearchParams } from 'expo-router';

export default function FoodDetailsScreen() {
  const params = useLocalSearchParams();
  
  return (
    <LinearGradient colors={['#688c5bff', '#63a055ff']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Food Details</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.foodImage}>{params.image}</Text>
        <Text style={styles.foodName}>{params.name}</Text>
        <Text style={styles.foodDescription}>{params.description}</Text>
        <Text style={styles.foodPrice}>${params.price}</Text>
        
        <TouchableOpacity style={styles.backToMenuButton} onPress={() => router.back()}>
          <Text style={styles.backToMenuText}>Back to Menu</Text>
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
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    padding: 10,
    marginRight: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    alignItems: 'center',
  },
  foodImage: {
    fontSize: 100,
    marginBottom: 20,
  },
  foodName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  foodDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  foodPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginBottom: 30,
  },
  backToMenuButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
  },
  backToMenuText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});