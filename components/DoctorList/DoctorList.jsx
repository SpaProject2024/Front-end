import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../LocalIP/localIP";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DoctorList() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctors list from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // Gọi API lấy danh sách bác sĩ
        const response = await axios.get(`${API_BASE_URL}/doctor`);

        // Kiểm tra phản hồi và cập nhật danh sách bác sĩ
        const fetchedDoctors = response.data.data || [];
        if (fetchedDoctors.length > 0) {
          setDoctors(fetchedDoctors);
        } else {
          setDoctors([]); // Không tìm thấy bác sĩ
        }
      } catch (err) {
        // Xử lý lỗi khi không thể lấy được danh sách
        setError("Error fetching doctors.");
        console.error("Error fetching doctors:", err);
      } finally {
        // Kết thúc loading
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Component để hiển thị thông tin của một bác sĩ
  const Doctor = ({ doctor }) => ( // Nhận doctor như là một prop
    <TouchableOpacity
      onPress={() => {
        router.push({
          pathname: 'doctordetail/doctordetail',
          params: { doctorId: doctor.doctorId._id }, // Truyền ID qua params
        });
      }}
    >
      <View>
        <Image
          style={styles.image}
          source={{
            uri: doctor.avatar || // Sửa thành doctor.avatar
              "https://imgcdn.stablediffusionweb.com/2024/5/20/e4b6d281-aa03-4d46-b322-0f32374bc98b.jpg",
          }}
        />
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
        {doctor.doctorId.fullName}
        </Text>
      </View>
    </TouchableOpacity>
    // <View style={styles.card}>
    //   <Image
    //     style={styles.image}
    //     source={{
    //       uri: doctor.avatar || // Sửa thành doctor.avatar
    //         "https://imgcdn.stablediffusionweb.com/2024/5/20/e4b6d281-aa03-4d46-b322-0f32374bc98b.jpg",
    //     }}
    //   />
    //   <View style={styles.details}>
    //     <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
    //       {doctor.doctorId.fullName}
    //     </Text>
    //     <TouchableOpacity
    //       style={styles.button}
    //       onPress={() => {
    //         router.push({
    //           pathname: 'doctordetail/doctordetail',
    //           params: { doctorId: doctor.doctorId._id }, // Truyền ID qua params
    //         });
    //       }}
    //     >
    //       <Text style={styles.buttonText}>View Details</Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
  );


  // Hiển thị khi đang loading
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading doctors...</Text>
      </View>
    );
  }

  // Hiển thị nếu có lỗi xảy ra
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  // Hiển thị khi không tìm thấy bác sĩ
  if (doctors.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text>No doctors found.</Text>
      </View>
    );
  }

  // Hiển thị danh sách bác sĩ
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctor List</Text>
      <FlatList
        data={doctors}
        renderItem={({ item }) => <Doctor doctor={item} />}
        keyExtractor={(item) => item._id || Math.random().toString()}
        horizontal={true} // Thêm thuộc tính này để cuộn ngang
        showsHorizontalScrollIndicator={false} // Tùy chọn: Ẩn thanh cuộn ngang nếu không cần
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />} // Tạo khoảng cách giữa các item
      />
    </View>
  );
}

// Định dạng kiểu cho UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  image: {
    borderRadius: 100,
    width: 80,
    height: 80,
  },
  name: {
    textAlign: "center",
    width: 80,
    fontSize: 13
  },
  button: {
    marginTop: 5,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
