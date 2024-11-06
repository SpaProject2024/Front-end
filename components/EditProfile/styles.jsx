import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    back: {
        marginLeft: 10,
        marginTop: 30,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#A1D9A8',
        height: 80,
    },
    headerprofile: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#d9d9d9',
    },
    cameraIcon: {
        position: 'absolute',
        bottom: -1,
        right: 1,
        backgroundColor: '#2B5F2F',
        borderRadius: 50,
        padding: 5,
    },
    inputContainer: {
        paddingHorizontal: 20,
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