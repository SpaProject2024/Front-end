import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import ServicesDetailPage from "../../components/servicesmanager/servicesdetail";
export default function servicesdetail() {
    return (
        <View style={styles.container}>
            <ServicesDetailPage />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
