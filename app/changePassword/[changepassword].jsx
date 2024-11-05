import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import ChangePassword from "../../components/changePassword/changepassword";
export default function changepassword() {
    return (
        <View style={styles.container}>
            <ChangePassword />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
