import React, { useEffect, useRef, useState } from "react";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Button, StyleSheet } from "react-native";
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
    }, 10000);

    return () => {
      clearInterval(intervalId); // Clear interval on component unmount
    };
  }, []);

  // Ensure latitude and longitude are not undefined before rendering the map
  const latitude = location?.coords?.latitude;
  const longitude = location?.coords?.longitude;

  useEffect(() => {
    const newRegion = {
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: zoomInfo.latitudeDelta,
      longitudeDelta: zoomInfo.longitudeDelta,
    };
    if (mapRef) {
      if (lock) mapRef.current.animateToRegion(newRegion, 0);
    }
  }, [location]);

  return latitude && longitude ? (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      ref={mapRef}
      onRegionChange={(r) => {
        setZoomInfo({
          ...zoomInfo,
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
      {/* <Button></Button> */}
    </MapView>
  ) : null;
};

export default Mapz;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
