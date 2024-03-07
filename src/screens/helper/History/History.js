import React from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAllRequests, pastRequests } from "../../../api/requests";

const HelperHistory = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["requests"],
    queryFn: () => pastRequests(),
  });

  //console.log("updateeee", data);

  // if (isLoading) {
  //   return <Text>Loading...</Text>;
  // }

  // if (error) {
  //   return <Text>Error: {error.message}</Text>;
  // }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f9f4ef" }}>
      <Text
        style={{
          fontSize: 29,
          paddingLeft: 20,
          paddingTop: 20,
          fontWeight: "600",
        }}
      >
        History
      </Text>
      <ScrollView style={{ padding: 14, backgroundColor: "#f9f4ef" }}>
        {data?.map((request, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>Case: {request.case}</Text>
            <Text>Status: {request.status}</Text>
            <Text>Location: {request.location.coordinates.join(", ")}</Text>
            <Text>Helper: {request.user.fullName}</Text>
            <Text>
              Created At: {new Date(request.createdAt).toLocaleString()}
            </Text>
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
    backgroundColor: "#eaddcf",
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

export default HelperHistory;
