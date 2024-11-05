import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import DoctorManagerDetail from "../../components/DoctorManager/doctordetail";

export default function doctormanager() {
    return (
        <View style={styles.container}>
            <DoctorManagerDetail />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});