import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ROUTES from "..";
import HelperHistoryNavigation from "../helper/HelperHistoryNavigation";
import HelperHomeNavigation from "../helper/HelperHomeNavigation";
import HelperProfileNavigation from "../helper/HelperProfileNavigation";
import HelperRequestsNavigation from "../helper/HelperRequestsNavigation";

const HelperMainNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={ROUTES.HELPER.HISTORY_NAVIGATION.INDEX}
        component={HelperHistoryNavigation}
      />
      <Tab.Screen
        name={ROUTES.HELPER.HOME_NAVIGATION.INDEX}
        component={HelperHomeNavigation}
      />
      <Tab.Screen
        name={ROUTES.HELPER.PROFILE_NAVIGATION.INDEX}
        component={HelperProfileNavigation}
      />
      <Tab.Screen
        name={ROUTES.HELPER.REQUESTS_NAVIGATION.INDEX}
        component={HelperRequestsNavigation}
      />
    </Tab.Navigator>
  );
};

export default HelperMainNavigation;

const styles = StyleSheet.create({});
