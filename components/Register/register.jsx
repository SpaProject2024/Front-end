import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { API_BASE_URL } from '../../LocalIP/localIP';
import { Dropdown } from "react-native-element-dropdown";
import Logo from "../../assets/images/logo2.png";
import { useRouter } from "expo-router";
import axios from "axios";
import { buttonStyles, styles } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [role, setRole] = useState("customer");
  const [emailBorderColor, setEmailBorderColor] = useState("#ccc");
  const [passwordBorderColor, setPasswordBorderColor] = useState("#ccc");
  const [rePasswordBorderColor, setRePasswordBorderColor] = useState("#ccc");
  const [dropdownBorderColor, setDropdownBorderColor] = useState("#ccc");

  const roleData = [
    { label: "Customer", value: "customer" },
    { label: "Staff", value: "staff" },
    { label: "Doctor", value: "doctor" },
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    let hasError = false;

    setEmailError("");
    setPasswordError("");
    setPasswordMatchError("");

    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError("Email is invalid");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      hasError = true;
    }

    if (password !== passwordAgain) {
      setPasswordMatchError("Passwords do not match");
      hasError = true;
    }

    if (!role) {
      Alert.alert("Error", "Please select a role");
      hasError = true;
    }

    if (hasError) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        email,
        password,
        role,
      });

      if (response.status === 201) {
        Alert.alert("Success", "Registration successful");
        router.push({
          pathname: "SecondaryPin/secondarypin",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      // Kiểm tra nếu email đã tồn tại và isActive là false
      if (error.response?.data?.isActive === false) {
        Alert.alert(
          "Account Confirmation",
          "Your account is not activated yet. Would you like to confirm your account?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Confirm",
              onPress: () => {
                router.push({
                  pathname: "Vertification/vertification",
                });
              },
            },
          ]
        );
      } else {
        Alert.alert("Error", errorMessage);
      }
    }
  };

  // const performRegistration = async () => {
  //   let hasError = false;

  //   setEmailError("");
  //   setPasswordError("");
  //   setPasswordMatchError("");

  //   if (!email) {
  //     setEmailError("Email is required");
  //     hasError = true;
  //   } else if (!validateEmail(email)) {
  //     setEmailError("Email is invalid");
  //     hasError = true;
  //   }

  //   if (!password) {
  //     setPasswordError("Password is required");
  //     hasError = true;
  //   } else if (password.length < 6) {
  //     setPasswordError("Password must be at least 6 characters long");
  //     hasError = true;
  //   }

  //   if (password !== passwordAgain) {
  //     setPasswordMatchError("Passwords do not match");
  //     hasError = true;
  //   }

  //   if (!role) {
  //     Alert.alert("Error", "Please select a role");
  //     hasError = true;
  //   }

  //   if (hasError) return;

  //   try {
  //     const response = await axios.post("http://10.64.42.212:8000/register", {
  //       email,
  //       password,
  //       role,
  //     });

  //     if (response.status === 201) {
  //       Alert.alert("Success", "Registration successful");
  //       router.push({
  //         pathname: "SecondaryPin/secondarypin",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Registration error:", error);
  //     const errorMessage =
  //       error.response?.data?.message ||
  //       "Registration failed. Please try again.";
  //     Alert.alert("Error", errorMessage);
  //   }
  // };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setEmailBorderColor("#ccc");
        setPasswordBorderColor("#ccc");
        setRePasswordBorderColor("#ccc");
        setDropdownBorderColor("#ccc");
      }}
    >
      {/* Gói tất cả các phần tử con trong một View duy nhất */}
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.title}>BellaVita Beauty</Text>
          <Text style={styles.text}>Welcome, please create your account</Text>

          <TextInput
            style={[styles.input, { borderColor: emailBorderColor }]}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            onFocus={() => setEmailBorderColor("blue")}
            onBlur={() => setEmailBorderColor("#ccc")}
          />
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          <TextInput
            style={[styles.input, { borderColor: passwordBorderColor }]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            onFocus={() => setPasswordBorderColor("blue")}
            onBlur={() => setPasswordBorderColor("#ccc")}
          />
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}

          <TextInput
            style={[styles.input, { borderColor: rePasswordBorderColor }]}
            placeholder="Re-enter the password"
            value={passwordAgain}
            onChangeText={setPasswordAgain}
            secureTextEntry
            onFocus={() => setRePasswordBorderColor("blue")}
            onBlur={() => setRePasswordBorderColor("#ccc")}
          />
          {passwordMatchError ? (
            <Text style={styles.errorText}>{passwordMatchError}</Text>
          ) : null}

          <Dropdown
            style={[styles.dropdown, { borderColor: dropdownBorderColor }]}
            data={roleData}
            labelField="label"
            valueField="value"
            value={role}
            onFocus={() => setDropdownBorderColor("blue")}
            onBlur={() => setDropdownBorderColor("#ccc")}
            onChange={(item) => {
              setRole(item.value);
              setDropdownBorderColor("#ccc");
            }}
            selectedTextStyle={styles.dropdownPlaceholder}
            itemTextStyle={styles.dropdownItemText}
          />

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={buttonStyles.backIcon}>
          <Ionicons
            name="arrow-back-circle-outline"
            size={40}
            color="#2B5F2F"
            onPress={() => router.push("/Home/home")}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;
