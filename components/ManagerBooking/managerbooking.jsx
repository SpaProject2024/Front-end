import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { API_BASE_URL } from '../../LocalIP/localIP';
export default function ManagerBooking() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
  
    // Hàm gọi API sử dụng Axios
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/appointments`); // Gọi API lấy danh sách appointments
        setAppointments(response.data.data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false); // Dừng trạng thái loading sau khi hoàn thành
      }
    };
  
    // Gọi API khi component được render
    useEffect(() => {
      fetchAppointments();
    }, []);
  
    // Hàm để render từng item trong danh sách
    const renderItem = ({ item }) => (
      <View style={styles.bookingItem}>
        <Text style={styles.bookingText}>
          Appointment Date: {new Date(item.appointmentDate).toLocaleString()}
        </Text>
        <Text style={styles.bookingText}>Status: {item.status}</Text>
        <Text style={styles.bookingText}>Doctor ID: {item.doctor}</Text>
        <Text style={styles.bookingText}>User ID: {item.user}</Text>
        <Text style={styles.bookingText}>Services Count: {item.services.length}</Text>
      </View>
    );
  
    if (loading) {
      return (
        <View style={styles.loading}>
          <Text>Loading...</Text>
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Booking Management</Text>
        <FlatList
          data={appointments} // danh sách dữ liệu từ API
          renderItem={renderItem} // hàm render từng item
          keyExtractor={(item) => item._id} // khóa duy nhất cho mỗi item
        />
      </View>
    );
  }
  
  // Định dạng kiểu cho danh sách
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 10,
    },
    bookingItem: {
      padding: 15,
      marginVertical: 10,
      backgroundColor: "#f9c2ff",
      borderRadius: 10,
    },
    bookingText: {
      fontSize: 18,
    },
    loading: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });