import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import DoctorDetail from "../../components/DoctorList/Doctordetail";

export default function doctordetail() {
    return (
        <View style={styles.container}>
            <DoctorDetail />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});