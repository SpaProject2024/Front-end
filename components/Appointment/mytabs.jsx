import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../../app/Home/[home]';
import AppointmentScreen from '../../app/appointment/[appointment]';
import ProfileScreen from '../../app/MyAccount/[myAccount]';
const Tab = createBottomTabNavigator();
export default function mytabs() {
    return (
        <Tab.Navigator
            initialRouteName="Appointment" // Chỉ định màn hình hiển thị đầu tiên
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Appointment') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    }

                    // Trả về biểu tượng Ionicons
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >

            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Appointment" component={AppointmentScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}
