
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { CartProvider } from '@/src/context/CartContext';
import { AuthProvider } from '@/src/context/AuthContext';
import { FavoritesProvider } from '@/src/context/FavoritesContext';
import { OrderHistoryProvider } from '@/src/context/OrderHistoryContext';
import { SearchHistoryProvider } from '@/src/context/SearchHistoryContext';
import { DefaultTheme, ThemeProvider, DarkTheme } from '@react-navigation/native';

export const unstable_settings = {
  // We want the splash screen to be the initial route
  initialRouteName: 'index',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <OrderHistoryProvider>
            <SearchHistoryProvider>
              <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="login" options={{ headerShown: false }} />
                  <Stack.Screen name="checkout" options={{ headerShown: false }} />
                  <Stack.Screen name="food-details" options={{ headerShown: false }} />
                  <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
                </Stack>
                <StatusBar style="auto" />
                <Toast />
              </ThemeProvider>
            </SearchHistoryProvider>
          </OrderHistoryProvider>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  );
}