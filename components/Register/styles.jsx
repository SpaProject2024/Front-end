
import { StyleSheet } from "react-native";
export const buttonStyles = StyleSheet.create({
  baseButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  textButton: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  logo: {
    width: 200,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#2B5F2F",
  },
  text: {
    fontSize: 14,
    color: "#999",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    fontSize: 10,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },
  registerText: {
    color: "#fff",
    fontSize: 10,
    textAlign: "center",
  },
  registerButton: {
    width: "100%",
    backgroundColor: "#2B5F2F",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  registerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
