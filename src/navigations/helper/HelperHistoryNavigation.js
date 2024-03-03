import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "..";
import History from "../../screens/helper/History";
const HelperHistoryNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ROUTES.HELPER.HISTORY_NAVIGATION.HISTORY}
        component={History}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default HelperHistoryNavigation;

const styles = StyleSheet.create({});
