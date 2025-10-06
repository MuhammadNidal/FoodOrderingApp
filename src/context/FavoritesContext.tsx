import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FoodItem } from './CartContext';

interface FavoritesContextType {
  favorites: FoodItem[];
  addToFavorites: (item: FoodItem) => void;
  removeFromFavorites: (itemId: number) => void;
  isFavorite: (itemId: number) => boolean;
  getFavoritesCount: () => number;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<FoodItem[]>([]);

  const addToFavorites = (item: FoodItem) => {
    setFavorites(currentFavorites => {
      // Check if item already exists
      const existingIndex = currentFavorites.findIndex(fav => fav.id === item.id);
      if (existingIndex !== -1) {
        return currentFavorites; // Already in favorites
      }
      return [...currentFavorites, item];
    });
  };

  const removeFromFavorites = (itemId: number) => {
    setFavorites(currentFavorites => 
      currentFavorites.filter(item => item.id !== itemId)
    );
  };

  const isFavorite = (itemId: number): boolean => {
    return favorites.some(item => item.id === itemId);
  };

  const getFavoritesCount = (): number => {
    return favorites.length;
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const value: FavoritesContextType = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    getFavoritesCount,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};