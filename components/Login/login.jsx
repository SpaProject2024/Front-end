// Login.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Button,
} from "react-native";
import axios from "axios";
import { API_BASE_URL } from '../../LocalIP/localIP';
import { buttonStyles, styles } from "./styles"; // Ensure styles.js is imported
import { useRouter } from "expo-router"; // Fixed the import
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "../../assets/images/logo2.png";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState(""); // State for secondary PIN
  const [token, setToken] = useState(null);
  const [tokenExpiry, setTokenExpiry] = useState(null);
  const [showRefresh, setShowRefresh] = useState(false);
  const [tokenEmail, setTokenEmail] = useState("");
  const [userId, setUserId] = useState(null); // State for user ID
  const router = useRouter(); // Use router from expo-router

  const checkTokenValidity = async () => {
    if (token && tokenExpiry) {
      const currentTime = Date.now();
      if (currentTime >= tokenExpiry) {
        // Xóa token cũ khỏi AsyncStorage khi hết hạn
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("userId");
        setShowRefresh(true); // Hiển thị phần làm mới token
      }
    }
  };

  useEffect(() => {
    checkTokenValidity(); // Check validity when component mounts
  }, [token, tokenExpiry]);

  // Hàm lưu token và ID vào AsyncStorage
  const storeData = async (token, userId) => {
    try {
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userId", userId); // Lưu ID người dùng
      console.log("Token và ID đã được lưu vào AsyncStorage");
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });

      if (response.data && response.data.data) {
        const userData = response.data.data;
        const isActive = response.data.data.isActive;

        console.log("isActive:", isActive);

        // Nếu tài khoản chưa được kích hoạt, hiển thị thông báo và chuyển hướng đến trang kích hoạt
        if (isActive === false) {
          Alert.alert("Tài khoản chưa được kích hoạt.");
          router.push("Vertification/vertification");
          return; // Dừng tiến trình đăng nhập
        }

        // Nếu tài khoản đã kích hoạt, tiếp tục đăng nhập
        const { token, userId } = userData;

        setToken(token);
        setTokenExpiry(Date.now() + 3600 * 1000);
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("userId", userId.toString());

        Alert.alert("Login Success", "Welcome BellaVita Beauty", [
          {
            text: "OK",
            onPress: () => {
              setTokenEmail(email);
              router.push("/Home/home");
            },
          },
        ]);
      } else {
        // Kiểm tra thông báo lỗi từ API
        Alert.alert(
          "Error",
          response.data.message || "Email không tồn tại trong phiên."
        );
      }
    } catch (error) {
      // Hiển thị thông báo lỗi cụ thể
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      Alert.alert("Error", errorMessage);
    }
  };

  const handleRefreshToken = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/login/refreshtoken`,
        {
          email: tokenEmail,
          pinSecondary: pin,
        }
      );

      const newToken = response.data.token; // Token mới
      setToken(newToken); // Cập nhật token
      console.log("New Token after refresh: ", newToken);
      setTokenExpiry(Date.now() + response.data.expiresIn * 1000); // Cập nhật thời gian hết hạn

      // Xóa token cũ và lưu token mới vào AsyncStorage
      await AsyncStorage.removeItem("token");
      await AsyncStorage.setItem("token", newToken);

      // Gọi hàm lưu token vào AsyncStorage
      await storeData(newToken, userId); // Lưu lại token và ID
      Alert.alert("Token refreshed", response.data.message);
      setShowRefresh(false);
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>BellaVita Beauty</Text>
      <Text style={styles.text}>Welcome, please login your account</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={buttonStyles.button} onPress={handleLogin}>
        <Text style={buttonStyles.textButton}>Log In</Text>
      </TouchableOpacity>

      {showRefresh && (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter pin make a new token"
            value={pin}
            onChangeText={setPin}
          />
          <Button style={buttonStyles.baseButton} onPress={handleRefreshToken}>
            <Text style={styles.buttonText}>Reset Token</Text>
          </Button>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Text
          style={styles.fogotpasswordText}
          onPress={() => router.push("/FogotPassword/forgotpasswor")}
        >
          Forgot Password
        </Text>
        <TouchableOpacity
          style={buttonStyles.baseButton}
          onPress={() => router.push("/Register/register")}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.withGGContainer}>
        <AntDesign name="google" size={24} color="#EA4335" />
        <Text style={styles.withGGText}>Login With Google</Text>
      </View>
      <View>
        <Ionicons
          name="arrow-back-circle-outline"
          size={40}
          color="#2B5F2F"
          style={{ marginVertical: 15 }}
          onPress={() => router.push("/Home/home")}
        />
      </View>
    </View>
  );
}