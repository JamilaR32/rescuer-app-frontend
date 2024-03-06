import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ROUTES from "..";
import HelperHistoryNavigation from "../helper/HelperHistoryNavigation";
import HelperHomeNavigation from "../helper/HelperHomeNavigation";
import HelperProfileNavigation from "../helper/HelperProfileNavigation";
import HelperRequestsNavigation from "../helper/HelperRequestsNavigation";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

const HelperMainNavigation = () => {
  return (
    <Tab.Navigator
      shifting={true}
      activeColor="black"
      activeIndicatorStyle={{ backgroundColor: "#8c7851" }}
      barStyle={{
        backgroundColor: "#f9f4ef",
        height: 85,
        borderTopColor: "#D3D3D3",
        borderTopWidth: 0.5,
      }}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name={ROUTES.HELPER.HOME_NAVIGATION.INDEX}
        component={HelperHomeNavigation}
        options={{
          tabBarShowLabel: false,
          title: "Home",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.HELPER.REQUESTS_NAVIGATION.INDEX}
        component={HelperRequestsNavigation}
        options={{
          tabBarShowLabel: false,
          title: "Requests",
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="message-alert-outline"
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tab.Screen
        name={ROUTES.HELPER.HISTORY_NAVIGATION.INDEX}
        component={HelperHistoryNavigation}
        options={{
          tabBarShowLabel: false,
          title: "History",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="history" size={24} color="black" />
          ),
        }}
      />

      <Tab.Screen
        name={ROUTES.HELPER.PROFILE_NAVIGATION.INDEX}
        component={HelperProfileNavigation}
        options={{
          tabBarShowLabel: false,
          title: "Profile",
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HelperMainNavigation;

const styles = StyleSheet.create({});
