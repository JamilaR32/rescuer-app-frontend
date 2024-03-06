import React, { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  RefreshControl,
} from "react-native";
import * as Location from "expo-location";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  acceptRequest,
  cancelRequest,
  closeRequest,
  getAllRequests,
} from "../../../api/requests";

const Requests = () => {
  const [location, setLocation] = useState(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: () => getAllRequests(),
  });

  const { mutate: acceptMutate, isLoading: isMutateLoading } = useMutation({
    mutationKey: ["acceptRequest"],
    mutationFn: ({ requestId, latitude, longitude }) =>
      acceptRequest(requestId, latitude, longitude),
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: cancelRequestMutate } = useMutation({
    mutationKey: ["cancelRequest"],
    mutationFn: (requestId) => cancelRequest(requestId),
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: closeRequestMutate } = useMutation({
    mutationKey: ["closeRequest"],
    mutationFn: (requestId) => closeRequest(requestId),
    onSuccess: () => {
      refetch();
    },
  });

  useEffect(() => {
    const fetchLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    };

    fetchLocation();
    const intervalId = setInterval(fetchLocation, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleAccept = (requestId) => {
    if (!location) return alert("you dont have location too accept request!");
    const { latitude, longitude } = location.coords;
    acceptMutate({ requestId, latitude, longitude });
  };

  const handleCancel = (requestId) => {
    Alert.alert(
      "Cancel Request",
      "Are you sure you want to cancel this request?",
      [
        {
          text: "No",
          style: "cancel",
        },
        { text: "Yes", onPress: () => cancelRequestMutate(requestId) },
      ],
      { cancelable: false }
    );
  };

  const openGoogleMaps = () => {
    const latitude = location?.coords?.latitude;
    const longitude = location?.coords?.longitude;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          //console.log("Don't know how to open this URL: " + url);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        {data
          ?.filter((request) => request.status !== "close")
          .map((request) => (
            <View key={request._id} style={styles.card}>
              <Text style={styles.title}>Case: {request.case}</Text>
              <Text>Status: {request.status}</Text>
              <Text>Location: {request.location.coordinates.join(", ")}</Text>
              <Text>Helper: {request.user.fullName}</Text>
              <Text>
                Created At: {new Date(request.createdAt).toLocaleString()}
              </Text>
              {request.status === "open" &&
                (location ? (
                  <TouchableOpacity
                    onPress={() => handleAccept(request._id)}
                    style={[styles.button, { backgroundColor: "#00550050" }]}
                    disabled={isMutateLoading}
                  >
                    <Text>Accept</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.button} disabled={true}>
                    <Text>Loading...</Text>
                  </TouchableOpacity>
                ))}
              {request.status === "ongoing" && (
                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      { backgroundColor: "#55000050", width: 100 },
                    ]}
                    onPress={() => handleCancel(request._id)}
                    disabled={isMutateLoading}
                  >
                    <Text>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      { backgroundColor: "#00550055", width: 100 },
                    ]}
                    onPress={openGoogleMaps}
                  >
                    <Text>Location</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      { backgroundColor: "#55550055", width: 100 },
                    ]}
                    onPress={() => closeRequestMutate(request._id)}
                    disabled={isMutateLoading}
                  >
                    <Text>Close</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#00000040",
    padding: 10,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});

export default Requests;
