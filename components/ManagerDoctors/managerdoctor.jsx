import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Button,
  FlatList,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../LocalIP/localIP"; // Đường dẫn đến API của bạn
import { useNavigation } from "@react-navigation/native";
const ManagerDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Bác sĩ đã chọn
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Trạng thái chỉnh sửa
  const [updatedDoctor, setUpdatedDoctor] = useState({}); // Lưu thông tin cập nhật
  const navigation = useNavigation();
  // Fetch tất cả các bác sĩ
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await axios.get(`${API_BASE_URL}/doctor`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Fetched doctors:", response.data.data); // Log dữ liệu nhận được từ API
          setDoctors(response.data.data); // Lưu danh sách bác sĩ
        } else {
          console.log("No token found");
        }
      } catch (error) {
        setError("Error fetching doctors.");
        console.error(
          "Error fetching doctors:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Fetch chi tiết bác sĩ theo ID
  const fetchDoctorById = async (doctorId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await axios.get(`${API_BASE_URL}/doctor/${doctorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Fetched doctor details:", response.data.data);
        setSelectedDoctor(response.data.data); // Lưu thông tin chi tiết bác sĩ
        setUpdatedDoctor(response.data.data); // Cập nhật thông tin để chỉnh sửa
      } else {
        console.log("No token found");
      }
    } catch (error) {
      setError("Error fetching doctor details.");
      console.error(
        "Error fetching doctor details:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // Hàm để chọn bác sĩ và fetch chi tiết bác sĩ
  const handleSelectDoctor = (doctorId) => {
    fetchDoctorById(doctorId);
  };

  // Hàm để cập nhật thông tin bác sĩ
  const handleUpdate = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await axios.put(
          `${API_BASE_URL}/doctor/${selectedDoctor._id}`,
          { doctorId: updatedDoctor }, // Cập nhật phần doctorId
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Updated doctor response:", response.data.data);

        // Cập nhật lại danh sách sau khi cập nhật thông tin
        setDoctors(
          doctors.map((doc) =>
            doc._id === selectedDoctor._id ? response.data.data : doc
          )
        );
        setSelectedDoctor(response.data.data);
        setIsEditing(false);
        Alert.alert("Success", "Doctor details updated successfully!");
      }
    } catch (error) {
      console.error(
        "Error updating doctor details:",
        error.response ? error.response.data : error.message
      );
      setError("Error updating doctor details.");
    }
  };

  // Hàm để xóa bác sĩ
  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        console.log("Deleting doctor:", selectedDoctor);
        await axios.delete(`${API_BASE_URL}/doctor/${selectedDoctor._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        Alert.alert("Success", "Doctor deleted successfully!");
        // Loại bỏ bác sĩ khỏi danh sách sau khi xóa
        setDoctors(doctors.filter((doc) => doc._id !== selectedDoctor._id));
        setSelectedDoctor(null); // Quay lại danh sách sau khi xóa
      }
    } catch (error) {
      console.error(
        "Error deleting doctor:",
        error.response ? error.response.data : error.message
      );
      setError("Error deleting doctor.");
    }
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading doctors...</Text>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Hiển thị danh sách bác sĩ
  const renderDoctorItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        console.log("Selected doctor ID:", item._id);
        handleSelectDoctor(item._id); // Lấy chi tiết bác sĩ bằng ID
      }}
    >
      <View style={styles.card}>
        <Image
          source={{
            uri:
              item.avatar ||
              "https://imgcdn.stablediffusionweb.com/2024/5/20/e4b6d281-aa03-4d46-b322-0f32374bc98b.jpg",
          }}
          style={styles.avatar}
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.email}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Hiển thị chi tiết của bác sĩ được chọn
  const renderDoctorDetails = () => {
    const doctor = selectedDoctor?.doctorId;
    console.log("doctor:", doctor);

    return (
      <ScrollView style={styles.container}>
        <Image
          source={{
            uri:
              doctor.avatar && doctor.avatar !== ""
                ? doctor.avatar
                : "https://imgcdn.stablediffusionweb.com/2024/5/20/e4b6d281-aa03-4d46-b322-0f32374bc98b.jpg", // Avatar mặc định nếu trống
          }}
          style={styles.avatarLarge}
          resizeMode="cover"
        />
        <Text style={styles.title}>
          {doctor.fullName ? doctor.fullName : "Unknown Name"}{" "}
          {/* Hiển thị nếu fullName bị null */}
        </Text>

        {isEditing ? (
          <View>
            <TextInput
              style={styles.input}
              value={updatedDoctor.fullName}
              onChangeText={(text) =>
                setUpdatedDoctor({ ...updatedDoctor, fullName: text })
              }
              placeholder="Full name"
            />
            <TextInput
              style={styles.input}
              value={updatedDoctor.numberPhone}
              onChangeText={(text) =>
                setUpdatedDoctor({ ...updatedDoctor, numberPhone: text })
              }
              placeholder="Phone Number"
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              value={updatedDoctor.address}
              onChangeText={(text) =>
                setUpdatedDoctor({ ...updatedDoctor, address: text })
              }
              placeholder="Address"
            />
            <TextInput
              style={styles.input}
              value={updatedDoctor.experience?.toString()}
              onChangeText={(text) =>
                setUpdatedDoctor({
                  ...updatedDoctor,
                  experience: parseInt(text),
                })
              }
              placeholder="Experience (years)"
              keyboardType="numeric"
            />
            <Button title="Save" color="#2B5F2F" onPress={handleUpdate} />
            <Button
              title="Cancel"
              color="#d9534f"
              onPress={() => setIsEditing(false)}
            />
          </View>
        ) : (
          <View style={styles.infoContainer}>
            <Text style={styles.label}>
              Phone Number:{" "}
              <Text style={styles.value}>
                {doctor.numberPhone ? doctor.numberPhone : "No phone number"}{" "}
                {/* Nếu numberPhone là null */}
              </Text>
            </Text>
            <Text style={styles.label}>
              Address:{" "}
              <Text style={styles.value}>
                {doctor.address ? doctor.address : "No address"}{" "}
                {/* Nếu address là null */}
              </Text>
            </Text>
            <Text style={styles.label}>
              Birthday:{" "}
              <Text style={styles.value}>
                {doctor.birthday
                  ? new Date(doctor.birthday).toLocaleDateString()
                  : "No birthday"}{" "}
                {/* Nếu birthday là null */}
              </Text>
            </Text>
            <Text style={styles.label}>
              Experience:{" "}
              <Text style={styles.value}>
                {doctor.experience
                  ? `${doctor.experience} years`
                  : "No experience"}{" "}
                {/* Nếu experience là 0 */}
              </Text>
            </Text>
            <Text style={styles.label}>
              Description:{" "}
              <Text style={styles.value}>
                {doctor.description && doctor.description !== ""
                  ? doctor.description
                  : "No description"}{" "}
                {/* Nếu description là trống */}
              </Text>
            </Text>
            <Text style={styles.label}>
              Working Time:{" "}
              <Text style={styles.value}>
                {doctor.workingtime
                  ? `${doctor.workingtime} hours`
                  : "No working time"}{" "}
                {/* Nếu workingtime là 0 */}
              </Text>
            </Text>
          </View>
        )}

        {/* Các nút luôn hiển thị, không phụ thuộc vào isEditing */}
        <View style={styles.buttonContainer}>
          {!isEditing && (
            <>
              <Button
                title="Edit"
                color="#007BFF"
                onPress={() => setIsEditing(true)}
              />
              <Button
                title="Delete"
                color="#d9534f"
                onPress={() =>
                  Alert.alert(
                    "Confirm Delete",
                    `Are you sure you want to delete ${doctor.fullName}?`,
                    [
                      { text: "Cancel", style: "cancel" },
                      { text: "OK", onPress: handleDelete },
                    ]
                  )
                }
              />
            </>
          )}
          <Button
            title="Back"
            color="#007BFF"
            onPress={() => {
              if (isEditing) {
                setIsEditing(false); // Quay lại từ chỉnh sửa
              } else {
                setSelectedDoctor(null); // Quay lại danh sách bác sĩ
              }
            }}
          />
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {selectedDoctor ? (
        renderDoctorDetails() // Hiển thị chi tiết bác sĩ
      ) : (
        <FlatList
          data={doctors}
          renderItem={renderDoctorItem}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarLarge: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginBottom: 20,
  },
  infoContainer: {
    marginLeft: 15,
    flex: 1,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
  value: {
    fontWeight: "normal",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
  formContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default ManagerDoctors;
