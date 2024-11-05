import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    header: {
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        position: 'relative',
        backgroundColor: '#2B5F2F',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    profileInfo: {
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#fff',
    },
    name: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    infoSection: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    infoText: {
        fontSize: 16,
        marginLeft: 15,
        flex: 1,
        color: '#333',
    },
    refreshIcon: {
        marginLeft: 'auto',
    },
    editProfileButton: {
        marginTop: 30,
        paddingHorizontal: 20,
    },
    gradientButton: {
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
    },

});