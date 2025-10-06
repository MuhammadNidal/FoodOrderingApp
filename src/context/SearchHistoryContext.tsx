import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchHistoryContextType {
  recentSearches: string[];
  addSearch: (query: string) => void;
  clearSearchHistory: () => void;
  getPopularSearches: () => string[];
}

const SearchHistoryContext = createContext<SearchHistoryContextType | undefined>(undefined);

export const useSearchHistory = () => {
  const context = useContext(SearchHistoryContext);
  if (!context) {
    throw new Error('useSearchHistory must be used within a SearchHistoryProvider');
  }
  return context;
};

interface SearchHistoryProviderProps {
  children: ReactNode;
}

export const SearchHistoryProvider: React.FC<SearchHistoryProviderProps> = ({ children }) => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Popular searches - these could come from analytics in a real app
  const popularSearches = [
    'Pizza', 'Burger', 'Sushi', 'Pasta', 'Tacos', 
    'Ice Cream', 'Salad', 'Coffee', 'Sandwich', 'Chicken'
  ];

  const addSearch = (query: string) => {
    if (!query.trim()) return;

    const trimmedQuery = query.trim();
    
    setRecentSearches(currentSearches => {
      // Remove if already exists
      const filteredSearches = currentSearches.filter(
        search => search.toLowerCase() !== trimmedQuery.toLowerCase()
      );
      
      // Add to beginning and limit to 10 searches
      return [trimmedQuery, ...filteredSearches].slice(0, 10);
    });
  };

  const clearSearchHistory = () => {
    setRecentSearches([]);
  };

  const getPopularSearches = (): string[] => {
    return popularSearches;
  };

  const value: SearchHistoryContextType = {
    recentSearches,
    addSearch,
    clearSearchHistory,
    getPopularSearches,
  };

  return (
    <SearchHistoryContext.Provider value={value}>
      {children}
    </SearchHistoryContext.Provider>
  );
};