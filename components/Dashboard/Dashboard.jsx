import React from 'react';

import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { useRouter } from 'expo-router';


const Dashboard = ({ navigation }) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: 'https://static.wikia.nocookie.net/houkai-star-rail/images/8/88/Profile_Picture_Acheron_-_Ambush.png/revision/latest/thumbnail/width/360/height/360?cb=20240509000125' }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>Kiệt Huỳnh</Text>
        <Text style={styles.userDetails}>Siêu cấp đẹp trai</Text>
      </View>
      <Text style={styles.cardTitle}>Visitors Stats</Text>
      <View style={styles.card}>

      </View>

      <Text style={styles.cardTitle}>Details of the managers</Text>
      <View style={styles.card}>

        <Card.Content>
          <TouchableOpacity
            style={styles.button}
          >
            <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFrMxHxuOBY6B-z9Gg2rBftS9U0kHL1AtQjg&s' }}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Product</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity
            onPress={() => router.push('/WareHouse/warehouse.jsx')}
            style={styles.button}
          >
            <Image
              source={{ uri: 'https://i.pinimg.com/564x/dd/f0/63/ddf063a38c16d2bf954a3512079e5676.jpg' }}
              style={styles.icon}

            />
            <Text style={styles.buttonText}>WareHouse</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity
            style={styles.button}
          >
            <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFHi_Tlr3JBAlqhkl39a5mQg6aAaY3xN6HRA&s' }}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Services</Text>
          </TouchableOpacity>

          <View style={styles.separator} />

          <TouchableOpacity

            style={styles.button}
          >
            <Image
              source={{ uri: 'https://i.pinimg.com/236x/d9/1f/cb/d91fcb28a185d4bee7cdaa6390780404.jpg' }}
              style={styles.icon}
            />
            <Text style={styles.buttonText}>................</Text>
          </TouchableOpacity>
        </Card.Content>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userDetails: {
    textAlign: 'center',
    marginTop: 8,
    color: '#777',
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: '#000',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',

  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});

export default Dashboard;
