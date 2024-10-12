import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the back icon
import { useRouter } from 'expo-router'; // Import useRouter for navigation

const reviewsData = [
  {
    id: '1',
    name: 'John Doe',
    rate: 5,
    review: 'Amazing product! Highly recommend it.',
    image: 'https://via.placeholder.com/150', // Thay thế bằng URL hình ảnh thực tế
  },
  {
    id: '2',
    name: 'Jane Smith',
    rate: 4,
    review: 'Very good quality, but a bit expensive.',
    image: 'https://via.placeholder.com/150', // Thay thế bằng URL hình ảnh thực tế
  },
  {
    id: '3',
    name: 'Bob Johnson',
    rate: 3,
    review: 'It was okay, nothing special.',
    image: 'https://via.placeholder.com/150', // Thay thế bằng URL hình ảnh thực tế
  },
  {
    id: '6',
    name: 'Bob Johnson',
    rate: 3,
    review: 'It was okay, nothing special.',
    image: 'https://via.placeholder.com/150', // Thay thế bằng URL hình ảnh thực tế
  },
  {
    id: '3',
    name: 'Bob Johnson',
    rate: 3,
    review: 'It was okay, nothing special.',
    image: 'https://via.placeholder.com/150', // Thay thế bằng URL hình ảnh thực tế
  },
  {
    id: '5',
    name: 'Bob Johnson',
    rate: 3,
    review: 'It was okay, nothing special.',
    image: 'https://via.placeholder.com/150', // Thay thế bằng URL hình ảnh thực tế
  },
];

const ReviewScreen = () => {
  const router = useRouter(); // Initialize the router

  const renderReviewItem = ({ item }) => {
    return (
      <View style={styles.reviewItem}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.rate}>Rating: {item.rate} ⭐</Text>
          </View>
        </View>
        {/* Review Text */}
        <Text style={styles.review}>{item.review}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review</Text>
      </View>
      <FlatList
      style={styles.listreivew}
        data={reviewsData}
        renderItem={renderReviewItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#A1D9A8',
    height: 50,
   
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  listreivew:{
    padding:16,
  },
  reviewItem: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2, 
    
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rate: {
    fontSize: 16,
    color: '#555',
  },
  review: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
  },
});

export default ReviewScreen;
