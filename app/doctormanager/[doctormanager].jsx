import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import DoctorManager from "../../components/DoctorManager/doctormanager";

export default function doctormanager() {
    return (
        <View style={styles.container}>
            <DoctorManager />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});