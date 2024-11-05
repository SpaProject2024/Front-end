import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import CategoriesPage from "../../components/categoriesmanager/categoriesmanager";
export default function categoriesr() {
    return (
        <View style={styles.container}>
            <CategoriesPage />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
