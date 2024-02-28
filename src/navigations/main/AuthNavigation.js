import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "..";
import Login from "../../screens/auth/Login";
import Register from "../../screens/auth/Register";

const AuthNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={ROUTES.AUTH.AUTH_NAVIGATION.LOGIN}>
      <Stack.Screen
        name={ROUTES.AUTH.AUTH_NAVIGATION.LOGIN}
        component={Login}
      ></Stack.Screen>
      <Stack.Screen
        name={ROUTES.AUTH.AUTH_NAVIGATION.REGISTER}
        component={Register}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default AuthNavigation;
