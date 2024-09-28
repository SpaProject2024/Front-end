import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Feather from "@expo/vector-icons/Feather";
import Fontisto from "@expo/vector-icons/Fontisto";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Branch from "../../assets/images/service.jpg";
import Location from "../../assets/images/location.png";
import { router } from "expo-router";

export default function Confirmation() {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={Branch} style={styles.BranchImage} />
        <View>
          <Text style={styles.headerText}>The BellaVita Beauty</Text>
          <View style={styles.starsContainer}>
            {[...Array(5)].map((_, index) => (
              <Icon key={index} name="star" size={14} color="#FFD700" />
            ))}
          </View>
          <View style={styles.address}>
            <Image source={Location} style={styles.locationImage} />
            <Text style={styles.addressText}>30/4 St, Can Tho City</Text>
          </View>
        </View>
        <View>
          <Feather name="phone" style={styles.iconRight} />
          <FontAwesome name="commenting-o" style={styles.iconRight} />
        </View>
      </View>

      {/* Content Section with ScrollView */}
      <ScrollView style={styles.content}>
        <Text style={styles.titleText}>Order Details</Text>
        <View style={styles.rowCategory}>
          {[
            {
              top: "Date",
              bottom: "2023-09-26",
              icon: <Fontisto name="date" style={styles.iconLeft} />,
            },
            {
              top: "Time",
              bottom: "12:00 PM",
              icon: <Fontisto name="clock" style={styles.iconLeft} />,
            },
            {
              top: "Phone number",
              bottom: "(123) 456-7890",
              icon: <AntDesign name="phone" style={styles.iconLeft} />,
            },
          ].map((item, index) => (
            <View key={index} style={styles.categoryItem}>
              <View style={styles.imageWrapper}>
                {item.icon}
                <Text style={styles.text}>{item.top}</Text>
              </View>
              <Text style={styles.text}>{item.bottom}</Text>
            </View>
          ))}
        </View>
        {/* <View style={styles.notesContainer}>
          <Text style={styles.notesTitle}>Your Notes</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Write your notes here..."
            placeholderTextColor="#ccc"
            multiline
            numberOfLines={4}
          />
        </View> */}
        <View style={styles.notesContainer}>
          <Text style={styles.titleText}>Your Information</Text>
          <Text style={styles.text}>Name: </Text>
          <Text style={styles.text}>Phone: </Text>
          <Text style={styles.text}>Email: </Text>
          <Text style={styles.text}>Address: </Text>
        </View>
        <View style={styles.notesContainer}>
          <Text style={styles.titleText}>Doctor</Text>
          <Text style={styles.text}>Doctor name: </Text>
          <Text style={styles.text}>Doctor specialist: </Text>
        </View>

        <View style={styles.notesContainer}>
          <View>
            <Text style={styles.titleText}>Your Services</Text>
            {[
              {
                serviecName: "Acne treatment",
                price: "$40",
              },
              {
                serviecName: "Scar treatment",
                price: "$60",
              },
              {
                serviecName: "Scar treatment",
                price: "$60",
              },
              {
                serviecName: "Scar treatment",
                price: "$60",
              },
              {
                serviecName: "Post-treatment recovery and skin care package",
                price: "$90",
              },
              {
                serviecName: "Post-treatment recovery and skin care package",
                price: "$90",
              },
              {
                serviecName: "Post-treatment recovery and skin care package",
                price: "$90",
              },
              {
                serviecName: "Post-treatment recovery and skin care package",
                price: "$90",
              },
              {
                serviecName: "Post-treatment recovery and skin care package",
                price: "$90",
              },
              {
                serviecName: "Post-treatment recovery and skin care package",
                price: "$90",
              },
              {
                serviecName: "Post-treatment recovery and skin care package",
                price: "$90",
              },
            ].map((item, index) => (
              <View key={index} style={styles.serviecList}>
                <Text style={styles.text}>{item.serviecName}</Text>
                <Text style={styles.text}>{item.price}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer Section */}
      <View style={styles.footer}>
        <View style={styles.footerTotal}>
          <Text style={styles.footerText}>Total Pay: $180</Text>
        </View>
        <View style={styles.footerButton}>
          <TouchableOpacity onPress={() => router.push("/Booking/booking")}>
            <Text style={styles.footerText}>Confirm Booking</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#2B5F2F",
    shadowColor: "#000",
  },
  BranchImage: {
    width: "50%",
    height: 100,
    borderRadius: 5,
    marginVertical: 10,
    borderWidth: 1, // Tăng độ dày viền
    borderColor: "#ccc", // Màu viền
    shadowColor: "#000", // Màu bóng
    shadowOffset: {
      width: 0,
      height: 4, // Đổ bóng xuống dưới
    },
    shadowOpacity: 0.3, // Độ mờ của bóng
    shadowRadius: 6, // Đường kính bóng
    elevation: 6, // Chỉ cần cho Android
  },
  headerText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    paddingLeft: 5,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
  location: {
    flexDirection: "row",
  },
  locationImage: {
    width: 20,
    height: 20,
    tintColor: "#C0E3C5",
  },
  address: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  addressText: {
    fontSize: 10,
    color: "#C0E3C5",
  },
  iconRight: {
    color: "#999",
    fontSize: 14,
    borderRadius: 50,
    borderColor: "#999",
    borderWidth: 1,
    textAlign: "center",
    padding: 5,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  rowCategory: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  categoryItem: {
    alignItems: "center",
  },

  imageWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    bottom: 10,
  },
  content: {
    backgroundColor: "#C0E3C5",
    padding: 10,
  },
  titleText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
  iconLeft: {
    fontSize: 18,
    marginHorizontal: 5,
  },
  text: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#333",
  },
  notesContainer: {
    backgroundColor: "#3333",
    padding: 15,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 5,
  },
  //   notesTitle: {
  //     fontSize: 12,
  //     fontWeight: "bold",
  //     color: "#333",
  //     marginBottom: 10,
  //   },
  //   notesInput: {
  //     height: 50,
  //     borderColor: "#2B5F2F",
  //     borderWidth: 0.5,
  //     borderRadius: 5,
  //     padding: 10,
  //     fontSize: 10,
  //     color: "#333",
  //   },
  serviecList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "row",
    backgroundColor: "#2B5F2F",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 0,
  },
  footerText: {
    fontSize: 16,
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  footerTotal: {
    backgroundColor: "green",
    flex: 1,
    padding: 10,
  },
  footerButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
