import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ScrollView,
  Button,
} from "react-native";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useMutation, useQuery } from "@tanstack/react-query";
import { checkRequest, createRequest } from "../../../api/requests";

const HelperMap = () => {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);
  const [lock, setLock] = useState(false);
  const [zoomInfo, setZoomInfo] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const animationHeight = useRef(new Animated.Value(0)).current; // Initial valu

  const toggleMenu = () => {
    const itemHeight = 50; // Adjust based on your actual item height
    const totalHeight = menuItems.length * itemHeight;
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

  const { mutate } = useMutation({
    mutationFn: (e) =>
      createRequest({
        location: { type: "Point", coordinates: [longitude, latitude] },
        case: e,
      }),
    mutationKey: [`createRequest`],
    onSuccess: () => {
      toggleMenu();
    },
  });

  const { data, refetch } = useQuery({
    queryKey: ["checkRequest"],
    queryFn: () => checkRequest(),
  });
  // //console.log(data);
  const menuItems = [
    { id: 1, title: "Item 1" },
    { id: 2, title: "Item 2" },
    { id: 3, title: "Item 3" },
    { id: 4, title: "Item 4" },
    { id: 5, title: "Item 5" },
    { id: 6, title: "Item 6" },

    // Add more items as needed
  ];
  // const { mutate } = useMutation({
  //   mutationFn: updateHelperLocation({
  //     coordinates: [longitude, latitude],
  //   }),
  //   mutationKey: [`updatelocation`],
  // });

  // Inside your component
  useEffect(() => {
    // Set up the interval
    if (data?.helper.location) {
      const fetchEverySecond = setInterval(() => {
        refetch();
      }, 2000);

      // Cleanup function to clear the interval
      return () => {
        clearInterval(fetchEverySecond);
      };
    }
  }, [data?.helper]);

  const goToThisLocation = (latitude, longitude) => {
    const newRegion = {
      latitude,
      longitude,
      latitudeDelta: zoomInfo.latitudeDelta || 0.0922, // Provide default values
      longitudeDelta: zoomInfo.longitudeDelta || 0.0421,
    };
    mapRef.current.animateToRegion(newRegion, 0);
  };

  useEffect(() => {
    if (latitude && longitude && lock) {
      goToThisLocation(latitude, longitude);
      // const newRegion = {
      //   latitude,
      //   longitude,
      //   latitudeDelta: zoomInfo.latitudeDelta || 0.0922, // Provide default values
      //   longitudeDelta: zoomInfo.longitudeDelta || 0.0421,
      // };
      // mapRef.current.animateToRegion(newRegion, 0);
    }
  }, [location, lock]);

  //   <Button
  //   title={lock ? "Unlock Location" : "Lock Location"}
  //   onPress={() => setLock(!lock)}
  //   style={styles.button}
  // />

  const handleRequest = (e) => {
    mutate(e);
  };

  return (
    <View style={[styles.container, { position: "relative" }]}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={[styles.map, { zIndex: 0 }]}
        ref={mapRef}
        onRegionChange={(r) => {
          setZoomInfo({
            latitudeDelta: r.latitudeDelta,
            longitudeDelta: r.longitudeDelta,
          });
        }}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {data?.helper && (
          <Marker
            coordinate={{
              latitude: data?.helper.location?.coordinates[1] || 0,
              longitude: data?.helper.location?.coordinates[0] || 0,
            }}
          />
        )}
        <Marker
          onPress={() => {
            setLock(!lock);
          }}
          coordinate={{ latitude: latitude, longitude: longitude }}
        />
        <Circle
          center={{ latitude: latitude, longitude: longitude }}
          radius={200}
          strokeWidth={2}
          strokeColor="#3399ff"
          fillColor="#80bfff"
        />
      </MapView>

      <View style={{ flex: 1, zIndex: 0 }} pointerEvents="box-none">
        <View style={{ flex: 1 }} pointerEvents="box-none">
          <View style={{ flex: 10 }} pointerEvents="box-none"></View>
          <View style={{ flex: 80 }} pointerEvents="box-none">
            <View
              pointerEvents="box-none"
              style={{
                flex: 1,
                alignItems: "flex-end",
              }}
            >
              <TouchableOpacity
                onPress={() => setLock(!lock)}
                style={{
                  borderRadius: 12,
                  backgroundColor: "#ff000090",
                  width: 120,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>{lock ? "Unlock Location" : "Lock Location"}</Text>
              </TouchableOpacity>
            </View>
            <View
              pointerEvents="box-none"
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Animated.View
                style={[
                  styles.menu,
                  {
                    width: "90%",
                    height: animationHeight,
                    backgroundColor: "white",
                    paddingHorizontal: 20,
                  },
                ]}
              >
                <ScrollView showsVerticalScrollIndicator={false}>
                  {menuItems.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.button}
                      onPress={() => {
                        handleRequest(item.title);
                      }}
                    >
                      <Text>{item.title}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </Animated.View>
            </View>
          </View>
          <View style={{ flex: 8 }} pointerEvents="box-none">
            {!data?._id ? (
              <TouchableOpacity
                onPress={toggleMenu}
                style={styles.dropUpButton}
              >
                <Text style={styles.dropUpButtonText}>
                  {isVisible ? "Close" : "Open Menu"}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.dropUpButton, { backgroundColor: "#00aa0080" }]}
                onPress={() => {
                  refetch();
                  if (data.status == "ongoing") {
                    goToThisLocation(
                      data.helper?.location?.coordinates[1],
                      data.helper?.location?.coordinates[0]
                    );
                  }
                }}
              >
                <Text style={styles.dropUpButtonText}>
                  Request processing: {data?.status}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default HelperMap;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Use flex to take the full screen
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Make the map fill the entire screen
  },
  //   button: {
  //     position: "absolute", // Or use Flexbox properties
  //     top: 20, // Adjust as needed
  //     alignSelf: "center", // Centers the button container horizontally
  //     paddingHorizontal: 20,
  //   },
  menu: {
    // position: "absolute",
    // bottom: 65,
    left: 0,
    right: 0,
    // backgroundColor: "#ff000090",
    borderRadius: 12,
    overflow: "hidden",
  },
  button: {
    padding: 16,
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd", // Add a subtle separator
    borderRadius: 20,
    padding: 20,
  },
  dropUpButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#ff000090",
    alignItems: "center",
  },
  dropUpButtonText: {
    color: "#fff",
  },
});
