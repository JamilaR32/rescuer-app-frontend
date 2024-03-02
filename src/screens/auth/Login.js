import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import ROUTES from "../../navigations";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth";
import UserContext from "../../context/UserContext";

const Login = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({});
  const [user, setUser] = useContext(UserContext);
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => login(userInfo),
    onSuccess: () => {
      setUser(true);
      // navigation.navigate(ROUTES.USER.PROFILE_NAVIGATION.INDEX, {
      //   screen: ROUTES.USER.PROFILE_NAVIGATION.PROFILE,
      // });
    },
  });

  return (
    <View style={styles.container}>
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
        <Button title="Login" onPress={mutate} style={styles.loginButton} />

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
    backgroundColor: "#F5EEF8",
  },
  input: {
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 20,
    width: "80%",
    padding: 10,
    marginVertical: 10, // Adds space above and below the input
    backgroundColor: "#D7BDE2",
  },
  buttonContainer: {
    marginTop: 20,
    width: "80%",
    borderRadius: 20,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: "10%", // Adjust based on your layout preference
  },
  footer: {
    flexDirection: "row",
    marginTop: 20,
  },
  link: {
    color: "#FF33CE",
    marginLeft: 5,
  },
  loginButton: {
    backgroundColor: "#8E44AD",
    padding: 10,
    borderRadius: 20,
    //width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
  },
});
