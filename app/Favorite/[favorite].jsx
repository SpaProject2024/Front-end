import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const favoriteBookings = [
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
   
];

const Favorite = () => {
    const renderItem = ({ item }) => (
        <View style={styles.bookingItem}>
            <Image style={styles.bookingImage} source={{ uri: item.image }} />
            <View style={styles.bookingInfo}>
                <Text style={styles.bookingName}>{item.name}</Text>
                <View style={styles.bookingDetails}>
                    <Text style={styles.bookingRating}>
                        <Icon name="star" size={16} color="#FFD700" /> {item.rating}
                    </Text>
                </View>
                <Text style={styles.bookingLocation}>{item.location}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={favoriteBookings}
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
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    listContainer: {
        paddingHorizontal: 16,
        marginTop: 10,
    },
    bookingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 8,
    },
    bookingImage: {
        width: 100,
        height: 100,
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
    },
    bookingDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bookingRating: {
        fontSize: 16,
        color: '#333',
        marginRight: 16,
    },
    bookingLocation: {
        fontSize: 16,
        color: '#666',
    },
});

export default Favorite;
