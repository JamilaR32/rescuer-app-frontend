import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ROUTES from "..";
import UserHistoryNavigation from "../user/UserHistoryNavigation";
import UserProfileNavigation from "../user/UserProfileNavigation";
import UserHomeNavigation from "../user/UserHomeNavigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
const UserMainNavigation = () => {
  // const Tab = createBottomTabNavigator();
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      shifting={true}
      activeColor="#f9f4ef"
      inactiveColor="#8c7851"
      barStyle={{ backgroundColor: "#8c7851", height: 90 }}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name={ROUTES.USER.HOME_NAVIGATION.INDEX}
        component={UserHomeNavigation}
        options={{
          tabBarShowLabel: false,
          title: "Home",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.USER.HISTORY_NAVIGATION.INDEX}
        component={UserHistoryNavigation}
        options={{
          tabBarShowLabel: false,
          title: "History",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="history" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.USER.PROFILE_NAVIGATION.INDEX}
        component={UserProfileNavigation}
        options={{
          tabBarShowLabel: false,
          title: "Profile",
          tabBarIcon: () => <Octicons name="person" size={24} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default UserMainNavigation;
