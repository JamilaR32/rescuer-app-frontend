import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "..";
import Login from "../../screens/auth/Login";
import Register from "../../screens/auth/Register";
import { NavigationContainer } from "@react-navigation/native";
const AuthNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={ROUTES.AUTH_NAVIGATION.LOGIN}>
      <Stack.Screen
        name={ROUTES.AUTH_NAVIGATION.LOGIN}
        component={Login}
      ></Stack.Screen>
      <Stack.Screen
        name={ROUTES.AUTH_NAVIGATION.REGISTER}
        component={Register}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthNavigation;

const styles = StyleSheet.create({});
