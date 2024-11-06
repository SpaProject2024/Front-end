import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons';
import { API_BASE_URL } from '../../LocalIP/localIP';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MenuItems = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Fetch data from API
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('userId');
      const response = await axios.get(`${API_BASE_URL}/notification`);
      const newNotifications = response.data.data;
      // Lọc các thông báo có senderID trùng với userId
      const filteredNotifications = newNotifications.filter(notification => notification.senderID === userId);
      setVisibleItems(filteredNotifications);
    } catch (error) {
      console.error("Không thể lấy thông báo:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchNotifications();
  }, []);

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator size="large" color="#F4CE14" />;
    }
    return null;
  };

  const goBack = () => {
    navigation.goBack();
  };

  const Item = ({ item }) => ( // Nhận từng item làm props
    <View style={menuStyles.innerContainer}>
      <View>
        <Text style={menuStyles.statusText}>{item.notification_type}</Text>
        <Text style={menuStyles.titleText}>{item.title}</Text>
        {/* <Text style={menuStyles.contentText}>{item.content}</Text> */}
      </View>
    </View>
  );

  return (
    <View style={menuStyles.container}>
      <View style={menuStyles.header}>
        <TouchableOpacity onPress={goBack} style={menuStyles.backButton}>
          <Icon name='arrow-back' size={24} color="#b0b0b0" />
        </TouchableOpacity>
        <Text style={menuStyles.title}>Notification</Text>
      </View>
      <FlatList
        data={visibleItems}
        renderItem={Item} // Sử dụng hàm Item để render
        keyExtractor={(item) => item._id} // Đảm bảo item có _id
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

const menuStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 50,
  },
  innerContainer: {
    backgroundColor: '#f9f9f9',  // Light background for each notification card
    borderWidth: 1,
    borderColor: '#ddd', // Light grey border color
    borderRadius: 8,  // Rounded corners
    padding: 15,
    margin: 10,
    shadowColor: "#000",  // Shadow for a card-like effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,  // Elevation for Android
  },
  statusText: {
    color: "#2B5F2F",
    fontSize: 16,
    fontWeight: "bold",
  },
  contentText: {
    color: "#333",
    marginTop: 5,
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: '#5C9161',
  },
  backButton: {
    marginRight: 20,
  },
});


export default MenuItems;
