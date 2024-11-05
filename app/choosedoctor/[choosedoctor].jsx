import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import ChooseDoctorPage from '../../components/Dateappointment/chooseDoctor';
export default function appointment() {
    return (
        <View style={styles.container}>
            <ChooseDoctorPage />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
