import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "..";
import Requests from "../../screens/helper/Requests/Requests";
const Stack = createStackNavigator();
const HelperRequestsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ROUTES.HELPER.REQUESTS_NAVIGATION.REQUESTS}
        component={Requests}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default HelperRequestsNavigation;

const styles = StyleSheet.create({});
