import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ScrollView,
  Linking, // Import Linking to handle phone call redirection
  Image,
} from "react-native";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  checkRequest,
  createRequest,
  deleteRequest,
} from "../../../api/requests";
import { SvgUri } from "react-native-svg";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HelperMap = () => {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);
  const [lock, setLock] = useState(false);
  const [zoomInfo, setZoomInfo] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const animationHeight = useRef(new Animated.Value(0)).current; // Initial valu
  const [alreadyDone, setAlreadyDone] = useState(false);
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
        //console.log("Permission to access location was denied");
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    };

    fetchLocation(); // Fetch immediately on component mount

    intervalId = setInterval(() => {
      fetchLocation();
      refetch(); // Fetch every second
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
      refetch();
    },
  });
  const { mutate: deleteRequestZ } = useMutation({
    mutationFn: (id) => deleteRequest(id),

    mutationKey: [`DeleteRequest`],
    onSuccess: () => {
      refetch();
    },
  });
  const { data, refetch } = useQuery({
    queryKey: ["checkRequest"],
    queryFn: () => checkRequest(),
  });

  const handlePhoneCall = () => {
    // Redirect to the phone page
    Linking.openURL(`tel:+965${data?.helper?.user.phoneNumber}`); // Replace with the phone number you want to call
  };

  const menuItems = [
    { id: 1, title: "Flat Tire", svgUri: "car-tire-alert" },
    {
      id: 2,
      title: "Stuck in Sand",
      svgUri: "car-lifted-pickup",
    },
    {
      id: 3,
      title: "Empty Fuel Tank",
      svgUri: "fuel",
    },
    {
      id: 4,
      title: "Car Stopped Working",
      svgUri: "engine-off",
    },
  ];

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
    }
  }, [location, lock]);

  useEffect(() => {
    if (location && !alreadyDone) {
      goToThisLocation(latitude, longitude);
      setAlreadyDone(true);
    }
  }, [location]);

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
          >
            <Image
              source={require("../../../../assets/images/car.png")}
              style={{ width: 40, height: 40 }}
            />
          </Marker>
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
          <View style={{ flex: 75 }} pointerEvents="box-none">
            <View
              pointerEvents="box-none"
              style={{
                flex: 1,
                alignItems: "flex-end",
                paddingRight: 20,
              }}
            >
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
                        mutate(item.title);
                      }}
                    >
                      <View
                        style={[
                          styles.menuItem,
                          {
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            gap: 12,
                          },
                        ]}
                      >
                        <MaterialCommunityIcons
                          name={item.svgUri}
                          size={24}
                          color="black"
                        />

                        <Text style={styles.menuItemText}>{item.title}</Text>
                      </View>
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

      <View style={{ ...styles.phoneButtonContainer, flexDirection: "row" }}>
        {data?.status == "ongoing" && (
          <>
            <TouchableOpacity
              onPress={handlePhoneCall}
              style={styles.phoneButton}
            >
              <Text style={styles.phoneButtonText}>Call Assigned Helper</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteRequestZ(data?._id)}
              style={[
                styles.phoneButton,
                { backgroundColor: "red", paddingLeft: 20 },
              ]}
            >
              <Text style={styles.phoneButtonText}>Delete request</Text>
            </TouchableOpacity>
          </>
        )}
        {data?.status == "open" && (
          <>
            <TouchableOpacity
              onPress={() => deleteRequestZ(data?._id)}
              style={[
                styles.phoneButton,
                { backgroundColor: "red", paddingLeft: 20 },
              ]}
            >
              <Text style={styles.phoneButtonText}>Delete request</Text>
            </TouchableOpacity>
          </>
        )}
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
  menu: {
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
  phoneButtonContainer: {
    position: "absolute",
    bottom: 70,
    alignSelf: "flex-end",
    paddingRight: 40,
    width: "100vh",
    height: "100vh",
  },
  phoneButton: {
    backgroundColor: "#009688",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 15, // Add some space between buttons
  },
  phoneButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  lockButton: {
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#ff000090",
    alignItems: "center",
  },
});
