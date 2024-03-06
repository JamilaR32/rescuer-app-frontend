import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editUserProfile, getAllUsers, me } from "../../../api/auth";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS } from "../../../constants/Theme";
import UserContext from "../../../context/UserContext";
import { deleteToken } from "../../../api/storage";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
    onSuccess: () => setEdit(false),
  });

  const handleLogout = () => {
    deleteToken();
    setUser(null);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          // width: 100,
          // height: 100,
          // backgroundColor: "red",
          alignItems: "flex-end",
          marginTop: 30,
          marginBottom: 30,
        }}
      >
        <TouchableOpacity
          style={{ justifyContent: "flex-start" }}
          onPress={() => {
            handleLogout();
          }}
        >
          <Octicons name="sign-out" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text style={styles.title}>Edit Profile</Text>
      </View>

      <View
        style={{
          borderRadius: 10,
          height: "80%",
          padding: 6,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {edit ? (
          <>
            <View />
            <View>
              <View
                style={{
                  flexDirection: "column",
                  marginBottom: 6,
                }}
              >
                <Text style={{ ...FONTS.h4 }}>Full Name</Text>
                <View style={styles.input}>
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
                <Text style={{ ...FONTS.h4 }}>Civil ID </Text>
                <View
                  style={styles.input}
                  // style={{
                  //   height: 44,
                  //   width: "100%",
                  //   borderColor: COLORS.secondaryGray,
                  //   borderWidth: 1,
                  //   borderRadius: 4,
                  //   marginVertical: 6,
                  //   justifyContent: "center",
                  //   paddingLeft: 8,
                  // }}
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
                <Text style={{ ...FONTS.h4 }}>Phone Number</Text>
                <View style={styles.input}>
                  <TextInput
                    value={phoneNumber}
                    onChangeText={(value) => setPhoneNumber(value)}
                    editable={edit}
                  />
                </View>
              </View>
            </View>
          </>
        ) : (
          <>
            <View />
            <View>
              <View
                style={{
                  flexDirection: "column",
                  marginBottom: 6,
                }}
              >
                <Text style={{ ...FONTS.h4, fontWeight: "bold" }}>
                  Full Name
                </Text>
                <View
                  style={[styles.label, { marginTop: 15, marginLeft: "3%" }]}
                >
                  <Text
                    style={{
                      marginVertical: 10,
                      fontWeight: "bold",
                      fontStyle: "italic",
                    }}
                  >
                    {name}
                  </Text>
                </View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#D3D3D3",
                    marginVertical: 10,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "column",
                  marginBottom: 6,
                }}
              >
                <Text style={{ ...FONTS.h4, fontWeight: "bold" }}>
                  Civil ID
                </Text>
                <View
                  style={[styles.label, { marginTop: 15, marginLeft: "3%" }]}
                >
                  <Text
                    style={{
                      marginVertical: 10,
                      fontWeight: "bold",
                      fontStyle: "italic",
                    }}
                  >
                    {civilId}
                  </Text>
                </View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#D3D3D3",
                    marginVertical: 10,
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: "column",
                  marginBottom: 6,
                }}
              >
                <Text style={{ ...FONTS.h4, fontWeight: "bold" }}>
                  Phone Number
                </Text>
                <View
                  style={[styles.label, { marginTop: 15, marginLeft: "3%" }]}
                >
                  <Text
                    style={{
                      marginVertical: 10,
                      fontWeight: "bold",
                      fontStyle: "italic",
                    }}
                  >
                    {phoneNumber}
                  </Text>
                </View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#D3D3D3",
                    marginVertical: 10,
                  }}
                />
              </View>
            </View>
          </>
        )}

        <View style={styles.buttonContainer}>
          {edit ? (
            <View style={{ gap: 20 }}>
              <TouchableOpacity
                style={styles.edutButton}
                onPress={() => {
                  mutate();
                }}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.edutButton}
                onPress={() => {
                  setEdit(false);
                }}
              >
                <Text style={styles.saveButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              id="editBtn"
              style={styles.edutButton}
              onPress={() => {
                setEdit(!edit);
              }}
            >
              <MaterialCommunityIcons
                name="lead-pencil"
                size={19}
                color="white"
              />
              <Text style={styles.saveButtonText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>
        <View />
      </View>
    </View>
  );
};

export default UserProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f4ef",
    flexDirection: "column",
  },
  input: {
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 10,
    width: "100%",
    padding: 10,
    marginVertical: 10, // Adds space above and below the input
    backgroundColor: "#eaddcf",
    height: 44,
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 20,
    width: "100%",
    borderRadius: 20,
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: "12%", // Adjust based on your layout preference
    fontWeight: "bold",
    marginBottom: -5,
    fontSize: 16,
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
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
    marginHorizontal: 12,
    marginBottom: 10,
    top: 10,
  },
  edutButton: {
    backgroundColor: "#8c7851",
    padding: 14,
    borderRadius: 20,
    width: "98%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
    gap: 10,
    flexDirection: "row",
  },
  saveButtonText: {
    color: "#fffffe",
    fontSize: 18,
  },
  title: {
    color: "#8c7851",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
