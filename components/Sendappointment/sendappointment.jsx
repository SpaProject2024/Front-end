import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Logo from "../../assets/images/logo2.png";
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from "expo-router";

export default function sendappointment() {
    const router = useRouter();
    const [sender, setSender] = useState('');
    const [recipient, setRecipient] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = () => {
        if (sender && recipient && title && description) {
            Alert.alert('Đơn xin nghỉ đã được gửi thành công!');
        } else {
            Alert.alert('Vui lòng điền đầy đủ thông tin!');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push("/appointment/appointment")} style={styles.backButton}>
                    <Icon name='arrow-back' size={24} color="#b0b0b0" />
                </TouchableOpacity>
                <Text style={styles.title}>Resignation Letter</Text>
            </View>
            <View style={styles.sendcontent}>
                <TextInput
                    style={styles.input}
                    placeholder="Người gửi"
                    value={sender}
                    onChangeText={setSender}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Người nhận"
                    value={recipient}
                    onChangeText={setRecipient}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Tiêu đề"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.textArea}
                    placeholder="Mô tả lý do xin nghỉ"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    numberOfLines={5}
                />
                <View style={styles.buttonContainer}>
                    <Button title="Gửi đơn" onPress={handleSubmit} color="#4CAF50" />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
});
