import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./src/navigations/main/AuthNavigation";
<<<<<<< HEAD
=======

>>>>>>> c0ec7d4389d9549453e938054c2def7098def533
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import UserContext from "./src/context/UserContext";
import UserMainNavigation from "./src/navigations/main/UserMainNavigation";
import { getToken } from "./src/api/storage";
<<<<<<< HEAD
import History from "./src/screens/helper/History/History";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProfile from "./src/screens/user/Profile/UserProfile";
import React from "react";
import { NativeBaseProvider, Box, Text } from "native-base";
=======
import UserProfile from "./src/screens/user/Profile/UserProfile";
import { NativeBaseProvider, Box, Text } from "native-base";

>>>>>>> c0ec7d4389d9549453e938054c2def7098def533

export default function App() {
  const [user, setUser] = useState(false);
  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      setUser(true);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);
  return (
    <QueryClientProvider client={new QueryClient()}>
<<<<<<< HEAD
=======

>>>>>>> c0ec7d4389d9549453e938054c2def7098def533
      <UserContext.Provider value={[user, setUser]}>
        {/* <NativeBaseProvider> */}
        <NavigationContainer>
          {user ? <UserMainNavigation /> : <AuthNavigation />}
        </NavigationContainer>
        {/* </NativeBaseProvider> */}
      </UserContext.Provider>
    </QueryClientProvider>

<<<<<<< HEAD
    // <NavigationContainer>
    //   <AuthNavigation />
    // </NavigationContainer>
=======
     // <NativeBaseProvider>
       // <History />
   //   </NativeBaseProvider>
    
    // <NavigationContainer>
    //   <AuthNavigation />
    // </NavigationContainer>

>>>>>>> c0ec7d4389d9549453e938054c2def7098def533
  );
}
