// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import React from "react";
// import { useRouter } from "expo-router";

// const doctorList = [
//   {
//     id: 1,
//     image: "./../../assets/images/doctor.jpg",
//     name: "James Smith",
//     experience: 1,
//     rate: 1,
//     description:
//       "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
//   },
//   {
//     id: 2,
//     image: "./../../assets/images/doctor.jpg",
//     name: "Emma Johnson",
//     experience: 1,
//     rate: 1,
//     description:
//       "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
//   },
//   {
//     id: 3,
//     image: "./../../assets/images/doctor.jpg",
//     name: "Oliver Williams",
//     experience: 1,
//     rate: 1,
//     description:
//       "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
//   },
//   {
//     id: 4,
//     image: "./../../assets/images/doctor.jpg",
//     name: "Sophia Brown",
//     experience: 1,
//     rate: 1,
//     description:
//       "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
//   },
//   {
//     id: 5,
//     image: "./../../assets/images/doctor.jpg",
//     name: "Liam Taylor",
//     experience: 1,
//     rate: 1,
//     description:
//       "A performant interface for rendering basic, flat lists, supporting the most handy feature. A performant interface for rendering basic, flat lists, supporting the most handy feature",
//   },
// ];

// export default function DoctorList() {
//   const router = useRouter();

//   const Doctor = ({ doctor }) => (
//     <TouchableOpacity
//       onPress={() =>
//         router.push("/DoctorInfo/" + encodeURIComponent(JSON.stringify(doctor)))
//       }
//     >
//       <View>
//         <Image
//           style={styles.image}
//           source={require("./../../assets/images/doctor.jpg")}
//         />
//         <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
//           {doctor.name}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View>
//       <FlatList
//         horizontal={true} // Thêm thuộc tính này để cuộn ngang
//         showsHorizontalScrollIndicator={false} // Tùy chọn: Ẩn thanh cuộn ngang nếu không cần
//         ItemSeparatorComponent={() => <View style={{ width: 20 }} />} // Tạo khoảng cách giữa các item
//         data={doctorList}
//         renderItem={({ item }) => <Doctor doctor={item} />}
//         keyExtractor={(item) => item.id}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   image: {
//     borderRadius: 100,
//     width: 80,
//     height: 80,
//   },
//   name: {
//     textAlign: "center",
//     width: 80,
//     fontSize: 13
//   },
// });

// import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
// import React, { useEffect, useState } from "react";
// import { useRouter } from "expo-router";
// import axios from "axios"; // Import Axios

// export default function DoctorList() {
//   const router = useRouter();
//   const [doctorList, setDoctorList] = useState([]); // State to hold doctor data
//   const [loading, setLoading] = useState(true); // State to manage loading state

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await axios.get("http://localhost:8000/doctors"); // Replace with your API endpoint
//         setDoctorList(response.data); // Assuming the data returned is an array of doctors
//       } catch (error) {
//         console.error("Error fetching doctor data:", error);
//       } finally {
//         setLoading(false); // Set loading to false after the fetch is complete
//       }
//     };

//     fetchDoctors(); // Call the fetch function
//   }, []);

//   const Doctor = ({ doctor }) => (
//     <TouchableOpacity
//       onPress={() =>
//         router.push("/DoctorInfo/" + encodeURIComponent(JSON.stringify(doctor)))
//       }
//     >
//       <View>
//         <Image
//           style={styles.image}
//           source={{ uri: doctor.image }} // Assuming the image URL is in the doctor object
//         />
//         <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
//           {doctor.name}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#0000ff" /> {/* Show loading indicator */}
//       </View>
//     );
//   }

//   return (
//     <View>
//       <FlatList
//         horizontal={true} // Horizontal scrolling
//         showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
//         ItemSeparatorComponent={() => <View style={{ width: 20 }} />} // Item separator
//         data={doctorList}
//         renderItem={({ item }) => <Doctor doctor={item} />}
//         keyExtractor={(item) => item.id.toString()} // Ensure keyExtractor returns a string
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   image: {
//     borderRadius: 100,
//     width: 80,
//     height: 80,
//   },
//   name: {
//     textAlign: "center",
//     width: 80,
//     fontSize: 13,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
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
import { API_BASE_URL } from '../../LocalIP/localIP';
import { useRouter } from "expo-router";

export default function DoctorList() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch doctors from the API
  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/doctors`);
      console.log("API Response:", response.data); // In toàn bộ phản hồi để kiểm tra

      const fetchedDoctors = response.data.data; // Điều chỉnh lại cách truy cập dữ liệu
      if (fetchedDoctors && fetchedDoctors.length > 0) {
        setDoctors(fetchedDoctors);
        console.log("Fetched Doctors:", fetchedDoctors);
      } else {
        console.log("No doctors found in the response.");
        setDoctors([]); // Thiết lập lại danh sách bác sĩ
      }
      setLoading(false);
    } catch (err) {
      setError("Error fetching doctors");
      setLoading(false);
      console.error(err); // In lỗi để kiểm tra chi tiết
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const Doctor = ({ doctor }) => (
    <TouchableOpacity
      onPress={() =>
        router.push("/DoctorInfo/" + encodeURIComponent(JSON.stringify(doctor)))
      }
    >
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{ uri: doctor.image }} // Điều chỉnh nếu bạn có hình ảnh từ API
        />
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {doctor.fullName} {/* Hiển thị tên bác sĩ */}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading doctors...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (doctors.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text>No doctors found.</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        data={doctors}
        renderItem={({ item }) => <Doctor doctor={item} />}
        keyExtractor={(item) => item.doctorID} // Đảm bảo doctorID là duy nhất
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 120,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    borderRadius: 50,
    width: 80,
    height: 80,
    marginBottom: 5,
  },
  name: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
  details: {
    fontSize: 12,
    textAlign: "center",
    color: "#666",
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
