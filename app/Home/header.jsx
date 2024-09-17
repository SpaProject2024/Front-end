import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Maps from "../../assets/images/maps.png";
import Bell from "../../assets/images/bell.png";
import Find from "../../assets/images/find.png";
import Voice from "../../assets/images/voice.png";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <View style={styles.logo}>
            <Image source={Voice} style={styles.icon} />
          </View>
          <View style={styles.searchBox}>
            <View style={styles.searchRow}>
              <Image source={Find} style={styles.icon} />
              <Text style={styles.textSearch}>Enter key search</Text>
            </View>
            <Image source={Voice} style={styles.icon} />
          </View>
        </View>
        <View>
          <Image source={Bell} style={styles.bell} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#C0E3C5",
  },
  logo:{
    
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    borderRadius: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  textSearch: {
    fontSize: 12,
    paddingLeft: 10,
    paddingRight: 10,
    color: "#999999",
  },
  bell: {
    width: 30,
    height: 30,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#fff",
    marginTop: 10,
    justifyContent: "space-between",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 15,
    height: 15,
  },
});

export default Header;
