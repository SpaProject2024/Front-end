import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { API_BASE_URL } from '../../LocalIP/localIP';
import axios from "axios";
import { router } from "expo-router";
import { styles } from "./styles";
const SetSecondaryPin = ({ email }) => {
  const [pinSecondary, setPinSecondary] = useState("");
  const [pinError, setPinError] = useState("");

  const handleSetSecondaryPin = async () => {
    // Kiểm tra định dạng mã PIN phụ
    if (!/^\d{4}$/.test(pinSecondary)) {
      setPinError("Mã PIN phụ phải gồm 4 chữ số");
      return;
    }

    try {
      // Gửi yêu cầu tới back-end để đặt mã PIN phụ
      const response = await axios.post(
        `${API_BASE_URL}/register/secondaryPin`,
        {
          email,
          pinSecondary,
        }
      );

      if (response.status === 200) {
        Alert.alert("Thành công", "Mã PIN phụ đã được đặt thành công.");
        router.push({
          pathname: "Vertification/vertification",
        });
      }
    } catch (error) {
      // Xử lý lỗi từ yêu cầu
      const errorMessage =
        error.response?.data?.message ||
        "Không thể đặt mã PIN phụ. Vui lòng thử lại.";
      Alert.alert("Lỗi", errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đặt Mã PIN Phụ</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập mã PIN 4 chữ số của bạn"
        value={pinSecondary}
        onChangeText={setPinSecondary}
        keyboardType="numeric"
        secureTextEntry
      />
      {pinError ? <Text style={styles.errorText}>{pinError}</Text> : null}

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSetSecondaryPin}
      >
        <Text style={styles.submitButtonText}>Đặt PIN</Text>
      </TouchableOpacity>

      {/* Nút tiếp tục để bỏ qua bước này */}
      <TouchableOpacity style={styles.continueButton} onPress={() => router.push("/Vertification/vertification")}>
        <Text style={styles.continueButtonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
};

// Định nghĩa các kiểu dáng sử dụng StyleSheet


export default SetSecondaryPin;
