import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import Logo from '../../assets/images/logo2.png'; // Update the path to your logo
import { styles } from './styles';
import { API_BASE_URL } from '../../LocalIP/localIP';
const VerifyPin = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [pin, setPin] = useState(Array(6).fill('')); // Array to store individual PIN characters
    const [pinError, setPinError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state for API requests

    // Get email from router params
    useEffect(() => {
        if (router.params && router.params.email) {
            setEmail(router.params.email);
        } else {
            console.error('Email not found in router params.');
        }
    }, [router.params]);

    // Verify PIN with backend
    const handleVerifyPin = async () => {
        setPinError('');
        const pinString = pin.join(''); // Combine PIN array into a string

        if (!pinString) {
            setPinError('PIN is required');
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/verifyPin`, {
                email,
                pin: pinString, // Send the combined PIN string
            });

            if (response.status === 200) {
                Alert.alert('Success', 'Account activated successfully! Redirecting to the homepage.');
                router.push('Home/home');
            }
        } catch (error) {
            console.error('Verification error:', error);
            const errorMessage = error.response?.data?.message || 'Verification failed. Please try again.';
            Alert.alert('Error', errorMessage);
        }
    };

    // Request a new PIN
    const handleRequestNewPin = async () => {
        try {
            setLoading(true); // Set loading state while sending request
            const response = await axios.put(`${API_BASE_URL}/verifyPin/resend`, { email });

            if (response.status === 200) {
                Alert.alert('Success', 'A new PIN has been sent to your email.');
            } else {
                Alert.alert('Error', 'Failed to send new PIN. Please try again.');
            }
        } catch (error) {
            console.error('Error requesting new PIN:', error);
            Alert.alert('Error', 'Unable to request a new PIN.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    // Handle PIN input changes
    const handlePinChange = (text, index) => {
        if (/^\d*$/.test(text)) { // Ensure input is numeric
            const newPin = [...pin];
            newPin[index] = text;
            setPin(newPin);

            // Automatically move to the next input
            if (text && index < 5) {
                const nextInput = index + 1;
                const nextInputRef = inputsRef[nextInput];
                if (nextInputRef) {
                    nextInputRef.focus();
                }
            }
        }
    };

    // References for each input field
    const inputsRef = [];

    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logo} />
            <Text style={styles.title}>Verify Your PIN</Text>
            <Text style={styles.subtitle}>Please enter the PIN sent to your email: {email}</Text>

            <View style={styles.pinContainer}>
                {pin.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.pinInput}
                        value={digit}
                        onChangeText={(text) => handlePinChange(text, index)}
                        keyboardType="numeric"
                        maxLength={1}
                        ref={(ref) => (inputsRef[index] = ref)} // Set input ref for focus handling
                    />
                ))}
            </View>

            {pinError ? <Text style={styles.errorText}>{pinError}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleVerifyPin}>
                <Text style={styles.buttonText}>Verify PIN</Text>
            </TouchableOpacity>

            {/* Add a button for requesting a new PIN */}
            <TouchableOpacity style={[styles.button, styles.requestButton]} onPress={handleRequestNewPin} disabled={loading}>
                <Text style={styles.buttonText}>{loading ? 'Requesting...' : 'Request New PIN'}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default VerifyPin;
