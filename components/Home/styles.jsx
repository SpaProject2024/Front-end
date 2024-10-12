import { StyleSheet } from "react-native";
import { Colors } from './../../constants/Colors.ts'

export const styles = StyleSheet.create({
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
    userInfoContainer: {
      padding: 10,
      backgroundColor: "#fff",
      borderRadius: 5,
      marginTop: 10,
    },
    userInfoText: {
      fontSize: 14,
      color: "#2B5F2F",
    },
    placeholderStyle: {
      color: Colors.PRIMARY
    },
    selectedTextStyle: {
      color: Colors.PRIMARY
    }
  });

  