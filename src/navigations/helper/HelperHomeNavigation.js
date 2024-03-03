//stack will call helper home page
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "..";
import Home from "../../screens/helper/Home";
const HelperHomeNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ROUTES.HELPER.HOME_NAVIGATION.HOME}
        component={Home}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default HelperHomeNavigation;

const styles = StyleSheet.create({});
