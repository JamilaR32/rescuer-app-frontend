import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";

import { useMutation, useQuery } from "@tanstack/react-query";
import { acceptRequest, getAllRequests } from "../../../api/requests";

const Requests = () => {
  const [location, setLocation] = useState(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["requests"],
    queryFn: () => getAllRequests(),
  });
  // sldksl
  // const { mutate } = useMutation({
  //   mutationFn: (e) =>
  //     createRequest({
  //       location: { type: "Point", coordinates: [longitude, latitude] },
  //       case: e,
  //     }),
  //   mutationKey: [`createRequest`],
  //   onSuccess: () => {
  //     toggleMenu();
  //   },
  // });

  const { mutate } = useMutation({
    mutationKey: ["acceptRequest"],
    mutationFn: ({ e, latitude, longitude }) => {
      return acceptRequest(e, latitude, longitude);
    },
    onSuccess: () => {
      refetch();
    },
  });

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
  const handleAccept = (e) => {
    mutate({ e, latitude, longitude });
  };
  // console.log(latitude, longitude);

  return (
    <SafeAreaView>
      <ScrollView>
        {data?.map((request, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>Case: {request.case}</Text>
            <Text>Status: {request.status}</Text>
            <Text>Location: {request.location.coordinates.join(", ")}</Text>
            <Text>Helper: {request.helper}</Text>
            <Text>
              Created At: {new Date(request.createdAt).toLocaleString()}
            </Text>
            <TouchableOpacity
              onPress={() => {
                handleAccept(request._id);
              }}
              style={{
                width: 100,
                height: 25,
                paddingHorizontal: 12,
                backgroundColor: "#00000040",
                borderRadius: 6,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "auto",
              }}
            >
              <Text>Accept</Text>
            </TouchableOpacity>
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
});

export default Requests;
