import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { deleteToken } from "../../../api/storage";
import UserContext from "../../../context/UserContext";
import { editUserProfile, me } from "../../../api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Octicons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../../../constants/Theme";
import { TextInput } from "react-native";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { BASE_URL, BASE_URL2 } from "../../../api";
const HelperProfile = () => {
  const [user, setUser] = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [civilId, setCivilId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [image, setImage] = useState("");
  // const navigation = useNavigation();
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
  });
  const selectImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    //console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleLogout = () => {
    deleteToken();
    setUser(null);
  };
  console.log(image);
  return (
    <View style={styles.container}>
      <View
        style={{
          // width: 100,
          // height: 100,
          // backgroundColor: "red",
          alignItems: "flex-end",
          marginTop: 30,
          marginBottom: -10,
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
        {/* <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
          }}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity> */}

        <Text style={styles.title}>Edit Profile</Text>
      </View>
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            marginVertical: 22,
            // marginHorizontal: 12,
            // marginBottom: 10,
            // top: 20,
            // justifyContent: "center",
            // alignItems: "center",
            // flexDirection: "column",
          }}
        >
          <TouchableOpacity onPress={selectImage}>
            {image && (
              <Image
                source={{
                  uri: image.includes("file") ? image : `${BASE_URL2}/${image}`,
                }}
                style={{
                  height: 170,
                  width: 170,
                  borderRadius: 85,
                  borderWidth: 0.5,
                  borderColor: "#8c7851",
                  resizeMode: "contain",
                }}
              />
            )}
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 19,
                zIndex: 9999,
              }}
            >
              <MaterialIcons name="photo-camera" size={33} color="black" />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{
              flexDirection: "column",
              marginBottom: 6,
            }}
          >
            <TouchableOpacity
              style={styles.edutButton}
              onPress={() => {
                setEdit(!edit);
              }}
            >
              <Text style={styles.saveButtonText}>Edit</Text>
            </TouchableOpacity>

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
          <View>
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
      </ScrollView>
    </View>
  );
};

export default HelperProfile;

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
    borderRadius: 20,
    width: "80%",
    padding: 10,
    marginVertical: 10, // Adds space above and below the input
    backgroundColor: "#eaddcf",
  },
  buttonContainer: {
    marginTop: 20,
    width: "90%",
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
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
    marginHorizontal: 12,
    marginBottom: 10,
    top: 10,
  },
  edutButton: {
    backgroundColor: "#f25042",
    padding: 10,
    borderRadius: 20,
    width: "98%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,
    marginBottom: 10,
  },
  saveButtonText: {
    color: "#fffffe",
    fontSize: 16,
  },
  title: {
    color: "#8c7851",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
