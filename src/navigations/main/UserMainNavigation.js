import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ROUTES from "..";
import UserHistoryNavigation from "../user/UserHistoryNavigation";
import UserProfileNavigation from "../user/UserProfileNavigation";
import UserHomeNavigation from "../user/UserHomeNavigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const UserMainNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={ROUTES.USER.HOME_NAVIGATION.INDEX}
        component={UserHomeNavigation}
        options={{
          title: "UserHome",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.USER.PROFILE_NAVIGATION.INDEX}
        component={UserProfileNavigation}
      />
      <Tab.Screen
        name={ROUTES.USER.HISTORY_NAVIGATION.INDEX}
        component={UserHistoryNavigation}
      />
    </Tab.Navigator>
  );
};

export default UserMainNavigation;
