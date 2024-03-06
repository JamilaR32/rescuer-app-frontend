import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "..";
import HelperHistory from "../../screens/helper/History/History";
const Stack = createStackNavigator();
const HelperHistoryNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ROUTES.HELPER.HISTORY_NAVIGATION.HISTORY}
        component={HelperHistory}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default HelperHistoryNavigation;
