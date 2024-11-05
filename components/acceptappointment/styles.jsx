import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        backgroundColor: "#2B5F2F",

    },
    backButton: {
        marginRight: 10,
    },
    title: {
        marginLeft: 10,
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 35,
        marginLeft: 20,
        marginBottom: 20,
    },
    bell: {
        marginRight: 10,
        width: 20,
        height: 20,
        tintColor: "#e3ffe6",
    },
    // khung data
    scheduleItem: {
        padding: 10,
        margin: 10,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 8,
        borderColor: '#A4DAA9',
        borderWidth: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 3,
    },
    containercard: {
        backgroundColor: "#fff",
        height: "100%", // Thiết lập chiều cao tối đa cho ScrollView
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'center', // Căn giữa nội dung
        alignItems: 'center', // Căn giữa theo trục dọc
        marginBottom: 5,
    },
    labelText: {
        flex: 1, // Chia đều không gian
        fontWeight: 'bold',
    },
    valueText: {
        flex: 1, // Chia đều không gian
    },
    viewDetailsButton: {
        flex: 1,
        marginTop: 5,
        padding: 5,
        backgroundColor: '#A4D8A8',
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#5C9161',
        fontWeight: 'bold',
    },
    //khung ngày
    weekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#fff",
        marginVertical: 10
    },
    Containerall: {
        backgroundColor: "#fff",
    },
    weekNavButton: {
        fontWeight: 'bold',
        paddingHorizontal: 10
    },
    dayContainer: {
        alignItems: 'center',
        padding: 5
    },
    dayText: {
        fontWeight: 'bold'
    },
    dateText: {
        color: '#555'
    },
    selectedDayText: {
        color: '#2B5F2F'
    },
    selectedDateText: {
        color: '#2B5F2F',
        fontWeight: 'bold'
    },
    statusFilterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    statusText: {
        fontWeight: 'bold',
        color: "#ffffff",
    },
    //imcomplete
    underline: {
        height: 3,
        backgroundColor: '#A4D9AA',
        marginTop: 5,
    },
    // logo
    logo: {
        width: 30,
        height: 30,
        borderRadius: 50,
        marginRight: 10,
    },
    //dropdown mới thêm
    dropdownmenu: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 70,
    },
    dropdownWrappers: {
        alignItems: "flex-start",  // Căn dropdown sang trái
        justifyContent: "flex-start",
        position: "relative",
    },
    dropdowns: {
        width: 250,
        alignSelf: 'flex-start',  // Đảm bảo dropdown nằm bên trái
    },
    iconStyles: {
        width: 20,
        height: 20,
    },
});