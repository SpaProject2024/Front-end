import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
export default function DashboardScreen () {
    return (
        <View style={styles.container}>
            <Dashboard />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
