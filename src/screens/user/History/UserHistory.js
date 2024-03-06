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
      <ScrollView style={{ padding: 14, backgroundColor: "#f9f4ef" }}>
        {filteredRequests?.map((request, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.title}>Case: {request.case}</Text>
            <Text style={styles.subtitle}>
              Status:
              <Text style={{ fontWeight: "normal" }}> {request.status} </Text>
            </Text>
            <Text style={styles.subtitle}>
              Location:{" "}
              <Text style={{ fontWeight: "normal" }}>
                {request.location.coordinates.join(", ")}
              </Text>
            </Text>
            <Text style={styles.subtitle}>
              Helper:{" "}
              <Text style={{ fontWeight: "normal" }}>
                {request.helper?.user?.fullName}
              </Text>
            </Text>
            <Text style={styles.subtitle}>
              Created At:{" "}
              <Text style={{ fontWeight: "normal" }}>
                {new Date(request.createdAt).toLocaleString()}
              </Text>
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  subtitle: {
    fontWeight: "bold",
  },
});

export default UserHistory;
