import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import ROUTES from "../../navigations";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth";
import UserContext from "../../context/UserContext";
const logo = require("../../../assets/logo");
const Login = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({});
  const [user, setUser] = useContext(UserContext);
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => login(userInfo),
    onSuccess: () => {
      setUser(true);
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
          height: 100,
          width: 100,
          birderRadius: 100,
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
        <Pressable onPress={() => mutate()} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>

        <View style={styles.footer}>
          <Text>Not a user?</Text>
          {/* <Text>{user}</Text> */}
          <Pressable
            onPress={() =>
              navigation.navigate(ROUTES.AUTH.AUTH_NAVIGATION.REGISTER)
            }
          >
            <Text style={styles.link}>Register</Text>
          </Pressable>
        </View>
        <View style={styles.footer}>
          <Pressable
            onPress={() =>
              navigation.navigate(ROUTES.AUTH.AUTH_NAVIGATION.REGISTER_HELPER)
            }
          >
            <Text style={styles.helperLink}>Register as a helper</Text>
          </Pressable>
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
  },
  footer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
  },
  link: {
    color: "#f25042",
    marginLeft: 5,
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
    marginTop: 10,
  },
  loginButtonText: {
    color: "#fffffe",
    fontSize: 16,
  },
});
