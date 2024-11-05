import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import DoctorList from "./../DoctorList/DoctorList";
import ServiceTitle from "./../../components/ServiceInfo/Service";

export default function ServiceInfo({ service }) {
  return (
    <View  style={{ height: 506 }}>
      <ScrollView>
        {/* Service Title */}
        <ServiceTitle service={service} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

});
