import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    card: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
        color: '#fff',
    },
    supplierItem: {
        margin: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
        elevation: 2,
        borderWidth: 2,
        borderColor: '#ccc',
    },
    infoContainer: {
        flex: 1,
        width: 270,
        padding: 20,
        marginRight: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        width: 80, // Set a fixed width for label alignment
    },
    value: {
        fontSize: 14,
        color: '#333',
    },
    viewButton: {
        marginLeft: 190,
        width: 100,
        marginTop: 10,
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    // Thêm style cho nền mờ
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Nền mờ với độ trong suốt 50%
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        justifyContent: 'center',    // Căn giữa theo chiều dọc
        alignItems: 'center',        // Căn giữa theo chiều ngang
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 20,        // Căn lề cho modal
        height: 200,                 // Giới hạn chiều cao modal là 200px
        elevation: 5,
        alignSelf: 'center',         // Đảm bảo modal nằm giữa màn hình
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'center',      // Căn lề trái cho tiêu đề
    },
    textLeft: {
        alignSelf: 'flex-start',      // Căn lề trái cho các đoạn text khác
    },
    closeButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 10,
        paddingHorizontal: 20,
        backgroundColor: '#5C9161',
    },
    backButton: {
        marginRight: 20,
    },
    titlename: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },

    // update detail
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Lớp mờ nền khi mở modal
    },
    modalContainer: {
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: 20,
    },
    serviceImage: {
        width: '100%',        // Đặt chiều rộng hình ảnh là 100% để nó chiếm toàn bộ chiều rộng của container
        height: 200,          // Chiều cao của hình ảnh
        resizeMode: 'cover',  // Cách hình ảnh được điều chỉnh trong container
        borderRadius: 10,     // Bo tròn các góc của hình ảnh
        marginVertical: 10,   // Khoảng cách dọc giữa hình ảnh và các phần tử khác
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        width: '100%',
    },
    detailText: {
        fontSize: 18,
        color: '#555',
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: 'green', // Màu nền cho nút Save
        padding: 10,
        borderRadius: 10,
        marginRight: 10,
        alignItems: 'center',
        flex: 1, // Để nút có độ rộng bằng nhau với nút Cancel
    },
    saveButtonText: {
        color: 'white', // Màu chữ cho nút Save
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: 'red', // Màu nền cho nút Cancel
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        flex: 1, // Để nút có độ rộng bằng nhau với nút Save
    },
    cancelButtonText: {
        color: 'white', // Màu chữ cho nút Cancel
        fontSize: 16,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#007BFF', // Màu nền cho nút Add
        borderRadius: 50,
        padding: 10,
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 1,
    },
    errorText: {
        color: 'red',
        marginTop: 5,
        marginBottom: 10,
        fontSize: 14,
    },
});