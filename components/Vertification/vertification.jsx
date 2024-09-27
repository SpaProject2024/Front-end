import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { styles } from "./styles";
import Logo from "../../assets/images/Neutral Feminine Flower Line Art.png";

const Vertification = () => {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [codeError, setCodeError] = useState("");
  const [timeLeft, setTimeLeft] = useState(120);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isTimerLoading, setIsTimerLoading] = useState(true);

  const inputRefs = useRef([]);

  useEffect(() => {
    let timer;
    if (isTimerActive && timeLeft > 0) {
      setIsTimerLoading(true);
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft <= 0) {
      setIsTimerActive(false);
      setIsTimerLoading(false);
    } else {
      setIsTimerLoading(false);
    }
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  const handleInputChange = (value, index) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value.length === 1 && index < code.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerification = () => {
    setCodeError("");

    const codeString = code.join("");

    if (codeString.length !== 6) {
      setCodeError("Please enter a valid 6-digit code");
      return;
    }

    if (codeString === "123456") {
      Alert.alert(
        "Verification Successful",
        "Your code has been verified. Choose your next action:",
        [
          {
            text: "Go to Home",
            onPress: () => {
              setCode(["", "", "", "", "", ""]);
              setTimeLeft(0);
              setIsTimerActive(true);
              router.push("Home/home");
            },
          },
          {
            text: "Login Again",
            onPress: () => {
              setCode(["", "", "", "", "", ""]);
              setTimeLeft(0);
              setIsTimerActive(true);
              router.push("Login/login");
            },
          },
        ]
      );
    } else {
      setCodeError("Invalid code, please try again");
    }
  };

  const handleResendCode = () => {
    if (!isTimerActive) {
      Alert.alert("Code Resent", "A new code has been sent to your email.");
      setTimeLeft(120);
      setIsTimerActive(true);
    } else {
      Alert.alert(
        "Wait",
        "Please wait until the current code expires before requesting a new one."
      );
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.description}>
        {"Please enter the 6-digit code sent to your email."}
      </Text>

      <View style={styles.codeInputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.codeInputBox}
            value={digit}
            onChangeText={(value) => handleInputChange(value, index)}
            keyboardType="number-pad"
            maxLength={1}
            ref={(ref) => (inputRefs.current[index] = ref)}
          />
        ))}
      </View>

      {codeError ? <Text style={styles.errorText}>{codeError}</Text> : null}

      <TouchableOpacity
        style={styles.verifyButton}
        onPress={handleVerification}
      >
        <Text style={styles.verifyButtonText}>Verify Now</Text>
      </TouchableOpacity>

      <View style={styles.timerContainer}>
        {isTimerLoading ? (
          <ActivityIndicator
            size="small"
            color="#2B5F2F"
            style={styles.timerLoadingSpinner}
          />
        ) : null}
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
      </View>
      <TouchableOpacity onPress={handleResendCode} disabled={isTimerActive}>
        <Text
          style={[
            styles.resendButton,
            { texolor: isTimerActive ? "#2B5F2F" : "#999999" },
          ]}
        >
          Resend
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Vertification;
