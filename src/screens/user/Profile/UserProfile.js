import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editUserProfile, me } from "../../../api/auth";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ROUTES from "../../../navigations";
import { COLORS, FONTS } from "../../../constants/Theme";
const UserProfile = () => {
  const navigation = useNavigation();
  const { data: profileUser } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => me(),
  });

  const [name, setName] = useState(name);
  const [password, setPassword] = useState(password);
  const [civilId, setCivilId] = useState(civilId);
  const [phoneNumber, setPhoneNumber] = useState(phoneNumber);
  console.log(profileUser?.fullName);
  const { mutate } = useMutation({
    mutationKey: ["edit"],
    mutationFn: () => {
      editUserProfile();
    },
  });
  return (
    <View
      style={{
        flex: 1,

        paddingHorizontal: 22,
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
          justifyContent: "center",
          top: 40,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate(ROUTES.USER.HOME_NAVIGATION.HOME)}
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

        <Text style={{ ...FONTS.h3 }}>Profile</Text>
        <View></View>
      </View>
      <View
        style={{
          flex: 0.75,
          backgroundColor: COLORS.white,
          justifyContent: "center",

          top: 80,
        }}
      >
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
              editable={true}
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
              editable={true}
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
              editable={true}
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
              editable={true}
            />
          </View>
          <Button
            title={"Hi"}
            color="red"
            style={{ backgroundColor: "green" }}
          />
        </View>
      </View>
    </View>
  );
};

export default UserProfile;
