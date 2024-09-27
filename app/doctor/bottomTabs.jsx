import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
    return (
        <view style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
            <Text>Home!</Text>
        </view>
    )
};
function SettingsScreen() {
    return (
        <view style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
            <Text>Setting!</Text>
        </view>
    )
}
const Tab = createBottomTabNavigator();
export default function bottomTabs() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="home" component={HomeScreen} />
                <Tab.Screen name="settings" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}