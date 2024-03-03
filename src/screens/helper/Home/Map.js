import React, { useEffect, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

const Mapz = () => {
  const [location, setLocation] = useState(null);
  const mapRef = useRef(null);
  const [lock, setLock] = useState(false);
  const [zoomInfo, setZoomInfo] = useState({});

  useEffect(() => {
    let intervalId;

    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
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

  //   <Button
  //   title={lock ? "Unlock Location" : "Lock Location"}
  //   onPress={() => setLock(!lock)}
  //   style={styles.button}
  // />
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
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

      <View style={{ flex: 1 }}>
        <View style={{ flex: 2 }}>
          <View style={{ flex: 1 }}></View>
          <View
            style={{
              flex: 0.6,
              //   backgroundColor: "green",
              //height: "100px",
              width: "100%",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                flex: 3,
                //height: "100px",
                width: "50px",
                // backgroundColor: "yellow",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                borderRadius: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => setLock(!lock)}
                style={{
                  flex: 1,
                  borderRadius: 12,
                  backgroundColor: "#ff000090",
                }}
              >
                <Text>{lock ? "Unlock Location" : "Lock Location"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flex: 9 }}></View>
        <View style={{ flex: 1, padding: 16 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              borderRadius: 12,
              backgroundColor: "#ff000090",
            }}
          ></TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
    </View>
  );
};

export default Mapz;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Use flex to take the full screen
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Make the map fill the entire screen
  },
  button: {
    position: "absolute", // Or use Flexbox properties
    top: 20, // Adjust as needed
    alignSelf: "center", // Centers the button container horizontally
    paddingHorizontal: 20,
  },
});
