import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import ROUTES from "../../navigations";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth";
import UserContext from "../../context/UserContext";
import { jwtDecode } from "jwt-decode";
const logo = require("../../../assets/logo/rescLogo.png");
const Login = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({});
  const [user, setUser] = useContext(UserContext);
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => login(userInfo),
    onSuccess: (data) => {
      const decode = jwtDecode(data.token);

      setUser(decode);
    },
  });
  const handleRegisterHelper = () => {
    console.log("Register as a helper button pressed");
    console.log("Navigation object:", navigation);
    navigation.navigate(ROUTES.AUTH.AUTH_NAVIGATION.REGISTER_HELPER);
  };
  console.log("User info:", userInfo);

  return (
    <View style={styles.container}>
      <Image
        style={{
          height: 200,
          width: 200,
          borderRadius: 200,
          marginBottom: 20,
        }}
        source={logo}
      />
      <Text style={styles.label}>Civil ID</Text>
      <TextInput
        placeholder="Enter your Civil ID"
        onChangeText={(text) => setUserInfo({ ...userInfo, civilId: text })}
        style={styles.input}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        placeholder="Enter your password"
        secureTextEntry={true}
        onChangeText={(text) => setUserInfo({ ...userInfo, password: text })}
        style={styles.input}
      />
      <View style={styles.buttonContainer}>
        <TouchableHighlight onPress={() => mutate()} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableHighlight>

        <View style={styles.footer}>
          <Text style={styles.footer}>Not a user?</Text>
          {/* <Text>{user}</Text> */}
          <Pressable
            onPress={() =>
              navigation.navigate(ROUTES.AUTH.AUTH_NAVIGATION.REGISTER)
            }
          >
            <Text style={styles.link}>Register</Text>
          </Pressable>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.footer2}>OR</Text>
          <View style={{ flexDirection: "column" }}>
            <Pressable
              onPress={() =>
                navigation.navigate(ROUTES.AUTH.AUTH_NAVIGATION.HELPER_REGISTER)
              }
            >
              <Text style={styles.link}>Register as a helper</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f4ef",
  },
  input: {
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 20,
    width: "80%",
    padding: 10,
    marginVertical: 10, // Adds space above and below the input
    backgroundColor: "#eaddcf",
  },
  buttonContainer: {
    marginTop: 20,
    width: "80%",
    borderRadius: 20,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: "12%", // Adjust based on your layout preference
    fontWeight: "bold",
    marginBottom: -5,
  },
  footer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
    fontStyle: "italic",
  },
  footer2: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
    fontWeight: "bold",
  },
  link: {
    color: "#f25042",
    marginTop: 10,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  helperLink: {
    color: "#f25042",
    marginLeft: 5,
  },
  loginButton: {
    backgroundColor: "#8c7851",
    padding: 10,
    borderRadius: 20,
    width: "98%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
  },
  loginButtonText: {
    color: "#fffffe",
    fontSize: 16,
  },
});
