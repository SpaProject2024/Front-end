import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import ServicesPage from "../../components/servicesmanager/servicesmanager";
export default function services() {
    return (
        <View style={styles.container}>
            <ServicesPage />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
