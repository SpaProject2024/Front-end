import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import Logo from "../../assets/images/logo2.png";
import UserIcon from "../../assets/images/user.png";

const data = [
  { label: "Login", value: "login" },
  { label: "Register", value: "register" },
  { label: "Logout", value: "logout" },
  //Nghĩa
  { label: "MyAccunt", value: "MyAccount" },
];

const Header = () => {
  const router = useRouter();
  const [value, setValue] = useState(null);

  const handleDropdownChange = (item) => {
    if (item.value === "login") {
      router.push("/Login/login");
    } else if (item.value === "register") {
      router.push("/Register/register");
    } else if (item.value === "logout") {
      router.push("/Confirmation/confirmation");
    }
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
              data={data}
              labelField="label"
              valueField="value"
              value={value}
              onChange={handleDropdownChange}
              style={styles.dropdown}
              containerStyle={styles.dropdownContainer}
              placeholder=""
              renderRightIcon={() => (
                <Image source={UserIcon} style={styles.userIcon} />
              )}
              itemTextStyle={styles.itemTextStyle}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2B5F2F",
  },
  header: {
    paddingTop: 25,
    paddingBottom: 10,
    paddingHorizontal: 5,
    zIndex: 1,
  },
  rowHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    width: "60%",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 12,
    color: "#2B5F2F",
  },
  locationContainer: {
    zIndex: 3,
  },
  bellContainer: {
    position: "absolute",
    zIndex: 2,
  },
  dropdownContainer: {
    zIndex: 1,
    top: 15,
  },
  dropdown: {
    width: 80,
    borderRadius: 5,
    right: 5,
  },
  userIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  itemTextStyle: {
    fontSize: 12,
    color: "#2B5F2F",
  },
});

export default Header;
