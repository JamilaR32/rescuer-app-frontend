import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./src/navigations/main/AuthNavigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React, { useEffect, useState } from "react";
import UserContext from "./src/context/UserContext";
import UserMainNavigation from "./src/navigations/main/UserMainNavigation";
import { getToken } from "./src/api/storage";
//import UserProfile from "./src/screens/user/Profile/UserProfile";
//import { NativeBaseProvider, Box, Text } from "native-base";


export default function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      setUser(true);
    }
  };
    checkToken();
  }, []);
  


  return (
    <QueryClientProvider client={new QueryClient()}>
      <UserContext.Provider value={[user, setUser]}>
        {/* <NativeBaseProvider> */}
        <NavigationContainer>
          {user ? <UserMainNavigation /> : <AuthNavigation />}
        </NavigationContainer>
        {/* </NativeBaseProvider> */}
      </UserContext.Provider>
    </QueryClientProvider>

    // <NavigationContainer>
    //   <AuthNavigation />
    // </NavigationContainer>
  );
}
