import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { deleteToken } from "../../../api/storage";
import UserContext from "../../../context/UserContext";

const HelperProfile = () => {
  const [user, setUser] = useContext(UserContext);
  const handleLogout = () => {
    deleteToken();
    setUser(null);
  };
  return (
    <View>
      <Text>HelperProfile</Text>
      <View
        style={{
          width: 100,
          height: 100,
          backgroundColor: "red",
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            handleLogout();
          }}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HelperProfile;

const styles = StyleSheet.create({});
