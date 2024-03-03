import { Text, View } from "react-native";
import React, { PureComponent } from "react";
import * as Location from "expo-location";

const FetchLocation = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    console.log("Permission to access location was denied");
    return;
  }
  const loc = await Location.getCurrentPositionAsync({});
  return loc;
};

export default FetchLocation;
