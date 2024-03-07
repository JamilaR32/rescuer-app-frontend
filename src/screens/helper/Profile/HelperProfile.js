import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editUserProfile, me } from "../../../api/auth";
import UserContext from "../../../context/UserContext";
import { deleteToken } from "../../../api/storage";
import {
  Octicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { COLORS, FONTS } from "../../../constants/Theme";
import * as ImagePicker from "expo-image-picker";
import { BASE_URL2 } from "../../../api";

const HelperProfile = () => {
  const [user, setUser] = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [civilId, setCivilId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState("");

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
      setImage(data?.helper.image);
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
        image: image,
      });
    },
    onSuccess: () => setEdit(false),
  });

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleLogout = () => {
    deleteToken();
    setUser(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          handleLogout();
        }}
      >
        <Octicons name="sign-out" size={24} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Edit Profile</Text>

      <ScrollView>
        <TouchableOpacity onPress={selectImage} style={styles.imageContainer}>
          {image && (
            <Image
              source={{
                uri: image.includes("file") ? image : `${BASE_URL2}/${image}`,
              }}
              style={styles.image}
            />
          )}
          <View style={styles.cameraIcon}>
            <MaterialIcons name="photo-camera" size={33} color="black" />
          </View>
        </TouchableOpacity>

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
      </ScrollView>
    </View>
  );
};

export default HelperProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f4ef",
  },
  logoutButton: {
    alignSelf: "flex-end",
    marginTop: 30,
    marginBottom: -10,
  },
  title: {
    ...FONTS.h2,
    color: "#8c7851",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 22,
  },
  image: {
    height: 170,
    width: 170,
    borderRadius: 85,
    borderWidth: 0.5,
    borderColor: "#8c7851",
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 130,
    zIndex: 1,
  },
  formContainer: {
    marginHorizontal: 12,
  },
  input: {
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: "#eaddcf",
    height: 44,
    padding: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  // saveButton: {
  //   backgroundColor: "#8c7851",
  //   padding: 14,
  //   borderRadius: 20,
  //   width: "45%",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  editButton: {
    backgroundColor: "#8c7851",
    padding: 14,
    borderRadius: 20,
    width: "45%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
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
