import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/150' }} 
          style={styles.profileImage} 
        />
        <Text style={styles.name}>Md Abu Ubayda</Text>
        <Text style={styles.phone}>+88001712346789</Text>
        <TouchableOpacity style={styles.editIcon}>
          <Icon name="edit" type="material" color="#fff" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.accountOverview}>
        <Text style={styles.accountOverviewTitle}>Account Overview</Text>

        <TouchableOpacity style={styles.optionRow}>
          <Icon name="user" type="font-awesome" color="#6a5acd" size={24} />
          <Text style={styles.optionText}>My Profile</Text>
          <Icon name="chevron-right" type="material" color="#6a5acd" size={24} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Icon name="shopping-bag" type="font-awesome" color="#2e8b57" size={24} />
          <Text style={styles.optionText}>My Favorites</Text>
          <Icon name="chevron-right" type="material" color="#2e8b57" size={24} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Icon name="undo" type="font-awesome" color="#8a2be2" size={24} />
          <Text style={styles.optionText}>History</Text>
          <Icon name="chevron-right" type="material" color="#8a2be2" size={24} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Icon name="lock" type="font-awesome" color="#ff4500" size={24} />
          <Text style={styles.optionText}>Change Password</Text>
          <Icon name="chevron-right" type="material" color="#ff4500" size={24} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Icon name="language" type="font-awesome" color="#ff69b4" size={24} />
          <Text style={styles.optionText}>Change Language</Text>
          <Icon name="chevron-right" type="material" color="#ff69b4" size={24} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default ProfileScreen;
