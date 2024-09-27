import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import AppointmentDetail from "../../components/Appointment/appointmentdetail";

export default function appointmentdetail() {
    return (
        <View style={styles.container}>
            <AppointmentDetail />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});