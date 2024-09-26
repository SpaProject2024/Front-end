import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, StatusBar } from 'react-native';

const favoritesData = [
  {
    id: '1',
    name: 'The Big Tease Salons',
    address: '2972 Westheimer Rd. Santa Ana, Illinois 85486',
    rating: 5,
    image: { uri: 'https://via.placeholder.com/80' }, // Link hình ảnh từ URL
  },
  {
    id: '2',
    name: 'Straight Razors',
    address: '1901 Thornridge Cir. Shiloh, Hawaii 81063',
    rating: 4,
    image: { uri: 'https://via.placeholder.com/80' }, // Link hình ảnh từ URL
  },
  {
    id: '3',
    name: 'Backyard Barbers',
    address: '2715 Ash Dr. San Jose, South Dakota 83475',
    rating: 3,
    image: { uri: 'https://via.placeholder.com/80' }, // Link hình ảnh từ URL
  },
  {
    id: '4',
    name: 'Salon Zeppelin',
    address: '3517 W. Gray St. Utica, Pennsylvania 57867',
    rating: 4,
    image: { uri: 'https://via.placeholder.com/80' }, // Link hình ảnh từ URL
  },
  {
    id: '5',
    name: 'Brooklyn Barbers',
    address: '2972 Westheimer Rd. Santa Ana, Illinois 85486',
    rating: 5,
    image: { uri: 'https://via.placeholder.com/80' }, // Link hình ảnh từ URL
  },
];

const Favorites = () => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.address}>{item.address}</Text>
        <View style={styles.rating}>
          {Array.from({ length: 5 }, (_, i) => (
            <Text key={i} style={{ color: i < item.rating ? '#f00' : '#ccc' }}>★</Text>
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Header with title */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorites</Text>
      </View>
      <FlatList
        data={favoritesData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: StatusBar.currentHeight || 20,
  },
  header: {
    backgroundColor: '#4CAF50',  // Màu nền cho tiêu đề
    paddingVertical: 15,
    paddingHorizontal: 16,
  
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',  // Màu chữ cho tiêu đề
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 10,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    padding: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  address: {
    fontSize: 12,
    color: '#666',
    marginVertical: 4,
  },
  rating: {
    flexDirection: 'row',
  },
});

export default Favorites;
