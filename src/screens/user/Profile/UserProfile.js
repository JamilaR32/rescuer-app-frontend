import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editUserProfile, getAllUsers, me } from "../../../api/auth";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../../navigations";
import { COLORS, FONTS } from "../../../constants/Theme";
import UserContext from "../../../context/UserContext";
const UserProfile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [civilId, setCivilId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { data } = useQuery({
    queryKey: ["myInfo"],
    queryFn: () => me(),
  });

  useEffect(() => {
    if (data) {
      setCivilId(data?.civilId);
      setName(data?.fullName);
      setPhoneNumber(data?.phoneNumber);
      setPassword(data?.password);
    }
  }, [data]);

  const { mutate } = useMutation({
    mutationKey: ["edit"],
    mutationFn: () => {
      return editUserProfile({
        fullName: name,
        civilId: civilId,
        phoneNumber: phoneNumber,
        password: password,
      });
    },
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
          top: 40,
        }}
      >
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            setEdit(!edit);
          }}
        >
          <Text>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.USER.HOME_NAVIGATION.INDEX)}
          style={{
            position: "absolute",
            left: 10,
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>

        <Text style={{ ...FONTS.h3 }}></Text>
        <View></View>
      </View>
      <View>
        <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Text style={{ ...FONTS.h4 }}>Full Name</Text>
          <View
            style={{
              height: 44,
              width: "100%",
              borderColor: COLORS.secondaryGray,
              borderWidth: 1,
              borderRadius: 4,
              marginVertical: 6,
              justifyContent: "center",
              paddingLeft: 8,
            }}
          >
            <TextInput
              value={name}
              onChangeText={(value) => setName(value)}
              editable={edit}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Text style={{ ...FONTS.h4 }}>Civil ID</Text>
          <View
            style={{
              height: 44,
              width: "100%",
              borderColor: COLORS.secondaryGray,
              borderWidth: 1,
              borderRadius: 4,
              marginVertical: 6,
              justifyContent: "center",
              paddingLeft: 8,
            }}
          >
            <TextInput
              value={civilId}
              onChangeText={(value) => setCivilId(value)}
              editable={edit}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Text style={{ ...FONTS.h4 }}>Password</Text>
          <View
            style={{
              height: 44,
              width: "100%",
              borderColor: COLORS.secondaryGray,
              borderWidth: 1,
              borderRadius: 4,
              marginVertical: 6,
              justifyContent: "center",
              paddingLeft: 8,
            }}
          >
            <TextInput
              value={password}
              onChangeText={(value) => setPassword(value)}
              editable={edit}
              secureTextEntry
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: "column",
            marginBottom: 6,
          }}
        >
          <Text style={{ ...FONTS.h4 }}>Phone Number</Text>
          <View
            style={{
              height: 44,
              width: "100%",
              borderColor: COLORS.secondaryGray,
              borderWidth: 1,
              borderRadius: 4,
              marginVertical: 6,
              justifyContent: "center",
              paddingLeft: 8,
            }}
          >
            <TextInput
              value={phoneNumber}
              onChangeText={(value) => setPhoneNumber(value)}
              editable={edit}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {edit && (
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => {
                mutate;
              }}
            >
              <Text style={styles.saveButtonText}>SAVE</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default UserProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f4ef",
  },
  input: {
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 20,
    width: "80%",
    padding: 10,
    marginVertical: 10, // Adds space above and below the input
    backgroundColor: "#eaddcf",
  },
  buttonContainer: {
    marginTop: 20,
    width: "80%",
    borderRadius: 20,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: "12%", // Adjust based on your layout preference
    fontWeight: "bold",
    marginBottom: -5,
  },
  footer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
  },
  link: {
    color: "#f25042",
    marginLeft: 5,
  },
  helperLink: {
    color: "#f25042",
    marginLeft: 5,
  },
  saveButton: {
    backgroundColor: "#8c7851",
    padding: 10,
    borderRadius: 20,
    width: "98%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
  },
  saveButtonText: {
    color: "#fffffe",
    fontSize: 16,
  },
});
