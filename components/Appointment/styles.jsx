import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // fontSize: 14,
        // padding: 20,
        // backgroundColor: '#f5f5f5',
        backgroundColor: "#2B5F2F",

    },
    title: {
        marginLeft: 10,
        color: '#e3ffe6',
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
        height: 390, // Thiết lập chiều cao tối đa cho ScrollView
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
export const buttonStyles = StyleSheet.create({
    baseButton: {
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
    },
    textButton: {
        color: "#fff",
        fontWeight: "bold",
    },
});
export const detailStyles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 14,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
        marginBottom: 10,
        backgroundColor: '#5C9161',
    },
    backButton: {
        marginLeft: 10,
    },
    backButtonText: {
        fontSize: 16,
        marginLeft: 5,
    },
    title: {
        color: '#ffffff',
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    detailContainer: {
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#fff',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#A4DAA9',
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Đổ bóng trên Android
    },
    label: {
        flex: 1,
        marginBottom: 10,
    },
    labeltext: {
        flex: 1,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 0,
    },
    value: {
        flex: 1,
        marginBottom: 10,
    },
    patientName: {
        fontWeight: 'bold',
    },
    //dấu gạch dưới của tên bệnh nhân
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#A4DAA9',
        marginVertical: 10,
        width: 260,
    },
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center', // Căn giữa nội dung
        alignItems: 'center', // Căn giữa theo trục dọc
        marginBottom: 5,
    },
    // nút edit
    editButton: {
        position: 'absolute',
        right: 0,
        top: 18, // Điều chỉnh khoảng cách nếu cần
        backgroundColor: '#5C9161',
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    editButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    input: {
        borderColor: '#A4DAA9',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#fff',
        width: '100%',
    },
    // form delete
    deleteMessage: {
        fontSize: 16,
        marginVertical: 10,
        textAlign: 'center',
    },

    cancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ccc',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },

    cancelButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    deleteButton: {
        marginTop: 10,
        backgroundColor: '#5C9161',
        padding: 10,
        borderRadius: 10,
        marginRight: 5,
    },
    deleteButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalheaderdelete: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalContainerdelete: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContentdelete: {
        width: 300,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitledelete: {
        color: '#A4DAA9',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    modalButtondelete: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 10,
    },
    //form update 
    modalheader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        height: 600,
        width: 300,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        alignItems: 'flex-start',
        overflow: 'hidden',
    },
    modalTitle: {
        color: '#A4DAA9',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 25,
        marginTop: 10,
        marginBottom: 10,
    },
    saveButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#5C9161',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});