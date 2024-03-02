import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ROUTES from "..";
import Login from "../../screens/auth/Login";
import Register from "../../screens/auth/Register";
import HelperRegister from "../../screens/auth/HelperRegister";

const Stack = createStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={ROUTES.AUTH.AUTH_NAVIGATION.LOGIN}>
      <Stack.Screen
        name={ROUTES.AUTH.AUTH_NAVIGATION.LOGIN}
        component={Login}
      />
      <Stack.Screen
        name={ROUTES.AUTH.AUTH_NAVIGATION.REGISTER}
        component={Register}
      />
      {/* <Stack.Screen
        name={ROUTES.AUTH.AUTH_NAVIGATION.REGISTER_HELPER}
        component={HelperRegister}
      /> */}
    </Stack.Navigator>
  );
};

export default AuthNavigation;
