import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#f9f9f9',
  },
  logo: {
      width: 100,
      height: 100,
      marginBottom: 20,
  },
  title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
  },
  subtitle: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
      color: '#555',
  },
  pinContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 20,
  },
  pinInput: {
      width: 40,
      height: 40,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      textAlign: 'center',
      fontSize: 18,
  },
  errorText: {
      color: 'red',
      marginBottom: 10,
  },
  button: {
      backgroundColor: '#007BFF',
      padding: 15,
      borderRadius: 5,
      width: '100%',
      alignItems: 'center',
      marginBottom: 10,
  },
  requestButton: {
      backgroundColor: '#28a745', // Change color for "Request New PIN" button
  },
  buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
  },
});