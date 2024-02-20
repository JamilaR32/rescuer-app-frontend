import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import ROUTES from "../../navigations";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Login</Text>
      <Button
        onPress={() => {
          navigation.navigate(ROUTES.AUTH_NAVIGATION.REGISTER);
        }}
        title="Click to go register"
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
