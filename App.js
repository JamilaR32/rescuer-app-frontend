import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./src/navigations/main/AuthNavigation";
import History from "./src/screens/helper/History/History";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserProfile from "./src/screens/user/Profile/UserProfile";
import React from "react";
import { NativeBaseProvider, Box, Text } from "native-base";

export default function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <NativeBaseProvider>
        <History />
      </NativeBaseProvider>
    </QueryClientProvider>
    // <NavigationContainer>
    //   <AuthNavigation />
    // </NavigationContainer>
  );
}
