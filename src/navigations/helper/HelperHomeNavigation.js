//stack will call helper home page
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "..";
import Home from "../../screens/helper/Home";
import Mapz from "../../screens/helper/Home/Map";
const HelperHomeNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.HELPER.HOME_NAVIGATION.HOME}
        component={Home}
      ></Stack.Screen>
      <Stack.Screen
        name={ROUTES.HELPER.LOCATION_NAVIGATION.MAP}
        component={Mapz}
      />
    </Stack.Navigator>
  );
};

export default HelperHomeNavigation;

const styles = StyleSheet.create({});
