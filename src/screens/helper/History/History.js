import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { pastRequests } from "../../../api/requests";

const History = () => {
  const { data } = useQuery({
    queryKey: ["history"],
    queryFn: () => pastRequests(),
  });

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        key={(item) => item._id}
      />
      <Text>History</Text>
    </View>
  );
};

export default History;
