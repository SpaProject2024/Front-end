import React, { useState, useEffect, cloneElement } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Icons for back button and user info
import { LinearGradient } from 'expo-linear-gradient'; // For gradient background
import { useRouter } from 'expo-router';
import { styles } from "./styles";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../../LocalIP/localIP';
const ProfileScreen = () => {
  const router = useRouter();
  // Khởi tạo state cho thông tin người dùng
  const [userData, setUserData] = useState(null);
  // Khởi tạo state cho từng thông tin cần chỉnh sửa
  const [fullName, setFullName] = useState('');
  const [numberPhone, setNumberPhone] = useState(null);
  const [address, setAddress] = useState('');
  const [birthday, setBirthday] = useState(null);

  // Thông tin bổ sung cho doctor
  const [avatar, setAvatar] = useState('');
  const [experience, setExperience] = useState(0);
  const [description, setDescription] = useState('');
  const [workingtime, setWorkingtime] = useState(0);

  // Thông tin bổ sung cho staff
  const [membershipLevel, setMembershipLevel] = useState('Bronze');

  // Thông tin bổ sung cho customer
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState(0);

  // Lấy thông tin từ AsyncStorage khi component được mount
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
            // Đổ dữ liệu vào form
            setFullName(doctorData.data.fullName || '');
            setNumberPhone(doctorData.data.numberPhone || '');
            setAvatar(doctorData.data.avatar || '');
            setAddress(doctorData.data.address || '');
            setBirthday(doctorData.data.birthday ? doctorData.data.birthday.split('T')[0] : '');
            setExperience(doctorData.data.experience || 0);
            setDescription(doctorData.data.description || '');
            setWorkingtime(doctorData.data.workingtime || 0);
          } else if (parsedData.data.role === 'customer') {
            const response = await axios.get(`${API_BASE_URL}/customer/${parsedData.data.customerId}`);
            const customerData = response.data;
            console.log("hau", customerData);
            // Set default values for staff
            setFullName(customerData.data.fullName || '');
            setNumberPhone(customerData.data.numberPhone || '');
            setAddress(customerData.data.address || '');
            setBirthday(customerData.data.birthday ? customerData.data.birthday.split('T')[0] : '');
            setMembershipLevel(customerData.data.membershipLevel || 'Bronze');
          } else if (parsedData.data.role === 'staff') {
            const response = await axios.get(`${API_BASE_URL}/staff/${parsedData.data.staffId}`);
            const staffData = response.data;
            console.log("hau", staffData);
            // Set default values for customers
            setFullName(staffData.data.fullName || '');
            setNumberPhone(staffData.data.numberPhone || '');
            setAddress(staffData.data.address || '');
            setBirthday(staffData.data.birthday ? staffData.data.birthday.split('T')[0] : '');
            setPosition(staffData.data.position || '');
            setPosition(staffData.data.salary || '');
          } else if (parsedData.data.role === 'manager') {
            const response = await axios.get(`${API_BASE_URL}/manager/${parsedData.data.managerId}`);
            const managerData = response.data;
            console.log("hau", managerData);
            // Set default values for customers
            setFullName(managerData.fullName || '');
            setNumberPhone(managerData.numberPhone || '');
            setAddress(managerData.address || '');
            setBirthday(managerData.data.birthday ? managerData.data.birthday.split('T')[0] : '');
            setPosition(managerData.position || '');
            setPosition(managerData.salary || '');
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
      {/* Header with back button and gradient background */}
      <LinearGradient colors={['#2B5F2F', '#2B5F2F']} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.profileInfo}>
          <Image
            source={{
              uri: avatar
                ? avatar
                : 'https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-male-avatar-image-in-the-circle-image_2908803.jpg'
            }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{fullName || 'No name yet'}</Text>
        </View>
      </LinearGradient>

      {/* Profile details section */}
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={24} color="#7f00ff" />
          <Text style={styles.infoText}>{fullName || 'No name yet'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={24} color="#7f00ff" />
          <Text style={styles.infoText}>{birthday || 'No Date of Birth'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="call-outline" size={24} color="#7f00ff" />
          <Text style={styles.infoText}>0{numberPhone || 'No Phone Number'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={24} color="#7f00ff" />
          <Text style={styles.infoText}>{address || 'No Address'}</Text>
        </View>
        {userData && userData.role === 'doctor' && (
          <>
            <View style={styles.infoRow}>
              <Ionicons name="star-outline" size={24} color="#7f00ff" />
              <Text style={styles.infoText}>{experience || 'No Experience'}</Text>
            </View>
            {/* <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={24} color="#7f00ff" />
              <Text style={styles.infoText}>{workingtime || 'No Time to Work'}</Text>
            </View> */}
            <View style={styles.infoRow}>
              <Ionicons name="document-text-outline" size={24} color="#7f00ff" />
              <Text style={styles.infoText}>{description || 'No Description'}</Text>
            </View>

          </>
        )}
        {userData && userData.role === 'customer' && (
          <View style={styles.infoRow}>
            <Ionicons name="trophy-outline" size={24} color="#7f00ff" />
            <Text style={styles.infoText}>{membershipLevel || 'No Membership Level'}</Text>
          </View>
        )}
        {/* {userData && userData.role === 'staff' && (
          <>
            <View style={styles.infoRow}>
              <Ionicons name="business-outline" size={24} color="#7f00ff" />
              <Text style={styles.infoText}>{position || 'No Position'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="cash-outline" size={24} color="#7f00ff" />
              <Text style={styles.infoText}>{salary || 'No Salary'}</Text>
            </View>
          </>
        )} */}
      </View>


    </View>
  );
};


export default ProfileScreen;
