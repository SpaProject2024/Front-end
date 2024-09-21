
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize: 14,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        color: '#2B5F2F',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    // khung search
    searchBar: {
        flex: 1,
        width: 10,
        height: 30,
        borderColor: '#ccc',
        borderColor: '#A4DAA9',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
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
    notesText: {
        color: '#666',
        marginTop: 5,
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
    weekContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 10
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
    underline: {
        height: 3,
        backgroundColor: '#A4D9AA',
        marginTop: 5,
    },
    //   mới thêm
    footer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        paddingBottom: 20,
    },
    footerButton: {
        width: "40%",
        padding: 10,
        backgroundColor: "#6200ee",
        borderRadius: 8,
        alignItems: "center",
    },
    //dropdown 
    dropdownmenu: {
        marginLeft:150,
    },
    dropdownWrapper: {
        position: 'relative',
        zIndex: 1000,  // Đảm bảo dropdown nằm phía trên các thành phần khác
    },
    dropdownContainer: {
        position: 'absolute',  // Sử dụng absolute để dropdown không dịch chuyển các thành phần khác
        top: 30,  // Tùy chỉnh vị trí thả xuống cho hợp lý
        right: 0,
        zIndex: 1000,
        width: 100,
    },
    dropdownStyle: {
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderColor: '#ccc',
        elevation: 5,  // Tạo bóng cho dropdown để nổi bật
    },
    dropdownContainerStyle: {
        marginTop: 10,  // Thêm khoảng cách từ trên xuống
    },
    dropdownListStyle: {
        zIndex: 1000,
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