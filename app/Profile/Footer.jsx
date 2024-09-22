import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router"; 
const Footer = () => {
  const router = useRouter();

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => router.push('/Home/home')}>
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/Booking/booking')}>
        <Text style={styles.footerText}>Booking</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/Settings')}>
        <Text style={styles.footerText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/Profile/profile')}>
        <Text style={styles.footerText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2B5F2F', 
    padding: 10,
  },
  footerText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Footer;
