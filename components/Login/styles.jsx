import { StyleSheet } from "react-native";
export const buttonStyles = StyleSheet.create({
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#2B5F2F",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  textButton: {
    color: "#fff",
    fontWeight: "bold",
  },
  baseButton: {
    height: 40,
    width: 100,
    backgroundColor: "#2B5F2F",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  socialButton: {
    width: "50%",
    marginLeft: 10,
  },
  facebookButton: {
    backgroundColor: "#4B8BF5",
    marginBottom: 10,
  },
  googleButton: {
    backgroundColor: "#EA4335",
    marginBottom: 10,
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
    width: 80,
    height: 80,
    borderRadius: 50,
    marginTop: 10,
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
  withGGContainer: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2B5F2F",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  withGGText: {
    color: "#FFFFFF",
    paddingLeft: 10,
  },
  linkButton: {
    flex: 1,
    marginRight: 5,
  },
  linkText: {
    color: "#2B5F2F",
    fontSize: 10,
    textAlign: "center",
  },
  fogotText: {
    textDecorationLine: "underline",
  },
  registerText: {
    color: "#fff",
  },
  fogotpasswordText: {
    color: "#999",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#2B5F2F",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#2B5F2F",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },

  orText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#999",
    marginTop: 10,
  },
});
