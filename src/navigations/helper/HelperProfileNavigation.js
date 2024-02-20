//stack will call helper profile

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "..";
import HelperProfile from "../../screens/helper/HelperProfile";
const HelperProfileNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.HELPER.PROFILE_NAVIGATION.PROFILE}
        component={HelperProfile}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default HelperProfileNavigation;

const styles = StyleSheet.create({});
