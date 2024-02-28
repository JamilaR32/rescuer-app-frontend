//stack calling home page of user
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "..";
import UserHome from "../../screens/user/Home/UserHome";

const UserHomeNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.USER.HOME_NAVIGATION.HOME}
        component={UserHome}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default UserHomeNavigation;

const styles = StyleSheet.create({});
