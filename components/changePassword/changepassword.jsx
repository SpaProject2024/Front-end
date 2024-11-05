import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { styles } from "./styles";
import { API_BASE_URL } from '../../LocalIP/localIP';

const ChangePassword = () => {
    const router = useRouter();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handlePasswordChange = async () => {
        // Clear previous error messages
        setOldPasswordError('');
        setNewPasswordError('');
        setConfirmPasswordError('');

        let hasError = false; // Track if there's any error

        // Check for empty old password
        if (!oldPassword) {
            setOldPasswordError("Current password is required");
            hasError = true;
        }

        // Check for empty new password
        if (!newPassword) {
            setNewPasswordError("New password is required");
            hasError = true;
        }

        // Check for empty confirm password
        if (!confirmPassword) {
            setConfirmPasswordError("Please confirm your new password");
            hasError = true;
        }

        // Check if new password matches confirm password
        if (newPassword && confirmPassword && newPassword !== confirmPassword) {
            setNewPasswordError("New password and confirm password do not match");
            setConfirmPasswordError("New password and confirm password do not match");
            hasError = true;
        }

        // If any error, stop execution
        if (hasError) return;

        try {
            const userId = await AsyncStorage.getItem('userId'); // Get userId from AsyncStorage
            const token = await AsyncStorage.getItem('token'); // Get token from AsyncStorage

            const response = await axios.put(`${API_BASE_URL}/login/${userId}`, {
                oldPassword,
                newPassword,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                Alert.alert("Success", "Password updated successfully!", [
                    {
                        text: "OK",
                        onPress: () => router.push("hometab/hometab"),
                    },
                ]);
            }
        } catch (error) {
            console.error('Password Update Error:', error);
            Alert.alert("Error", "Failed to update password");
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.back}>
                    <Icon name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Change Password</Text>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Current Password</Text>
                <TextInput
                    style={styles.input}
                    value={oldPassword}
                    onChangeText={setOldPassword}
                    secureTextEntry={true} // Hide password
                />
                {oldPasswordError ? <Text style={{ color: 'red' }}>{oldPasswordError}</Text> : null}

                <Text style={styles.label}>New Password</Text>
                <TextInput
                    style={styles.input}
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry={true} // Hide password
                />
                {newPasswordError ? <Text style={{ color: 'red' }}>{newPasswordError}</Text> : null}

                <Text style={styles.label}>Confirm New Password</Text>
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={true} // Hide password
                />
                {confirmPasswordError ? <Text style={{ color: 'red' }}>{confirmPasswordError}</Text> : null}

                <TouchableOpacity style={styles.saveButton} onPress={handlePasswordChange}>
                    <Text style={styles.saveButtonText}>Update Password</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ChangePassword;
