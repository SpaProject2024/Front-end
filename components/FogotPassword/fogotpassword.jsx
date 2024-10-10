import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { API_BASE_URL } from '../../LocalIP/localIP';
import axios from "axios";
import { router } from "expo-router";
import { styles } from "./styles";
export default function PasswordReset() {
  const [step, setStep] = useState("forgot"); // 'forgot' cho biểu mẫu quên mật khẩu, 'reset' cho đặt lại mật khẩu
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Ô nhập lại mật khẩu

  // Hàm xử lý yêu cầu quên mật khẩu
  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/fogetPassword`,
        { email }
      );
      Alert.alert("Success", response.data.message);
      setStep("reset"); // Chuyển sang bước đặt lại mật khẩu
    } catch (error) {
      Alert.alert(
        "error",
        error.response?.data?.message || "An error has occurred"
      );
    }
  };

  // Hàm xử lý đặt lại mật khẩu
  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert(
        "error",
        "The new password and confirmation password do not match"
      );
      return;
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/fogetPassword/reset`,
        {
          email,
          pin, // Chỉ cần gửi mã PIN
          newPassword,
        }
      );
      Alert.alert("Thành công", response.data.message);
      router.push("/Login/login"); // Chuyển hướng đến trang đăng nhập
    } catch (error) {
      Alert.alert(
        "error",
        error.response?.data?.message || "An error has occurred"
      );
    }
  };

  return (
    <View style={styles.container}>
      {step === "forgot" ? (
        <>
          <Text style={styles.title}>Fogot Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Button
            title="Send Reset Code"
            onPress={handleForgotPassword}
            color="#2B5F2F"
          />
        </>
      ) : (
        <>
          <Text style={styles.title}>Reset Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Pin Code"
            value={pin}
            onChangeText={setPin}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Enter New Password Again"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          <Button
            title="Change Password"
            onPress={handleResetPassword}
            color="#2B5F2F"
          />
        </>
      )}
    </View>
  );
}
