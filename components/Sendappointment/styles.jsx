import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 14,
        backgroundColor: '#f5f5f5',
    },
    sendcontent: {
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
        marginBottom: 10,
        backgroundColor: '#5C9161',
    },
    picker: {
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20
    },

    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    textArea: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 15,
        height: 120,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        marginTop: 20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    logo: {
        width: 30,
        height: 30,
        borderRadius: 50,
        marginRight: 10,
    },
    backButton: {
        marginLeft: 10,
    },
    title: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 20,
    },

    // mới thêm
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    managerItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    selectedManager: {
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        textAlign: 'center',
    },
});
