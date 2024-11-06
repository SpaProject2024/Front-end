import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import AcceptAppointmentPage from "../../components/acceptappointment/AcceptAppointment";
export default function AcceptAppointmentScreen() {
    return (
        <View style={styles.container}>
            <AcceptAppointmentPage />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
