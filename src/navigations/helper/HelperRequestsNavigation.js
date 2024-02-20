import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "..";
import Requests from "../../screens/helper/Requests";
const HelperRequestsNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.HELPER.REQUESTS_NAVIGATION.REQUESTS}
        component={Requests}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default HelperRequestsNavigation;

const styles = StyleSheet.create({});
