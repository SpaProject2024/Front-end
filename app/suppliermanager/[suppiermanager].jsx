import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import SupplierPage from "../../components/SupplierManager/suppliermanager";
export default function appointment() {
    return (
        <View style={styles.container}>
            <SupplierPage />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
