import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { API_BASE_URL } from '../../LocalIP/localIP';
import { useRouter } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import Logo from "../../assets/images/logo2.png";
import UserIcon from "../../assets/images/user.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { styles } from "./styles";
const options = [
  { label: "View my profile", value: "myprofile" },
  { label: "Login", value: "login" },
  { label: "Register", value: "register" },
  { label: "Logout", value: "logout" },
  { label: "appointment", value: "appointment" },
  //Nghĩa
  { label: "MyAccunt", value: "MyAccount" },
  { label: "managerbooking", value: "managerbooking" },
  { label: "warehouse", value: "warehouse" },
  { label: "Dashboard", value: "dashboard" },

];

const Header = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem("userId"); // Retrieve userId from AsyncStorage

        console.log("Token:", token); // Logging token
        console.log("User ID:", userId); // Logging user ID

        // Ensure both token and userId are present
        if (token && userId) {
          const response = await axios.get(
            `${API_BASE_URL}/login/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Logging the full response data
          console.log("Full response data:", response.data);
          console.log("Your email:", response.data.data.email);
          setUserInfo(response.data.data); // Save user info in state
        } else {
          console.log("No token or user ID found");
        }
      } catch (error) {
        console.error(
          "Error fetching user info:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchUserInfo(); // Call the function when the component is mounted
  }, []);

  const handleDropdownChange = async (item) => {
    switch (item.value) {
      case "login":
        router.push("/Login/login");
        break;
      case "register":
        router.push("/Register/register");
        break;
      case "logout":
        await confirmLogout();
        break;
      case "myprofile":
        router.push("/profileScreen/profileScreen");
        break;
      case "appointment":
        router.push("/appointmenttab/appointmenttab");
        break;
      case "managerbooking":
        router.push("/ManagerBooking/managerbooking");
        break;
      case "MyAccount":
        router.push("/MyAccount/myAccount");
        break;
      case "dashboard":
        router.push("/Dashboard/dashboard");
        break;
      default:
        break;
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      "Logout Confirmation",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("token");
              await AsyncStorage.removeItem("userId");
              router.push("/Home/home");
            } catch (error) {
              console.error("Error logging out:", error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.rowHeader}>
          <View style={styles.row}>
            <Image source={Logo} style={styles.logo} />
            <View style={styles.searchBox}>
              <View style={styles.searchRow}>
                <EvilIcons name="search" size={18} color="#2B5F2F" />
                <TextInput style={styles.input} placeholder="Search" />
                <Ionicons name="mic-outline" size={18} color="#2B5F2F" />
              </View>
            </View>
          </View>
          <View style={styles.rowRight}>
            <TouchableOpacity
              onPress={() => router.push("/Maps/maps")}
              style={styles.locationContainer}
            >
              <Ionicons
                name="location-outline"
                size={18}
                color="#fff"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/Notification/notification")}
              style={styles.bellContainer}
            >
              <Feather
                name="bell"
                size={18}
                color="#fff"
                style={{ marginLeft: 40 }}
              />
            </TouchableOpacity>
            <Dropdown
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={options}
              labelField="label"
              valueField="value"
              value={selectedOption}
              onChange={handleDropdownChange}
              style={styles.dropdown}
              containerStyle={styles.dropdownContainer}
              renderRightIcon={() => (
                <Image source={UserIcon} style={styles.userIcon} />
              )}
              itemTextStyle={styles.itemTextStyle}
            />

          </View>
        </View>
        {/* Display user information if available */}
        {userInfo && (
          <View style={styles.userInfoContainer}>
            <Text style={styles.userInfoText}>Email: {userInfo.email}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Header;
