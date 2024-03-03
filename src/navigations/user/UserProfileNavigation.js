//stack calling user profile page

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "..";
import UserProfile from "../../screens/user/Profile/UserProfile";

const UserProfileNavigation = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={ROUTES.USER.PROFILE_NAVIGATION.PROFILE}
        component={UserProfile}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default UserProfileNavigation;
