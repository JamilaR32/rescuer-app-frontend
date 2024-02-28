import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../navigations";
import { TextInput } from "react-native-gesture-handler";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../api/auth";
import UserContext from "../../context/UserContext";

const Register = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({});
  const [user, setUser] = useContext(UserContext);
  const { mutate } = useMutation({
    mutationFn: () => register(userInfo),
    onSuccess: () => {
      setUser(true);
    },
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        backgroundColor: "#F5EEF8",
      }}
    >
      <Text>Civil ID</Text>
      <TextInput
        placeholder="Enter your Civil ID"
        onChangeText={(text) => {
          setUserInfo({ ...userInfo, civilId: text });
        }}
        style={{
          borderColor: "black",
          borderCurve: "circular",
          borderWidth: 0.5,
          borderRadius: 20,
          width: "60%",
          backgroundColor: "#D7BDE2",
        }}
      />
      <Text>Full Name</Text>
      <TextInput
        placeholder="Enter your Full Name"
        onChangeText={(text) => {
          setUserInfo({ ...userInfo, fullName: text });
        }}
        style={{
          borderColor: "black",
          borderCurve: "circular",
          borderWidth: 0.5,
          borderRadius: 20,
          width: "60%",
          backgroundColor: "#D7BDE2",
        }}
      />
      <Text>Phone Number</Text>
      <TextInput
        placeholder="Enter your Phone number"
        onChangeText={(text) => {
          setUserInfo({ ...userInfo, phoneNumber: text });
        }}
      />
      <Text>Password</Text>
      <TextInput
        placeholder="Enter your password"
        onChangeText={(text) => {
          setUserInfo({ ...userInfo, password: text });
        }}
      />

      <Button color="#6C3483" title="Register" onPress={mutate} />

      <View>
        <Pressable
          style={{
            borderColor: "black",
            borderCurve: "circular",
            borderWidth: 0.5,
            borderRadius: 20,
            width: "60%",
            backgroundColor: "#D7BDE2",
          }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 5,
        }}
      >
        <Text>Already a user?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.AUTH_NAVIGATION.LOGIN)}
        >
          <Text
            style={{
              color: "#FF33CE",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Register;
