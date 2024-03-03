//stack calling history of user
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "..";
import UserHistory from "../../screens/user/History/UserHistory";

const UserHistoryNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ROUTES.USER.HISTORY_NAVIGATION.HISTORY}
        component={UserHistory}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default UserHistoryNavigation;

const styles = StyleSheet.create({});
