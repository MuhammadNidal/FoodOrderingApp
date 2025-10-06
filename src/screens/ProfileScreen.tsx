import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            logout();
            router.push('/');
          }
        }
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  };

  const handleOptionPress = (title: string) => {
    Alert.alert(title, `${title} feature coming soon!`);
  };

  // Mock user stats - in real app, these would come from API
  const userStats = {
    orders: user ? 23 : 0,
    rating: user ? 4.8 : 0,
    spent: user ? 245 : 0,
    favorites: user ? 12 : 0,
  };

  const profileOptions = [
    { icon: 'user', title: 'Personal Information', subtitle: 'Edit your profile details' },
    { icon: 'history', title: 'Order History', subtitle: 'View your past orders' },
    { icon: 'heart', title: 'Favorites', subtitle: `${userStats.favorites} favorite foods` },
    { icon: 'map-marker', title: 'Delivery Addresses', subtitle: 'Manage your addresses' },
    { icon: 'credit-card', title: 'Payment Methods', subtitle: 'Manage payment options' },
    { icon: 'bell', title: 'Notifications', subtitle: 'Push notification settings' },
    { icon: 'gift', title: 'Promotions & Offers', subtitle: 'View available deals' },
    { icon: 'star', title: 'Rate App', subtitle: 'Share your feedback' },
    { icon: 'question-circle', title: 'Help & Support', subtitle: 'Get help and support' },
    { icon: 'cog', title: 'Settings', subtitle: 'App preferences' },
  ];

  return (
    <LinearGradient colors={['#688c5bff', '#63a055ff']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        {user && (
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome back!</Text>
          </View>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {user ? (
          <>
            {/* User Info */}
            <View style={styles.userContainer}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  {user.profileImage ? (
                    <Image source={{ uri: user.profileImage }} style={styles.avatarImage} />
                  ) : (
                    <Icon name="user" size={40} color="#ff6b6b" />
                  )}
                </View>
                <View style={styles.onlineIndicator} />
              </View>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
              {user.phone && (
                <Text style={styles.userPhone}>📱 {user.phone}</Text>
              )}
              <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                <Icon name="edit" size={14} color="#fff" style={styles.editIcon} />
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Icon name="shopping-bag" size={20} color="#ff6b6b" style={styles.statIcon} />
                <Text style={styles.statNumber}>{userStats.orders}</Text>
                <Text style={styles.statLabel}>Orders</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Icon name="star" size={20} color="#ff6b6b" style={styles.statIcon} />
                <Text style={styles.statNumber}>{userStats.rating}</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Icon name="dollar" size={20} color="#ff6b6b" style={styles.statIcon} />
                <Text style={styles.statNumber}>${userStats.spent}</Text>
                <Text style={styles.statLabel}>Spent</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Icon name="heart" size={20} color="#ff6b6b" style={styles.statIcon} />
                <Text style={styles.statNumber}>{userStats.favorites}</Text>
                <Text style={styles.statLabel}>Favorites</Text>
              </View>
            </View>

            {/* Menu Options */}
            <View style={styles.optionsContainer}>
              {profileOptions.map((option, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={[
                    styles.optionItem,
                    index === profileOptions.length - 1 && styles.lastOptionItem
                  ]}
                  onPress={() => handleOptionPress(option.title)}
                >
                  <View style={styles.optionLeft}>
                    <View style={styles.optionIcon}>
                      <Icon name={option.icon} size={20} color="#ff6b6b" />
                    </View>
                    <View style={styles.optionText}>
                      <Text style={styles.optionTitle}>{option.title}</Text>
                      <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                    </View>
                  </View>
                  <Icon name="chevron-right" size={16} color="#ccc" />
                </TouchableOpacity>
              ))}

              {/* Logout Button */}
              <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Icon name="sign-out" size={20} color="#ff6b6b" />
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          /* Guest User */
          <View style={styles.guestContainer}>
            <View style={styles.guestIcon}>
              <Icon name="user-circle" size={80} color="#fff" />
            </View>
            <Text style={styles.guestTitle}>Welcome to FoodieApp!</Text>
            <Text style={styles.guestSubtitle}>
              Login to access your profile, order history, and personalized recommendations
            </Text>
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => router.push('/login')}
            >
              <Text style={styles.loginButtonText}>Login / Register</Text>
              <Icon name="arrow-right" size={16} color="#ff6b6b" style={styles.loginIcon} />
            </TouchableOpacity>
            
            {/* Limited Options for Guest */}
            <View style={styles.guestOptionsContainer}>
              <Text style={styles.guestOptionsTitle}>Available Options</Text>
              {profileOptions.slice(5, 8).map((option, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.guestOptionItem}
                  onPress={() => handleOptionPress(option.title)}
                >
                  <View style={styles.optionLeft}>
                    <View style={styles.optionIcon}>
                      <Icon name={option.icon} size={20} color="#ff6b6b" />
                    </View>
                    <View style={styles.optionText}>
                      <Text style={styles.optionTitle}>{option.title}</Text>
                      <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
                    </View>
                  </View>
                  <Icon name="chevron-right" size={16} color="#ccc" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>FoodieApp v1.0.0</Text>
          <Text style={styles.footerSubtext}>Made with ❤️ for food lovers</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  welcomeContainer: {
    marginTop: 5,
  },
  welcomeText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  userContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 30,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#ff6b6b',
  },
  avatarImage: {
    width: 74,
    height: 74,
    borderRadius: 37,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  userPhone: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  editButton: {
    backgroundColor: '#ff6b6b',
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  editIcon: {
    marginRight: 8,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ff6b6b',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#eee',
    marginHorizontal: 15,
  },
  optionsContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  lastOptionItem: {
    borderBottomWidth: 0,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  optionText: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff6b6b',
    marginLeft: 10,
  },
  guestContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 30,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  guestIcon: {
    marginBottom: 20,
    opacity: 0.7,
  },
  guestTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  guestSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
  },
  loginButton: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ff6b6b',
    marginBottom: 25,
  },
  loginButtonText: {
    color: '#ff6b6b',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  loginIcon: {
    marginLeft: 5,
  },
  guestOptionsContainer: {
    width: '100%',
  },
  guestOptionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  guestOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 40,
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 5,
  },
  footerSubtext: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.6,
  },
});