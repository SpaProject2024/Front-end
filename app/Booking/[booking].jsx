import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { useRouter } from 'expo-router'; 

const ongoingBookings = [
  {
    id: '1',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyDs15DNKMDHVUXsZ2XgwfCVwtSmjzrG5Wiw&s',
    name: 'Booking One',
    rating: 4.5,
    location: 'Location A',
  },
  {
    id: '2',
    image: 'https://thietkethicong.org/Uploads/images/SALONTOC/1/salontoc_dep.jpg',
    name: 'Booking Two',
    rating: 3.8,
    location: 'Location B',
  },
  {
    id: '3',
    image: 'https://kientruchoanmy.vn/wp-content/uploads/2022/11/43e259149754607.62ecf7cdf25c8-min.jpg',
    name: 'Booking Three',
    rating: 1,
    location: 'Location B',
  },
  {
    id: '3',
    image: 'https://kientruchoanmy.vn/wp-content/uploads/2022/11/43e259149754607.62ecf7cdf25c8-min.jpg',
    name: 'Booking Three',
    rating: 3,
    location: 'Location B',
  },
  {
    id: '1',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyDs15DNKMDHVUXsZ2XgwfCVwtSmjzrG5Wiw&s',
    name: 'Booking One',
    rating: 2,
    location: 'Location A',
  },
];

const historyBookings = [
  {
    id: '3',
    image: 'https://kientruchoanmy.vn/wp-content/uploads/2022/11/43e259149754607.62ecf7cdf25c8-min.jpg',
    name: 'Booking Three',
    rating: 1,
    location: 'Location B',
  },
  {
    id: '4',
    image: 'https://thietkethicong.org/Uploads/images/SALONTOC/1/thiet-ke-salon-toc%20(8).jpg',
    name: 'Booking Four',
    rating: 2,
    location: 'Location B',
  },
  {
    id: '5',
    image: 'https://anviethouse.vn/wp-content/uploads/2022/06/thiet-ke-noi-that-salon-toc-dep-dang-cap-5.jpg',
    name: 'Booking Five',
    rating: 3.9,
    location: 'Location B',
  },
  {
    id: '3',
    image: 'https://kientruchoanmy.vn/wp-content/uploads/2022/11/43e259149754607.62ecf7cdf25c8-min.jpg',
    name: 'Booking Three',
    rating: 4,
    location: 'Location B',
  },
  {
    id: '3',
    image: 'https://kientruchoanmy.vn/wp-content/uploads/2022/11/43e259149754607.62ecf7cdf25c8-min.jpg',
    name: 'Booking Three',
    rating: 5,
    location: 'Location B',
  },
  {
    id: '3',
    image: 'https://kientruchoanmy.vn/wp-content/uploads/2022/11/43e259149754607.62ecf7cdf25c8-min.jpg',
    name: 'Booking Three',
    rating: 1.5,
    location: 'Location B',
  },
];

const Favorite = () => {
  const [activeTab, setActiveTab] = useState('ongoing');
  const router = useRouter(); 
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.bookingItem} onPress={() => router.push('/BookingDetail/bookingdetail')}>
      <Image style={styles.bookingImage} source={{ uri: item.image }} />
      <View style={styles.bookingInfo}>
        <Text style={styles.bookingName}>{item.name}</Text>
        <View style={styles.bookingDetails}>
          <Text style={styles.bookingRating}>
            <Icon name="star" size={16} color="#FFD700" /> {item.rating}
          </Text>
          <Text style={styles.bookingLocation}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => setActiveTab('ongoing')}
          style={[styles.tabButton, activeTab === 'ongoing' && styles.activeTab]}
        >
          <Text style={[styles.tabButtonText, activeTab === 'ongoing' && styles.activeTabText]}>
            Ongoing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('history')}
          style={[styles.tabButton, activeTab === 'history' && styles.activeTab]}
        >
          <Text style={[styles.tabButtonText, activeTab === 'history' && styles.activeTabText]}>
            History
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={activeTab === 'ongoing' ? ongoingBookings : historyBookings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  tabButton: {
    width: 100,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#2b5f2f',
  },
  tabButtonText: {
    fontSize: 14,
    color: '#333',
  },
  activeTabText: {
    color: '#fff',
  },
  listContainer: { 
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  bookingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff', 
    borderRadius: 8, 
    elevation: 2, 
  },
  bookingImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  bookingDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  bookingRating: {
    fontSize: 16,
    color: '#333',
  },
  bookingLocation: {
    fontSize: 14,
    color: '#666',
  },
});



export default Favorite;
