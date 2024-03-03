//stack will call helper home page
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "..";

import Mapz from "../../screens/helper/Home/Map";
const Stack = createStackNavigator();
const HelperHomeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ROUTES.HELPER.LOCATION_NAVIGATION.MAP}
        component={Mapz}
      />
    </Stack.Navigator>
  );
};

export default HelperHomeNavigation;

const styles = StyleSheet.create({});
