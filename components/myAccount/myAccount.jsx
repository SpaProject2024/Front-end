import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for back button
import { useRouter } from 'expo-router'; // Import useRouter for navigation

const MyAccount = () => {
  const router = useRouter(); // Use useRouter for navigation

  return (
    <View style={styles.wrapper}>
      {/* Header with Back button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Image 
          source={{ uri: 'https://via.placeholder.com/150' }} 
          style={styles.profileImage} 
        />
        <Text style={styles.name}>Md Abu Ubayda</Text>
        <Text style={styles.phone}>+88001712346789</Text>
        <TouchableOpacity style={styles.editIcon}  onPress={() => router.push('/EditProfile/editprofile.jsx')}>
          <Icon name="edit" type="material" color="#fff" size={20} />
        </TouchableOpacity>
      </View>

      {/* Profile content */}
      <ScrollView style={styles.accountOverview}>
        <Text style={styles.accountOverviewTitle}>Account Overview</Text>

        <TouchableOpacity 
        style={styles.optionRow}
        onPress={() => router.push('/ProfileScreen/profileScreen.jsx')}
        >
          <Icon name="user" type="font-awesome" color="#6a5acd" size={24} />
          <Text style={styles.optionText}>My Profile</Text>
          <Icon name="chevron-right" type="material" color="#6a5acd" size={24} />
        </TouchableOpacity>

        {/* Navigate to My Favorites */}
        <TouchableOpacity 
          style={styles.optionRow} 
          onPress={() => router.push('/Favorites/favorites.jsx')}
        >
          <Icon name="shopping-bag" type="font-awesome" color="#2e8b57" size={24} />
          <Text style={styles.optionText}>My Favorites</Text>
          <Icon name="chevron-right" type="material" color="#2e8b57" size={24} />
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.optionRow} 
         onPress={() => router.push('/History/history.jsx')}>
          <Icon name="undo" type="font-awesome" color="#8a2be2" size={24} />
          <Text style={styles.optionText}>History</Text>
          <Icon name="chevron-right" type="material" color="#8a2be2" size={24} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}
   onPress={() => router.push('/Review/review.jsx')}>
          <Icon name="lock" type="font-awesome" color="#ff4500" size={24} />
          <Text style={styles.optionText}>Change Password</Text>
          <Icon name="chevron-right" type="material" color="#ff4500" size={24} />
        </TouchableOpacity>

        {/* Navigate to HelpSupport */}
        <TouchableOpacity 
          style={styles.optionRow} 
          onPress={() => router.push('/HelpSupport/helpSupport.jsx')}
        >
          <Ionicons name="help-circle" size={24} color="#ff69b4" />
          <Text style={styles.optionText}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={24} color="#ff69b4" />
        </TouchableOpacity>

      
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#004d40',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  phone: {
    fontSize: 14,
    color: '#fff',
  },
  editIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: '#ffa500',
    borderRadius: 20,
    padding: 5,
  },
  accountOverview: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  accountOverviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 15,
    flex: 1,
  },
});

export default MyAccount;
