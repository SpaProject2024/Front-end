import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icons for back button and user info
import { LinearGradient } from 'expo-linear-gradient'; // For gradient background
import { useNavigation } from '@react-navigation/native'; // Import useNavigation for navigation

const ProfileScreen = () => {
  const navigation = useNavigation(); // Initialize navigation

  return (
    <View style={styles.wrapper}>
      {/* Header with back button and gradient background */}
      <LinearGradient colors={['#009966', '#005500']} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/150' }} 
            style={styles.profileImage} 
          />
          <Text style={styles.name}>Anna Avetisyan</Text>
        </View>
      </LinearGradient>

      {/* Profile details section */}
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={24} color="#7f00ff" />
          <Text style={styles.infoText}>Anna Avetisyan</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={24} color="#7f00ff" />
          <Text style={styles.infoText}>Birthday</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={24} color="#7f00ff" />
          <Text style={styles.infoText}>818 123 4567</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="mail-outline" size={24} color="#7f00ff" />
          <Text style={styles.infoText}>info@aplusdesign.co</Text>
        </View>
      </View>

    
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  header: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  infoSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  infoText: {
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
    color: '#333',
  },
  refreshIcon: {
    marginLeft: 'auto',
  },
  editProfileButton: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  gradientButton: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
  },

});

export default ProfileScreen;
