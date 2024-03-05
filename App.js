import "core-js/stable/atob";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./src/navigations/main/AuthNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import UserContext from "./src/context/UserContext";

import { getToken } from "./src/api/storage";
// import PasswordValidator from "./src/screens/user/Profile/PasswordValidator";
import { jwtDecode } from "jwt-decode";
import HelperMainNavigation from "./src/navigations/main/HelperMainNavigation";
import UserMainNavigation from "./src/navigations/main/UserMainNavigation";
import { NativeBaseProvider } from "native-base";
import UserProfile from "./src/screens/user/Profile/UserProfile";
import HelperRegister from "./src/screens/auth/HelperRegister";
import Register from "./src/screens/auth/Register";
import HelperProfile from "./src/screens/helper/Profile/HelperProfile";

export default function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      console.log("checking token");
      const token = await getToken();
      if (token) {
        console.log("there is token");
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
        <NativeBaseProvider>
          <NavigationContainer>{renderThisScreen()}</NavigationContainer>
        </NativeBaseProvider>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}
