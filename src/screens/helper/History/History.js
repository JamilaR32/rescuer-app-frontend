import React from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { getAllRequests, pastRequests } from "../../../api/requests";

const History = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["requestzzz"],
    queryFn: () => pastRequests(),
  });

  console.log("updateeee", data);

  // if (isLoading) {
  //   return <Text>Loading...</Text>;
  // }

  // if (error) {
  //   return <Text>Error: {error.message}</Text>;
  // }

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

export default History;
