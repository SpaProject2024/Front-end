import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { useRouter } from "expo-router";
import Logo from "../assets/images/logo2.png";

export default function IntroScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
       router.push("/Home/home");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Text>Welcome to the Intro Screen!</Text>
      <Button
        title="Go to Login"
        onPress={() => router.push('/Login/login')}
        // onPress={() => router.push('/ServiceList')}
      />
    <View style={styles.container}>    
      <Image source={Logo} style={styles.logo}></Image>
      <Text style={styles.text}> Bellavita Beauty </Text>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  text:{
    fontSize:14,
    fontWeight: 'bold',
    color: '#999999',
    paddingTop: 5,
  },
});
