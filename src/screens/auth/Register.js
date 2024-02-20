import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../navigations";

const Register = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Register</Text>
      <Button
        onPress={() => {
          navigation.navigate(ROUTES.AUTH_NAVIGATION.LOGIN);
        }}
        title="Click to login"
      />
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
