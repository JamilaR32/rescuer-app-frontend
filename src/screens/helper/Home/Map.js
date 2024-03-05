import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useMutation, useQuery } from "@tanstack/react-query";
import { nearbyRequests, updateHelperLocation } from "../../../api/location";

const HelperMap = () => {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);
  const [lock, setLock] = useState(false);
  const [zoomInfo, setZoomInfo] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [isLive, setIsLive] = useState(false); // State to manage live status
  const animationHeight = useRef(new Animated.Value(0)).current;
  const [userInfo, setUserInfo] = useState({});

  //   const { data } = useQuery({
  //     queryKey: ["test222"],
  //     queryFn: nearbyRequests(),
  //   });
  //   //console.log("Test", data);

  const toggleMenu = () => {
    const itemHeight = 50; // Adjust based on your actual item height
    const totalHeight = 1 * itemHeight; // Update based on the actual number of menu items
    Animated.timing(animationHeight, {
      toValue: isVisible ? 0 : totalHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    let intervalId;

    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        // //console.log("Permission to access location was denied");
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    };

    fetchLocation(); // Fetch immediately on component mount

    intervalId = setInterval(() => {
      fetchLocation(); // Fetch every second
    }, 1000); // Updated to fetch every 1000ms or every second

    return () => {
      clearInterval(intervalId); // Clear interval on component unmount
    };
  }, []);
  const latitude = location?.coords?.latitude;
  const longitude = location?.coords?.longitude;
  //   //console.log(latitude, longitude);

  const { mutate } = useMutation({
    mutationFn: updateHelperLocation({
      coordinates: [longitude, latitude],
    }),
    mutationKey: [`updatelocation`],
  });

  useEffect(() => {
    if (latitude && longitude && lock) {
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: zoomInfo.latitudeDelta || 0.0922, // Provide default values
        longitudeDelta: zoomInfo.longitudeDelta || 0.0421,
      };
      mapRef.current.animateToRegion(newRegion, 0);
    }
  }, [location, lock]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        ref={mapRef}
        initialRegion={{
          latitude: latitude ?? 0,
          longitude: longitude ?? 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          onPress={() => setLock(!lock)}
          coordinate={{ latitude: latitude ?? 0, longitude: longitude ?? 0 }}
        />
        <Circle
          center={{ latitude: latitude ?? 0, longitude: longitude ?? 0 }}
          radius={200}
          strokeWidth={2}
          strokeColor="#3399ff"
          fillColor="#80bfff"
        />
      </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            setLock(!lock);
          }}
          style={[
            styles.lockButton,
            { backgroundColor: lock ? "#ff000090" : "#00ff0090" },
          ]}
        >
          <Text style={styles.buttonText}>
            {lock ? "Unlock Location" : "Lock Location"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setIsLive(!isLive)}
          style={[
            styles.liveButton,
            { backgroundColor: isLive ? "#00ff00" : "#ff0000" },
          ]}
        >
          <Text style={styles.buttonText}>
            {isLive ? "Go Offline" : "Go Live"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => mutate}
          style={[
            styles.liveButton,
            { backgroundColor: isLive ? "#00ff00" : "#ff0000" },
          ]}
        >
          <Text style={styles.buttonText}>Test</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HelperMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lockButton: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#ff000090",
    alignItems: "center",
  },
  liveButton: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#ff000090",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
  },
});
