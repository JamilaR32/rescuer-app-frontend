import { View } from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { me } from "../../../api/auth";

const UserProfile = () => {
  const { data } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => me(),
  });
  console.log(data);
  return <View style={{ flex: 1, backgroundColor: "red" }}></View>;
};

export default UserProfile;
