import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import SupplierDetail from "../../components/SupplierManager/supplierdetail";
export default function appointment() {
    return (
        <View style={styles.container}>
            <SupplierDetail />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});