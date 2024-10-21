import React from 'react';
import { Stack } from 'expo-router';
// import '../firebase/config';
export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0], // Trượt từ phải sang trái
                  }),
                },
                {
                  scale: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1.2, 1], // Phóng to từ 1.2x đến kích thước gốc
                  }),
                },
              ],
              opacity: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1], // Từ mờ dần đến hiển thị hoàn toàn
              }),
            },
          };
        },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgetpassword" />
      <Stack.Screen name="verification" />
      <Stack.Screen name="ServiceList" />
      <Stack.Screen name="Confirmation" />
      <Stack.Screen name="DoctorList" />
      <Stack.Screen name="FogotPassword" />
      <Stack.Screen name="SecondaryPin" />
      <Stack.Screen name="ManagerDoctors" />
      <Stack.Screen name="supplierdetail" />
      <Stack.Screen name="suppliermanager" />
    </Stack>

  );
}
