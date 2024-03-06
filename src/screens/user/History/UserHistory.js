import React from "react";
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { pastRequests } from "../../../api/requests";
import { getUserByHelperId } from "../../../api/auth";

const UserHistory = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["requests"],
    queryFn: () => pastRequests(),
  });

  const filteredRequests = data?.filter(
    (request) => request.status === "close"
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {filteredRequests?.map((request, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>Case: {request.case}</Text>
            <Text>Status: {request.status}</Text>
            <Text>Location: {request.location.coordinates.join(", ")}</Text>
            <Text>Helper: {request.helper?.user?.fullName}</Text>
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

export default UserHistory;
