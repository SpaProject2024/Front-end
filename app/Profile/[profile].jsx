import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router'; 
import Footer from './Footer';

const Profile = () => {
  const router = useRouter(); 

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerprofile}>
          <Image
            style={styles.avatar}
            source={{ uri: 'https://png.pngtree.com/thumb_back/fh260/background/20230612/pngtree-male-avatar-image-in-the-circle-image_2908803.jpg' }}
          />
          <Text style={styles.name}>Huỳnh Tuấn Kiệt</Text>
          <Text style={styles.email}>Belikeme409@gmail.com</Text>
        </View>

        <View style={styles.body}>
          <View style={styles.mainfunction}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => router.push('/EditProfile/editprofile')} 
            >
              <View style={styles.buttonContent}>
                <Icon name="person-circle-outline" style={styles.iconfunction} />
                <Text style={styles.buttonText}>My Account</Text>
              </View>
              <Icon name="chevron-forward" size={24} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => router.push('/Chat')} 
            >
              <View style={styles.buttonContent}>
                <Icon name="chatbubble-ellipses-outline" style={styles.iconfunction} />
                <Text style={styles.buttonText}>Chat</Text>
              </View>
              <Icon name="chevron-forward" size={24} style={styles.icon} />
            </TouchableOpacity>
          </View>

          <View style={styles.secondfunction}>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => router.push('/Favorite/favorie')} 
            >
              <View style={styles.buttonContent}>
                <Icon name="heart-outline" style={styles.iconfunction} />
                <Text style={styles.buttonText}>Favorite</Text>
              </View>
              <Icon name="chevron-forward" size={24} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.button}
              onPress={() => router.push('/BookingDetail')} 
            >
              <View style={styles.buttonContent}>
                <Icon name="notifications-outline" style={styles.iconfunction} />
                <Text style={styles.buttonText}>Notification Settings</Text>
              </View>
              <Icon name="chevron-forward" size={24} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <View style={styles.buttonContent}>
                <Icon name="pricetag-outline" style={styles.iconfunction} />
                <Text style={styles.buttonText}>Voucher</Text>
              </View>
              <Icon name="chevron-forward" size={24} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <View style={styles.buttonContent}>
                <Icon name="log-out-outline" style={styles.iconfunction} />
                <Text style={styles.buttonText}>Logout</Text>
              </View>
              <Icon name="chevron-forward" size={24} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    paddingBottom: 80, 
  },
  headerprofile: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#d9d9d9',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  body: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  mainfunction: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#d9d9d9',
  },
  secondfunction: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d9d9d9',
  },
  button: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 10,
    color: '#333',
  },
  iconfunction: {
    fontSize: 24,
    color: "#2B5F2F",
    paddingLeft: 10,
  },
  icon: {
    marginLeft: 10,
  },
});

export default Profile;
