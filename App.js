import "core-js/stable/atob";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./src/navigations/main/AuthNavigation";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import UserContext from "./src/context/UserContext";
import { getToken } from "./src/api/storage";
import { jwtDecode } from "jwt-decode";
import HelperMainNavigation from "./src/navigations/main/HelperMainNavigation";
import UserMainNavigation from "./src/navigations/main/UserMainNavigation";
import { NativeBaseProvider } from "native-base";
import HelperProfile from "./src/screens/helper/Profile/HelperProfile";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { updateToken } from "./src/api/notification";
export default function App() {
  const [user, setUser] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState("");

  useEffect(() => {
    const checkToken = async () => {
      //console.log("checking token");
      const token = await getToken();
      if (token) {
        //console.log("there is token");
        const decode = jwtDecode(token);
        setUser(decode);
      }
    };
    checkToken();
  }, []);

  const renderThisScreen = () => {
    if (user) {
      if (user.helper) {
        return <HelperMainNavigation />;
      } else {
        return <UserMainNavigation />;
      }
    } else {
      return <AuthNavigation />;
    }
  };

  return (
    <QueryClientProvider client={new QueryClient()}>
      <UserContext.Provider value={[user, setUser]}>
        <NotificationComponent
          user={user}
          setExpoPushToken={setExpoPushToken}
        />
        <NativeBaseProvider>
          {/* <HelperProfile /> */}
          <NavigationContainer>{renderThisScreen()}</NavigationContainer>
        </NativeBaseProvider>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

const NotificationComponent = ({ user, setExpoPushToken }) => {
  const { mutate } = useMutation({
    mutationKey: ["notification-token"],
    mutationFn: (token) => updateToken(token),
  });
  useEffect(() => {
    if (user) {
      registerForPushNotificationsAsync().then((token) => {
        setExpoPushToken(token);
        mutate(token);
      });
    }
  }, [user]);

  return null;
};

async function registerForPushNotificationsAsync() {
  let token;
  console.log("STEP 1");
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  console.log("STEP 2");

  if (Device.isDevice) {
    console.log("STEP 3");

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    console.log("STEP 4");

    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    console.log("STEP 5");

    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    console.log("STEP 6");

    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "70af710a-34e6-414f-80a4-bddb5034ae50",
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
