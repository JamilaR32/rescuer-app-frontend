import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ROUTES from "..";
import UserHistoryNavigation from "../user/UserHistoryNavigation";
import UserProfileNavigation from "../user/UserProfileNavigation";
import UserHomeNavigation from "../user/UserHomeNavigation";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { SimpleLineIcons } from "@expo/vector-icons";
const UserMainNavigation = () => {
  // const Tab = createBottomTabNavigator();
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      shifting={true}
      activeColor="black"
      activeIndicatorStyle={{ backgroundColor: "#8c7851" }}
      // activeTintColor="red"
      // inactiveColor="#8c7851"
      barStyle={{
        backgroundColor: "#f9f4ef",
        height: 85,
        borderTopColor: "#D3D3D3",
        borderTopWidth: 0.5,
      }}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name={ROUTES.USER.HOME_NAVIGATION.INDEX}
        component={UserHomeNavigation}
        options={{
          tabBarShowLabel: false,
          title: "HELP",

          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="sos"
              size={24}
              color={focused ? "white" : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.USER.HISTORY_NAVIGATION.INDEX}
        component={UserHistoryNavigation}
        options={{
          tabBarShowLabel: false,
          title: "History",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="history"
              size={24}
              color={focused ? "white" : "black"}
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.USER.PROFILE_NAVIGATION.INDEX}
        component={UserProfileNavigation}
        options={{
          tabBarShowLabel: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="account"
              size={24}
              color={focused ? "white" : "black"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default UserMainNavigation;
