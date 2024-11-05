import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Warehouse from "../../components/Warehouse/Warehouse";
export default function warehouse() {
    return (
        <View style={styles.container}>
            <Warehouse />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
