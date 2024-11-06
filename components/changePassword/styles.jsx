import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2B5F2F", // Container background color for input area
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 35,
        padding: 10,
        marginBottom: 20,
        paddingVertical: 10, // Padding to give space in header
    },
    back: {
        marginRight: 10,
    },
    title: {
        marginLeft: 10,
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inputContainer: {
        backgroundColor: "#ffffff", // Input container background color
        paddingHorizontal: 10,
        paddingVertical: 20, // Added padding to create space around inputs
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#ffffff', // Input field background color
    },
    saveButton: {
        backgroundColor: '#2B5F2F',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
