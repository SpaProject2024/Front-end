import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import DoctorList from "./../DoctorList/DoctorList";
import ServiceTitle from "./../../components/ServiceInfo/Service";

export default function ServiceInfo({ service }) {
  return (
    <View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 230 }}>
        {/* Service Title */}
        <ServiceTitle service={service} />

        {/* Description */}
        <View style={styles.div}>
          <Text style={styles.title}>About</Text>
          <Text style={{ fontSize: 13 }}>{service.description}</Text>
        </View>

        <View style={styles.line} />

        {/* Doctor */}
        <View style={styles.div}>
          <Text style={styles.title}>Doctor</Text>
          <DoctorList />
        </View>

        <View style={styles.line} />

        {/* Photo */}
        <View style={styles.div}>
          <Text style={styles.title}>Photo</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  div: {
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  line: {
    height: 3, // Chiều cao của đường gạch ngang
    backgroundColor: "#d3d3d3", // Màu của đường gạch ngang
    marginVertical: 5, // Khoảng cách trên dưới
    width: "100%", // Chiều rộng của đường gạch ngang (full width)
  },
});
