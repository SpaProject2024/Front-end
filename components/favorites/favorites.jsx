import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons cho nút back
import { useRouter } from 'expo-router'; // Import useRouter để điều hướng

const initialFavoritesData = [
  {
    id: '1',
    name: 'Exfoliation service',
    address: 'damage facial skin care',
    rating: 5,
    image: { uri: 'https://storage.googleapis.com/ops-shopee-files-live/live/shopee-blog/2022/03/e595944e-cac-dich-vu-spa-3.jpg' },
  },
  {
    id: '2',
    name: 'Melasma and freckles treatment service',
    address: 'damage facial skin caredamage facial skin caredamage facial skin caredamage facial skin caredamage facial skin caredamage facial skin care',
    rating: 4,
    image: { uri: 'https://storage.googleapis.com/ops-shopee-files-live/live/shopee-blog/2022/03/75fe2ae7-cac-dich-vu-spa-1.jpg' },
  },
  {
    id: '3',
    name: 'Facial care services',
    address: 'damage facial skin care',
    rating: 3,
    image: { uri: 'https://noithatart.com/wp-content/uploads/2019/09/dich-vu-cham-soc-da-mat-cho-nam-gioi.jpg' },
  },
  
];

const Favorites = () => {
  const [favorites, setFavorites] = useState(initialFavoritesData);
  const router = useRouter();

  const handleDelete = (id) => {
    Alert.alert(
      "Xóa mục yêu thích",
      "Bạn có chắc chắn muốn xóa mục này?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            setFavorites((prevFavorites) => prevFavorites.filter(item => item.id !== id));
          },
        },
      ]
    );
  };

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
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={() => handleDelete(item.id)}>
            <Text style={styles.buttonText}>Xóa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => router.push(`/details/${item.id}`)}>
            <Text style={styles.buttonText}>Chi tiết</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
      </View>
      <FlatList
        data={favorites}
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
  },
  header: {
    backgroundColor: '#009999',
    paddingVertical: 25,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
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
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  button: {
    backgroundColor: '#DDDDDD',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginRight: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Favorites;