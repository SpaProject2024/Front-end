import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import DateTimePickerPage from '../../components/Dateappointment/dateappointment';
export default function appointment() {
    return (
        <View style={styles.container}>
            <DateTimePickerPage />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
