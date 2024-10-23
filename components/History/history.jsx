import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the back icon
import { useRouter } from 'expo-router'; // Import useRouter for navigation

// Dữ liệu cứng cho các booking đang diễn ra và đã qua sử dụng
const dummyOngoingBookings = [
  { id: 1, doctorName: 'Dr. John Doe', serviceName: 'Consultation', dateTime: '2024-10-25 10:00', rating: null },
  { id: 2, doctorName: 'Dr. Jane Smith', serviceName: 'Therapy', dateTime: '2024-10-26 14:00', rating: null },
  { id: 3, doctorName: 'Dr. Emily Davis', serviceName: 'Checkup', dateTime: '2024-10-27 16:00', rating: null },
];

const dummyPastBookings = [
  { id: 4, doctorName: 'Dr. Sarah Brown', serviceName: 'Surgery', dateTime: '2024-10-05 09:00', rating: 5 },
  { id: 5, doctorName: 'Dr. Michael White', serviceName: 'Consultation', dateTime: '2024-10-07 11:00', rating: 4 },
  { id: 6, doctorName: 'Dr. Lisa Green', serviceName: 'Therapy', dateTime: '2024-10-09 13:00', rating: 3 },
];

// Card cho từng booking

const BookingCard = ({ doctorName, serviceName, dateTime, rating, onViewDetails }) => {
  const formattedDate = dateTime.split(' ')[0].replace(/-/g, '/'); // Chuyển đổi định dạng ngày
  const isPastBooking = new Date(dateTime) < new Date(); // Kiểm tra nếu booking đã qua ngày

  return (
    <View style={styles.card}>
    <View style={styles.cardRow}>
      <Text style={styles.cardLabel}>Doctor:</Text>
      <Text style={styles.cardValue}>{doctorName}</Text>
    </View>
    <View style={styles.cardRow}>
      <Text style={styles.cardLabel}>Date:</Text>
      <Text style={styles.cardValue}>{formattedDate}</Text>
    </View>
    <View style={styles.cardRow}>
      <Text style={styles.cardLabel}>Service:</Text>
      <Text style={styles.cardValue}>{serviceName}</Text>
    </View>
  
    {/* Hiển thị số sao nếu là booking đã qua ngày */}
    {rating !== null && (
      <View style={styles.cardRow}>
        <Text style={styles.cardLabel}>Rating:</Text>
        <Text style={styles.cardValue}>{rating} ⭐</Text>
      </View>
    )}
  
    <TouchableOpacity style={styles.viewButton} onPress={onViewDetails}>
      <Text style={styles.viewButtonText}>View</Text>
    </TouchableOpacity>
  </View>
  
  );
};

// Màn hình lịch sử booking
const BookingHistory = () => {
  const [showOngoing, setShowOngoing] = useState(true);
  const router = useRouter(); // Sử dụng useRouter để điều hướng

  const handleViewDetails = (id) => {
    Alert.alert(`View details for booking ID: ${id}`);
  };

  return (
    <View style={styles.container}>
      {/* Header với icon back và tiêu đề */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>History</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowOngoing(true)}
        >
          <Text style={[styles.buttonText, showOngoing && styles.activeButtonText]}>
            Ongoing Bookings
          </Text>
          {showOngoing && <View style={styles.activeIndicator} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowOngoing(false)}
        >
          <Text style={[styles.buttonText, !showOngoing && styles.activeButtonText]}>
            Past Bookings
          </Text>
          {!showOngoing && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={showOngoing ? dummyOngoingBookings : dummyPastBookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <BookingCard
              doctorName={item.doctorName}
              serviceName={item.serviceName}
              dateTime={item.dateTime}
              rating={item.rating} 
              onViewDetails={() => handleViewDetails(item.id)}
            />
          )}
          ListEmptyComponent={<Text>No bookings available.</Text>}
        />
      </View>
    </View>
  );
};

export default BookingHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#A1D9A8',
    height: 50,
    marginBottom:10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
  },
  buttonText: {
    padding: 15,
    color: '#0F0F0F',
    fontWeight: 'bold',
  },
  activeIndicator: {
    marginTop: 5,
    height: 3,
    width: '100%',
    backgroundColor: '#A4DAA9',
    borderRadius: 2,
  },
  listContainer: {
    flex: 1,
    padding:20,
  },
  card: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardRow: {
    flexDirection: 'row',  // Các phần tử trong hàng sẽ nằm ngang
    justifyContent: 'space-between',  // Đẩy hai phần tử ra hai bên
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  cardValue: {
    fontSize: 13,
    color: '#555',
  },
  cardRating: {
    fontSize: 13,
    color: '#555',
  },
  viewButton: {
    flex: 1,
    marginTop: 5,
    padding: 5,
    backgroundColor: '#A4D8A8',
    borderRadius: 8,
    alignItems: 'center',
    width: 80,
    alignSelf: 'flex-end',
  },
  viewButtonText: {
    color: '#5C9161',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
