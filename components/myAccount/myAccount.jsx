import React, { useState, useEffect, cloneElement } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for back button
import { useRouter } from 'expo-router'; // Import useRouter for navigation
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL } from '../../LocalIP/localIP';
const MyAccount = () => {
  const router = useRouter(); // Use useRouter for navigation
  const [userData, setUserData] = useState(null);
  // Khởi tạo state cho từng thông tin cần chỉnh sửa
  const [fullName, setFullName] = useState('');
  const [numberPhone, setNumberPhone] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await AsyncStorage.getItem('userdata');
        if (user !== null) {
          const parsedData = JSON.parse(user);
          setUserData(parsedData.data);
          // Only fetch detailed info for doctors
          if (parsedData.data.role === 'doctor') {
            const response = await axios.get(`${API_BASE_URL}/doctor/${parsedData.data.doctorId}`);
            const doctorData = response.data;
            setFullName(doctorData.data.fullName || '');
            setNumberPhone(doctorData.data.numberPhone || '');
          } else if (parsedData.data.role === 'customer') {
            const response = await axios.get(`${API_BASE_URL}/customer/${parsedData.data.customerId}`);
            const customerData = response.data;
            setFullName(customerData.data.fullName || '');
            setNumberPhone(customerData.data.numberPhone || '');
          } else if (parsedData.data.role === 'staff') {
            const response = await axios.get(`${API_BASE_URL}/staff/${parsedData.data.staffId}`);
            const staffData = response.data;
            setFullName(staffData.data.fullName || '');
            setNumberPhone(staffData.data.numberPhone || '');
          } else if (parsedData.data.role === 'manager') {
            // const response = await axios.get(`${API_BASE_URL}/manager/${parsedData.data.managerId}`);
            // const customerData = response.data;
            // Set default values for customers
            setFullName(parsedData.fullName || '');
            setNumberPhone(parsedData.numberPhone || '');
          }
        }
      } catch (error) {
        console.error('Failed to load user data from AsyncStorage or API:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <View style={styles.wrapper}>
      {/* Header with Back button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <Image
          source={{ uri: 'https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-male-avatar-image-in-the-circle-image_2908803.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.phone}>0{numberPhone}</Text>
        <TouchableOpacity style={styles.editIcon} onPress={() => router.push('/EditProfile/editprofile')}>
          <Icon name="edit" type="material" color="#fff" size={20} />
        </TouchableOpacity>
      </View>

      {/* Profile content */}
      <ScrollView style={styles.accountOverview}>
        <Text style={styles.accountOverviewTitle}>Account Overview</Text>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => router.push('/ProfileScreen/profileScreen')}
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

        {/* <TouchableOpacity
          style={styles.optionRow}
          onPress={() => router.push('/History/history.jsx')}>
          <Icon name="undo" type="font-awesome" color="#8a2be2" size={24} />
          <Text style={styles.optionText}>History</Text>
          <Icon name="chevron-right" type="material" color="#8a2be2" size={24} />
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.optionRow}
          onPress={() => router.push('/changePassword/changepassword')}>
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
    backgroundColor: '#2B5F2F',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 40,
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
    color: '#ffffff',
  },
  phone: {
    fontSize: 14,
    color: '#ffffff',
  },
  editIcon: {
    position: 'absolute',
    right: 20,
    top: 40,
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
