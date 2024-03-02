import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./src/navigations/main/AuthNavigation";
import React, { useEffect, useState } from "react";
import UserContext from "./src/context/UserContext";
import UserMainNavigation from "./src/navigations/main/UserMainNavigation";
import { getToken } from "./src/api/storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProfile from "./src/screens/user/Profile/UserProfile";

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
      <UserContext.Provider value={[user, setUser]}>
        <NavigationContainer>
          {/* {user ? <UserMainNavigation /> : <AuthNavigation />} */}
          {/* <UserProfile /> */}
          {user ? <UserProfile /> : <AuthNavigation />}
        </NavigationContainer>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}
