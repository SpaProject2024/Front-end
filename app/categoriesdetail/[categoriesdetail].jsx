import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import CategoriesDetailPage from "../../components/categoriesmanager/categoriesdetail";
export default function categoriesdetail() {
    return (
        <View style={styles.container}>
            <CategoriesDetailPage />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
