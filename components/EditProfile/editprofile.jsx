import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the back icon
import { useRouter } from 'expo-router'; // Import useRouter for navigation

const EditProfile = () => {
    const router = useRouter(); // Call useRouter to get the router
    const [name, setName] = useState('Huỳnh Tuấn Kiệt');
    const [email, setEmail] = useState('Belikeme409@gmail.com');
    const [phone, setPhone] = useState('0949732710');

    const saveChanges = () => {
        console.log('Name:', name, 'Email:', email, 'Phone:', phone);
    };

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit</Text>
            </View>

            {/* Profile Avatar */}
            <View style={styles.headerprofile}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: 'https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-male-avatar-image-in-the-circle-image_2908803.jpg' }} 
                    />
                    <TouchableOpacity style={styles.cameraIcon}>
                        <Icon name="camera" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                />

                <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
                    <Text style={styles.saveButtonText}>Edit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'#A1D9A8',
        height: 50,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
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
    label: {
        fontSize: 12,
        marginBottom: 10,
        color: '#8d9392',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    saveButton: {
        backgroundColor: '#2B5F2F',
        borderRadius: 10,
    },
    saveButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        padding: 5,
    },
    inputContainer: {
        paddingHorizontal: 8,
    },
});

export default EditProfile;
