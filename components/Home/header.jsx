import React, { useState } from "react";
import { View, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; // Import useRouter từ expo-router
import Location from "../../assets/images/location.png";
import Bell from "../../assets/images/bell.png";
import Find from "../../assets/images/find.png";
import Voice from "../../assets/images/voice.png";
import Logo from "../../assets/images/logo2.png";
import User from "../../assets/images/user.png";
import { Dropdown } from "react-native-element-dropdown";

const data = [
  { label: "Login", value: "login" },
  { label: "Register", value: "register" },
  { label: "Logout", value: "logout" },
];

const Header = () => {
  const [value, setValue] = useState(null);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.rowHeader}>
          <View style={styles.row}>
            <Image source={Logo} style={styles.logo} />
            <View style={styles.searchBox}>
              <View style={styles.searchRow}>
                <Image source={Find} style={styles.icon} />
                <TextInput style={styles.input} placeholder="Search" />
                <Image source={Voice} style={styles.icon} />
              </View>
            </View>
          </View>
          <View style={styles.rowRight}>
            <Image source={Location} style={styles.location} />
            <TouchableOpacity onPress={() => router.push("/Notification/notification")}>
              <Image source={Bell} style={styles.bell} />
            </TouchableOpacity>
            <View style={styles.dropdownWrapper}>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={{ display: "none" }}
                iconStyle={styles.iconStyle}
                data={data}
                search={false}
                maxHeight={300}
                labelField="label"
                valueField="value"
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                  if (item.value === "login") {
                    router.push("/Login/login");
                  } else if (item.value === "register") {
                    router.push("/Register/register");
                  }
                }}
                renderLeftIcon={() => (
                  <Image source={User} style={styles.user} />
                )}
                renderRightIcon={() => null}
              />
            </View>
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
    left: 0,
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
  icon: {
    width: 15,
    height: 15,
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 10,
  },
  bell: {
    width: 20,
    height: 20,
    tintColor: "#C0E3C5",
  },
  user: {
    width: 20,
    height: 20,
  },
  location: {
    width: 25,
    height: 25,
    tintColor: "#C0E3C5",
  },
  dropdownWrapper: {
    position: "relative",
    right: 0,
  },
  dropdown: {
    zIndex: 1000,
    width: 250,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#999",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#333",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});

export default Header;
